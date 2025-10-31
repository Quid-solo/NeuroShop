import puppeteer from 'puppeteer';
import { matchOnFlipkart } from '../matcher/index.js';
// import {asyncHandler} from '../utils/asyncHandler.js';

export const scrapeAmazon = async (url, fresh) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { 
    waitUntil: 'networkidle2',
    timeout: 60000,
   });
  // await page.goto(url, { waitUntil: 'domcontentloaded' });

  const imgUrl = await page.$eval('#imgTagWrapperId img', img =>
    img.getAttribute('src')
  );
  const title = await page.$eval('#productTitle', el => el.textContent.trim());
  const price = await page.$eval('.a-price-whole', el => el.textContent.trim());
  const mrp = await page.$eval('.a-price.a-text-price .a-offscreen', el => el.textContent.trim());
  const categories = await page.$$eval(
    '#wayfinding-breadcrumbs_feature_div ul li span',
    spans => spans
      .map(el => el.textContent.replace(/›/g, '').replace(/>/g, '').trim())
      .filter(Boolean)
  );

  await browser.close();
  // console.log(title, price);
  let flipkartProd;
  if(fresh) {
    flipkartProd = await matchOnFlipkart(title, mrp);
    return { amazon: {url, imgUrl, title, price, mrp, categories,}, flipkart: flipkartProd };
  } else return {url, imgUrl, title, price, mrp, categories,};
};
