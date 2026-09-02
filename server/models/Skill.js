import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true, enum: ['Frontend', 'Backend', 'Database & Cloud', 'Tools & DevOps'] },
  proficiency: { type: Number, required: true, min: 0, max: 100 },
  icon: { type: String, required: true },
  color: { type: String, default: '#6366f1' },
  featured: { type: Boolean, default: true }
});

export default mongoose.model('Skill', skillSchema);
