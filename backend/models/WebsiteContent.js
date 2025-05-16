
import mongoose from 'mongoose';

const websiteContentSchema = new mongoose.Schema({
  section: { type: String, required: true },
  title: String,
  subtitle: String,
  content: String,
  imageUrl: String,
  buttonText: String,
  buttonLink: String,
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('WebsiteContent', websiteContentSchema);
