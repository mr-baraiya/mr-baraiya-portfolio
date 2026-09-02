
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio_db';

mongoose.connect(mongoUri).then(async () => {
  const Gallery = mongoose.model('Gallery', new mongoose.Schema({}, { strict: false }));
  
  const webpackAch = {
    title: 'Official Webpack Core Contributor (18+ Merged PRs)',
    category: 'Achievements',
    issuer: 'Webpack Open Source Organization (webpack.js.org)',
    date: '2026',
    image: '/images/projects/moms.png',
    pdfUrl: 'https://github.com/webpack/webpack.js.org/pulls?q=is%3Apr+is%3Aclosed+author%3Amr-baraiya',
    description: 'Authored and merged 18+ Pull Requests into Webpack official repository (webpack.js.org) covering SCSS to Tailwind CSS migration, MutationObserver performance fixes, accessibility (a11y) enhancements, and documentation.',
    credentialUrl: 'https://github.com/webpack/webpack.js.org/pulls?q=is%3Apr+is%3Aclosed+author%3Amr-baraiya',
    featured: true
  };

  // Upsert Webpack achievement
  const res = await Gallery.updateOne(
    { title: { $regex: 'Webpack', $options: 'i' } },
    { $set: webpackAch },
    { upsert: true }
  );

  console.log('Successfully inserted Webpack Achievement in MongoDB Atlas!', res);
  process.exit(0);
}).catch(err => {
  console.error('Achievement insert error:', err);
  process.exit(1);
});
