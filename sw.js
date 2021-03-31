//Assets that will be stored on cache
const assets = ["./index.html", "./style.css", "./manifest.json", "./app.js"];

//storing the assets as soon as the service worker installs
self.addEventListener(`install`, (e) => {
    e.waitUntil(
        caches.open("static").then((cache) => {
            return cache.addAll(assets);
        })
    );
});

//for every request of the browser if the file is alredy in cache pull from cach and not make the request
self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request);
        })
    );
});