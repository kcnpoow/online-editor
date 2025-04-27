const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

async function generateScreenshot(htmlFilePath, screenshotPath) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const htmlContent = fs.readFileSync(htmlFilePath, "utf8");
    await page.setContent(htmlContent);

    // Now save to the provided screenshotPath
    await page.screenshot({ path: screenshotPath });

    await browser.close();
  } catch (error) {
    console.error("Error generating screenshot:", error);
    process.exit(1);
  }
}

// Read HTML and Screenshot paths from arguments
const htmlFilePath = process.argv[2];
const screenshotPath = process.argv[3];

generateScreenshot(htmlFilePath, screenshotPath);
