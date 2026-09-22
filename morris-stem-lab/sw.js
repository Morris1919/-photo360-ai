const CACHE='morris-stem-lab-v4';
const ASSETS=['./','./index.html','./styles.css','./main.js','./audio-engine.js','./analysis.js','./storage.js','./lib/demucs-web/index.js','./lib/demucs-web/constants.js','./lib/demucs-web/fft.js','./lib/demucs-web/processor.js'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(Promise.all([
  caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))),
  self.clients.claim()
])));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  const url=new URL(e.request.url);
  const appAsset=url.origin===self.location.origin;
  if(!appAsset) return;
  e.respondWith(fetch(e.request).then(r=>{
    const copy=r.clone();
    caches.open(CACHE).then(c=>c.put(e.request,copy));
    return r;
  }).catch(()=>caches.match(e.request)));
});