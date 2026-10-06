const CACHE='my-workout-pwa-v28';
const CORE=['./','./index.html','./manifest.webmanifest','./icon.svg','./app-20260924.txt','./category-navigation.js?v=2'];
const FIX=`<style id="workout-summary-v26-css">
/* Existing workout summary: exercise on top; Sets/Reps row; Equipment alone below. */
#routine .workout-summary-source-v1{display:block!important;width:100%!important;min-width:0!important}
#routine .workout-summary-exercise{display:block!important;width:100%!important;margin:0 0 8px!important}
#routine .workout-summary-exercise strong{display:block!important;color:#172033!important;font-size:17px!important;line-height:1.2!important;font-weight:700!important;overflow-wrap:anywhere!important}
#routine .workout-summary-inline{display:flex!important;flex-wrap:wrap!important;align-items:center!important;gap:7px 14px!important;width:100%!important;min-width:0!important;overflow:visible!important}
#routine .workout-summary-pair{display:inline-flex!important;align-items:baseline!important;gap:4px!important;white-space:nowrap!important;min-width:0!important;margin:0!important}
#routine .workout-summary-pair .muted{display:inline!important;color:#64748b!important;font-size:12px!important;font-weight:600!important;line-height:1.2!important;margin:0!important}
#routine .workout-summary-pair strong{display:inline!important;color:#172033!important;font-size:16px!important;font-weight:600!important;line-height:1.2!important}
#routine .workout-summary-equipment{flex:0 0 100%!important;width:100%!important;display:block!important;margin:0!important}
#routine .workout-summary-equipment .muted{display:inline!important;margin-right:4px!important}
#routine .workout-summary-equipment select{display:inline-block!important;width:auto!important;min-width:120px!important;max-width:calc(100% - 95px)!important;min-height:40px!important;padding:7px 8px!important;border:1px solid #cbd5e1!important;border-radius:12px!important;background:#f8fafc!important;color:#172033!important;font-size:14px!important;vertical-align:middle!important}

/* Native iOS-inspired gym visual system */
:root{color-scheme:light;--gym-ink:#101828;--gym-muted:#667085;--gym-blue:#0a84ff;--gym-blue-dark:#0066cc;--gym-green:#30d158;--gym-bg:#f2f2f7;--gym-card:#fff;--gym-line:#d9d9de;--gym-fill:#e9e9ee}
html,body{background:var(--gym-bg)!important;color:var(--gym-ink)!important;font-family:-apple-system,BlinkMacSystemFont,"SF Pro Display","SF Pro Text",system-ui,sans-serif!important;-webkit-font-smoothing:antialiased!important}
body{line-height:1.42!important;-webkit-tap-highlight-color:transparent!important}
button,select,input{font-family:inherit!important;-webkit-appearance:none!important;appearance:none!important}
.top{background:linear-gradient(135deg,#0b1020,#15233d 58%,#0a5bd3)!important;color:#fff!important;padding:18px 20px!important;border:0!important;box-shadow:0 5px 18px rgba(15,23,42,.16)!important}
.top h1{letter-spacing:-.6px!important;font-weight:800!important}.top p,.top .muted{color:#d7deea!important}
.wrap{max-width:1180px!important;padding:14px!important}.grid{gap:14px!important}
.card{background:var(--gym-card)!important;border:1px solid var(--gym-line)!important;border-radius:20px!important;box-shadow:0 3px 14px rgba(15,23,42,.055)!important}
.cats button,.routine,.tab{background:#fff!important;color:var(--gym-ink)!important;border:1px solid #c9c9cf!important;border-radius:13px!important;font-weight:650!important;min-height:44px!important;transition:transform .12s ease,background .12s ease,border-color .12s ease!important}
.cats button:active,.routine:active,.tab:active,.log:active{transform:scale(.98)!important}
.cats button.active,.routine.active,.tab.active{background:#e5f0ff!important;color:#0066cc!important;border-color:#8dbfff!important;box-shadow:0 2px 7px rgba(10,132,255,.12)!important}
.log{background:linear-gradient(180deg,#0a84ff,#0066cc)!important;color:#fff!important;border:0!important;border-radius:13px!important;min-height:44px!important;font-weight:750!important;box-shadow:0 4px 10px rgba(10,132,255,.2)!important}
.toolbar select,.toolbar input,.builder-row select,.builder-row input,.setrow input{background:#fff!important;color:var(--gym-ink)!important;border:1px solid #c9c9cf!important;border-radius:12px!important;min-height:42px!important}
.section,.exercise-group h3{background:#f0f0f5!important;color:var(--gym-ink)!important;border:1px solid #dadadf!important;border-radius:13px!important}
.metric{background:linear-gradient(145deg,#fafaff,#f0f4fa)!important;border:1px solid #d9dee8!important;border-radius:15px!important}.progress-table th{background:#e9e9ee!important;color:var(--gym-ink)!important}
.muscles label{background:#fff!important;color:var(--gym-ink)!important;border:1px solid #c9c9cf!important;border-radius:13px!important;min-height:44px!important}
.badge{background:#e6f8eb!important;color:#16833b!important;font-weight:750!important;border-radius:999px!important}
.builder-row{padding:12px 0!important;border-bottom-color:#e1e1e6!important}.exercise-item{border-bottom-color:#e1e1e6!important}.empty{color:var(--gym-muted)!important;background:#f8f8fa!important;border:1px dashed #b7b7bf!important;border-radius:14px!important}
#builder{overflow-x:auto!important}
/* Smaller, cleaner completion controls */
.setrow button.log,.setrow button[aria-pressed]{min-width:44px!important;width:44px!important;height:44px!important;min-height:44px!important;padding:0!important;border-radius:12px!important;box-shadow:none!important;font-size:0!important;display:inline-flex!important;align-items:center!important;justify-content:center!important}
.setrow button.log.done,.setrow button[aria-pressed="true"]{background:#30d158!important;color:#fff!important;border-color:#30d158!important}
.setrow button.log.done::after,.setrow button[aria-pressed="true"]::after{content:'✓';font-size:20px!important;font-weight:800!important;line-height:1!important}
input:focus,select:focus,button:focus-visible{outline:3px solid rgba(10,132,255,.18)!important;outline-offset:1px!important;border-color:#0a84ff!important}
@media(max-width:600px),(pointer:coarse){
 html,body{width:100%!important;max-width:100%!important;overflow-x:hidden!important}body{padding-bottom:env(safe-area-inset-bottom)!important}
 .top{padding:16px!important}.wrap{padding:12px!important}.card{border-radius:18px!important;padding:14px!important}.tab{min-height:46px!important}.cats button,.routine{min-height:46px!important}.log{min-height:46px!important}.toolbar{gap:8px!important}
 .toolbar select,.toolbar input,.builder-row select,.builder-row input,.setrow input{min-height:44px!important;font-size:16px!important}
 .setrow button.log,.setrow button[aria-pressed]{width:42px!important;height:42px!important;min-width:42px!important;min-height:42px!important;border-radius:11px!important}
 #routine .workout-summary-inline{gap:6px 12px!important}#routine .workout-summary-exercise strong{font-size:16px!important}#routine .workout-summary-pair .muted{font-size:11px!important}#routine .workout-summary-pair strong{font-size:15px!important}#routine .workout-summary-equipment select{min-width:118px!important;max-width:calc(100% - 92px)!important;font-size:14px!important}
}
@media(max-width:380px){.wrap{padding:9px!important}.card{border-radius:16px!important;padding:12px!important}.setrow button.log,.setrow button[aria-pressed]{width:40px!important;height:40px!important;min-width:40px!important;min-height:40px!important}}
</style>`;
function inject(html){return html.includes('workout-summary-v26-css')&&html.includes('--gym-blue')?html.replace('</body>',FIX+'</body>'):html.replace('</body>',FIX+'</body>')}
self.addEventListener('install',e=>e.waitUntil((async()=>{const c=await caches.open(CACHE);for(const p of CORE){const r=await fetch(p,{cache:'no-store'});if(!r.ok)throw new Error('Failed to cache '+p);await c.put(p,r)}await self.skipWaiting()})()));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith((async()=>{try{const r=await fetch(e.request,{cache:'no-store'});if(e.request.mode==='navigate'||e.request.destination==='document'){const html=inject(await r.text());const out=new Response(html,{status:r.status,statusText:r.statusText,headers:{'Content-Type':'text/html;charset=UTF-8'}});const c=await caches.open(CACHE);await c.put(e.request,out.clone());return out}const c=await caches.open(CACHE);await c.put(e.request,r.clone());return r}catch(err){return(await caches.match(e.request))||caches.match('./index.html')}})())});
