import { chromium } from 'playwright';

const origin = process.env.OCEANHUB_TEST_BASE_URL ?? 'http://127.0.0.1:4321/OceanHub/';
const base = origin.endsWith('/') ? origin : `${origin}/`;
const browser = await chromium.launch();
const page = await browser.newPage();

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

try {
  await page.goto(new URL('references/', base).href, { waitUntil: 'networkidle' });
  await page.getByRole('heading', { name: 'The references behind the evidence plan.' }).waitFor();
  const count = await page.locator('[data-engineering-reference]').count();
  assert(count >= 28, `Expected at least 28 canonical engineering references, found ${count}.`);
  await page.getByRole('link', { name: /ISO 27914:2026/ }).waitFor();
  await page.getByRole('link', { name: /IHO S-44/ }).waitFor();
  await page.getByText('current revision pending', { exact: true }).waitFor();

  await page.goto(new URL('jips/', base).href, { waitUntil: 'networkidle' });
  assert((await page.locator('[data-engineering-reference]').count()) > 0, 'JIP scopes did not resolve canonical engineering references.');

  await page.goto(new URL('scope/', base).href, { waitUntil: 'networkidle' });
  await page.getByText('Engineering references', { exact: true }).first().waitFor();

  console.log('OceanHub Engineering Reference Library contract passed.');
} finally {
  await browser.close();
}
