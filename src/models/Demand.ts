import mongoose, { Schema, Document } from 'mongoose';

export interface IDemand extends Document {
  retailerId: mongoose.Types.ObjectId;
  retailerName: string;
  productName: string;
  category: string;
  subcategory?: string;
  qualityPreference: string;
  quantity: number;
  unit: string;
  minPrice: number;
  maxPrice: number;
  requiredBy: Date;
  description: string;
  deliveryAddress: string;
  status: 'open' | 'fulfilled' | 'expired' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

const DemandSchema = new Schema<IDemand>(
  {
    retailerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    retailerName: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    subcategory: {
      type: String,
    },
    qualityPreference: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    minPrice: {
      type: Number,
      required: true,
    },
    maxPrice: {
      type: Number,
      required: true,
    },
    requiredBy: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    deliveryAddress: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['open', 'fulfilled', 'expired', 'cancelled'],
      default: 'open',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Demand || mongoose.model<IDemand>('Demand', DemandSchema); 