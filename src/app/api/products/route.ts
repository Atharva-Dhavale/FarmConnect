import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Product from "@/lib/models/Product";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    const url = new URL(req.url);
    const category = url.searchParams.get("category");
    const farmer = url.searchParams.get("farmer");
    const isAvailable = url.searchParams.get("isAvailable");
    const quality = url.searchParams.get("quality");
    
    const query: any = {};
    
    if (category) query.category = category;
    if (farmer) query.farmer = farmer;
    if (isAvailable) query.isAvailable = isAvailable === "true";
    if (quality) query.quality = quality;
    
    const products = await Product.find(query)
      .populate("farmer", "name location")
      .sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, data: products });
  } catch (error: any) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    if (session.user.role !== 'farmer') {
      return NextResponse.json(
        { error: 'Only farmers can add products' },
        { status: 403 }
      );
    }

    await dbConnect();
    const data = await request.json();

    const product = await Product.create({
      ...data,
      farmer: session.user.id,
      isAvailable: true,
      quality: 'standard', // Default quality
    });

    return NextResponse.json({ 
      success: true, 
      data: product 
    });
  } catch (error: any) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to create product'
      },
      { status: 500 }
    );
  }
} 