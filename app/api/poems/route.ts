import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Poem } from '@/lib/models';

export async function GET() {
  try {
    await connectToDatabase();
    const poems = await Poem.find({}).sort({ createdAt: -1 });
    
    // Add cache control headers to ensure fresh data
    const response = NextResponse.json(poems);
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    
    return response;
  } catch (error) {
    console.error('Error fetching poems:', error);
    return NextResponse.json({ error: 'Failed to fetch poems' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();
    
    // Generate unique ID if not provided
    if (!body.id) {
      body.id = `poem${Date.now()}`;
    }
    
    const poem = new Poem(body);
    await poem.save();
    
    return NextResponse.json(poem, { status: 201 });
  } catch (error) {
    console.error('Error creating poem:', error);
    return NextResponse.json({ error: 'Failed to create poem' }, { status: 500 });
  }
}
