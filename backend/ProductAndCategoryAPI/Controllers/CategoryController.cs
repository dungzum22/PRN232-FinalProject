using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductAndCategoryAPI.Data;
using ProductAndCategoryAPI.Models;
using SharedDTOs;

namespace ProductAndCategoryAPI.Controllers;

[ApiController]
[Route("api/categories")]
public class CategoryController : ControllerBase
{
    private readonly ProductDbContext _db;
    private readonly ILogger<CategoryController> _logger;

    public CategoryController(ProductDbContext db, ILogger<CategoryController> logger)
    {
        _db = db;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse<List<CategoryDTO>>>> GetAll()
    {
        var categories = await _db.Categories.AsNoTracking().Where(c => c.IsActive)
            .OrderByDescending(c => c.CreatedAt)
            .Select(c => ToDto(c)).ToListAsync();
        return Ok(new ApiResponse<List<CategoryDTO>> { Success = true, Data = categories });
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ApiResponse<CategoryDTO>>> GetById(int id)
    {
        var c = await _db.Categories.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id && x.IsActive);
        if (c == null) return NotFound(new ErrorResponse { Message = "Category not found" });
        return Ok(new ApiResponse<CategoryDTO> { Success = true, Data = ToDto(c) });
    }

    [HttpPost]
    [Authorize(Roles = "admin")]
    public async Task<ActionResult<ApiResponse<CategoryDTO>>> Create(CreateCategoryRequest req)
    {
        if (string.IsNullOrWhiteSpace(req.Name))
            return BadRequest(new ErrorResponse { Message = "Name is required" });
        var c = new Category
        {
            Name = req.Name.Trim(),
            Description = req.Description?.Trim() ?? string.Empty,
            ImageUrl = req.ImageUrl,
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        };
        _db.Categories.Add(c);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = c.Id }, new ApiResponse<CategoryDTO> { Success = true, Data = ToDto(c), Message = "Category created" });
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "admin")]
    public async Task<ActionResult<ApiResponse<CategoryDTO>>> Update(int id, UpdateCategoryRequest req)
    {
        var c = await _db.Categories.FindAsync(id);
        if (c == null) return NotFound(new ErrorResponse { Message = "Category not found" });
        if (req.Name != null) c.Name = req.Name.Trim();
        if (req.Description != null) c.Description = req.Description.Trim();
        if (req.ImageUrl != null) c.ImageUrl = req.ImageUrl;
        c.UpdatedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        return Ok(new ApiResponse<CategoryDTO> { Success = true, Data = ToDto(c), Message = "Category updated" });
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "admin")]
    public async Task<ActionResult<ApiResponse<object>>> Delete(int id)
    {
        var c = await _db.Categories.FindAsync(id);
        if (c == null) return NotFound(new ErrorResponse { Message = "Category not found" });
        c.IsActive = false;
        c.UpdatedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        return Ok(new ApiResponse<object> { Success = true, Message = "Category deleted" });
    }

    private static CategoryDTO ToDto(Category c) => new()
    {
        Id = c.Id,
        Name = c.Name,
        Description = c.Description,
        ImageUrl = c.ImageUrl,
        IsActive = c.IsActive,
        CreatedAt = c.CreatedAt
    };
}

