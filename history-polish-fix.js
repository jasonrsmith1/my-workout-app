(function(){
  'use strict';
  if(window.__historyPolishFixV1)return;
  window.__historyPolishFixV1=true;
  function logs(){try{var x=JSON.parse(localStorage.getItem('workout_v3')||'{}').logs;return Array.isArray(x)?x:[]}catch(e){return[]}}
  function n(v){var x=parseFloat(String(v==null?'':v).replace(/[^0-9.]/g,''));return isFinite(x)?x:0}
  function vol(l){if(!l||l.cardio===true)return 0;var eq=String(l.equipment||'').trim().toLowerCase();return n(l.repsCompleted||l.reps)*n(l.weight||l.load)*(eq==='dumbbells'?2:1)}
  function day(v){var d=new Date(v);return isFinite(d.getTime())?[d.getFullYear(),d.getMonth(),d.getDate()].join('-'):''}
  function routineFor(date){var key=day(date),counts={},best='';if(!key)return '';logs().forEach(function(l){if(!l||l.cardio===true||day(l.date||l.timestamp)!==key)return;var r=String(l.routine||l.workout||l.workoutName||'').trim();if(!r||/^workout$/i.test(r))return;counts[r]=(counts[r]||0)+1;if(!best||counts[r]>counts[best])best=r});return best}
  function render(){
    var h=document.getElementById('history');if(!h)return;
    var ls=logs().filter(function(l){return l&&l.cardio!==true}),total=ls.reduce(function(a,l){return a+vol(l)},0);
    var cards=h.querySelectorAll('.history-metrics>div');if(cards.length>=4){cards[0].querySelector('b').textContent=String(ls.length);cards[1].querySelector('b').textContent=Math.round(ls.reduce(function(a,l){return a+n(l.repsCompleted||l.reps)},0)).toLocaleString();cards[2].querySelector('b').textContent=Math.round(total).toLocaleString()+' lb';var ds={};ls.forEach(function(l){var k=day(l.date||l.timestamp);if(k)ds[k]=1});cards[3].querySelector('b').textContent=String(Object.keys(ds).length)}
    var d=document.getElementById('haDrill');if(!d)return;var table=d.querySelector('table');if(!table)return;var heads=table.querySelectorAll('thead th'),ri=-1;Array.prototype.forEach.call(heads,function(x,i){if(/routine|workout/i.test(x.textContent||''))ri=i});if(ri<0)return;
    Array.prototype.forEach.call(table.querySelectorAll('tbody tr'),function(row){var cells=row.querySelectorAll('td');if(!cells.length||ri>=cells.length)return;var r=routineFor((cells[0].textContent||'').trim());if(r){cells[ri].textContent=r}else if(/walking|cardio/i.test((cells[1]&&cells[1].textContent)||'')){cells[ri].textContent='Cardio'}})
  }
  function boot(){render();setTimeout(render,150);setTimeout(render,500);setTimeout(render,1200);setTimeout(render,2500)}
  boot();window.addEventListener('load',boot);document.addEventListener('click',function(e){var b=e.target&&e.target.closest?e.target.closest('button,.tab,[role="button"]'):null;if(b&&/history/i.test((b.textContent||'')))setTimeout(boot,120)},true);
  new MutationObserver(function(){clearTimeout(window.__historyPolishTimer);window.__historyPolishTimer=setTimeout(render,80)}).observe(document.documentElement,{childList:true,subtree:true});
})();
