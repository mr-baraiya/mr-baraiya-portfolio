import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio_db';

mongoose.connect(mongoUri).then(async () => {
  const Project = mongoose.model('Project', new mongoose.Schema({}, { strict: false }));
  const projects = await Project.find({});
  projects.forEach(p => {
    console.log('TITLE: [' + p.title + '] -> IMAGE: [' + p.image + ']');
  });
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
