import express from 'express';
import Experience from '../models/Experience.js';
import mongoose from 'mongoose';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

export const resumeExperienceData = [
  {
    role: 'Teaching Assistant — Computer Science & Engineering',
    company: 'Darshan University',
    location: 'Rajkot, Gujarat',
    period: 'Dec 2025 – Apr 2026',
    type: 'Work',
    description: 'Conducted lab sessions for junior B.Tech CSE students in C Programming, Python, Digital Logic, and Logic Development. Assisted students in understanding core programming concepts, debugging code, and completing lab assignments.',
    highlights: [
      'Conducted lab sessions in C Programming, Python, and Digital Logic',
      'Assisted junior students in understanding core programming concepts and debugging code'
    ],
    order: 1
  },
  {
    role: 'Team Leader — Code 2 Trade Hackathon 2025',
    company: 'Darshan University',
    location: 'Rajkot, Gujarat',
    period: '2025',
    type: 'Work',
    description: 'Led development team in building an algorithmic trading solution and coordinating overall architecture and implementation tasks.',
    highlights: [
      'Secured Runner-up position at Code 2 Trade Hackathon 2025',
      'Coordinated software development tasks and algorithmic trading logic'
    ],
    order: 2
  },
  {
    role: 'Project Admin — Winter of Code Social (WoCS 2025)',
    company: 'Open Source Community',
    location: 'Remote',
    period: '2025',
    type: 'Work',
    description: 'Appointed project admin leading open-source contributors, managing repository sprint goals, and reviewing pull requests for web projects.',
    highlights: [
      'Managed open-source repository sprint goals and code reviews',
      'Guided contributors in open-source web application development'
    ],
    order: 3
  },
  {
    role: 'Bachelor of Technology — Computer Science & Engineering',
    company: 'Darshan Institute of Engineering & Technology, Darshan University',
    location: 'Rajkot, Gujarat',
    period: 'July 2023 – May 2027',
    type: 'Education',
    description: 'Pursuing B.Tech in CSE with a CGPA of 9.24 / 10. Relevant Coursework: Data Structures & Algorithms, Operating Systems, Computer Networks, DBMS, OOP, TOC, CD.',
    highlights: [
      'CGPA: 9.24 / 10',
      'Qualified GATE 2026 CSE (AIR 4226, Score: 48.34)',
      'Qualified TCS CodeVita Season 13 Global Coding Challenge'
    ],
    order: 4
  },
  {
    role: 'Higher Secondary (Class 12 - Science)',
    company: 'Smt. R. A. Kalathiya Vidhya Bhavan (GSEB Board)',
    location: 'Botad, Gujarat',
    period: 'Completed May 2023',
    type: 'Education',
    description: 'Completed Higher Secondary Education in Science stream with 75% marks and scored 94.5 Percentile in JEE (Main).',
    highlights: [
      'Percentage: 75%',
      'JEE (Main): 94.5 Percentile'
    ],
    order: 5
  },
  {
    role: 'Secondary School (Class 10 - SSC)',
    company: 'Shri M. D. Shah Vidhyalaya (GSEB Board)',
    location: 'Botad, Gujarat',
    period: 'Completed May 2021',
    type: 'Education',
    description: 'Completed Secondary School Education under GSEB Board with 85% marks.',
    highlights: [
      'Percentage: 85%'
    ],
    order: 6
  }
];

// Seed or sync experience in database
const seedExperience = async () => {
  if (mongoose.connection.readyState === 1) {
    try {
      for (const e of resumeExperienceData) {
        await Experience.findOneAndUpdate(
          { role: e.role, company: e.company },
          { $set: e },
          { upsert: true, new: true }
        );
      }
    } catch (err) {
      console.error('[MongoDB Experience Seed Error]:', err.message);
    }
  }
};

// GET experience entries
router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      await seedExperience();
      const list = await Experience.find().sort({ order: 1 });
      if (list.length > 0) return res.json(list);
    }
    return res.json(resumeExperienceData.map((e, idx) => ({ _id: `exp-${idx + 1}`, ...e })));
  } catch (error) {
    res.json(resumeExperienceData.map((e, idx) => ({ _id: `exp-${idx + 1}`, ...e })));
  }
});

// POST new experience (Protected)
router.post('/', protectAdmin, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const exp = new Experience(req.body);
      const saved = await exp.save();
      return res.status(201).json(saved);
    }
    const newMock = { _id: `exp-${Date.now()}`, ...req.body };
    resumeExperienceData.push(newMock);
    return res.status(201).json(newMock);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT update experience (Protected)
router.put('/:id', protectAdmin, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const updated = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
      return res.json(updated);
    }
    const idx = resumeExperienceData.findIndex((e, i) => e._id === req.params.id || `exp-${i + 1}` === req.params.id);
    if (idx !== -1) resumeExperienceData[idx] = { ...resumeExperienceData[idx], ...req.body };
    return res.json(resumeExperienceData[idx] || req.body);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE experience (Protected)
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      await Experience.findByIdAndDelete(req.params.id);
      return res.json({ message: 'Experience item deleted successfully' });
    }
    const idx = resumeExperienceData.findIndex((e, i) => e._id === req.params.id || `exp-${i + 1}` === req.params.id);
    if (idx !== -1) resumeExperienceData.splice(idx, 1);
    return res.json({ message: 'Experience item removed' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
