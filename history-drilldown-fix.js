(function(){
  'use strict';
  if(window.__historyDrilldownFixV2)return;
  window.__historyDrilldownFixV2=true;
  function read(k){try{var a=JSON.parse(localStorage.getItem(k)||'[]');return Array.isArray(a)?a:[]}catch(e){return[]}}
  function esc(s){return String(s==null?'':s).replace(/[&<>\"']/g,function(m){return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[m]})}
  function timers(){return read('workout_timer_v1').map(function(x){return {date:x.date||x.timestamp||'',seconds:Number(x.seconds)||0,type:String(x.type||''),routine:String(x.routine||''),sheet:String(x.sheet||'')}})}
  function closestMatch(row){var cells=row.querySelectorAll('td');if(!cells.length)return null;var target=new Date((cells[0].textContent||'').trim()).getTime(),best=null,bestScore=Infinity;timers().forEach(function(x){var d=new Date(x.date).getTime();if(!isFinite(d)||!isFinite(target))return;var diff=Math.abs(d-target);if(diff<bestScore){bestScore=diff;best=x}});return bestScore<300000?best:null}
  function render(){
    var d=document.getElementById('haDrill');if(!d)return;var table=d.querySelector('table');if(!table)return;var heads=table.querySelectorAll('thead th');if(!heads.length)return;var routineIndex=-1;
    Array.prototype.forEach.call(heads,function(h,i){if(/routine|workout|type/i.test(h.textContent||''))routineIndex=i});if(routineIndex<0)return;
    if((heads[routineIndex].textContent||'')!=='Workout')heads[routineIndex].textContent='Workout';
    Array.prototype.forEach.call(table.querySelectorAll('tbody tr'),function(row){var match=closestMatch(row),cells=row.querySelectorAll('td');if(!cells.length||routineIndex>=cells.length)return;var cell=cells[routineIndex];
      if(match){var muscle=match.sheet&&match.sheet!=='Cardio'?match.sheet:'';var routine=match.routine&&match.routine!=='Workout'?match.routine:'';var main=muscle||routine||'Workout';var html='<strong>'+esc(main)+'</strong>'+(muscle&&routine&&routine!==muscle?'<div class="hd-routine">'+esc(routine)+'</div>':'');if(cell.innerHTML!==html)cell.innerHTML=html;}
    });
    if(!d.querySelector('.hd-key')){var existing=document.createElement('div');existing.className='hd-key';existing.innerHTML='<span><b>Workout</b> shows the main muscle group, with the routine underneath when available.</span>';d.appendChild(existing)}
  }
  function style(){if(document.getElementById('history-drilldown-fix-style-v2'))return;var s=document.createElement('style');s.id='history-drilldown-fix-style-v2';s.textContent='#history .ha-drill table{width:100%!important;table-layout:fixed!important}#history .ha-drill th,#history .ha-drill td{white-space:normal!important;overflow-wrap:anywhere!important;vertical-align:top!important}#history .ha-drill .hd-routine{margin-top:3px;font-size:11px;line-height:1.25;color:#667085}#history .ha-drill .hd-key{margin-top:10px;padding:9px 11px;border-radius:10px;background:#f8f9fb;color:#667085;font-size:11px;line-height:1.35}@media(max-width:650px){#history .ha-drill{overflow:hidden!important}#history .ha-drill table{font-size:12px!important}#history .ha-drill th,#history .ha-drill td{padding:7px 5px!important}}';document.head.appendChild(s)}
  function boot(){style();render();var d=document.getElementById('haDrill');if(d&&!d.__hdObserver){d.__hdObserver=new MutationObserver(function(){clearTimeout(d.__hdTimer);d.__hdTimer=setTimeout(render,30)});d.__hdObserver.observe(d,{childList:true,subtree:true})}}
  boot();setTimeout(boot,300);setTimeout(boot,1000);window.addEventListener('load',boot);
})();
