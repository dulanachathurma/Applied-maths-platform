import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/db";
import { Course } from "@/models/Course";
import { Enrollment } from "@/models/Enrollment";
import crypto from "crypto";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "student") {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");

    if (!courseId) {
      return NextResponse.json({ error: "Course ID is required" }, { status: 400 });
    }

    await dbConnect();
    const course = await Course.findById(courseId);
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Check existing enrollment
    let enrollment = await Enrollment.findOne({ user: session.user.id, course: courseId });
    if (!enrollment) {
      // Create pending enrollment
      enrollment = await Enrollment.create({
        user: session.user.id,
        course: courseId,
        paymentStatus: "pending",
      });
    } else if (enrollment.paymentStatus === "completed") {
      return NextResponse.redirect(new URL(`/dashboard/student/course/${courseId}`, req.url));
    }

    const merchantId = process.env.PAYHERE_MERCHANT_ID || "121XXXX";
    const merchantSecret = process.env.PAYHERE_SECRET || "dummy_secret";
    const orderId = enrollment._id.toString();
    const amount = course.price.toFixed(2);
    const currency = "LKR";

    const hashString = merchantId + orderId + amount + currency + crypto.createHash('md5').update(merchantSecret).digest('hex').toUpperCase();
    const hash = crypto.createHash('md5').update(hashString).digest('hex').toUpperCase();

    // In a real implementation, you would render a form that auto-submits to PayHere endpoint.
    // For this skeleton, we are just returning the payload or simulating it.
    
    // Simulate successful payment for demo purposes since we don't have actual payhere setup.
    // DANGER: Only for demo!
    await Enrollment.findByIdAndUpdate(orderId, { paymentStatus: "completed" });
    
    return NextResponse.redirect(new URL(`/dashboard/student/course/${courseId}`, req.url));

  } catch (error) {
    console.error("Checkout error", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
