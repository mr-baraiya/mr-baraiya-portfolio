import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB, getDBStatus } from './config/db.js';
import projectRoutes from './routes/projectRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import experienceRoutes from './routes/experienceRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import authRoutes, { initAdminUser } from './routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin or any localhost / 127.0.0.1 origin in dev
    if (!origin || /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin) || origin === clientUrl) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/contact', contactRoutes);

// Database status route
app.get('/api/status', (req, res) => {
  const status = getDBStatus();
  res.json({
    status: 'Online',
    timestamp: new Date(),
    database: status,
    corsConfigured: clientUrl
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Mr. Baraiya Portfolio API Backend',
    endpoints: [
      '/api/status',
      '/api/auth/login',
      '/api/projects',
      '/api/skills',
      '/api/experience',
      '/api/contact'
    ]
  });
});

// Connect DB & Init Admin User
connectDB().then(() => initAdminUser());

if (!process.env.VERCEL) {
  const server = app.listen(PORT, () => {
    console.log(`[Express Server] Server running on http://localhost:${PORT}`);
    console.log(`[CORS] Enabled origin from .env:`, clientUrl);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`\n[EADDRINUSE Error] Port ${PORT} is already in use!`);
      console.error(`[Action] Stopped existing process on port ${PORT}. Nodemon will auto-restart.\n`);
    } else {
      console.error('[Server Error]', err);
    }
  });
}

export default app;
