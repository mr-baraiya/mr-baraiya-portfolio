import express from 'express';
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
    const exp = new Experience(req.body);
    const saved = await exp.save();
    return res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT update experience (Protected)
router.put('/:id', protectAdmin, async (req, res) => {
  try {
    const updated = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE experience (Protected)
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    await Experience.findByIdAndDelete(req.params.id);
    return res.json({ message: 'Experience item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
