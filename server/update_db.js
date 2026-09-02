import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio_db';

mongoose.connect(mongoUri).then(async () => {
  const Project = mongoose.model('Project', new mongoose.Schema({}, { strict: false }));
  
  const updates = [
    { regex: 'Cricket Broadcast', img: '/images/projects/cricket-broadcast.png' },
    { regex: 'Cricket Score API', img: '/images/projects/cricket-score-api.png' },
    { regex: 'Dayflow', img: '/images/projects/dayflow.png' },
    { regex: 'ShopEasy', img: '/images/projects/shoapeasy.png' },
    { regex: 'VMusic', img: '/images/projects/vmusic.png' },
    { regex: 'CardioSense', img: '/images/projects/cardiosense.png' },
    { regex: 'Waste Management', img: '/images/projects/swms.png' },
    { regex: 'Resume Builder', img: '/images/projects/resume.png' },
    { regex: 'CineVault', img: '/images/projects/cinevault.png' },
    { regex: 'Pong Game', img: '/images/projects/pong-game.png' },
    { regex: 'TransitOps', img: '/images/projects/transitops-api.png' },
    { regex: 'AgroSmart', img: '/images/projects/agrosmart.png' },
    { regex: 'MOMS', img: '/images/projects/moms.png' },
    { regex: 'Weather', img: '/images/projects/weather.png' },
    { regex: 'ImpactMeter', img: '/images/projects/impactmeter.png' }
  ];

  for (const item of updates) {
    await Project.updateMany(
      { title: { $regex: item.regex, $options: 'i' } },
      { $set: { image: item.img } }
    );
  }

  console.log('SUCCESS: All project images synchronized in MongoDB Atlas!');
  process.exit(0);
}).catch(err => {
  console.error('Database update error:', err);
  process.exit(1);
});
