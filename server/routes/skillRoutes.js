import express from 'express';
import Skill from '../models/Skill.js';
import mongoose from 'mongoose';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

const resumeSkills = [
  // Languages
  { _id: 'sk1', name: 'JavaScript', category: 'Languages', description: 'Core language for full-stack web engineering' },
  { _id: 'sk2', name: 'TypeScript', category: 'Languages', description: 'Strongly typed JavaScript development' },
  { _id: 'sk3', name: 'Python', category: 'Languages', description: 'AI/ML development, FastAPI & scripting' },
  { _id: 'sk4', name: 'C#', category: 'Languages', description: 'ASP.NET Core backend REST APIs & enterprise applications' },
  { _id: 'sk5', name: 'Java', category: 'Languages', description: 'Object-oriented programming & data structures' },
  { _id: 'sk6', name: 'C', category: 'Languages', description: 'Low-level programming & logic fundamentals' },

  // Frontend
  { _id: 'sk7', name: 'React.js', category: 'Frontend', description: 'Modern SPA development, hooks & state management' },
  { _id: 'sk8', name: 'Next.js', category: 'Frontend', description: 'Server-side rendering, App Router & SSR web apps' },
  { _id: 'sk9', name: 'Tailwind CSS', category: 'Frontend', description: 'Utility-first modern styling & responsive UIs' },
  { _id: 'sk10', name: 'Bootstrap', category: 'Frontend', description: 'Responsive web layout framework' },
  { _id: 'sk11', name: 'ASP.NET MVC', category: 'Frontend', description: 'Model-View-Controller web applications' },
  { _id: 'sk12', name: 'Blazor', category: 'Frontend', description: 'C# client-side interactive web UIs' },
  { _id: 'sk13', name: 'EmailJS', category: 'Frontend', description: 'Client-side automated email integration' },

  // Backend
  { _id: 'sk14', name: 'Node.js', category: 'Backend', description: 'Scalable JavaScript runtime backend' },
  { _id: 'sk15', name: 'Express.js', category: 'Backend', description: 'RESTful API routing & microservices' },
  { _id: 'sk16', name: 'FastAPI', category: 'Backend', description: 'High-performance Python APIs for AI RAG services' },
  { _id: 'sk17', name: 'ASP.NET Core', category: 'Backend', description: 'Enterprise C# REST APIs & Entity Framework' },
  { _id: 'sk18', name: 'Nest.js', category: 'Backend', description: 'Modular TypeScript server framework' },
  { _id: 'sk19', name: 'n8n', category: 'Backend', description: 'Workflow automation & integration engine' },
  { _id: 'sk20', name: 'REST APIs', category: 'Backend', description: 'Scalable API architecture & JSON web tokens' },
  { _id: 'sk21', name: 'WebSocket', category: 'Backend', description: 'Real-time bidirectional event communication' },
  { _id: 'sk22', name: 'Flask', category: 'Backend', description: 'Lightweight Python web microservices' },

  // Databases & Cloud
  { _id: 'sk23', name: 'MongoDB', category: 'Databases & Cloud', description: 'NoSQL document database & Mongoose ORM' },
  { _id: 'sk24', name: 'SQL Server', category: 'Databases & Cloud', description: 'Enterprise relational database management' },
  { _id: 'sk25', name: 'Microsoft Azure', category: 'Databases & Cloud', description: 'Cloud hosting, App Services & Blob Storage' },
  { _id: 'sk26', name: 'MongoDB Atlas', category: 'Databases & Cloud', description: 'Managed cloud database clusters' },
  { _id: 'sk27', name: 'Firebase', category: 'Databases & Cloud', description: 'Real-time cloud database & authentication' },
  { _id: 'sk28', name: 'Supabase', category: 'Databases & Cloud', description: 'Open-source Postgres cloud backend' },

  // Tools & DevOps
  { _id: 'sk29', name: 'Docker', category: 'Tools & DevOps', description: 'Containerization & deployment isolation' },
  { _id: 'sk30', name: 'Git & GitHub', category: 'Tools & DevOps', description: 'Version control, branching & open-source collaboration' },
  { _id: 'sk31', name: 'GitHub Actions', category: 'Tools & DevOps', description: 'CI/CD pipeline automation' },
  { _id: 'sk32', name: 'Postman', category: 'Tools & DevOps', description: 'API testing, debugging & documentation' },
  { _id: 'sk33', name: 'Swagger', category: 'Tools & DevOps', description: 'OpenAPI specification & live documentation' },
  { _id: 'sk34', name: 'Vercel / Render', category: 'Tools & DevOps', description: 'Full-stack cloud deployment platforms' },

  // Coursework
  { _id: 'sk35', name: 'Data Structures & Algorithms', category: 'Coursework', description: '300+ solved problems on LeetCode & GATE CS' },
  { _id: 'sk36', name: 'DBMS & SQL', category: 'Coursework', description: 'Relational design, normalization & query optimization' },
  { _id: 'sk37', name: 'Operating Systems', category: 'Coursework', description: 'Process management, concurrency & memory' },
  { _id: 'sk38', name: 'Computer Networks', category: 'Coursework', description: 'TCP/IP protocols, HTTP/S & network security' }
];

// GET skills
router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      let skills = await Skill.find();
      if (skills.length === 0 || skills.length < 20) {
        await Skill.deleteMany({});
        skills = await Skill.insertMany(resumeSkills.map(s => {
          const { _id, ...rest } = s;
          return rest;
        }));
        console.log('[MongoDB Skills] Synchronized resume skills into database!');
      }
      return res.json(skills);
    }
    return res.json(resumeSkills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.json(resumeSkills);
  }
});

// POST new skill (Protected)
router.post('/', protectAdmin, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const skill = new Skill(req.body);
      const saved = await skill.save();
      return res.status(201).json(saved);
    }
    const newMock = { _id: `skill-${Date.now()}`, ...req.body };
    resumeSkills.push(newMock);
    return res.status(201).json(newMock);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT update skill (Protected)
router.put('/:id', protectAdmin, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const updated = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
      return res.json(updated);
    }
    const idx = resumeSkills.findIndex(s => s._id === req.params.id);
    if (idx !== -1) resumeSkills[idx] = { ...resumeSkills[idx], ...req.body };
    return res.json(resumeSkills[idx] || req.body);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE skill (Protected)
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      await Skill.findByIdAndDelete(req.params.id);
      return res.json({ message: 'Skill deleted successfully' });
    }
    const idx = resumeSkills.findIndex(s => s._id === req.params.id);
    if (idx !== -1) resumeSkills.splice(idx, 1);
    return res.json({ message: 'Skill removed' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
