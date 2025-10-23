import puppeteer from 'puppeteer';

export const matchOnFlipkart = async({title, mrp})=>{
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    const flipkartSearchUrl = `https://www.flipkart.com/search?q=${title}`;

    await page.goto(flipkartSearchUrl, { waitUntil: 'networkidle2' });
    await page.goto(flipkartSearchUrl, { waitUntil: 'domcontentloaded' });
    const titles = await page.$$eval('a[href*="/p/"][title]', anchors => 
        anchors
        .slice(0, 15)
        .map(el => el.title)
    );
    const mrps = await page.$$eval('a[href*="/p/"]:not([title])', anchors =>
        anchors
            .filter(el => !el.querySelector('img'))
            .slice(0, 15)
            .map(el => el.children[0]?.children[1]?.textContent.trim())
            .filter(Boolean)
    );

    

}