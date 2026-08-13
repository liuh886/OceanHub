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
const route = (path = '') => new URL(path, base).href;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const browser = await chromium.launch();
const page = await browser.newPage();

try {
  await page.goto(base, { waitUntil: 'networkidle' });
  assert((await page.locator('[data-open-alliance-modal]').count()) === 0, 'Superseded generic alliance trigger remains on the homepage.');

  await page.getByRole('button', { name: 'Join as a Partner' }).click();
  await page.getByRole('heading', { name: 'Present a capability' }).waitFor();
  assert(await page.locator('#partner-intake').isVisible(), 'Partner intake did not open from the homepage.');
  assert(!(await page.locator('#project-intake').isVisible()), 'Project intake remained visible in partner mode.');
  await page.getByRole('button', { name: 'Close collaboration form' }).click();

  await page.goto(route('scope/'), { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Discuss capability needs' }).click();
  await page.getByRole('heading', { name: 'Discuss a project decision' }).waitFor();
  assert(await page.locator('#project-intake').isVisible(), 'Project intake did not open from Decision Scoper.');
  assert(!(await page.locator('#partner-intake').isVisible()), 'Partner intake remained visible in project mode.');
  await page.getByRole('button', { name: 'Close collaboration form' }).click();

  await page.goto(route('jips/#ccus-4d-mrv'), { waitUntil: 'networkidle' });
  await page.locator('#ccus-4d-mrv').getByRole('button', { name: 'Discuss this capability' }).click();
  await page.getByRole('heading', { name: 'Present a capability' }).waitFor();
  const selectedJip = page.locator('.jip-interest[value="ccus-4d-mrv"]');
  assert(await selectedJip.isChecked(), 'JIP-specific partner CTA did not preselect the relevant proposed JIP.');
  await page.getByRole('button', { name: 'Close collaboration form' }).click();

  await page.goto(route('about/'), { waitUntil: 'networkidle' });
  const aboutText = await page.locator('main').textContent();
  assert(!aboutText?.includes('FOUNDING NETWORK'), 'Legacy founding-network label remains on About.');
  assert(!aboutText?.includes('The founding network brings together'), 'Legacy constituted-network claim remains on About.');
  await page.getByRole('button', { name: 'I have a project' }).click();
  await page.getByRole('heading', { name: 'Discuss a project decision' }).waitFor();

  console.log(`OceanHub conversion-path contract passed against ${base}`);
} finally {
  await browser.close();
}
