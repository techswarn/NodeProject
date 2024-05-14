const axios = require("axios");
const dotenv = require("dotenv");
const { writeFileSync } = require("fs");
const puppeteer = require("puppeteer");
dotenv.config({ path: "./config.env" });

const checkEndpoint = async (req) => {
  console.log("here 2");

  const url =
    "https://epochcms-ahdv4.ondigitalocean.app/api/blogs?sort[0]=posted%3Adesc&populate=%2A&filters[featured][$eq]=true";
  let response;

  try {
    const val = await scrape();
    console.log(val);
  } catch (err) {
    console.log(err);
  }

  try {
    response = await axios.get(url);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
  // console.log(response);
  if (response.status == 200) {
    return true;
  } else if (response.status == 500) {
    return false;
  }
};

const scrape = async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    ignoreDefaultArgs: ["--disable-extensions"],
    executablePath: "/usr/bin/chromium", // this is the line
    args: [
      "--no-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--disable-setuid-sandbox",
      "--no-zygote",
    ],
  });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto("https://developer.chrome.com/");

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });

  // Type into search box
  await page.type(".devsite-search-field", "automate beyond recorder");

  // Wait and click on first result
  const searchResultSelector = ".devsite-result-item-link";
  await page.waitForSelector(searchResultSelector);
  await page.click(searchResultSelector);

  // Locate the full title with a unique string
  const textSelector = await page.waitForSelector(
    "text/Customize and automate"
  );
  const fullTitle = await textSelector?.evaluate((el) => el.textContent);

  // Print the full title
  console.log('The title of this blog post is "%s".', fullTitle);

  await browser.close();
  return fullTitle;
};

exports.checkEndpoint = checkEndpoint;
