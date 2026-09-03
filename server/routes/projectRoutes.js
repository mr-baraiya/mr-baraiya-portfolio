import express from 'express';
import Project from '../models/Project.js';
import mongoose from 'mongoose';

const router = express.Router();

export const realProjectsData = [
  {
    _id: 'proj-1',
    title: 'Quiz Web App with ASP.NET Core',
    description: 'A secure and responsive web-based quiz application for creating, managing, attempting, and evaluating quizzes, with database-backed question management and question levels.',
    longDescription: 'A secure and responsive web-based quiz application for creating, managing, attempting, and evaluating quizzes, with database-backed question management and question levels.',
    category: 'Full-Stack',
    image: 'https://catgbuvicqq4rhla.public.blob.vercel-storage.com/images_projects_quiz-app.png',
    techStack: ['ASP.NET Core', 'C#', 'SQL', 'HTML', 'CSS', 'Bootstrap', 'JavaScript'],
    githubUrl: 'https://github.com/mr-baraiya/QuizProject_ASP.NETCore',
    liveUrl: '',
    featured: false
  },
  {
    _id: 'proj-2',
    title: 'Steganography Encoder/Decoder',
    description: 'A Python desktop application that hides secret messages inside images using LSB steganography and retrieves them with passcode protection.',
    longDescription: 'A Python desktop application that hides secret messages inside images using LSB steganography and retrieves them with passcode protection.',
    category: 'AI & ML',
    image: 'https://catgbuvicqq4rhla.public.blob.vercel-storage.com/images_projects_steganography.png',
    techStack: ['Python', 'Tkinter', 'OpenCV', 'NumPy', 'LSB Steganography'],
    githubUrl: 'https://github.com/mr-baraiya/Steganography-Project',
    liveUrl: '',
    featured: false
  },
  {
    _id: 'proj-3',
    title: 'Candlestick Pattern Recognition Tool',
    description: 'A web-based tool that automatically detects and visualizes candlestick patterns in financial time-series data, with interactive charts and multi-stock scanning.',
    longDescription: 'A web-based tool that automatically detects and visualizes candlestick patterns in financial time-series data, with interactive charts and multi-stock scanning.',
    category: 'AI & ML',
    image: 'https://catgbuvicqq4rhla.public.blob.vercel-storage.com/images_projects_candlestick.png',
    techStack: ['Python', 'Flask', 'Pandas', 'Plotly', 'HTML', 'CSS', 'Bootstrap', 'Jinja2'],
    githubUrl: 'https://github.com/mr-baraiya/Candle-stick-pattern-recognition-tool',
    liveUrl: 'https://candle-stick-pattern-recognition-tool-yxwg.onrender.com/',
    featured: false
  },
  {
    _id: 'proj-4',
    title: 'Smart Waste Management System (SWMS)',
    description: 'An IoT-based platform for real-time bin monitoring, optimized waste-collection routes, recycling-center discovery, waste classification, analytics, and citizen recycling services.',
    longDescription: 'An IoT-based platform for real-time bin monitoring, optimized waste-collection routes, recycling-center discovery, waste classification, analytics, and citizen recycling services.',
    category: 'Full-Stack',
    image: 'https://catgbuvicqq4rhla.public.blob.vercel-storage.com/images_projects_swms.png',
    techStack: ['React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'Python', 'FastAPI', 'MongoDB', 'MQTT', 'REST API', 'Chart.js', 'Google Maps API', 'AI', 'CNN'],
    githubUrl: 'https://github.com/mr-baraiya/Smart-Waste-Management-System',
    liveUrl: 'https://smart-waste-management-system-ruby.vercel.app/',
    featured: false
  },
  {
    _id: 'proj-5',
    title: 'Dayflow HRMS',
    description: 'A full-stack Human Resource Management System developed for the Odoo x GCET Hackathon 2026 Virtual Round, providing employee management, attendance, leave, payroll, dashboards, reports, authentication, and role-based access.',
    longDescription: 'A full-stack Human Resource Management System developed for the Odoo x GCET Hackathon 2026 Virtual Round, providing employee management, attendance, leave, payroll, dashboards, reports, authentication, and role-based access.',
    category: 'Full-Stack',
    image: 'https://catgbuvicqq4rhla.public.blob.vercel-storage.com/images_projects_dayflow-hrms.png',
    techStack: ['React.js', 'Node.js', 'Express.js', 'MySQL', 'JWT', 'REST API', 'Tailwind CSS'],
    githubUrl: 'https://github.com/mr-baraiya/Dayflow-Human-Resource-System',
    liveUrl: 'https://dayflow-hrms.netlify.app/',
    featured: true
  },
  {
    _id: 'proj-6',
    title: 'VMusic – Music Streaming Platform',
    description: 'A modern music streaming web application for discovering and streaming music, with search, playlists, favorites, authentication, persistent playback, and recommendations.',
    longDescription: 'A modern music streaming web application for discovering and streaming music, with search, playlists, favorites, authentication, persistent playback, and recommendations.',
    category: 'Frontend',
    image: 'https://catgbuvicqq4rhla.public.blob.vercel-storage.com/images_projects_vmusic.png',
    techStack: ['React', 'Vite', 'Tailwind CSS', 'Firebase', 'Spotify API', 'Jamendo API', 'YouTube API', 'Framer Motion', 'Vercel'],
    githubUrl: 'https://github.com/mr-baraiya/VMusic',
    liveUrl: 'https://v-music-gamma.vercel.app/',
    featured: false
  },
  {
    _id: 'proj-7',
    title: 'ShopEasy – E-commerce Platform',
    description: 'A modern e-commerce web application with product browsing, authentication, protected routes, shopping cart, payment integration, order tracking, and custom clothing design requests.',
    longDescription: 'A modern e-commerce web application with product browsing, authentication, protected routes, shopping cart, payment integration, order tracking, and custom clothing design requests.',
    category: 'Frontend',
    image: 'https://catgbuvicqq4rhla.public.blob.vercel-storage.com/images_projects_shopeasy.png',
    techStack: ['React', 'Vite', 'Tailwind CSS', 'React Router', 'Razorpay', 'EmailJS', 'Framer Motion', 'Three.js', 'GSAP', 'Axios'],
    githubUrl: 'https://github.com/mr-baraiya/shoapeasy-store',
    liveUrl: 'https://shopeasy-store.netlify.app/',
    featured: false
  },
  {
    _id: 'proj-8',
    title: 'Ticket Management System',
    description: 'A backend system for a company helpdesk where employees can raise support tickets, support staff can manage and resolve them, and managers can track ticket activity and performance.',
    longDescription: 'A backend system for a company helpdesk where employees can raise support tickets, support staff can manage and resolve them, and managers can track ticket activity and performance.',
    category: 'Backend',
    image: 'https://catgbuvicqq4rhla.public.blob.vercel-storage.com/images_projects_ticket-system.png',
    techStack: ['Node.js', 'Express.js', 'REST API', 'Database'],
    githubUrl: 'https://github.com/mr-baraiya/TicketManagementSystem',
    liveUrl: '',
    featured: false
  },
  {
    _id: 'proj-9',
    title: 'Pong Game',
    description: 'A classic Pong game built for the browser with smooth animations, responsive controls, real-time scoring, and interactive gameplay.',
    longDescription: 'A classic Pong game built for the browser with smooth animations, responsive controls, real-time scoring, and interactive gameplay.',
    category: 'Frontend',
    image: 'https://catgbuvicqq4rhla.public.blob.vercel-storage.com/images_projects_pong-game.png',
    techStack: ['React', 'JavaScript'],
    githubUrl: 'https://github.com/mr-baraiya/pong-game',
    liveUrl: 'https://pong-game-8ad96.web.app/',
    featured: false
  },
  {
    _id: 'proj-10',
    title: 'ImpactMeter',
    description: 'A cricket analytics application that evaluates player performance and pressure situations to calculate a single Impact Score, helping quantify a player\'s contribution beyond traditional statistics.',
    longDescription: 'A cricket analytics application that evaluates player performance and pressure situations to calculate a single Impact Score, helping quantify a player\'s contribution beyond traditional statistics.',
    category: 'Frontend',
    image: 'https://catgbuvicqq4rhla.public.blob.vercel-storage.com/images_projects_impactmeter.png',
    techStack: ['React', 'JavaScript', 'Analytics'],
    githubUrl: 'https://github.com/mr-baraiya/ImpactMeter',
    liveUrl: 'https://mr-baraiya.github.io/ImpactMeter/',
    featured: false
  },
  {
    _id: 'proj-11',
    title: 'Clinic Queue Management System',
    description: 'A web application for managing clinic queues and patient flow, with a frontend that connects to a configurable backend API for handling clinic operations.',
    longDescription: 'A web application for managing clinic queues and patient flow, with a frontend that connects to a configurable backend API for handling clinic operations.',
    category: 'Full-Stack',
    image: 'https://catgbuvicqq4rhla.public.blob.vercel-storage.com/images_projects_clinic-queue.png',
    techStack: ['React', 'Vite', 'JavaScript', 'ESLint', 'REST API'],
    githubUrl: 'https://github.com/mr-baraiya/Clinic-Queue-Mgmt',
    liveUrl: '',
    featured: false
  },
  {
    _id: 'proj-12',
    title: 'MOMS – Minutes of Meeting System',
    description: 'A web-based system designed to automate meeting scheduling, attendance tracking, minutes recording, and report generation through a centralized platform.',
    longDescription: 'A web-based system designed to automate meeting scheduling, attendance tracking, minutes recording, and report generation through a centralized platform.',
    category: 'Full-Stack',
    image: 'https://catgbuvicqq4rhla.public.blob.vercel-storage.com/images_projects_moms.png',
    techStack: ['React', 'Node.js', 'Express', 'REST API'],
    githubUrl: 'https://github.com/mr-baraiya/MOMS-Minutes-_of_Meeting_System',
    liveUrl: 'https://moms-minutes-of-meeting-system.vercel.app/',
    featured: false
  },
  {
    _id: 'proj-13',
    title: 'AgroSmart – Smart Agriculture Management System',
    description: 'A full-stack smart agriculture platform that uses IoT, AI, real-time data, analytics, and automation to help farmers and agri-businesses manage farms, fields, crops, sensors, weather intelligence, tasks, and notifications.',
    longDescription: 'A full-stack smart agriculture platform that uses IoT, AI, real-time data, analytics, and automation to help farmers and agri-businesses manage farms, fields, crops, sensors, weather intelligence, tasks, and notifications.',
    category: 'Full-Stack',
    image: 'https://catgbuvicqq4rhla.public.blob.vercel-storage.com/images_projects_agrosmart.png',
    techStack: ['ASP.NET Core 8', 'Entity Framework Core', 'SQL Server', 'JWT Authentication', 'REST APIs', 'React 19', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Recharts', 'React Router', 'n8n', 'Brevo', 'EmailJS', 'OpenWeatherMap API', 'AGMARKNET API'],
    githubUrl: 'https://github.com/mr-baraiya/AgroSmart',
    liveUrl: 'https://ecoagrosmart.netlify.app/',
    featured: true
  },
  {
    _id: 'proj-14',
    title: 'Machine Learning & Deep Learning Hub',
    description: 'A comprehensive collection of Machine Learning and Deep Learning lab work, assignments, experiments, and mini-projects covering model development, preprocessing, classification, regression, evaluation, visualization, and model interpretability.',
    longDescription: 'A comprehensive collection of Machine Learning and Deep Learning lab work, assignments, experiments, and mini-projects covering model development, preprocessing, classification, regression, evaluation, visualization, and model interpretability.',
    category: 'AI & ML',
    image: 'https://catgbuvicqq4rhla.public.blob.vercel-storage.com/images_projects_ml-hub.png',
    techStack: ['Python', 'Scikit-Learn', 'NumPy', 'Pandas', 'TensorFlow', 'Keras', 'PyTorch', 'Matplotlib', 'Seaborn', 'Grad-CAM', 'Jupyter', 'Google Colab', 'OpenCV'],
    githubUrl: 'https://github.com/mr-baraiya/Machine-Learning-Deep-Learning-hub',
    liveUrl: '',
    featured: false
  },
  {
    _id: 'proj-15',
    title: 'Resume Builder',
    description: 'A responsive web application designed to simplify and automate resume creation by providing real-time resume generation and allowing users to download their completed resumes.',
    longDescription: 'A responsive web application designed to simplify and automate resume creation by providing real-time resume generation and allowing users to download their completed resumes.',
    category: 'Frontend',
    image: 'https://catgbuvicqq4rhla.public.blob.vercel-storage.com/images_projects_resume-builder.png',
    techStack: ['React', 'JavaScript', 'HTML5', 'CSS3'],
    githubUrl: 'https://github.com/mr-baraiya/resume-builder',
    liveUrl: 'https://resume-builder-gamma.netlify.app/',
    featured: false
  },
  {
    _id: 'proj-16',
    title: 'PDF-to-MCQ Generator',
    description: 'An AI-powered web application that automatically generates Multiple Choice Questions (MCQs) from PDF, PPTX, and TXT documents using a Retrieval-Augmented Generation (RAG) pipeline with Groq Llama 3.3 70B and FAISS.',
    longDescription: 'An AI-powered web application that automatically generates Multiple Choice Questions (MCQs) from PDF, PPTX, and TXT documents using a Retrieval-Augmented Generation (RAG) pipeline built with LangChain, FAISS vector store, pytesseract OCR, and Groq Llama 3.3 70B model.',
    category: 'AI & ML',
    image: 'https://catgbuvicqq4rhla.public.blob.vercel-storage.com/images_projects_pdf-to-mcq.png',
    techStack: ['Python', 'FastAPI', 'LangChain', 'Groq Llama 3.3 70B', 'RAG', 'FAISS', 'OCR', 'React', 'Tailwind CSS'],
    githubUrl: 'https://github.com/mr-baraiya/pdf-to-mcq-generator',
    liveUrl: 'https://pdf2mcq-henna.vercel.app/',
    featured: true
  },
  {
    _id: 'proj-17',
    title: 'TransitOps – Smart Transport Operations Platform',
    description: 'An end-to-end transport operations platform developed for the Odoo Hackathon 2026 that digitizes vehicle, driver, dispatch, maintenance, fuel, expense, and report management while enforcing business rules and providing operational insights.',
    longDescription: 'An end-to-end transport operations platform developed for the Odoo Hackathon 2026 that digitizes vehicle, driver, dispatch, maintenance, fuel, expense, and report management while enforcing business rules and providing operational insights.',
    category: 'Full-Stack',
    image: 'https://catgbuvicqq4rhla.public.blob.vercel-storage.com/images_projects_transitops.png',
    techStack: ['React', 'Node.js', 'Express', 'REST API', 'Database'],
    githubUrl: 'https://github.com/mr-baraiya/transitops-odoo-hackathon-2026',
    liveUrl: 'https://transitops-api-gs1i.onrender.com/',
    featured: false
  },
  {
    _id: 'proj-18',
    title: 'CineVault – Movie App',
    description: 'A movie-focused web application built entirely with HTML and CSS3, featuring a dark cinematic design system, AI-generated movie posters, dedicated movie detail pages, and a direct download center supporting 4K, 1080p, and 720p content.',
    longDescription: 'A movie-focused web application built entirely with HTML and CSS3, featuring a dark cinematic design system, AI-generated movie posters, dedicated movie detail pages, and a direct download center supporting 4K, 1080p, and 720p content.',
    category: 'Frontend',
    image: 'https://catgbuvicqq4rhla.public.blob.vercel-storage.com/images_projects_cinevault.png',
    techStack: ['HTML5', 'CSS3'],
    githubUrl: 'https://github.com/mr-baraiya/cinevault-movie-app',
    liveUrl: 'https://mr-baraiya.github.io/cinevault-movie-app/',
    featured: false
  },
  {
    _id: 'proj-19',
    title: 'Weather Notify – Real-Time Weather Updates & WhatsApp Alerts',
    description: 'A Next.js 16 web application displaying live weather data with an interactive 7-layer Windy.com map & live Doppler radar overlays, WhatsApp subscriber management, and automated daily weather alerts via Twilio API & Vercel Cron.',
    longDescription: 'A Next.js 16 web application that displays live weather data, features an interactive 7-layer Windy.com weather map with live Doppler radar, clouds, wind and wave forecasts, WhatsApp subscriber management, automated daily weather alerts via Twilio & Vercel Cron at 6 AM IST, and an admin dashboard.',
    category: 'Full-Stack',
    image: 'https://catgbuvicqq4rhla.public.blob.vercel-storage.com/images_projects_weather.png',
    techStack: ['Next.js 16', 'React 19', 'Tailwind CSS 4', 'Twilio WhatsApp API', 'Windy.com API', 'OpenWeatherMap', 'MongoDB', 'Vercel Cron'],
    githubUrl: 'https://github.com/mr-baraiya/weather-notify',
    liveUrl: 'https://weather-notify-tau.vercel.app/',
    featured: true
  },
  {
    _id: 'proj-20',
    title: 'Live Cricket Score API',
    description: 'A FastAPI backend that scrapes live cricket scores, detailed scorecards, and ball-by-ball commentary and exposes the data as structured JSON through a REST API.',
    longDescription: 'A FastAPI backend that scrapes live cricket scores, detailed scorecards, and ball-by-ball commentary and exposes the data as structured JSON through a REST API.',
    category: 'Backend',
    image: 'https://catgbuvicqq4rhla.public.blob.vercel-storage.com/images_projects_cricket-score-api.png',
    techStack: ['Python', 'FastAPI', 'Web Scraping', 'REST API', 'JSON'],
    githubUrl: 'https://github.com/mr-baraiya/live-cricket-score-api',
    liveUrl: 'https://cricket-live-data-api.vercel.app/docs',
    featured: false
  },
  {
    _id: 'proj-21',
    title: 'Cricket Broadcast Frontend',
    description: 'A real-time cricket broadcast frontend with OBS-ready graphics, live match dashboards, and remote production controls for managing and presenting live cricket broadcasts.',
    longDescription: 'A real-time cricket broadcast frontend with OBS-ready graphics, live match dashboards, and remote production controls for managing and presenting live cricket broadcasts.',
    category: 'Frontend',
    image: 'https://catgbuvicqq4rhla.public.blob.vercel-storage.com/images_projects_broadcast.png',
    techStack: ['React', 'JavaScript', 'OBS Graphics', 'REST API'],
    githubUrl: 'https://github.com/mr-baraiya/broadcast-frontend',
    liveUrl: 'https://broadcast-frontend-livid.vercel.app/',
    featured: false
  },
  {
    _id: 'proj-22',
    title: 'CardioSense – Cardiovascular Disease Prediction System',
    description: 'A complete end-to-end Machine Learning project with a full-stack web application for predicting cardiovascular disease risk based on clinical parameters.',
    longDescription: 'A complete end-to-end Machine Learning project with a full-stack web application for predicting cardiovascular disease risk based on clinical parameters.',
    category: 'AI & ML',
    image: 'https://catgbuvicqq4rhla.public.blob.vercel-storage.com/images_projects_cardiosense.png',
    techStack: ['Python', 'FastAPI', 'React', 'Tailwind CSS', 'Scikit-Learn', 'Machine Learning', 'Render', 'Netlify'],
    githubUrl: 'https://github.com/mr-baraiya/Machine-Learning-Deep-Learning-hub/tree/main/Cardio_Project',
    liveUrl: 'https://cardiosense.netlify.app',
    featured: false
  }
];

import { protectAdmin } from '../middleware/authMiddleware.js';

const seedProjects = async () => {
  if (mongoose.connection.readyState === 1) {
    try {
      // Remove old combined legacy records if existing in MongoDB
      await Project.deleteMany({ title: { $regex: /Weather Notify & PDF/i } });

      const count = await Project.countDocuments();
      if (count === 0) {
        await Project.insertMany(realProjectsData.map(p => {
          const { _id, ...rest } = p;
          return rest;
        }));
        console.log('[MongoDB Projects] Seeded initial projects!');
      }
    } catch (err) {
      console.error('[MongoDB Projects Seed Error]:', err.message);
    }
  }
};

// GET all projects
router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      await seedProjects();
      const projects = await Project.find().sort({ createdAt: -1 });
      if (projects.length > 0) return res.json(projects);
    }
    return res.json(realProjectsData);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.json(realProjectsData);
  }
});

// POST new project (Admin feature)
router.post('/', protectAdmin, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const newProject = new Project(req.body);
      const savedProject = await newProject.save();
      return res.status(201).json(savedProject);
    }
    const newMock = { _id: `proj-${Date.now()}`, ...req.body };
    realProjectsData.unshift(newMock);
    return res.status(201).json(newMock);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT update project (Admin feature)
router.put('/:id', protectAdmin, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
      return res.json(updated);
    }
    const idx = realProjectsData.findIndex(p => p._id === req.params.id);
    if (idx !== -1) realProjectsData[idx] = { ...realProjectsData[idx], ...req.body };
    return res.json(realProjectsData[idx] || req.body);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE project (Admin feature)
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      await Project.findByIdAndDelete(req.params.id);
      return res.json({ message: 'Project deleted successfully' });
    }
    const idx = realProjectsData.findIndex(p => p._id === req.params.id);
    if (idx !== -1) realProjectsData.splice(idx, 1);
    return res.json({ message: 'Project removed' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
