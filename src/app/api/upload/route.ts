import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Define the Cloudinary response type
interface CloudinaryResponse {
  public_id: string;
  secure_url: string;
  format: string;
  bytes: number;
  [key: string]: any;
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    // Log Cloudinary configuration (without sensitive data)
    console.log('Cloudinary Configuration:', {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key_length: process.env.CLOUDINARY_API_KEY?.length,
      api_secret_prefix: process.env.CLOUDINARY_API_SECRET?.substring(0, 3) + '...',
    });

    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      console.error('No file provided in the request');
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    console.log('File received:', {
      type: file.type,
      size: file.size,
      name: file.name
    });

    // Convert the file to a buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Convert buffer to base64 data URI
    const base64Data = `data:${file.type};base64,${buffer.toString('base64')}`;

    // Upload to Cloudinary with additional options
    const uploadResult = await new Promise<CloudinaryResponse>((resolve, reject) => {
      cloudinary.uploader.upload(base64Data, {
        folder: 'farmconnect',
        resource_type: 'auto',
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
        transformation: [
          { quality: 'auto:good' },
          { fetch_format: 'auto' }
        ]
      }, (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          reject(error);
        } else if (result) {
          console.log('Cloudinary upload success:', {
            public_id: result.public_id,
            url: result.secure_url,
            format: result.format,
            size: result.bytes
          });
          resolve(result);
        } else {
          reject(new Error('No result from Cloudinary'));
        }
      });
    });

    return NextResponse.json(uploadResult);
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json({ 
      error: error.message || 'Upload failed',
      details: error.stack
    }, { status: 500 });
  }
} 