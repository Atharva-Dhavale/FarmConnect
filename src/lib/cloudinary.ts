import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Test the connection
const testCloudinaryConnection = async () => {
  try {
    const result = await cloudinary.api.ping();
    if (result.status === 'ok') {
      console.log('✅ Cloudinary connection established');
    }
    return result;
  } catch (error) {
    console.error('❌ Cloudinary connection error:', error);
    return null;
  }
};

// Call the test function but don't wait for it
testCloudinaryConnection();

export default cloudinary; 