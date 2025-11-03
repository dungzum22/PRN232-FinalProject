using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net.Http.Json;
using System.Security.Claims;
using CartAPI.Data;
using CartAPI.Models;
using SharedDTOs;

namespace CartAPI.Controllers;

[ApiController]
[Route("api/cart")]
[Authorize]
public class CartController : ControllerBase
{
    private readonly CartDbContext _db;
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IConfiguration _config;
    private readonly ILogger<CartController> _logger;

    public CartController(CartDbContext db, IHttpClientFactory httpClientFactory, IConfiguration config, ILogger<CartController> logger)
    {
        _db = db;
        _httpClientFactory = httpClientFactory;
        _config = config;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse<CartDTO>>> GetCart()
    {
        var userId = GetUserId();
        var cart = await GetOrCreateCartAsync(userId);
        var dto = await ToDtoAsync(cart);
        return Ok(new ApiResponse<CartDTO> { Success = true, Data = dto });
    }

    [HttpPost("items")]
    public async Task<ActionResult<ApiResponse<CartDTO>>> AddItem([FromBody] AddToCartRequest req)
    {
        if (req.Quantity <= 0) return BadRequest(new ErrorResponse { Message = "Quantity must be > 0" });
        var userId = GetUserId();
        var cart = await GetOrCreateCartAsync(userId);

        var product = await FetchProductAsync(req.ProductId);
        if (product == null || !product.IsActive)
            return BadRequest(new ErrorResponse { Message = "Product not found or inactive" });

        var item = await _db.CartItems.FirstOrDefaultAsync(i => i.CartId == cart.Id && i.ProductId == req.ProductId);
        if (item == null)
        {
            item = new CartItem
            {
                CartId = cart.Id,
                ProductId = product.Id,
                ProductName = product.Name,
                Price = product.Price,
                Quantity = req.Quantity,
                CreatedAt = DateTime.UtcNow
            };
            _db.CartItems.Add(item);
        }
        else
        {
            item.Quantity += req.Quantity;
        }

        cart.UpdatedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();

        var dto = await ToDtoAsync(cart);
        return Ok(new ApiResponse<CartDTO> { Success = true, Data = dto, Message = "Item added" });
    }

    [HttpPut("items/{itemId}")]
    public async Task<ActionResult<ApiResponse<CartDTO>>> UpdateItem(int itemId, [FromBody] UpdateCartItemRequest req)
    {
        var userId = GetUserId();
        var cart = await _db.Carts.Include(c => c.Items).FirstOrDefaultAsync(c => c.UserId == userId);
        if (cart == null) return NotFound(new ErrorResponse { Message = "Cart not found" });

        var item = await _db.CartItems.FirstOrDefaultAsync(i => i.Id == itemId && i.CartId == cart.Id);
        if (item == null) return NotFound(new ErrorResponse { Message = "Item not found" });

        if (req.Quantity <= 0)
        {
            _db.CartItems.Remove(item);
        }
        else
        {
            item.Quantity = req.Quantity;
        }

        cart.UpdatedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();

        var dto = await ToDtoAsync(cart);
        return Ok(new ApiResponse<CartDTO> { Success = true, Data = dto, Message = "Cart updated" });
    }

    [HttpDelete("items/{itemId}")]
    public async Task<ActionResult<ApiResponse<CartDTO>>> RemoveItem(int itemId)
    {
        var userId = GetUserId();
        var cart = await _db.Carts.Include(c => c.Items).FirstOrDefaultAsync(c => c.UserId == userId);
        if (cart == null) return NotFound(new ErrorResponse { Message = "Cart not found" });

        var item = await _db.CartItems.FirstOrDefaultAsync(i => i.Id == itemId && i.CartId == cart.Id);
        if (item == null) return NotFound(new ErrorResponse { Message = "Item not found" });

        _db.CartItems.Remove(item);
        cart.UpdatedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();

        var dto = await ToDtoAsync(cart);
        return Ok(new ApiResponse<CartDTO> { Success = true, Data = dto, Message = "Item removed" });
    }

    [HttpDelete]
    public async Task<ActionResult<ApiResponse<object>>> ClearCart()
    {
        var userId = GetUserId();
        var cart = await _db.Carts.Include(c => c.Items).FirstOrDefaultAsync(c => c.UserId == userId);
        if (cart == null) return Ok(new ApiResponse<object> { Success = true, Message = "Cart cleared" });

        _db.CartItems.RemoveRange(cart.Items);
        cart.UpdatedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        return Ok(new ApiResponse<object> { Success = true, Message = "Cart cleared" });
    }

    [HttpGet("summary")]
    public async Task<ActionResult<ApiResponse<CartSummaryDTO>>> Summary()
    {
        var userId = GetUserId();
        var cart = await _db.Carts.Include(c => c.Items).FirstOrDefaultAsync(c => c.UserId == userId);
        if (cart == null)
            return Ok(new ApiResponse<CartSummaryDTO> { Success = true, Data = new CartSummaryDTO { ItemCount = 0, TotalPrice = 0 } });

        var itemCount = cart.Items.Sum(i => i.Quantity);
        var total = cart.Items.Sum(i => i.Price * i.Quantity);
        return Ok(new ApiResponse<CartSummaryDTO> { Success = true, Data = new CartSummaryDTO { ItemCount = itemCount, TotalPrice = total } });
    }

    private int GetUserId()
    {
        var idStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0";
        return int.TryParse(idStr, out var id) ? id : 0;
    }

    private async Task<Cart> GetOrCreateCartAsync(int userId)
    {
        var cart = await _db.Carts.Include(c => c.Items).FirstOrDefaultAsync(c => c.UserId == userId);
        if (cart != null) return cart;
        cart = new Cart { UserId = userId, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow };
        _db.Carts.Add(cart);
        await _db.SaveChangesAsync();
        return cart;
    }

    private async Task<ProductDTO?> FetchProductAsync(int productId)
    {
        var baseUrl = _config["PRODUCTS_API_BASE_URL"] ?? Environment.GetEnvironmentVariable("PRODUCTS_API_BASE_URL") ?? "http://localhost:5003";
        var client = _httpClientFactory.CreateClient();
        try
        {
            var resp = await client.GetFromJsonAsync<ApiResponse<ProductDTO>>($"{baseUrl}/api/products/{productId}");
            return resp?.Data;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching product {ProductId}", productId);
            return null;
        }
    }

    private Task<CartDTO> ToDtoAsync(Cart cart)
    {
        var dto = new CartDTO
        {
            Id = cart.Id,
            UserId = cart.UserId,
            CreatedAt = cart.CreatedAt,
            UpdatedAt = cart.UpdatedAt,
            Items = cart.Items.Select(i => new CartItemDTO
            {
                Id = i.Id,
                CartId = i.CartId,
                ProductId = i.ProductId,
                ProductName = i.ProductName,
                Price = i.Price,
                Quantity = i.Quantity
            }).ToList()
        };
        dto.TotalPrice = dto.Items.Sum(x => x.Subtotal);
        return Task.FromResult(dto);
    }
}

