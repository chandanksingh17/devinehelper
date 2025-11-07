# Render + Neon Deployment Guide

## Prerequisites
- Git installed on your computer
- GitHub account
- Google Gemini API key (for AI chat feature)

---

## STEP 1: Set Up Neon Database (5 minutes)

### 1.1 Create Neon Account
1. Go to: https://neon.tech
2. Click "Sign Up" (can use GitHub, Google, or email)
3. No credit card required for free tier!

### 1.2 Create Database
1. After login, click **"Create a project"**
2. Project settings:
   - **Name**: `divinehelper` (or any name you prefer)
   - **Region**: Choose closest to your location (e.g., US East)
   - **PostgreSQL version**: Keep default (16)
3. Click **"Create project"**

### 1.3 Get Connection String
1. In your project dashboard, you'll see **"Connection string"**
2. Make sure **"Pooled connection"** is selected
3. Click **"Copy"** to copy the connection string
4. It looks like: `postgresql://username:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require`

**IMPORTANT**: Save this connection string somewhere safe (you'll need it in Step 3)!

---

## STEP 2: Push Code to GitHub

### 2.1 Check Git Status
```bash
git status
```

### 2.2 Add All Files
```bash
git add .
```

### 2.3 Commit Changes
```bash
git commit -m "Prepare for Render deployment"
```

### 2.4 Create GitHub Repository
1. Go to: https://github.com/new
2. Repository name: `divinehelper` (or your preferred name)
3. Keep it **Public** (or Private if you prefer)
4. **Do NOT** initialize with README
5. Click **"Create repository"**

### 2.5 Push to GitHub
Copy and run the commands shown on GitHub (should look like):
```bash
git remote add origin https://github.com/YOUR_USERNAME/divinehelper.git
git branch -M main
git push -u origin main
```

---

## STEP 3: Deploy to Render (10 minutes)

### 3.1 Create Render Account
1. Go to: https://render.com
2. Click **"Get Started"**
3. Sign up with GitHub (recommended - makes deployment easier)

### 3.2 Create Web Service
1. On Render Dashboard, click **"New +"** → **"Web Service"**
2. Click **"Connect GitHub"** (if not already connected)
3. Find and select your `divinehelper` repository
4. Click **"Connect"**

### 3.3 Configure Service
Fill in the deployment settings:

**Basic Settings:**
- **Name**: `divinehelper` (will be part of your URL)
- **Region**: Choose closest to you (e.g., Oregon, Frankfurt)
- **Branch**: `main`
- **Root Directory**: Leave blank
- **Runtime**: `Node`

**Build & Deploy:**
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm run start`

**Instance Type:**
- Select **"Free"** plan

### 3.4 Add Environment Variables
Scroll down to **"Environment Variables"** section and add these:

1. Click **"Add Environment Variable"**

   **Variable 1:**
   - Key: `DATABASE_URL`
   - Value: [Paste your Neon connection string from Step 1.3]

2. Click **"Add Environment Variable"** again

   **Variable 2:**
   - Key: `GOOGLE_API_KEY`
   - Value: [Your Google Gemini API key]

   **Don't have a Gemini API key?**
   - Go to: https://aistudio.google.com/app/apikey
   - Click "Create API Key"
   - Copy it

3. Click **"Add Environment Variable"** again

   **Variable 3:**
   - Key: `NODE_ENV`
   - Value: `production`

4. Click **"Add Environment Variable"** again

   **Variable 4:**
   - Key: `PORT`
   - Value: `5000`

### 3.5 Deploy!
1. Click **"Create Web Service"** at the bottom
2. Render will now:
   - Clone your repository
   - Install dependencies
   - Run the build
   - Start your server

This takes **5-10 minutes** for first deployment.

---

## STEP 4: Monitor Deployment

### 4.1 Watch Build Logs
- You'll see live logs on the screen
- Watch for any errors

**What you should see:**
```
==> Installing dependencies...
==> Building...
==> Build completed successfully
==> Starting server...
==> serving on port 5000
```

### 4.2 Check for Errors
Common issues:
- **"DATABASE_URL must be set"**: Environment variable not set correctly
- **"Failed to connect to database"**: Check Neon connection string
- **Build fails**: Check the logs for specific error

---

## STEP 5: Access Your App

### 5.1 Get Your URL
Once deployed, you'll see a URL at the top:
```
https://divinehelper.onrender.com
```

### 5.2 Test Your App
1. Click the URL
2. Wait 30-60 seconds on first load (free tier cold start)
3. Your app should load!

### 5.3 Test Features
- ✅ Home page loads
- ✅ Divya Drishti (quotes) works
- ✅ DHRM Chat (AI) responds
- ✅ Dhyan (meditation) timer works
- ✅ Karm (tasks) can be created
- ✅ Books page loads

---

## Important Notes

### Free Tier Limitations
- **Render Free**:
  - App sleeps after 15 minutes of inactivity
  - First load after sleep takes 30-60 seconds
  - 750 hours/month (plenty for testing)

- **Neon Free**:
  - 3GB storage
  - 100 hours compute/month
  - More than enough for personal use

### Cold Starts
When your app "sleeps" (no activity for 15 min):
- First visitor waits 30-60 seconds
- Subsequent loads are instant
- To keep it awake 24/7, upgrade to paid plan ($7/month)

### Updating Your App
After making code changes:
```bash
git add .
git commit -m "Update description"
git push
```
Render will automatically redeploy!

---

## Troubleshooting

### App won't build?
1. Check build logs in Render dashboard
2. Verify `package.json` scripts are correct
3. Make sure all dependencies are in `package.json`

### Database connection errors?
1. Go to Render dashboard → Environment
2. Verify `DATABASE_URL` is set correctly
3. Check Neon dashboard - is database active?

### AI chat not working?
1. Verify `GOOGLE_API_KEY` is set in Render
2. Check Gemini API quota: https://aistudio.google.com/app/apikey

### App is slow?
- First load after sleep is normal (30-60s)
- Subsequent loads should be fast
- Consider upgrading to paid tier for always-on

---

## Getting Help

If you encounter issues:
1. Check Render logs (click "Logs" in dashboard)
2. Check Neon dashboard for database status
3. Verify environment variables are set correctly

---

## Next Steps

Once deployed successfully:
- Share your URL with friends!
- Monitor usage in Render/Neon dashboards
- Consider custom domain (available on free tier)
- Set up monitoring/alerts

---

## Cost Breakdown

**Current Setup (FREE):**
- Render Web Service: $0/month (750 hours free)
- Neon Database: $0/month (3GB, 100 hours compute)
- **Total: $0/month**

**If you need 24/7 uptime:**
- Render Starter: $7/month (always on, more resources)
- Neon stays free!
- **Total: $7/month**

---

Good luck with your deployment! 🚀
