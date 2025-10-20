# 👨‍💻 Developer Task Assignments v2.0

## PRN232 Final Project - Bakery E-Commerce System

### 5-Person Development Team

### Architecture: Next.js + Express.js + PostgreSQL + Stripe + Vercel + Render

**Version:** 2.0  
**Created:** October 2024  
**Team Structure:** Project Lead + 2 Backend Devs + 1 Frontend Dev + 1 DevOps

---

## 🔗 GitHub Repository

**Repository:** https://github.com/dungzum22/PRN232-FinalProject

### Clone Command

```bash
git clone https://github.com/dungzum22/PRN232-FinalProject.git
cd PRN232-FinalProject
```

### Git Workflow

```bash
# Create your feature branch
git checkout -b feature/your-feature-name

# Commit your work
git commit -m "feat: description"

# Push to develop
git push origin feature/your-feature-name

# Create Pull Request on GitHub
```

---

## 📊 Team Breakdown v2.0

| Role               | Developer | Focus                                 | Services/Components                       |
| ------------------ | --------- | ------------------------------------- | ----------------------------------------- |
| **Lead Architect** | Person 1  | System design, DevOps, infrastructure | CI/CD, Vercel, Render setup               |
| **Backend Lead**   | Person 2  | API Gateway, Auth, Payments           | Express Gateway, Auth, Stripe integration |
| **Backend Dev**    | Person 3  | Business logic APIs                   | User, Product, Order, Cart services       |
| **Frontend Lead**  | Person 4  | Next.js app, UI components            | Pages, components, Stripe checkout        |
| **DevOps/QA**      | Person 5  | Testing, CI/CD, deployment            | GitHub Actions, Render deploys, testing   |

---

## 🎯 DEVELOPER 1: Project Lead / DevOps Architect

### Primary Responsibilities

- DevOps and infrastructure setup
- CI/CD pipeline configuration
- Vercel & Render deployment
- Environment management
- Security and secrets management

### Specific Tasks

#### **PHASE 1: Infrastructure Setup (Weeks 1-2)**

**Task 1.1: Vercel Project Setup (4-6 hours)**

- [ ] Create Vercel account and organization
- [ ] Set up Vercel project for frontend
- [ ] Configure custom domain
- [ ] Set up environment variables
- [ ] Configure build settings
- [ ] Set up analytics and monitoring
- **Files:** `vercel.json` configuration
- **Time:** 4-6 hours

**Task 1.2: Render Project Setup (6-8 hours)**

- [ ] Create Render account
- [ ] Set up PostgreSQL database (Neon or Render)
- [ ] Set up Redis for caching
- [ ] Create web services for microservices
- [ ] Configure environment variables
- [ ] Set up disk storage if needed
- **Files:** `render.yaml`, deployment configs
- **Time:** 6-8 hours

**Task 1.3: GitHub Actions CI/CD Pipeline (8-10 hours)**

- [ ] Create GitHub Actions workflow
- [ ] Set up test automation
- [ ] Configure Vercel deployment trigger
- [ ] Configure Render deployment trigger
- [ ] Set up code coverage reporting
- [ ] Configure environment-specific deploys
- **Files:** `.github/workflows/deploy.yml`
- **Time:** 8-10 hours

#### **PHASE 2: Security & Monitoring (Weeks 3-4)**

**Task 2.1: Secrets Management (4-5 hours)**

- [ ] Stripe API keys (public & secret)
- [ ] JWT secrets
- [ ] Database connection strings
- [ ] API URLs for each environment
- [ ] Configure in Vercel
- [ ] Configure in Render
- [ ] Document secret management policy
- **Time:** 4-5 hours

**Task 2.2: Monitoring & Logging (6-8 hours)**

- [ ] Set up Vercel analytics
- [ ] Set up Render monitoring
- [ ] Configure error alerting
- [ ] Set up performance monitoring
- [ ] Configure log aggregation
- [ ] Create monitoring dashboard
- **Time:** 6-8 hours

