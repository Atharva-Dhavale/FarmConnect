import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Product from "@/lib/models/Product";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const product = await Product.findById(params.id).populate("farmer", "name location phone");
    
    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: product });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Not authenticated" },
        { status: 401 }
      );
    }
    
    await dbConnect();
    
    const product = await Product.findById(params.id);
    
    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }
    
    // Check if the user is the owner of the product
    if (product.farmer.toString() !== session.user.id && session.user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Not authorized to update this product" },
        { status: 403 }
      );
    }
    
    const body = await req.json();
    
    const updatedProduct = await Product.findByIdAndUpdate(
      params.id,
      { ...body },
      { new: true, runValidators: true }
    );
    
    return NextResponse.json({ success: true, data: updatedProduct });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Not authenticated" },
        { status: 401 }
      );
    }
    
    await dbConnect();
    
    const product = await Product.findById(params.id);
    
    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }
    
    // Check if the user is the owner of the product
    if (product.farmer.toString() !== session.user.id && session.user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Not authorized to delete this product" },
        { status: 403 }
      );
    }
    
    await Product.findByIdAndDelete(params.id);
    
    return NextResponse.json({ success: true, data: {} });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
} 