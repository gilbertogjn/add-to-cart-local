const CACHE_NAME = "meu-pwa-cache-v1";
const urlsToCache = [
  "./index.html",
  "./index.css",
  "./index.js",
  "./img/favicon/android-chrome-192x192.png",
  "./img/favicon/android-chrome-512x512.png",
  "./img/favicon/apple-touch-icon.png",
  "./img/favicon/favicon-16x16.png",
  "./img/favicon/favicon-32x32.png",
  "./img/favicon/favicon.ico",
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response;
      }

      const fetchRequest = event.request.clone();

      return fetch(fetchRequest).then(response => {
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        const responseToCache = response.clone();

        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== CACHE_NAME)
        .map(key => caches.delete(key))
      );
    })
  );
});