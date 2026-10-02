import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, 'dist');
const artifactDir = '/home/robin/.gemini/antigravity/brain/d64c1364-983d-493c-984c-963e9b6f9bc3';

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
};

const server = http.createServer((req, res) => {
  let reqUrl = req.url.split('?')[0];
  if (reqUrl === '/' || reqUrl === '') {
    reqUrl = '/index.html';
  }
  const filePath = path.join(distDir, reqUrl);
  if (!fs.existsSync(filePath)) {
    res.writeHead(404);
    res.end('Not Found');
    return;
  }
  const ext = path.extname(filePath).toLowerCase();
  res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
});

async function capture() {
  const PORT = 43211;
  await new Promise((resolve) => server.listen(PORT, resolve));
  console.log(`Server listening on ${PORT}`);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  // 1. Landing Page
  await page.goto(`http://localhost:${PORT}/index.html`);
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(artifactDir, 'screenshot_landing.png'), fullPage: false });
  console.log('Saved screenshot_landing.png');

  // 2. Product Listing Page
  await page.click('.get-started-button');
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(artifactDir, 'screenshot_products.png'), fullPage: false });
  console.log('Saved screenshot_products.png');

  // Add 2 items
  await page.click('.product-card:first-child .product-button');
  await page.waitForTimeout(200);
  await page.click('.product-card:nth-child(2) .product-button');
  await page.waitForTimeout(200);

  // 3. Shopping Cart Page
  await page.click('a[href="#cart"]');
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(artifactDir, 'screenshot_cart.png'), fullPage: false });
  console.log('Saved screenshot_cart.png');

  await browser.close();
  server.close();
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});
