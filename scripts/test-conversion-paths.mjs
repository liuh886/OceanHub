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
const intakeEmail = 'liuzhihao109@foxmail.com';

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function decodeMailto(href) {
  const [addressPart, queryPart = ''] = href.replace(/^mailto:/, '').split('?');
  const params = new URLSearchParams(queryPart);
  return {
    address: addressPart,
    subject: params.get('subject') ?? '',
    body: params.get('body') ?? ''
  };
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
  await page.locator('#collaboration-org').fill('Example Capability Partner');
  await page.locator('.capability-interest[value="marine-geophysics"]').check();
  await page.locator('#partner-reference-projects').fill('North Sea route survey — survey and interpretation lead.');
  await page.locator('#partner-evidence').fill('Delivered MBES, SSS and sub-bottom interpretation with project QA records.');
  const partnerMailto = decodeMailto(await page.locator('#collaboration-email-draft').getAttribute('href'));
  assert(partnerMailto.address === intakeEmail, 'Partner EOI email draft is not routed to the confirmed intake address.');
  assert(partnerMailto.subject.includes('Partner / JIP Interest'), 'Partner EOI email subject does not preserve partner intent.');
  assert(partnerMailto.body.includes('marine-geophysics — Marine geophysics'), 'Partner EOI did not include canonical capability ID and label.');
  assert(partnerMailto.body.includes('North Sea route survey'), 'Partner EOI did not include reference-project evidence.');
  assert(partnerMailto.body.includes('Delivered MBES, SSS and sub-bottom interpretation'), 'Partner EOI did not include supporting capability evidence.');
  await page.getByRole('button', { name: 'Close collaboration form' }).click();

  await page.goto(route('scope/'), { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Discuss capability needs' }).click();
  await page.getByRole('heading', { name: 'Discuss a project decision' }).waitFor();
  assert(await page.locator('#project-intake').isVisible(), 'Project intake did not open from Decision Scoper.');
  assert(!(await page.locator('#partner-intake').isVisible()), 'Partner intake remained visible in project mode.');
  await page.locator('#collaboration-org').fill('Example Operator');
  await page.locator('#project-decision').fill('Define a defensible pre-FEED monitoring evidence plan.');
  const projectMailto = decodeMailto(await page.locator('#collaboration-email-draft').getAttribute('href'));
  assert(projectMailto.address === intakeEmail, 'Project inquiry email draft is not routed to the confirmed intake address.');
  assert(projectMailto.subject.includes('Project Inquiry'), 'Project inquiry email subject does not preserve project intent.');
  assert(projectMailto.body.includes('Define a defensible pre-FEED monitoring evidence plan.'), 'Project inquiry email body did not include the project decision.');
  await page.getByRole('button', { name: 'Close collaboration form' }).click();

  await page.goto(route('jips/#ccus-4d-mrv'), { waitUntil: 'networkidle' });
  await page.locator('#ccus-4d-mrv').getByRole('button', { name: 'Discuss this capability' }).click();
  await page.getByRole('heading', { name: 'Present a capability' }).waitFor();
  const selectedJip = page.locator('.jip-interest[value="ccus-4d-mrv"]');
  assert(await selectedJip.isChecked(), 'JIP-specific partner CTA did not preselect the relevant proposed JIP.');
  assert(await page.locator('.capability-interest[value="distributed-fiber-sensing"]').isChecked(), 'JIP-specific partner CTA did not preselect the JIP capability set.');
  await page.waitForTimeout(25);
  const jipMailto = decodeMailto(await page.locator('#collaboration-email-draft').getAttribute('href'));
  assert(jipMailto.address === intakeEmail, 'JIP interest email draft is not routed to the confirmed intake address.');
  assert(jipMailto.body.includes('ccus-4d-mrv'), 'JIP-specific email draft did not carry the preselected JIP context.');
  assert(jipMailto.body.includes('distributed-fiber-sensing — Distributed fiber-optic sensing'), 'JIP-specific email draft did not carry canonical capability context.');
  await page.getByRole('button', { name: 'Close collaboration form' }).click();

  await page.goto(route('capabilities/#underwater-acoustics'), { waitUntil: 'networkidle' });
  await page.locator('#underwater-acoustics').getByRole('button', { name: 'Present this capability' }).click();
  await page.getByRole('heading', { name: 'Present a capability' }).waitFor();
  const acousticCapability = page.locator('.capability-interest[value="underwater-acoustics"]');
  assert(await acousticCapability.isChecked(), 'Capability-specific CTA did not preselect the canonical capability.');
  assert((await page.locator('.jip-interest:checked').count()) === 0, 'Capability-specific CTA incorrectly carried stale JIP context.');
  await page.waitForTimeout(25);
  const capabilityMailto = decodeMailto(await page.locator('#collaboration-email-draft').getAttribute('href'));
  assert(capabilityMailto.body.includes('underwater-acoustics — Underwater acoustics'), 'Capability-specific email draft did not carry canonical capability context.');
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
