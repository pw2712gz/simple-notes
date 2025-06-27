self.addEventListener("install", (event) => {
  self.skipWaiting();
  console.log("[SW] Installed");
});

self.addEventListener("activate", (event) => {
  self.clients.claim();
  console.log("[SW] Activated");
});
