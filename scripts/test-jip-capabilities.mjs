import { chromium } from 'playwright';

function normalizeBaseUrl(value) {
  const url = new URL(value);
  if (!url.pathname.endsWith('/')) url.pathname += '/';
  url.search = '';
  url.hash = '';
  return url.href;
}

const origin = process.env.OCEANHUB_TEST_ORIGIN ?? 'http://127.0.0.1:4321';
const base = normalizeBaseUrl(
  process.env.OCEANHUB_TEST_BASE_URL ?? `${origin.replace(/\/+$/, '')}/OceanHub/`
);
const jipsUrl = new URL('jips/', base).href;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const browser = await chromium.launch();
const page = await browser.newPage();

try {
  await page.goto(jipsUrl, { waitUntil: 'networkidle' });
  await page.getByRole('heading', { name: 'Proposed JIPs built around real capability gaps.' }).waitFor();

  const pageText = await page.locator('main').textContent();
  assert(!pageText?.includes('ACTIVE CONSORTIUM FORMATION'), 'Legacy active-consortium claim returned to the JIP surface.');
  assert(!pageText?.includes('ACTIVE PROPOSAL'), 'Legacy active-proposal claim returned to the JIP surface.');
  assert(!pageText?.match(/TRL\s+\d/i), 'Unsubstantiated TRL precision returned to the JIP surface.');
  assert(!pageText?.match(/\b\d+%\b/), 'Arbitrary progress percentage returned to the JIP surface.');

  for (const id of [
    'ccus-4d-mrv',
    'floating-wind-foundations',
    'low-impact-acoustics',
    'subsea-energy-corridors'
  ]) {
    await page.locator(`#${id}`).waitFor();
  }

  await page.getByText('Seeking Technical Partners', { exact: true }).waitFor();
  await page.getByText('Scope Development', { exact: true }).waitFor();
  await page.getByText('Seeking Co-sponsors', { exact: true }).waitFor();
  await page.getByText('Concept / Problem Framing', { exact: true }).waitFor();

  const capabilityHeadings = await page.getByRole('heading', { name: 'Capabilities sought' }).count();
  assert(capabilityHeadings === 4, `Expected four capability sections, found ${capabilityHeadings}.`);

  console.log(`OceanHub proposed JIP capability contract passed against ${jipsUrl}`);
} finally {
  await browser.close();
}
