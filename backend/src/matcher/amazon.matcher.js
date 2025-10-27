import puppeteer from 'puppeteer';
import { scraperMap } from '../scraper/index.js';
import fuseMatch from '../utils/fuseMatch.js';

export const matchOnAmazon = async(title, mrp)=>{
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    const amazonSearchUrl = `https://www.amazon.in/s?k=${title}`;

    await page.goto(amazonSearchUrl, { waitUntil: 'networkidle2' });
    await page.goto(amazonSearchUrl, { waitUntil: 'domcontentloaded' });
    const elements = await page.$$eval('a[href*="/dp/"]', anchors =>
        anchors
            .filter(el => el.querySelector('h2 span')) // ensure it has a title
            .slice(0, 15)
            .map(el => ({
            title: el.querySelector('h2 span')?.textContent.trim(),
            href: el.href
        }))
    );

    const mrps = await page.$$eval('.a-price.a-text-price .a-offscreen', items =>
        items
            .slice(0, 15)
            .map(el => el.textContent.trim())
            .filter(Boolean)
    );

    await browser.close();

    const titles = [];
    for(let i=0; i<mrps.length; i++){
        if(String(mrps[i])==String(mrp)) titles.push({ title: elements[i].title, index: i });
    }
    // console.log("check 1");
    // console.log(titles);
    if (titles.length === 0) return "not found";
     
    const best = fuseMatch(titles, title);
    // console.log("bestMatch: ",best);

    const amazonUrl = elements[best.item.index].href;
    const scraper = scraperMap["amazon"];
    return await scraper(amazonUrl, false);
}