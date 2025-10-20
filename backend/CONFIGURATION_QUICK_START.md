# ⚡ Configuration Quick Start (5 minutes)

## 🎯 TL;DR - Just Do This

### Step 1: Copy Template to Each Service
```bash
cd backend

# Copy to all services
copy appsettings.Development.json.template AuthAPI\appsettings.Development.json
copy appsettings.Development.json.template UserAPI\appsettings.Development.json
copy appsettings.Development.json.template ProductAndCategoryAPI\appsettings.Development.json
copy appsettings.Development.json.template CartAPI\appsettings.Development.json
copy appsettings.Development.json.template OrderAPI\appsettings.Development.json
copy appsettings.Development.json.template FeedbackAPI\appsettings.Development.json
copy appsettings.Development.json.template NotificationAPI\appsettings.Development.json
copy appsettings.Development.json.template Gateway\appsettings.Development.json
```

### Step 2: Update Values (Edit Each File)

Open each `appsettings.Development.json` and update:

```json
{
  "ConnectionStrings": {
    // If using Docker:
    "DefaultConnection": "Host=postgres;Port=5432;Database=bakery_db;Username=postgres;Password=bakery_password;"
    
    // If local PostgreSQL:
    // "DefaultConnection": "Host=localhost;Port=5432;Database=bakery_db;Username=postgres;Password=your_password;"
  },
  "JwtSettings": {
    "Secret": "CHANGE_THIS_TO_SOMETHING_RANDOM_AND_LONG_32_CHARS_MINIMUM",
    "ExpirationMinutes": 60
  }
}
```

### Step 3: Install Dependencies
```bash
dotnet restore PRN232_Final_Project_Server.sln
```

### Step 4: Run!
```bash
# Option A: Docker (EASIEST)
docker-compose -f docker-compose-dev.yml up -d

# Option B: Visual Studio
# Open .sln → Set Multiple Startup Projects → F5

# Option C: Command Line (each in separate terminal)
cd Gateway && dotnet run
cd AuthAPI && dotnet run
# etc...
```

---

## 📋 What Each Value Means

| Setting | Value | Example |
|---------|-------|---------|
| **Host** | Where PostgreSQL is running | `localhost` (local) or `postgres` (Docker) |
| **Port** | PostgreSQL port | `5432` (default) |
| **Database** | Database name | `bakery_db` |
| **Username** | PostgreSQL user | `postgres` |
| **Password** | PostgreSQL password | `bakery_password` |
| **JWT Secret** | Token signing key | Must be 32+ random chars |
| **Expiration** | Token lifetime (minutes) | `60` = 1 hour |

---

## ✅ Verify It Works

```bash
# You should see services listening on:
# Gateway: https://localhost:5000
# AuthAPI: https://localhost:5001
# UserAPI: https://localhost:5002
# ProductAndCategoryAPI: https://localhost:5003
# CartAPI: https://localhost:5004
# OrderAPI: https://localhost:5005
# FeedbackAPI: https://localhost:5006
# NotificationAPI: https://localhost:5007

# Test Gateway is working:
curl http://localhost:5000/health
# Should return: {"status":"OK","service":"Gateway",...}
```

---

## 🚨 Important Security Notes

**NEVER COMMIT:**
- `appsettings.Development.json`
- `appsettings.Production.json`
- `.env` files
- Database passwords
- API keys
- JWT secrets

These are **automatically ignored** by `.gitignore` ✅

---

## 🆘 Common Issues

### "Cannot connect to database"
- Is PostgreSQL running? `psql -U postgres` to test
- Using Docker? Make sure `postgres` service is running
- Check connection string Host is correct

### "Port already in use"
```bash
# Find what's using port 5000
netstat -ano | findstr :5000

# Kill it (Windows)
taskkill /PID <PID> /F

# Or just use a different port in appsettings
```

### "JWT secret too short"
- Minimum 32 characters
- Make it random: `Your-Password-Or-Random-String-Here-At-Least-32-Chars`

---

## 📚 Full Documentation

See `CONFIGURATION_SETUP.md` for:
- Stripe setup
- Email configuration
- Production deployment
- User secrets
- Advanced configurations

---

**Ready? Run `docker-compose -f docker-compose-dev.yml up -d` and you're done!**
