import puppeteer from 'puppeteer';
// import {asyncHandler} from '../utils/asyncHandler.js';

export const scrapeAmazon = async (url) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  // await page.waitForSelector('#productTitle', { timeout: 10000 }); 

  const imageUrl = await page.$eval('#imgTagWrapperId img', img =>
    img.getAttribute('src')
  );
  const title = await page.$eval('#productTitle', el => el.textContent.trim());
  const price = await page.$eval('.a-price-whole', el => el.textContent.trim());
  const currencySymbol = await page.$eval('.a-price-symbol', el => el.textContent.trim());
  const mrp = await page.$eval('.a-price.a-text-price .a-offscreen', el => el.textContent.trim());



  await browser.close();
  console.log(title, price);
  return { imageUrl, title, currencySymbol, price, mrp };
};

