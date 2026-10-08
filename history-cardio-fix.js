(function(){
  'use strict';
  if(window.__historyCardioFixV3)return;
  window.__historyCardioFixV3=true;

  var TIMER_KEY='workout_timer_v1',CARDIO_KEY='cardio_history_v1';
  function read(k){try{var a=JSON.parse(localStorage.getItem(k)||'[]');return Array.isArray(a)?a:[]}catch(e){return[]}}
  function esc(s){return String(s==null?'':s).replace(/[&<>\"']/g,function(m){return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[m]})}
  function cardioLog(l){return !!(l&&l.cardio===true)}

  function cleanCardioLogs(){
    try{
      if(typeof state!=='object'||!state||!Array.isArray(state.logs))return false;
      var changed=false;
      state.logs.forEach(function(l){
        if(!cardioLog(l))return;
        if(l.weight!==''){l.weight='';changed=true}
        if(l.volume!=null){delete l.volume;changed=true}
        if(l.bestWeight!=null){delete l.bestWeight;changed=true}
        if(l.repsCompleted!==''){l.repsCompleted='';changed=true}
        if(l.sets && /min$/i.test(String(l.sets))===false && Number(l.durationMinutes)>0){l.sets=Math.round(Number(l.durationMinutes))+' min';changed=true}
      });
      if(changed&&typeof save==='function')save();
      return changed;
    }catch(e){return false}
  }

  function cardioItems(){
    var a=read(CARDIO_KEY).filter(function(x){return Number(x.seconds||0)>0||Number(x.minutes||x.durationMinutes||0)>0});
    var seen={};
    a.forEach(function(x,i){x.__k=String(x.id||x.timestamp||x.date||i)+'|'+String(x.type||x.cardioType||'')+'|'+String(x.routine||'')+'|'+String(x.seconds||x.minutes||x.durationMinutes||0)+'|'+String(x.distance||'')});
    return a.filter(function(x){if(seen[x.__k])return false;seen[x.__k]=true;return true}).slice(0,100);
  }

  function cardioFromLogs(){
    try{return (state.logs||[]).filter(cardioLog).map(function(x){return {date:x.date||'',routine:x.routine||'Cardio',type:x.cardioType||x.exercise||'Cardio',seconds:Number(x.durationSeconds)||Number(x.durationMinutes||0)*60,distance:x.distance||'',unit:x.unit||''}})}catch(e){return[]}
  }

  function removeOldCardioBlocks(h){
    if(!h)return;
    Array.prototype.forEach.call(h.querySelectorAll('.cardio-history,.cardio-linked-history,.cardio-progress-linked,.cardio-history-fixed'),function(el){el.remove()});
    Array.prototype.forEach.call(h.querySelectorAll('h1,h2,h3,h4,h5,h6'),function(head){
      var text=(head.textContent||'').trim().toLowerCase();
      if(text!=='cardio history'&&text!=='cardio sessions')return;
      var el=head.closest('.card');
      if(!el)el=head.closest('section');
      if(!el)el=head.parentElement;
      if(el&&el!==h)el.remove();
    });
  }

  function renderCardioBlock(h){
    if(!h)return;
    removeOldCardioBlocks(h);
    var a=cardioItems();
    if(!a.length)a=cardioFromLogs();
    var box=document.createElement('div');box.className='card cardio-history-fixed';
    var rows=a.map(function(x){
      var sec=Number(x.seconds||0)||Math.round(Number(x.minutes||x.durationMinutes||0)*60);
      var d=new Date(x.date||x.timestamp),ds=isNaN(d)?String(x.date||''):d.toLocaleString();
      var m=Math.floor(sec/60),s=sec%60;
      var dist=x.distance==null||x.distance===''?'—':String(x.distance)+(x.unit?' '+x.unit:'');
      return '<tr><td>'+esc(ds)+'</td><td>'+esc(x.routine||'Cardio')+'</td><td>'+esc(x.type||x.cardioType||'Cardio')+'</td><td>'+m+':'+String(s).padStart(2,'0')+'</td><td>'+esc(dist)+'</td></tr>';
    }).join('');
    box.innerHTML='<h3>Cardio History</h3>'+(rows?'<div class="cardio-table-wrap"><table class="progress-table cardio-table"><thead><tr><th>Date</th><th>Routine</th><th>Cardio</th><th>Duration</th><th>Distance</th></tr></thead><tbody>'+rows+'</tbody></table></div>':'<div class="muted">No cardio sessions recorded yet.</div>');
    h.appendChild(box);
  }

  function style(){
    if(document.getElementById('history-cardio-fix-style'))return;
    var s=document.createElement('style');s.id='history-cardio-fix-style';s.textContent=`
#history{min-width:0!important;max-width:100%!important;overflow:hidden!important}
#history .progress-table{width:100%!important;max-width:100%!important;table-layout:fixed!important;border-collapse:collapse!important}
#history .progress-table th,#history .progress-table td{overflow-wrap:anywhere!important;word-break:normal!important;white-space:normal!important;vertical-align:middle!important}
#history .cardio-history-fixed{margin-top:16px!important;padding:18px!important;overflow:hidden!important;box-sizing:border-box!important}
#history .cardio-history-fixed h3{margin:0 0 14px!important;line-height:1.15!important}
#history .cardio-table{font-size:13px!important}
#history .cardio-table th,#history .cardio-table td{padding:9px 7px!important;line-height:1.25!important}
#history .cardio-table th:nth-child(1),#history .cardio-table td:nth-child(1){width:28%!important}
#history .cardio-table th:nth-child(2),#history .cardio-table td:nth-child(2){width:27%!important}
#history .cardio-table th:nth-child(3),#history .cardio-table td:nth-child(3){width:18%!important}
#history .cardio-table th:nth-child(4),#history .cardio-table td:nth-child(4){width:15%!important;white-space:nowrap!important}
#history .cardio-table th:nth-child(5),#history .cardio-table td:nth-child(5){width:12%!important}
#history .cardio-table-wrap{width:100%!important;max-width:100%!important;overflow:hidden!important}
@media(max-width:650px){
 #history .progress-table{font-size:12px!important}
 #history .progress-table th,#history .progress-table td{padding:7px 5px!important}
 #history h3{font-size:21px!important}
 #history .cardio-history-fixed{padding:16px!important}
 #history .cardio-table{font-size:12px!important}
 #history .cardio-table th,#history .cardio-table td{padding:8px 4px!important}
 #history .cardio-table th:nth-child(1),#history .cardio-table td:nth-child(1){width:28%!important}
 #history .cardio-table th:nth-child(2),#history .cardio-table td:nth-child(2){width:27%!important}
 #history .cardio-table th:nth-child(3),#history .cardio-table td:nth-child(3){width:18%!important}
 #history .cardio-table th:nth-child(4),#history .cardio-table td:nth-child(4){width:15%!important}
 #history .cardio-table th:nth-child(5),#history .cardio-table td:nth-child(5){width:12%!important}
}
`;
    document.head.appendChild(s);
  }

  function wrapHistory(){
    if(typeof window.renderHistory!=='function'||window.renderHistory.__historyCardioFixed)return false;
    var original=window.renderHistory;
    window.renderHistory=function(){
      cleanCardioLogs();
      var savedLogs=null;
      try{
        if(typeof state==='object'&&state&&Array.isArray(state.logs)){savedLogs=state.logs;state.logs=state.logs.filter(function(l){return !cardioLog(l)});}
        var result=original.apply(this,arguments);
        if(savedLogs&&typeof state==='object'&&state)state.logs=savedLogs;
        renderCardioBlock(document.getElementById('history'));
        return result;
      }catch(e){if(savedLogs&&typeof state==='object'&&state)state.logs=savedLogs;throw e}
    };
    window.renderHistory.__historyCardioFixed=true;
    return true;
  }

  function refresh(){style();cleanCardioLogs();if(wrapHistory()&&document.getElementById('history'))renderCardioBlock(document.getElementById('history'))}
  style();
  var tries=0,t=setInterval(function(){if(wrapHistory()){clearInterval(t);refresh()}else if(++tries>160)clearInterval(t)},50);
  window.addEventListener('load',refresh);
  setTimeout(refresh,500);
  var oldSet=localStorage.setItem.bind(localStorage);
  if(!window.__historyCardioStorageV3){window.__historyCardioStorageV3=true;localStorage.setItem=function(k,v){var r=oldSet(k,v);if(k===CARDIO_KEY||k===TIMER_KEY)setTimeout(function(){if(document.getElementById('history')&&document.getElementById('history').offsetParent!==null&&typeof window.renderHistory==='function')window.renderHistory()},50);return r}}
})();