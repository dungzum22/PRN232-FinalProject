using AuthAPI.DTOs;
using AuthAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace AuthAPI.Services;

public class AuthService : IAuthService
{
    private readonly AuthDbContext _dbContext;
    private readonly IPasswordService _passwordService;
    private readonly ITokenService _tokenService;
    private readonly IConfiguration _configuration;
    private readonly ILogger<AuthService> _logger;

    public AuthService(
        AuthDbContext dbContext,
        IPasswordService passwordService,
        ITokenService tokenService,
        IConfiguration configuration,
        ILogger<AuthService> logger)
    {
        _dbContext = dbContext;
        _passwordService = passwordService;
        _tokenService = tokenService;
        _configuration = configuration;
        _logger = logger;
    }

    public async Task<LoginResponse> RegisterAsync(RegisterRequest request)
    {
        // Validation
        if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
            throw new ArgumentException("Email and password are required");

        if (request.Password != request.ConfirmPassword)
            throw new ArgumentException("Passwords do not match");

        if (request.Password.Length < 6)
            throw new ArgumentException("Password must be at least 6 characters");

        // Check if user exists
        var existingUser = await _dbContext.Users
            .FirstOrDefaultAsync(u => u.Email == request.Email.ToLower());

        if (existingUser != null)
            throw new InvalidOperationException("User already exists with this email");

        // Create new user
        var user = new User
        {
            Email = request.Email.ToLower(),
            FullName = request.FullName,
            PhoneNumber = request.PhoneNumber,
            DateOfBirth = request.DateOfBirth,
            PasswordHash = _passwordService.HashPassword(request.Password),
            Role = "customer",
            IsActive = true
        };

        _dbContext.Users.Add(user);
        await _dbContext.SaveChangesAsync();

        _logger.LogInformation($"User registered: {user.Email}");

        // Generate tokens
        var accessToken = _tokenService.GenerateAccessToken(user.Id, user.Email, user.Role);
        var refreshToken = _tokenService.GenerateRefreshToken();

        // Save refresh token
        var refreshTokenEntity = new RefreshToken
        {
            UserId = user.Id,
            Token = refreshToken,
            ExpiryDate = DateTime.UtcNow.AddDays(7)
        };

        _dbContext.RefreshTokens.Add(refreshTokenEntity);
        await _dbContext.SaveChangesAsync();

        return new LoginResponse
        {
            Id = user.Id,
            Email = user.Email,
            FullName = user.FullName,
            Role = user.Role,
            AccessToken = accessToken,
            RefreshToken = refreshToken,
            ExpiresIn = 3600,
            ExpiresAt = DateTime.UtcNow.AddHours(1)
        };
    }

    public async Task<LoginResponse> LoginAsync(LoginRequest request)
    {
        // Validation
        if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
            throw new ArgumentException("Email and password are required");

        // Find user
        var user = await _dbContext.Users
            .FirstOrDefaultAsync(u => u.Email == request.Email.ToLower());

        if (user == null || !user.IsActive)
        {
            _logger.LogWarning($"Login failed for email: {request.Email}");
            throw new UnauthorizedAccessException("Invalid email or password");
        }

        // Verify password
        if (!_passwordService.VerifyPassword(request.Password, user.PasswordHash))
        {
            _logger.LogWarning($"Invalid password for user: {user.Email}");
            throw new UnauthorizedAccessException("Invalid email or password");
        }

        // Update last login
        user.LastLoginAt = DateTime.UtcNow;
        _dbContext.Users.Update(user);
        await _dbContext.SaveChangesAsync();

        // Generate tokens
        var accessToken = _tokenService.GenerateAccessToken(user.Id, user.Email, user.Role);
        var refreshToken = _tokenService.GenerateRefreshToken();

        // Save refresh token
        var refreshTokenEntity = new RefreshToken
        {
            UserId = user.Id,
            Token = refreshToken,
            ExpiryDate = DateTime.UtcNow.AddDays(7)
        };

        _dbContext.RefreshTokens.Add(refreshTokenEntity);
        await _dbContext.SaveChangesAsync();

        _logger.LogInformation($"User logged in: {user.Email}");

        return new LoginResponse
        {
            Id = user.Id,
            Email = user.Email,
            FullName = user.FullName,
            Role = user.Role,
            AccessToken = accessToken,
            RefreshToken = refreshToken,
            ExpiresIn = 3600,
            ExpiresAt = DateTime.UtcNow.AddHours(1)
        };
    }

