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
  await scoper.locator('#scoper-stage').selectOption('monitoring');
  await scoper.locator('#scoper-focus').selectOption('containment');
  await eoi.locator('#eoi-project-context').fill('Gulf of Thailand · monitoring scope');
  await eoi.locator('#eoi-water-depth').selectOption('shallow');
  await eoi.locator('#eoi-delivery-region').selectOption('APAC');
  await eoi.getByRole('button', { name: 'Generate supplier EOI & shortlist' }).click();

  const ccsEoiText = await eoi.locator('#project-eoi-text').textContent();
  assert(ccsEoiText?.includes('ISO 27914:2026'), 'Generated CCS EOI did not carry ISO 27914 reference metadata.');
  assert(ccsEoiText?.includes('HSE & operational safety'), 'Generated EOI did not carry the HSE procurement gate.');
  assert(ccsEoiText?.includes('Classification & technical verification'), 'Generated EOI did not carry the classification gate.');
  assert(ccsEoiText?.includes('Water-depth tier: Shallow'), 'Generated EOI did not carry the structured water-depth constraint.');
  assert(ccsEoiText?.includes('Delivery region: APAC'), 'Generated EOI did not carry the structured delivery-region constraint.');
  assert(!ccsEoiText?.includes('Desirable / Value-Add Capabilities'), 'Superseded desirable capability tier returned to the EOI.');
  assert(ccsEoiText?.includes('verify against the official publication'), 'Standards output did not preserve the official-publication verification boundary.');

  await page.locator('#view-eoi-matrix').click();
  const matrixPanel = page.locator('#eoi-panel-matrix');
  assert(await matrixPanel.isVisible(), 'Comparison Matrix panel did not become visible.');
  const matrixHeader = await page.locator('#matrix-header-row').textContent();
  assert(matrixHeader?.includes('TGS') || matrixHeader?.includes('SLB'), 'Matrix header missing candidate providers.');
  assert(!matrixHeader?.includes('Tier'), 'Superseded mandatory/desirable tier column returned to the matrix.');

  await scoper.locator('#scoper-archetype').selectOption('floating-offshore-wind');
  await scoper.getByRole('heading', { name: 'Build a traceable floating offshore wind evidence plan' }).waitFor();
  await scoper.locator('#scoper-stage').selectOption('construction');
  await scoper.locator('#scoper-focus').selectOption('floating-wind');
  await eoi.locator('#eoi-water-depth').selectOption('deepwater');
  await eoi.locator('#eoi-delivery-region').selectOption('North Sea');
  await eoi.getByRole('button', { name: 'Generate supplier EOI & shortlist' }).click();

  const windEoiText = await eoi.locator('#project-eoi-text').textContent();
  assert(windEoiText?.includes('Floating offshore wind'), 'Generated EOI did not reflect the floating-wind archetype.');
  assert(windEoiText?.includes('DNV-ST-0119') || windEoiText?.includes('IEC 61400-3-2'), 'Floating-wind EOI missing a canonical engineering reference.');
  assert(windEoiText?.includes('floating-structures') || windEoiText?.includes('mooring-engineering'), 'Floating-wind EOI missing canonical floating capabilities.');

  await scoper.locator('#scoper-archetype').selectOption('subsea-corridor');
  await scoper.getByRole('heading', { name: 'Build a traceable subsea infrastructure evidence plan' }).waitFor();
  await scoper.locator('#scoper-stage').selectOption('feed');
  await scoper.locator('#scoper-focus').selectOption('route');
  await eoi.locator('#eoi-water-depth').selectOption('deepwater');
  await eoi.getByRole('button', { name: 'Generate supplier EOI & shortlist' }).click();

  const subseaEoiText = await eoi.locator('#project-eoi-text').textContent();
  assert(subseaEoiText?.includes('Subsea infrastructure & corridors'), 'Generated EOI did not reflect the subsea-corridor archetype.');
  assert(subseaEoiText?.includes('pipeline-route-engineering') || subseaEoiText?.includes('marine-geophysics'), 'Subsea EOI missing route-engineering capabilities.');

  console.log(`OceanHub constraint-aware multi-archetype EOI Studio contract passed against ${scopeUrl}`);
} finally {
  await browser.close();
}