**Task 2.3: Database Migrations (6-8 hours)**

- [ ] Create migration system
- [ ] Write migration scripts for Stripe tables
- [ ] Test migration process
- [ ] Create seed data scripts
- [ ] Document migration procedures
- [ ] Set up automated backups
- **Time:** 6-8 hours

---

## 🎯 DEVELOPER 2: Backend Lead - API Gateway & Payments

### Primary Responsibilities

- Express.js API Gateway
- Authentication service
- Stripe payment integration
- Webhook handling

### Specific Tasks

#### **PHASE 1: Gateway & Auth (Weeks 1-2)**

**Task 1.1: Express API Gateway (10-14 hours)**

- [ ] Set up Express.js server
- [ ] Configure middleware (CORS, logging)
- [ ] Set up routing to microservices
- [ ] Implement rate limiting
- [ ] Add request validation
- [ ] Error handling middleware
- [ ] Swagger/OpenAPI documentation
- **Files:**
  - `backend/gateway/server.ts`
  - `backend/gateway/middleware/*.ts`
  - `backend/gateway/routes/*.ts`
- **Time:** 10-14 hours

✅ Acceptance Criteria:

- Gateway routes all requests correctly
- CORS properly configured
- Error messages are clear
- Documentation complete

**Task 1.2: Authentication Service (12-16 hours)**

- [ ] JWT token generation
- [ ] JWT token validation
- [ ] User registration endpoint
- [ ] User login endpoint
- [ ] Token refresh endpoint
- [ ] Password hashing with bcrypt
- [ ] Auth middleware
- **Files:**
  - `backend/services/auth-service/`
  - `backend/gateway/routes/auth.ts`
- **Time:** 12-16 hours

✅ Acceptance Criteria:

- Login returns valid JWT
- Passwords hashed with salt
- Token claims correct
- Invalid credentials return 401

#### **PHASE 2: Stripe Integration (Weeks 3-4)**

**Task 2.1: Stripe Setup & Payment Intents (12-16 hours)**

- [ ] Initialize Stripe SDK
- [ ] Create payment intent endpoint
- [ ] Handle payment success
- [ ] Handle payment failure
- [ ] Implement error handling
- [ ] Add logging for payments
- [ ] Create payment schema in DB
- **Files:**
  - `backend/services/payment-service/`
  - `backend/gateway/routes/payments.ts`
  - SQL migration for payments table
- **Time:** 12-16 hours

✅ Acceptance Criteria:

- Payment intent created successfully
- Webhook received and processed
- Order created after payment
- Refund functionality works

**Task 2.2: Webhook Handling (8-10 hours)**

- [ ] Webhook endpoint setup
- [ ] Webhook signature verification
- [ ] Handle charge.succeeded event
- [ ] Handle charge.failed event
- [ ] Handle charge.refunded event
- [ ] Idempotent webhook processing
- [ ] Error retry logic
- **Files:**
  - `backend/services/payment-service/webhook.ts`
- **Time:** 8-10 hours

**Task 2.3: Payment Testing (6-8 hours)**

- [ ] Unit tests for payment logic
- [ ] Integration tests for endpoints
- [ ] Webhook testing
- [ ] Error scenario tests
- [ ] 80%+ code coverage
- **Files:**
  - `backend/services/payment-service/__tests__/`
- **Time:** 6-8 hours

---

## 🎯 DEVELOPER 3: Backend Dev - Business Logic APIs

### Primary Responsibilities

- User management API
- Product catalog API
- Shopping cart API
- Order processing API

### Specific Tasks

#### **PHASE 1: Data Models & APIs (Weeks 1-2)**

**Task 1.1: Database Schema & Migrations (8-10 hours)**

- [ ] Create users table
- [ ] Create products table
- [ ] Create categories table
- [ ] Create orders table
- [ ] Create order_items table
- [ ] Create carts table
- [ ] Set up relationships
- [ ] Create indexes
- **Files:**
  - `backend/database/migrations/*.sql`
