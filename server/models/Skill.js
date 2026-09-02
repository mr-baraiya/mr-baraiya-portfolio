import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  proficiency: { type: Number, default: 90, min: 0, max: 100 },
  icon: { type: String, default: 'Code' },
  color: { type: String, default: '#15D8B3' },
  description: { type: String, default: '' },
  featured: { type: Boolean, default: true }
});

export default mongoose.model('Skill', skillSchema);
