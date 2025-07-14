import mongoose from 'mongoose';

// Poem Schema
const PoemSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, default: 'Anonymous' },
  category: { type: String, default: 'Personal' },
  tags: [{ type: String }],
}, {
  timestamps: true
});

// Movie Schema (v2 - fixed validation)
const MovieSchemaV2 = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  poster: { type: String },
  year: { type: Number, required: true },
  director: { type: String, required: true },
  actors: [{ type: String }],
  genres: [{ type: String }],
  rating: { type: Number, min: 1, max: 10 },
  description: { type: String },
}, {
  timestamps: true,
  collection: 'movies' // Explicitly set collection name
});

// Book Schema
const BookSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  cover: { type: String },
  readDate: { type: String, required: true },
  rating: { type: Number, min: 1, max: 10 },
  genres: [{ type: String }],
  thoughts: { type: String },
  quote: { type: String },
}, {
  timestamps: true
});

// Personal Info Schema
const PersonalInfoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: { type: String },
  location: { type: String },
  interests: [{ type: String }],
  favoriteQuote: { type: String },
  profilePicture: { type: String },
}, {
  timestamps: true
});

// Admin Schema
const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String },
  role: { type: String, default: 'admin' },
}, {
  timestamps: true
});

// Create models with cache clearing for development
if (mongoose.models.Movie) {
  delete mongoose.models.Movie;
}
if (mongoose.models.Book) {
  delete mongoose.models.Book;
}

export const Poem = mongoose.models.Poem || mongoose.model('Poem', PoemSchema);
export const Movie = mongoose.model('Movie', MovieSchemaV2);
export const Book = mongoose.model('Book', BookSchema);
export const PersonalInfo = mongoose.models.PersonalInfo || mongoose.model('PersonalInfo', PersonalInfoSchema);
export const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);
