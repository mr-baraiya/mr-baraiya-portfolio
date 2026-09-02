
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio_db';

const allSkills = [
  // Coursework
  { name: 'Data Structures & Algorithms', category: 'Coursework', proficiency: 95, color: '#15D8B3', icon: 'Code' },
  { name: 'Operating Systems', category: 'Coursework', proficiency: 90, color: '#15D8B3', icon: 'Cpu' },
  { name: 'Computer Networks', category: 'Coursework', proficiency: 90, color: '#15D8B3', icon: 'Globe' },
  { name: 'DBMS', category: 'Coursework', proficiency: 92, color: '#15D8B3', icon: 'Database' },
  { name: 'OOP (Object Oriented Programming)', category: 'Coursework', proficiency: 95, color: '#15D8B3', icon: 'Layers' },
  { name: 'Theory of Computation (TOC)', category: 'Coursework', proficiency: 88, color: '#15D8B3', icon: 'Cpu' },
  { name: 'Compiler Design (CD)', category: 'Coursework', proficiency: 85, color: '#15D8B3', icon: 'Code' },

  // Languages
  { name: 'C', category: 'Languages', proficiency: 90, color: '#15D8B3', icon: 'Code' },
  { name: 'Java', category: 'Languages', proficiency: 92, color: '#15D8B3', icon: 'Code' },
  { name: 'JavaScript', category: 'Languages', proficiency: 96, color: '#15D8B3', icon: 'Code' },
  { name: 'TypeScript', category: 'Languages', proficiency: 94, color: '#15D8B3', icon: 'Code' },
  { name: 'Python', category: 'Languages', proficiency: 92, color: '#15D8B3', icon: 'Code' },
  { name: 'C#', category: 'Languages', proficiency: 90, color: '#15D8B3', icon: 'Code' },

  // Frontend
  { name: 'React.js', category: 'Frontend', proficiency: 96, color: '#15D8B3', icon: 'Layers' },
  { name: 'Next.js', category: 'Frontend', proficiency: 92, color: '#15D8B3', icon: 'Globe' },
  { name: 'EmailJS', category: 'Frontend', proficiency: 90, color: '#15D8B3', icon: 'Mail' },
  { name: 'Bootstrap', category: 'Frontend', proficiency: 90, color: '#15D8B3', icon: 'Layers' },
  { name: 'Tailwind CSS', category: 'Frontend', proficiency: 95, color: '#15D8B3', icon: 'Layers' },
  { name: 'ASP.NET MVC', category: 'Frontend', proficiency: 88, color: '#15D8B3', icon: 'Layers' },
  { name: 'Blazor', category: 'Frontend', proficiency: 85, color: '#15D8B3', icon: 'Layers' },

  // Backend
  { name: 'Node.js', category: 'Backend', proficiency: 95, color: '#15D8B3', icon: 'Cpu' },
  { name: 'Express.js', category: 'Backend', proficiency: 95, color: '#15D8B3', icon: 'Cpu' },
  { name: 'Nest.js', category: 'Backend', proficiency: 88, color: '#15D8B3', icon: 'Cpu' },
  { name: 'n8n Workflow Automation', category: 'Backend', proficiency: 90, color: '#15D8B3', icon: 'Layers' },
  { name: 'REST APIs', category: 'Backend', proficiency: 96, color: '#15D8B3', icon: 'Globe' },
  { name: 'WebSocket', category: 'Backend', proficiency: 92, color: '#15D8B3', icon: 'Globe' },
  { name: 'Flask', category: 'Backend', proficiency: 88, color: '#15D8B3', icon: 'Cpu' },
  { name: 'FastAPI', category: 'Backend', proficiency: 90, color: '#15D8B3', icon: 'Cpu' },
  { name: 'ASP.NET Core', category: 'Backend', proficiency: 92, color: '#15D8B3', icon: 'Cpu' },

  // Database & Cloud
  { name: 'MongoDB', category: 'Database', proficiency: 94, color: '#15D8B3', icon: 'Database' },
  { name: 'SQL Server', category: 'Database', proficiency: 90, color: '#15D8B3', icon: 'Database' },
  { name: 'Microsoft Azure', category: 'Database', proficiency: 88, color: '#15D8B3', icon: 'Globe' },
  { name: 'MongoDB Atlas', category: 'Database', proficiency: 95, color: '#15D8B3', icon: 'Database' },
  { name: 'Firebase', category: 'Database', proficiency: 92, color: '#15D8B3', icon: 'Database' },
  { name: 'Supabase', category: 'Database', proficiency: 90, color: '#15D8B3', icon: 'Database' },

  // Deployment Platforms
  { name: 'Vercel', category: 'Deployment', proficiency: 95, color: '#15D8B3', icon: 'Globe' },
  { name: 'Render', category: 'Deployment', proficiency: 92, color: '#15D8B3', icon: 'Globe' },
  { name: 'Netlify', category: 'Deployment', proficiency: 94, color: '#15D8B3', icon: 'Globe' },
  { name: 'Railway', category: 'Deployment', proficiency: 90, color: '#15D8B3', icon: 'Globe' },
  { name: 'Cloudflare', category: 'Deployment', proficiency: 90, color: '#15D8B3', icon: 'Globe' },
  { name: 'SmartASP.NET', category: 'Deployment', proficiency: 88, color: '#15D8B3', icon: 'Globe' },

  // Tools & DevOps
  { name: 'Git', category: 'DevOps & Tools', proficiency: 95, color: '#15D8B3', icon: 'Code' },
  { name: 'GitHub', category: 'DevOps & Tools', proficiency: 96, color: '#15D8B3', icon: 'Code' },
  { name: 'Postman', category: 'DevOps & Tools', proficiency: 95, color: '#15D8B3', icon: 'Globe' },
  { name: 'Docker', category: 'DevOps & Tools', proficiency: 90, color: '#15D8B3', icon: 'Cpu' },
  { name: 'Swagger', category: 'DevOps & Tools', proficiency: 92, color: '#15D8B3', icon: 'Globe' },
  { name: 'GitHub Actions', category: 'DevOps & Tools', proficiency: 90, color: '#15D8B3', icon: 'Cpu' }
];

mongoose.connect(mongoUri).then(async () => {
  const SkillSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    proficiency: { type: Number, default: 90 },
    color: { type: String, default: '#15D8B3' },
    icon: { type: String, default: 'Code' }
  });

  const Skill = mongoose.models.Skill || mongoose.model('Skill', SkillSchema);

  // Clear old skills and insert all fresh skills
  await Skill.deleteMany({});
  const inserted = await Skill.insertMany(allSkills);

  console.log(`Successfully seeded ${inserted.length} skills in MongoDB Atlas!`);
  process.exit(0);
}).catch(err => {
  console.error('Skill seeding error:', err);
  process.exit(1);
});
