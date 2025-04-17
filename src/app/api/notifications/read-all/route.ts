import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Notification from "@/lib/models/Notification";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Mark all notifications as read
export async function PATCH() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();
    
    // Update all unread notifications for the current user
    const result = await Notification.updateMany(
      { 
        recipient: session.user.id,
        isRead: false
      },
      { isRead: true }
    );
    
    return NextResponse.json({ 
      success: true, 
      message: `Marked ${result.modifiedCount} notifications as read`,
      modifiedCount: result.modifiedCount
    });
  } catch (error: any) {
    console.error('Error marking notifications as read:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
} 