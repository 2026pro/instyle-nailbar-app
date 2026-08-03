/* InStyle OS service worker — required for installable PWA / TWA (Play Store).
   Strategy:
   - Navigations: network-first, fall back to cached app shell ("/") when offline.
   - Static assets (/static/, icons, manifest): cache-first (CRA hashes filenames).
   - NEVER caches API or Supabase calls — live data stays live.
*/
const VERSION = "instyle-os-v1";
const SHELL = ["/", "/manifest.json", "/icon-192.png", "/icon-512.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // never intercept data APIs
  if (url.pathname.startsWith("/api/") || url.pathname.includes("/rest/v1/") || url.origin !== self.location.origin) {
    return;
  }

  // navigations: network-first with offline shell fallback
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(VERSION).then((c) => c.put("/", copy));
          return res;
        })
        .catch(() => caches.match("/"))
    );
    return;
  }

  // static assets: cache-first
  if (url.pathname.startsWith("/static/") || /\.(png|jpg|svg|ico|json|woff2?)$/.test(url.pathname)) {
    e.respondWith(
      caches.match(req).then(
        (hit) =>
          hit ||
          fetch(req).then((res) => {
            if (res.ok) {
              const copy = res.clone();
              caches.open(VERSION).then((c) => c.put(req, copy));
            }
            return res;
          })
      )
    );
  }
});