- **Time:** 8-10 hours

**Task 1.2: User API (10-12 hours)**

- [ ] User registration
- [ ] User profile endpoint
- [ ] Update profile endpoint
- [ ] Change password endpoint
- [ ] User repository with CRUD
- [ ] User validation
- [ ] Email verification (optional)
- **Files:**
  - `backend/services/user-service/`
  - `backend/gateway/routes/users.ts`
- **Time:** 10-12 hours

**Task 1.3: Product API (12-14 hours)**

- [ ] Get all products
- [ ] Get product by ID
- [ ] Filter by category
- [ ] Search products
- [ ] Create product (admin)
- [ ] Update product (admin)
- [ ] Delete product (admin)
- [ ] Pagination and sorting
- **Files:**
  - `backend/services/product-service/`
  - `backend/gateway/routes/products.ts`
- **Time:** 12-14 hours

#### **PHASE 2: Shopping & Ordering (Weeks 3-4)**

**Task 2.1: Cart API (10-12 hours)**

- [ ] Get user's cart
- [ ] Add item to cart
- [ ] Update item quantity
- [ ] Remove item from cart
- [ ] Clear cart
- [ ] Calculate cart total
- [ ] Inventory checks
- **Files:**
  - `backend/services/cart-service/`
  - `backend/gateway/routes/cart.ts`
- **Time:** 10-12 hours

**Task 2.2: Order API (14-16 hours)**

- [ ] Create order from cart
- [ ] Get user's orders
- [ ] Get order details
- [ ] Update order status (admin)
- [ ] Order history
- [ ] Inventory updates after order
- [ ] Order confirmation email trigger
- **Files:**
  - `backend/services/order-service/`
  - `backend/gateway/routes/orders.ts`
- **Time:** 14-16 hours

**Task 2.3: API Testing (8-10 hours)**

- [ ] Unit tests for services
- [ ] Integration tests for endpoints
- [ ] Cart-to-order flow tests
- [ ] Inventory tests
- [ ] Error scenario tests
- [ ] 80%+ code coverage
- **Files:**
  - `backend/services/*/__tests__/`
- **Time:** 8-10 hours

---

## 🎯 DEVELOPER 4: Frontend Lead - Next.js Application

### Primary Responsibilities

- Next.js application
- React components
- Stripe checkout integration
- Admin dashboard

### Specific Tasks

#### **PHASE 1: Foundation & Pages (Weeks 1-2)**

**Task 1.1: Next.js Setup & Layout (8-10 hours)**

- [ ] Create Next.js project
- [ ] Configure TailwindCSS
- [ ] Set up routing
- [ ] Create base layout
- [ ] Navigation component
- [ ] Footer component
- [ ] Responsive design setup
- **Files:**
  - `frontend/pages/`
  - `frontend/components/Layout.tsx`
  - `frontend/lib/`
- **Time:** 8-10 hours

**Task 1.2: Authentication Pages (10-12 hours)**

- [ ] Login page
- [ ] Register page
- [ ] Profile page
- [ ] Logout functionality
- [ ] Protected routes
- [ ] Auth context/state
- [ ] Token storage
- **Files:**
  - `frontend/pages/auth/`
  - `frontend/lib/auth.ts`
- **Time:** 10-12 hours

**Task 1.3: Product Pages (12-14 hours)**

- [ ] Product listing page
- [ ] Product detail page
- [ ] Search functionality
- [ ] Filter by category
- [ ] Sort options
- [ ] Pagination
- [ ] Product card component
- **Files:**
  - `frontend/pages/products/`
  - `frontend/components/ProductCard.tsx`
- **Time:** 12-14 hours

#### **PHASE 2: Shopping & Checkout (Weeks 3-4)**

**Task 2.1: Shopping Cart Page (10-12 hours)**

