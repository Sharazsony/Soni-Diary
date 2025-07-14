import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Book } from '@/lib/models';

export async function GET() {
  try {
    await connectToDatabase();
    const books = await Book.find({}).sort({ createdAt: -1 });
    
    // Add cache control headers to ensure fresh data
    const response = NextResponse.json(books);
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    
    return response;
  } catch (error) {
    console.error('Error fetching books:', error);
    return NextResponse.json({ error: 'Failed to fetch books' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();
    
    console.log('Received book data:', body);
    
    // Generate unique ID if not provided
    if (!body.id) {
      body.id = `book${Date.now()}`;
    }
    
    const book = new Book(body);
    const savedBook = await book.save();
    
    console.log('Book saved successfully:', savedBook);
    
    return NextResponse.json(savedBook, { status: 201 });
  } catch (error) {
    console.error('Error creating book:', error);
    
    // Provide more specific error information
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json({ 
        error: 'Validation failed', 
        details: validationErrors 
      }, { status: 400 });
    }
    
    if (error.code === 11000) {
      return NextResponse.json({ 
        error: 'Duplicate book ID', 
        details: 'A book with this ID already exists' 
      }, { status: 409 });
    }
    
    return NextResponse.json({ 
      error: 'Failed to create book', 
      details: error.message 
    }, { status: 500 });
  }
}
