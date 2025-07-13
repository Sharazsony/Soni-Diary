import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Movie } from '@/lib/models';

export async function GET() {
  try {
    await connectToDatabase();
    const movies = await Movie.find({}).sort({ createdAt: -1 });
    return NextResponse.json(movies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    return NextResponse.json({ error: 'Failed to fetch movies' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();
    
    // Generate unique ID if not provided
    if (!body.id) {
      body.id = `movie${Date.now()}`;
    }
    
    const movie = new Movie(body);
    await movie.save();
    
    return NextResponse.json(movie, { status: 201 });
  } catch (error) {
    console.error('Error creating movie:', error);
    return NextResponse.json({ error: 'Failed to create movie' }, { status: 500 });
  }
}
