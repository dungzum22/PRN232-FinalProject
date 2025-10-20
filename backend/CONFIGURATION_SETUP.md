# 🔧 Configuration Setup Guide - .NET 8 Backend

## Quick Overview

Each .NET microservice needs an `appsettings.Development.json` file for local development. Here's how to set it up:

---

## 📝 Step 1: Create appsettings Files

### For All Services

Copy the template to each service directory:

```
backend/
├── AuthAPI/
│   └── appsettings.Development.json
├── UserAPI/
│   └── appsettings.Development.json
├── ProductAndCategoryAPI/
│   └── appsettings.Development.json
├── CartAPI/
│   └── appsettings.Development.json
├── OrderAPI/
│   └── appsettings.Development.json
├── FeedbackAPI/
│   └── appsettings.Development.json
├── NotificationAPI/
│   └── appsettings.Development.json
└── Gateway/
    └── appsettings.Development.json
```

---

## 🔐 Configuration Values Needed

### 1. Database Connection

**For Local Development:**
```json
"ConnectionStrings": {
  "DefaultConnection": "Host=localhost;Port=5432;Database=bakery_db;Username=postgres;Password=bakery_password;"
}
```

**If using Docker:**
```json
"ConnectionStrings": {
  "DefaultConnection": "Host=postgres;Port=5432;Database=bakery_db;Username=postgres;Password=bakery_password;"
}
```

### 2. JWT Secret Key

**IMPORTANT: Change this in production!**

Generate a strong secret key:
```bash
# Using .NET CLI
dotnet user-secrets set "JwtSettings:Secret" "your-generated-secret-key"
```

Or create one manually (min 32 characters):
```json
"JwtSettings": {
  "Secret": "ThisIsAVeryLongSecretKeyFor32CharactersMinimum123456789",
  "ExpirationMinutes": 60,
  "RefreshTokenExpirationDays": 7
}
```

### 3. Redis Connection

```json
"RedisConnection": "localhost:6379"
```

### 4. Stripe Keys (Optional for now, required later)

Get from: https://dashboard.stripe.com/apikeys

```json
"Stripe": {
  "SecretKey": "sk_test_...",
  "PublicKey": "pk_test_...",
  "WebhookSecret": "whsec_..."
}
```

### 5. Email Configuration (Optional)

For Gmail:
1. Enable 2-factor authentication
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Use that password:

```json
"Email": {
  "SmtpHost": "smtp.gmail.com",
  "SmtpPort": 587,
  "SenderEmail": "your-email@gmail.com",
  "SenderPassword": "your-app-password-here"
}
```

---

## 🚀 Quick Setup Script

### Windows (PowerShell)

Create `setup-config.ps1`:

```powershell
# Create appsettings files for all services
$services = @("AuthAPI", "UserAPI", "ProductAndCategoryAPI", "CartAPI", "OrderAPI", "FeedbackAPI", "NotificationAPI", "Gateway")

$template = @"
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Warning"
    }
  },
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=bakery_db;Username=postgres;Password=bakery_password;"
  },
  "JwtSettings": {
    "Secret": "your-secret-key-at-least-32-characters-long",
    "ExpirationMinutes": 60
  },
  "AllowedHosts": "*"
}
"@

foreach ($service in $services) {
    $path = "$service/appsettings.Development.json"
    if (-Not (Test-Path $path)) {
        $template | Out-File -FilePath $path -Encoding UTF8
        Write-Host "Created: $path"
    } else {
        Write-Host "Already exists: $path"
    }
}
```

Run it:
```bash
.\setup-config.ps1
```

### Linux/Mac

Create `setup-config.sh`:

```bash
#!/bin/bash

services=("AuthAPI" "UserAPI" "ProductAndCategoryAPI" "CartAPI" "OrderAPI" "FeedbackAPI" "NotificationAPI" "Gateway")

template='{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Warning"
    }
  },
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=bakery_db;Username=postgres;Password=bakery_password;"
  },
  "JwtSettings": {
    "Secret": "your-secret-key-at-least-32-characters-long",
    "ExpirationMinutes": 60
  },
  "AllowedHosts": "*"
}'

for service in "${services[@]}"; do
    path="$service/appsettings.Development.json"
    if [ ! -f "$path" ]; then
        echo "$template" > "$path"
        echo "Created: $path"
    else
        echo "Already exists: $path"
    fi
done
```

