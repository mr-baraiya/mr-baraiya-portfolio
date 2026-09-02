import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { exec } from 'child_process';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Define destination paths pointing directly to client/public
const PUBLIC_DIR = path.resolve('../client/public');
const PDF_DIR = path.join(PUBLIC_DIR, 'pdf');
const IMG_DIR = path.join(PUBLIC_DIR, 'img');

// Ensure directories exist
if (!fs.existsSync(PDF_DIR)) fs.mkdirSync(PDF_DIR, { recursive: true });
if (!fs.existsSync(IMG_DIR)) fs.mkdirSync(IMG_DIR, { recursive: true });

// Configure Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === '.pdf') {
      cb(null, PDF_DIR);
    } else {
      cb(null, IMG_DIR);
    }
  },
  filename: (req, file, cb) => {
    const cleanName = path.basename(file.originalname, path.extname(file.originalname))
      .replace(/[^a-zA-Z0-9_\-]/g, '_');
    const ext = path.extname(file.originalname).toLowerCase();
    const finalName = `${cleanName}_${Date.now()}${ext}`;
    cb(null, finalName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 } // 25MB max size
});

// Helper Python script to convert PDF page 1 to PNG screenshot
const renderPdfToPng = (pdfPath, outPngPath) => {
  return new Promise((resolve) => {
    const pyScript = `
import fitz
doc = fitz.open(r"${pdfPath.replace(/\\/g, '\\\\')}")
if len(doc) > 0:
    page = doc[0]
    pix = page.get_pixmap(matrix=fitz.Matrix(2, 2))
    pix.save(r"${outPngPath.replace(/\\/g, '\\\\')}")
doc.close()
print("SUCCESS")
`;
    const tempPyFile = path.join(process.cwd(), 'temp_render.py');
    fs.writeFileSync(tempPyFile, pyScript);

    exec(`python "${tempPyFile}"`, (error, stdout) => {
      try { fs.unlinkSync(tempPyFile); } catch (e) {}
      if (stdout && stdout.includes('SUCCESS')) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};

// POST /api/upload - Handle file upload for certificates/documents
router.post('/', protectAdmin, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filename = req.file.filename;
    const ext = path.extname(filename).toLowerCase();

    if (ext === '.pdf') {
      const pdfFullPath = path.join(PDF_DIR, filename);
      const pngFilename = filename.replace(/\.pdf$/i, '.png');
      const pngFullPath = path.join(IMG_DIR, pngFilename);

      // Auto-generate PNG screenshot cover from PDF page 1
      await renderPdfToPng(pdfFullPath, pngFullPath);

      const pdfUrl = `/pdf/${filename}`;
      const imgUrl = fs.existsSync(pngFullPath) ? `/img/${pngFilename}` : pdfUrl;

      console.log(`[Upload] PDF uploaded & rendered: ${pdfUrl} -> ${imgUrl}`);

      return res.json({
        success: true,
        message: 'PDF uploaded and PNG cover generated successfully!',
        pdfUrl: pdfUrl,
        imageUrl: imgUrl
      });
    } else {
      const imgUrl = `/img/${filename}`;
      console.log(`[Upload] Image uploaded: ${imgUrl}`);

      return res.json({
        success: true,
        message: 'Image uploaded successfully!',
        imageUrl: imgUrl,
        pdfUrl: imgUrl
      });
    }
  } catch (error) {
    console.error('File Upload Error:', error);
    res.status(500).json({ error: 'File upload failed server error' });
  }
});

export default router;
