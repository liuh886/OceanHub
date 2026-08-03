import { chromium } from 'playwright';

const origin = process.env.OCEANHUB_TEST_ORIGIN ?? 'http://127.0.0.1:4321';
const base = `${origin}/OceanHub/`;
const focusUrl = `${base}focus-areas/ccus/`;
const insightUrl = `${base}insights/ccs-monitoring-trends/`;
const briefcaseUrl = `${base}briefcase/`;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const browser = await chromium.launch();
const context = await browser.newContext({ serviceWorkers: 'allow' });
const page = await context.newPage();

try {
  await page.goto(focusUrl, { waitUntil: 'networkidle' });
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.locator('[data-offline-save-button]').click();
  await page.locator('[data-offline-save-label]').filter({ hasText: 'Saved offline' }).waitFor();

  await page.goto(insightUrl, { waitUntil: 'networkidle' });
  await page.locator('[data-offline-save-button]').click();
  await page.locator('[data-offline-save-label]').filter({ hasText: 'Saved offline' }).waitFor();

  await page.goto(briefcaseUrl, { waitUntil: 'networkidle' });
  await page.getByText('2 saved items', { exact: true }).waitFor();
  await page.getByRole('heading', { name: 'CCUS Storage Evidence Pathway' }).waitFor();
  await page.getByRole('heading', { name: 'From Monitoring Data to Decision-Ready CCUS Evidence' }).waitFor();

  await page.evaluate(() => {
    const key = 'oceanhub-briefcase-v1';
    const items = JSON.parse(localStorage.getItem(key) ?? '[]');
    if (items[0]) items[0].version = 'stale-version';
    localStorage.setItem(key, JSON.stringify(items));
  });
  await page.reload({ waitUntil: 'networkidle' });
  await page.getByText('Update available', { exact: true }).first().waitFor();
  await page.getByRole('button', { name: 'Download update' }).first().click();
  await page.getByText('Update available', { exact: true }).waitFor({ state: 'detached' });

  await context.setOffline(true);
  await page.goto(focusUrl, { waitUntil: 'domcontentloaded' });
  const offlineHeading = await page.locator('h1').first().textContent();
  assert(offlineHeading?.includes('CCUS Storage Evidence Pathway'), 'Saved focus area did not open while offline.');

  await page.goto(insightUrl, { waitUntil: 'domcontentloaded' });
  const offlineInsightHeading = await page.locator('h1').first().textContent();
  assert(offlineInsightHeading?.includes('From Monitoring Data to Decision-Ready CCUS Evidence'), 'Saved insight did not open while offline.');

  await context.setOffline(false);
  await page.goto(briefcaseUrl, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Clear all saved content' }).click();
  await page.getByRole('heading', { name: 'Nothing saved yet' }).waitFor();
  await page.getByText('0 saved items', { exact: true }).waitFor();

  console.log('OceanHub offline briefcase browser workflow passed.');
} finally {
  await context.setOffline(false).catch(() => {});
  await browser.close();
}
