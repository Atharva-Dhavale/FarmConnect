import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Notification from "@/lib/models/Notification";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Get notifications for the current user
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();
    
    const url = new URL(req.url);
    const isRead = url.searchParams.get("isRead");
    const limit = parseInt(url.searchParams.get("limit") || "20");
    
    const query: any = { recipient: session.user.id };
    
    if (isRead !== null) {
      query.isRead = isRead === "true";
    }
    
    const notifications = await Notification.find(query)
      .populate("sender", "name role")
      .sort({ createdAt: -1 })
      .limit(limit);
    
    // Get unread count
    const unreadCount = await Notification.countDocuments({ 
      recipient: session.user.id,
      isRead: false
    });
    
    return NextResponse.json({ 
      success: true, 
      data: notifications,
      unreadCount
    });
  } catch (error: any) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// Create a new notification
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();
    const data = await request.json();

    // If creating notifications in bulk
    if (Array.isArray(data)) {
      const notifications = await Notification.insertMany(data);
      return NextResponse.json({ 
        success: true, 
        data: notifications 
      });
    } else {
      const notification = await Notification.create(data);
      return NextResponse.json({ 
        success: true, 
        data: notification 
      });
    }
  } catch (error: any) {
    console.error('Error creating notification:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error.message || 'Failed to create notification'
      },
      { status: 500 }
    );
  }
} 