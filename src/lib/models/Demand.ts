import mongoose from 'mongoose';

const demandSchema = new mongoose.Schema({
  retailer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Demand must belong to a retailer'],
  },
  product: {
    type: String,
    required: [true, 'Please provide a product name'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
    enum: ['vegetables', 'fruits', 'grains', 'dairy', 'poultry', 'spices', 'other'],
  },
  quantity: {
    type: Number,
    required: [true, 'Please provide quantity'],
    min: [0, 'Quantity cannot be negative'],
  },
  unit: {
    type: String,
    required: [true, 'Please provide a unit'],
    enum: ['kg', 'g', 'l', 'ml', 'piece', 'dozen', 'quintal', 'ton'],
  },
  priceRange: {
    min: {
      type: Number,
      required: [true, 'Please provide minimum price'],
      min: [0, 'Price cannot be negative'],
    },
    max: {
      type: Number,
      required: [true, 'Please provide maximum price'],
      min: [0, 'Price cannot be negative'],
    }
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  requiredBy: {
    type: Date,
    required: [true, 'Please provide a required by date'],
  },
  location: {
    type: String,
    required: [true, 'Please provide a delivery location'],
  },
  status: {
    type: String,
    enum: ['open', 'fulfilled', 'expired', 'cancelled'],
    default: 'open',
  },
  isOrganic: {
    type: Boolean,
    default: false,
  },
  qualityPreference: {
    type: String,
    enum: ['premium', 'standard', 'economy', 'any'],
    default: 'any',
  },
}, {
  timestamps: true,
});

// Add indexes for better query performance
demandSchema.index({ category: 1 });
demandSchema.index({ retailer: 1 });
demandSchema.index({ status: 1 });
demandSchema.index({ requiredBy: 1 });

const Demand = mongoose.models.Demand || mongoose.model('Demand', demandSchema);

export default Demand; 