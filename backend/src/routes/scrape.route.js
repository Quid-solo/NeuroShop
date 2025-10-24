import express from 'express';
import identifyPlatform from '../utils/identifyPlatform.js';
import { scraperMap } from '../scraper/index.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const { url } = req.query;
  const platform = identifyPlatform(url);

  if(platform=="Invalid URL" || platform=="Unknown Platform") return res.status(400).json({ error: 'Unsupported or invalid URL' });

  const scraper = scraperMap[platform];

  if(!scraper) return res.status(500).json({ error: 'Scraper not implemented for this platform' });


  try {
    const data = await scraper(url, true);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Scraping failed', details: err.message });
  }
});

export default router;
