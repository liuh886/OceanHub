import { chromium } from 'playwright';

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function normalizeBaseUrl(value) {
  const url = new URL(value);
  if (!url.pathname.endsWith('/')) url.pathname += '/';
  url.search = '';
  url.hash = '';
  return url;
}

const configuredBase = process.env.OCEANHUB_TEST_BASE_URL;
if (!configuredBase) {
  throw new Error('OCEANHUB_TEST_BASE_URL is required, for example https://example.com/OceanHub/.');
}

const base = normalizeBaseUrl(configuredBase);
const route = (path = '') => new URL(path.replace(/^\/+/, ''), base).href;
const expectedScopePath = base.pathname;

async function fetchRequired(path, expectedType) {
  const url = route(path);
  const response = await fetch(url, {
    redirect: 'follow',
    headers: { 'cache-control': 'no-cache' }
  });
  assert(response.ok, `${url} returned ${response.status}.`);
  const contentType = response.headers.get('content-type') ?? '';
  assert(contentType.includes(expectedType), `${url} returned unexpected content type ${contentType}.`);
  return response;
}

for (const path of [
  '',
  'briefcase/',
  'focus-areas/ccus/',
  'insights/ccs-monitoring-trends/',
  'offline/'
]) {
  const response = await fetchRequired(path, 'text/html');
  const html = await response.text();
  assert(html.includes('OceanHub'), `${route(path)} did not contain the OceanHub shell.`);
}

const manifestResponse = await fetchRequired('manifest.webmanifest', 'application/manifest+json');
const manifest = await manifestResponse.json();
assert(manifest.name === 'OceanHub | Marine Intelligence', 'Manifest name is incorrect.');
assert(manifest.short_name === 'OceanHub', 'Manifest short name is incorrect.');
assert(manifest.display === 'standalone', 'Manifest display mode must be standalone.');
assert(new URL(manifest.start_url, base.origin).pathname === expectedScopePath, 'Manifest start_url is outside the deployed base.');
assert(new URL(manifest.scope, base.origin).pathname === expectedScopePath, 'Manifest scope is outside the deployed base.');
assert(Array.isArray(manifest.icons) && manifest.icons.some((icon) => icon.sizes === '192x192'), 'Manifest is missing the 192px icon.');
assert(manifest.icons.some((icon) => icon.sizes === '512x512'), 'Manifest is missing the 512px icon.');
assert(manifest.icons.some((icon) => String(icon.purpose).includes('maskable')), 'Manifest is missing a maskable icon.');

for (const icon of manifest.icons) {
  await fetchRequired(new URL(icon.src, base.origin).pathname.slice(expectedScopePath.length), 'image/png');
}

const workerResponse = await fetchRequired('sw.js', 'javascript');
const workerSource = await workerResponse.text();
assert(workerSource.includes('oceanhub-content'), 'Deployed service worker is missing the persistent content cache.');

const browser = await chromium.launch();

try {
  const desktop = await browser.newContext({ serviceWorkers: 'allow' });
  const desktopPage = await desktop.newPage();
  const pageErrors = [];
  desktopPage.on('pageerror', (error) => pageErrors.push(error.message));

  await desktopPage.goto(base.href, { waitUntil: 'domcontentloaded' });
  await desktopPage.locator('h1').first().waitFor();
  const registration = await desktopPage.evaluate(async () => {
    const ready = await navigator.serviceWorker.ready;
    return {
      scope: ready.scope,
      manifestHref: document.querySelector('link[rel="manifest"]')?.href ?? '',
      title: document.title
    };
  });

  assert(new URL(registration.scope).pathname === expectedScopePath, 'Service worker scope does not match the deployed base.');
  assert(registration.manifestHref === route('manifest.webmanifest'), 'Manifest link does not resolve under the deployed base.');
  assert(registration.title.includes('OceanHub'), 'Deployed document title is incorrect.');

  const skipLink = desktopPage.locator('.skip-link');
  await skipLink.focus();
  assert(await skipLink.evaluate((element) => document.activeElement === element), 'Skip link could not receive keyboard focus.');
  await desktopPage.keyboard.press('Enter');
  assert(
    await desktopPage.locator('#main-content').evaluate((element) => document.activeElement === element),
    'Activating the skip link did not move focus to main content.'
  );

  await desktopPage.reload({ waitUntil: 'domcontentloaded' });
  const controlled = await desktopPage.evaluate(() => Boolean(navigator.serviceWorker.controller));
  assert(controlled, 'The deployed page was not controlled by its service worker after reload.');
  assert(pageErrors.length === 0, `The deployed homepage raised page errors: ${pageErrors.join(' | ')}`);

  await desktop.setOffline(true);
  await desktopPage.goto(route('focus-areas/marine-ecology/'), { waitUntil: 'domcontentloaded' });
  const fallbackTitle = await desktopPage.locator('h1').first().textContent();
  assert(fallbackTitle?.includes('OceanHub is offline'), 'An unsaved offline route did not use the honest fallback page.');
  await desktop.setOffline(false);
  await desktop.close();

  const mobile = await browser.newContext({
    serviceWorkers: 'allow',
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });
  const mobilePage = await mobile.newPage();
  await mobilePage.goto(base.href, { waitUntil: 'domcontentloaded' });
  const menuButton = mobilePage.locator('#mobile-menu-toggle');
  const mobileDrawer = mobilePage.locator('#mobile-drawer');
  await menuButton.waitFor();
  await menuButton.click();
  assert((await menuButton.getAttribute('aria-expanded')) === 'true', 'Mobile navigation did not expose its expanded state.');
  assert((await mobileDrawer.getAttribute('aria-hidden')) === 'false', 'Mobile navigation drawer remained hidden from assistive technology.');
  await mobileDrawer.getByRole('link', { name: 'Marine Intelligence' }).waitFor();
  await mobile.close();

  const reducedMotion = await browser.newContext({ reducedMotion: 'reduce' });
  const reducedPage = await reducedMotion.newPage();
  await reducedPage.goto(base.href, { waitUntil: 'domcontentloaded' });
  const reducedState = await reducedPage.evaluate(() => ({
    preference: matchMedia('(prefers-reduced-motion: reduce)').matches,
    revealOpacity: getComputedStyle(document.querySelector('.reveal')).opacity
  }));
  assert(reducedState.preference, 'Reduced-motion browser preference was not active.');
  assert(reducedState.revealOpacity === '1', 'Reduced-motion content remained hidden by reveal animation styles.');
  await reducedMotion.close();

  console.log(`OceanHub deployed PWA acceptance checks passed against ${base.href}`);
} finally {
  await browser.close();
}
