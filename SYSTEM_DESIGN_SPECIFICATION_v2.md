# 🔧 System Design Specification v2.0 (Redesigned)

## PRN232 Final Project - Bakery E-Commerce System

### With Stripe Integration & Vercel/Render Deployment

**Version:** 2.0  
**Updated:** October 2024  
**Major Changes:** Stripe payment, Vercel deployment, Render backend hosting

**GitHub Repository:** https://github.com/dungzum22/PRN232-FinalProject

---

## 🎯 Architecture Changes Summary

### Previous Architecture

- VNPay (Vietnam-only payment)
- Local development ports
- On-premise deployment

### New Architecture v2.0

- **Stripe** (International payment, better integration)
- **Vercel** (Frontend hosting - UserUI/AdminUI)
- **Render** (Backend hosting - All APIs)
- **Database** (PostgreSQL on Render or Neon)
- **SignalR** (WebSocket via Render or Azure SignalR)

---

## 📊 New Project Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (Vercel)                        │
├──────────────────────────┬──────────────────────┬──────────┤
│  UserUI (Next.js/React)  │   AdminUI (React)    │ Helpers  │
│  Deployed on Vercel      │   Deployed on Vercel │ Stripe JS│
└──────────────────────────┴──────────────────────┴──────────┘
                                     │
                    ┌────────────────┴────────────────┐
                    │                                 │
         ┌──────────▼──────────┐        ┌──────────────▼──────────┐
         │  API Gateway        │        │  Stripe API             │
         │  (Render/Express)   │        │  (External Service)     │
         └──────────┬──────────┘        └────────────────────────┘
                    │
    ┌───────────────┼───────────────┐
    ▼               ▼               ▼
┌──────────┐  ┌──────────┐  ┌──────────┐
│AuthAPI   │  │UserAPI   │  │ProductAPI│
│(Render)  │  │(Render)  │  │(Render)  │
└──────────┘  └──────────┘  └──────────┘
    │               │               │
    └───────┬───────┴───────┬───────┘
            │               │
    ┌───────▼────────┐  ┌───▼────────────┐
    │  PostgreSQL    │  │  Redis Cache   │
    │  (Neon/Render) │  │  (Render)      │
    └────────────────┘  └────────────────┘
```

---

## 🚀 Deployment Architecture

### Frontend - Vercel

- **Framework:** Next.js (upgraded from ASP.NET MVC)
- **Hosting:** Vercel (automatic deployments from Git)
- **Features:**
  - Server-side rendering (SSR)
  - Edge functions
  - Built-in CI/CD
  - Auto-scaling
  - CDN globally distributed
  - Custom domain support

### Backend - Render

- **Framework:** Express.js + Node.js (or ASP.NET Core on Render)
- **Hosting:** Render (with Postgres, Redis)
- **Features:**
  - PostgreSQL database
  - Redis for caching/sessions
  - Environment variable management
  - Automatic deployments
  - Web services
  - Background jobs
  - HTTPS by default

### Payment - Stripe

- **API:** Stripe Payments API
- **Features:**
  - Checkout.js integration
  - Payment intent workflow
  - Webhooks for order confirmation
  - Fraud detection
  - PCI compliance
  - Multi-currency support

---

## 💳 Stripe Integration Architecture

### Payment Flow

```
1. Customer adds items to cart
2. Goes to checkout page
3. Stripe Checkout form loads
4. Customer enters card details
5. Payment processed by Stripe
6. Webhook received on backend
7. Order created/confirmed
8. Confirmation email sent
9. Customer redirected to success page
```

### Implementation Details

**Stripe API Keys:**

- Public Key (client-side)
- Secret Key (server-side)
- Webhook Secret

**Database Changes:**

- Orders table: `stripePaymentIntentId`
- Orders table: `stripeCustomerId`
- Payments table: New table for transaction tracking

**Backend Endpoints:**

- `POST /api/payments/create-intent` - Create payment intent
- `POST /api/payments/webhook` - Handle Stripe webhooks
- `GET /api/payments/{orderId}` - Get payment status
- `POST /api/payments/refund` - Process refunds

**Frontend Components:**

- `<StripeCheckout>` - Checkout form
- `<PaymentStatus>` - Status display
- `<ReceiptView>` - Receipt display

---

## 📱 Frontend Redesign - Next.js

### Project Structure

```
frontend/
├── pages/
│   ├── index.tsx              # Home
│   ├── products.tsx           # Product listing
│   ├── products/[id].tsx      # Product detail
│   ├── cart.tsx               # Shopping cart
│   ├── checkout.tsx           # Stripe checkout
│   ├── orders/[id].tsx        # Order details
│   ├── admin/
│   │   ├── dashboard.tsx      # Admin dashboard
│   │   ├── products.tsx       # Product management
│   │   ├── orders.tsx         # Order management
│   │   └── customers.tsx      # Customer management
│   └── auth/
│       ├── login.tsx          # Login page
│       ├── register.tsx       # Register page
│       └── profile.tsx        # User profile
├── components/
│   ├── StripeCheckout.tsx     # Stripe checkout form
│   ├── ProductCard.tsx        # Product card component
│   ├── CartItem.tsx           # Cart item component
│   ├── Navigation.tsx         # Navigation bar
│   └── AdminLayout.tsx        # Admin layout
├── lib/
│   ├── stripe.ts             # Stripe client setup
│   ├── api.ts                # API client
│   └── auth.ts               # Auth utilities
├── styles/
│   └── globals.css           # Global styles
└── public/
    └── images/               # Static images
