(function(){
  'use strict';
  if(window.__analyticsRoutineFixV1)return;
  window.__analyticsRoutineFixV1=true;
  function logs(){try{var a=JSON.parse(localStorage.getItem('workout_v3')||'{}').logs;return Array.isArray(a)?a:[]}catch(e){return[]}}
  function generic(v){return /^(workout|routine)(?:\s+[ivxlcdm0-9]+)?$/i.test(String(v||'').trim())}
  function dayKey(v){var d=new Date(v);return isFinite(d.getTime())?[d.getFullYear(),d.getMonth(),d.getDate()].join('-'):''}
  function map(){try{var a=JSON.parse(localStorage.getItem('workout_routine_v1')||'{}');return a&&typeof a==='object'?a:{}}catch(e){return{}}}
  function saveMap(a){try{localStorage.setItem('workout_routine_v1',JSON.stringify(a))}catch(e){}}
  function infer(date){var k=dayKey(date),m=map(),ex=[],counts={},best='',bestScore=0;if(!k)return'';if(m[k]&&!generic(m[k]))return String(m[k]);logs().forEach(function(l){if(!l||l.cardio===true||dayKey(l.date||l.timestamp)!==k)return;var r=String(l.routineName||l.routine||l.workoutName||l.workout||'').trim(),e=String(l.exercise||l.exerciseName||'').trim();if(r&&!generic(r))counts[r]=(counts[r]||0)+1;if(e&&!ex.some(function(x){return x.toLowerCase()===e.toLowerCase()}))ex.push(e)});Object.keys(counts).forEach(function(r){if(!best||counts[r]>counts[best])best=r});if(best){m[k]=best;saveMap(m);return best}if(typeof allRoutines!=='function')return'';var all=allRoutines()||[];all.forEach(function(r){if(!r||!r.name||generic(r.name))return;var blob=JSON.stringify(r).toLowerCase(),score=0;ex.forEach(function(e){var n=e.toLowerCase();if(n.length>=4&&blob.indexOf(n)>=0)score++});if(score>bestScore){bestScore=score;best=String(r.name).trim()}});if(bestScore){m[k]=best;saveMap(m)}return best}
  function render(){var d=document.getElementById('haDrill');if(!d)return;var table=d.querySelector('table');if(!table)return;var heads=table.querySelectorAll('thead th'),idx=-1;Array.prototype.forEach.call(heads,function(h,i){if(/routine|workout|main focus/i.test(h.textContent||''))idx=i});if(idx<0)return;heads[idx].textContent='Routine';Array.prototype.forEach.call(table.querySelectorAll('tbody tr'),function(row){var cells=row.querySelectorAll('td');if(!cells.length||idx>=cells.length)return;var routine=infer((cells[0].textContent||'').trim()),cell=cells[idx];if(routine&&!generic(routine))cell.innerHTML='<strong>'+String(routine).replace(/[&<>\"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]})+'</strong>'})}
  function boot(){render();setTimeout(render,100);setTimeout(render,500);setTimeout(render,1200)}
  boot();window.addEventListener('load',boot);new MutationObserver(function(){boot()}).observe(document.documentElement,{childList:true,subtree:true});
})();
