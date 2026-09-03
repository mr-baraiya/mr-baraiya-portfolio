import express from 'express';
import Gallery from '../models/Gallery.js';
import mongoose from 'mongoose';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

export const publicFolderGalleryData = [
  {
    title: "TCS CodeVita Season 13 Global Coding Certificate",
    category: "Certificates",
    issuer: "Tata Consultancy Services (TCS)",
    date: "2025",
    image: "/img/tcs_codevita_season13.png",
    pdfUrl: "/pdf/tcs_codevita_season13.pdf",
    description: "Certified in TCS CodeVita Season 13 world flagship competitive programming contest evaluating data structures & algorithm efficiency.",
    credentialUrl: "/pdf/tcs_codevita_season13.pdf",
    featured: true
  },
  {
    title: "Odoo x GCET Hackathon 2026 - Dayflow HRMS",
    category: "Hackathons",
    issuer: "Odoo & GCET Hackathon 2026",
    date: "February 2026",
    image: "/img/odoo_hackathon_2026.jpg",
    pdfUrl: "/img/odoo_hackathon_2026.jpg",
    description: "Developed Dayflow HRMS system for Odoo Hackathon 2026 Virtual Round, covering attendance, payroll, employee dashboards, and role-based access.",
    credentialUrl: "/img/odoo_hackathon_2026.jpg",
    featured: false
  },
  {
    title: "ISRO Bharatiya Antariksh Hackathon 2026",
    category: "Hackathons",
    issuer: "ISRO - Indian Space Research Organisation",
    date: "2026",
    image: "/img/isro_bharatiya_hackathon_2026.png",
    pdfUrl: "/pdf/isro_bharatiya_hackathon_2026.pdf",
    description: "Participated in Bharatiya Antariksh Hackathon organized by ISRO, developing space technology solutions and geospatial data models.",
    credentialUrl: "/pdf/isro_bharatiya_hackathon_2026.pdf",
    featured: false
  },
  {
    title: "Market Maya - Algorithmic Trading Hackathon 2025",
    category: "Hackathons",
    issuer: "Market Maya",
    date: "2025",
    image: "/img/market_maya_hackathon_2025.jpg",
    pdfUrl: "/img/market_maya_hackathon_2025.jpg",
    description: "Built quantitative algorithmic trading strategies and automated market analysis indicators in Python.",
    credentialUrl: "/img/market_maya_hackathon_2025.jpg",
    featured: false
  },
  {
    title: "CodeArena DU 2025 Hackathon",
    category: "Hackathons",
    issuer: "Darshan University",
    date: "2025",
    image: "/img/codearena_du_2025.jpg",
    pdfUrl: "/img/codearena_du_2025.jpg",
    description: "Competitive hackathon challenge focusing on high-speed web application development and REST API integration.",
    credentialUrl: "/img/codearena_du_2025.jpg",
    featured: false
  },
  {
    title: "Hackout 2025 Hackathon Certificate",
    category: "Hackathons",
    issuer: "Hackout 2025",
    date: "2025",
    image: "/img/hackout_2025.jpg",
    pdfUrl: "/img/hackout_2025.jpg",
    description: "Developed full-stack prototype during 36-hour hackathon, featuring real-time data synchronization and responsive UI.",
    credentialUrl: "/img/hackout_2025.jpg",
    featured: false
  },
  {
    title: "Hack2skill Hackathon Certificate",
    category: "Hackathons",
    issuer: "Hack2skill",
    date: "2025",
    image: "/img/hack2skill_2025.png",
    pdfUrl: "/img/hack2skill_2025.png",
    description: "Recognized for innovative software solution and clean architecture during Hack2skill technology hackathon.",
    credentialUrl: "/img/hack2skill_2025.png",
    featured: false
  },
  {
    title: "Nexothon 2025 Hackathon",
    category: "Hackathons",
    issuer: "Unstop / Nexothon",
    date: "2025",
    image: "/img/nexothon_2025.png",
    pdfUrl: "/pdf/nexothon_2025.pdf",
    description: "Participated in Nexothon 2025 hackathon focusing on cloud microservices and web performance optimization.",
    credentialUrl: "/pdf/nexothon_2025.pdf",
    featured: false
  },
  {
    title: "Adobe Hackathon Participation Certificate",
    category: "Hackathons",
    issuer: "Adobe & Unstop",
    date: "2025",
    image: "/img/adobe_hackathon_2025.png",
    pdfUrl: "/pdf/adobe_hackathon_2025.pdf",
    description: "Engaged in Adobe tech challenge focused on web UI design, accessibility, and client-side performance.",
    credentialUrl: "/pdf/adobe_hackathon_2025.pdf",
    featured: false
  },
  {
    title: "Edunet Foundation Internship Completion Certificate",
    category: "Certificates",
    issuer: "Edunet Foundation / Tech Saksham",
    date: "2025",
    image: "/img/edunet_internship_completion.png",
    pdfUrl: "/pdf/edunet_internship_completion.pdf",
    description: "Successfully completed full-stack software development internship working on modern web architectures and REST API integrations.",
    credentialUrl: "/pdf/edunet_internship_completion.pdf",
    featured: false
  },
  {
    title: "NPTEL Introduction to Machine Learning",
    category: "Certificates",
    issuer: "NPTEL / IIT",
    date: "2025",
    image: "/img/nptel_machine_learning.png",
    pdfUrl: "/pdf/nptel_machine_learning.pdf",
    description: "Certified in supervised learning, regression models, classification techniques, neural networks, and model evaluation metrics.",
    credentialUrl: "/pdf/nptel_machine_learning.pdf",
    featured: false
  },
  {
    title: "NPTEL Blockchain and its Applications",
    category: "Certificates",
    issuer: "NPTEL / IIT",
    date: "2025",
    image: "/img/nptel_blockchain_applications.png",
    pdfUrl: "/pdf/nptel_blockchain_applications.pdf",
    description: "Certified in distributed ledger technology, smart contract architecture, consensus algorithms, and decentralized applications.",
    credentialUrl: "/pdf/nptel_blockchain_applications.pdf",
    featured: false
  },
  {
    title: "NPTEL Business Intelligence & Analytics",
    category: "Certificates",
    issuer: "NPTEL / IIT",
    date: "2025",
    image: "/img/nptel_business_intelligence.png",
    pdfUrl: "/pdf/nptel_business_intelligence.pdf",
    description: "Certified in business intelligence dashboards, SQL query optimization, data warehousing, and predictive analytics.",
    credentialUrl: "/pdf/nptel_business_intelligence.pdf",
    featured: false
  },
  {
    title: "HackerRank Problem Solving (Intermediate)",
    category: "Certificates",
    issuer: "HackerRank",
    date: "2025",
    image: "/img/hackerrank_problem_solving_intermediate.png",
    pdfUrl: "/pdf/hackerrank_problem_solving_intermediate.pdf",
    description: "Verified skill credential demonstrating proficiency in complex algorithms, graph theory, dynamic programming, and data structures.",
    credentialUrl: "/pdf/hackerrank_problem_solving_intermediate.pdf",
    featured: false
  },
  {
    title: "HackerRank Software Engineer Intern Certificate",
    category: "Certificates",
    issuer: "HackerRank",
    date: "2025",
    image: "/img/hackerrank_software_engineer_intern.png",
    pdfUrl: "/pdf/hackerrank_software_engineer_intern.pdf",
    description: "Verified role credential evaluating core software engineering concepts, database queries, web fundamentals, and problem solving.",
    credentialUrl: "/pdf/hackerrank_software_engineer_intern.pdf",
    featured: false
  },
  {
    title: "World of Code & Tech (WoCS) 2025 Admin Certificate",
    category: "Awards",
    issuer: "World of Code & Tech (WoCS 2025)",
    date: "2025",
    image: "/img/wocs_2025_admin.png",
    pdfUrl: "/img/wocs_2025_admin.png",
    description: "Appointed project admin for WoCS 2025 open-source social sprint leading contributors in building web tools.",
    credentialUrl: "/img/wocs_2025_admin.png",
    featured: false
  },
  {
    title: "Darshan University Academic Achievement",
    category: "Achievements",
    issuer: "Darshan University",
    date: "2026",
    image: "/img/wocs_2025_admin.png",
    pdfUrl: "/pdf/Vishal_Baraiya_Resume.pdf",
    description: "Consistently maintained CGPA 9.24/10 in B.Tech Computer Science & Engineering.",
    credentialUrl: "/pdf/Vishal_Baraiya_Resume.pdf",
    featured: false
  },

  // 8 Official YouTube Videos from @Vi.685_junior
  {
    title: "Weather Notify — Smart Weather Alerts on WhatsApp",
    category: "Videos",
    issuer: "Vishal Baraiya",
    date: "YouTube",
    image: "https://i.ytimg.com/vi/Xnce8z3UhZE/hqdefault.jpg",
    credentialUrl: "https://www.youtube.com/watch?v=Xnce8z3UhZE",
    pdfUrl: "https://www.youtube.com/watch?v=Xnce8z3UhZE",
    embedUrl: "https://www.youtube.com/embed/Xnce8z3UhZE",
    description: "Official YouTube Video Demo & Presentation: Weather Notify — Smart Weather Alerts on WhatsApp.",
    featured: false
  },
  {
    title: "TransitOps | Smart Transport Operations Platform | Odoo Hackathon 2026 Demo",
    category: "Videos",
    issuer: "Vishal Baraiya",
    date: "YouTube",
    image: "https://i.ytimg.com/vi/9z0T1Rk3poU/hqdefault.jpg",
    credentialUrl: "https://www.youtube.com/watch?v=9z0T1Rk3poU",
    pdfUrl: "https://www.youtube.com/watch?v=9z0T1Rk3poU",
    embedUrl: "https://www.youtube.com/embed/9z0T1Rk3poU",
    description: "Official YouTube Video Demo & Presentation: TransitOps Transport Operations Platform for Odoo Hackathon 2026.",
    featured: false
  },
  {
    title: "Dayflow HRMS | Human Resource Management System | Odoo x GCET Hackathon 2026",
    category: "Videos",
    issuer: "Vishal Baraiya",
    date: "YouTube",
    image: "https://i.ytimg.com/vi/xfhkZ7LwcBo/hqdefault.jpg",
    credentialUrl: "https://www.youtube.com/watch?v=xfhkZ7LwcBo",
    pdfUrl: "https://www.youtube.com/watch?v=xfhkZ7LwcBo",
    embedUrl: "https://www.youtube.com/embed/xfhkZ7LwcBo",
    description: "Official YouTube Video Demo & Presentation: Dayflow HRMS Human Resource Management System.",
    featured: false
  },
  {
    title: "AI PDF to MCQ Generator | RAG + LLM Project Demo | FastAPI, React & OCR",
    category: "Videos",
    issuer: "Vishal Baraiya",
    date: "YouTube",
    image: "https://i.ytimg.com/vi/Tf-Ylb-x7fc/hqdefault.jpg",
    credentialUrl: "https://www.youtube.com/watch?v=Tf-Ylb-x7fc",
    pdfUrl: "https://www.youtube.com/watch?v=Tf-Ylb-x7fc",
    embedUrl: "https://www.youtube.com/embed/Tf-Ylb-x7fc",
    description: "Official YouTube Video Demo & Presentation: AI PDF to MCQ Generator with RAG Architecture & Groq Llama 3.3.",
    featured: false
  },
  {
    title: "AgroSmart | Smart Farming Dashboard | AI-Powered Agriculture Platform",
    category: "Videos",
    issuer: "Vishal Baraiya",
    date: "YouTube",
    image: "https://i.ytimg.com/vi/SsxHiqtNX-4/hqdefault.jpg",
    credentialUrl: "https://www.youtube.com/watch?v=SsxHiqtNX-4",
    pdfUrl: "https://www.youtube.com/watch?v=SsxHiqtNX-4",
    embedUrl: "https://www.youtube.com/embed/SsxHiqtNX-4",
    description: "Official YouTube Video Demo & Presentation: AgroSmart Smart Farming Dashboard & AI Agriculture Platform.",
    featured: false
  },
  {
    title: "Hackout 2025 – Neel Chakra | DAIICT Hackathon Project Showcase",
    category: "Videos",
    issuer: "Vishal Baraiya",
    date: "YouTube",
    image: "https://i.ytimg.com/vi/9MCic3nHHdk/hqdefault.jpg",
    credentialUrl: "https://www.youtube.com/watch?v=9MCic3nHHdk",
    pdfUrl: "https://www.youtube.com/watch?v=9MCic3nHHdk",
    embedUrl: "https://www.youtube.com/embed/9MCic3nHHdk",
    description: "Official YouTube Video Demo & Presentation: Hackout 2025 Neel Chakra DAIICT Hackathon Project Showcase.",
    featured: false
  },
  {
    title: "My Complete JEE Modules Revealed! | Physics, Chemistry & Maths",
    category: "Videos",
    issuer: "Vishal Baraiya",
    date: "YouTube",
    image: "https://i.ytimg.com/vi/4xjSvI7C6h8/hqdefault.jpg",
    credentialUrl: "https://www.youtube.com/watch?v=4xjSvI7C6h8",
    pdfUrl: "https://www.youtube.com/watch?v=4xjSvI7C6h8",
    embedUrl: "https://www.youtube.com/embed/4xjSvI7C6h8",
    description: "Official YouTube Video: Complete JEE Preparation Modules overview for Physics, Chemistry & Mathematics.",
    featured: false
  },
  {
    title: "PW Yakeen Batch Study Material Review | Complete Modules Overview",
    category: "Videos",
    issuer: "Vishal Baraiya",
    date: "YouTube",
    image: "https://i.ytimg.com/vi/r5yfZpgxb3w/hqdefault.jpg",
    credentialUrl: "https://www.youtube.com/watch?v=r5yfZpgxb3w",
    pdfUrl: "https://www.youtube.com/watch?v=r5yfZpgxb3w",
    embedUrl: "https://www.youtube.com/embed/r5yfZpgxb3w",
    description: "Official YouTube Video: PW Yakeen Batch Study Material Review & Educational Overview.",
    featured: false
  }
];

