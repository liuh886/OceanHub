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
const requestId = '11111111-1111-4111-8111-111111111111';
const buyerToken = '22222222-2222-4222-8222-222222222222';

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const browser = await chromium.launch();
const page = await browser.newPage();
let supplierSubmitted = false;

await page.route('**/functions/v1/oceanhub-intake', async (route) => {
  const request = route.request();
  const body = request.postDataJSON();
  if (body.action === 'create_request') {
    assert(body.providerRequests.length === 2, 'Tracked EOI did not persist exactly the selected providers.');
    assert(body.providerRequests.every((provider) => provider.capabilityIds.length === 4), 'Provider request did not carry the full EOI capability scope.');
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ requestId, buyerToken }) });
    return;
  }
  if (body.action === 'submit_response') {
    assert(body.requestId === requestId && body.providerId === 'slb', 'Supplier persistence lost request/provider identity.');
    assert(body.assertions.length === 2, 'Claimed supplier assertions were not isolated correctly.');
    assert(body.notClaimedCapabilityIds.length === 2, 'Unclaimed capabilities were not recorded separately from assertions.');
    assert(body.assertions.some((item) => item.capabilityId === 'reservoir-characterization' && item.evidenceDetail.includes('Reference project A')), 'Reservoir evidence did not remain attached to its capability.');
    assert(body.assertions.some((item) => item.capabilityId === 'instrumentation-control' && item.evidenceDetail.includes('dataset B')), 'Instrumentation evidence did not remain attached to its capability.');
    supplierSubmitted = true;
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ responseId: '33333333-3333-4333-8333-333333333333', reviewState: 'evidence-submitted' }) });
    return;
  }
  if (body.action === 'request_status') {
    assert(body.requestId === requestId && body.buyerToken === buyerToken, 'Buyer status lookup lost private tracking credentials.');
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        requestId,
        projectContext: 'Gulf of Thailand · 80 m water depth · Pre-FEED',
        lifecycleStage: 'Monitoring',
        decisionFocus: 'Containment / plume migration',
        createdAt: '2026-08-14T00:00:00Z',
        providers: [
          {
            providerId: 'tgs', providerName: 'TGS', requestedCapabilityIds: ['marine-seismic-acquisition','time-lapse-seismic','reservoir-characterization','instrumentation-control'],
            responseState: 'awaiting-response', submittedAt: null, notClaimedCapabilityIds: [], assertions: []
          },
          {
            providerId: 'slb', providerName: 'SLB', requestedCapabilityIds: ['marine-seismic-acquisition','time-lapse-seismic','reservoir-characterization','instrumentation-control'],
            responseState: supplierSubmitted ? 'evidence-submitted' : 'awaiting-response', submittedAt: supplierSubmitted ? '2026-08-14T00:10:00Z' : null,
            notClaimedCapabilityIds: supplierSubmitted ? ['marine-seismic-acquisition','time-lapse-seismic'] : [],
            assertions: supplierSubmitted ? [
              { provider_id: 'slb', capability_id: 'reservoir-characterization', capability_label: 'Reservoir and storage characterization', review_state: 'reviewed', review_outcome: 'supported', reviewed_at: '2026-08-14T00:20:00Z' },
              { provider_id: 'slb', capability_id: 'instrumentation-control', capability_label: 'Instrumentation and control', review_state: 'evidence-submitted', review_outcome: null, reviewed_at: null }
            ] : []
          }
        ]
      })
    });
    return;
  }
  await route.fulfill({ status: 400, contentType: 'application/json', body: JSON.stringify({ error: 'Unexpected test action.' }) });
});

