import express from 'express';
import mongoose from 'mongoose';
import Experience from '../models/Experience.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET all experience entries
router.get('/', async (req, res) => {
  try {
    const list = await Experience.find().sort({ order: 1 });
    return res.json(list);
  } catch (error) {
    console.error('Error fetching experience:', error);
    res.status(500).json({ error: 'Failed to fetch experience' });
  }
});

// POST new experience (Protected)
router.post('/', protectAdmin, async (req, res) => {
  try {
    const payload = { ...req.body };
    delete payload._id;
    delete payload.__v;
    const exp = new Experience(payload);
    const saved = await exp.save();
    return res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT update experience (Protected)
router.put('/:id', protectAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const payload = { ...req.body };
    delete payload._id;
    delete payload.__v;
    let updated;
    if (mongoose.Types.ObjectId.isValid(id)) {
      updated = await Experience.findByIdAndUpdate(id, payload, { new: true });
    } else {
      updated = await Experience.findOneAndUpdate({ _id: id }, payload, { new: true, upsert: true });
    }
    return res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE experience (Protected)
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    if (mongoose.Types.ObjectId.isValid(id)) {
      await Experience.findByIdAndDelete(id);
    } else {
      await Experience.deleteOne({ _id: id });
    }
    return res.json({ message: 'Experience item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
