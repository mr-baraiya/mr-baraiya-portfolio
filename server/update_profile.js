
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio_db';

mongoose.connect(mongoUri).then(async () => {
  const Profile = mongoose.model('Profile', new mongoose.Schema({}, { strict: false }));
  const res = await Profile.updateMany({}, { $set: { resumeUrl: '/pdf/Vishal_Baraiya_Resume.pdf' } });
  console.log('SUCCESS: Updated Profile resumeUrl in MongoDB:', res);
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
