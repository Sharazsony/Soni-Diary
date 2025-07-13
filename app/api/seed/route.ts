import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Poem, Movie, Book, PersonalInfo, Admin } from '@/lib/models';
import { poems, movies, books, personalInfo } from '@/lib/data';
import bcrypt from 'bcryptjs';

export async function POST() {
  try {
    await connectToDatabase();
    
    // Clear existing data
    await Promise.all([
      Poem.deleteMany({}),
      Movie.deleteMany({}),
      Book.deleteMany({}),
      PersonalInfo.deleteMany({})
    ]);
    
    // Create admin user if it doesn't exist
    const existingAdmin = await Admin.findOne({ username: 'Soniwriter' });
    if (!existingAdmin) {
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
      console.log('Created admin user');
    }
    
    // Seed poems
    await Poem.insertMany(poems);
    console.log('Seeded poems');
    
    // Seed movies
    await Movie.insertMany(movies);
    console.log('Seeded movies');
    
    // Seed books
    await Book.insertMany(books);
    console.log('Seeded books');
    
    // Seed personal info
    const personalInfoArray = Object.entries(personalInfo).map(([key, value]) => ({
      key,
      value
    }));
    await PersonalInfo.insertMany(personalInfoArray);
    console.log('Seeded personal info');
    
    return NextResponse.json({ 
      success: true,
      message: 'Database seeded successfully',
      seeded: {
        poems: poems.length,
        movies: movies.length,
        books: books.length,
        personalInfo: personalInfoArray.length,
        admin: existingAdmin ? 'existed' : 'created'
      }
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Failed to seed database' 
    }, { status: 500 });
  }
}
