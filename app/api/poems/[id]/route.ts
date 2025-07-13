import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Poem } from '@/lib/models';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const poem = await Poem.findOne({ id: params.id });
    
    if (!poem) {
      return NextResponse.json({ error: 'Poem not found' }, { status: 404 });
    }
    
    return NextResponse.json(poem);
  } catch (error) {
    console.error('Error fetching poem:', error);
    return NextResponse.json({ error: 'Failed to fetch poem' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const body = await request.json();
    
    const poem = await Poem.findOneAndUpdate(
      { id: params.id },
      body,
      { new: true, runValidators: true }
    );
    
    if (!poem) {
      return NextResponse.json({ error: 'Poem not found' }, { status: 404 });
    }
    
    return NextResponse.json(poem);
  } catch (error) {
    console.error('Error updating poem:', error);
    return NextResponse.json({ error: 'Failed to update poem' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const poem = await Poem.findOneAndDelete({ id: params.id });
    
    if (!poem) {
      return NextResponse.json({ error: 'Poem not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Poem deleted successfully' });
  } catch (error) {
    console.error('Error deleting poem:', error);
    return NextResponse.json({ error: 'Failed to delete poem' }, { status: 500 });
  }
}
