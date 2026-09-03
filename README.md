# Mr. Baraiya - Software Engineering Portfolio

Full-stack developer portfolio engineered with React 19, Vite, Tailwind CSS, Express.js, MongoDB Atlas, and Vercel Blob Storage. Features a dynamic 3D Phoenix canvas representing engineering resilience and struggle, 22+ production projects, open-source Webpack contributions, GATE 2026 CS credentials, a 5-step Developer Progression Timeline, and a secure Admin Dashboard.

## Live Production Deployments

- Frontend Website: https://mr-baraiya-portfolio.vercel.app
- Backend REST API Engine: https://mr-baraiya-portfolio-server.vercel.app/api

## Features

- **3D Phoenix Canvas**: Dynamic Three.js Phoenix model symbolizing resilience, overcoming engineering struggles, and continuous rebirth through code.
- **Developer Progression Timeline**: 5-stage interactive journey (Learning → Projects → Open Source → DSA → Current).
- **Vercel Blob Storage CDN**: All project cover images, hackathon certificates, and PDF resume documents are hosted on Vercel Blob CDN for high-speed delivery.
- **Automated PDF Cover Screenshot Generation**: Server automatically renders Page 1 of uploaded PDF certificates into crisp PNG cover images using PyMuPDF.
- **Interactive Admin Dashboard**: Full content management for Projects, Certificates & Hackathons, Skills, Experience, and Profile with direct image/PDF uploaders and live `👁️` Eye preview buttons.
- **Academic & Industry Credentials**: Highlighting GATE 2026 CS (AIR 4226), 9.24 CGPA at Darshan University, 500+ LeetCode solved, and Webpack open-source merged PRs.
- **GitHub & LeetCode Live Metrics**: Real-time integration fetching live repository stars, commits, and problem-solving stats.
- **Secure Admin Authentication**: JWT authentication with bcrypt password hashing and MongoDB Atlas persistence.

## Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, React Router DOM, Lucide Icons, Three.js / React Three Fiber
- **Backend**: Node.js, Express.js, Mongoose, Multer, PyMuPDF (PDF rendering), JWT, Nodemailer
- **Storage**: Vercel Blob Storage CDN
- **Database**: MongoDB Atlas
- **Deployment**: Vercel (Frontend & Serverless Backend API)

## Environment Variables

### Server (`server/.env`)

```env
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.aig5i.mongodb.net/portfolio
BLOB_STORE_ID=store_CATGBuviCQq4RhlA
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_CATGBuviCQq4RhlA_...
CLIENT_URL=https://mr-baraiya-portfolio.vercel.app
JWT_SECRET=your_jwt_secret_key_here
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
ADMIN_ALERT_EMAIL=your_email@gmail.com
```

### Client (`client/.env`)

```env
VITE_API_URL=https://mr-baraiya-portfolio-server.vercel.app/api
```

## Local Installation & Setup

1. Clone the repository:
```bash
git clone https://github.com/mr-baraiya/mr-baraiya-portfolio.git
cd mr-baraiya-portfolio
```

2. Install backend dependencies and start server:
```bash
cd server
npm install
npm run dev
```

3. Install frontend dependencies and start client:
```bash
cd ../client
npm install
npm run dev
```

4. Open `http://localhost:5173` in your browser.

## Credits & Acknowledgments

Special shoutout and thanks to [Sketchfab](https://sketchfab.com) for hosting incredible 3D models and creators! The 3D Phoenix model featured on the Hero section canvas is powered by 3D assets from Sketchfab.

## License

This project is licensed under the MIT License.
