const CACHE='my-workout-pwa-v13';
const CORE=['./','./index.html','./manifest.webmanifest','./icon.svg','./app-20260924.txt','./category-navigation.js?v=2'];
const FIX=`<style id="workout-ui-polish">
:root{color-scheme:light;--ink:#172033;--muted:#526176;--line:#cbd5e1;--panel:#fff;--soft:#f1f5f9;--accent:#0f172a;--accent2:#1e293b}
body{background:#eef2f6!important;color:var(--ink)!important;line-height:1.45}
.top{background:#0b1220!important;padding:16px 20px!important;border-bottom:1px solid #334155;box-shadow:0 2px 10px #0002}
.top p,.muted{color:var(--muted)!important}
.wrap{max-width:1180px!important;padding:16px!important}.grid{grid-template-columns:220px minmax(0,1fr)!important;gap:16px!important}
.card{background:var(--panel)!important;border-color:#d5dce5!important;border-radius:12px!important;box-shadow:0 2px 8px #0f172a12!important}
.cats button,.routine,.tab{color:var(--ink)!important;background:#fff!important;border-color:#b8c2cf!important;font-weight:600}
.cats button:hover,.routine:hover,.tab:hover{background:#f1f5f9!important;border-color:#64748b!important}
.cats button.active,.routine.active,.tab.active,.log{background:#0f172a!important;color:#fff!important;border-color:#0f172a!important}
.toolbar select,.toolbar input,.builder-row select,.builder-row input,.setrow input{background:#fff!important;color:var(--ink)!important;border-color:#aeb9c7!important}
.section,.exercise-group h3{background:#e7edf4!important;color:#172033!important;border:1px solid #d2dae4}
.metric{background:#eef3f8!important;border:1px solid #d5dde7}.progress-table th{background:#e7edf4;color:#172033}
.muscles label{background:#fff!important;color:var(--ink)!important;border-color:#b8c2cf!important}
.badge{background:#e0e7ff!important;color:#26356b!important;font-weight:600}
.builder-row{padding:11px 0!important;border-bottom-color:#dbe2ea!important}
.exercise-item{border-bottom-color:#dbe2ea!important}
.empty{color:var(--muted)!important;background:#f8fafc;border:1px dashed #c5cfdb;border-radius:10px}
#builder{overflow-x:auto}
@media(max-width:800px){.grid{grid-template-columns:1fr!important}.wrap{padding:10px!important}.card{padding:13px!important}.top{padding:14px 12px!important}.top h1{font-size:20px!important}.tabs{gap:6px!important}.tab{padding:9px 11px!important}.toolbar{gap:8px!important}.builder-row{grid-template-columns:minmax(150px,1fr) 64px 86px 105px!important}}
@media(max-width:560px){.tabs{display:grid!important;grid-template-columns:1fr 1fr!important}.tabs .tab{width:100%}.workout-nav label{min-width:100%!important}.workout-nav input{width:100%;min-width:0}.setrow{grid-template-columns:42px minmax(0,1fr) minmax(0,1fr) 62px!important}.setdone{padding:7px 5px!important}.builder-row{grid-template-columns:minmax(145px,1fr) 58px 78px 92px!important;font-size:13px}.builder-row input,.builder-row select{padding:7px!important}.metricgrid{grid-template-columns:1fr 1fr!important}}
</style><script id="category-navigation-fix">(function(){
function applyCategoryFilter(sheet){
  window.__selectedWorkoutCategory=sheet;
  if(typeof showTab==='function') showTab('premade');
  if(typeof renderPremade==='function') renderPremade();
  var wanted=sheet==='Shoulders.Back'?'Shoulders & Back':sheet;
  var list=document.getElementById('premadeList');
  if(!list)return;
  Array.prototype.forEach.call(list.children,function(card){
    var h=card.querySelector('h3');
    card.style.display=(h&&h.textContent.trim()===wanted)?'block':'none';
  });
}
window.__applyWorkoutCategory=applyCategoryFilter;
function wire(){
  var cats=document.getElementById('cats');
  if(!cats)return;
  Array.prototype.forEach.call(cats.querySelectorAll('button'),function(b){
    if(b.dataset.categoryFix==='1')return;
    b.dataset.categoryFix='1';
    b.onclick=function(ev){
      if(ev){ev.preventDefault();ev.stopPropagation();}
      var text=(b.textContent||'').trim();
      applyCategoryFilter(text==='Shoulders & Back'?'Shoulders.Back':text);
      return false;
    };
  });
}
function capBuilder(){
  window.MAX_BUILDER_MOVEMENTS=25;
  function cap(list){return Array.isArray(list)?list.slice(0,25):[]}
  if(typeof loadPremadeIntoBuilder==='function'){
    var oldLoad=loadPremadeIntoBuilder;
    window.loadPremadeIntoBuilder=function(){oldLoad();if(builderExercises.length>25){builderExercises=cap(builderExercises);renderBuilderRows();}}
  }
  if(typeof buildSuggested==='function'){
    var oldSuggested=buildSuggested;
    window.buildSuggested=function(){oldSuggested();if(builderExercises.length>25){builderExercises=cap(builderExercises);renderBuilderRows();}}
  }
  if(typeof buildFromSelected==='function'){
    var oldSelected=buildFromSelected;
    window.buildFromSelected=function(){oldSelected();if(builderExercises.length>25){builderExercises=cap(builderExercises);renderBuilderRows();}}
  }
  if(typeof saveCustomWorkout==='function'){
    var oldSave=saveCustomWorkout;
    window.saveCustomWorkout=function(){
      if(builderExercises.length>25)builderExercises=cap(builderExercises);
      oldSave();
    }
  }
  var builder=document.getElementById('builder');
  if(builder&&!builder.dataset.limitNotice){builder.dataset.limitNotice='1';}
}
function addBuilderNotice(){
  var card=document.querySelector('#builderTab .card');
  if(!card||card.querySelector('.builder-limit'))return;
  var p=document.createElement('p');p.className='muted builder-limit';p.innerHTML='<strong>Maximum 25 movements.</strong> A workout can contain up to 25 exercises.';p.style.cssText='margin:-6px 0 14px;color:#334155!important;font-weight:600';
  var choices=document.getElementById('muscleChoices');if(choices)card.insertBefore(p,choices);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){wire();capBuilder();addBuilderNotice()});else{wire();capBuilder();addBuilderNotice()}
new MutationObserver(function(){wire();addBuilderNotice()}).observe(document.documentElement,{childList:true,subtree:true});
})();</script>`;
function inject(html){return html.includes('workout-ui-polish')?html:html.replace('</body>',FIX+'</body>')}
self.addEventListener('install',e=>e.waitUntil((async()=>{const c=await caches.open(CACHE);for(const p of CORE){const r=await fetch(p,{cache:'no-store'});if(!r.ok)throw new Error('Failed to cache '+p);await c.put(p,r)};await self.skipWaiting()})()));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith((async()=>{try{const r=await fetch(e.request,{cache:'no-store'});if(e.request.mode==='navigate'||e.request.destination==='document'){const html=inject(await r.text());const out=new Response(html,{status:r.status,statusText:r.statusText,headers:{'Content-Type':'text/html;charset=UTF-8'}});const c=await caches.open(CACHE);await c.put(e.request,out.clone());return out}const c=await caches.open(CACHE);await c.put(e.request,r.clone());return r}catch(err){return (await caches.match(e.request))||caches.match('./index.html')}})())});