```

### Key Changes

- Switch from ASP.NET MVC to Next.js
- Use React hooks instead of server-side pages
- Client-side API calls via fetch/axios
- Stripe Elements integration
- TailwindCSS for styling

---

## 🛠️ Backend Redesign - Render Microservices

### Option 1: Express.js + Node.js (Recommended for quick migration)

```
backend/
├── gateway/                  # Express API Gateway
├── services/
│   ├── auth-service/        # Authentication
│   ├── user-service/        # User management
│   ├── product-service/     # Product catalog
│   ├── cart-service/        # Shopping cart
│   ├── order-service/       # Order processing
│   ├── payment-service/     # Stripe integration
│   └── notification-service/# Email/notifications
├── database/
│   ├── migrations/          # DB migrations
│   └── seeders/             # Initial data
├── shared/
│   ├── types/               # TypeScript types
│   └── utils/               # Shared utilities
└── docker-compose.yml       # Local development
```

### Option 2: Keep ASP.NET Core on Render

- Easier migration from existing code
- No language rewrite
- Deploy as containerized services
- Render supports .NET Core

---

## 🗄️ Database - PostgreSQL on Neon or Render

### Connection String

```
postgresql://username:password@db.neon.tech:5432/bakery_db
```

### Schema Changes for Stripe

**Orders Table**

```sql
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    stripe_payment_intent_id VARCHAR(255),
    stripe_customer_id VARCHAR(255),
    total_amount DECIMAL(10, 2),
    currency VARCHAR(3) DEFAULT 'USD',
    status VARCHAR(50), -- pending, completed, failed, refunded
    payment_method VARCHAR(50), -- stripe, cod
    payment_status VARCHAR(50), -- processing, succeeded, requires_action
    shipping_address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

**Payments Table (new)**

```sql
CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    stripe_transaction_id VARCHAR(255) UNIQUE,
    amount DECIMAL(10, 2),
    currency VARCHAR(3),
    status VARCHAR(50), -- succeeded, failed, pending
    receipt_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id)
);
```

### Environment Variables

```
DATABASE_URL=postgresql://user:pass@host/db
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_PUBLIC_KEY=pk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
JWT_SECRET=your_jwt_secret
API_URL=https://api.yourdomain.com
FRONTEND_URL=https://yourdomain.vercel.app
```

---

## 🔌 API Changes

### Authentication Endpoints

```
POST   /api/auth/register      # Register user
POST   /api/auth/login         # Login user
POST   /api/auth/refresh       # Refresh token
GET    /api/auth/me            # Get current user
```

### Payment Endpoints (NEW)

```
POST   /api/payments/create-intent           # Create payment intent
POST   /api/payments/webhook                 # Stripe webhook
GET    /api/payments/status/{orderId}        # Get payment status
POST   /api/payments/{orderId}/refund        # Refund payment
```

### Product Endpoints

