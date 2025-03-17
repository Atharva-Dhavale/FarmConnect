import mongoose, { Document, Schema } from 'mongoose';

export interface IOrder extends Document {
  buyer: mongoose.Types.ObjectId;
  seller: mongoose.Types.ObjectId;
  products: {
    product: mongoose.Types.ObjectId;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'completed' | 'failed';
  paymentMethod?: string;
  transport?: mongoose.Types.ObjectId;
  pickupAddress: {
    type: string;
    coordinates: [number, number];
    address: string;
  };
  deliveryAddress: {
    type: string;
    coordinates: [number, number];
    address: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    buyer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide a buyer'],
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide a seller'],
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: [true, 'Please provide a product'],
        },
        quantity: {
          type: Number,
          required: [true, 'Please provide quantity'],
          min: [1, 'Quantity must be at least 1'],
        },
        price: {
          type: Number,
          required: [true, 'Please provide a price'],
          min: [0, 'Price cannot be negative'],
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: [true, 'Please provide a total amount'],
      min: [0, 'Total amount cannot be negative'],
    },
    status: {
      type: String,
      enum: {
        values: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
        message: '{VALUE} is not supported',
      },
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      enum: {
        values: ['pending', 'completed', 'failed'],
        message: '{VALUE} is not supported',
      },
      default: 'pending',
    },
    paymentMethod: {
      type: String,
    },
    transport: {
      type: Schema.Types.ObjectId,
      ref: 'Transport',
    },
    pickupAddress: {
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
        required: [true, 'Please provide a pickup address'],
      },
    },
    deliveryAddress: {
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
        required: [true, 'Please provide a delivery address'],
      },
    },
  },
  { timestamps: true }
);

// Create indexes for geospatial queries
OrderSchema.index({ 'pickupAddress.coordinates': '2dsphere' });
OrderSchema.index({ 'deliveryAddress.coordinates': '2dsphere' });

const Order = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default Order; 