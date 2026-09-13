import { NextResponse } from "next/server";
import crypto from "crypto";
// import dbConnect from "@/lib/db";
// import { Course } from "@/models/Course";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { courseId, price, userId } = body;

    if (!courseId || !price || !userId) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // 1. Verify course and price from DB to prevent tampering
    // await dbConnect();
    // const course = await Course.findById(courseId);
    // if (!course || course.price !== price) {
    //   return NextResponse.json({ message: "Invalid course or price mismatch" }, { status: 400 });
    // }

    // 2. Generate a unique Order ID
    const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // 3. (Optional) Generate PayHere Hash if redirecting to PayHere instead of custom UI
    // The user requested a skeleton for a Sri Lankan gateway.
    const merchantId = process.env.PAYHERE_MERCHANT_ID || "12345";
    const merchantSecret = process.env.PAYHERE_SECRET || "mock_secret";
    const currency = "LKR";
    
    // PayHere Hash generation logic
    const hashedSecret = crypto.createHash('md5').update(merchantSecret).digest('hex').toUpperCase();
    const amountFormatted = parseFloat(price).toLocaleString('en-us', { minimumFractionDigits: 2 }).replaceAll(',', '');
    const hash = crypto.createHash('md5').update(
      merchantId + 
      orderId + 
      amountFormatted + 
      currency + 
      hashedSecret
    ).digest('hex').toUpperCase();

    // 4. Return data needed for the client or redirect
    return NextResponse.json({
      message: "Payment intention created successfully",
      orderId,
      hash,
      merchantId,
      currency,
      amount: amountFormatted
    }, { status: 200 });

  } catch (error: any) {
    console.error("Payment API Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
