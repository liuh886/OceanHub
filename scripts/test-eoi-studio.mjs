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

  // 1. Verify Default CCS Scoper and EOI Generation
  await scoper.getByRole('heading', { name: 'Build a traceable offshore CCS evidence plan' }).waitFor();

  await scoper.locator('#scoper-stage').selectOption('monitoring');
  await scoper.locator('#scoper-focus').selectOption('containment');

  await eoi.locator('#eoi-project-context').fill('Gulf of Thailand · 80 m water depth · Pre-FEED');
  await eoi.getByRole('button', { name: 'Generate supplier EOI & shortlist' }).click();

  const ccsEoiText = await eoi.locator('#project-eoi-text').textContent();
  assert(ccsEoiText?.includes('ISO 27914:2026'), 'Generated CCS EOI did not carry ISO 27914 standard.');
  assert(ccsEoiText?.includes('HSE & Operational Safety Standards'), 'Generated EOI did not carry HSE procurement clause.');
  assert(ccsEoiText?.includes('Classification & Technical Verification'), 'Generated EOI did not carry Classification clause.');

  // Test Tab Switch to Comparison Matrix
  const btnMatrix = page.locator('#view-eoi-matrix');
  await btnMatrix.click();
  const matrixPanel = page.locator('#eoi-panel-matrix');
  assert(await matrixPanel.isVisible(), 'Comparison Matrix panel did not become visible upon tab switch.');

  const matrixHeader = await page.locator('#matrix-header-row').textContent();
  assert(matrixHeader?.includes('TGS') || matrixHeader?.includes('SLB'), 'Matrix header missing candidate providers.');

  // 2. Test Phase 3: Multi-Archetype Switch to Floating Offshore Wind
  await scoper.locator('#scoper-archetype').selectOption('floating-offshore-wind');
  await scoper.getByRole('heading', { name: 'Build a traceable floating offshore wind evidence plan' }).waitFor();

  await scoper.locator('#scoper-stage').selectOption('construction');
  await scoper.locator('#scoper-focus').selectOption('floating-wind');

  await eoi.locator('#eoi-project-context').fill('Utsira Nord · 280 m water depth · Floating Wind EPCI');
  await eoi.getByRole('button', { name: 'Generate supplier EOI & shortlist' }).click();

  const windEoiText = await eoi.locator('#project-eoi-text').textContent();
  assert(windEoiText?.includes('Floating Offshore Wind'), 'Generated EOI did not reflect Floating Offshore Wind archetype.');
  assert(windEoiText?.includes('DNV-ST-0119') || windEoiText?.includes('IEC 61400-3-2'), 'Floating wind EOI missing DNV-ST-0119 or IEC standard.');
  assert(windEoiText?.includes('floating-structures') || windEoiText?.includes('mooring-engineering'), 'Floating wind EOI missing canonical floating capabilities.');

  // 3. Test Phase 3: Switch to Subsea Infrastructure & Corridors
  await scoper.locator('#scoper-archetype').selectOption('subsea-corridor');
  await scoper.getByRole('heading', { name: 'Build a traceable subsea infrastructure evidence plan' }).waitFor();

  await scoper.locator('#scoper-stage').selectOption('feed');
  await scoper.locator('#scoper-focus').selectOption('route');

  await eoi.locator('#eoi-project-context').fill('Storegga Slide Corridor · 850 m water depth · Deepwater Route');
  await eoi.getByRole('button', { name: 'Generate supplier EOI & shortlist' }).click();

  const subseaEoiText = await eoi.locator('#project-eoi-text').textContent();
  assert(subseaEoiText?.includes('Subsea Infrastructure & Corridors'), 'Generated EOI did not reflect Subsea Corridor archetype.');
  assert(subseaEoiText?.includes('pipeline-route-engineering') || subseaEoiText?.includes('marine-geophysics'), 'Subsea EOI missing route engineering capabilities.');

  console.log(`OceanHub Multi-Archetype EOI Studio & Comparison Matrix tests passed against ${scopeUrl}`);
} finally {
  await browser.close();
}
