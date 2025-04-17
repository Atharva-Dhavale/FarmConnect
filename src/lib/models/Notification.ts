import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Notification must have a recipient'],
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  type: {
    type: String,
    required: [true, 'Notification must have a type'],
    enum: ['demand', 'product', 'transport', 'order', 'system'],
  },
  title: {
    type: String,
    required: [true, 'Notification must have a title'],
  },
  message: {
    type: String,
    required: [true, 'Notification must have a message'],
  },
  relatedId: {
    type: mongoose.Schema.Types.ObjectId,
    // This can reference a product, demand, transport, or order
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  // For location updates
  location: {
    type: String,
  }
}, {
  timestamps: true,
});

// Add indexes for better query performance
notificationSchema.index({ recipient: 1 });
notificationSchema.index({ isRead: 1 });
notificationSchema.index({ createdAt: -1 });

const Notification = mongoose.models.Notification || mongoose.model('Notification', notificationSchema);

export default Notification; 