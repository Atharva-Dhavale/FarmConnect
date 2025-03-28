import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

export async function GET() {
  try {
    // Log the environment variables
    console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME);
    console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY);
    console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET?.substring(0, 3) + '...');

    // Configure Cloudinary
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    // Try to ping Cloudinary
    const result = await cloudinary.api.ping();

    return NextResponse.json({ 
      status: 'success',
      message: 'Cloudinary connection successful',
      result 
    });
  } catch (error: any) {
    console.error('Cloudinary test error:', error);
    return NextResponse.json({ 
      status: 'error',
      message: error.message || 'Cloudinary connection failed' 
    }, { status: 500 });
  }
} 