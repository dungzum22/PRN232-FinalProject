using AuthAPI.DTOs;

namespace AuthAPI.Services;

public interface IAuthService
{
    Task<LoginResponse> RegisterAsync(RegisterRequest request);

    Task<LoginResponse> LoginAsync(LoginRequest request);

    Task<TokenResponse> RefreshTokenAsync(RefreshTokenRequest request);

    Task<UserProfileResponse> GetCurrentUserAsync(int userId);

    Task<bool> ChangePasswordAsync(int userId, ChangePasswordRequest request);

    Task<bool> RevokeTokenAsync(int userId);
}



