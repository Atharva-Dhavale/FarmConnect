import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/db';
import Transport from '@/models/Transport';

// GET a specific transport listing
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const transport = await Transport.findById(params.id);
    
    if (!transport) {
      return NextResponse.json(
        { error: 'Transport listing not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(transport);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch transport listing' },
      { status: 500 }
    );
  }
}

// UPDATE a specific transport listing
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
    
    const transport = await Transport.findById(params.id);
    
    if (!transport) {
      return NextResponse.json(
        { error: 'Transport listing not found' },
        { status: 404 }
      );
    }
    
    // Only the transporter who created the listing can update it
    if (transport.transporterId.toString() !== session.user.id && session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'You are not authorized to update this transport listing' },
        { status: 403 }
      );
    }
    
    const data = await req.json();
    
    const updatedTransport = await Transport.findByIdAndUpdate(
      params.id,
      { ...data },
      { new: true, runValidators: true }
    );
    
    return NextResponse.json(updatedTransport);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update transport listing' },
      { status: 500 }
    );
  }
}

// DELETE a specific transport listing
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
    
    const transport = await Transport.findById(params.id);
    
    if (!transport) {
      return NextResponse.json(
        { error: 'Transport listing not found' },
        { status: 404 }
      );
    }
    
    // Only the transporter who created the listing can delete it
    if (transport.transporterId.toString() !== session.user.id && session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'You are not authorized to delete this transport listing' },
        { status: 403 }
      );
    }
    
    await Transport.findByIdAndDelete(params.id);
    
    return NextResponse.json({ message: 'Transport listing deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete transport listing' },
      { status: 500 }
    );
  }
} 