import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Admin } from '@/lib/models';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const { username, password } = await request.json();

    // Check if admin user exists, if not create default admin
    let admin = await Admin.findOne({ username: 'Soniwriter' });
    
    if (!admin) {
      // Create default admin user
      const hashedPassword = await bcrypt.hash('Sharaz-123', 12);
      admin = new Admin({
        username: 'Soniwriter',
        password: hashedPassword,
        email: 'admin@dreamdiary.com'
      });
      await admin.save();
      console.log('Default admin user created');
    }

    // Verify credentials
    if (username === 'Soniwriter') {
      const isValid = await bcrypt.compare(password, admin.password);
      if (isValid) {
        return NextResponse.json({ 
          success: true, 
          message: 'Login successful',
          user: { username: admin.username }
        });
      }
    }

    return NextResponse.json({ 
      success: false, 
      message: 'Invalid credentials' 
    }, { status: 401 });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Internal server error' 
    }, { status: 500 });
  }
}
