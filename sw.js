const CACHE='my-workout-pwa-v21';
const CORE=['./','./index.html','./manifest.webmanifest','./icon.svg','./app-20260924.txt','./category-navigation.js?v=2'];
const FIX=`<style id="workout-ui-v21">
:root{color-scheme:light;--ink:#172033;--muted:#526176;--line:#cbd5e1}
*,*:before,*:after{box-sizing:border-box}
html,body{width:100%;max-width:100%;overflow-x:hidden}
body{margin:0;background:#eef2f6!important;color:var(--ink)!important;line-height:1.45}
.top{background:#0b1220!important;padding:16px 20px!important;border-bottom:1px solid #334155;box-shadow:0 2px 10px #0002}
.top p,.muted{color:var(--muted)!important}
.wrap{width:100%;max-width:1180px!important;margin:0 auto;padding:16px!important}
.grid{grid-template-columns:220px minmax(0,1fr)!important;gap:16px!important}
.card{min-width:0!important;max-width:100%!important;overflow:hidden!important;background:#fff!important;border:1px solid var(--line)!important;border-radius:12px!important;box-shadow:0 2px 8px #0f172a18!important}
.cats button,.routine,.tab{color:var(--ink)!important;background:#fff!important;border-color:#94a3b8!important;font-weight:600}
.cats button.active,.routine.active,.tab.active,.log{background:#0f1720!important;color:#fff!important;border-color:#0f1720!important}
.toolbar{min-width:0!important}.toolbar select,.toolbar input,.builder-row select,.builder-row input,.setrow input{max-width:100%!important;min-width:0!important;background:#fff!important;color:var(--ink)!important;border-color:#94a3b8!important}
.section,.exercise-group h3{background:#e2e8f0!important;color:var(--ink)!important;border:1px solid var(--line)}
.metric{background:#eef3f8!important;border:1px solid var(--line)!important}
.progress-table{max-width:100%!important}.progress-table th{background:#e2e8f0!important;color:var(--ink)!important}
.muscles label{background:#fff!important;color:var(--ink)!important;border-color:#94a3b8!important}
.badge{background:#e0e7ff!important;color:#26356b!important;font-weight:600}
.builder-row,.exercise-item{border-bottom-color:var(--line)!important;min-width:0!important}
#builder,#premadeList,#exerciseLibrary{min-width:0!important;max-width:100%!important;overflow:hidden!important}
#premadeList>*{min-width:0!important;max-width:100%!important}
/* Workout exercise summary: Exercise on top; Sets, Reps, Equipment aligned side-by-side below */
.workout-plan-row{display:grid!important;grid-template-columns:minmax(0,1fr) 54px minmax(90px,1fr)!important;grid-template-rows:auto auto!important;gap:7px!important;align-items:end!important;width:100%!important;min-width:0!important}
.workout-plan-exercise{grid-column:1/-1!important;grid-row:1!important;min-width:0!important;width:100%!important}
.workout-plan-cell:nth-child(2){grid-column:1!important;grid-row:2!important;min-width:0!important}
.workout-plan-cell:nth-child(3){grid-column:2!important;grid-row:2!important;min-width:0!important}
.workout-plan-equipment{grid-column:3!important;grid-row:2!important;min-width:0!important}
.workout-plan-label{display:block!important;margin-bottom:3px!important;color:#6c6c70!important;font-size:11px!important;font-weight:600!important;line-height:1.15!important}
.workout-plan-exercise>strong{display:block!important;color:#1c1c1e!important;font-size:17px!important;line-height:1.2!important;overflow-wrap:anywhere!important}
.workout-plan-cell>strong{display:block!important;color:#1c1c1e!important;font-size:16px!important;line-height:1.2!important;text-align:center!important}
.workout-plan-equipment select{width:100%!important;min-width:0!important;max-width:100%!important;min-height:40px!important;padding:7px 6px!important;border:1px solid #c7c7cc!important;border-radius:10px!important;background:#f2f2f7!important;color:#1c1c1e!important;font-size:14px!important}
@media(max-width:800px){
 .grid{grid-template-columns:1fr!important}.wrap{padding:10px!important}.card{padding:13px!important}.top{padding:14px 12px!important}.top h1{font-size:20px!important}
 .tabs{gap:6px!important}.tab{padding:9px 11px!important}.toolbar{gap:8px!important}
 .workout-plan-row{grid-template-columns:minmax(0,1fr) 50px minmax(90px,1fr)!important;gap:6px!important}
}
@media(max-width:560px){
 html,body{width:100vw!important;max-width:100vw!important;overflow-x:hidden!important}
 .top{padding:10px!important;position:relative!important}.top h1{font-size:18px!important;line-height:1.2!important}.top p{font-size:12px!important}
 .wrap{width:100%!important;max-width:100%!important;padding:7px!important;margin:0!important}
 .card{width:100%!important;max-width:100%!important;padding:10px!important;margin:0!important;border-radius:10px!important;overflow:hidden!important}
 .tabs{display:grid!important;grid-template-columns:1fr 1fr!important;width:100%!important;gap:6px!important}.tabs .tab{width:100%!important;min-width:0!important;padding:10px 5px!important;font-size:13px!important;white-space:normal!important}
 .toolbar{display:flex!important;flex-direction:column!important;align-items:stretch!important;width:100%!important;max-width:100%!important}.toolbar>*{width:100%!important;max-width:100%!important;min-width:0!important}.toolbar button{min-height:42px!important}
 .section{font-size:16px!important;overflow-wrap:anywhere!important}
 #premadeList h1,#premadeList h2,#premadeList h3{max-width:100%!important;overflow-wrap:anywhere!important;word-break:normal!important}
 #premadeList .muted{max-width:100%!important;overflow-wrap:anywhere!important}
 .setrows{width:100%!important;max-width:100%!important;overflow:hidden!important}
 .setrow{width:100%!important;max-width:100%!important;min-width:0!important;display:grid!important;grid-template-columns:42px minmax(0,1fr) minmax(0,1fr)!important;gap:6px!important;padding:7px!important;align-items:center!important}
 .setrow input{width:100%!important;min-width:0!important;height:44px!important;padding:8px!important;font-size:16px!important}
 .setrow .setdone{grid-column:1/-1!important;width:100%!important;min-width:0!important;min-height:40px!important;padding:8px!important;font-size:14px!important}
 .setrow.completed{overflow:hidden!important}
 .builder-row{display:grid!important;grid-template-columns:minmax(0,1fr) 52px 68px!important;gap:6px!important;font-size:13px!important;width:100%!important;min-width:0!important}.builder-row>div:first-child{grid-column:1/-1;min-width:0!important}.builder-row input,.builder-row select{width:100%!important;min-width:0!important;padding:8px 5px!important}
 .metricgrid{grid-template-columns:1fr 1fr!important}.progress-table{display:block!important;overflow-x:auto!important;max-width:100%!important}
 .muscles{grid-template-columns:1fr 1fr!important}.muscles label{padding:9px 7px!important;font-size:13px!important}
 input,select,button{font-size:16px!important}
 .workout-plan-row{grid-template-columns:minmax(0,1fr) 46px minmax(82px,1fr)!important;gap:5px!important}
 .workout-plan-label{font-size:11px!important}.workout-plan-exercise>strong{font-size:16px!important}.workout-plan-cell>strong{font-size:16px!important}.workout-plan-equipment select{font-size:13px!important;min-height:40px!important;padding:7px 5px!important}
}
@media(max-width:380px){
 .tabs{grid-template-columns:1fr!important}.muscles,.metricgrid{grid-template-columns:1fr!important}.builder-row{grid-template-columns:minmax(0,1fr) 48px 64px!important}
 .workout-plan-row{grid-template-columns:minmax(0,1fr) 43px minmax(76px,1fr)!important;gap:4px!important}.workout-plan-exercise>strong{font-size:15px!important}.workout-plan-cell>strong{font-size:15px!important}.workout-plan-equipment select{font-size:12px!important}
}
</style><script id="workout-fixes-v21">(function(){
function applyCategoryFilter(sheet){window.__selectedWorkoutCategory=sheet;if(typeof showTab==='function')showTab('premade');if(typeof renderPremade==='function')renderPremade();var wanted=sheet==='Shoulders.Back'?'Shoulders & Back':sheet,list=document.getElementById('premadeList');if(!list)return;Array.prototype.forEach.call(list.children,function(card){var h=card.querySelector('h3');card.style.display=(h&&h.textContent.trim()===wanted)?'block':'none'})}
function wireCats(){var cats=document.getElementById('cats');if(!cats)return;Array.prototype.forEach.call(cats.querySelectorAll('button'),function(b){if(b.dataset.categoryFix==='1')return;b.dataset.categoryFix='1';b.addEventListener('click',function(ev){ev.preventDefault();ev.stopImmediatePropagation();var t=(b.textContent||'').trim();applyCategoryFilter(t==='Shoulders & Back'?'Shoulders.Back':t)},true)})}
function init(){try{wireCats()}catch(e){}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
setTimeout(init,500);setTimeout(init,1500);setTimeout(init,3000);setInterval(init,8000);
})();</script>`;
function inject(html){return html.includes('workout-fixes-v21')?html:html.replace('</body>',FIX+'</body>')}
self.addEventListener('install',e=>e.waitUntil((async()=>{const c=await caches.open(CACHE);for(const p of CORE){const r=await fetch(p,{cache:'no-store'});if(!r.ok)throw new Error('Failed to cache '+p);await c.put(p,r)}await self.skipWaiting()})()));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith((async()=>{try{const r=await fetch(e.request,{cache:'no-store'});if(e.request.mode==='navigate'||e.request.destination==='document'){const html=inject(await r.text());const out=new Response(html,{status:r.status,statusText:r.statusText,headers:{'Content-Type':'text/html;charset=UTF-8'}});const c=await caches.open(CACHE);await c.put(e.request,out.clone());return out}const c=await caches.open(CACHE);await c.put(e.request,r.clone());return r}catch(err){return(await caches.match(e.request))||caches.match('./index.html')}})())});