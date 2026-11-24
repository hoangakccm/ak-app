// Service worker: cho phép app chạy offline sau lần mở đầu tiên.
// Luôn hỏi lại máy chủ để lấy bản mới nhất; chỉ dùng bản lưu khi mất mạng.
const VERSION = '1.25';
const CACHE = `ak-planner-${VERSION}`;
const ASSETS = ['./', 'index.html', 'styles.css', 'app.js', 'readings.js', 'lunar.js', 'manifest.webmanifest', 'icons/icon.svg', 'icons/icon-192.png', 'icons/icon-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(ASSETS.map((u) => new Request(u, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const sameOrigin = new URL(req.url).origin === location.origin;
  // Bỏ qua bộ nhớ đệm HTTP của trình duyệt/CDN cho file của app để không bị kẹt bản cũ
  const net = sameOrigin ? (req.mode === 'navigate' ? new Request(req.url, { cache: 'no-cache' }) : new Request(req, { cache: 'no-cache' })) : req;
  e.respondWith(
    fetch(net)
      .then((res) => {
        if (res.ok && (sameOrigin || req.url.includes('fonts.g'))) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
        }
        return res;
      })
      .catch(() => caches.match(req, { ignoreSearch: true }).then((r) => r || caches.match('index.html')))
  );
});
