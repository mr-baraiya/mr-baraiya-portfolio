
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio_db';

mongoose.connect(mongoUri).then(async () => {
  const Profile = mongoose.model('Profile', new mongoose.Schema({}, { strict: false }));
  
  const updateRes = await Profile.updateMany(
    {},
    { 
      $set: { 
        linkedinUrl: 'https://www.linkedin.com/in/baraiya-vishalbhai/',
        linkedin: 'https://www.linkedin.com/in/baraiya-vishalbhai/'
      } 
    }
  );
  console.log('LinkedIn URL update result:', updateRes);
  process.exit(0);
}).catch(err => {
  console.error('LinkedIn update error:', err);
  process.exit(1);
});
