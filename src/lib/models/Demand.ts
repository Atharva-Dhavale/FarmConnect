import mongoose, { Document, Schema } from 'mongoose';

export interface IDemand extends Document {
  retailer: mongoose.Types.ObjectId;
  productName: string;
  description: string;
  category: string;
  subcategory?: string;
  quantity: number;
  unit: string;
  priceRange: {
    min: number;
    max: number;
  };
  qualityPreference?: 'premium' | 'standard' | 'economy';
  requiredBy: Date;
  location: {
    type: string;
    coordinates: [number, number];
    address: string;
  };
  isActive: boolean;
  isFulfilled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const DemandSchema = new Schema<IDemand>(
  {
    retailer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide a retailer'],
    },
    productName: {
      type: String,
      required: [true, 'Please provide a product name'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
      enum: {
        values: ['vegetables', 'fruits', 'grains', 'dairy', 'poultry', 'spices', 'other'],
        message: '{VALUE} is not supported',
      },
    },
    subcategory: {
      type: String,
    },
    quantity: {
      type: Number,
      required: [true, 'Please provide quantity'],
      min: [1, 'Quantity must be at least 1'],
    },
    unit: {
      type: String,
      required: [true, 'Please provide a unit'],
      enum: {
        values: ['kg', 'g', 'l', 'ml', 'piece', 'dozen', 'quintal', 'ton'],
        message: '{VALUE} is not supported',
      },
    },
    priceRange: {
      min: {
        type: Number,
        required: [true, 'Please provide a minimum price'],
        min: [0, 'Minimum price cannot be negative'],
      },
      max: {
        type: Number,
        required: [true, 'Please provide a maximum price'],
        min: [0, 'Maximum price cannot be negative'],
      },
    },
    qualityPreference: {
      type: String,
      enum: {
        values: ['premium', 'standard', 'economy'],
        message: '{VALUE} is not supported',
      },
    },
    requiredBy: {
      type: Date,
      required: [true, 'Please provide a required by date'],
    },
    location: {
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
        required: [true, 'Please provide an address'],
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFulfilled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Create index for geospatial queries
DemandSchema.index({ 'location.coordinates': '2dsphere' });

const Demand = mongoose.models.Demand || mongoose.model<IDemand>('Demand', DemandSchema);

export default Demand; 