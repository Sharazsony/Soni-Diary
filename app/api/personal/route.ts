import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { PersonalInfo } from '@/lib/models';

export async function GET() {
  try {
    await connectToDatabase();
    const personalInfo = await PersonalInfo.find({});
    
    // Convert to object format like the original data
    const personalInfoObject: Record<string, string> = {};
    personalInfo.forEach(item => {
      personalInfoObject[item.key] = item.value;
    });
    
    return NextResponse.json(personalInfoObject);
  } catch (error) {
    console.error('Error fetching personal info:', error);
    return NextResponse.json({ error: 'Failed to fetch personal info' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();
    
    // Handle both single key-value pair and multiple entries
    if (body.key && body.value) {
      // Single entry
      const personalInfo = await PersonalInfo.findOneAndUpdate(
        { key: body.key },
        { value: body.value },
        { upsert: true, new: true }
      );
      return NextResponse.json(personalInfo, { status: 201 });
    } else {
      // Multiple entries (object format)
      const results = [];
      for (const [key, value] of Object.entries(body)) {
        const personalInfo = await PersonalInfo.findOneAndUpdate(
          { key },
          { value: value as string },
          { upsert: true, new: true }
        );
        results.push(personalInfo);
      }
      return NextResponse.json(results, { status: 201 });
    }
  } catch (error) {
    console.error('Error creating/updating personal info:', error);
    return NextResponse.json({ error: 'Failed to create/update personal info' }, { status: 500 });
  }
}
