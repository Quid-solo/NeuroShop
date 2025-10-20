import express from 'express';
import { scrapeAmazon } from '../controllers/amazon.controller.js';

const router = express.Router();

router.get('/amazon', async (req, res) => {
  const { url } = req.query;
  try {
    const data = await scrapeAmazon(url);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Scraping failed', details: err.message });
  }
});

export default router;
