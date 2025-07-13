# Dream Diary - MongoDB Atlas Integration

This project has been successfully integrated with MongoDB Atlas for global data storage and real-time synchronization.

## 🚀 Features Added

- **MongoDB Atlas Integration**: All data is now stored in a cloud database
- **Real-time Sync**: Changes are visible globally across all users
- **API Routes**: RESTful APIs for all CRUD operations
- **Database Seeding**: Easy setup with sample data

## 🔧 Setup Instructions

### 1. MongoDB Atlas Configuration

1. **Update your `.env.local` file** with your actual database password:
   ```bash
   # Replace <db_password> with your actual MongoDB Atlas password
   MONGODB_URI=mongodb+srv://sharazsony:YOUR_ACTUAL_PASSWORD@cluster0.ppuyacw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   ```

2. **Your MongoDB Atlas setup**:
   - Username: `sharazsony`
   - Cluster: `cluster0.ppuyacw.mongodb.net`
   - Database: Will be created automatically
   - Collections: `poems`, `movies`, `books`, `personalinfos`

### 2. Initialize Database

1. **Start the development server** (if not already running):
   ```bash
   pnpm dev
   ```

2. **Visit** `http://localhost:3000`

3. **Click "Seed Database with Sample Data"** button on the homepage to populate your MongoDB with initial data

### 3. Verify Setup

- Navigate to different sections (Poetry, Movies, Books)
- Data should load from MongoDB Atlas
- Any changes made will be stored in the cloud database
- Multiple users can see the same data globally

## 🌐 API Endpoints

### Poems
- `GET /api/poems` - Get all poems
- `POST /api/poems` - Create new poem
- `GET /api/poems/[id]` - Get specific poem
- `PUT /api/poems/[id]` - Update poem
- `DELETE /api/poems/[id]` - Delete poem

### Movies
- `GET /api/movies` - Get all movies
- `POST /api/movies` - Create new movie
- `GET /api/movies/[id]` - Get specific movie
- `PUT /api/movies/[id]` - Update movie
- `DELETE /api/movies/[id]` - Delete movie

### Books
- `GET /api/books` - Get all books
- `POST /api/books` - Create new book
- `GET /api/books/[id]` - Get specific book
- `PUT /api/books/[id]` - Update book
- `DELETE /api/books/[id]` - Delete book

### Personal Info
- `GET /api/personal` - Get personal information
- `POST /api/personal` - Update personal information

### Database Management
- `POST /api/seed` - Seed database with sample data

## 🛠 Technical Details

### Database Models
- **Poems**: title, content, date, tags, timestamps
- **Movies**: title, year, director, actors, genres, rating, description, timestamps
- **Books**: title, author, readDate, rating, genres, thoughts, quote, timestamps
- **Personal Info**: key-value pairs with timestamps

### Frontend Integration
- All pages now fetch data from MongoDB Atlas
- Loading states and error handling implemented
- Real-time data synchronization

## 🚀 Deployment

When deploying to production:

1. **Environment Variables**: Ensure `MONGODB_URI` is set in your hosting platform
2. **Database Access**: Your MongoDB Atlas cluster should allow connections from your production domain
3. **CORS Configuration**: Update API routes if needed for production domain

## 📝 Notes

- The seed button is available for development/testing purposes
- All data is stored in MongoDB Atlas and synchronized globally
- Multiple users can access and see the same data in real-time
- The application gracefully handles database connection errors

## 🔒 Security

- Database credentials are stored in environment variables
- API routes include error handling and validation
- MongoDB Atlas provides built-in security features
