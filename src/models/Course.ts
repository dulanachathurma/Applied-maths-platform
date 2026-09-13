import mongoose, { Schema, Document, Model } from "mongoose";

export interface IVideo {
  title: string;
  youtubeId: string; // the unlisted video ID
  duration?: string;
  order: number;
}

export interface ITutorial {
  title: string;
  link: string; // Google Drive link or direct URL
  order: number;
}

export interface ICourse extends Document {
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  videos: IVideo[];
  tutorials: ITutorial[];
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}


const VideoSchema = new Schema<IVideo>({
  title: { type: String, required: true },
  youtubeId: { type: String, required: true },
  duration: { type: String },
  order: { type: Number, required: true, default: 0 },
});

const TutorialSchema = new Schema<ITutorial>({
  title: { type: String, required: true },
  link: { type: String, required: true },
  order: { type: Number, required: true, default: 0 },
});

const CourseSchema: Schema<ICourse> = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    videos: [VideoSchema],
    tutorials: [TutorialSchema],
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Course = (mongoose.models.Course as Model<ICourse>) || mongoose.model<ICourse>("Course", CourseSchema);
