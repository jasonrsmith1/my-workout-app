(function(){
  'use strict';
  if(window.__historyDrilldownFixV7)return;
  window.__historyDrilldownFixV7=true;
  function read(k){try{var a=JSON.parse(localStorage.getItem(k)||'[]');return Array.isArray(a)?a:[]}catch(e){return[]}}
  function timers(){return read('workout_timer_v1').map(function(x){return {date:x.date||x.timestamp||'',seconds:Number(x.seconds)||0,type:String(x.type||''),routine:String(x.routine||''),sheet:String(x.sheet||''),workout:String(x.workout||''),cardio:x.cardio===true}})}
  function logEntries(){try{var a=JSON.parse(localStorage.getItem('workout_v3')||'{}').logs;return Array.isArray(a)?a:[]}catch(e){return[]}}
  function esc(s){return String(s==null?'':s).replace(/[&<>\"']/g,function(m){return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[m]})}
  function dayKey(v){var d=new Date(v);return isFinite(d.getTime())?[d.getFullYear(),d.getMonth(),d.getDate()].join('-'):''}
  function routineForDay(date){
    var key=dayKey(date),counts={},best='';
    if(!key)return '';
    logEntries().forEach(function(l){
      if(!l||l.cardio===true)return;
      var r=String(l.routine||l.workout||l.workoutName||l.sheet||'').trim();
      if(!r||/^workout$/i.test(r))return;
      if(dayKey(l.date||l.timestamp)!==key)return;
      counts[r]=(counts[r]||0)+1;
      if(!best||counts[r]>counts[best])best=r;
    });
    if(best)return best;
    var ts=timers(),same=[];
    ts.forEach(function(x){if(x.cardio===true)return;if(dayKey(x.date)===key){var r=String(x.routine||x.workout||x.sheet||'').trim();if(r&&!/^workout$/i.test(r))same.push(r)}});
    return same[0]||'';
  }
  function closestMatch(row){
    var cells=row.querySelectorAll('td');if(!cells.length)return null;
    var targetText=(cells[0].textContent||'').trim(),target=new Date(targetText).getTime(),best=null,bestScore=Infinity;
    timers().forEach(function(x){var d=new Date(x.date).getTime();if(!isFinite(d)||!isFinite(target))return;var diff=Math.abs(d-target);if(diff<bestScore){bestScore=diff;best=x}});
    var routine=routineForDay(targetText);
    if(best){if(best.cardio)return best;if(routine)best.routine=routine;if(!best.routine||/^workout$/i.test(best.routine)){var fallback=String(best.workout||best.sheet||'').trim();if(fallback&&!/^workout$/i.test(fallback))best.routine=fallback}}
    if(best&&bestScore<86400000)return best;
    return routine?{date:targetText,routine:routine,cardio:false}:null;
  }
  function render(){
    var d=document.getElementById('haDrill');if(!d)return;var table=d.querySelector('table');if(!table)return;var heads=table.querySelectorAll('thead th');if(!heads.length)return;var routineIndex=-1;
    Array.prototype.forEach.call(heads,function(h,i){if(/routine|workout/i.test(h.textContent||''))routineIndex=i});if(routineIndex<0)return;
    heads[routineIndex].textContent='Routine';
    Array.prototype.forEach.call(table.querySelectorAll('tbody tr'),function(row){var match=closestMatch(row),cells=row.querySelectorAll('td');if(!cells.length||routineIndex>=cells.length)return;var cell=cells[routineIndex];var routine=match&&match.cardio?'Cardio':(match&&match.routine&&!/^workout$/i.test(match.routine)?match.routine:'');if(routine){var html='<strong>'+esc(routine)+'</strong>';if(cell.innerHTML!==html)cell.innerHTML=html;}});
    var key=d.querySelector('.hd-key');if(key)key.remove();
  }
  function style(){if(document.getElementById('history-drilldown-fix-style-v7'))return;var s=document.createElement('style');s.id='history-drilldown-fix-style-v7';s.textContent='#history .ha-drill table{width:100%!important;table-layout:fixed!important}#history .ha-drill th,#history .ha-drill td{white-space:normal!important;overflow-wrap:anywhere!important;vertical-align:top!important}@media(max-width:650px){#history .ha-drill{overflow:hidden!important}#history .ha-drill table{font-size:12px!important}#history .ha-drill th,#history .ha-drill td{padding:7px 5px!important}}';document.head.appendChild(s)}
  function boot(){style();render();var d=document.getElementById('haDrill');if(d&&!d.__hdObserver){d.__hdObserver=new MutationObserver(function(){clearTimeout(d.__hdTimer);d.__hdTimer=setTimeout(render,30)});d.__hdObserver.observe(d,{childList:true,subtree:true})}}
  boot();setTimeout(boot,300);setTimeout(boot,1000);window.addEventListener('load',boot);
})();