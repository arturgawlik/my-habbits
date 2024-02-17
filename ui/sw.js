// async function addResourcesToCache(resources) {
//   const cache = await caches.open("v1");
//   await cache.addAll(resources);
// }

// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     addResourcesToCache([
//       "/",
//       "/index.html",
//       "/src/habbits/habbits.js",
//       "/src/habbits/ui/habbits-list.js",
//       "/src/habbits/ui/habbits-list-item.js",
//       "/src/shared/ui/top-header.js",
//       "/src/shared/ui/button.js",
//       "/src/shared/ui/bottom-item.js",
//       "/src/shared/data-access/database.js",
//       "/src/shared/data-access/habbits.js",
//       "/src/add-edit-habbit/add-edit-habbit.js",
//       "/src/add-edit-habbit/ui/habbit-form.js",
//       "/src/navigation/navigation.js",
//       "/src/service-worker/register-sw.js",
//       "/src/styles.css",
//       "/manifest.json",
//       "https://fonts.googleapis.com/css2?family=Montserrat&display=swap",
//       "https://cdn.jsdelivr.net/npm/temporal-polyfill@0.2.1/global.min.js",
//     ])
//   );
// });

// async function cacheFirst(request) {
//   const responseFromCache = await caches.match(request);
//   if (responseFromCache) {
//     return responseFromCache;
//   }
//   return fetch(request);
// }

// self.addEventListener("fetch", (event) => {
//   event.respondWith(cacheFirst(event.request));
// });

self.addEventListener("push", (event) => {
  if (Notification?.permission !== "granted") {
    console.error(
      `Notifications are not supported or permission is not granted. Current permission is: ${Notification.permission}`
    );
    return;
  }
  const data = event.data.text();
  self.registration.showNotification(data);
});
