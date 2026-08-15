import { chromium } from 'playwright';

function normalizeBaseUrl(value) {
  const url = new URL(value);
  if (!url.pathname.endsWith('/')) url.pathname += '/';
  url.search = '';
  url.hash = '';
  return url.href;
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const origin = process.env.OCEANHUB_TEST_ORIGIN ?? 'http://127.0.0.1:4321';
const base = normalizeBaseUrl(process.env.OCEANHUB_TEST_BASE_URL ?? `${origin.replace(/\/+$/, '')}/OceanHub/`);
const scopeUrl = new URL('scope/', base).href;

const browser = await chromium.launch();

try {
  const lightContext = await browser.newContext({ colorScheme: 'light', viewport: { width: 1280, height: 800 } });
  const page = await lightContext.newPage();
  await page.goto(base, { waitUntil: 'networkidle' });

  assert(await page.evaluate(() => document.documentElement.dataset.theme) === 'light', 'First visit did not follow the OS light preference.');
  assert(await page.evaluate(() => localStorage.getItem('oceanhub-theme')) === null, 'System-derived theme was incorrectly persisted as an explicit user choice.');
  assert(await page.locator('meta[name="theme-color"]').getAttribute('content') === '#F5F8FC', 'Light theme did not update the browser theme-color.');

  const lightBodyBackground = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  const lightHeading = await page.locator('h1').first().evaluate((element) => getComputedStyle(element).color);
  assert(lightBodyBackground === 'rgb(245, 248, 252)', `Light canvas color is incorrect: ${lightBodyBackground}`);
  assert(lightHeading === 'rgb(15, 23, 42)', `Light heading contrast is incorrect: ${lightHeading}`);

  const desktopToggle = page.locator('[data-theme-toggle][data-theme-variant="icon"]');
  assert(await desktopToggle.getAttribute('aria-label') === 'Switch to dark theme', 'Theme toggle did not expose the next dark-theme action.');
  await desktopToggle.click();

  assert(await page.evaluate(() => document.documentElement.dataset.theme) === 'dark', 'Desktop theme toggle did not switch to dark.');
  assert(await page.evaluate(() => localStorage.getItem('oceanhub-theme')) === 'dark', 'Dark preference was not persisted.');
  assert(await page.locator('meta[name="theme-color"]').getAttribute('content') === '#040812', 'Dark theme did not restore the browser theme-color.');

  await page.goto(scopeUrl, { waitUntil: 'networkidle' });
  assert(await page.evaluate(() => document.documentElement.dataset.theme) === 'dark', 'Theme preference did not persist across navigation.');
  assert(await page.locator('[data-theme-toggle][data-theme-variant="icon"]').getAttribute('aria-label') === 'Switch to light theme', 'Dark page toggle did not expose the next light-theme action.');

  await page.locator('[data-theme-toggle][data-theme-variant="icon"]').click();
  assert(await page.evaluate(() => localStorage.getItem('oceanhub-theme')) === 'light', 'Light preference was not persisted after explicit toggle.');
  await page.reload({ waitUntil: 'networkidle' });
  assert(await page.evaluate(() => document.documentElement.dataset.theme) === 'light', 'Explicit light preference did not survive reload.');

  const scoper = page.locator('#decision-scoper-root');
  await scoper.waitFor();
  const scoperBackground = await scoper.evaluate((element) => getComputedStyle(element).backgroundColor);
  const scoperSelectBackground = await page.locator('#scoper-stage').evaluate((element) => getComputedStyle(element).backgroundColor);
  assert(scoperBackground === 'rgb(255, 255, 255)', `Decision Scoper did not translate to a light surface: ${scoperBackground}`);
  assert(scoperSelectBackground === 'rgb(255, 255, 255)', `Decision Scoper form control did not translate to a light surface: ${scoperSelectBackground}`);

  await lightContext.close();

  const mobileContext = await browser.newContext({ colorScheme: 'dark', viewport: { width: 390, height: 844 } });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto(base, { waitUntil: 'networkidle' });
  await mobilePage.locator('#mobile-menu-toggle').click();
  const mobileToggle = mobilePage.locator('[data-theme-toggle][data-theme-variant="row"]');
  await mobileToggle.waitFor({ state: 'visible' });
  assert(await mobileToggle.getAttribute('aria-label') === 'Switch to light theme', 'Mobile theme control does not match the desktop theme semantics.');
  await mobileToggle.click();
  assert(await mobilePage.evaluate(() => document.documentElement.dataset.theme) === 'light', 'Mobile theme control did not switch to light.');
  const overflow = await mobilePage.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  assert(overflow <= 1, `Theme controls introduced horizontal mobile overflow: ${overflow}px`);
  await mobileContext.close();

  console.log(`OceanHub light/dark theme contract passed against ${base}`);
} finally {
  await browser.close();
}
