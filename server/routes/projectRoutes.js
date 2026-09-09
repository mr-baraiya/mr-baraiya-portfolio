import express from 'express';
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
    const newProject = new Project(req.body);
    const savedProject = await newProject.save();
    return res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT update project (Admin feature)
router.put('/:id', protectAdmin, async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE project (Admin feature)
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    return res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
