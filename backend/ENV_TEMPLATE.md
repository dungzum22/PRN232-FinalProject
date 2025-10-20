# Backend Environment Variables

Copy this to `.env` file and update with actual values.

```env
# ==================== SERVER ====================
NODE_ENV=development
PORT=3001

# ==================== DATABASE ====================
DATABASE_URL=postgresql://user:password@localhost:5432/bakery_db
REDIS_URL=redis://localhost:6379

# ==================== JWT ====================
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRATION=24h

# ==================== STRIPE ====================
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_PUBLIC_KEY=pk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_key_here

# ==================== FRONTEND ====================
FRONTEND_URL=http://localhost:3000

# ==================== EMAIL (Optional) ====================
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-password
```

## For Production (Vercel/Render)

Set these in:

1. **Vercel:** Settings → Environment Variables
2. **Render:** Services → Environment
3. **GitHub Secrets:** For CI/CD
