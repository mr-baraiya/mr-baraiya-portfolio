import express from 'express';
import https from 'https';
import Gallery from '../models/Gallery.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

const YOUTUBE_CHANNEL_ID = 'UCCbef6kZhXUeBSMu_FGBXMw';
const YOUTUBE_RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`;

// Helper to fetch YouTube RSS Feed
const fetchYouTubeRSS = () => {
  return new Promise((resolve) => {
    https.get(YOUTUBE_RSS_URL, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', (err) => {
      console.warn('[YouTube RSS Fetch Warning]:', err.message);
      resolve('');
    });
  });
};

// Auto-sync function to fetch latest videos from YouTube RSS feed and store new ones in MongoDB
export const syncYouTubeVideos = async () => {
  try {
    const xml = await fetchYouTubeRSS();
    if (!xml) return;

    const entryRegex = /<entry>[\s\S]*?<\/entry>/g;
    const entries = xml.match(entryRegex) || [];

    let newCount = 0;
    for (const entry of entries) {
      const titleMatch = entry.match(/<title>(.*?)<\/title>/);
      const videoIdMatch = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/);
      const pubMatch = entry.match(/<published>(.*?)<\/published>/);

      if (videoIdMatch && titleMatch) {
        const videoId = videoIdMatch[1];
        const rawTitle = titleMatch[1]
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&#39;/g, "'")
          .replace(/&quot;/g, '"');

        const pubDate = pubMatch
          ? new Date(pubMatch[1]).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
          : 'YouTube';

        const embedUrl = `https://www.youtube.com/embed/${videoId}`;
        const credentialUrl = `https://www.youtube.com/watch?v=${videoId}`;
        const image = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

        const res = await Gallery.findOneAndUpdate(
          { $or: [{ embedUrl: embedUrl }, { credentialUrl: credentialUrl }, { title: rawTitle }] },
          {
            $setOnInsert: {
              title: rawTitle,
              category: 'Videos',
              issuer: 'Vishal Baraiya',
              date: pubDate,
              image: image,
              credentialUrl: credentialUrl,
              pdfUrl: credentialUrl,
              embedUrl: embedUrl,
              description: `Official YouTube Video Demo: ${rawTitle}`,
              featured: false
            }
          },
          { upsert: true, new: true, rawResult: true }
        );

        if (res && res.lastErrorObject && !res.lastErrorObject.updatedExisting) {
          newCount++;
        }
      }
    }
    if (newCount > 0) {
      console.log(`[YouTube Auto-Sync] Added ${newCount} new video(s) from YouTube channel to MongoDB!`);
    }
  } catch (err) {
    console.error('[YouTube Auto-Sync Error]:', err.message);
  }
};

// Initial auto-sync trigger on server startup
syncYouTubeVideos();

// GET all gallery items directly from MongoDB database (and trigger background YouTube check)
router.get('/', async (req, res) => {
  try {
    // Trigger background check for new YouTube videos
    syncYouTubeVideos().catch(() => {});

    const items = await Gallery.find().sort({ createdAt: -1 });
    return res.json(items);
  } catch (error) {
    console.error('Error fetching gallery items from MongoDB:', error);
    return res.status(500).json({ error: 'Failed to fetch gallery items' });
  }
});

// POST /api/gallery/sync-youtube - Trigger instant sync of YouTube Channel videos
router.post('/sync-youtube', async (req, res) => {
  try {
    await syncYouTubeVideos();
    const videoItems = await Gallery.find({ category: 'Videos' }).sort({ createdAt: -1 });
    return res.json({ success: true, message: 'YouTube channel videos synced with MongoDB!', count: videoItems.length, videos: videoItems });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// POST new gallery item (Protected)
router.post('/', protectAdmin, async (req, res) => {
  try {
    const item = new Gallery(req.body);
    const saved = await item.save();
    return res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT update gallery item (Protected)
router.put('/:id', protectAdmin, async (req, res) => {
  try {
    const updated = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE gallery item (Protected)
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    return res.json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
