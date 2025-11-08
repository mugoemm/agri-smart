# 🚀 AgriSmart Deployment Guide

Complete guide to deploy AgriSmart platform to production.

## 📋 Prerequisites

- [ ] GitHub account with your code pushed
- [ ] MongoDB Atlas account (free tier)
- [ ] Render account (for backend)
- [ ] Vercel account (for frontend)

---

## 🗄️ Part 1: MongoDB Atlas Setup

### 1. Create Database

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster (if you haven't already)
3. Click "Connect" → "Connect your application"
4. Copy the connection string (looks like: `mongodb+srv://username:password@cluster...`)

### 2. Whitelist IP Addresses

1. In Atlas, go to "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### 3. Create Database User

1. Go to "Database Access"
2. Click "Add New Database User"
3. Create username and password
4. Give "Read and write to any database" permissions

---

## 🔧 Part 2: Deploy Backend to Render

### Step 1: Prepare Backend

Your backend is already configured! Just ensure `.env` values are ready.

### Step 2: Deploy to Render

1. **Go to Render**: https://dashboard.render.com/

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select `agrismart-backend` (or your repo name)

3. **Configure Settings**
   ```
   Name: agrismart-backend
   Region: Oregon (US West) or closest to you
   Branch: main
   Root Directory: (leave empty or specify path)
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   Instance Type: Free
   ```

4. **Add Environment Variables**
   Click "Advanced" → "Add Environment Variable":
   
   ```
   MONGO_URI = mongodb+srv://your-username:your-password@cluster.mongodb.net/agrismart?retryWrites=true&w=majority
   PORT = 5000
   JWT_SECRET = your-super-secret-random-key-min-32-chars
   FRONTEND_URL = (leave empty for now, update after frontend deploy)
   ```

   **Generate JWT Secret**: Use this command or an online generator:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

5. **Create Web Service**
   - Click "Create Web Service"
   - Wait 2-5 minutes for deployment
   - Copy your backend URL: `https://agrismart-backend-xxxx.onrender.com`

6. **Test Backend**
   - Visit: `https://your-backend-url.onrender.com`
   - Should see: `{"msg":"AgriSmart API running"}`

---

## 🎨 Part 3: Deploy Frontend to Vercel

### Step 1: Prepare Frontend

1. Navigate to frontend directory:
   ```bash
   cd agrismart-frontend/frontend
   ```

2. Update `.env.production`:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```

3. Commit and push changes:
   ```bash
   git add .
   git commit -m "Configure for production deployment"
   git push
   ```

### Step 2: Deploy to Vercel

1. **Go to Vercel**: https://vercel.com/

2. **Import Project**
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Select the repository

3. **Configure Project**
   ```
   Framework Preset: Vite
   Root Directory: frontend (if monorepo, otherwise leave empty)
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Add Environment Variables**
   ```
   VITE_API_URL = https://your-backend-url.onrender.com
   ```
   (Replace with your actual Render URL)

5. **Deploy**
   - Click "Deploy"
   - Wait 1-3 minutes
   - Copy your frontend URL: `https://your-app.vercel.app`

---

## 🔗 Part 4: Connect Backend and Frontend

### Update Backend Environment Variables

1. Go back to Render dashboard
2. Open your backend service
3. Go to "Environment"
4. Add/Update:
   ```
   FRONTEND_URL = https://your-app.vercel.app
   ```
5. Click "Save Changes"
6. Service will automatically redeploy

### Test the Connection

1. Visit your Vercel URL: `https://your-app.vercel.app`
2. Try to register a new account
3. Login with the account
4. Test creating listings (as farmer)
5. Test viewing listings (as buyer)

---

## ✅ Part 5: Verification Checklist

- [ ] Backend is live and responding at `/` endpoint
- [ ] MongoDB Atlas is connected (check Render logs)
- [ ] Frontend loads correctly
- [ ] User registration works
- [ ] User login works
- [ ] Farmer can create listings
- [ ] Buyer can view listings
- [ ] Farmer contact info is visible to buyers
- [ ] Analytics dashboard loads
- [ ] All pages (Home, About, Marketplace, etc.) work

---

## 🐛 Troubleshooting

### Backend Issues

**Problem: "Application failed to respond"**
- Check Render logs for errors
- Verify MongoDB connection string
- Ensure all environment variables are set

**Problem: CORS errors**
- Verify `FRONTEND_URL` is set in Render
- Check the URL matches your Vercel deployment exactly

**Problem: Database connection timeout**
- Whitelist IP `0.0.0.0/0` in MongoDB Atlas
- Verify MongoDB connection string is correct

### Frontend Issues

**Problem: "Network Error" on login**
- Check `VITE_API_URL` is set correctly in Vercel
- Verify backend URL is accessible
- Check browser console for CORS errors

**Problem: 404 on page refresh**
- Ensure `vercel.json` exists with rewrite rules
- Redeploy if needed

**Problem: Environment variables not working**
- Environment variables must start with `VITE_`
- Redeploy after changing environment variables

---

## 📊 Monitoring & Maintenance

### Render (Backend)
- Free tier: Sleeps after 15 minutes of inactivity
- First request after sleep will be slow (cold start)
- Check logs regularly for errors
- Consider upgrading to paid tier for production

### Vercel (Frontend)
- Automatic deployments on git push
- Check deployment logs for build errors
- Monitor bandwidth usage (generous free tier)

---

## 🎉 Success!

Your AgriSmart platform is now live! Share these URLs:

- **Frontend**: `https://your-app.vercel.app`
- **Backend API**: `https://your-backend.onrender.com`

### Next Steps:
1. Set up custom domain (optional)
2. Configure email notifications (future)
3. Add payment integration (future)
4. Monitor usage and errors
5. Gather user feedback

---

## 📞 Support

If you encounter issues:
1. Check the logs in Render and Vercel dashboards
2. Review this guide step-by-step
3. Check MongoDB Atlas connection status
4. Verify all environment variables are correct

---

**🎊 Congratulations on deploying AgriSmart!**
