import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Movie } from '@/lib/models';

export async function GET() {
  try {
    await connectToDatabase();
    const movies = await Movie.find({}).sort({ createdAt: -1 });
    
    // Add cache control headers to ensure fresh data
    const response = NextResponse.json(movies);
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    
    return response;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return NextResponse.json({ error: 'Failed to fetch movies' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();
    
    console.log('Received movie data:', JSON.stringify(body, null, 2));
    
    // Validate required fields
    if (!body.title) {
      return NextResponse.json({ 
        error: 'Validation failed', 
        details: ['Title is required'] 
      }, { status: 400 });
    }
    
    if (!body.year) {
      return NextResponse.json({ 
        error: 'Validation failed', 
        details: ['Year is required'] 
      }, { status: 400 });
    }
    
    if (!body.director) {
      return NextResponse.json({ 
        error: 'Validation failed', 
        details: ['Director is required'] 
      }, { status: 400 });
    }
    
    // Generate unique ID if not provided
    if (!body.id) {
      body.id = `movie${Date.now()}`;
    }
    
    // Ensure arrays are arrays
    if (typeof body.actors === 'string') {
      body.actors = body.actors.split(',').map(s => s.trim()).filter(Boolean);
    }
    
    if (typeof body.genres === 'string') {
      body.genres = body.genres.split(',').map(s => s.trim()).filter(Boolean);
    }
    
    console.log('Processed movie data:', JSON.stringify(body, null, 2));
    
    const movie = new Movie(body);
    const savedMovie = await movie.save();
    
    console.log('Movie saved successfully:', savedMovie);
    
    return NextResponse.json(savedMovie, { status: 201 });
  } catch (error) {
    console.error('Error creating movie:', error);
    
    // Provide more specific error information
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      console.log('Validation errors:', validationErrors);
      return NextResponse.json({ 
        error: 'Validation failed', 
        details: validationErrors 
      }, { status: 400 });
    }
    
    if (error.code === 11000) {
      return NextResponse.json({ 
        error: 'Duplicate movie ID', 
        details: 'A movie with this ID already exists' 
      }, { status: 409 });
    }
    
    return NextResponse.json({ 
      error: 'Failed to create movie', 
      details: error.message 
    }, { status: 500 });
  }
}
