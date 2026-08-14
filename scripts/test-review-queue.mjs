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
const reviewUrl = new URL('review/', base).href;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const browser = await chromium.launch();
const page = await browser.newPage();
let started = false;
let reviewed = false;
let completedPayload = null;

await page.route('**/auth/v1/token?grant_type=password', async (route) => {
  const body = route.request().postDataJSON();
  assert(body.email === 'liuh886@gmail.com', 'Reviewer sign-in did not preserve the entered email.');
  await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ access_token: 'test-review-token', user: { id: 'admin-user', email: 'liuh886@gmail.com' } }) });
});

await page.route('**/functions/v1/oceanhub-review', async (route) => {
  const request = route.request();
  assert(request.headers().authorization === 'Bearer test-review-token', 'Review API request did not carry the authenticated reviewer JWT.');
  const body = request.postDataJSON();

  if (body.action === 'queue') {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        reviewer: { email: 'liuh886@gmail.com', role: 'owner' },
        responses: [{
          id: 'response-1',
          eoi_request_id: '11111111-1111-4111-8111-111111111111',
          provider_id: 'slb',
          organization: 'SLB',
          contact_email: 'supplier@example.com',
          operating_region: 'Global / APAC mobilization',
          not_claimed_capability_ids: ['marine-seismic-acquisition'],
          submitted_at: '2026-08-14T00:10:00Z',
          updated_at: '2026-08-14T00:10:00Z',
          oceanhub_eoi_requests: {
            project_context: 'Gulf of Thailand · 80 m water depth',
            lifecycle_stage: 'Monitoring',
            decision_focus: 'Containment / plume migration',
            created_at: '2026-08-14T00:00:00Z'
          },
          oceanhub_capability_assertions: [
            {
              id: '11111111-1111-4111-8111-111111111111:slb:reservoir-characterization',
              capability_id: 'reservoir-characterization',
              capability_label: 'Reservoir and storage characterization',
              evidence_type: 'reference-project',
              evidence_detail: 'Reference project A — integrated storage characterization',
              review_state: reviewed ? 'reviewed' : started ? 'under-review' : 'evidence-submitted',
              review_outcome: reviewed ? 'partially-supported' : null,
              reviewer_notes: reviewed ? 'Strong storage characterization evidence; geographic scope needs clarification.' : null,
              reviewed_at: reviewed ? '2026-08-14T00:20:00Z' : null,
              submitted_at: '2026-08-14T00:10:00Z',
              updated_at: '2026-08-14T00:20:00Z'
            },
            {
              id: '11111111-1111-4111-8111-111111111111:slb:instrumentation-control',
              capability_id: 'instrumentation-control',
              capability_label: 'Instrumentation and control',
              evidence_type: 'dataset-deliverable',
              evidence_detail: 'Delivered pressure and temperature instrumentation dataset B',
              review_state: 'reviewed',
              review_outcome: 'supported',
              reviewer_notes: 'Direct delivered dataset supports the stated capability.',
              reviewed_at: '2026-08-14T00:15:00Z',
              submitted_at: '2026-08-14T00:10:00Z',
              updated_at: '2026-08-14T00:15:00Z'
            }
          ]
        }]
      })
    });
    return;
  }

  if (body.action === 'start_review') {
    assert(body.assertionId.endsWith(':slb:reservoir-characterization'), 'Start-review action targeted the wrong capability assertion.');
    started = true;
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ id: body.assertionId, review_state: 'under-review' }) });
    return;
  }

  if (body.action === 'complete_review') {
    assert(body.assertionId.endsWith(':slb:reservoir-characterization'), 'Complete-review action targeted the wrong capability assertion.');
    completedPayload = body;
    reviewed = true;
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ id: body.assertionId, review_state: 'reviewed', review_outcome: body.outcome, reviewed_at: '2026-08-14T00:20:00Z' }) });
    return;
  }

  await route.fulfill({ status: 400, contentType: 'application/json', body: JSON.stringify({ error: 'Unexpected review action.' }) });
});

try {
  await page.goto(reviewUrl, { waitUntil: 'networkidle' });
  await page.getByRole('heading', { name: 'Review capability evidence, assertion by assertion.' }).waitFor();
  await page.locator('#review-email').fill('liuh886@gmail.com');
  await page.locator('#review-password').fill('test-password');
  await page.getByRole('button', { name: 'Sign in' }).click();

  await page.getByText('liuh886@gmail.com · owner', { exact: true }).waitFor();
  await page.getByText('Reference project A — integrated storage characterization', { exact: true }).waitFor();
  const instrumentation = page.locator('[data-review-assertion$=":slb:instrumentation-control"]');
  assert((await instrumentation.locator('p').filter({ hasText: /^Supported$/ }).count()) === 1, 'Existing reviewed assertion did not render its supported state precisely once.');
  const appText = await page.locator('#review-app').textContent();
  assert(!/\bstar rating\b/i.test(appText ?? ''), 'Supplier score language leaked into the reviewer workspace.');
  assert(!/\boverall score\b/i.test(appText ?? ''), 'Aggregate quality scoring leaked into the reviewer workspace.');

  const reservoir = page.locator('[data-review-assertion$=":slb:reservoir-characterization"]');
  await reservoir.getByRole('button', { name: 'Start review' }).click();
  await reservoir.locator('.review-outcome').waitFor();
  assert(started, 'Reviewer did not persist the under-review transition.');

  await reservoir.locator('.review-outcome').selectOption('partially-supported');
  await reservoir.locator('.review-note').fill('Strong storage characterization evidence; geographic scope needs clarification.');
  await reservoir.getByRole('button', { name: 'Complete review' }).click();
  assert((await reservoir.locator('p').filter({ hasText: /^Partially supported$/ }).count()) === 1, 'Completed assertion did not render the partially-supported state precisely once.');

  assert(reviewed, 'Reviewer did not persist the final reviewed state.');
  assert(completedPayload?.outcome === 'partially-supported', 'Reviewer outcome was not serialized correctly.');
  assert(completedPayload?.note === 'Strong storage characterization evidence; geographic scope needs clarification.', 'Reviewer rationale was not serialized correctly.');

  await page.getByRole('button', { name: 'Sign out' }).click();
  await page.getByRole('heading', { name: 'Reviewer sign in' }).waitFor();
  assert(await page.evaluate(() => sessionStorage.getItem('oceanhub-review-access-token')) === null, 'Reviewer JWT remained in session storage after sign-out.');

  console.log(`OceanHub authenticated capability review queue contract passed against ${reviewUrl}`);
} finally {
  await browser.close();
}
