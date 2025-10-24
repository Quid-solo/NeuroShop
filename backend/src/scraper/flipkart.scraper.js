import puppeteer from 'puppeteer';
import { matchOnAmazon } from '../matcher/index.js';

export const scrapeFlipkart = async (url, fresh) => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    const imageUrl = await page.$eval('meta[property="og:image"]', el => el.content);

    const title = await page.$eval('.VU-ZEz', el => el.textContent.trim());
    const price = await page.$eval('.Nx9bqj.CxhGGd', el => el.textContent.trim());
    const mrp = await page.$eval('.yRaY8j.A6\\+E6v', el => el.textContent.trim());
    const categories = await page.$$eval(
        '._7dPnhA .r2CdBx',
        els => els
            .map(el => el.textContent.trim())
            .slice(1, -1)
            .filter(Boolean)
    );

    await browser.close();

    let amazonProd;
    if(fresh) {
      amazonProd = await matchOnAmazon(title, mrp);
      return { flipkart: {url, imageUrl, title, price, mrp, categories,}, amazon: amazonProd };
    } else return {url, imageUrl, title, price, mrp, categories,};

}