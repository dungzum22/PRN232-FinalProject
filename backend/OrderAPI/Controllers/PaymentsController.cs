using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OrderAPI.Data;
using OrderAPI.Models;
using SharedDTOs;
using Stripe;

namespace OrderAPI.Controllers;

[ApiController]
[Route("api/payments")]
public class PaymentsController : ControllerBase
{
    private readonly IConfiguration _config;
    private readonly OrderDbContext _db;
    private readonly ILogger<PaymentsController> _logger;

    public PaymentsController(IConfiguration config, OrderDbContext db, ILogger<PaymentsController> logger)
    {
        _config = config;
        _db = db;
        _logger = logger;
    }

    [Authorize]
    [HttpPost("create-intent")]
    public async Task<ActionResult<ApiResponse<object>>> CreateIntent([FromBody] CreateIntentRequest req)
    {
        if (req.Amount <= 0)
            return BadRequest(new ErrorResponse { Message = "Invalid amount" });

        var currency = string.IsNullOrWhiteSpace(req.Currency) ? "usd" : req.Currency!.ToLower();

        var options = new PaymentIntentCreateOptions
        {
            Amount = req.Amount,
            Currency = currency,
            AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions { Enabled = true },
            Metadata = req.Metadata ?? new Dictionary<string, string>()
        };
        var service = new PaymentIntentService();
        var intent = await service.CreateAsync(options);
        return Ok(new ApiResponse<object> { Success = true, Data = new { clientSecret = intent.ClientSecret } });
    }

    [AllowAnonymous]
    [HttpPost("webhook")]
    public async Task<IActionResult> Webhook()
    {
        var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
        var signatureHeader = Request.Headers["Stripe-Signature"].FirstOrDefault();
        var webhookSecret = _config["Stripe:WebhookSecret"];
        if (string.IsNullOrWhiteSpace(signatureHeader) || string.IsNullOrWhiteSpace(webhookSecret))
        {
            _logger.LogWarning("Stripe webhook missing signature or secret");
            return BadRequest();
        }

        Event? stripeEvent;
        try
        {
            stripeEvent = EventUtility.ConstructEvent(json, signatureHeader, webhookSecret);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Stripe webhook signature verification failed");
            return BadRequest();
        }

        try
        {
            if (stripeEvent.Type == "payment_intent.succeeded")
            {
                var intent = (PaymentIntent)stripeEvent.Data.Object;
                if (intent.Metadata != null && intent.Metadata.TryGetValue("orderId", out var orderIdStr) && int.TryParse(orderIdStr, out var orderId))
                {
                    var order = await _db.Orders.FirstOrDefaultAsync(o => o.Id == orderId);
                    if (order != null)
                    {
                        order.Status = "paid";
                        order.UpdatedAt = DateTime.UtcNow;
                        await _db.SaveChangesAsync();
                    }
                }
            }
            else if (stripeEvent.Type == "payment_intent.payment_failed")
            {
                var intent = (PaymentIntent)stripeEvent.Data.Object;
                if (intent.Metadata != null && intent.Metadata.TryGetValue("orderId", out var orderIdStr) && int.TryParse(orderIdStr, out var orderId))
                {
                    var order = await _db.Orders.FirstOrDefaultAsync(o => o.Id == orderId);
                    if (order != null)
                    {
                        order.Status = "cancelled";
                        order.UpdatedAt = DateTime.UtcNow;
                        await _db.SaveChangesAsync();
                    }
                }
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error handling Stripe webhook");
            return StatusCode(500);
        }

        return Ok();
    }
}

public class CreateIntentRequest
{
    public long Amount { get; set; } // cents
    public string? Currency { get; set; } = "usd";
    public Dictionary<string, string>? Metadata { get; set; }
}

