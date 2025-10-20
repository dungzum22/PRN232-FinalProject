using Ocelot.DependencyInjection;
using Ocelot.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Load Ocelot configuration
builder.Configuration.AddJsonFile("ocelot.json", optional: false, reloadOnChange: true);

// ==================== SERVICES ====================

// Add Ocelot
builder.Services.AddOcelot();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policyBuilder =>
    {
        policyBuilder.AllowAnyOrigin()
                     .AllowAnyMethod()
                     .AllowAnyHeader();
    });
});

// Add API documentation
builder.Services.AddSwaggerGen();
builder.Services.AddSwaggerForOcelot(builder.Configuration);

// ==================== MIDDLEWARE ====================

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "API Gateway v1");
    });
}

app.UseCors("AllowAll");
app.UseHttpsRedirection();

// Health check endpoint
app.MapGet("/health", () => new { status = "OK", service = "Gateway", timestamp = DateTime.UtcNow })
    .WithName("Gateway Health")
    .WithOpenApi()
    .AllowAnonymous();

// Use Ocelot middleware
await app.UseOcelot();

app.Run();
