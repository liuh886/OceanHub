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
const capabilitiesUrl = new URL('capabilities/', base).href;
const jipsUrl = new URL('jips/', base).href;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const browser = await chromium.launch();
const page = await browser.newPage();

try {
  await page.goto(capabilitiesUrl, { waitUntil: 'networkidle' });
  await page.getByRole('heading', { name: 'Delivery capabilities, not vendor labels.' }).waitFor();

  const capabilityCount = await page.locator('[data-capability]').count();
  assert(capabilityCount >= 45, `Expected a broad canonical capability registry, found ${capabilityCount}.`);

  for (const id of ['marine-geophysics', 'underwater-acoustics', 'subsea-integrity-engineering', 'ccs-well-engineering']) {
    await page.locator(`#${id}`).waitFor();
    const caseCount = Number(await page.locator(`#${id}`).getAttribute('data-case-count'));
    assert(caseCount > 0, `${id} is not linked to any reference case.`);
  }

  const das = page.locator('#distributed-fiber-sensing');
  await das.waitFor();
  assert(Number(await das.getAttribute('data-jip-count')) > 0, 'Distributed fiber sensing is not linked to its proposed JIP.');

  const navHref = await page.getByRole('link', { name: 'Solutions / Capabilities' }).first().getAttribute('href');
  assert(navHref?.endsWith('/capabilities/'), `Primary capability navigation does not target the registry: ${navHref}`);

  await page.goto(jipsUrl, { waitUntil: 'networkidle' });
  const capabilityHref = await page.getByRole('link', { name: /Distributed fiber-optic sensing/ }).getAttribute('href');
  assert(capabilityHref?.includes('/capabilities/#distributed-fiber-sensing'), `JIP capability deep-link is incorrect: ${capabilityHref}`);

  console.log(`OceanHub capability library contract passed against ${capabilitiesUrl}`);
} finally {
  await browser.close();
}
