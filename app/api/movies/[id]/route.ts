import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Movie } from '@/lib/models';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const movie = await Movie.findOne({ id: params.id });
    
    if (!movie) {
      return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
    }
    
    return NextResponse.json(movie);
  } catch (error) {
    console.error('Error fetching movie:', error);
    return NextResponse.json({ error: 'Failed to fetch movie' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const body = await request.json();
    
    const movie = await Movie.findOneAndUpdate(
      { id: params.id },
      body,
      { new: true, runValidators: true }
    );
    
    if (!movie) {
      return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
    }
    
    return NextResponse.json(movie);
  } catch (error) {
    console.error('Error updating movie:', error);
    return NextResponse.json({ error: 'Failed to update movie' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const movie = await Movie.findOneAndDelete({ id: params.id });
    
    if (!movie) {
      return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Movie deleted successfully' });
  } catch (error) {
    console.error('Error deleting movie:', error);
    return NextResponse.json({ error: 'Failed to delete movie' }, { status: 500 });
  }
}
