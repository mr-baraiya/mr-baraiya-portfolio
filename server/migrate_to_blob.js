import { put } from '@vercel/blob';
import fs from 'fs';
import path from 'path';

const TOKEN = 'vercel_blob_rw_CATGBuviCQq4RhlA_qE3LV93ODk97xBzp92MxANyM6xqL7A';
const PUBLIC_DIR = path.resolve('../client/public');
const MAPPING_FILE = path.resolve('../scratch_blob_url_mapping.json');

const skipFiles = ['_redirects', 'robots.txt', 'sitemap.xml', 'googlef899b57a57c02f40.html'];

async function getAllFiles(dirPath, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = await getAllFiles(fullPath, arrayOfFiles);
    } else {
      if (!skipFiles.includes(file)) {
        arrayOfFiles.push(fullPath);
      }
    }
  }
  return arrayOfFiles;
}

async function run() {
  console.log('Starting Vercel Blob migration...');
  const files = await getAllFiles(PUBLIC_DIR);
  console.log(`Found ${files.length} files to upload to Vercel Blob.`);

  const urlMap = {};

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const relPath = path.relative(PUBLIC_DIR, file).replace(/\\/g, '/');
    const buffer = fs.readFileSync(file);

    const cleanFilename = relPath.replace(/\//g, '_');
    console.log(`[${i + 1}/${files.length}] Uploading ${relPath} -> ${cleanFilename}...`);

    try {
      const blob = await put(cleanFilename, buffer, {
        access: 'public',
        token: TOKEN
      });
      urlMap[relPath] = blob.url;
      urlMap['/' + relPath] = blob.url;
      console.log(`  ✓ Uploaded: ${blob.url}`);
    } catch (err) {
      console.error(`  ✕ Error uploading ${relPath}:`, err.message);
    }
  }

  fs.writeFileSync(MAPPING_FILE, JSON.stringify(urlMap, null, 2));
  console.log(`\nMigration completed! Saved ${Object.keys(urlMap).length} URLs to ${MAPPING_FILE}`);
}

run();
