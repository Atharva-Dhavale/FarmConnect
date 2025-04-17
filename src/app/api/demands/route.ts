import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Demand from "@/lib/models/Demand";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { notifyFarmersOfDemand } from "@/lib/services/notificationService";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    const url = new URL(req.url);
    const category = url.searchParams.get("category");
    const retailer = url.searchParams.get("retailer");
    const status = url.searchParams.get("status");
    
    const query: any = {};
    
    if (category) query.category = category;
    if (retailer) query.retailer = retailer;
    if (status) query.status = status;
    
    // Get the session to determine if user is a farmer or retailer
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // If the user is a retailer, only show their own demands
    if (session.user.role === 'retailer') {
      query.retailer = session.user.id;
    }
    
    const demands = await Demand.find(query)
      .populate("retailer", "name email location")
      .sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, data: demands });
  } catch (error: any) {
    console.error('Error fetching demands:', error);
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
    
    if (session.user.role !== 'retailer') {
      return NextResponse.json(
        { error: 'Only retailers can create demands' },
        { status: 403 }
      );
    }

    await dbConnect();
    const data = await request.json();

    const demand = await Demand.create({
      ...data,
      retailer: session.user.id,
      status: 'open',
    });

    // Send notifications to farmers about the new demand
    try {
      await notifyFarmersOfDemand(
        demand._id.toString(),
        session.user.id,
        demand.product
      );
    } catch (notificationError) {
      console.error('Error sending notifications:', notificationError);
      // Don't fail the request if notifications fail
    }

    return NextResponse.json({ 
      success: true, 
      data: demand 
    });
  } catch (error: any) {
    console.error('Error creating demand:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to create demand'
      },
      { status: 500 }
    );
  }
} 