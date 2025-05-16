
import mongoose from 'mongoose';
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: String,
  images: [String],
  category: { type: String, required: true },
  tags: [String],
  stock: { type: Number, default: 0 },
  isInStock: { type: Boolean, default: true },
  discount: {
    type: { type: String, enum: ['none', 'percentage', 'fixed'], default: 'none' },
    value: { type: Number, default: 0 }
  },
  featured: { type: Boolean, default: false },
  currency: { type: String, default: '৳' }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
