// import puppeteer from 'puppeteer';

var puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://lan-lyu.github.io/TAIGA/search-2.html');
//   await page.goto('localhost:8000/search-2-google.html');
  await page.type('#search-input-1', 'man');
  await page.type('#search-input-2', 'woman');
  await page.click('#search-button');
  await page.screenshot({path: 'screenshot.png'});
  await browser.close();
})();