try {
  await page.goto(scopeUrl, { waitUntil: 'networkidle' });
  const scoper = page.locator('#decision-scoper-root');
  const eoi = page.locator('#project-eoi-builder');
  const responseBuilder = page.locator('#provider-response-builder');
  await scoper.getByRole('heading', { name: 'Build a traceable offshore CCS evidence plan' }).waitFor();

  const initialText = await scoper.textContent();
  assert(!initialText?.includes('EVIDENCE READINESS INDEX'), 'Unsupported readiness score returned to the Scoper.');
  assert(!initialText?.includes('DECISION ALGORITHM V2.4'), 'Decorative algorithm-version claim returned to the Scoper.');

  await scoper.locator('#scoper-stage').selectOption('pre-feed');
  await scoper.locator('#scoper-focus').selectOption('all');
  await scoper.getByText('1 evidence workstream from 1 reference pattern.', { exact: true }).waitFor();
  await eoi.locator('#eoi-project-context').fill('Gulf of Thailand · 80 m water depth · Pre-FEED');
  await eoi.getByRole('button', { name: 'Generate supplier EOI & shortlist' }).click();
  await eoi.getByRole('heading', { name: 'Project EOI draft' }).waitFor();
  const preFeedEoiText = await eoi.locator('#project-eoi-text').textContent();
  assert(preFeedEoiText?.includes('petrophysics-well-testing — Petrophysics and well testing'), 'Generated EOI did not include canonical capability requirements.');
  assert(preFeedEoiText?.includes('ISO 27914:2026'), 'Generated EOI did not carry engineering references.');

  await scoper.locator('#scoper-stage').selectOption('monitoring');
  await scoper.locator('#scoper-focus').selectOption('containment');
  await eoi.locator('[data-eoi-capability="time-lapse-seismic"]').waitFor();
  await eoi.locator('[data-provider-match="tgs"]').waitFor();
  await responseBuilder.waitFor();

  const packetButton = responseBuilder.locator('#generate-provider-packets');
  assert(await packetButton.isDisabled(), 'Tracked EOI should require at least two providers.');
  await eoi.locator('[data-provider-match="tgs"] .provider-response-select').check();
  await eoi.locator('[data-provider-match="slb"] .provider-response-select').check();
  assert(!(await packetButton.isDisabled()), 'Tracked EOI did not enable with two selected providers.');
  await packetButton.click();

  const slbPacket = responseBuilder.locator('[data-provider-response-packet="slb"]');
  await slbPacket.waitFor();
  assert((await responseBuilder.locator('[data-provider-response-packet]').count()) === 2, 'Expected two persisted provider response packets.');
  const trackingHref = await responseBuilder.locator('#buyer-tracking-link a').getAttribute('href');
  assert(trackingHref?.includes(`request=${requestId}`) && trackingHref?.includes(`token=${buyerToken}`), 'Buyer tracking URL did not preserve persisted request credentials.');
  const responseHref = await slbPacket.getByRole('link', { name: 'Open supplier response ↗' }).getAttribute('href');
  assert(responseHref?.includes(`request=${requestId}`) && responseHref?.includes('provider=slb'), 'Supplier response URL lost persisted request/provider context.');

  await page.goto(responseHref, { waitUntil: 'networkidle' });
  await page.getByRole('heading', { name: 'Respond with evidence, capability by capability.' }).waitFor();
  assert((await page.locator('[data-supplier-assertion]').count()) === 4, 'Supplier response did not preload the full requested capability scope.');

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
  await page.getByRole('button', { name: 'Submit evidence response' }).click();
  await page.getByText('Evidence response received.', { exact: true }).waitFor();
  assert(supplierSubmitted, 'Supplier evidence did not reach the persistence API contract.');
  assert((await page.locator('text=Email response to OceanHub').count()) === 0, 'Deprecated mailto review handoff remains on supplier response page.');

  await page.goto(trackingHref, { waitUntil: 'networkidle' });
  await page.getByRole('heading', { name: 'Track evidence and review, not a supplier score.' }).waitFor();
  await page.getByText('TGS', { exact: true }).waitFor();
  await page.getByText('SLB', { exact: true }).waitFor();
  await page.getByText('Supported', { exact: true }).waitFor();
  await page.getByText('Evidence submitted · review pending', { exact: true }).waitFor();
  await page.getByText('Awaiting response', { exact: true }).waitFor();
  const statusText = await page.locator('#status-app').textContent();
  assert(!statusText?.includes('Reference project A'), 'Buyer status page leaked supplier evidence detail.');
  assert(!statusText?.includes('supplier@example.com'), 'Buyer status page leaked supplier contact data.');

  console.log(`OceanHub persisted EOI → supplier evidence → buyer status contract passed against ${scopeUrl}`);
} finally {
  await browser.close();
}
