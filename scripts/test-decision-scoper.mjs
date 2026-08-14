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
  const responseBuilder = page.locator('#provider-response-builder');
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

  await scoper.locator('#scoper-stage').selectOption('monitoring');
  await scoper.locator('#scoper-focus').selectOption('containment');
  await scoper.getByText('1 evidence workstream from 1 reference pattern.', { exact: true }).waitFor();
  await scoper.getByRole('heading', { name: 'Sleipner — plume migration and containment monitoring' }).waitFor();
  await eoi.locator('[data-eoi-capability="time-lapse-seismic"]').waitFor();
  assert((await eoi.locator('[data-eoi-capability="petrophysics-well-testing"]').count()) === 0, 'EOI retained stale Pre-FEED capability requirements after Scoper changed.');
  await eoi.locator('[data-provider-match="tgs"]').waitFor();
  await responseBuilder.waitFor();

  const packetButton = responseBuilder.locator('#generate-provider-packets');
  assert(await packetButton.isDisabled(), 'Provider response packets should require at least two selected providers.');
  await eoi.locator('[data-provider-match="tgs"] .provider-response-select').check();
  assert(await packetButton.isDisabled(), 'Provider response packets enabled with only one selected provider.');
  await eoi.locator('[data-provider-match="slb"] .provider-response-select').check();
  assert(!(await packetButton.isDisabled()), 'Provider response packets did not enable after two providers were selected.');
  await packetButton.click();

  const responsePackets = responseBuilder.locator('[data-provider-response-packet]');
  assert((await responsePackets.count()) === 2, 'Expected two provider-specific response packets.');
  const slbPacket = responseBuilder.locator('[data-provider-response-packet="slb"]');
  await slbPacket.waitFor();
  const slbPacketText = await slbPacket.locator('.provider-response-text').textContent();
  assert(slbPacketText?.includes('Provider: SLB (slb)'), 'SLB response packet lost provider identity.');
  assert(slbPacketText?.includes('reservoir-characterization'), 'SLB response packet lost matched capability context.');
  assert(slbPacketText?.includes('time-lapse-seismic'), 'SLB response packet did not expose uncovered EOI requirements.');

  const responseHref = await slbPacket.getByRole('link', { name: 'Open supplier response ↗' }).getAttribute('href');
  assert(responseHref?.includes('/respond/?'), 'Provider response packet did not generate a structured response URL.');
  assert(responseHref?.includes('provider=slb'), 'Provider response URL lost provider ID.');
  assert(responseHref?.includes('caps='), 'Provider response URL lost canonical capability requirements.');

  await page.goto(responseHref, { waitUntil: 'networkidle' });
  await page.getByRole('heading', { name: 'Respond with evidence, capability by capability.' }).waitFor();
  await page.getByText('SLB', { exact: true }).waitFor();
  assert((await page.locator('[data-supplier-assertion]').count()) === 4, 'Supplier response did not preload all four containment capability requirements.');

  const reservoirAssertion = page.locator('[data-supplier-assertion="reservoir-characterization"]');
  const instrumentationAssertion = page.locator('[data-supplier-assertion="instrumentation-control"]');
  await reservoirAssertion.locator('.supplier-claim').check();
  await reservoirAssertion.locator('.supplier-evidence-type').selectOption('reference-project');
  await reservoirAssertion.locator('.supplier-evidence-detail').fill('Reference project A — integrated storage characterization');
  await instrumentationAssertion.locator('.supplier-claim').check();
  await instrumentationAssertion.locator('.supplier-evidence-type').selectOption('dataset-deliverable');
  await instrumentationAssertion.locator('.supplier-evidence-detail').fill('Delivered pressure and temperature instrumentation dataset B');
  await page.locator('#supplier-contact').fill('supplier@example.com');
  await page.locator('#supplier-regions').fill('Global / APAC mobilization');
  await page.getByRole('button', { name: 'Build evidence response' }).click();

  const supplierPacket = await page.locator('#supplier-response-output').textContent();
  assert(supplierPacket?.includes('Packet review state: evidence-submitted (not yet reviewed)'), 'Supplier response did not preserve explicit review state.');
  assert(supplierPacket?.includes(':slb:reservoir-characterization'), 'Supplier response did not create deterministic reservoir assertion ID.');
  assert(supplierPacket?.includes(':slb:instrumentation-control'), 'Supplier response did not create deterministic instrumentation assertion ID.');
  assert(supplierPacket?.includes('Reference project A — integrated storage characterization'), 'Reservoir evidence was not serialized into its assertion.');
  assert(supplierPacket?.includes('Delivered pressure and temperature instrumentation dataset B'), 'Instrumentation evidence was not serialized into its assertion.');
  assert((supplierPacket?.match(/Reference project A — integrated storage characterization/g) ?? []).length === 1, 'Capability evidence leaked into another assertion.');

  const emailHref = await page.locator('#email-supplier-response').getAttribute('href');
  assert(emailHref?.startsWith('mailto:liuzhihao109@foxmail.com?'), 'Supplier response mailto does not use the confirmed OceanHub intake address.');

  console.log(`OceanHub Decision Scoper + supplier EOI response loop contract passed against ${scopeUrl}`);
} finally {
  await browser.close();
}
