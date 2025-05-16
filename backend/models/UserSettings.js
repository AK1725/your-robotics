
import mongoose from 'mongoose';

const userSettingsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  storeName: String,
  storeEmail: String,
  storePhone: String,
  storeAddress: String,
  currency: { type: String, default: '৳' },
  logo: String,
  theme: { type: String, enum: ['light', 'dark', 'system'], default: 'light' },
  notifications: {
    newOrders: { type: Boolean, default: true },
    lowStock: { type: Boolean, default: true },
    customerMessages: { type: Boolean, default: true }
  }
}, { timestamps: true });

export default mongoose.model('UserSettings', userSettingsSchema);
