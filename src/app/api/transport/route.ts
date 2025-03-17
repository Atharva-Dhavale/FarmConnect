import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Transport from "@/lib/models/Transport";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import User from '@/models/User';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    const url = new URL(req.url);
    const status = url.searchParams.get('status');
    const departure = url.searchParams.get('departure');
    const destination = url.searchParams.get('destination');
    
    let query: any = {};
    
    if (status) {
      query.status = status;
    } else {
      // By default, only show available transports
      query.status = 'available';
    }
    
    if (departure) {
      query.departureAddress = { $regex: departure, $options: 'i' };
    }
    
    if (destination) {
      query.destinationAddress = { $regex: destination, $options: 'i' };
    }
    
    const transports = await Transport.find(query).sort({ departureTime: 1 });
    
    return NextResponse.json(transports);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch transport listings' },
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
    
    if (session.user.role !== 'transporter') {
      return NextResponse.json(
        { error: 'Only transporters can post transport listings' },
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
    
    const newTransport = new Transport({
      ...data,
      transporterId: user._id,
      transporterName: user.name,
      status: 'available',
    });
    
    await newTransport.save();
    
    return NextResponse.json(newTransport, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create transport listing' },
      { status: 500 }
    );
  }
} 