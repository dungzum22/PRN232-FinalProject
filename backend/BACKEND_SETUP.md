# 🚀 Backend Setup Guide - .NET 8 Microservices

## Quick Start

### 1. Prerequisites
- .NET 8.0 SDK
- PostgreSQL 14+ (or Docker)
- Visual Studio 2022 or VS Code with C# extension
- Git

### 2. Clone & Setup

```bash
# Clone repository
git clone https://github.com/dungzum22/PRN232-FinalProject.git
cd backend

# Restore NuGet packages
dotnet restore PRN232_Final_Project_Server.sln

# Build solution
dotnet build PRN232_Final_Project_Server.sln
```

### 3. Database Configuration

Create `appsettings.Development.json` in each service directory:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=bakery_db;Username=postgres;Password=your_password;"
  },
  "JwtSettings": {
    "Secret": "your-super-secret-key-at-least-32-characters-long",
    "ExpirationMinutes": 60
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Warning"
    }
  }
}
```

### 4. Database Migrations

```bash
# Run migrations for each service
cd UserAPI
dotnet ef database update
cd ..

cd ProductAndCategoryAPI
dotnet ef database update
cd ..

cd CartAPI
dotnet ef database update
cd ..

cd OrderAPI
dotnet ef database update
cd ..

cd FeedbackAPI
dotnet ef database update
cd ..
```

### 5. Run Services

**Option A: Using Visual Studio**
1. Set multiple startup projects: Gateway, AuthAPI, UserAPI, ProductAndCategoryAPI, CartAPI, OrderAPI, FeedbackAPI, NotificationAPI
2. Press F5 to run all services

**Option B: Using CLI (separate terminals)**

```bash
# Terminal 1 - Gateway (Port 5000)
cd Gateway
dotnet run

# Terminal 2 - AuthAPI (Port 5001)
cd AuthAPI
dotnet run

# Terminal 3 - UserAPI (Port 5002)
cd UserAPI
dotnet run

# Terminal 4 - ProductAndCategoryAPI (Port 5003)
cd ProductAndCategoryAPI
dotnet run

# Terminal 5 - CartAPI (Port 5004)
cd CartAPI
dotnet run

# Terminal 6 - OrderAPI (Port 5005)
cd OrderAPI
dotnet run

# Terminal 7 - FeedbackAPI (Port 5006)
cd FeedbackAPI
dotnet run

# Terminal 8 - NotificationAPI (Port 5007)
cd NotificationAPI
dotnet run
```

## Project Structure

```
backend/
├── Gateway/                    # API Gateway (Ocelot) - Port 5000
├── AuthAPI/                    # Auth Service - Port 5001
├── UserAPI/                    # User Management - Port 5002
├── ProductAndCategoryAPI/      # Product Catalog - Port 5003
├── CartAPI/                    # Shopping Cart - Port 5004
├── OrderAPI/                   # Order Processing - Port 5005
├── FeedbackAPI/                # Reviews & Feedback - Port 5006
├── NotificationAPI/            # Real-time Notifications - Port 5007
├── SharedDTOs/                 # Shared Data Models
├── SharedServices/             # Shared Utilities & Interfaces
└── PRN232_Final_Project_Server.sln
```

## API Endpoints

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh-token` - Refresh JWT token
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/profile` - Get current user profile
- `PUT /api/auth/change-password` - Change password

### Users (`/api/users`)
- `GET /api/users` - List all users (admin only)
- `GET /api/users/{id}` - Get user profile
- `PUT /api/users/{id}` - Update user profile
- `GET /api/users/stats/overview` - User statistics (admin)
- `PUT /api/users/{id}/deactivate` - Deactivate user (admin)

### Products (`/api/products`)
- `GET /api/products` - List all products
- `GET /api/products/{id}` - Get product details
- `GET /api/products/search?q=term` - Search products
- `GET /api/products/category/{categoryId}` - List by category
- `POST /api/products` - Create product (admin)
- `PUT /api/products/{id}` - Update product (admin)
- `DELETE /api/products/{id}` - Delete product (admin)

### Categories (`/api/categories`)
- `GET /api/categories` - List all categories
- `GET /api/categories/{id}` - Get category details
- `POST /api/categories` - Create category (admin)
- `PUT /api/categories/{id}` - Update category (admin)
- `DELETE /api/categories/{id}` - Delete category (admin)

### Cart (`/api/cart`)
- `GET /api/cart` - Get user's cart
- `POST /api/cart/items` - Add item to cart
- `PUT /api/cart/items/{itemId}` - Update cart item quantity
- `DELETE /api/cart/items/{itemId}` - Remove item from cart
- `DELETE /api/cart` - Clear cart
- `GET /api/cart/summary` - Get cart summary

### Orders (`/api/orders`)
- `POST /api/orders` - Create order from cart
- `GET /api/orders` - List user's orders
- `GET /api/orders/{id}` - Get order details
- `GET /api/orders/admin/all` - List all orders (admin)
- `PUT /api/orders/{id}/status` - Update order status (admin)
- `GET /api/orders/stats/overview` - Order statistics (admin)

### Feedback (`/api/feedback`)
- `GET /api/feedback/product/{productId}` - Get product reviews
- `POST /api/feedback` - Create review
- `PUT /api/feedback/{id}` - Update review
- `DELETE /api/feedback/{id}` - Delete review
- `GET /api/feedback/summary/product/{productId}` - Review summary

### Notifications (`/api/notifications`)
- `GET /api/notifications` - Get notifications
- `POST /api/notifications/mark-read/{id}` - Mark as read
- `DELETE /api/notifications/{id}` - Delete notification
- WebSocket: `/hubs/notifications` - Real-time updates (SignalR)

## JWT Token Structure

Access tokens include claims:
- `sub` - User ID
- `email` - User email
- `role` - User role (customer/admin)
- `exp` - Expiration time

Example header:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Database Schema

### Users Table
- id (PK)
- email (unique)
- full_name
- phone_number
- date_of_birth
- is_active
- role (customer/admin)
- created_at
- updated_at
- last_login_at
- address, city, country

### Products Table
- id (PK)
- name
- description
- price (decimal)
- quantity (inventory)
- category_id (FK)
- image_url
- is_active
- created_at
- updated_at

### Categories Table
- id (PK)
- name
- description
- image_url
- is_active
- created_at

### Orders Table
- id (PK)
- user_id (FK)
- total_amount
- status (pending/processing/shipped/delivered/cancelled)
- shipping_address
- created_at
- updated_at

### OrderItems Table
- id (PK)
- order_id (FK)
- product_id (FK)
- quantity
- unit_price
- total_price

### Cart Table
- id (PK)
- user_id (FK, unique)
- total_price
- created_at
- updated_at

### CartItems Table
- id (PK)
- cart_id (FK)
- product_id (FK)
- quantity
- price

### Feedback Table
- id (PK)
- user_id (FK)
- product_id (FK)
- rating (1-5)
- comment
- is_verified_purchase
- helpful_count
- created_at
- updated_at

### Notifications Table
- id (PK)
- user_id (FK)
- message
- type
- is_read
- created_at

## Environment Variables

### Local Development
Set in `appsettings.Development.json`:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information"
    }
  },
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=bakery_db;Username=postgres;Password=password"
  },
  "JwtSettings": {
    "Secret": "dev-secret-key-at-least-32-chars-long",
    "ExpirationMinutes": 60
  }
}
```