- [ ] Cart page layout
- [ ] Display cart items
- [ ] Update quantities
- [ ] Remove items
- [ ] Cart total calculation
- [ ] Continue shopping button
- [ ] Proceed to checkout button
- **Files:**
  - `frontend/pages/cart.tsx`
  - `frontend/components/CartItem.tsx`
- **Time:** 10-12 hours

**Task 2.2: Stripe Checkout Integration (14-16 hours)**

- [ ] Stripe Elements setup
- [ ] Checkout form component
- [ ] Payment intent creation
- [ ] Card validation
- [ ] Error handling
- [ ] Success page
- [ ] Receipt display
- **Files:**
  - `frontend/pages/checkout.tsx`
  - `frontend/components/StripeCheckout.tsx`
  - `frontend/lib/stripe.ts`
- **Time:** 14-16 hours

**Task 2.3: Admin Dashboard (12-14 hours)**

- [ ] Admin dashboard page
- [ ] Product management page
- [ ] Order management page
- [ ] Customer management page
- [ ] Analytics charts
- [ ] Quick actions
- [ ] Admin layout
- **Files:**
  - `frontend/pages/admin/`
  - `frontend/components/AdminLayout.tsx`
- **Time:** 12-14 hours

---

## 🎯 DEVELOPER 5: DevOps/QA Engineer

### Primary Responsibilities

- Test automation
- CI/CD pipeline
- Performance testing
- Deployment oversight

### Specific Tasks

#### **PHASE 1: Testing Framework (Weeks 1-2)**

**Task 1.1: Test Framework Setup (6-8 hours)**

- [ ] Set up Jest for Node.js tests
- [ ] Set up Vitest for Next.js tests
- [ ] Configure test coverage
- [ ] Create test utilities
- [ ] Set up mocking framework
- [ ] Document testing conventions
- **Files:**
  - `jest.config.js`
  - `vitest.config.ts`
  - `backend/__tests__/setup.ts`
- **Time:** 6-8 hours

**Task 1.2: GitHub Actions Workflow (8-10 hours)**

- [ ] Create test workflow
- [ ] Create lint workflow
- [ ] Create build workflow
- [ ] Create deploy workflow
- [ ] Configure environment variables
- [ ] Set up status checks
- [ ] Slack notifications
- **Files:**
  - `.github/workflows/*.yml`
- **Time:** 8-10 hours

**Task 1.3: Local Development Setup (6-8 hours)**

- [ ] Docker Compose for local dev
- [ ] Database setup script
- [ ] Seed data script
- [ ] Environment setup script
- [ ] Documentation
- [ ] Troubleshooting guide
- **Files:**
  - `docker-compose.yml`
  - `scripts/setup.sh`
- **Time:** 6-8 hours

#### **PHASE 2: Testing & Deployment (Weeks 3-4)**

**Task 2.1: Automated Tests (16-20 hours)**

- [ ] Backend unit tests (all services)
- [ ] Backend integration tests
- [ ] Frontend component tests
- [ ] E2E tests for critical flows
- [ ] Achieve 80%+ code coverage
- [ ] Performance baselines
- **Files:**
  - `backend/**/__tests__/`
  - `frontend/__tests__/`
- **Time:** 16-20 hours

**Task 2.2: Deployment Automation (10-12 hours)**

- [ ] Staging deployment script
- [ ] Production deployment script
- [ ] Database migration automation
- [ ] Rollback procedures
- [ ] Health check endpoints
- [ ] Smoke tests
- **Files:**
  - `scripts/deploy-*.sh`
  - `backend/routes/health.ts`
- **Time:** 10-12 hours

**Task 2.3: Monitoring & Alerting (8-10 hours)**

- [ ] Error monitoring setup
- [ ] Performance monitoring
- [ ] API endpoint monitoring
- [ ] Database monitoring
- [ ] Alert configuration
- [ ] Dashboard creation
- **Files:**
  - Monitoring configuration
