# AgriSmart Backend

Backend API for AgriSmart - Agricultural Marketplace Platform

## Deployment to Render

### Prerequisites
- MongoDB Atlas account with a database
- Render account (free tier available)

### Deployment Steps

1. **Push your code to GitHub** (if not already done)

2. **Go to Render Dashboard**
   - Visit https://dashboard.render.com/
   - Click "New +" → "Web Service"

3. **Connect Repository**
   - Connect your GitHub account
   - Select your `agrismart-backend` repository

4. **Configure Service**
   - **Name**: `agrismart-backend` (or your preferred name)
   - **Region**: Choose closest to your users
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: Leave empty (or specify if in monorepo)
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free` (for testing) or `Starter` (for production)

5. **Add Environment Variables**
   Click "Advanced" and add these environment variables:
   ```
   MONGO_URI=your_mongodb_atlas_connection_string
   PORT=5000
   JWT_SECRET=your_strong_random_secret_key
   FRONTEND_URL=https://your-frontend.vercel.app
   ```

6. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy
   - Your API will be available at: `https://your-service.onrender.com`

### Important Notes

- **MongoDB Atlas**: Whitelist Render's IP addresses or use `0.0.0.0/0` for all IPs
- **Health Checks**: Render will ping your `/` endpoint to check if service is running
- **Cold Starts**: Free tier sleeps after 15 mins of inactivity (first request may be slow)
- **Logs**: Check deployment logs in Render dashboard for debugging

### After Deployment

Update your frontend's `.env` file with the Render URL:
```
VITE_API_URL=https://your-service.onrender.com
```

## Local Development

1. Copy `.env.example` to `.env`
2. Update variables with your local values
3. Run `npm install`
4. Run `npm run dev`

## API Endpoints

- `GET /` - Health check
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `GET /api/listings` - Get all listings
- `POST /api/listings` - Create listing (protected)
- `GET /api/prices` - Get price insights
