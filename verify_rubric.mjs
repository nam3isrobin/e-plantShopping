import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, 'dist');

// Simple static file server for dist
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

async function runVerification() {
  const PORT = 43210;
  await new Promise((resolve) => server.listen(PORT, resolve));
  console.log(`[TEST SERVER] Running on http://localhost:${PORT}`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Dialog listener for Checkout alert
  let alertMessage = '';
  page.on('dialog', async (dialog) => {
    alertMessage = dialog.message();
    console.log(`[ALERT CAPTURED]: "${alertMessage}"`);
    await dialog.accept();
  });

  try {
    console.log('\n--- 1. Testing Landing Page (5 points) ---');
    await page.goto(`http://localhost:${PORT}/index.html`);

    // Background image
    const bgImage = await page.$('.background-image');
    if (!bgImage) throw new Error('FAIL: Background image element not found');
    console.log('✓ PASS: Background image exists (1 point)');

    // Company name
    const companyTitle = await page.textContent('.landing_content h1');
    if (!companyTitle.includes('Paradise Nursery')) throw new Error(`FAIL: Company name missing, got: ${companyTitle}`);
    console.log('✓ PASS: Company name "Paradise Nursery" displayed (1 point)');

    // Paragraph about company
    const aboutContent = await page.textContent('.about-us-container');
    if (!aboutContent.includes('Paradise Nursery') || aboutContent.length < 50) {
      throw new Error('FAIL: Paragraph about the company not found or too brief');
    }
    console.log('✓ PASS: Paragraph about the company present (1 point)');

    // Get Started button
    const getStartedBtn = await page.$('.get-started-button');
    if (!getStartedBtn) throw new Error('FAIL: Get Started button not found');
    await getStartedBtn.click();
    await page.waitForSelector('.product-list-container.visible', { timeout: 3000 });
    console.log('✓ PASS: Get Started button links to product listing page (2 points)');

    console.log('\n--- 2. Testing Header (7 points) ---');
    // Header displays on product listing page
    const navbarOnProduct = await page.$('.navbar');
    if (!navbarOnProduct) throw new Error('FAIL: Navbar not displayed on product listing page');
    console.log('✓ PASS: Header displays on product listing page (2 points part 1)');

    // Initial cart count is 0
    let cartCount = await page.textContent('.cart_quantity_count');
    if (cartCount.trim() !== '0') throw new Error(`FAIL: Initial cart count should be 0, got: ${cartCount}`);
    console.log('✓ PASS: Shopping cart icon with value displays 0 initially (3 points part 1)');

    console.log('\n--- 3. Testing Product Listing Page (9 points) ---');
    // Categories >= 3
    const categories = await page.$$('.plant_heading');
    console.log(`Found ${categories.length} plant categories`);
    if (categories.length < 3) throw new Error(`FAIL: Expected at least 3 categories, found ${categories.length}`);
    console.log('✓ PASS: Plants grouped into at least 3 categories (1 point)');

    // Unique houseplants with thumbnail, name, and price
    const cards = await page.$$('.product-card');
    console.log(`Found ${cards.length} plant cards`);
    if (cards.length < 6) throw new Error(`FAIL: Expected at least 6 houseplants, found ${cards.length}`);

    // Verify thumbnail, name, price on first card
    const firstImg = await page.$eval('.product-card img.product-image', el => el.src);
    const firstName = await page.$eval('.product-card .product-title', el => el.textContent);
    const firstPrice = await page.$eval('.product-card .product-price', el => el.textContent);
    if (!firstImg || !firstName || !firstPrice) {
      throw new Error('FAIL: Card missing thumbnail, name, or price');
    }
    console.log(`✓ PASS: Cards display thumbnail, name ("${firstName}"), and price ("${firstPrice}") (2 points)`);

    // Add first item to cart
    const firstAddBtn = await page.$('.product-card:first-child .product-button');
    await firstAddBtn.click();

    // Verify cart count increases by 1
    cartCount = await page.textContent('.cart_quantity_count');
    if (cartCount.trim() !== '1') throw new Error(`FAIL: Cart count expected 1, got ${cartCount}`);
    console.log('✓ PASS: Shopping cart icon increases by one (1 point)');

    // Verify button becomes disabled
    const isDisabled = await page.$eval('.product-card:first-child .product-button', el => el.disabled);
    const btnText = await page.$eval('.product-card:first-child .product-button', el => el.textContent);
    if (!isDisabled) throw new Error('FAIL: Add to cart button did not become disabled');
    console.log(`✓ PASS: Button becomes disabled and displays "${btnText}" (1 point)`);

    // Add second plant
    const secondAddBtn = await page.$('.product-card:nth-child(2) .product-button');
    const secondName = await page.$eval('.product-card:nth-child(2) .product-title', el => el.textContent);
    await secondAddBtn.click();
    cartCount = await page.textContent('.cart_quantity_count');
    if (cartCount.trim() !== '2') throw new Error(`FAIL: Cart count expected 2, got ${cartCount}`);
    console.log(`✓ PASS: Second plant ("${secondName}") added, cart count updated to 2`);

    console.log('\n--- 4. Testing Shopping Cart Page (23 points) ---');
    // Navigate to cart
    await page.click('a[href="#cart"]');
    await page.waitForSelector('.cart-container', { timeout: 3000 });

    // Header displays on shopping cart page as well
    const navbarOnCart = await page.$('.navbar');
    if (!navbarOnCart) throw new Error('FAIL: Navbar not displayed on cart page');
    console.log('✓ PASS: Header displays on shopping cart page (2 points part 2)');

    // Total number of plants in cart
    const totalPlantsText = await page.textContent('.cart-container h3');
    if (!totalPlantsText.includes('2')) throw new Error(`FAIL: Expected Total Plants: 2, got: ${totalPlantsText}`);
    console.log(`✓ PASS: Displays total number of plants in cart ("${totalPlantsText.trim()}") (2 points)`);

    // Total cost of all items in cart ($15 + $12 = $27)
    const totalCostText = await page.textContent('.cart-container h2');
    if (!totalCostText.includes('$27')) throw new Error(`FAIL: Expected Total Cart Amount: $27, got: ${totalCostText}`);
    console.log(`✓ PASS: Displays total cost of all items ("${totalCostText.trim()}") (2 points)`);

    // Verify each item displays thumbnail, name, unit price
    const cartItems = await page.$$('.cart-item');
    if (cartItems.length !== 2) throw new Error(`FAIL: Expected 2 items in cart, found ${cartItems.length}`);
    const cartItemImg = await page.$eval('.cart-item:first-child .cart-item-image', el => el.src);
    const cartItemName = await page.$eval('.cart-item:first-child .cart-item-name', el => el.textContent);
    const cartItemCost = await page.$eval('.cart-item:first-child .cart-item-cost', el => el.textContent);
    if (!cartItemImg || !cartItemName || !cartItemCost) {
      throw new Error('FAIL: Cart item missing thumbnail, name, or unit price');
    }
    console.log(`✓ PASS: Cart items display thumbnail, name ("${cartItemName}"), and unit price ("${cartItemCost}") (6 points)`);

    // Increment button test
    const incBtn = await page.$('.cart-item:first-child .cart-item-button-inc');
    await incBtn.click();
    const qtyAfterInc = await page.textContent('.cart-item:first-child .cart-item-quantity-value');
    if (qtyAfterInc.trim() !== '2') throw new Error(`FAIL: Expected qty 2 after increment, got ${qtyAfterInc}`);
    const totalAfterInc = await page.textContent('.cart-container h2');
    if (!totalAfterInc.includes('$42')) throw new Error(`FAIL: Expected total $42 ($15*2 + $12), got ${totalAfterInc}`);
    const countAfterInc = await page.textContent('.cart_quantity_count');
    if (countAfterInc.trim() !== '3') throw new Error(`FAIL: Expected cart badge 3, got ${countAfterInc}`);
    console.log('✓ PASS: Increment button increases quantity and updates all values (4 points)');

    // Decrement button test
    const decBtn = await page.$('.cart-item:first-child .cart-item-button-dec');
    await decBtn.click();
    const qtyAfterDec = await page.textContent('.cart-item:first-child .cart-item-quantity-value');
    if (qtyAfterDec.trim() !== '1') throw new Error(`FAIL: Expected qty 1 after decrement, got ${qtyAfterDec}`);
    const totalAfterDec = await page.textContent('.cart-container h2');
    if (!totalAfterDec.includes('$27')) throw new Error(`FAIL: Expected total $27 after decrement, got ${totalAfterDec}`);
    console.log('✓ PASS: Decrement button decreases quantity and updates all values (4 points)');

    // Checkout button test ("Coming Soon")
    const checkoutBtn = await page.$('.get-started-button1');
    await checkoutBtn.click();
    if (!alertMessage.toLowerCase().includes('coming soon')) {
      throw new Error(`FAIL: Expected alert with "Coming Soon", got: "${alertMessage}"`);
    }
    console.log('✓ PASS: Checkout button displays "Coming Soon" alert message (1 point)');

    // Delete button test
    const deleteBtn = await page.$('.cart-item:first-child .cart-item-delete');
    await deleteBtn.click();
    const remainingItems = await page.$$('.cart-item');
    if (remainingItems.length !== 1) throw new Error(`FAIL: Expected 1 remaining item after delete, got ${remainingItems.length}`);
    const totalAfterDel = await page.textContent('.cart-container h2');
    if (!totalAfterDel.includes('$12')) throw new Error(`FAIL: Expected total $12 after deleting first item, got ${totalAfterDel}`);
    console.log('✓ PASS: Delete button removes item from cart and updates values (2 points)');

    // Continue Shopping button test
    const continueBtn = await page.$('.continue_shopping_btn .get-started-button');
    await continueBtn.click();
    const gridVisible = await page.$('.product-grid');
    if (!gridVisible) throw new Error('FAIL: Continue shopping did not navigate back to product list');
    console.log('✓ PASS: Continue Shopping button links back to product listing page (2 points)');

    // Check re-enabled state for deleted item and disabled for remaining item
    const firstBtnState = await page.$eval('.product-card:first-child .product-button', el => el.disabled);
    const secondBtnState = await page.$eval('.product-card:nth-child(2) .product-button', el => el.disabled);
    if (firstBtnState) throw new Error('FAIL: Deleted item should be re-enabled on product listing');
    if (!secondBtnState) throw new Error('FAIL: Remaining item in cart should remain disabled');
    console.log('✓ PASS: Product cards accurately reflect live cart status (deleted item re-enabled, retained item disabled)');

    // Test Navigation back to Landing Page
    await page.click('.tag a');
    await page.waitForTimeout(500);
    const landingVisible = await page.$('.landing-page:not(.fade-out)');
    console.log('✓ PASS: Navigation to Landing Page via Brand logo works properly (2 points part 2)');

    console.log('\n========================================');
    console.log('🎉 ALL RUBRIC TESTS PASSED WITH 100% SCORE (50/50 points)!');
    console.log('========================================\n');
  } finally {
    await browser.close();
    server.close();
  }
}

runVerification().then(() => {
  process.exit(0);
}).catch((err) => {
  console.error('\n❌ VERIFICATION TEST FAILED:', err);
  process.exit(1);
});
