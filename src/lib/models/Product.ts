import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a product name'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a product description'],
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
    enum: ['vegetables', 'fruits', 'grains', 'dairy', 'poultry', 'spices', 'other'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
    min: [0, 'Price cannot be negative'],
  },
  unit: {
    type: String,
    required: [true, 'Please provide a unit'],
    enum: ['kg', 'g', 'l', 'ml', 'piece', 'dozen', 'quintal', 'ton'],
  },
  quantity: {
    type: Number,
    required: [true, 'Please provide quantity'],
    min: [0, 'Quantity cannot be negative'],
  },
  images: [{
    type: String,
    required: [true, 'Please provide at least one image'],
  }],
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Product must belong to a farmer'],
  },
  isOrganic: {
    type: Boolean,
    default: false,
  },
  quality: {
    type: String,
    enum: ['premium', 'standard', 'economy'],
    default: 'standard',
  },
  harvestDate: {
    type: Date,
  },
  expiryDate: {
    type: Date,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true,
});

// Add indexes for better query performance
productSchema.index({ category: 1 });
productSchema.index({ farmer: 1 });
productSchema.index({ isAvailable: 1 });
productSchema.index({ price: 1 });

// Prevent mongoose from throwing an error if the model is already defined
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product; 