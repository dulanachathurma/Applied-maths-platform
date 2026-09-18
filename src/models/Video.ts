import mongoose, { Schema, model, models } from 'mongoose';

const VideoSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  videoUrl: { type: String, required: true },
  type: { type: String, enum: ['video', 'tute', 'paper'], default: 'video' },
  uploadedBy: { type: String, default: 'Admin' },
}, { timestamps: true });

export const Video = models.Video || model('Video', VideoSchema);
