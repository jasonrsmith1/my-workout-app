(function(){
  'use strict';
  if(window.__historyDrilldownFixV4)return;
  window.__historyDrilldownFixV4=true;
  function read(k){try{var a=JSON.parse(localStorage.getItem(k)||'[]');return Array.isArray(a)?a:[]}catch(e){return[]}}
  function timers(){return read('workout_timer_v1').map(function(x){return {date:x.date||x.timestamp||'',seconds:Number(x.seconds)||0,type:String(x.type||''),routine:String(x.routine||''),sheet:String(x.sheet||''),cardio:x.cardio===true}})}
  function logs(){var a=read('workout_v3');return Array.isArray(a)?a:[]}
  function logEntries(){try{var a=JSON.parse(localStorage.getItem('workout_v3')||'{}').logs;return Array.isArray(a)?a:[]}catch(e){return[]}}
  function esc(s){return String(s==null?'':s).replace(/[&<>\"']/g,function(m){return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[m]})}
  function routineFromLogs(date){var best=null,score=Infinity;logEntries().forEach(function(l){if(!l||l.cardio===true)return;var d=new Date(l.date||l.timestamp).getTime(),t=new Date(date).getTime();if(!isFinite(d)||!isFinite(t))return;var diff=Math.abs(d-t);if(diff<score&&diff<300000&&l.routine){score=diff;best=String(l.routine)}});return best}
  function closestMatch(row){var cells=row.querySelectorAll('td');if(!cells.length)return null;var target=new Date((cells[0].textContent||'').trim()).getTime(),best=null,bestScore=Infinity;timers().forEach(function(x){var d=new Date(x.date).getTime();if(!isFinite(d)||!isFinite(target))return;var diff=Math.abs(d-target);if(diff<bestScore){bestScore=diff;best=x}});if(!best||bestScore>=300000)return null;if(!best.routine||best.routine==='Workout'){var fromLogs=routineFromLogs(best.date);if(fromLogs)best.routine=fromLogs}return best}
  function render(){
    var d=document.getElementById('haDrill');if(!d)return;var table=d.querySelector('table');if(!table)return;var heads=table.querySelectorAll('thead th');if(!heads.length)return;var routineIndex=-1;
    Array.prototype.forEach.call(heads,function(h,i){if(/routine|workout|type/i.test(h.textContent||''))routineIndex=i});if(routineIndex<0)return;
    heads[routineIndex].textContent='Routine';
    Array.prototype.forEach.call(table.querySelectorAll('tbody tr'),function(row){var match=closestMatch(row),cells=row.querySelectorAll('td');if(!cells.length||routineIndex>=cells.length)return;var cell=cells[routineIndex];if(match){var routine=match.routine&&match.routine!=='Workout'?match.routine:(match.cardio?'Cardio':'Workout');var html='<strong>'+esc(routine)+'</strong>';if(cell.innerHTML!==html)cell.innerHTML=html;}});
    var key=d.querySelector('.hd-key');if(key)key.remove();
  }
  function style(){if(document.getElementById('history-drilldown-fix-style-v4'))return;var s=document.createElement('style');s.id='history-drilldown-fix-style-v4';s.textContent='#history .ha-drill table{width:100%!important;table-layout:fixed!important}#history .ha-drill th,#history .ha-drill td{white-space:normal!important;overflow-wrap:anywhere!important;vertical-align:top!important}@media(max-width:650px){#history .ha-drill{overflow:hidden!important}#history .ha-drill table{font-size:12px!important}#history .ha-drill th,#history .ha-drill td{padding:7px 5px!important}}';document.head.appendChild(s)}
  function boot(){style();render();var d=document.getElementById('haDrill');if(d&&!d.__hdObserver){d.__hdObserver=new MutationObserver(function(){clearTimeout(d.__hdTimer);d.__hdTimer=setTimeout(render,30)});d.__hdObserver.observe(d,{childList:true,subtree:true})}}
  boot();setTimeout(boot,300);setTimeout(boot,1000);window.addEventListener('load',boot);
})();
