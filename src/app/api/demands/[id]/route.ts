import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/db';
import Demand from '@/models/Demand';

// GET a specific demand
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const demand = await Demand.findById(params.id);
    
    if (!demand) {
      return NextResponse.json(
        { error: 'Demand not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(demand);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch demand' },
      { status: 500 }
    );
  }
}

// UPDATE a specific demand
export async function PUT(
  req: NextRequest,
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
    
    await connectDB();
    
    const demand = await Demand.findById(params.id);
    
    if (!demand) {
      return NextResponse.json(
        { error: 'Demand not found' },
        { status: 404 }
      );
    }
    
    // Only the retailer who created the demand can update it
    if (demand.retailerId.toString() !== session.user.id && session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'You are not authorized to update this demand' },
        { status: 403 }
      );
    }
    
    const data = await req.json();
    
    const updatedDemand = await Demand.findByIdAndUpdate(
      params.id,
      { ...data },
      { new: true, runValidators: true }
    );
    
    return NextResponse.json(updatedDemand);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update demand' },
      { status: 500 }
    );
  }
}

// DELETE a specific demand
export async function DELETE(
  req: NextRequest,
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
    
    await connectDB();
    
    const demand = await Demand.findById(params.id);
    
    if (!demand) {
      return NextResponse.json(
        { error: 'Demand not found' },
        { status: 404 }
      );
    }
    
    // Only the retailer who created the demand can delete it
    if (demand.retailerId.toString() !== session.user.id && session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'You are not authorized to delete this demand' },
        { status: 403 }
      );
    }
    
    await Demand.findByIdAndDelete(params.id);
    
    return NextResponse.json({ message: 'Demand deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete demand' },
      { status: 500 }
    );
  }
} 