import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectToDatabase from '@/lib/mongodb';
import { Admin } from '@/lib/models';

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: 'Soniwriter' });
    
    if (existingAdmin) {
      return NextResponse.json({ 
        message: 'Admin user already exists',
        admin: { username: existingAdmin.username, role: existingAdmin.role }
      });
    }

    // Create new admin with encrypted password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash('Sharaz-123', saltRounds);
    
    const admin = new Admin({
      username: 'Soniwriter',
      password: hashedPassword,
      email: 'admin@dreamdiary.com',
      role: 'admin',
      isActive: true
    });

    await admin.save();
    
    // Return admin info (without password)
    const { password: _, ...adminData } = admin.toObject();
    
    return NextResponse.json({ 
      message: 'Admin user created successfully',
      admin: adminData
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating admin:', error);
    return NextResponse.json({ error: 'Failed to create admin user' }, { status: 500 });
  }
}
