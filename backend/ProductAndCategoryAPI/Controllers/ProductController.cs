using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductAndCategoryAPI.Data;
using ProductAndCategoryAPI.Models;
using SharedDTOs;

namespace ProductAndCategoryAPI.Controllers;

[ApiController]
[Route("api/products")]
public class ProductController : ControllerBase
{
    private readonly ProductDbContext _db;
    private readonly ILogger<ProductController> _logger;

    public ProductController(ProductDbContext db, ILogger<ProductController> logger)
    {
        _db = db;
        _logger = logger;
    }

    // GET /api/products
    [HttpGet]
    public async Task<ActionResult<ApiResponse<PaginatedResponse<ProductDTO>>>> GetProducts(
        [FromQuery] string? q,
        [FromQuery] int? categoryId,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 12)
    {
        var query = _db.Products
            .AsNoTracking()
            .Where(p => p.IsActive);

        if (!string.IsNullOrWhiteSpace(q))
        {
            var term = q.Trim().ToLower();
            query = query.Where(p => p.Name.ToLower().Contains(term) || p.Description.ToLower().Contains(term));
        }
        if (categoryId.HasValue)
        {
            query = query.Where(p => p.CategoryId == categoryId.Value);
        }

        var total = await query.CountAsync();
        var items = await query
            .OrderByDescending(p => p.CreatedAt)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(p => ToDto(p))
            .ToListAsync();

        var result = new PaginatedResponse<ProductDTO>
        {
            Items = items,
            TotalCount = total,
            PageNumber = pageNumber,
            PageSize = pageSize
        };
        return Ok(new ApiResponse<PaginatedResponse<ProductDTO>> { Success = true, Data = result, Message = "Products retrieved" });
    }

    // GET /api/products/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<ApiResponse<ProductDTO>>> GetById(int id)
    {
        var p = await _db.Products.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id && x.IsActive);
        if (p == null)
            return NotFound(new ErrorResponse { Message = "Product not found" });
        return Ok(new ApiResponse<ProductDTO> { Success = true, Data = ToDto(p) });
    }

    // GET /api/products/search?q=
    [HttpGet("search")]
    public Task<ActionResult<ApiResponse<PaginatedResponse<ProductDTO>>>> Search([FromQuery] string q, [FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 12)
        => GetProducts(q, null, pageNumber, pageSize);

    // GET /api/products/category/{categoryId}
    [HttpGet("category/{categoryId}")]
    public Task<ActionResult<ApiResponse<PaginatedResponse<ProductDTO>>>> ByCategory(int categoryId, [FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 12)
        => GetProducts(null, categoryId, pageNumber, pageSize);

    // POST /api/products (admin)
    [HttpPost]
    [Authorize(Roles = "admin")]
    public async Task<ActionResult<ApiResponse<ProductDTO>>> Create([FromBody] CreateProductRequest req)
    {
        if (string.IsNullOrWhiteSpace(req.Name) || req.Price < 0 || req.Quantity < 0)
            return BadRequest(new ErrorResponse { Message = "Invalid product data" });

        var category = await _db.Categories.FindAsync(req.CategoryId);
        if (category == null || !category.IsActive)
            return BadRequest(new ErrorResponse { Message = "Category not found or inactive" });

        var entity = new Product
        {
            Name = req.Name.Trim(),
            Description = req.Description?.Trim() ?? string.Empty,
            Price = req.Price,
            Quantity = req.Quantity,
            CategoryId = req.CategoryId,
            ImageUrl = req.ImageUrl,
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        };
        _db.Products.Add(entity);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, new ApiResponse<ProductDTO>
        {
            Success = true,
            Data = ToDto(entity),
            Message = "Product created"
        });
    }

    // PUT /api/products/{id} (admin)
    [HttpPut("{id}")]
    [Authorize(Roles = "admin")]
    public async Task<ActionResult<ApiResponse<ProductDTO>>> Update(int id, [FromBody] UpdateProductRequest req)
    {
        var p = await _db.Products.FindAsync(id);
        if (p == null)
            return NotFound(new ErrorResponse { Message = "Product not found" });

        if (req.Name != null) p.Name = req.Name.Trim();
        if (req.Description != null) p.Description = req.Description.Trim();
        if (req.Price.HasValue) p.Price = req.Price.Value;
        if (req.Quantity.HasValue) p.Quantity = req.Quantity.Value;
        if (req.CategoryId.HasValue)
        {
            var cat = await _db.Categories.FindAsync(req.CategoryId.Value);
            if (cat == null || !cat.IsActive)
                return BadRequest(new ErrorResponse { Message = "Category not found or inactive" });
            p.CategoryId = req.CategoryId.Value;
        }
        if (req.ImageUrl != null) p.ImageUrl = req.ImageUrl;
        p.UpdatedAt = DateTime.UtcNow;

        await _db.SaveChangesAsync();
        return Ok(new ApiResponse<ProductDTO> { Success = true, Data = ToDto(p), Message = "Product updated" });
    }

    // DELETE /api/products/{id} (admin)
    [HttpDelete("{id}")]
    [Authorize(Roles = "admin")]
    public async Task<ActionResult<ApiResponse<object>>> Delete(int id)
    {
        var p = await _db.Products.FindAsync(id);
        if (p == null)
            return NotFound(new ErrorResponse { Message = "Product not found" });
        p.IsActive = false;
        p.UpdatedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        return Ok(new ApiResponse<object> { Success = true, Message = "Product deleted" });
    }

    private static ProductDTO ToDto(Product p) => new()
    {
        Id = p.Id,
        Name = p.Name,
        Description = p.Description,
        Price = p.Price,
        Quantity = p.Quantity,
        CategoryId = p.CategoryId,
        ImageUrl = p.ImageUrl,
        IsActive = p.IsActive,
        CreatedAt = p.CreatedAt,
        UpdatedAt = p.UpdatedAt ?? p.CreatedAt
    };
}

