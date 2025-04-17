import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Notification from "@/lib/models/Notification";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Mark a notification as read or unread
export async function PATCH(
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

    await dbConnect();
    
    // Get the notification ID from params
    const { id } = params;
    const data = await request.json();
    
    // Ensure the notification belongs to the current user
    const notification = await Notification.findOne({
      _id: id,
      recipient: session.user.id
    });
    
    if (!notification) {
      return NextResponse.json(
        { error: 'Notification not found' },
        { status: 404 }
      );
    }
    
    // Update the notification
    const updatedNotification = await Notification.findByIdAndUpdate(
      id,
      { isRead: data.isRead },
      { new: true }
    );
    
    return NextResponse.json({ 
      success: true, 
      data: updatedNotification 
    });
  } catch (error: any) {
    console.error('Error updating notification:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// Delete a notification
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

    await dbConnect();
    
    // Get the notification ID from params
    const { id } = params;
    
    // Ensure the notification belongs to the current user
    const notification = await Notification.findOne({
      _id: id,
      recipient: session.user.id
    });
    
    if (!notification) {
      return NextResponse.json(
        { error: 'Notification not found' },
        { status: 404 }
      );
    }
    
    // Delete the notification
    await Notification.findByIdAndDelete(id);
    
    return NextResponse.json({ 
      success: true,
      message: 'Notification deleted successfully'
    });
  } catch (error: any) {
    console.error('Error deleting notification:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
} 