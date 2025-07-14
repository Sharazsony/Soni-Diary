import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable. ' +
    'For local development, add it to .env.local. ' +
    'For Vercel deployment, add it to your Vercel project environment variables.'
  );
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongoose || {
  conn: null,
  promise: null,
};

if (!global.mongoose) {
  global.mongoose = cached;
}

async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    console.log('Attempting to connect to MongoDB...');
    console.log('MongoDB URI (masked):', MONGODB_URI?.replace(/\/\/[^:]+:[^@]+@/, '//***:***@'));
    cached.promise = mongoose.connect(MONGODB_URI as string, opts);
  }

  try {
    console.log('Waiting for MongoDB connection...');
    cached.conn = await cached.promise;
    console.log('✅ MongoDB connected successfully!');
  } catch (e) {
    console.error('❌ MongoDB connection failed:', e);
    cached.promise = null;
    
    // Provide more specific error information
    if (e instanceof Error) {
      if (e.message.includes('ENOTFOUND')) {
        throw new Error('MongoDB connection failed: Cannot resolve hostname. Check your internet connection and MongoDB URI.');
      }
      if (e.message.includes('authentication failed')) {
        throw new Error('MongoDB connection failed: Authentication failed. Check your username and password.');
      }
      if (e.message.includes('IP')) {
        throw new Error('MongoDB connection failed: IP address not whitelisted. Add your IP to MongoDB Atlas.');
      }
    }
    
    throw e;
  }

  return cached.conn;
}

export default connectToDatabase;
