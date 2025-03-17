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
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Not authenticated" },
        { status: 401 }
      );
    }
    
    if (session.user.role !== "farmer") {
      return NextResponse.json(
        { success: false, message: "Only farmers can add products" },
        { status: 403 }
      );
    }
    
    await dbConnect();
    
    const body = await req.json();
    
    const product = await Product.create({
      ...body,
      farmer: session.user.id,
    });
    
    return NextResponse.json(
      { success: true, data: product },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
} 