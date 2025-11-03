using Microsoft.AspNetCore.SignalR;
using NotificationAPI.Data;
using NotificationAPI.Models;

namespace NotificationAPI.Hubs;

public class NotificationHub : Hub
{
    private readonly NotificationDbContext _dbContext;
    private readonly ILogger<NotificationHub> _logger;

    public NotificationHub(NotificationDbContext dbContext, ILogger<NotificationHub> logger)
    {
        _dbContext = dbContext;
        _logger = logger;
    }

    public override async Task OnConnectedAsync()
    {
        _logger.LogInformation($"Client connected: {Context.ConnectionId}");
        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        _logger.LogInformation($"Client disconnected: {Context.ConnectionId}");
        await base.OnDisconnectedAsync(exception);
    }

    /// <summary>
    /// Join user group for notifications
    /// </summary>
    public async Task JoinUserGroup(int userId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, $"user-{userId}");
        _logger.LogInformation($"Client {Context.ConnectionId} joined group: user-{userId}");
    }

    /// <summary>
    /// Leave user group
    /// </summary>
    public async Task LeaveUserGroup(int userId)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, $"user-{userId}");
        _logger.LogInformation($"Client {Context.ConnectionId} left group: user-{userId}");
    }

    /// <summary>
    /// Send notification to specific user (called from backend services)
    /// </summary>
    public async Task SendNotificationToUser(int userId, string message, string type = "info")
    {
        try
        {
            var notification = new Notification
            {
                UserId = userId,
                Message = message,
                Type = type,
                IsRead = false,
                CreatedAt = DateTime.UtcNow
            };

            _dbContext.Notifications.Add(notification);
            await _dbContext.SaveChangesAsync();

            await Clients.Group($"user-{userId}")
                .SendAsync("ReceiveNotification", new
                {
                    notification.Id,
                    notification.Message,
                    notification.Type,
                    notification.CreatedAt
                });

            _logger.LogInformation($"Notification sent to user {userId}");
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error sending notification: {ex.Message}");
        }
    }

    /// <summary>
    /// Broadcast notification to all connected clients
    /// </summary>
    public async Task BroadcastNotification(string message, string type = "info")
    {
        await Clients.All.SendAsync("ReceiveNotification", new
        {
            Message = message,
            Type = type,
            CreatedAt = DateTime.UtcNow
        });
    }
}



