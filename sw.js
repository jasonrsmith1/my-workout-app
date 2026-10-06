const CACHE='my-workout-pwa-v26';
const CORE=['./','./index.html','./manifest.webmanifest','./icon.svg','./app-20260924.txt','./category-navigation.js?v=2'];
const FIX=`<style id="workout-summary-v26-css">
/* Single workout summary: exercise on top; Sets/Reps row; Equipment alone below. No DOM duplication. */
#routine .workout-summary-source-v1{display:block!important;width:100%!important;min-width:0!important}
#routine .workout-summary-exercise{display:block!important;width:100%!important;margin:0 0 8px!important}
#routine .workout-summary-exercise strong{display:block!important;color:#1c1c1e!important;font-size:17px!important;line-height:1.2!important;font-weight:700!important;overflow-wrap:anywhere!important}
#routine .workout-summary-inline{display:flex!important;flex-wrap:wrap!important;align-items:center!important;gap:7px 14px!important;width:100%!important;min-width:0!important;overflow:visible!important}
#routine .workout-summary-pair{display:inline-flex!important;align-items:baseline!important;gap:4px!important;white-space:nowrap!important;min-width:0!important;margin:0!important}
#routine .workout-summary-pair .muted{display:inline!important;color:#6c6c70!important;font-size:12px!important;font-weight:600!important;line-height:1.2!important;margin:0!important}
#routine .workout-summary-pair strong{display:inline!important;color:#1c1c1e!important;font-size:16px!important;font-weight:600!important;line-height:1.2!important}
#routine .workout-summary-equipment{flex:0 0 100%!important;width:100%!important;display:block!important;margin:0!important}
#routine .workout-summary-equipment .muted{display:inline!important;margin-right:4px!important}
#routine .workout-summary-equipment select{display:inline-block!important;width:auto!important;min-width:120px!important;max-width:calc(100% - 95px)!important;min-height:40px!important;padding:7px 8px!important;border:1px solid #c7c7cc!important;border-radius:10px!important;background:#f2f2f7!important;color:#1c1c1e!important;font-size:14px!important;vertical-align:middle!important}
@media(max-width:600px),(pointer:coarse){
  #routine .workout-summary-inline{gap:6px 12px!important}
  #routine .workout-summary-exercise strong{font-size:16px!important}
  #routine .workout-summary-pair .muted{font-size:11px!important}
  #routine .workout-summary-pair strong{font-size:15px!important}
  #routine .workout-summary-equipment select{min-width:118px!important;max-width:calc(100% - 92px)!important;font-size:13px!important}
}
</style>`;
function inject(html){return html.includes('workout-summary-v26-css')?html:html.replace('</body>',FIX+'</body>')}
self.addEventListener('install',e=>e.waitUntil((async()=>{const c=await caches.open(CACHE);for(const p of CORE){const r=await fetch(p,{cache:'no-store'});if(!r.ok)throw new Error('Failed to cache '+p);await c.put(p,r)}await self.skipWaiting()})()));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith((async()=>{try{const r=await fetch(e.request,{cache:'no-store'});if(e.request.mode==='navigate'||e.request.destination==='document'){const html=inject(await r.text());const out=new Response(html,{status:r.status,statusText:r.statusText,headers:{'Content-Type':'text/html;charset=UTF-8'}});const c=await caches.open(CACHE);await c.put(e.request,out.clone());return out}const c=await caches.open(CACHE);await c.put(e.request,r.clone());return r}catch(err){return(await caches.match(e.request))||caches.match('./index.html')}})())});