Run it:
```bash
chmod +x setup-config.sh
./setup-config.sh
```

---

## 🐳 Docker Environment Variables

If using `docker-compose-dev.yml`, set environment variables:

```yaml
environment:
  ASPNETCORE_ENVIRONMENT: Development
  ConnectionStrings__DefaultConnection: "Host=postgres;Port=5432;Database=bakery_db;Username=postgres;Password=bakery_password;"
  JwtSettings__Secret: "your-secret-key-here"
  JwtSettings__ExpirationMinutes: 60
```

Note: Double underscores `__` map to nested JSON keys.

---

## 📋 Configuration Checklist

### Local Development Checklist

- [ ] PostgreSQL installed and running on localhost:5432
- [ ] Redis installed and running on localhost:6379
- [ ] Created `appsettings.Development.json` in each service
- [ ] Updated database password if different
- [ ] Updated JWT secret key
- [ ] Updated Stripe keys (optional)
- [ ] Updated email credentials (optional)

### Before Deploying to Production

- [ ] Create `appsettings.Production.json`
- [ ] Set strong JWT secret (32+ characters, random)
- [ ] Use production database connection
- [ ] Use production Stripe keys
- [ ] Set up secrets management (GitHub Secrets, Render Environment)
- [ ] Never commit passwords to git

---

## 🔒 Security Best Practices

### 1. Use User Secrets for Development

```bash
cd AuthAPI
dotnet user-secrets init
dotnet user-secrets set "JwtSettings:Secret" "your-secret-key"
```

### 2. .gitignore Sensitive Files

```
# Never commit these:
appsettings.Development.json
appsettings.Production.json
*.env
.env.local
user-secrets.json
```

### 3. Production Secrets

Use Render's Environment Variables:
1. Go to your Render service
2. Settings → Environment
3. Add sensitive variables:
   - `ConnectionStrings__DefaultConnection`
   - `JwtSettings__Secret`
   - `Stripe__SecretKey`
   - etc.

---

## 🧪 Test Your Configuration

Run this to verify everything works:

```bash
cd AuthAPI
dotnet run

# Should see: "Now listening on: https://localhost:7001" or similar
```

---

## 📚 Configuration Reference

### Environment-Specific Files

```
appsettings.json                    # Base configuration (shared)
appsettings.Development.json        # Local development (gitignored)
appsettings.Production.json         # Production (gitignored)
```

### Load Priority

1. `appsettings.json` (base)
2. `appsettings.{ENVIRONMENT}.json` (override)
3. Environment variables (highest priority)

Example:
```csharp
// In Program.cs
var builder = WebApplication.CreateBuilder(args);

// Automatically loads:
// - appsettings.json
// - appsettings.Development.json (if ASPNETCORE_ENVIRONMENT=Development)
// - Environment variables
```

---

## ✅ Verification Steps

After setting up configurations:

```bash
# 1. Check all services have config files
ls -la */appsettings.Development.json

# 2. Verify JSON syntax
dotnet build

# 3. Test database connection
cd UserAPI
dotnet run
# Check for "Successfully created" or "Connected" messages

# 4. Test JWT configuration
# Login endpoint should return tokens
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

---

## 🆘 Troubleshooting

### Error: "Cannot connect to database"

```json
// Check your connection string
"Host=localhost",      // Should be 'postgres' if using Docker
"Port=5432",           // Default PostgreSQL port
"Database=bakery_db",  // Database name
"Username=postgres",   // PostgreSQL user
"Password=***"         // PostgreSQL password
```

### Error: "Invalid JWT secret"

```json
// Must be at least 32 characters
"Secret": "this-is-too-short"  // ❌ WRONG
"Secret": "this-is-a-valid-secret-key-with-32-chars" // ✅ CORRECT
```

### Error: "Configuration not found"

Make sure the file is named exactly: `appsettings.Development.json`
(Not `appsettings.development.json` - case sensitive on Linux!)

---

## 📞 Need Help?

Check these files for examples:
- `backend/appsettings.Development.json.template` - Template file
- `backend/BACKEND_SETUP.md` - Full setup guide
- Individual service `Program.cs` files - See configuration usage

---

**Created:** October 2024  
**Updated:** Latest  
**Status:** Ready to configure
