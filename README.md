# 🌟 Soni Dream Diary

<div align="center">

![Dream Diary Logo](public/placeholder-logo.svg)

**A Beautiful Personal Digital Diary with Poetry, Movies, Books & Memories**

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/atlas)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel)](https://vercel.com/)

[🚀 Live Demo](https://your-domain.vercel.app) • [📖 Documentation](#documentation) • [🛠️ Installation](#installation) • [🤝 Contributing](#contributing)

</div>

---

## ✨ Overview

**Soni Dream Diary** is a beautiful, modern web application that serves as your personal digital sanctuary. Store and organize your poetry, favorite movies, beloved books, and personal memories in one elegant, cloud-synchronized platform.

### 🎯 Key Features

- 📝 **Poetry Collection** - Write and organize your poems with categories and tags
- 🎬 **Movie Library** - Track your favorite films with ratings, reviews, and genres
- 📚 **Book Shelf** - Manage your reading list with detailed book information
- 💭 **Personal Memories** - Store private thoughts and special moments
- 🔐 **Secure Authentication** - Protected admin area with encrypted passwords
- ☁️ **Cloud Sync** - Real-time MongoDB Atlas synchronization
- 🎨 **Beautiful UI** - Modern design with dark theme support
- 📱 **Responsive** - Perfect on desktop, tablet, and mobile devices
- ⚡ **Fast & Modern** - Built with Next.js 15 and TypeScript

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- MongoDB Atlas account (free tier available)
- Git

### 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sharazsony/Soni-Diary.git
   cd Soni-Diary
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your MongoDB connection string:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dreamdiary
   NEXTAUTH_SECRET=your-super-secret-key-here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### 🔑 Default Admin Credentials

- **Username:** `Soniwriter`
- **Password:** `Sharaz-123`

*Admin user is created automatically on first login attempt if not present in database.*

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Prepare MongoDB Atlas**
   - Create free cluster at [MongoDB Atlas](https://cloud.mongodb.com/)
   - Get connection string
   - Whitelist IP addresses (0.0.0.0/0 for all)

2. **Deploy to Vercel**
   ```bash
   # Push to GitHub first
   git add .
   git commit -m "Initial commit"
   git push origin main
   
   # Then deploy on Vercel
   # 1. Import GitHub repo at https://vercel.com
   # 2. Add environment variables
   # 3. Deploy!
   ```

3. **Environment Variables for Production**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dreamdiary
   NEXTAUTH_SECRET=your-production-secret-key
   ```

## 🏗️ Architecture

### Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI, Lucide Icons
- **Backend**: Next.js API Routes, MongoDB with Mongoose
- **Authentication**: Custom JWT with bcrypt hashing
- **Database**: MongoDB Atlas (Cloud)
- **Deployment**: Vercel (recommended)

### Project Structure

```
Soni-Diary/
├── app/                    # Next.js 15 App Router
│   ├── api/               # API Routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── poems/         # Poetry CRUD operations
│   │   ├── movies/        # Movies CRUD operations
│   │   ├── books/         # Books CRUD operations
│   │   └── personal/      # Personal info endpoints
│   ├── admin/             # Protected admin pages
│   ├── poetry/            # Public poetry display
│   ├── movies/            # Public movies display
│   ├── books/             # Public books display
│   └── personal/          # Personal memories
├── components/            # Reusable UI components
│   └── ui/               # Radix UI components
├── lib/                   # Utilities and configurations
│   ├── mongodb.ts        # Database connection
│   ├── models.ts         # Mongoose schemas
│   └── auth-context.tsx  # Authentication context
├── public/               # Static assets
└── styles/               # Global styles
```

## 🔐 Security Features

- 🔒 **Password Hashing**: bcrypt with salt rounds
- 🛡️ **Rate Limiting**: Login attempt restrictions
- 🔑 **Secure Sessions**: JWT-based authentication
- 🌐 **HTTPS Ready**: SSL/TLS encryption in production
- 🚫 **SQL Injection Protection**: MongoDB NoSQL security
- 🎭 **XSS Protection**: Input sanitization

## 📊 API Documentation

### Authentication

```typescript
POST /api/auth/login
{
  "username": "Soniwriter",
  "password": "Sharaz-123"
}
```

### Poetry Management

```typescript
GET    /api/poems         # Get all poems
POST   /api/poems         # Create new poem
PUT    /api/poems/[id]    # Update poem
DELETE /api/poems/[id]    # Delete poem
```

### Movies Management

```typescript
GET    /api/movies        # Get all movies
POST   /api/movies        # Add new movie
PUT    /api/movies/[id]   # Update movie
DELETE /api/movies/[id]   # Delete movie
```

### Books Management

```typescript
GET    /api/books         # Get all books
POST   /api/books         # Add new book
PUT    /api/books/[id]    # Update book
DELETE /api/books/[id]    # Delete book
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Sharaz Sony**
- GitHub: [@Sharazsony](https://github.com/Sharazsony)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [MongoDB](https://www.mongodb.com/) for the flexible database
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
- [Radix UI](https://www.radix-ui.com/) for accessible components
- [Vercel](https://vercel.com/) for seamless deployment

---

<div align="center">

**Made with ❤️ by Sharaz Sony**

</div>
