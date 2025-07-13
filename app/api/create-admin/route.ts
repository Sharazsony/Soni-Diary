import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Admin } from '@/lib/models';
import bcrypt from 'bcryptjs';

export async function POST() {
  try {
    await connectToDatabase();
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: 'Soniwriter' });
    
    if (existingAdmin) {
      return NextResponse.json({ 
        success: true,
        message: 'Admin user already exists',
        admin: { username: existingAdmin.username, createdAt: existingAdmin.createdAt }
      });
    }

    // Create new admin with hashed password
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
    
    return NextResponse.json({ 
      success: true,
      message: 'Admin user created successfully',
      admin: { username: admin.username, createdAt: admin.createdAt }
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating admin:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Failed to create admin user' 
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const admin = await Admin.findOne({ username: 'Soniwriter' });
    
    return NextResponse.json({
      exists: !!admin,
      admin: admin ? {
        username: admin.username,
        createdAt: admin.createdAt,
        lastLogin: admin.lastLogin
      } : null
    });
  } catch (error) {
    console.error('Error fetching admin:', error);
    return NextResponse.json({ error: 'Failed to fetch admin' }, { status: 500 });
  }
}
