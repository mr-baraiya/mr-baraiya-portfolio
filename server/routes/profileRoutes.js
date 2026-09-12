import express from 'express';
import mongoose from 'mongoose';
import Profile from '../models/Profile.js';
import Project from '../models/Project.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

const defaultProfile = {
  name: 'Vishal Baraiya',
  role: 'Software Engineer & CS Student | Web Development, AI/ML & DevOps',
  statusBadge: 'Available for full-time, part-time & freelance opportunities',
  bio: 'Computer Science student at Darshan University (9.24 CGPA). I build web applications, explore AI/ML RAG pipelines, and share what I learn through teaching.',
  aboutText1: "Hi, I'm Vishal Baraiya! I'm a Computer Science student and software developer based in Botad, Gujarat. I love building practical software solutions — from responsive web apps and REST APIs to AI-driven automation workflows.",
  aboutText2: "Currently pursuing my B.Tech at Darshan University with a 9.24 CGPA, I work with React, Next.js, Node.js, ASP.NET Core, FastAPI, and Python. I've solved 300+ problems on LeetCode, qualified GATE 2026 (AIR 4226), and cleared TCS CodeVita.",

  // Contact & Personal Info
  email: 'baraiyavishalbhai32@gmail.com',
  phone: '+91 7383359679',
  location: 'Botad, Gujarat, India - 364710 (Open to Remote)',
  resumeUrl: 'https://catgbuvicqq4rhla.public.blob.vercel-storage.com/Vishal_Baraiya_Resume.pdf',
  education: 'B.Tech CSE - Darshan University (CGPA 9.24/10)',

  // 10 Developer & Social Profile URLs
  githubUrl: 'https://github.com/mr-baraiya',
  linkedinUrl: 'https://www.linkedin.com/in/baraiya-vishalbhai/',
  leetcodeUrl: 'https://leetcode.com/u/mr_baraiya/',
  codechefUrl: 'https://www.codechef.com/users/mr_baraiya',
  kaggleUrl: 'https://www.kaggle.com/vishalbaraiya1014',
  hackerrankUrl: 'https://www.hackerrank.com/profile/h23010101014',
  huggingfaceUrl: 'https://huggingface.co/mr-baraiya',
  twitterUrl: 'https://x.com/baraiya1014',
  youtubeUrl: 'https://www.youtube.com/@Vi.685_junior',
  instagramUrl: 'https://www.instagram.com/vishalbaraiya_1014/',
  whatsappUrl: 'https://wa.me/917383359679',

  projectsCompleted: '21+',
  yearsExperience: '2+',
  uptimeStats: '100%',
  featuredProjectIds: ['proj-13', 'proj-12', 'proj-19', 'proj-16']
};

// GET profile settings
router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      let profile = await Profile.findOne();
      if (!profile) {
        profile = new Profile(defaultProfile);
        await profile.save();
      }
      return res.json(profile);
    }
    return res.json(defaultProfile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.json(defaultProfile);
  }
});

// PUT update profile settings (Protected)
router.put('/', protectAdmin, async (req, res) => {
  try {
    const updateData = { ...req.body };
    delete updateData._id;
    delete updateData.__v;

    if (mongoose.connection.readyState === 1) {
      let profile = await Profile.findOne();
      if (!profile) {
        profile = new Profile(updateData);
      } else {
        Object.assign(profile, updateData);
        profile.updatedAt = Date.now();
      }
      const saved = await profile.save();

      // Sync project featured flags in MongoDB safely
      if (Array.isArray(saved.featuredProjectIds) && saved.featuredProjectIds.length > 0) {
        try {
          const validObjectIds = saved.featuredProjectIds
            .filter(id => id && mongoose.Types.ObjectId.isValid(id))
            .map(id => new mongoose.Types.ObjectId(id));

          await Project.updateMany({}, { $set: { featured: false } });
          if (validObjectIds.length > 0) {
            await Project.updateMany(
              { _id: { $in: validObjectIds } },
              { $set: { featured: true } }
            );
          }
        } catch (projSyncErr) {
          console.warn('[Profile Sync Warning] Could not sync featured projects:', projSyncErr.message);
        }
      }

      return res.json(saved);
    }
    Object.assign(defaultProfile, updateData);
    return res.json(defaultProfile);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(400).json({ error: error.message });
  }
});

export default router;