### Production
Set in Render environment variables:
- `ConnectionStrings__DefaultConnection`
- `JwtSettings__Secret`
- `JwtSettings__ExpirationMinutes`

## Docker Setup

```bash
# Build Docker image
docker build -f Dockerfile -t bakery-api .

# Run with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f gateway
```

## Development Workflow

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/user-api-improvements
   ```

2. **Make Changes**
   ```bash
   # Edit code in your service
   dotnet run
   ```

3. **Test Locally**
   ```bash
   # Run tests
   dotnet test
   ```

4. **Commit & Push**
   ```bash
   git add .
   git commit -m "feat: add user profile endpoint"
   git push origin feature/user-api-improvements
   ```

5. **Create Pull Request** on GitHub

## Troubleshooting

### Port Already in Use
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill process (Windows)
taskkill /PID [PID] /F
```

### Database Connection Error
```bash
# Check PostgreSQL connection
psql -h localhost -U postgres -d bakery_db

# Reset database
dotnet ef database drop -f
dotnet ef database update
```

### JWT Authentication Issues
- Verify token secret is same across all services
- Check token expiration time
- Ensure Authorization header format: `Bearer {token}`

## Testing

### Unit Tests
```bash
dotnet test UserAPI.Tests
```

### Integration Tests
```bash
dotnet test Integration.Tests
```

### API Testing with Postman
- Import `postman-collection.json`
- Set `base_url` environment variable to `http://localhost:5000`

## Performance Tips

1. **Enable Caching**
   - Add Redis caching layer
   - Cache product catalog and category data

2. **Database Optimization**
   - Add indexes on frequently queried columns
   - Use pagination for list endpoints
   - Implement database connection pooling

3. **API Gateway**
   - Enable rate limiting in Ocelot
   - Add request compression
   - Implement caching at gateway level

## Security Checklist

- [ ] Never commit secrets to git
- [ ] Use strong JWT secret (32+ characters)
- [ ] Validate all user inputs
- [ ] Use HTTPS in production
- [ ] Implement rate limiting
- [ ] Add CORS restrictions in production
- [ ] Enable SQL injection prevention
- [ ] Audit sensitive operations

## Resources

- [.NET 8 Documentation](https://learn.microsoft.com/en-us/dotnet/)
- [Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/)
- [Ocelot Documentation](https://ocelot.readthedocs.io/)
- [JWT Authentication](https://learn.microsoft.com/en-us/aspnet/core/security/authentication/jwt-bearer)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

**Last Updated:** October 2024  
**Version:** 1.0  
**Team:** PRN232 Development Team
