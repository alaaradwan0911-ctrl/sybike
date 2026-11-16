const CACHE_NAME = 'syria-bike-v1';
const ASSETS = [
  './index.html',
  './restaurant.html',
  './driver.html',
  './admin.html',
  './manifest.json',
  './logo.png',
  './favicon.png',
  './apple-touch-icon.png'
];

// تثبيت التخزين المؤقت
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// تفعيل الخدمة وحذف الكاش القديم إن وجد
self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.map(function(key) {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// جلب الملفات من الكاش عند انقطاع الإنترنت
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
