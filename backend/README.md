# 🏗️ Bakery E-Commerce Backend v2.0

## Architecture: .NET 8.0 + ASP.NET Core Microservices

Backend consists of 8 microservices + 1 API Gateway:

```
Gateway (Ocelot)
│
├── AuthAPI              # Authentication & JWT tokens
├── UserAPI              # User management
├── ProductAndCategoryAPI # Products & categories
├── CartAPI              # Shopping cart
├── OrderAPI             # Order processing
├── FeedbackAPI          # Product reviews
├── NotificationAPI      # Email & SignalR notifications
└── Payment Integration  # Stripe webhooks
```

---

## 🛠️ Technology Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| Runtime | .NET | 8.0 |
| Language | C# | Latest |
| ORM | Entity Framework Core | 8.0 |
| Database | PostgreSQL | 14+ |
| Caching | Redis | 7+ |
| Auth | JWT | Bearer tokens |
| Payment | Stripe | Latest SDK |
| API Gateway | Ocelot | Latest |

---

## 📁 Project Structure

```
backend/
├── Gateway/                          # API Gateway (Ocelot)
│   ├── Gateway.csproj
│   ├── Program.cs
│   ├── ocelot.json                  # Route configuration
│   └── Properties/
│
├── AuthAPI/                         # Authentication Service
│   ├── AuthAPI.csproj
│   ├── Controllers/
│   ├── Services/
│   ├── DTOs/
│   ├── Program.cs
│   └── Properties/
│
├── UserAPI/                         # User Management Service
│   ├── UserAPI.csproj
│   ├── Controllers/
│   ├── Services/
│   ├── Data/
│   ├── Models/
│   ├── Migrations/
│   └── Program.cs
│
├── ProductAndCategoryAPI/           # Product & Category Service
│   ├── ProductAndCategoryAPI.csproj
│   ├── Controllers/
│   ├── Services/
│   ├── Data/
│   ├── Models/
│   ├── Migrations/
│   └── Program.cs
│
├── CartAPI/                         # Cart Service
│   ├── CartAPI.csproj
│   ├── Controllers/
│   ├── Services/
│   ├── Data/
│   ├── Models/
│   ├── Migrations/
│   └── Program.cs
│
├── OrderAPI/                        # Order Processing Service
│   ├── OrderAPI.csproj
│   ├── Controllers/
│   ├── Services/
│   ├── Data/
│   ├── Models/
│   ├── Migrations/
│   └── Program.cs
│
├── FeedbackAPI/                     # Feedback/Review Service
│   ├── FeedbackAPI.csproj
│   ├── Controllers/
│   ├── Services/
│   ├── Data/
│   ├── Models/
│   ├── Migrations/
│   └── Program.cs
│
├── NotificationAPI/                 # Notification Service
│   ├── NotificationAPI.csproj
│   ├── Controllers/
│   ├── Hubs/                        # SignalR hubs
│   ├── Services/
│   ├── Program.cs
│   └── Properties/
│
├── DTOs/                            # Shared DTOs
│   ├── DTOs.csproj
│   ├── UserDTO/
│   ├── ProductDTO/
│   ├── OrderDTO/
│   ├── CartDTO/
│   └── FeedbackDTO/
│
├── Service/                         # Shared Services Layer
│   ├── Service.csproj
│   ├── Interfaces/
│   └── Services/
│
├── PRN232_Final_Project_Server.sln  # Solution file
└── ENV_TEMPLATE.md                  # Environment variables
```

---

## 🚀 Quick Start

### Prerequisites
- .NET 8.0 SDK ([Download](https://dotnet.microsoft.com/en-us/download))
- PostgreSQL 14+ or Docker
- Redis or Docker
- Visual Studio 2022 or VS Code with C# extension

### Setup

#### 1. Open Solution
```bash
cd backend
dotnet open PRN232_Final_Project_Server.sln
# or use Visual Studio
```

#### 2. Configure Environment Variables
Create `appsettings.Development.json` in each service:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=bakery_db;Username=bakery_user;Password=bakery_password;"
  },
  "RedisConnection": "localhost:6379",
  "JwtSettings": {
    "Secret": "your-secret-key-here",
    "ExpirationMinutes": 60
  },
  "Stripe": {
    "SecretKey": "sk_test_xxx",
    "PublicKey": "pk_test_xxx",
    "WebhookSecret": "whsec_xxx"
  }
}
```

#### 3. Run Database Migrations
```bash
# For each service with database
dotnet ef database update --project UserAPI
dotnet ef database update --project ProductAndCategoryAPI
dotnet ef database update --project CartAPI
dotnet ef database update --project OrderAPI
dotnet ef database update --project FeedbackAPI
```

#### 4. Start Services

**Using Visual Studio:**
- Set multiple startup projects: Gateway, AuthAPI, UserAPI, ProductAndCategoryAPI, CartAPI, OrderAPI, FeedbackAPI, NotificationAPI
- Press F5 to run all

**Using CLI:**
```bash
# Terminal 1 - Gateway
cd Gateway && dotnet run

# Terminal 2 - AuthAPI
cd AuthAPI && dotnet run

# Terminal 3 - UserAPI
cd UserAPI && dotnet run

# Terminal 4 - ProductAndCategoryAPI
cd ProductAndCategoryAPI && dotnet run

# Terminal 5 - CartAPI
cd CartAPI && dotnet run

# Terminal 6 - OrderAPI
cd OrderAPI && dotnet run

# Terminal 7 - FeedbackAPI
cd FeedbackAPI && dotnet run

