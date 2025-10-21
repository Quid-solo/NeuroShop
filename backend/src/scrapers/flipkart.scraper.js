import puppeteer from 'puppeteer';

export const scrapeFlipkart = async (url) => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    const imageUrl = await page.$eval('meta[property="og:image"]', el => el.content);

    const title = await page.$eval('.VU-ZEz', el => el.textContent.trim());
    const price = await page.$eval('.Nx9bqj.CxhGGd', el => el.textContent.trim());
    const mrp = await page.$eval('.yRaY8j.A6\\+E6v', el => el.textContent.trim());

    await browser.close();
    return { imageUrl, title, price, mrp };


}