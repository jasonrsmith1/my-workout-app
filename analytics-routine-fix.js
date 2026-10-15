(function(){
  'use strict';
  if(window.__analyticsRoutineFixV2)return;
  window.__analyticsRoutineFixV2=true;
  var GENERIC=/^(workout|routine)(?:\s+[ivxlcdm0-9]+)?$/i;
  function good(v){v=String(v==null?'':v).trim();return v&&!GENERIC.test(v)?v:''}
  function key(v){var d=new Date(v);return isFinite(d.getTime())?[d.getFullYear(),d.getMonth(),d.getDate()].join('-'):''}
  function timers(){try{var a=JSON.parse(localStorage.getItem('workout_timer_v1')||'[]');return Array.isArray(a)?a:[]}catch(e){return[]}}
  function logs(){try{var a=JSON.parse(localStorage.getItem('workout_v3')||'{}').logs;return Array.isArray(a)?a:[]}catch(e){return[]}}
  function saved(){try{var a=JSON.parse(localStorage.getItem('workout_routine_v1')||'{}');return a&&typeof a==='object'?a:{}}catch(e){return{}}}
  function infer(k){var s=saved();if(s[k]&&good(s[k]))return s[k];var ts=timers(),hit=ts.slice().reverse().find(function(x){return key(x&& (x.date||x.timestamp))===k&&good(x&&x.routine)});if(hit)return good(hit.routine);var ex=[],ls=logs();ls.forEach(function(l){if(!l||l.cardio===true||key(l.date||l.timestamp)!==k)return;var e=String(l.exercise||l.exerciseName||'').trim();if(e&&!ex.some(function(x){return x.toLowerCase()===e.toLowerCase()}))ex.push(e)});if(typeof allRoutines!=='function'||!ex.length)return'';var all=allRoutines()||[],best='',score=0;all.forEach(function(r){if(!r||!good(r.name))return;var blob=JSON.stringify(r).toLowerCase(),n=0;ex.forEach(function(e){if(e.length>=4&&blob.indexOf(e.toLowerCase())>=0)n++});if(n>score){score=n;best=good(r.name)}});if(best){s[k]=best;try{localStorage.setItem('workout_routine_v1',JSON.stringify(s))}catch(e){}}return best}
  function esc(s){return String(s||'').replace(/[&<>\"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]})}
  function render(){var d=document.getElementById('haDrill');if(!d)return;var table=d.querySelector('table');if(!table)return;var rows=table.querySelectorAll('tbody tr');if(!rows.length)rows=table.querySelectorAll('tr');Array.prototype.forEach.call(rows,function(row,i){if(i===0&&row.querySelector('th'))return;var c=row.querySelectorAll('td');if(c.length<3)return;var r=infer((c[0].textContent||'').trim());if(r){c[2].innerHTML='<strong>'+esc(r)+'</strong>'}})}
  function boot(){render();setTimeout(render,100);setTimeout(render,400);setTimeout(render,900);setTimeout(render,1600)}
  boot();window.addEventListener('load',boot);new MutationObserver(function(){boot()}).observe(document.documentElement,{childList:true,subtree:true});
})();
