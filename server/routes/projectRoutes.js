import express from 'express';
import mongoose from 'mongoose';
import Project from '../models/Project.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    return res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// POST new project (Admin feature)
router.post('/', protectAdmin, async (req, res) => {
  try {
    const payload = { ...req.body };
    delete payload._id;
    delete payload.__v;
    if (!payload.image || payload.image.trim() === '') {
      payload.image = 'https://catgbuvicqq4rhla.public.blob.vercel-storage.com/default-project.png';
    }
    const newProject = new Project(payload);
    const savedProject = await newProject.save();
    return res.status(201).json(savedProject);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(400).json({ error: error.message });
  }
});

// PUT update project (Admin feature)
router.put('/:id', protectAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const payload = { ...req.body };
    delete payload._id;
    delete payload.__v;
    if (!payload.image || payload.image.trim() === '') {
      payload.image = 'https://catgbuvicqq4rhla.public.blob.vercel-storage.com/default-project.png';
    }

    let updated;
    if (mongoose.Types.ObjectId.isValid(id)) {
      updated = await Project.findByIdAndUpdate(id, payload, { new: true });
    } else {
      updated = await Project.findOneAndUpdate(
        { $or: [{ _id: id }, { title: req.body.title || id }] },
        payload,
        { new: true, upsert: true }
      );
    }
    return res.json(updated);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(400).json({ error: error.message });
  }
});

// DELETE project (Admin feature)
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    if (mongoose.Types.ObjectId.isValid(id)) {
      await Project.findByIdAndDelete(id);
    } else {
      await Project.deleteOne({ _id: id });
    }
    return res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
