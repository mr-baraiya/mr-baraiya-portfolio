import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  name: { type: String, default: 'Vishal Baraiya' },
  role: { type: String, default: 'Software Engineer & CS Student | Web Development, AI/ML & DevOps' },
  statusBadge: { type: String, default: 'Available for full-time, part-time & freelance opportunities' },
  bio: { type: String, default: 'Computer Science student at Darshan University (9.24 CGPA). I build web applications, explore AI/ML RAG pipelines, and share what I learn through teaching.' },
  aboutText1: { type: String, default: "Hi, I'm Vishal Baraiya! I'm a Computer Science student and software developer based in Botad, Gujarat. I love building practical software solutions — from responsive web apps and REST APIs to AI-driven automation workflows." },
  aboutText2: { type: String, default: "Currently pursuing my B.Tech at Darshan University with a 9.24 CGPA, I work with React, Next.js, Node.js, ASP.NET Core, FastAPI, and Python. I've solved 300+ problems on LeetCode, qualified GATE 2026 (AIR 4226), and cleared TCS CodeVita." },

  // Contact & Personal Info
  email: { type: String, default: 'baraiyavishalbhai32@gmail.com' },
  phone: { type: String, default: '+91 7383359679' },
  location: { type: String, default: 'Botad, Gujarat, India - 364710 (Open to Remote)' },
  resumeUrl: { type: String, default: '/pdf/Vishal_Baraiya_Resume.pdf' },
  education: { type: String, default: 'B.Tech CSE - Darshan University (CGPA 9.24/10)' },

  // 10 Developer & Social Profile URLs
  githubUrl: { type: String, default: 'https://github.com/mr-baraiya' },
  linkedinUrl: { type: String, default: 'https://www.linkedin.com/in/baraiya-vishalbhai/' },
  leetcodeUrl: { type: String, default: 'https://leetcode.com/u/mr_baraiya/' },
  codechefUrl: { type: String, default: 'https://www.codechef.com/users/mr_baraiya' },
  kaggleUrl: { type: String, default: 'https://www.kaggle.com/vishalbaraiya1014' },
  hackerrankUrl: { type: String, default: 'https://www.hackerrank.com/profile/h23010101014' },
  huggingfaceUrl: { type: String, default: 'https://huggingface.co/mr-baraiya' },
  twitterUrl: { type: String, default: 'https://x.com/baraiya1014' },
  youtubeUrl: { type: String, default: 'https://www.youtube.com/@Vi.685_junior' },
  instagramUrl: { type: String, default: 'https://www.instagram.com/vishalbaraiya_1014/' },
  whatsappUrl: { type: String, default: 'https://wa.me/917383359679' },

  projectsCompleted: { type: String, default: '21+' },
  yearsExperience: { type: String, default: '2+' },
  uptimeStats: { type: String, default: '100%' },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Profile', profileSchema);
