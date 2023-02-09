/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
// Change this value every time before you build
importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js"
);

const LATEST_VERSION = "v1.2.6";
const NAME = "legal-pwa";

workbox.setConfig({ debug: true });

workbox.core.setCacheNameDetails({
  prefix: NAME,
  precache: "precache",
  runtime: "runtime",
});

// eslint-disable-next-line no-unused-vars
self.addEventListener("activate", (_event) => {
  console.log(`%c ${LATEST_VERSION} `, "background: #ddd; color: #0000ff");
  if (caches) {
    caches.keys().then((arr) => {
      arr.forEach((key) => {
        if (key.indexOf(`${NAME}-precache`) < -1) {
          caches
            .delete(key)
            .then(() =>
              console.log(
                `%c Cleared ${key}`,
                "background: #333; color: #ff0000"
              )
            );
        } else {
          caches.open(key).then((cache) => {
            cache.match("version").then((res) => {
              if (!res) {
                cache.put(
                  "version",
                  new Response(LATEST_VERSION, {
                    status: 200,
                    statusText: LATEST_VERSION,
                  })
                );
              } else if (res.statusText !== LATEST_VERSION) {
                caches
                  .delete(key)
                  .then(() =>
                    console.log(
                      `%c Cleared Cache ${LATEST_VERSION}`,
                      "background: #333; color: #ff0000"
                    )
                  );
              } else
                console.log(
                  `%c Great you have the latest version ${LATEST_VERSION}`,
                  "background: #333; color: #00ff00"
                );
            });
          });
        }
      });
    });
  }
});

self.skipWaiting();
workbox.core.clientsClaim();

// runtime cache
// 1. stylesheet
workbox.routing.registerRoute(
  new RegExp(".css$"),
  new workbox.strategies.CacheFirst({
    cacheName: `${NAME}-cache-Stylesheets`,
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 7, // cache for one week
        maxEntries: 20, // only cache 20 request
        purgeOnQuotaError: true,
      }),
    ],
  })
);

// 1. js
workbox.routing.registerRoute(
  new RegExp(".js$"),
  new workbox.strategies.CacheFirst({
    cacheName: `${NAME}-js`,
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 7, // cache for one week
        maxEntries: 20, // only cache 20 request
        purgeOnQuotaError: true,
      }),
    ],
  })
);

// 2. images
workbox.routing.registerRoute(
  new RegExp(".(png|svg|jpg|jpeg)$"),
  new workbox.strategies.CacheFirst({
    cacheName: `${NAME}-cache-Images`,
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 7,
        maxEntries: 50,
        purgeOnQuotaError: true,
      }),
    ],
  })
);

// 3. fonts
workbox.routing.registerRoute(
  new RegExp(".(ttf|woff2|woff|eot|json)$"),
  new workbox.strategies.CacheFirst({
    cacheName: `${NAME}-cache-Fonts`,
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 7,
        maxEntries: 10,
        purgeOnQuotaError: true,
      }),
    ],
  })
);

// 4. API
workbox.routing.registerRoute(
  new RegExp("/^https://api.legalspace.app/*/i"),
  new workbox.strategies.NetworkFirst({
    // new workbox.strategies.StaleWhileRevalidate({
    cacheName: `${NAME}-api-data`,
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 7,
        maxEntries: 10,
        purgeOnQuotaError: true,
      }),
    ],
  })
);

// This "catch" handler is triggered when any of the other routes fail to
// generate a response.

self._precacheManifest = [].concat(self._precacheManifest || []);
workbox.precaching.precacheAndRoute([
  { url: "/index.html", revision: "383676" },
]);
// workbox.precaching.suppressWarnings();
const handler = workbox.precaching.createHandlerBoundToURL("/index.html");
const navigationRoute = new workbox.routing.NavigationRoute(handler);
workbox.routing.registerRoute(navigationRoute);

// install new service worker when ok, then reload page.
self.addEventListener("message", (msg) => {
  // eslint-disable-next-line eqeqeq
  if (msg.data.action == "skipWaiting") {
    self.skipWaiting();
  }
});
