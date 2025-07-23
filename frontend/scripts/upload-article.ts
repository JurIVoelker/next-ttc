import "dotenv/config";
import puppeteer from "puppeteer";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const closeCookieModal = async (page: any) => {
  await page.click(".cookie-modal .cm-footer-buttons button");
};

const login = async (page: any) => {
  await page.click("#Header a");
  await page.waitForSelector("#mydialog");
  await page.type("#mydialog input", process.env.WITTICH_USERNAME || "");
  await page.type(
    "#mydialog input[type='password']",
    process.env.WITTICH_PASSWORD || ""
  );
  await page.click("#mydialog input[type='button']");
  await page.waitForNavigation();
};

const openArticleList = async (page: any) => {
  await page.click("#content a:nth-of-type(2)");
  await sleep(1000);
  await closeCookieModal(page);
};

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://meinwittich.wittich.de/");
  await closeCookieModal(page);
  await login(page);
  await openArticleList(page);

  await browser.close();
})();
