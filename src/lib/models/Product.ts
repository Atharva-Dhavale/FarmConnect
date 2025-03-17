import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  unit: string;
  quantity: number;
  category: string;
  subcategory?: string;
  quality: 'premium' | 'standard' | 'economy';
  images: string[];
  farmer: mongoose.Types.ObjectId;
  harvestDate?: Date;
  expiryDate?: Date;
  isOrganic: boolean;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a product name'],
      trim: true,
      maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a product description'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price'],
      min: [0, 'Price cannot be negative'],
    },
    unit: {
      type: String,
      required: [true, 'Please provide a unit'],
      enum: {
        values: ['kg', 'g', 'l', 'ml', 'piece', 'dozen', 'quintal', 'ton'],
        message: '{VALUE} is not supported',
      },
    },
    quantity: {
      type: Number,
      required: [true, 'Please provide quantity'],
      min: [0, 'Quantity cannot be negative'],
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
    quality: {
      type: String,
      required: [true, 'Please provide quality'],
      enum: {
        values: ['premium', 'standard', 'economy'],
        message: '{VALUE} is not supported',
      },
      default: 'standard',
    },
    images: {
      type: [String],
      default: [],
    },
    farmer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide a farmer'],
    },
    harvestDate: {
      type: Date,
    },
    expiryDate: {
      type: Date,
    },
    isOrganic: {
      type: Boolean,
      default: false,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product; 