import express from 'express';
import mongoose from 'mongoose';
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
    const payload = { ...req.body };
    delete payload._id;
    delete payload.__v;
    const skill = new Skill(payload);
    const saved = await skill.save();
    return res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT update skill (Protected)
router.put('/:id', protectAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const payload = { ...req.body };
    delete payload._id;
    delete payload.__v;
    let updated;
    if (mongoose.Types.ObjectId.isValid(id)) {
      updated = await Skill.findByIdAndUpdate(id, payload, { new: true });
    } else {
      updated = await Skill.findOneAndUpdate({ _id: id }, payload, { new: true, upsert: true });
    }
    return res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE skill (Protected)
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    if (mongoose.Types.ObjectId.isValid(id)) {
      await Skill.findByIdAndDelete(id);
    } else {
      await Skill.deleteOne({ _id: id });
    }
    return res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