# Terminal 8 - NotificationAPI
cd NotificationAPI && dotnet run
```

---

## 📊 Service Ports

| Service | Port | Purpose |
|---------|------|---------|
| Gateway | 5000 | Main entry point |
| AuthAPI | 5001 | Authentication |
| UserAPI | 5002 | User management |
| ProductAndCategoryAPI | 5003 | Product catalog |
| CartAPI | 5004 | Shopping cart |
| OrderAPI | 5005 | Order processing |
| FeedbackAPI | 5006 | Reviews & feedback |
| NotificationAPI | 5007 | Real-time notifications |

---

## 🔌 API Gateway (Ocelot) Routes

The Gateway routes requests to appropriate services:

```
GET    /api/auth/*           → AuthAPI:5001
POST   /api/auth/*           → AuthAPI:5001

GET    /api/users/*          → UserAPI:5002
POST   /api/users/*          → UserAPI:5002

GET    /api/products/*       → ProductAndCategoryAPI:5003
POST   /api/products/*       → ProductAndCategoryAPI:5003

GET    /api/cart/*           → CartAPI:5004
POST   /api/cart/*           → CartAPI:5004

GET    /api/orders/*         → OrderAPI:5005
POST   /api/orders/*         → OrderAPI:5005

GET    /api/feedback/*       → FeedbackAPI:5006
POST   /api/feedback/*       → FeedbackAPI:5006
```

See `Gateway/ocelot.json` for complete configuration.

---

## 🧪 Testing

### Run All Tests
```bash
dotnet test PRN232_Final_Project_Server.sln
```

### Run Specific Service Tests
```bash
dotnet test UserAPI
dotnet test ProductAndCategoryAPI
dotnet test OrderAPI
```

---

## 🔐 Stripe Integration

### Payment Flow

1. **Frontend** → POST `/api/payments/create-intent` with cart total
2. **OrderAPI** → Creates order and payment record
3. **Stripe** → Processes payment
4. **Webhook** → POST `/api/payments/webhook`
5. **OrderAPI** → Updates order status to "completed"
6. **Frontend** → Shows success message

### Webhook Configuration
- Endpoint: `https://your-domain/api/payments/webhook`
- Events: `charge.succeeded`, `charge.failed`, `charge.refunded`
- Secret: Set in `appsettings.Production.json`

---

## 📚 Key Files for Each Service

### AuthAPI
- `Controllers/AuthController.cs` - Login, register, token refresh
- `Services/AuthService.cs` - JWT generation, validation
- `DTOs/LoginRequest.cs`, `LoginResponse.cs` - Request/response models

### UserAPI
- `Controllers/UserController.cs` - User CRUD operations
- `Services/UserService.cs` - Business logic
- `Models/User.cs` - Database model
- `Data/UserContext.cs` - Entity Framework context

### ProductAndCategoryAPI
- `Controllers/ProductController.cs` - Product endpoints
- `Controllers/CategoryController.cs` - Category endpoints
- `Services/ProductService.cs` - Product logic
- `Models/Product.cs`, `Category.cs` - Database models

### OrderAPI
- `Controllers/OrderController.cs` - Order endpoints
- `Services/OrderService.cs` - Order processing
- `Models/Order.cs`, `OrderItem.cs` - Database models

### NotificationAPI
- `Hubs/NotificationHub.cs` - SignalR real-time updates
- `Controllers/NotificationController.cs` - Email sending

---

## 🛠️ Development Commands

| Command | Purpose |
|---------|---------|
| `dotnet new webapi -n ServiceName` | Create new service |
| `dotnet add package PackageName` | Install NuGet package |
| `dotnet ef migrations add MigrationName` | Create database migration |
| `dotnet ef database update` | Apply migrations |
| `dotnet build` | Compile solution |
| `dotnet run` | Run project |
| `dotnet test` | Run tests |
| `dotnet watch run` | Auto-reload on changes |

---

## 📖 Developer Responsibilities

**Dev 2 (@dev-backend-payments-v2):** 
- Implement AuthAPI (JWT tokens)
- Stripe payment integration
- Webhook handling

**Dev 3 (@dev-backend-services-v2):**
- Implement UserAPI
- Implement ProductAndCategoryAPI
- Implement CartAPI
- Implement OrderAPI
- Database migrations

**Dev 1 (@dev-lead-v2):**
- Configure Ocelot Gateway
- Set up Render deployment
- Configure CI/CD for .NET

---

## 📝 Git Workflow for Backend

```bash
# Dev 2 - Create feature branch for payments
git checkout -b feature/dev2-stripe-auth

# Dev 3 - Create feature branch for APIs
git checkout -b feature/dev3-user-product-apis

# Make changes, commit, push
git add .
git commit -m "feat: implement user service"
git push origin feature/dev3-user-product-apis

# Create Pull Request on GitHub
```

---

## 🚀 Deployment to Render

Render deployment uses Docker. Create `Dockerfile` in each service:

```dockerfile
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app
COPY . .
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out .
EXPOSE 8080
CMD ["dotnet", "ServiceName.dll"]
```

---

## 📞 Need Help?

```bash
@dev-backend-payments-v2 How do I implement JWT in AuthAPI?
@dev-backend-services-v2 Help me design the database schema
@dev-lead-v2 Configure the API Gateway routes
```

---

**Status:** ✅ Ready for .NET Development  
**GitHub:** https://github.com/dungzum22/PRN232-FinalProject  
**Framework:** .NET 8.0 + ASP.NET Core  
**Database:** PostgreSQL + Entity Framework Core
