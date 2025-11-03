using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;
using NotificationAPI.Data;
using NotificationAPI.Models;
using SharedDTOs;

namespace NotificationAPI.Controllers;

[ApiController]
[Route("api/notifications")]
[Authorize]
public class NotificationController : ControllerBase
{
    private readonly NotificationDbContext _db;
    private readonly ILogger<NotificationController> _logger;
    private readonly IHubContext<NotificationAPI.Hubs.NotificationHub> _hub;

    public NotificationController(NotificationDbContext db, ILogger<NotificationController> logger, IHubContext<NotificationAPI.Hubs.NotificationHub> hub)
    {
        _db = db;
        _logger = logger;
        _hub = hub;
    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse<List<object>>>> Get([FromQuery] bool? isRead)
    {
        var userId = GetUserId();
        var query = _db.Notifications.AsNoTracking().Where(n => n.UserId == userId);
        if (isRead.HasValue) query = query.Where(n => n.IsRead == isRead.Value);
        var list = await query.OrderByDescending(n => n.CreatedAt)
            .Select(n => new { n.Id, n.Message, n.Type, n.IsRead, n.CreatedAt, n.ReadAt })
            .ToListAsync();
        return Ok(new ApiResponse<List<object>> { Success = true, Data = list.Cast<object>().ToList() });
    }

    [HttpPost("mark-read/{id}")]
    public async Task<ActionResult<ApiResponse<object>>> MarkRead(int id)
    {
        var userId = GetUserId();
        var n = await _db.Notifications.FirstOrDefaultAsync(x => x.Id == id && x.UserId == userId);
        if (n == null) return NotFound(new ErrorResponse { Message = "Notification not found" });
        if (!n.IsRead)
        {
            n.IsRead = true;
            n.ReadAt = DateTime.UtcNow;
            await _db.SaveChangesAsync();
        }
        return Ok(new ApiResponse<object> { Success = true, Message = "Marked as read" });
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<ApiResponse<object>>> Delete(int id)
    {
        var userId = GetUserId();
        var n = await _db.Notifications.FirstOrDefaultAsync(x => x.Id == id && x.UserId == userId);
        if (n == null) return NotFound(new ErrorResponse { Message = "Notification not found" });
        _db.Notifications.Remove(n);
        await _db.SaveChangesAsync();
        return Ok(new ApiResponse<object> { Success = true, Message = "Notification deleted" });
    }

    // Admin endpoint to send a notification to a specific user and broadcast via SignalR
    [HttpPost("admin/send")]
    [Authorize(Roles = "admin")]
    public async Task<ActionResult<ApiResponse<object>>> AdminSend([FromBody] AdminSendRequest req)
    {
        if (string.IsNullOrWhiteSpace(req.Message))
            return BadRequest(new ErrorResponse { Message = "Message is required" });

        var n = new Notification
        {
            UserId = req.UserId,
            Message = req.Message,
            Type = string.IsNullOrWhiteSpace(req.Type) ? "info" : req.Type,
            IsRead = false,
            CreatedAt = DateTime.UtcNow
        };
        _db.Notifications.Add(n);
        await _db.SaveChangesAsync();

        await _hub.Clients.Group($"user-{req.UserId}").SendAsync("ReceiveNotification", new
        {
            n.Id,
            n.Message,
            n.Type,
            n.CreatedAt
        });

        return Ok(new ApiResponse<object> { Success = true, Message = "Notification sent" });
    }

    public class AdminSendRequest
    {
        public int UserId { get; set; }
        public string Message { get; set; } = string.Empty;
        public string? Type { get; set; }
    }

    private int GetUserId()
    {
        var idStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0";
        return int.TryParse(idStr, out var id) ? id : 0;
    }
}