- **Time:** 8-10 hours

---

## 📅 Sprint Timeline v2.0

### **Sprint 1 (Weeks 1-2): Foundation**

- **Dev 1 (Lead):** Vercel, Render, GitHub Actions setup
- **Dev 2 (Backend Lead):** Express Gateway, Auth service
- **Dev 3 (Backend):** Database schema, User API
- **Dev 4 (Frontend):** Next.js setup, Auth pages
- **Dev 5 (DevOps):** Testing framework, Docker setup

### **Sprint 2 (Weeks 3-4): Core Features**

- **Dev 1 (Lead):** Secrets, monitoring, migrations
- **Dev 2 (Backend Lead):** Stripe integration, webhooks
- **Dev 3 (Backend):** Product & Cart APIs, Order processing
- **Dev 4 (Frontend):** Product pages, Stripe checkout
- **Dev 5 (DevOps):** Automated tests, deployment scripts

### **Sprint 3 (Weeks 5+): Polish & Deploy**

- **Dev 1 (Lead):** Production readiness, optimization
- **Dev 2 (Backend Lead):** Performance optimization, API docs
- **Dev 3 (Backend):** Business logic refinement, testing
- **Dev 4 (Frontend):** Admin dashboard, UX polish
- **Dev 5 (DevOps):** E2E tests, monitoring, production deploy

---

## 📊 Architecture Comparison

| Aspect               | v1.0           | v2.0           |
| -------------------- | -------------- | -------------- |
| **Frontend**         | ASP.NET MVC    | Next.js        |
| **Backend**          | .NET Core APIs | Express.js     |
| **Payment**          | VNPay          | Stripe         |
| **Frontend Hosting** | Local          | Vercel         |
| **Backend Hosting**  | Local          | Render         |
| **Database**         | SQL Server     | PostgreSQL     |
| **Caching**          | In-memory      | Redis          |
| **CI/CD**            | Manual         | GitHub Actions |
| **Deployment**       | Manual         | Automated      |

---

## ✅ Definition of Done (for each task)

- [ ] Code written and locally tested
- [ ] Unit tests written (80%+ coverage)
- [ ] Code review approved
- [ ] Database migrations tested
- [ ] API documentation complete
- [ ] Error handling implemented
- [ ] No console errors or warnings
- [ ] Merged to develop branch
- [ ] Deployed to staging
- [ ] Smoke tests passed

---

## 🚀 Technology Stack Summary v2.0

| Layer            | Technology     | Version  |
| ---------------- | -------------- | -------- |
| Frontend         | Next.js        | 14+      |
| Frontend Hosting | Vercel         | Latest   |
| Backend          | Express.js     | 4.x      |
| Backend Hosting  | Render         | Latest   |
| Database         | PostgreSQL     | 14+      |
| Cache            | Redis          | 7.x      |
| Payment          | Stripe         | Latest   |
| Auth             | JWT            | Standard |
| Testing          | Jest/Vitest    | Latest   |
| CI/CD            | GitHub Actions | Latest   |
| Containerization | Docker         | Latest   |

---

## 📞 Daily Coordination

### **Daily Standup (15 min @ 9:00 AM)**

Each developer reports:

1. What they completed
2. What they're working on
3. Any blockers

### **Weekly Integration (1 hour @ Friday 5:00 PM)**

- Sprint progress
- Blockers and risks
- Next sprint planning
- Code review for complex PRs

---

## 🎯 Success Criteria for v2.0

✅ All 5 developers can work independently  
✅ Code deploys automatically on main branch  
✅ Frontend accessible on Vercel domain  
✅ Backend APIs running on Render  
✅ Stripe payments processing  
✅ 80%+ test coverage  
✅ Zero critical bugs in production  
✅ < 2s API response time  
✅ Real-time notifications working

---

**Version:** 2.0  
**Last Updated:** October 2024  
**Total Estimated Effort:** 500+ developer hours over 8-10 weeks
