const CACHE='my-workout-pwa-v40';
const CORE=['./','./index.html'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('message',e=>{if(e.data&&e.data.type==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const isDocument=e.request.mode==='navigate'||e.request.destination==='document';
  e.respondWith((async()=>{
    const cached=await caches.match(e.request);
    const controller=new AbortController();
    const timer=setTimeout(()=>controller.abort(),isDocument?5000:3500);
    try{
      const r=await fetch(e.request,{cache:'no-store',signal:controller.signal});
      clearTimeout(timer);
      if(r&&r.ok){const c=r.clone();caches.open(CACHE).then(x=>x.put(e.request,c)).catch(()=>{});}
      return r;
    }catch(err){
      clearTimeout(timer);
      return cached||caches.match('./index.html');
    }
  })());
});
