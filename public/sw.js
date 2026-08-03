/* OceanHub PWA Service Worker - v1.1.0 */
const VERSION = 'v1.1.0';
const PRECACHE = `oceanhub-precache-${VERSION}`;
const RUNTIME = `oceanhub-runtime-${VERSION}`;
const CORE_ASSETS = [
  './',
  './offline/',
  './manifest.webmanifest',
  './favicon.svg',
  './icon-192.png',
  './icon-512.png',
  './icon-512-maskable.png',
  './apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((names) => Promise.all(
        names
          .filter((name) => name.startsWith('oceanhub-') && ![PRECACHE, RUNTIME].includes(name))
          .map((name) => caches.delete(name))
      ))
      .then(() => self.clients.claim())
  );
});

function isCacheable(response) {
  return response && response.ok && (response.type === 'basic' || response.type === 'cors');
}

async function offlineFallback() {
  return (
    await caches.match('./offline/') ||
    await caches.match('./offline/index.html') ||
    new Response(
      '<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>OceanHub offline</title><body style="margin:0;background:#060B14;color:#e2e8f0;font-family:system-ui;padding:3rem;text-align:center"><h1>OceanHub is offline</h1><p>Reconnect to load content that has not yet been saved on this device.</p></body></html>',
      { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    )
  );
}

async function networkFirstPage(request) {
  try {
    const response = await fetch(request);
    if (isCacheable(response)) {
      const cache = await caches.open(RUNTIME);
      await cache.put(request, response.clone());
    }
    return response;
  } catch {
    return (await caches.match(request)) || offlineFallback();
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(RUNTIME);
  const cached = await caches.match(request);
  const network = fetch(request)
    .then(async (response) => {
      if (isCacheable(response)) await cache.put(request, response.clone());
      return response;
    })
    .catch(() => undefined);

  return cached || (await network) || new Response('', { status: 504, statusText: 'Offline' });
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const requestUrl = new URL(request.url);
  const scopeUrl = new URL(self.registration.scope);

  if (requestUrl.origin !== scopeUrl.origin || !requestUrl.pathname.startsWith(scopeUrl.pathname)) return;

  if (request.mode === 'navigate') {
    event.respondWith(networkFirstPage(request));
    return;
  }

  if (request.destination === 'style' || request.destination === 'script' || request.destination === 'image' || request.destination === 'font') {
    event.respondWith(staleWhileRevalidate(request));
  }
});

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});
