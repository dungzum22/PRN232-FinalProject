using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using FeedbackAPI.Data;
using FeedbackAPI.Models;
using SharedDTOs;

namespace FeedbackAPI.Controllers;

[ApiController]
[Route("api/feedback")]
[Authorize]
public class FeedbackController : ControllerBase
{
    private readonly FeedbackDbContext _db;
    private readonly ILogger<FeedbackController> _logger;

    public FeedbackController(FeedbackDbContext db, ILogger<FeedbackController> logger)
    {
        _db = db;
        _logger = logger;
    }

    [HttpGet("product/{productId}")]
    [AllowAnonymous]
    public async Task<ActionResult<ApiResponse<List<FeedbackDTO>>>> GetByProduct(int productId)
    {
        var feedbacks = await _db.Feedbacks.AsNoTracking().Where(f => f.ProductId == productId)
            .OrderByDescending(f => f.CreatedAt).ToListAsync();
        var list = feedbacks.Select(ToDto).ToList();
        return Ok(new ApiResponse<List<FeedbackDTO>> { Success = true, Data = list });
    }

    [HttpPost]
    public async Task<ActionResult<ApiResponse<FeedbackDTO>>> Create([FromBody] CreateFeedbackRequest req)
    {
        if (req.Rating < 1 || req.Rating > 5)
            return BadRequest(new ErrorResponse { Message = "Rating must be between 1 and 5" });
        var userId = GetUserId();
        var entity = new Feedback
        {
            UserId = userId,
            ProductId = req.ProductId,
            UserName = "",
            ProductName = "",
            Rating = req.Rating,
            Comment = req.Comment?.Trim() ?? string.Empty,
            CreatedAt = DateTime.UtcNow
        };
        _db.Feedbacks.Add(entity);
        await _db.SaveChangesAsync();
        return Ok(new ApiResponse<FeedbackDTO> { Success = true, Data = ToDto(entity), Message = "Feedback created" });
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<ApiResponse<FeedbackDTO>>> Update(int id, [FromBody] UpdateFeedbackRequest req)
    {
        var userId = GetUserId();
        var fb = await _db.Feedbacks.FirstOrDefaultAsync(f => f.Id == id);
        if (fb == null) return NotFound(new ErrorResponse { Message = "Feedback not found" });
        if (fb.UserId != userId && !User.IsInRole("admin")) return Forbid();
        if (req.Rating < 1 || req.Rating > 5)
            return BadRequest(new ErrorResponse { Message = "Rating must be between 1 and 5" });
        fb.Rating = req.Rating;
        fb.Comment = req.Comment?.Trim() ?? string.Empty;
        fb.UpdatedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        return Ok(new ApiResponse<FeedbackDTO> { Success = true, Data = ToDto(fb), Message = "Feedback updated" });
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<ApiResponse<object>>> Delete(int id)
    {
        var userId = GetUserId();
        var fb = await _db.Feedbacks.FirstOrDefaultAsync(f => f.Id == id);
        if (fb == null) return NotFound(new ErrorResponse { Message = "Feedback not found" });
        if (fb.UserId != userId && !User.IsInRole("admin")) return Forbid();
        _db.Feedbacks.Remove(fb);
        await _db.SaveChangesAsync();
        return Ok(new ApiResponse<object> { Success = true, Message = "Feedback deleted" });
    }

    [HttpGet("summary/product/{productId}")]
    [AllowAnonymous]
    public async Task<ActionResult<ApiResponse<ProductReviewSummaryDTO>>> Summary(int productId)
    {
        var feedbacks = await _db.Feedbacks.AsNoTracking().Where(f => f.ProductId == productId).ToListAsync();
        if (feedbacks.Count == 0)
        {
            return Ok(new ApiResponse<ProductReviewSummaryDTO> { Success = true, Data = new ProductReviewSummaryDTO
            {
                ProductId = productId,
                ProductName = "",
                AverageRating = 0,
                TotalReviews = 0
            }});
        }
        var avg = feedbacks.Average(f => f.Rating);
        var dto = new ProductReviewSummaryDTO
        {
            ProductId = productId,
            ProductName = "",
            AverageRating = Math.Round(avg, 2),
            TotalReviews = feedbacks.Count,
            FiveStarCount = feedbacks.Count(f => f.Rating == 5),
            FourStarCount = feedbacks.Count(f => f.Rating == 4),
            ThreeStarCount = feedbacks.Count(f => f.Rating == 3),
            TwoStarCount = feedbacks.Count(f => f.Rating == 2),
            OneStarCount = feedbacks.Count(f => f.Rating == 1),
            TopReviews = feedbacks.OrderByDescending(f => f.Rating).ThenByDescending(f => f.CreatedAt).Take(3).Select(ToDto).ToList()
        };
        return Ok(new ApiResponse<ProductReviewSummaryDTO> { Success = true, Data = dto });
    }

    private int GetUserId()
    {
        var idStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0";
        return int.TryParse(idStr, out var id) ? id : 0;
    }

    private static FeedbackDTO ToDto(Feedback f) => new()
    {
        Id = f.Id,
        UserId = f.UserId,
        ProductId = f.ProductId,
        ProductName = f.ProductName,
        UserName = f.UserName,
        Rating = f.Rating,
        Comment = f.Comment,
        IsVerifiedPurchase = f.IsVerifiedPurchase,
        HelpfulCount = f.HelpfulCount,
        CreatedAt = f.CreatedAt,
        UpdatedAt = f.UpdatedAt
    };
}

