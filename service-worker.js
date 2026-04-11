const CACHE_NAME = 'tree-mapper-cache-v1.0';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  // 使用する写真のファイル名をここに追加
  './IMG_5457.jpg',
  './IMG_5458.jpg',
  './icon-192.png',
  './icon-512.png'
];

// インストール時にリソースをキャッシュ
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// キャッシュをクリーンアップ
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => cacheName !== CACHE_NAME)
          .map(cacheName => caches.delete(cacheName))
      );
    })
  );
});

// オフライン時にキャッシュを返す
self.addEventListener('fetch', event => {
  event.waitUntil(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
