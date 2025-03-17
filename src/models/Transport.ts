import mongoose, { Schema, Document } from 'mongoose';

export interface ITransport extends Document {
  transporterId: mongoose.Types.ObjectId;
  transporterName: string;
  vehicleType: string;
  vehicleNumber: string;
  capacity: {
    weight: number;
    volume?: number;
  };
  departureAddress: string;
  destinationAddress: string;
  departureTime: Date;
  estimatedArrivalTime: Date;
  pricePerKm: number;
  pricePerKg: number;
  routeDescription: string;
  isAvailable: boolean;
  status: 'available' | 'booked' | 'in-transit' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

const TransportSchema = new Schema<ITransport>(
  {
    transporterId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    transporterName: {
      type: String,
      required: true,
    },
    vehicleType: {
      type: String,
      required: true,
    },
    vehicleNumber: {
      type: String,
      required: true,
    },
    capacity: {
      weight: {
        type: Number,
        required: true,
      },
      volume: {
        type: Number,
      },
    },
    departureAddress: {
      type: String,
      required: true,
    },
    destinationAddress: {
      type: String,
      required: true,
    },
    departureTime: {
      type: Date,
      required: true,
    },
    estimatedArrivalTime: {
      type: Date,
      required: true,
    },
    pricePerKm: {
      type: Number,
      required: true,
    },
    pricePerKg: {
      type: Number,
      required: true,
    },
    routeDescription: {
      type: String,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ['available', 'booked', 'in-transit', 'completed', 'cancelled'],
      default: 'available',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Transport || mongoose.model<ITransport>('Transport', TransportSchema); 