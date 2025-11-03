using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SharedDTOs;
using UserAPI.Data;
using UserAPI.Models;
using System.Security.Claims;

namespace UserAPI.Controllers;

[ApiController]
[Route("api/users")]
public class UserController : ControllerBase
{
    private readonly UserDbContext _dbContext;
    private readonly ILogger<UserController> _logger;

    public UserController(UserDbContext dbContext, ILogger<UserController> logger)
    {
        _dbContext = dbContext;
        _logger = logger;
    }

    /// <summary>
    /// Get all users (admin only)
    /// </summary>
    [HttpGet]
    [Authorize(Roles = "admin")]
    public async Task<ActionResult<ApiResponse<PaginatedResponse<UserDTO>>>> GetAllUsers(
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 10)
    {
        try
        {
            var query = _dbContext.Users.AsQueryable();
            var totalCount = await query.CountAsync();

            var users = await query
                .OrderByDescending(u => u.CreatedAt)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var userDtos = users.Select(u => new UserDTO
            {
                Id = u.Id,
                Email = u.Email,
                FullName = u.FullName,
                PhoneNumber = u.PhoneNumber,
                DateOfBirth = u.DateOfBirth,
                Role = u.Role,
                IsActive = u.IsActive,
                CreatedAt = u.CreatedAt,
                LastLoginAt = u.LastLoginAt
            }).ToList();

            var response = new PaginatedResponse<UserDTO>
            {
                Items = userDtos,
                TotalCount = totalCount,
                PageNumber = pageNumber,
                PageSize = pageSize
            };

            return Ok(new ApiResponse<PaginatedResponse<UserDTO>>
            {
                Success = true,
                Data = response,
                Message = "Users retrieved successfully"
            });
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error retrieving users: {ex.Message}");
            return StatusCode(500, new ErrorResponse { Message = "Internal server error" });
        }
    }

    /// <summary>
    /// Get user profile by ID
    /// </summary>
    [HttpGet("{id}")]
    [Authorize]
    public async Task<ActionResult<ApiResponse<UserProfileDTO>>> GetUserProfile(int id)
    {
        try
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            
            // Users can only access their own profile unless they're admin
            if (userId != id && !User.IsInRole("admin"))
            {
                return Forbid();
            }

            var user = await _dbContext.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound(new ErrorResponse { Message = "User not found" });
            }

            var userProfile = new UserProfileDTO
            {
                Id = user.Id,
                Email = user.Email,
                FullName = user.FullName,
                PhoneNumber = user.PhoneNumber,
                DateOfBirth = user.DateOfBirth,
                Role = user.Role,
                CreatedAt = user.CreatedAt,
                LastLoginAt = user.LastLoginAt
            };

            return Ok(new ApiResponse<UserProfileDTO>
            {
                Success = true,
                Data = userProfile,
                Message = "User profile retrieved successfully"
            });
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error retrieving user profile: {ex.Message}");
            return StatusCode(500, new ErrorResponse { Message = "Internal server error" });
        }
    }

    /// <summary>
    /// Update user profile
    /// </summary>
    [HttpPut("{id}")]
    [Authorize]
    public async Task<ActionResult<ApiResponse<UserProfileDTO>>> UpdateUserProfile(int id, UpdateUserProfileRequest request)
    {
        try
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            
            // Users can only update their own profile unless they're admin
            if (userId != id && !User.IsInRole("admin"))
            {
                return Forbid();
            }

            var user = await _dbContext.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound(new ErrorResponse { Message = "User not found" });
            }

            if (!string.IsNullOrWhiteSpace(request.FullName))
                user.FullName = request.FullName;
            
            if (!string.IsNullOrWhiteSpace(request.PhoneNumber))
                user.PhoneNumber = request.PhoneNumber;
            
            if (request.DateOfBirth != default)
                user.DateOfBirth = request.DateOfBirth;

            user.UpdatedAt = DateTime.UtcNow;

            _dbContext.Users.Update(user);
            await _dbContext.SaveChangesAsync();

            _logger.LogInformation($"User profile updated: {user.Email}");

            var userProfile = new UserProfileDTO
            {
                Id = user.Id,
                Email = user.Email,
                FullName = user.FullName,
                PhoneNumber = user.PhoneNumber,
                DateOfBirth = user.DateOfBirth,
                Role = user.Role,
                CreatedAt = user.CreatedAt,
                LastLoginAt = user.LastLoginAt
            };

            return Ok(new ApiResponse<UserProfileDTO>
            {
                Success = true,
                Data = userProfile,
                Message = "User profile updated successfully"
            });
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error updating user profile: {ex.Message}");
            return StatusCode(500, new ErrorResponse { Message = "Internal server error" });
        }
    }

    /// <summary>
    /// Get user statistics (admin only)
    /// </summary>
    [HttpGet("stats/overview")]
    [Authorize(Roles = "admin")]
    public async Task<ActionResult<ApiResponse<UserStatisticsDTO>>> GetUserStatistics()
    {
        try
        {
            var totalUsers = await _dbContext.Users.CountAsync();
            var activeUsers = await _dbContext.Users.CountAsync(u => u.IsActive);
            var adminUsers = await _dbContext.Users.CountAsync(u => u.Role == "admin");
            var customerUsers = await _dbContext.Users.CountAsync(u => u.Role == "customer");

            var stats = new UserStatisticsDTO
            {
                TotalUsers = totalUsers,
                ActiveUsers = activeUsers,
                AdminUsers = adminUsers,
                CustomerUsers = customerUsers
            };

            return Ok(new ApiResponse<UserStatisticsDTO>
            {
                Success = true,
                Data = stats,
                Message = "User statistics retrieved successfully"
            });
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error retrieving user statistics: {ex.Message}");
            return StatusCode(500, new ErrorResponse { Message = "Internal server error" });
        }
    }

    /// <summary>
    /// Deactivate user account (admin only)
    /// </summary>
    [HttpPut("{id}/deactivate")]
    [Authorize(Roles = "admin")]
    public async Task<ActionResult<ApiResponse<object>>> DeactivateUser(int id)
    {
        try
        {
            var user = await _dbContext.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound(new ErrorResponse { Message = "User not found" });
            }

            user.IsActive = false;
            user.UpdatedAt = DateTime.UtcNow;

            _dbContext.Users.Update(user);
            await _dbContext.SaveChangesAsync();

            _logger.LogInformation($"User deactivated: {user.Email}");

            return Ok(new ApiResponse<object>
            {
                Success = true,
                Message = "User deactivated successfully"
            });
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error deactivating user: {ex.Message}");
            return StatusCode(500, new ErrorResponse { Message = "Internal server error" });
        }
    }
}



