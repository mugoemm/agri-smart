# AgriSmart Frontend

React + Vite frontend for AgriSmart Agricultural Marketplace

## Deployment to Vercel

### Prerequisites
- Vercel account (free tier available)
- Backend deployed on Render (or similar)

### Deployment Steps

#### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push code to GitHub** (if not already done)

2. **Go to Vercel Dashboard**
   - Visit https://vercel.com/
   - Click "Add New" → "Project"

3. **Import Repository**
   - Click "Import Git Repository"
   - Select your `agrismart-frontend` repository
   - Click "Import"

4. **Configure Project**
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend` (if in monorepo) or leave empty
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

5. **Add Environment Variables**
   Click "Environment Variables" and add:
   ```
   VITE_API_URL=https://your-backend.onrender.com
   ```

6. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy automatically
   - Your app will be available at: `https://your-app.vercel.app`

#### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to frontend directory
cd frontend

# Login to Vercel
vercel login

# Deploy
vercel

# For production deployment
vercel --prod
```

### Environment Variables

After deployment, update these in Vercel Dashboard:

- `VITE_API_URL` - Your Render backend URL (e.g., https://agrismart-backend.onrender.com)

**Important**: After adding/changing environment variables, redeploy the project.

### Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed

### After Deployment

Update your backend's `FRONTEND_URL` environment variable in Render with your Vercel URL.

## Local Development

1. Copy `.env.example` to `.env`
2. Update `VITE_API_URL` with your local backend URL
3. Run `npm install`
4. Run `npm run dev`

## Build Locally

```bash
npm run build
npm run preview
```

## Features

- React 19 with Hooks
- React Router for navigation
- Tailwind CSS for styling
- Recharts for analytics
- Axios for API calls
- Role-based authentication (Farmer/Buyer/Admin)

## Troubleshooting

### Build Fails
- Check all dependencies are installed
- Ensure Node version >= 18
- Check for TypeScript errors if using TS

### API Connection Issues
- Verify `VITE_API_URL` is set correctly
- Check CORS settings on backend
- Ensure backend is deployed and running

### 404 on Refresh
- `vercel.json` handles this with rewrites
- All routes redirect to index.html for SPA routing
