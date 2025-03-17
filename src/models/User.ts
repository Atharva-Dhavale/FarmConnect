import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'farmer' | 'retailer' | 'transporter' | 'admin';
  profileImage?: string;
  address?: string;
  phone?: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['farmer', 'retailer', 'transporter', 'admin'],
      required: true,
    },
    profileImage: {
      type: String,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    bio: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema); 