// Helper to seed or update database
const seedGalleryIfEmpty = async () => {
  if (mongoose.connection.readyState === 1) {
    try {
      for (const item of publicFolderGalleryData) {
        await Gallery.findOneAndUpdate(
          { title: item.title },
          { $set: item },
          { upsert: true, new: true }
        );
      }
    } catch (err) {
      console.error('[MongoDB Gallery Seed Error]:', err.message);
    }
  }
};

// GET all gallery items
router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      await seedGalleryIfEmpty();
      const items = await Gallery.find().sort({ createdAt: -1 });
      if (items.length > 0) return res.json(items);
    }
    return res.json(publicFolderGalleryData.map((item, index) => ({ _id: `gal-${index + 1}`, ...item })));
  } catch (error) {
    res.json(publicFolderGalleryData.map((item, index) => ({ _id: `gal-${index + 1}`, ...item })));
  }
});

// POST new gallery item (Protected)
router.post('/', protectAdmin, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const item = new Gallery(req.body);
      const saved = await item.save();
      return res.status(201).json(saved);
    }
    const newMock = { _id: `gal-${Date.now()}`, ...req.body };
    publicFolderGalleryData.unshift(newMock);
    return res.status(201).json(newMock);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT update gallery item (Protected)
router.put('/:id', protectAdmin, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const updated = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true });
      return res.json(updated);
    }
    const idx = publicFolderGalleryData.findIndex((g, i) => g._id === req.params.id || `gal-${i + 1}` === req.params.id);
    if (idx !== -1) publicFolderGalleryData[idx] = { ...publicFolderGalleryData[idx], ...req.body };
    return res.json(publicFolderGalleryData[idx] || req.body);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE gallery item (Protected)
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      await Gallery.findByIdAndDelete(req.params.id);
      return res.json({ message: 'Gallery item deleted successfully' });
    }
    const idx = publicFolderGalleryData.findIndex((g, i) => g._id === req.params.id || `gal-${i + 1}` === req.params.id);
    if (idx !== -1) publicFolderGalleryData.splice(idx, 1);
    return res.json({ message: 'Gallery item removed' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
