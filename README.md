# Mr. Baraiya - Software Engineering Portfolio

Full-stack developer portfolio engineered with React 19, Vite, Tailwind CSS, Express.js, and MongoDB. Showcases production projects, open-source Webpack contributions, GitHub live activity, LeetCode metrics, and academic history.

## Features

- Dynamic Featured Projects showcase (AgroSmart, MOMS, Weather Notify AI, ImpactMeter).
- Webpack Open-Source Merged Pull Requests showcase and dedicated details page.
- GitHub live API integration fetching repositories, commits, and star metrics.
- LeetCode problem-solving metrics and rating breakdown.
- Responsive design optimized for desktop and mobile views.
- Secure Admin Dashboard with JWT authentication for full portfolio content management.
- Integrated contact form with email notifications.

## Tech Stack

- Frontend: React 19, Vite, Tailwind CSS, React Router DOM, Lucide Icons, Three.js
- Backend: Node.js, Express.js, Mongoose, JWT, Nodemailer, bcryptjs
- Database: MongoDB Atlas / Local MongoDB
- Deployment: Vercel / Netlify (Client), Render / Railway (Server)

## Environment Variables

### Server (`server/.env`)

Set up a `.env` file in the `server` directory:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/portfolio_db
CLIENT_URL=http://localhost:5173
JWT_SECRET=your_jwt_secret_key_here
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
ADMIN_ALERT_EMAIL=your_email@gmail.com
```

### Client (`client/.env`)

Set up a `.env` file in the `client` directory:

```env
VITE_API_URL=http://localhost:5000/api
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

## License

This project is licensed under the MIT License - see the LICENSE file for details.
