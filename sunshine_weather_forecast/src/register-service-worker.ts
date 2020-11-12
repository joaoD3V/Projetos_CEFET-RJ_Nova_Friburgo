/* eslint-disable no-console */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('../src/service-worker.ts')
    .then((serviceWorker) => {
      console.log('Service Worker registered: ', serviceWorker);
    })
    .catch((error) => {
      console.error('Error registering the Service Worker: ', error);
    });
}
