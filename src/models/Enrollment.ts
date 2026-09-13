import mongoose, { Schema, Document, Model } from "mongoose";

export interface IEnrollment extends Document {
  user: mongoose.Types.ObjectId;
  course: mongoose.Types.ObjectId;
  paymentStatus: "pending" | "completed" | "failed";
  payhereOrderId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const EnrollmentSchema: Schema<IEnrollment> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    payhereOrderId: { type: String }, // To cross-reference with PayHere webhook
  },
  { timestamps: true }
);

// Prevent duplicate enrollments
EnrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

export const Enrollment =
  (mongoose.models.Enrollment as Model<IEnrollment>) ||
  mongoose.model<IEnrollment>("Enrollment", EnrollmentSchema);
