import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Book } from '@/lib/models';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const book = await Book.findOne({ id: params.id });
    
    if (!book) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }
    
    return NextResponse.json(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    return NextResponse.json({ error: 'Failed to fetch book' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const body = await request.json();
    
    const book = await Book.findOneAndUpdate(
      { id: params.id },
      body,
      { new: true, runValidators: true }
    );
    
    if (!book) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }
    
    return NextResponse.json(book);
  } catch (error) {
    console.error('Error updating book:', error);
    return NextResponse.json({ error: 'Failed to update book' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const book = await Book.findOneAndDelete({ id: params.id });
    
    if (!book) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);
    return NextResponse.json({ error: 'Failed to delete book' }, { status: 500 });
  }
}
