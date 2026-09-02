
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio_db';

mongoose.connect(mongoUri).then(async () => {
  const Project = mongoose.model('Project', new mongoose.Schema({}, { strict: false }));
  const projects = await Project.find({});
  
  console.log('=== FIXING ALL PROJECT IMAGES IN MONGODB ATLAS ===');
  
  const mapping = [
    { key: 'dayflow', img: '/images/projects/dayflow.png' },
    { key: 'shopeasy', img: '/images/projects/shoapeasy.png' },
    { key: 'shoapeasy', img: '/images/projects/shoapeasy.png' },
    { key: 'vmusic', img: '/images/projects/vmusic.png' },
    { key: 'v-music', img: '/images/projects/vmusic.png' },
    { key: 'cardio', img: '/images/projects/cardiosense.png' },
    { key: 'waste', img: '/images/projects/swms.png' },
    { key: 'swms', img: '/images/projects/swms.png' },
    { key: 'resume', img: '/images/projects/resume.png' },
    { key: 'cinevault', img: '/images/projects/cinevault.png' },
    { key: 'cricket score', img: '/images/projects/cricket-score-api.png' },
    { key: 'live cricket', img: '/images/projects/cricket-score-api.png' },
    { key: 'broadcast', img: '/images/projects/cricket-broadcast.png' },
    { key: 'cricket broadcast', img: '/images/projects/cricket-broadcast.png' },
    { key: 'pong', img: '/images/projects/pong-game.png' },
    { key: 'transit', img: '/images/projects/transitops-api.png' },
    { key: 'agrosmart', img: '/images/projects/agrosmart.png' },
    { key: 'agro', img: '/images/projects/agrosmart.png' },
    { key: 'moms', img: '/images/projects/moms.png' },
    { key: 'mcq', img: '/images/projects/pdf-to-mcq.png' },
    { key: 'weather', img: '/images/projects/weather.png' },
    { key: 'impactmeter', img: '/images/projects/impactmeter.png' },
    { key: 'impact', img: '/images/projects/impactmeter.png' },
    { key: 'quiz', img: '/images/projects/quiz-app.png' },
    { key: 'steganography', img: '/images/projects/steganography.png' },
    { key: 'candlestick', img: '/images/projects/candlestick.png' },
    { key: 'candle', img: '/images/projects/candlestick.png' },
    { key: 'ticket', img: '/images/projects/ticket-system.png' },
    { key: 'clinic', img: '/images/projects/clinic-queue.png' },
    { key: 'machine learning', img: '/images/projects/ml-hub.png' }
  ];

  for (const p of projects) {
    const titleLower = p.title.toLowerCase();
    let newImg = null;

    for (const m of mapping) {
      if (titleLower.includes(m.key)) {
        newImg = m.img;
        break;
      }
    }

    if (newImg) {
      await Project.updateOne({ _id: p._id }, { $set: { image: newImg } });
      console.log(`Updated [${p.title}] -> ${newImg}`);
    } else {
      console.log(`NO MATCH FOR: [${p.title}] (Current img: ${p.image})`);
    }
  }

  console.log('--- ALL PROJECT IMAGES SUCCESSFULLY UPDATED ---');
  process.exit(0);
}).catch(err => {
  console.error('Database update error:', err);
  process.exit(1);
});