    public async Task<TokenResponse> RefreshTokenAsync(RefreshTokenRequest request)
    {
        var refreshToken = await _dbContext.RefreshTokens
            .Include(rt => rt.User)
            .FirstOrDefaultAsync(rt => rt.Token == request.RefreshToken && !rt.IsRevoked);

        if (refreshToken == null || refreshToken.ExpiryDate < DateTime.UtcNow)
            throw new UnauthorizedAccessException("Invalid or expired refresh token");

        var user = refreshToken.User;
        if (user == null || !user.IsActive)
            throw new UnauthorizedAccessException("User not found or inactive");

        // Generate new tokens
        var newAccessToken = _tokenService.GenerateAccessToken(user.Id, user.Email, user.Role);
        var newRefreshToken = _tokenService.GenerateRefreshToken();

        // Revoke old refresh token
        refreshToken.IsRevoked = true;
        _dbContext.RefreshTokens.Update(refreshToken);

        // Save new refresh token
        var newRefreshTokenEntity = new RefreshToken
        {
            UserId = user.Id,
            Token = newRefreshToken,
            ExpiryDate = DateTime.UtcNow.AddDays(7)
        };

        _dbContext.RefreshTokens.Add(newRefreshTokenEntity);
        await _dbContext.SaveChangesAsync();

        return new TokenResponse
        {
            AccessToken = newAccessToken,
            RefreshToken = newRefreshToken,
            ExpiresIn = 3600,
            ExpiresAt = DateTime.UtcNow.AddHours(1)
        };
    }

    public async Task<UserProfileResponse> GetCurrentUserAsync(int userId)
    {
        var user = await _dbContext.Users.FindAsync(userId);

        if (user == null || !user.IsActive)
            throw new InvalidOperationException("User not found");

        return new UserProfileResponse
        {
            Id = user.Id,
            Email = user.Email,
            FullName = user.FullName,
            PhoneNumber = user.PhoneNumber,
            DateOfBirth = user.DateOfBirth,
            Role = user.Role,
            CreatedAt = user.CreatedAt,
            LastLoginAt = user.LastLoginAt ?? DateTime.MinValue
        };
    }

    public async Task<bool> ChangePasswordAsync(int userId, ChangePasswordRequest request)
    {
        var user = await _dbContext.Users.FindAsync(userId);

        if (user == null)
            throw new InvalidOperationException("User not found");

        if (!_passwordService.VerifyPassword(request.CurrentPassword, user.PasswordHash))
            throw new UnauthorizedAccessException("Current password is incorrect");

        if (request.NewPassword != request.ConfirmPassword)
            throw new ArgumentException("New passwords do not match");

        if (request.NewPassword.Length < 6)
            throw new ArgumentException("Password must be at least 6 characters");

        user.PasswordHash = _passwordService.HashPassword(request.NewPassword);
        user.UpdatedAt = DateTime.UtcNow;

        _dbContext.Users.Update(user);
        await _dbContext.SaveChangesAsync();

        _logger.LogInformation($"Password changed for user: {user.Email}");

        return true;
    }

    public async Task<bool> RevokeTokenAsync(int userId)
    {
        var refreshTokens = await _dbContext.RefreshTokens
            .Where(rt => rt.UserId == userId && !rt.IsRevoked)
            .ToListAsync();

        foreach (var token in refreshTokens)
        {
            token.IsRevoked = true;
        }

        _dbContext.RefreshTokens.UpdateRange(refreshTokens);
        await _dbContext.SaveChangesAsync();

        return true;
    }
}
