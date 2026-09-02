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

// Serverless DB Connection Middleware
app.use(async (req, res, next) => {
  try {
    await connectDB();
  } catch (err) {
    console.warn('[MongoDB Serverless Connection Warning]', err.message);
  }
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/contact', contactRoutes);

// Database status & system health route
app.get('/api/status', (req, res) => {
  const dbStatus = getDBStatus();
  const memoryUsage = process.memoryUsage();
  res.json({
    service: 'Mr. Baraiya Portfolio API',
    status: dbStatus.state === 'Connected' ? 'Online' : 'Degraded',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    database: {
      provider: 'MongoDB Atlas',
      name: dbStatus.name,
      status: dbStatus.state
    },
    system: {
      nodeVersion: process.version,
      platform: process.platform,
      memoryMB: Math.round(memoryUsage.heapUsed / 1024 / 1024)
    },
    corsConfigured: clientUrl
  });
});

// API Info & Endpoints Catalog Route
app.get('/api', (req, res) => {
  const dbStatus = getDBStatus();
  const memoryUsage = process.memoryUsage();

  const apiInfo = {
    service: 'Mr. Baraiya Portfolio REST API Engine',
    version: '1.0.0',
    developer: 'Vishal Baraiya',
    environment: process.env.NODE_ENV || 'development',
    uptimeSeconds: Math.floor(process.uptime()),
    database: {
      provider: 'MongoDB Atlas',
      status: dbStatus.state
    },
    system: {
      nodeVersion: process.version,
      platform: process.platform,
      memoryHeapMB: Math.round(memoryUsage.heapUsed / 1024 / 1024)
    },
    endpoints: [
      { method: 'GET', path: '/api/status', category: 'System', description: 'System health, uptime, memory, and database status' },
      { method: 'GET', path: '/api/profile', category: 'Portfolio', description: 'Developer bio, CGPA, credentials, and social links' },
      { method: 'GET', path: '/api/projects', category: 'Portfolio', description: 'Full-stack projects with live demo and GitHub repository links' },
      { method: 'GET', path: '/api/skills', category: 'Portfolio', description: '47+ seeded skills categorized by engineering domain' },
      { method: 'GET', path: '/api/experience', category: 'Portfolio', description: 'Teaching assistant roles, hackathons, and work history' },
      { method: 'GET', path: '/api/gallery', category: 'Portfolio', description: 'Certificates, Webpack open-source achievements, and scorecards' },
      { method: 'POST', path: '/api/contact', category: 'Communication', description: 'Submit contact message with automated Gmail SMTP alerts' },
      { method: 'POST', path: '/api/auth/login', category: 'Authentication', description: 'Admin JWT authentication endpoint' }
    ]
  };

  // If requested by a web browser, return dark HTML documentation page
  if (req.accepts('html')) {
    return res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Mr. Baraiya Portfolio — API Backend Dashboard</title>
        <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;600;700&family=Inter:wght@400;600;800&display=swap" rel="stylesheet">
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { background: #050508; color: #F8FAFC; font-family: 'Inter', sans-serif; padding: 30px 20px; line-height: 1.6; }
          .container { max-width: 900px; margin: 0 auto; }
          .header { border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 20px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: flex-end; }
          .title { font-size: 24px; font-weight: 800; color: #F8FAFC; }
          .subtitle { font-family: 'Fira Code', monospace; color: #15D8B3; font-size: 13px; font-weight: 600; }
          .badge { display: inline-block; padding: 4px 12px; background: rgba(21,216,179,0.1); color: #15D8B3; border: 1px solid rgba(21,216,179,0.3); border-radius: 20px; font-family: 'Fira Code', monospace; font-size: 12px; font-weight: 700; }
          .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 30px; }
          .stat-card { border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 12px; }
          .stat-val { font-size: 22px; font-weight: 800; color: #15D8B3; font-family: 'Fira Code', monospace; }
          .stat-lbl { font-size: 11px; text-transform: uppercase; color: rgba(248,250,252,0.6); font-family: 'Fira Code', monospace; margin-top: 4px; }
          .section-title { font-size: 18px; font-weight: 700; margin-bottom: 15px; border-bottom: 1px solid rgba(255,255,255,0.1); pb: 10px; color: #F8FAFC; }
          .endpoint-item { padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center; }
          .method-get { color: #15D8B3; font-weight: 700; font-family: 'Fira Code', monospace; font-size: 13px; }
          .method-post { color: #3B82F6; font-weight: 700; font-family: 'Fira Code', monospace; font-size: 13px; }
          .endpoint-path { font-family: 'Fira Code', monospace; color: #F8FAFC; font-weight: 600; font-size: 14px; text-decoration: none; }
          .endpoint-path:hover { color: #15D8B3; text-decoration: underline; }
          .endpoint-desc { font-size: 12px; color: rgba(248,250,252,0.7); margin-top: 4px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div>
              <div class="subtitle">DEVELOPER REST API SERVICE</div>
              <h1 class="title">Mr. Baraiya Backend API Dashboard</h1>
            </div>
            <div class="badge">STATUS: ONLINE</div>
          </div>

          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-val">MongoDB Atlas</div>
              <div class="stat-lbl">Database Connection</div>
            </div>
            <div class="stat-card">
              <div class="stat-val">${apiInfo.uptimeSeconds}s</div>
              <div class="stat-lbl">Process Uptime</div>
            </div>
            <div class="stat-card">
              <div class="stat-val">${apiInfo.system.memoryHeapMB} MB</div>
              <div class="stat-lbl">Heap Memory Usage</div>
            </div>
            <div class="stat-card">
              <div class="stat-val">${apiInfo.system.nodeVersion}</div>
              <div class="stat-lbl">Node.js Runtime</div>
            </div>
          </div>

          <h2 class="section-title">REST API Endpoints Catalog</h2>
          <div>
            ${apiInfo.endpoints.map(e => `
              <div class="endpoint-item">
                <div>
                  <a href="${e.path}" target="_blank" class="endpoint-path">${e.path}</a>
                  <div class="endpoint-desc">${e.description}</div>
                </div>
                <span class="${e.method === 'GET' ? 'method-get' : 'method-post'}">${e.method}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </body>
      </html>
    `);
  }

  res.json(apiInfo);
});

// Root route redirect to /api
app.get('/', (req, res) => {
  res.redirect('/api');
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
