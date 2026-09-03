import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { exec } from 'child_process';
import { put } from '@vercel/blob';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Memory storage for Vercel Blob & Serverless execution
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 } // 25MB max limit
});

// Helper to convert PDF Buffer -> Page 1 PNG Screenshot Buffer using PyMuPDF / pymupdf
const renderPdfPageToPngBuffer = (pdfBuffer) => {
  return new Promise((resolve) => {
    try {
      const timestamp = Date.now() + '_' + Math.random().toString(36).substring(2, 7);
      const tempPdfPath = path.join(process.cwd(), `temp_${timestamp}.pdf`);
      const tempPngPath = path.join(process.cwd(), `temp_${timestamp}.png`);

      fs.writeFileSync(tempPdfPath, pdfBuffer);

      const pyScript = `
import pymupdf
try:
    doc = pymupdf.open(r"${tempPdfPath.replace(/\\/g, '\\\\')}")
    if len(doc) > 0:
        page = doc[0]
        pix = page.get_pixmap(dpi=150)
        pix.save(r"${tempPngPath.replace(/\\/g, '\\\\')}")
    doc.close()
    print("SUCCESS")
except Exception as e:
    print(f"ERROR: {e}")
`;
      const tempPyPath = path.join(process.cwd(), `temp_script_${timestamp}.py`);
      fs.writeFileSync(tempPyPath, pyScript);

      exec(`python "${tempPyPath}"`, (error, stdout) => {
        try { if (fs.existsSync(tempPyPath)) fs.unlinkSync(tempPyPath); } catch (e) {}
        try { if (fs.existsSync(tempPdfPath)) fs.unlinkSync(tempPdfPath); } catch (e) {}

        if (stdout && stdout.includes('SUCCESS') && fs.existsSync(tempPngPath)) {
          const pngBuffer = fs.readFileSync(tempPngPath);
          try { fs.unlinkSync(tempPngPath); } catch (e) {}
          resolve(pngBuffer);
        } else {
          console.warn('[PDF Cover Render] Could not render PNG cover from PDF, using fallback.');
          try { if (fs.existsSync(tempPngPath)) fs.unlinkSync(tempPngPath); } catch (e) {}
          resolve(null);
        }
      });
    } catch (err) {
      console.error('[PDF Cover Render Error]:', err);
      resolve(null);
    }
  });
};

// POST /api/upload - Handle PDF or Image Upload, Auto-generate PNG cover, upload to Vercel Blob
router.post('/', protectAdmin, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const token = process.env.BLOB_READ_WRITE_TOKEN || 'vercel_blob_rw_CATGBuviCQq4RhlA_qE3LV93ODk97xBzp92MxANyM6xqL7A';
    const cleanName = path.basename(req.file.originalname, path.extname(req.file.originalname))
      .replace(/[^a-zA-Z0-9_\-]/g, '_');
    const ext = path.extname(req.file.originalname).toLowerCase();
    const timestamp = Date.now();

    if (ext === '.pdf') {
      const pdfFilename = `pdf_${cleanName}_${timestamp}.pdf`;
      const pngFilename = `img_${cleanName}_${timestamp}.png`;

      // 1. Upload PDF to Vercel Blob Storage
      const pdfBlob = await put(pdfFilename, req.file.buffer, {
        access: 'public',
        token: token
      });
      console.log(`[Vercel Blob] Uploaded PDF: ${pdfBlob.url}`);

      // 2. Auto-generate high-res PNG cover screenshot from PDF Page 1
      const pngBuffer = await renderPdfPageToPngBuffer(req.file.buffer);

      let imageBlobUrl = pdfBlob.url;
      if (pngBuffer) {
        const imgBlob = await put(pngFilename, pngBuffer, {
          access: 'public',
          token: token
        });
        imageBlobUrl = imgBlob.url;
        console.log(`[Vercel Blob] Auto-rendered PNG cover screenshot: ${imageBlobUrl}`);
      }

      return res.json({
        success: true,
        message: 'PDF uploaded & cover screenshot generated automatically!',
        pdfUrl: pdfBlob.url,
        imageUrl: imageBlobUrl,
        url: pdfBlob.url
      });
    } else {
      // Image upload (.png, .jpg, .jpeg, .webp)
      const imgFilename = `img_${cleanName}_${timestamp}${ext}`;
      const imgBlob = await put(imgFilename, req.file.buffer, {
        access: 'public',
        token: token
      });
      console.log(`[Vercel Blob] Uploaded Image: ${imgBlob.url}`);

      return res.json({
        success: true,
        message: 'Image uploaded to Vercel Blob Storage successfully!',
        pdfUrl: imgBlob.url,
        imageUrl: imgBlob.url,
        url: imgBlob.url
      });
    }
  } catch (error) {
    console.error('Vercel Blob Upload Error:', error);
    res.status(500).json({ error: error.message || 'File upload failed server error' });
  }
});

export default router;
