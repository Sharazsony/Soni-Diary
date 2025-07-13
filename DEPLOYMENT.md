# 🚀 Vercel Deployment Guide for Dream Diary

## Quick Deployment Steps

### 1. Prepare MongoDB Atlas (Free)
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/) and create free account
2. Create a new cluster (select FREE M0 tier)
3. Create database user:
   - Database Access → Add New Database User
   - Username: `dreamdiary`
   - Password: Generate secure password
4. Add IP addresses:
   - Network Access → Add IP Address → Allow Access from Anywhere (0.0.0.0/0)
5. Get connection string:
   - Connect → Connect your application → Copy connection string
   - Replace `<password>` with your database user password

### 2. Deploy to Vercel
1. Push your code to GitHub (or GitLab/Bitbucket)
2. Go to [Vercel](https://vercel.com/) and sign up with GitHub
3. Click "Import Git Repository" and select your repo
4. Configure Environment Variables in Vercel:
   ```
   MONGODB_URI=mongodb+srv://dreamdiary:<password>@cluster0.xxxxx.mongodb.net/dreamdiary
   NEXTAUTH_SECRET=your-super-secret-random-string-here
   ```
5. Click "Deploy"

### 3. After Deployment
1. Visit your deployed URL (e.g., `https://your-app.vercel.app`)
2. Go to `/login`
3. Login with:
   - **Username:** `Soniwriter`
   - **Password:** `Sharaz-123`
4. Admin user will be created automatically in MongoDB on first login
5. Start adding your content!

## Environment Variables Required
```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dreamdiary
NEXTAUTH_SECRET=any-random-secret-string-minimum-32-characters
```

## Features After Deployment ✅
- ✅ Automatic admin user creation
- ✅ Real-time MongoDB synchronization
- ✅ Secure password hashing with bcrypt
- ✅ All CRUD operations for poems, movies, books
- ✅ Personal information management
- ✅ Responsive design with dark theme
- ✅ No manual setup required

## Support
If you face any issues:
1. Check Vercel deployment logs
2. Verify MongoDB connection string
3. Ensure environment variables are set correctly
4. Test locally first with `npm run dev`

## Local Development
```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Edit .env.local with your MongoDB URI

# Run development server
npm run dev
```

Visit `http://localhost:3000` and start developing!

---
**Your Dream Diary is now ready for the cloud! 🌟**
