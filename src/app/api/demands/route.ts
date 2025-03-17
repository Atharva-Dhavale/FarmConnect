import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Demand from "@/lib/models/Demand";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import User from '@/models/User';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    const url = new URL(req.url);
    const category = url.searchParams.get("category");
    const status = url.searchParams.get("status");
    
    let query: any = {};
    
    if (category) query.category = category;
    if (status) query.status = status;
    else query.status = 'open';
    
    const demands = await Demand.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json(demands);
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to fetch demands' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    if (session.user.role !== "retailer") {
      return NextResponse.json(
        { error: 'Only retailers can post demands' },
        { status: 403 }
      );
    }
    
    await dbConnect();
    
    const user = await User.findById(session.user.id);
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    const data = await req.json();
    
    const newDemand = new Demand({
      ...data,
      retailerId: user._id,
      retailerName: user.name,
      status: 'open',
    });
    
    await newDemand.save();
    
    return NextResponse.json(newDemand, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to create demand' },
      { status: 500 }
    );
  }
} 