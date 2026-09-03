import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://<username>:<password>@cluster0.r4bt2.mongodb.net/portfolio_db";
const BLOB_BASE = "https://catgbuvicqq4rhla.public.blob.vercel-storage.com";

const projectSchema = new mongoose.Schema({}, { strict: false });
const gallerySchema = new mongoose.Schema({}, { strict: false });
const profileSchema = new mongoose.Schema({}, { strict: false });

const Project = mongoose.model('Project', projectSchema);
const Gallery = mongoose.model('Gallery', gallerySchema);
const Profile = mongoose.model('Profile', profileSchema);

function convertPathToBlobUrl(pathStr) {
  if (!pathStr || pathStr.startsWith('http')) return pathStr;
  const cleanPath = pathStr.replace(/^\/+/, '');
  const blobFilename = cleanPath.replace(/\//g, '_');
  return `${BLOB_BASE}/${blobFilename}`;
}

async function run() {
  console.log('Connecting to MongoDB Atlas...');
  await mongoose.connect(MONGO_URI);
  console.log('Connected!');

  // 1. Projects
  const projects = await Project.find({});
  console.log(`Updating ${projects.length} projects...`);
  for (const p of projects) {
    if (p.image && !p.image.startsWith('http')) {
      const newImg = convertPathToBlobUrl(p.image);
      await Project.updateOne({ _id: p._id }, { $set: { image: newImg } });
      console.log(`  Project '${p.title}': ${p.image} -> ${newImg}`);
    }
  }

  // 2. Galleries
  const galleries = await Gallery.find({});
  console.log(`\nUpdating ${galleries.length} gallery items...`);
  for (const g of galleries) {
    const updates = {};
    if (g.image && !g.image.startsWith('http')) updates.image = convertPathToBlobUrl(g.image);
    if (g.pdfUrl && !g.pdfUrl.startsWith('http')) updates.pdfUrl = convertPathToBlobUrl(g.pdfUrl);
    if (g.credentialUrl && !g.credentialUrl.startsWith('http')) updates.credentialUrl = convertPathToBlobUrl(g.credentialUrl);

    if (Object.keys(updates).length > 0) {
      await Gallery.updateOne({ _id: g._id }, { $set: updates });
      console.log(`  Gallery '${g.title}': updated ${Object.keys(updates).join(', ')}`);
    }
  }

  // 3. Profiles
  const profiles = await Profile.find({});
  console.log(`\nUpdating ${profiles.length} profiles...`);
  for (const prof of profiles) {
    if (prof.resumeUrl && !prof.resumeUrl.startsWith('http')) {
      const newResume = `${BLOB_BASE}/Vishal_Baraiya_Resume.pdf`;
      await Profile.updateOne({ _id: prof._id }, { $set: { resumeUrl: newResume } });
      console.log(`  Profile resumeUrl updated to: ${newResume}`);
    }
  }

  console.log('\nAll MongoDB database records updated to Vercel Blob URLs!');
  await mongoose.disconnect();
}

run().catch(err => {
  console.error('Error migrating Mongo DB URLs:', err);
  process.exit(1);
});
