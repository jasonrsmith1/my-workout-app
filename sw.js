const CACHE='my-workout-pwa-v11';
const CORE=['./','./index.html','./manifest.webmanifest','./icon.svg','./app-20260924.txt'];
const FIX=`<script id="category-navigation-fix">(function(){
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
  var visible=Array.prototype.find.call(list.children,function(card){return card.style.display!=='none';});
  if(visible)visible.scrollIntoView({behavior:'smooth',block:'start'});
}
window.__applyWorkoutCategory=applyCategoryFilter;
function wire(){
  var cats=document.getElementById('cats');
  if(!cats||cats.dataset.categoryFix==='1')return;
  cats.dataset.categoryFix='1';
  cats.addEventListener('click',function(ev){
    var b=ev.target.closest('button');
    if(!b)return;
    ev.preventDefault();ev.stopImmediatePropagation();
    var text=b.textContent.trim();
    var sheet=text==='Shoulders & Back'?'Shoulders.Back':text;
    applyCategoryFilter(sheet);
  },true);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',wire);else wire();
new MutationObserver(wire).observe(document.documentElement,{childList:true,subtree:true});
})();</script>`;
function inject(html){return html.includes('category-navigation-fix')?html:html.replace('</body>',FIX+'</body>')}
self.addEventListener('install',e=>e.waitUntil((async()=>{const c=await caches.open(CACHE);for(const p of CORE){const r=await fetch(p,{cache:'no-store'});if(!r.ok)throw new Error('Failed to cache '+p);await c.put(p,r)};await self.skipWaiting()})()));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith((async()=>{try{const r=await fetch(e.request,{cache:'no-store'});if(e.request.mode==='navigate'||e.request.destination==='document'){const html=inject(await r.text());const out=new Response(html,{status:r.status,statusText:r.statusText,headers:{'Content-Type':'text/html;charset=UTF-8'}});const c=await caches.open(CACHE);await c.put(e.request,out.clone());return out}const c=await caches.open(CACHE);await c.put(e.request,r.clone());return r}catch(err){return (await caches.match(e.request))||caches.match('./index.html')}})())});