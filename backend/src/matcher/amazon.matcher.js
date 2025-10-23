import puppeteer from 'puppeteer';

export const matchOnAmazon = async({title, mrp})=>{
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    const amazonSearchUrl = `https://www.amazon.in/s?k=${title}`;

    await page.goto(flipkartSearchUrl, { waitUntil: 'networkidle2' });
    await page.goto(flipkartSearchUrl, { waitUntil: 'domcontentloaded' });
    const titles = await page.$$eval('a h2 span', spans =>
        spans.slice(0, 15).map(el => el.textContent.trim())
    );

     const mrps = await page.$$eval('.a-price.a-text-price .a-offscreen', items =>
         items
             .slice(0, 15)
             .map(el => el.textContent.trim())
             .filter(Boolean)
     );

    

}