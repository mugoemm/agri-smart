# 🚀 Quick Deployment Checklist

## Backend (Render)
1. ✅ Push code to GitHub
2. ✅ Create Web Service on Render
3. ✅ Set environment variables:
   - `MONGO_URI`
   - `PORT=5000`
   - `JWT_SECRET`
   - `FRONTEND_URL` (add after frontend deploy)
4. ✅ Deploy and copy URL

## Frontend (Vercel)
1. ✅ Update `.env.production` with Render URL
2. ✅ Push changes to GitHub
3. ✅ Import project on Vercel
4. ✅ Set `VITE_API_URL` environment variable
5. ✅ Deploy and copy URL

## Final Steps
1. ✅ Update Render's `FRONTEND_URL` with Vercel URL
2. ✅ Test registration and login
3. ✅ Test creating and viewing listings

---

## Important Files Created:

### Backend
- ✅ `agrismart-backend/DEPLOYMENT.md` - Backend deployment guide
- ✅ `agrismart-backend/.env.example` - Environment variables template
- ✅ `agrismart-backend/package.json` - Updated with engines and scripts

### Frontend
- ✅ `frontend/vercel.json` - Vercel configuration
- ✅ `frontend/.env.production` - Production environment variables
- ✅ `frontend/.env.example` - Environment variables template
- ✅ `frontend/DEPLOYMENT.md` - Frontend deployment guide

### Root
- ✅ `DEPLOYMENT_GUIDE.md` - Complete step-by-step guide

---

## Test Accounts (Already Created)

**Farmer Account:**
- Email: farmer@test.com
- Phone: 0700654321
- Password: test123

**Buyer Account:**
- Email: buyer@test.com
- Phone: 0700123456
- Password: test123

---

## Your Project Structure

```
plp final project/
├── agrismart-backend/
│   ├── src/
│   ├── .env (DO NOT COMMIT)
│   ├── .env.example ✅
│   ├── DEPLOYMENT.md ✅
│   └── package.json ✅
├── agrismart-frontend/
│   └── frontend/
│       ├── src/
│       ├── .env (DO NOT COMMIT)
│       ├── .env.example ✅
│       ├── .env.production ✅
│       ├── vercel.json ✅
│       └── DEPLOYMENT.md ✅
└── DEPLOYMENT_GUIDE.md ✅
```

---

## Ready to Deploy!

Follow `DEPLOYMENT_GUIDE.md` for complete instructions.
