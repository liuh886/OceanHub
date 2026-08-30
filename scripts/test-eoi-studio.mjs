import { chromium } from 'playwright';

function normalizeBaseUrl(value) {
  const url = new URL(value);
  if (!url.pathname.endsWith('/')) url.pathname += '/';
  url.search = '';
  url.hash = '';
  return url.href;
}

const origin = process.env.OCEANHUB_TEST_ORIGIN ?? 'http://127.0.0.1:4321';
const base = normalizeBaseUrl(process.env.OCEANHUB_TEST_BASE_URL ?? `${origin.replace(/\/+$/, '')}/OceanHub/`);
const scopeUrl = new URL('scope/', base).href;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const browser = await chromium.launch();
const page = await browser.newPage();

try {
  await page.goto(scopeUrl, { waitUntil: 'networkidle' });
  const scoper = page.locator('#decision-scoper-root');
  const eoi = page.locator('#project-eoi-builder');

  await scoper.getByRole('heading', { name: 'Build a traceable offshore CCS evidence plan' }).waitFor();

  // Select Monitoring -> Containment
  await scoper.locator('#scoper-stage').selectOption('monitoring');
  await scoper.locator('#scoper-focus').selectOption('containment');

  // Fill Project context & Click Generate
  await eoi.locator('#eoi-project-context').fill('Gulf of Thailand · 80 m water depth · Pre-FEED');
  await eoi.getByRole('button', { name: 'Generate supplier EOI & shortlist' }).click();

  // Verify EOI Specification view
  const eoiText = await eoi.locator('#project-eoi-text').textContent();
  assert(eoiText?.includes('ISO 27914:2026'), 'Generated EOI did not carry ISO 27914 standard.');
  assert(eoiText?.includes('HSE & Operational Safety Standards'), 'Generated EOI did not carry HSE procurement clause.');
  assert(eoiText?.includes('Classification & Technical Verification'), 'Generated EOI did not carry Classification clause.');

  // Test Tab Switch to Comparison Matrix
  const btnMatrix = page.locator('#view-eoi-matrix');
  await btnMatrix.click();
  const matrixPanel = page.locator('#eoi-panel-matrix');
  assert(await matrixPanel.isVisible(), 'Comparison Matrix panel did not become visible upon tab switch.');

  const matrixHeader = await page.locator('#matrix-header-row').textContent();
  assert(matrixHeader?.includes('TGS') || matrixHeader?.includes('SLB'), 'Matrix header missing candidate providers.');

  console.log(`OceanHub EOI Studio & Comparison Matrix test passed against ${scopeUrl}`);
} finally {
  await browser.close();
}
