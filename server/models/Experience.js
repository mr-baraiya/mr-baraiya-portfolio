import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  role: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, default: 'Remote / On-site' },
  period: { type: String, required: true },
  type: { type: String, default: 'Work', enum: ['Work', 'Education', 'Certification'] },
  description: { type: String, required: true },
  highlights: [{ type: String }],
  order: { type: Number, default: 0 }
});

export default mongoose.model('Experience', experienceSchema);