```
GET    /api/products                    # List all products
GET    /api/products/{id}               # Get product details
GET    /api/products?category={catId}   # Filter by category
GET    /api/products/search?q={query}   # Search products
POST   /api/products                    # Create product (Admin)
PUT    /api/products/{id}               # Update product (Admin)
DELETE /api/products/{id}               # Delete product (Admin)
```

### Order Endpoints

```
POST   /api/orders                      # Create order
GET    /api/orders/me                   # Get my orders
GET    /api/orders/{id}                 # Get order details
PUT    /api/orders/{id}                 # Update order (Admin)
```

### Cart Endpoints

```
GET    /api/cart/me                     # Get my cart
POST   /api/cart/items                  # Add to cart
PUT    /api/cart/items/{itemId}         # Update item quantity
DELETE /api/cart/items/{itemId}         # Remove from cart
```

---

## 📦 Deployment Pipeline

### GitHub Actions Workflow

```yaml
name: Deploy to Vercel & Render

on:
  push:
    branches: [main]
  pull_request:
    branches: [develop]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm run test
      - run: npm run lint

  deploy-frontend:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v2
      - uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}

  deploy-backend:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v2
      - run: |
          curl https://api.render.com/deploy/srv-xxx?key=${{ secrets.RENDER_DEPLOY_KEY }}
```

---

## 🚀 Performance Improvements with Vercel & Render

### Vercel Advantages

- Global CDN for static assets
- Edge functions for serverless logic
- Automatic HTTPS
- Zero-downtime deployments
- Integrated analytics
- Built-in SEO support

### Render Advantages

- Automatic scaling
- PostgreSQL on same platform
- Redis for caching
- Background jobs with Render Queue
- Disk storage if needed
- Full-stack hosting solution

---

## 📊 Technology Stack v2.0

| Layer              | Technology     | Version | Notes              |
| ------------------ | -------------- | ------- | ------------------ |
| **Frontend**       | Next.js        | 14+     | React framework    |
|                    | TypeScript     | Latest  | Type safety        |
|                    | TailwindCSS    | 3.x     | Styling            |
|                    | Stripe.js      | Latest  | Payment UI         |
| **Backend**        | Express.js     | 4.x     | HTTP framework     |
|                    | TypeScript     | Latest  | Type safety        |
|                    | Node.js        | 18+     | Runtime            |
|                    | PostgreSQL     | 14+     | Database           |
|                    | Redis          | 7.x     | Caching            |
|                    | Stripe SDK     | Latest  | Payment processing |
| **Infrastructure** | Vercel         | -       | Frontend hosting   |
|                    | Render         | -       | Backend hosting    |
|                    | Neon/Render DB | -       | Database hosting   |
| **DevOps**         | Docker         | Latest  | Containerization   |
|                    | GitHub Actions | -       | CI/CD              |

---

## 🔐 Security Updates for Stripe

### PCI Compliance

- Never store full card numbers
- Use Stripe Elements (hosted fields)
- Use Stripe Payment Intent
- Webhook signature verification

### Environment Variables

- `.env.local` for development
- `.env.production` for production
- Never commit secrets
- Use Vercel & Render secrets management

### CORS Configuration

```javascript
const cors = require("cors");
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
```

---

## ✅ Migration Checklist

- [ ] Set up Vercel project
- [ ] Set up Render project
- [ ] Configure PostgreSQL on Neon/Render
- [ ] Create Stripe account and get API keys
- [ ] Migrate frontend to Next.js
- [ ] Migrate backend to Express.js
- [ ] Update database schema for Stripe
- [ ] Implement Stripe checkout
- [ ] Set up webhook handlers
- [ ] Configure CI/CD pipeline
- [ ] Environment variable setup
- [ ] Testing in staging
- [ ] Production deployment

---

## 📈 Cost Comparison

### Previous Stack (Local)

- Infrastructure: ~$0 (local)
- Payment processing: VNPay ~2-3% fee
- Total: Minimal

### New Stack (Vercel + Render)

- **Vercel:** $20/month (Pro) or pay-per-use
- **Render:** $7-12/month (PostgreSQL), $7+/month (services)
- **Stripe:** 2.9% + $0.30 per transaction
- **Total:** ~$50-100/month depending on usage

---

**Version:** 2.0  
**Last Updated:** October 2024  
**Next Review:** After first deployment
