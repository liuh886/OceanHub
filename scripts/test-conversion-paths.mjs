import { chromium } from 'playwright';
import { readFile } from 'node:fs/promises';

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

async function assertCompleteDraftContext(page, mailto, needles, label) {
  if (mailto.body) {
    for (const needle of needles) assert(mailto.body.includes(needle), `${label} mailto body lost canonical context: ${needle}`);
    return;
  }

  await page.getByText('This draft is too long for a reliable mail link. Download it, then attach or paste the complete draft before sending.').waitFor();
  const downloadPromise = page.waitForEvent('download');
  await page.locator('#collaboration-download-draft').click();
  const download = await downloadPromise;
  const downloadPath = await download.path();
  assert(downloadPath, `${label} fallback draft was not downloaded.`);
  const draft = await readFile(downloadPath, 'utf8');
  for (const needle of needles) assert(draft.includes(needle), `${label} downloaded draft lost canonical context: ${needle}`);
}

const browser = await chromium.launch();
const page = await browser.newPage();

try {
  await page.goto(base, { waitUntil: 'networkidle' });
  assert((await page.locator('[data-open-alliance-modal]').count()) === 0, 'Superseded generic alliance trigger remains on the homepage.');
  const partnersHref = await page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: 'Partners' }).getAttribute('href');
  assert(partnersHref?.endsWith('/partners/'), 'Primary Partners navigation does not route to the capability evidence surface.');

  const partnerTrigger = page.getByRole('button', { name: 'Join as a Partner' });
  await partnerTrigger.focus();
  await partnerTrigger.click();
  await page.getByRole('heading', { name: 'Present capability evidence' }).waitFor();
  assert(await page.evaluate(() => getComputedStyle(document.body).overflow) === 'hidden', 'Open collaboration modal does not own background scrolling.');
  assert(await page.locator('main').getAttribute('inert') === '', 'Open collaboration modal does not inert the page background.');
  assert(await page.locator('#partner-intake').isVisible(), 'Partner intake did not open from the homepage.');
  assert(!(await page.locator('#project-intake').isVisible()), 'Project intake remained visible in partner mode.');
  await page.locator('#collaboration-org').fill('Example Capability Partner');
  await page.locator('[data-capability-family="marine-survey"] summary').click();
  await page.locator('.capability-interest[value="marine-geophysics"]').check();
  const marineAssertion = page.locator('[data-capability-assertion="marine-geophysics"]');
  assert(await marineAssertion.isVisible(), 'Selecting a capability did not create a capability-specific evidence assertion.');
  assert((await page.locator('[data-capability-assertion="hydrographic-survey"]').count()) === 0, 'Unselected capability unexpectedly received an evidence assertion.');
  await marineAssertion.locator('.capability-evidence-type').selectOption('reference-project');
  await marineAssertion.locator('.capability-evidence-detail').fill('North Sea route survey — survey and interpretation lead; delivered MBES, SSS and sub-bottom interpretation with project QA records.');
  const partnerMailto = decodeMailto(await page.locator('#collaboration-email-draft').getAttribute('href'));
  assert(partnerMailto.address === intakeEmail, 'Partner evidence packet is not routed to the confirmed intake address.');
  assert(partnerMailto.subject.includes('Partner Capability Evidence'), 'Partner email subject does not preserve evidence-packet intent.');
  assert(partnerMailto.body.includes('Review state: evidence-submitted (not yet reviewed)'), 'Partner evidence packet does not preserve explicit review state.');
  assert(partnerMailto.body.includes('marine-geophysics — Marine geophysics'), 'Partner evidence packet did not include canonical capability ID and label.');
  assert(partnerMailto.body.includes('Evidence type: Reference project / client case'), 'Partner evidence packet did not include typed capability evidence.');
  assert(partnerMailto.body.includes('North Sea route survey'), 'Partner evidence packet did not include capability-specific evidence detail.');
  await page.getByRole('button', { name: 'Close collaboration form' }).click();
  assert(await partnerTrigger.evaluate((element) => element === document.activeElement), 'Closing collaboration modal did not restore trigger focus.');
  assert(await page.evaluate(() => getComputedStyle(document.body).overflow) !== 'hidden', 'Closing collaboration modal did not release background scrolling.');

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

  await page.evaluate(() => {
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: () => Promise.reject(new Error('blocked')) } });
    document.execCommand = () => false;
  });
  await page.locator('#collaboration-copy').click();
  await page.getByText('Automatic copy failed. Download the draft instead, then attach or paste it into your message.').waitFor();

  await page.locator('#project-context').fill('x'.repeat(2600));
  const guardedMailto = decodeMailto(await page.locator('#collaboration-email-draft').getAttribute('href'));
  assert(guardedMailto.body === '', 'Long inquiry still relies on a potentially truncated mailto body.');
  await page.getByText('This draft is too long for a reliable mail link. Download it, then attach or paste the complete draft before sending.').waitFor();
  const downloadPromise = page.waitForEvent('download');
  await page.locator('#collaboration-download-draft').click();
  const download = await downloadPromise;
  assert(download.suggestedFilename() === 'oceanhub-project-inquiry.txt', 'Draft download uses an unexpected filename.');

  await page.getByRole('button', { name: 'Close collaboration form' }).click();

  await page.goto(route('jips/#ccus-4d-mrv'), { waitUntil: 'networkidle' });
  await page.locator('#ccus-4d-mrv').getByRole('button', { name: 'Discuss this capability' }).click();
  await page.getByRole('heading', { name: 'Present capability evidence' }).waitFor();
  const selectedJip = page.locator('.jip-interest[value="ccus-4d-mrv"]');
  assert(await selectedJip.isChecked(), 'JIP-specific partner CTA did not preselect the relevant proposed JIP.');
  assert(await page.locator('.capability-interest[value="distributed-fiber-sensing"]').isChecked(), 'JIP-specific partner CTA did not preselect the JIP capability set.');
  assert(await page.locator('[data-capability-assertion="distributed-fiber-sensing"]').isVisible(), 'JIP capability need did not create its evidence assertion.');
  await page.waitForTimeout(25);
  const jipMailto = decodeMailto(await page.locator('#collaboration-email-draft').getAttribute('href'));
  assert(jipMailto.address === intakeEmail, 'JIP interest email draft is not routed to the confirmed intake address.');
  await assertCompleteDraftContext(page, jipMailto, [
    'ccus-4d-mrv',
    'distributed-fiber-sensing — Distributed fiber-optic sensing'
  ], 'JIP-specific evidence packet');
  await page.getByRole('button', { name: 'Close collaboration form' }).click();

  await page.goto(route('capabilities/#underwater-acoustics'), { waitUntil: 'networkidle' });
  await page.locator('#underwater-acoustics').getByRole('button', { name: 'Present this capability' }).click();
  await page.getByRole('heading', { name: 'Present capability evidence' }).waitFor();
  const acousticCapability = page.locator('.capability-interest[value="underwater-acoustics"]');
  assert(await acousticCapability.isChecked(), 'Capability-specific CTA did not preselect the canonical capability.');
  assert((await page.locator('.jip-interest:checked').count()) === 0, 'Capability-specific CTA incorrectly carried stale JIP context.');
  assert(await page.locator('[data-capability-assertion="underwater-acoustics"]').isVisible(), 'Capability-specific CTA did not create a matching evidence assertion.');
  await page.waitForTimeout(25);
  const capabilityMailto = decodeMailto(await page.locator('#collaboration-email-draft').getAttribute('href'));
  await assertCompleteDraftContext(page, capabilityMailto, ['underwater-acoustics — Underwater acoustics'], 'Capability-specific evidence packet');
  await page.getByRole('button', { name: 'Close collaboration form' }).click();

  await page.goto(route('partners/'), { waitUntil: 'networkidle' });
  await page.getByRole('heading', { name: 'Capability claims should be reviewable, not promotional.' }).waitFor();
  assert((await page.locator('[data-review-state]').count()) === 4, 'Partner review surface does not expose the four workflow states.');
  assert((await page.locator('[data-review-outcome]').count()) === 3, 'Partner review surface does not expose the three explicit review outcomes.');
  assert((await page.locator('[data-evidence-type]').count()) === 8, 'Partner review surface does not expose the canonical evidence types.');
  const partnersText = await page.locator('main').textContent();
  assert(!/\b\d{1,3}%\b/.test(partnersText || ''), 'Partner review surface introduced a numeric supplier score.');
  assert(!partnersText?.includes('Verified Partner'), 'Partner review surface introduced a blanket verification badge.');
  await page.getByRole('button', { name: 'Present capability evidence' }).click();
  await page.getByRole('heading', { name: 'Present capability evidence' }).waitFor();
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