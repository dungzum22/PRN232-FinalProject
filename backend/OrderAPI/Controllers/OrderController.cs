using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using OrderAPI.Data;
using OrderAPI.Models;
using SharedDTOs;

namespace OrderAPI.Controllers;

[ApiController]
[Route("api/orders")]
[Authorize]
public class OrderController : ControllerBase
{
    private readonly OrderDbContext _db;
    private readonly ILogger<OrderController> _logger;

    private static readonly HashSet<string> AllowedStatuses = new(StringComparer.OrdinalIgnoreCase)
    { "pending", "processing", "shipped", "delivered", "cancelled" };

    public OrderController(OrderDbContext db, ILogger<OrderController> logger)
    {
        _db = db;
        _logger = logger;
    }

    [HttpPost]
    public async Task<ActionResult<ApiResponse<OrderDTO>>> Create([FromBody] CreateOrderRequest req)
    {
        var userId = GetUserId();
        if (req.Items == null || req.Items.Count == 0)
            return BadRequest(new ErrorResponse { Message = "Order must contain at least one item" });

        var order = new Order
        {
            UserId = userId,
            ShippingAddress = req.ShippingAddress,
            Status = "pending",
            CreatedAt = DateTime.UtcNow
        };
        _db.Orders.Add(order);
        await _db.SaveChangesAsync();

        var items = req.Items.Select(i => new OrderItem
        {
            OrderId = order.Id,
            ProductId = i.ProductId,
            ProductName = "", // optional: populate by calling product service
            Quantity = i.Quantity,
            UnitPrice = i.UnitPrice,
            TotalPrice = i.UnitPrice * i.Quantity
        }).ToList();

        _db.OrderItems.AddRange(items);
        order.Items = items;
        order.TotalAmount = items.Sum(it => it.TotalPrice);
        await _db.SaveChangesAsync();

        return Ok(new ApiResponse<OrderDTO> { Success = true, Data = ToDto(order), Message = "Order created" });
    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse<List<OrderDTO>>>> MyOrders()
    {
        var userId = GetUserId();
        var orders = await _db.Orders.AsNoTracking().Include(o => o.Items)
            .Where(o => o.UserId == userId)
            .OrderByDescending(o => o.CreatedAt)
            .ToListAsync();
        return Ok(new ApiResponse<List<OrderDTO>> { Success = true, Data = orders.Select(ToDto).ToList() });
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ApiResponse<OrderDTO>>> GetById(int id)
    {
        var userId = GetUserId();
        var order = await _db.Orders.Include(o => o.Items).FirstOrDefaultAsync(o => o.Id == id);
        if (order == null) return NotFound(new ErrorResponse { Message = "Order not found" });
        if (order.UserId != userId && !User.IsInRole("admin")) return Forbid();
        return Ok(new ApiResponse<OrderDTO> { Success = true, Data = ToDto(order) });
    }

    [HttpGet("admin/all")]
    [Authorize(Roles = "admin")]
    public async Task<ActionResult<ApiResponse<List<OrderDTO>>>> GetAll()
    {
        var orders = await _db.Orders.AsNoTracking().Include(o => o.Items)
            .OrderByDescending(o => o.CreatedAt).ToListAsync();
        return Ok(new ApiResponse<List<OrderDTO>> { Success = true, Data = orders.Select(ToDto).ToList() });
    }

    [HttpPut("{id}/status")]
    [Authorize(Roles = "admin")]
    public async Task<ActionResult<ApiResponse<OrderDTO>>> UpdateStatus(int id, [FromBody] UpdateOrderStatusRequest req)
    {
        if (string.IsNullOrWhiteSpace(req.Status) || !AllowedStatuses.Contains(req.Status))
            return BadRequest(new ErrorResponse { Message = "Invalid status" });
        var order = await _db.Orders.Include(o => o.Items).FirstOrDefaultAsync(o => o.Id == id);
        if (order == null) return NotFound(new ErrorResponse { Message = "Order not found" });
        order.Status = req.Status.ToLower();
        order.UpdatedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        return Ok(new ApiResponse<OrderDTO> { Success = true, Data = ToDto(order), Message = "Status updated" });
    }

    [HttpGet("stats/overview")]
    [Authorize(Roles = "admin")]
    public async Task<ActionResult<ApiResponse<OrderSummaryDTO>>> Stats()
    {
        var totalOrders = await _db.Orders.CountAsync();
        var totalRevenue = await _db.Orders.SumAsync(o => o.TotalAmount);
        var groups = await _db.Orders.GroupBy(o => o.Status).Select(g => new { Status = g.Key, Count = g.Count() }).ToListAsync();
        var dict = groups.ToDictionary(g => g.Status, g => g.Count);
        var dto = new OrderSummaryDTO { TotalOrders = totalOrders, TotalRevenue = totalRevenue, OrdersByStatus = dict };
        return Ok(new ApiResponse<OrderSummaryDTO> { Success = true, Data = dto });
    }

    private int GetUserId()
    {
        var idStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0";
        return int.TryParse(idStr, out var id) ? id : 0;
    }

    private static OrderDTO ToDto(Order o) => new()
    {
        Id = o.Id,
        UserId = o.UserId,
        TotalAmount = o.TotalAmount,
        Status = o.Status,
        ShippingAddress = o.ShippingAddress,
        CreatedAt = o.CreatedAt,
        UpdatedAt = o.UpdatedAt,
        Items = o.Items.Select(i => new OrderItemDTO
        {
            Id = i.Id,
            OrderId = i.OrderId,
            ProductId = i.ProductId,
            ProductName = i.ProductName,
            Quantity = i.Quantity,
            UnitPrice = i.UnitPrice,
            TotalPrice = i.TotalPrice
        }).ToList()
    };
}

