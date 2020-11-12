import { SERVER } from './common/constants';

declare const self: ServiceWorkerGlobalScope;
export {};

const CACHE_NAME = 'static-v1';
const FILES_TO_CACHE = [
  '/index.html',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(FILES_TO_CACHE)),
  );
});

self.addEventListener('activate', async (event) => {
  event.waitUntil(
    caches.keys()
      .then((keyList) => Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
        return false;
      }))),
  );

  try {
    const applicationServerKey = 'BPtqwqv4ekh_AUb3z6oI2_z7zNzQPVzcCGwPhb1jX9QK7qa4lDWSGZWq_uIJRGVWobs-zbV9EedeXBXiqNmFTWc';
    const subscription = await self.registration.pushManager.subscribe({
      applicationServerKey,
      userVisibleOnly: true,
    });
    await saveSubscription(subscription);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
});

self.addEventListener('push', (event) => {
  if (event.data) {
    self.registration.showNotification('Probabilidade de chuva', {
      body: event.data.text(),
    });
  }
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open(CACHE_NAME)
      .then((cache) => cache.match(event.request)
        .then((response) => response || fetch(event.request))),
  );
});

const saveSubscription = async (subscription: PushSubscription) => {
  await fetch(`${SERVER}/subscription`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(subscription),
  });
};
