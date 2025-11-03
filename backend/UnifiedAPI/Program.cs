using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

// DbContexts from services
using ProductAndCategoryAPI.Data;
using CartAPI.Data;
using OrderAPI.Data;
using FeedbackAPI.Data;
using NotificationAPI.Data;
using UserAPI.Data;

// Controllers/Hubs types to load as ApplicationParts
using ProductAndCategoryAPI.Controllers;
using NotificationAPI.Hubs;

// Auth service types
using AuthAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// Configuration
var jwtSettings = builder.Configuration.GetSection("JwtSettings");
var secretKey = Encoding.ASCII.GetBytes(jwtSettings["Secret"] ?? "your-secret-key-here");

// Services
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy => policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});

// Databases (all share the same DefaultConnection for dev simplicity)
var connStr = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ProductDbContext>(o => o.UseNpgsql(connStr, npg => npg.MigrationsHistoryTable("__EFMigrationsHistory_Product")));
builder.Services.AddDbContext<CartDbContext>(o => o.UseNpgsql(connStr, npg => npg.MigrationsHistoryTable("__EFMigrationsHistory_Cart")));
builder.Services.AddDbContext<OrderDbContext>(o => o.UseNpgsql(connStr, npg => npg.MigrationsHistoryTable("__EFMigrationsHistory_Order")));
builder.Services.AddDbContext<FeedbackDbContext>(o => o.UseNpgsql(connStr, npg => npg.MigrationsHistoryTable("__EFMigrationsHistory_Feedback")));
builder.Services.AddDbContext<NotificationDbContext>(o => o.UseNpgsql(connStr, npg => npg.MigrationsHistoryTable("__EFMigrationsHistory_Notification")));
builder.Services.AddDbContext<UserDbContext>(o => o.UseNpgsql(connStr, npg => npg.MigrationsHistoryTable("__EFMigrationsHistory_User")));

// AuthDbContext is declared in AuthAPI assembly (public class in Program.cs)
builder.Services.AddDbContext<AuthDbContext>(o => o.UseNpgsql(connStr, npg => npg.MigrationsHistoryTable("__EFMigrationsHistory_Auth")));

// Authentication/Authorization
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(secretKey),
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero
    };
});
builder.Services.AddAuthorization();

// Auth services
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IPasswordService, PasswordService>();
builder.Services.AddScoped<ITokenService, TokenService>();

// MVC + load controllers from other projects
builder.Services.AddControllers()
    .PartManager.ApplicationParts.Add(new AssemblyPart(typeof(ProductController).Assembly));

// Also load all other API assemblies
builder.Services.PostConfigure<ApplicationPartManager>(pm =>
{
    var assemblies = new[]
    {
        typeof(AuthAPI.Program).Assembly,
        typeof(UserAPI.Program).Assembly,
        typeof(ProductAndCategoryAPI.Program).Assembly,
        typeof(CartAPI.Program).Assembly,
        typeof(OrderAPI.Program).Assembly,
        typeof(FeedbackAPI.Program).Assembly,
        typeof(NotificationAPI.Program).Assembly,
    };
    foreach (var asm in assemblies)
    {
        pm.ApplicationParts.Add(new AssemblyPart(asm));
    }
});

builder.Services.AddSignalR();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");
app.UseAuthentication();
app.UseAuthorization();

// Hubs
app.MapHub<NotificationHub>("/hubs/notifications");

// Controllers
app.MapControllers();

// Health
app.MapGet("/health", () => new { status = "OK", service = "UnifiedAPI", timestamp = DateTime.UtcNow })
   .WithName("Health")
   .WithOpenApi();

// Apply EF Core migrations (dev only)
try
{
    using var scope = app.Services.CreateScope();
    foreach (var db in new DbContext[]
    {
        scope.ServiceProvider.GetRequiredService<ProductDbContext>(),
        scope.ServiceProvider.GetRequiredService<CartDbContext>(),
        scope.ServiceProvider.GetRequiredService<OrderDbContext>(),
        scope.ServiceProvider.GetRequiredService<FeedbackDbContext>(),
        scope.ServiceProvider.GetRequiredService<NotificationDbContext>(),
        scope.ServiceProvider.GetRequiredService<UserDbContext>(),
        scope.ServiceProvider.GetRequiredService<AuthDbContext>(),
    })
    {
        db.Database.Migrate();
    }
}
catch { }

app.Run("http://localhost:5000");


