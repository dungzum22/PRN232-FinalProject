using AuthAPI.DTOs;
using AuthAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace AuthAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly ILogger<AuthController> _logger;

    public AuthController(IAuthService authService, ILogger<AuthController> logger)
    {
        _authService = authService;
        _logger = logger;
    }

    /// <summary>
    /// Register a new user
    /// </summary>
    [HttpPost("register")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<ApiResponse<LoginResponse>>> Register([FromBody] RegisterRequest request)
    {
        try
        {
            var result = await _authService.RegisterAsync(request);

            return CreatedAtAction(
                nameof(GetProfile),
                new { id = result.Id },
                new ApiResponse<LoginResponse>
                {
                    Success = true,
                    Data = result,
                    Message = "User registered successfully"
                }
            );
        }
        catch (ArgumentException ex)
        {
            _logger.LogWarning($"Registration validation error: {ex.Message}");
            return BadRequest(new ErrorResponse
            {
                Success = false,
                Message = ex.Message
            });
        }
        catch (InvalidOperationException ex)
        {
            _logger.LogWarning($"Registration error: {ex.Message}");
            return BadRequest(new ErrorResponse
            {
                Success = false,
                Message = ex.Message
            });
        }
    }

    /// <summary>
    /// Login user
    /// </summary>
    [HttpPost("login")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult<ApiResponse<LoginResponse>>> Login([FromBody] LoginRequest request)
    {
        try
        {
            var result = await _authService.LoginAsync(request);

            return Ok(new ApiResponse<LoginResponse>
            {
                Success = true,
                Data = result,
                Message = "Login successful"
            });
        }
        catch (ArgumentException ex)
        {
            _logger.LogWarning($"Login validation error: {ex.Message}");
            return Unauthorized(new ErrorResponse
            {
                Success = false,
                Message = ex.Message
            });
        }
        catch (UnauthorizedAccessException ex)
        {
            _logger.LogWarning($"Login failed: {ex.Message}");
            return Unauthorized(new ErrorResponse
            {
                Success = false,
                Message = ex.Message
            });
        }
    }

    /// <summary>
    /// Refresh access token
    /// </summary>
    [HttpPost("refresh")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult<ApiResponse<TokenResponse>>> RefreshToken([FromBody] RefreshTokenRequest request)
    {
        try
        {
            var result = await _authService.RefreshTokenAsync(request);

            return Ok(new ApiResponse<TokenResponse>
            {
                Success = true,
                Data = result,
                Message = "Token refreshed successfully"
            });
        }
        catch (UnauthorizedAccessException ex)
        {
            _logger.LogWarning($"Token refresh failed: {ex.Message}");
            return Unauthorized(new ErrorResponse
            {
                Success = false,
                Message = ex.Message
            });
        }
    }

    /// <summary>
    /// Get current user profile (requires authentication)
    /// </summary>
    [HttpGet("me")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ApiResponse<UserProfileResponse>>> GetProfile()
    {
        try
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out var userId))
            {
                return Unauthorized(new ErrorResponse
                {
                    Success = false,
                    Message = "User ID not found in token"
                });
            }

            var result = await _authService.GetCurrentUserAsync(userId);

            return Ok(new ApiResponse<UserProfileResponse>
            {
                Success = true,
                Data = result,
                Message = "User profile retrieved successfully"
            });
        }
        catch (InvalidOperationException ex)
        {
            _logger.LogWarning($"Get profile error: {ex.Message}");
            return NotFound(new ErrorResponse
            {
                Success = false,
                Message = ex.Message
            });
        }
    }

    /// <summary>
    /// Change user password (requires authentication)
    /// </summary>
    [HttpPost("change-password")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult<ApiResponse<string>>> ChangePassword([FromBody] ChangePasswordRequest request)
    {
        try
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out var userId))
            {
                return Unauthorized(new ErrorResponse
                {
                    Success = false,
                    Message = "User ID not found in token"
                });
            }

            await _authService.ChangePasswordAsync(userId, request);

            return Ok(new ApiResponse<string>
            {
                Success = true,
                Message = "Password changed successfully"
            });
        }
        catch (ArgumentException ex)
        {
            _logger.LogWarning($"Change password validation error: {ex.Message}");
            return BadRequest(new ErrorResponse
            {
                Success = false,
                Message = ex.Message
            });
        }
        catch (UnauthorizedAccessException ex)
        {
            _logger.LogWarning($"Change password error: {ex.Message}");
            return Unauthorized(new ErrorResponse
            {
                Success = false,
                Message = ex.Message
            });
        }
    }

    /// <summary>
    /// Logout (revoke refresh tokens)
    /// </summary>
    [HttpPost("logout")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult<ApiResponse<string>>> Logout()
    {
        try
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out var userId))
            {
                return Unauthorized(new ErrorResponse
                {
                    Success = false,
                    Message = "User ID not found in token"
                });
            }

            await _authService.RevokeTokenAsync(userId);

            return Ok(new ApiResponse<string>
            {
                Success = true,
                Message = "Logged out successfully"
            });
        }
        catch (Exception ex)
        {
            _logger.LogError($"Logout error: {ex.Message}");
            return StatusCode(500, new ErrorResponse
            {
                Success = false,
                Message = "An error occurred during logout"
            });
        }
    }
}
