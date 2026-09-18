import mongoose, { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  name: { type: String, required: true },
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contactNumber: { type: String, default: '' },
  homeAddress: { type: String, default: '' },
  district: { type: String, default: '' },
  schoolName: { type: String, default: '' },
  alYear: { type: String, default: '' },
  role: { type: String, enum: ['admin', 'student'], default: 'student' },
  image: { type: String, default: '' },
}, { timestamps: true });

// Clear mongoose User model cache in development to prevent schema validation errors
delete mongoose.models.User;

export const User = mongoose.models.User || model('User', UserSchema);
