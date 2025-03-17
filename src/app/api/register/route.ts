import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/lib/models/User";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    
    const body = await req.json();
    const { name, email, password, role, location, phone } = body;
    
    // Check if user already exists
    const userExists = await User.findOne({ email });
    
    if (userExists) {
      return NextResponse.json(
        { success: false, message: "User already exists" },
        { status: 400 }
      );
    }
    
    // Create new user
    const user = await User.create({
      name,
      email,
      password,
      role,
      location,
      phone,
      profileImage: body.profileImage || "",
    });
    
    return NextResponse.json(
      { 
        success: true, 
        message: "User registered successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        }
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
} 