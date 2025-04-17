import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Product from "@/lib/models/Product";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const { id } = params;
    
    const product = await Product.findById(id).populate("farmer", "name location");
    
    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: product });
  } catch (error: any) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
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
        { error: 'Only farmers can update products' },
        { status: 403 }
      );
    }

    await dbConnect();
    
    const { id } = params;
    const data = await request.json();
    
    // Find the product to ensure it belongs to the current farmer
    const existingProduct = await Product.findOne({
      _id: id,
      farmer: session.user.id
    });
    
    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Product not found or you do not have permission to update it' },
        { status: 404 }
      );
    }
    
    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { ...data },
      { new: true }
    );
    
    return NextResponse.json({ 
      success: true, 
      data: updatedProduct 
    });
  } catch (error: any) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to update product'
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
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
        { error: 'Only farmers can delete products' },
        { status: 403 }
      );
    }

    await dbConnect();
    
    const { id } = params;
    
    // Find the product to ensure it belongs to the current farmer
    const existingProduct = await Product.findOne({
      _id: id,
      farmer: session.user.id
    });
    
    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Product not found or you do not have permission to delete it' },
        { status: 404 }
      );
    }
    
    // Delete the product
    await Product.findByIdAndDelete(id);
    
    return NextResponse.json({ 
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error: any) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to delete product'
      },
      { status: 500 }
    );
  }
} 