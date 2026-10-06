const CACHE='my-workout-pwa-v17';
const CORE=['./','./index.html','./manifest.webmanifest','./icon.svg','./app-20260924.txt','./category-navigation.js?v=2'];
const FIX=`<style id="workout-ui-polish">
:root{color-scheme:light;--ink:#172033;--muted:#526176;--line:#cbd5e1;--panel:#fff}
*{box-sizing:border-box}
html,body{width:100%;max-width:100%;overflow-x:hidden}
body{background:#eef2f6!important;color:var(--ink)!important;line-height:1.45;margin:0}
.top{background:#0b1220!important;padding:16px 20px!important;border-bottom:1px solid #334155;box-shadow:0 2px 10px #0002}
.top p,.muted{color:#526176!important}
.wrap{width:100%;max-width:1180px!important;padding:16px!important;margin:0 auto}.grid{grid-template-columns:220px minmax(0,1fr)!important;gap:16px!important}
.card{background:#fff!important;border:1px solid #cbd5e1!important;border-radius:12px!important;box-shadow:0 2px 8px #0f172a18!important;min-width:0}
.cats button,.routine,.tab{color:#172033!important;background:#fff!important;border-color:#94a3b8!important;font-weight:600}
.cats button:hover,.routine:hover,.tab:hover{background:#f1f5f9!important;border-color:#475569!important}
.cats button.active,.routine.active,.tab.active,.log{background:#0f1720!important;color:#fff!important;border-color:#0f1720!important}
.toolbar select,.toolbar input,.builder-row select,.builder-row input,.setrow input{background:#fff!important;color:#172033!important;border-color:#94a3b8!important;max-width:100%}
.section,.exercise-group h3{background:#e2e8f0!important;color:#172033!important;border:1px solid #cbd5e1}
.metric{background:#eef3f8!important;border:1px solid #cbd5e1}.progress-table th{background:#e2e8f0;color:#172033}
.muscles label{background:#fff!important;color:#172033!important;border-color:#94a3b8!important}
.badge{background:#e0e7ff!important;color:#26356b!important;font-weight:600}
.builder-row{padding:11px 0!important;border-bottom-color:#cbd5e1!important}
.exercise-item{border-bottom-color:#cbd5e1!important}
.empty{color:#526176!important;background:#f8fafc;border:1px dashed #94a3b8;border-radius:10px}
#builder{overflow-x:hidden;min-width:0}.free-build-bar{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;margin:12px 0;padding:12px;background:#eef3f8;border:1px solid #cbd5e1;border-radius:10px}.free-build-count{font-weight:700;color:#172033}
@media(max-width:800px){.grid{grid-template-columns:1fr!important}.wrap{padding:10px!important}.card{padding:13px!important}.top{padding:14px 12px!important}.top h1{font-size:20px!important}.tabs{gap:6px!important}.tab{padding:9px 11px!important}.toolbar{gap:8px!important}.builder-row{grid-template-columns:minmax(150px,1fr) 64px 86px 105px!important}}
@media(max-width:560px){
  .top{padding:12px 10px!important}.top h1{font-size:18px!important;line-height:1.2!important}.top p{font-size:13px!important;margin:4px 0 0!important}
  .wrap{padding:8px!important}.card{padding:11px!important;border-radius:10px!important}
  .tabs{display:grid!important;grid-template-columns:1fr 1fr!important;width:100%!important}.tabs .tab{width:100%;min-width:0;padding:10px 6px!important;font-size:13px!important}
  .workout-nav{display:flex!important;flex-direction:column!important;gap:8px!important}.workout-nav label{min-width:100%!important;width:100%!important}.workout-nav input{width:100%;min-width:0}.workout-nav select{max-width:100%;width:100%}
  .toolbar{display:flex!important;flex-direction:column!important;align-items:stretch!important;width:100%!important}.toolbar>*{width:100%!important;min-width:0!important}.toolbar button{min-height:42px!important}
  .free-build-bar{flex-direction:column!important;align-items:stretch!important}.free-build-bar>div{width:100%!important}.free-build-bar button{flex:1;min-height:42px!important}
  .setrow{grid-template-columns:36px minmax(0,1fr) minmax(0,1fr) 58px!important;gap:5px!important}.setdone{padding:7px 4px!important;font-size:12px!important}
  .builder-row{display:grid!important;grid-template-columns:minmax(0,1fr) 52px 68px!important;gap:6px!important;font-size:13px!important;align-items:center!important}.builder-row>div:first-child{grid-column:1/-1;min-width:0}.builder-row input,.builder-row select{width:100%!important;min-width:0!important;padding:8px 6px!important;font-size:13px!important}
  .metricgrid{grid-template-columns:1fr 1fr!important}.metric{min-width:0!important}.progress-table{display:block!important;overflow-x:auto!important;max-width:100%!important}
  .muscles{grid-template-columns:1fr 1fr!important}.muscles label{padding:9px 7px!important;font-size:13px!important}
  .routine{padding:11px!important}.section{padding:10px!important}
  input,select,button{font-size:16px!important}input[type=number],input[type=text],input:not([type]){max-width:100%}
}
@media(max-width:380px){.muscles{grid-template-columns:1fr!important}.metricgrid{grid-template-columns:1fr!important}.tabs{grid-template-columns:1fr!important}.free-build-bar button{font-size:14px!important}.builder-row{grid-template-columns:minmax(0,1fr) 48px 64px!important}}
</style><script id="workout-fixes-v17">(function(){
function applyCategoryFilter(sheet){window.__selectedWorkoutCategory=sheet;if(typeof showTab==='function')showTab('premade');if(typeof renderPremade==='function')renderPremade();var wanted=sheet==='Shoulders.Back'?'Shoulders & Back':sheet,list=document.getElementById('premadeList');if(!list)return;Array.prototype.forEach.call(list.children,function(card){var h=card.querySelector('h3');card.style.display=(h&&h.textContent.trim()===wanted)?'block':'none'})}
window.__applyWorkoutCategory=applyCategoryFilter;
function wireCats(){var cats=document.getElementById('cats');if(!cats)return;Array.prototype.forEach.call(cats.querySelectorAll('button'),function(b){if(b.dataset.categoryFix==='1')return;b.dataset.categoryFix='1';b.onclick=function(ev){if(ev){ev.preventDefault();ev.stopPropagation()}var t=(b.textContent||'').trim();applyCategoryFilter(t==='Shoulders & Back'?'Shoulders.Back':t);return false}})}
function selectedCount(){var box=document.getElementById('exerciseLibrary');return box?box.querySelectorAll('input[type="checkbox"]:checked').length:0}
function buildSelectedNow(){if(typeof buildFromSelected==='function'){buildFromSelected();if(typeof showTab==='function')showTab('builder');setTimeout(function(){var b=document.getElementById('builder');if(b)b.scrollIntoView({behavior:'smooth',block:'start'})},50)}}
function wireFreeBuild(){var ex=document.getElementById('exercisesTab');if(!ex)return;var toolbar=ex.querySelector('.toolbar');if(toolbar&&!document.getElementById('freeBuildBar')){var bar=document.createElement('div');bar.id='freeBuildBar';bar.className='free-build-bar';bar.innerHTML='<span class="free-build-count" id="freeBuildCount">0 exercises selected</span><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="log" type="button" id="freeBuildButton">Build Selected</button><button class="tab" type="button" id="freeBuildClear">Clear Selection</button></div>';toolbar.parentNode.insertBefore(bar,toolbar.nextSibling);document.getElementById('freeBuildButton').onclick=buildSelectedNow;document.getElementById('freeBuildClear').onclick=function(){if(typeof clearSelection==='function')clearSelection();updateCount()}}function updateCount(){var n=selectedCount(),c=document.getElementById('freeBuildCount');if(c)c.textContent=n+' exercise'+(n===1?'':'s')+' selected'}ex.addEventListener('change',function(ev){if(ev.target&&ev.target.matches('input[type="checkbox"]'))updateCount()});updateCount()}
function init(){wireCats();wireFreeBuild()}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();setTimeout(init,300);setTimeout(init,1000);setTimeout(init,2500);setInterval(init,5000);new MutationObserver(function(){wireCats();wireFreeBuild()}).observe(document.documentElement,{childList:true,subtree:true});})();</script>`;
function inject(html){return html.includes('workout-fixes-v17')?html:html.replace('</body>',FIX+'</body>')}
self.addEventListener('install',e=>e.waitUntil((async()=>{const c=await caches.open(CACHE);for(const p of CORE){const r=await fetch(p,{cache:'no-store'});if(!r.ok)throw new Error('Failed to cache '+p);await c.put(p,r)}await self.skipWaiting()})()));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith((async()=>{try{const r=await fetch(e.request,{cache:'no-store'});if(e.request.mode==='navigate'||e.request.destination==='document'){const html=inject(await r.text());const out=new Response(html,{status:r.status,statusText:r.statusText,headers:{'Content-Type':'text/html;charset=UTF-8'}});const c=await caches.open(CACHE);await c.put(e.request,out.clone());return out}const c=await caches.open(CACHE);await c.put(e.request,r.clone());return r}catch(err){return(await caches.match(e.request))||caches.match('./index.html')}})())});