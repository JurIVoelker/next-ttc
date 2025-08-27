const puppeteer = require("puppeteer");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const closeCookieModal = async (page) => {
  await page.click(".cookie-modal .cm-footer-buttons button");
};

const login = async (page) => {
  await page.waitForSelector("#ui-id-2");
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

const openArticleList = async (page) => {
  await page.click("#content a:nth-of-type(2)");
  await sleep(1000);
  await closeCookieModal(page);
};

const selectArticle = async (page, filePath) => {
  const fileInput = await page.$("input[type='file']");
  console.log("File input found:", fileInput !== null);
  fileInput.uploadFile(filePath);
  console.log("File uploaded:", filePath);
  await sleep(5000);
};

const uploadArticle = async (filePath) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  await page.goto("https://meinwittich.wittich.de/");
  await closeCookieModal(page);
  await login(page);
  await openArticleList(page);
  await selectArticle(page, filePath);
  console.log("Article uploaded successfully!");
  await browser.close();
  console.log("Browser closed.");
};

module.exports = { uploadArticle };
