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
  await scoper.getByRole('heading', { name: 'Build a traceable offshore CCS evidence plan' }).waitFor();

  const initialText = await scoper.textContent();
  assert(!initialText?.includes('EVIDENCE READINESS INDEX'), 'Unsupported readiness score returned to the Scoper.');
  assert(!initialText?.includes('DECISION ALGORITHM V2.4'), 'Decorative algorithm-version claim returned to the Scoper.');
  assert(!initialText?.includes('Save Scoping to Briefcase'), 'Deprecated Briefcase action returned to the Scoper flow.');

  await scoper.locator('#scoper-stage').selectOption('pre-feed');
  await scoper.locator('#scoper-focus').selectOption('all');
  await scoper.getByText('1 evidence workstream from 1 reference pattern.', { exact: true }).waitFor();
  await scoper.getByRole('heading', { name: 'Northern Lights Aurora — reservoir and seal characterization' }).waitFor();
  assert((await scoper.locator('[data-scoper-requirement]').count()) === 1, 'Pre-FEED plan did not render the expected evidence workstream.');

  await scoper.locator('#scoper-stage').selectOption('monitoring');
  await scoper.locator('#scoper-focus').selectOption('containment');
  await scoper.getByText('1 evidence workstream from 1 reference pattern.', { exact: true }).waitFor();
  await scoper.getByRole('heading', { name: 'Sleipner — plume migration and containment monitoring' }).waitFor();
  await scoper.getByRole('link', { name: 'Greenhouse store staying sealed' }).first().waitFor();

  await scoper.locator('#scoper-focus').selectOption('induced-seismicity');
  await scoper.getByText('1 evidence workstream from 1 reference pattern.', { exact: true }).waitFor();
  await scoper.getByRole('heading', { name: 'Northern Lights Aurora — injection readiness, seismicity surveillance and MRV' }).waitFor();
  assert((await scoper.locator('[data-scoper-requirement]').count()) === 1, 'Evidence-level focus filtering returned unrelated Aurora workstreams.');

  await scoper.locator('#scoper-stage').selectOption('pre-feed');
  await scoper.getByText('No direct public reference pattern is encoded for this combination yet.', { exact: true }).waitFor();
  await scoper.getByRole('heading', { name: 'Evidence gap, not a fabricated recommendation' }).waitFor();

  console.log(`OceanHub Decision Scoper product contract passed against ${scopeUrl}`);
} finally {
  await browser.close();
}
