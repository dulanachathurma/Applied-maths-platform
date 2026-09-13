import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";
import { User } from "@/models/User";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { 
      firstName, 
      lastName, 
      email, 
      password, 
      contactNumber, 
      address, 
      district, 
      school, 
      alYear 
    } = data;

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { message: "Please fill in all required fields" },
        { status: 400 }
      );
    }

    await dbConnect();

    // Check if user exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const name = `${firstName} ${lastName}`.trim();

    // Create user (defaults to 'student')
    const user = await User.create({
      name,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      contactNumber,
      address,
      district,
      school,
      alYear,
      role: "student",
    });

    return NextResponse.json(
      { message: "User registered successfully", user: { id: user._id, email: user.email } },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "An error occurred during registration" },
      { status: 500 }
    );
  }
}
