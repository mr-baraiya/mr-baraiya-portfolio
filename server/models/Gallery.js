import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { 
    type: String, 
    default: 'Certificates' 
  },
  issuer: { type: String, required: true },
  date: { type: String, default: '2026' },
  image: { type: String, required: true }, // Image cover thumbnail
  pdfUrl: { type: String, default: '' },   // PDF document URL / credential link
  description: { type: String, default: '' },
  credentialUrl: { type: String, default: '' },
  featured: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Gallery', gallerySchema);
