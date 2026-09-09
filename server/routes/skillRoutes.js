import express from 'express';
import Skill from '../models/Skill.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET all skills
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find();
    return res.json(skills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({ error: 'Failed to fetch skills' });
  }
});

// POST new skill (Protected)
router.post('/', protectAdmin, async (req, res) => {
  try {
    const skill = new Skill(req.body);
    const saved = await skill.save();
    return res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT update skill (Protected)
router.put('/:id', protectAdmin, async (req, res) => {
  try {
    const updated = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE skill (Protected)
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    return res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
