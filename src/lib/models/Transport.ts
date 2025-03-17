import mongoose, { Document, Schema } from 'mongoose';

export interface ITransport extends Document {
  transporter: mongoose.Types.ObjectId;
  vehicleType: string;
  vehicleNumber: string;
  departureLocation: {
    type: string;
    coordinates: [number, number];
    address: string;
  };
  destinationLocation: {
    type: string;
    coordinates: [number, number];
    address: string;
  };
  departureTime: Date;
  estimatedArrivalTime: Date;
  availableCapacity: {
    weight: number;
    volume?: number;
  };
  pricePerKm: number;
  isAvailable: boolean;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TransportSchema = new Schema<ITransport>(
  {
    transporter: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide a transporter'],
    },
    vehicleType: {
      type: String,
      required: [true, 'Please provide a vehicle type'],
      enum: {
        values: ['truck', 'van', 'pickup', 'refrigerated', 'other'],
        message: '{VALUE} is not supported',
      },
    },
    vehicleNumber: {
      type: String,
      required: [true, 'Please provide a vehicle number'],
    },
    departureLocation: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
      },
      address: {
        type: String,
        required: [true, 'Please provide a departure address'],
      },
    },
    destinationLocation: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
      },
      address: {
        type: String,
        required: [true, 'Please provide a destination address'],
      },
    },
    departureTime: {
      type: Date,
      required: [true, 'Please provide a departure time'],
    },
    estimatedArrivalTime: {
      type: Date,
      required: [true, 'Please provide an estimated arrival time'],
    },
    availableCapacity: {
      weight: {
        type: Number,
        required: [true, 'Please provide available weight capacity in kg'],
      },
      volume: {
        type: Number,
      },
    },
    pricePerKm: {
      type: Number,
      required: [true, 'Please provide a price per km'],
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Create indexes for geospatial queries
TransportSchema.index({ 'departureLocation.coordinates': '2dsphere' });
TransportSchema.index({ 'destinationLocation.coordinates': '2dsphere' });

const Transport = mongoose.models.Transport || mongoose.model<ITransport>('Transport', TransportSchema);

export default Transport; 