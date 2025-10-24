import puppeteer from 'puppeteer';
import { scraperMap } from '../scraper/index.js';
import fuseMatch from '../utils/fuseMatch.js';

export const matchOnFlipkart = async(title, mrp)=>{
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    const flipkartSearchUrl = `https://www.flipkart.com/search?q=${title}`;

    await page.goto(flipkartSearchUrl, { waitUntil: 'networkidle2' });
    await page.goto(flipkartSearchUrl, { waitUntil: 'domcontentloaded' });
    const elements = await page.$$eval('a[href*="/p/"][title]', anchors =>
        anchors.slice(0, 15)
        .map(el => ({
            title: el.getAttribute('title'),
            href: el.getAttribute('href')
        }))
    );

    const mrps = await page.$$eval('a[href*="/p/"]:not([title])', anchors =>
        anchors
            .filter(el => !el.querySelector('img'))
            .slice(0, 15)
            .map(el => el.children[0]?.children[1]?.textContent.trim())
            .filter(Boolean)
    );
    // console.log(elements,mrps);
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
    // return {
    //     flipkartTitle: best.item.title,
    //     flipkartIndex: best.item.index,
    //     score: Number((1 - best.score).toFixed(3)),
    //     mrp,
    // };

    const flipkarturl = elements[best.item.index].href;
    // console.log(flipkarturl);
    const scraper = scraperMap["flipkart"];
    return await scraper(`https://www.flipkart.com${flipkarturl}`, false);

}