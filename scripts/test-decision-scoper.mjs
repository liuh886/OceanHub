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

  const initialText = await scoper.textContent();
  assert(!initialText?.includes('EVIDENCE READINESS INDEX'), 'Unsupported readiness score returned to the Scoper.');
  assert(!initialText?.includes('DECISION ALGORITHM V2.4'), 'Decorative algorithm-version claim returned to the Scoper.');
  assert(!initialText?.includes('Save Scoping to Briefcase'), 'Deprecated Briefcase action returned to the Scoper flow.');

  await scoper.locator('#scoper-stage').selectOption('pre-feed');
  await scoper.locator('#scoper-focus').selectOption('all');
  await scoper.getByText('1 evidence workstream from 1 reference pattern.', { exact: true }).waitFor();
  await scoper.getByRole('heading', { name: 'Northern Lights Aurora — reservoir and seal characterization' }).waitFor();
  assert((await scoper.locator('[data-scoper-requirement]').count()) === 1, 'Pre-FEED plan did not render the expected evidence workstream.');

  await eoi.locator('#eoi-project-context').fill('Gulf of Thailand · 80 m water depth · Pre-FEED');
  await eoi.getByRole('button', { name: 'Generate supplier EOI & shortlist' }).click();
  await eoi.getByRole('heading', { name: 'Project EOI draft' }).waitFor();
  const preFeedEoiText = await eoi.locator('#project-eoi-text').textContent();
  assert(preFeedEoiText?.includes('Gulf of Thailand · 80 m water depth · Pre-FEED'), 'Generated EOI did not preserve the project / region note.');
  assert(preFeedEoiText?.includes('petrophysics-well-testing — Petrophysics and well testing'), 'Generated EOI did not include the canonical petrophysics capability.');
  assert(preFeedEoiText?.includes('reservoir-characterization — Reservoir and storage characterization'), 'Generated EOI did not include the canonical reservoir capability.');
  assert(preFeedEoiText?.includes('ISO 27914:2026'), 'Generated EOI did not carry engineering references from the evidence plan.');

  const slbMatch = eoi.locator('[data-provider-match="slb"]');
  await slbMatch.waitFor();
  assert((await slbMatch.getAttribute('data-match-count')) === '3', 'SLB did not match all three Pre-FEED canonical capability requirements.');
  const slbText = await slbMatch.textContent();
  assert(slbText?.includes('3 of 3 required capabilities'), 'Provider rationale did not expose exact capability coverage.');
  assert(slbText?.includes('Public-source mapped · not OceanHub reviewed'), 'Public market provider was not clearly separated from OceanHub-reviewed assertions.');
  const shortlistText = await eoi.locator('#provider-shortlist').textContent();
  assert(!/\bstar rating\b/i.test(shortlistText ?? ''), 'Supplier star-rating language leaked into OceanHub provider matching.');
  assert(!/\bverified partner\b/i.test(shortlistText ?? ''), 'Unsupported verified-partner language leaked into OceanHub provider matching.');

  await scoper.locator('#scoper-stage').selectOption('monitoring');
  await scoper.locator('#scoper-focus').selectOption('containment');
  await scoper.getByText('1 evidence workstream from 1 reference pattern.', { exact: true }).waitFor();
  await scoper.getByRole('heading', { name: 'Sleipner — plume migration and containment monitoring' }).waitFor();
  await scoper.getByRole('link', { name: 'Greenhouse store staying sealed' }).first().waitFor();
  await eoi.locator('[data-eoi-capability="time-lapse-seismic"]').waitFor();
  assert((await eoi.locator('[data-eoi-capability="petrophysics-well-testing"]').count()) === 0, 'EOI retained stale Pre-FEED capability requirements after Scoper changed.');
  const containmentEoiText = await eoi.locator('#project-eoi-text').textContent();
  assert(containmentEoiText?.includes('time-lapse-seismic — Time-lapse / 4D seismic'), 'EOI did not regenerate for containment monitoring.');
  await eoi.locator('[data-provider-match="tgs"]').waitFor();

  await scoper.locator('#scoper-focus').selectOption('induced-seismicity');
  await scoper.getByText('1 evidence workstream from 1 reference pattern.', { exact: true }).waitFor();
  await scoper.getByRole('heading', { name: 'Northern Lights Aurora — injection readiness, seismicity surveillance and MRV' }).waitFor();
  assert((await scoper.locator('[data-scoper-requirement]').count()) === 1, 'Evidence-level focus filtering returned unrelated Aurora workstreams.');

  await scoper.locator('#scoper-stage').selectOption('pre-feed');
  await scoper.getByText('No direct public reference pattern is encoded for this combination yet.', { exact: true }).waitFor();
  await scoper.getByRole('heading', { name: 'Evidence gap, not a fabricated recommendation' }).waitFor();
  await eoi.getByText('No source-backed evidence plan exists for the active Scoper selection, so OceanHub will not fabricate an EOI or supplier shortlist.', { exact: true }).waitFor();

  console.log(`OceanHub Decision Scoper + supplier EOI contract passed against ${scopeUrl}`);
} finally {
  await browser.close();
}
