import { scrapeAmazon } from './amazon.scraper.js';
import { scrapeFlipkart } from './flipkart.scraper.js';

export const scraperMap = {
  amazon: scrapeAmazon,
  flipkart : scrapeFlipkart,
};
