import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Order from "@/lib/models/Order";
import Product from "@/lib/models/Product";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Not authenticated" },
        { status: 401 }
      );
    }
    
    await dbConnect();
    
    const url = new URL(req.url);
    const status = url.searchParams.get("status");
    
    const query: any = {};
    
    // Filter orders based on user role
    if (session.user.role === "farmer") {
      query.seller = session.user.id;
    } else if (session.user.role === "retailer") {
      query.buyer = session.user.id;
    } else if (session.user.role === "transporter") {
      query.transport = session.user.id;
    }
    
    if (status) query.status = status;
    
    const orders = await Order.find(query)
      .populate("buyer", "name email phone")
      .populate("seller", "name email phone")
      .populate("transport", "vehicleNumber departureTime estimatedArrivalTime")
      .populate("products.product", "name images")
      .sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, data: orders });
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
    
    if (session.user.role !== "retailer") {
      return NextResponse.json(
        { success: false, message: "Only retailers can place orders" },
        { status: 403 }
      );
    }
    
    await dbConnect();
    
    const body = await req.json();
    const { products, seller, transport, deliveryAddress, pickupAddress } = body;
    
    // Calculate total amount
    let totalAmount = 0;
    for (const item of products) {
      const product = await Product.findById(item.product);
      if (!product) {
        return NextResponse.json(
          { success: false, message: `Product ${item.product} not found` },
          { status: 404 }
        );
      }
      
      if (item.quantity > product.quantity) {
        return NextResponse.json(
          { success: false, message: `Not enough quantity available for ${product.name}` },
          { status: 400 }
        );
      }
      
      totalAmount += product.price * item.quantity;
      
      // Update product quantity
      product.quantity -= item.quantity;
      if (product.quantity === 0) {
        product.isAvailable = false;
      }
      await product.save();
    }
    
    const order = await Order.create({
      buyer: session.user.id,
      seller,
      products,
      transport,
      totalAmount,
      deliveryAddress,
      pickupAddress,
    });
    
    return NextResponse.json(
      { success: true, data: order },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
} 