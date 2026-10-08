(function(){
  'use strict';
  if(window.__historyCardioFixV4)return;
  window.__historyCardioFixV4=true;

  var TIMER_KEY='workout_timer_v1',CARDIO_KEY='cardio_history_v1';
  function read(k){try{var a=JSON.parse(localStorage.getItem(k)||'[]');return Array.isArray(a)?a:[]}catch(e){return[]}}
  function esc(s){return String(s==null?'':s).replace(/[&<>\"']/g,function(m){return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[m]})}
  function num(s){var n=parseFloat(String(s==null?'':s).replace(/[^0-9.]/g,''));return Number.isFinite(n)?n:0}
  function isCardio(l){return !!(l&&l.cardio===true)}
  function volume(l){return isCardio(l)?0:num(l&&l.repsCompleted)*num(l&&l.weight)}
  function dateObj(v){var d=new Date(v);return isNaN(d)?null:d}
  function dateText(v){var d=dateObj(v);return d?d.toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric'}):String(v||'')}
  function timeText(v){var d=dateObj(v);return d?d.toLocaleTimeString(undefined,{hour:'numeric',minute:'2-digit'}):''}
  function cleanLogs(){
    try{
      if(typeof state!=='object'||!state||!Array.isArray(state.logs))return;
      var changed=false;
      state.logs.forEach(function(l){
        if(!isCardio(l))return;
        if(l.weight!==''){l.weight='';changed=true}
        if(l.volume!=null){delete l.volume;changed=true}
        if(l.bestWeight!=null){delete l.bestWeight;changed=true}
        if(l.repsCompleted!==''){l.repsCompleted='';changed=true}
        if(l.equipment!=='Cardio'){l.equipment='Cardio';changed=true}
        if(Number(l.durationMinutes)>0&&String(l.sets||'').toLowerCase().indexOf('min')<0){l.sets=Math.round(Number(l.durationMinutes))+' min';changed=true}
      });
      if(changed&&typeof save==='function')save();
    }catch(e){}
  }
  function cardioRows(){
    var a=read(CARDIO_KEY).filter(function(x){return Number(x.seconds||0)>0||Number(x.minutes||x.durationMinutes||0)>0});
    var seen={};
    return a.filter(function(x,i){
      var key=String(x.date||x.timestamp||i)+'|'+String(x.type||x.cardioType||'Cardio')+'|'+String(x.routine||'')+'|'+String(x.seconds||x.minutes||x.durationMinutes||0)+'|'+String(x.distance||'')+'|'+String(x.unit||'');
      if(seen[key])return false;seen[key]=true;return true;
    }).slice(0,100);
  }
  function stateCardioRows(){
    try{return (state.logs||[]).filter(isCardio).map(function(x){return {date:x.date,routine:x.routine,type:x.cardioType||x.exercise||'Cardio',seconds:Number(x.durationSeconds)||Number(x.durationMinutes||0)*60,distance:x.distance||'',unit:x.unit||''}})}catch(e){return[]}
  }
  function cardioData(){var a=cardioRows();return a.length?a:stateCardioRows()}
  function strengthLogs(){try{return (state.logs||[]).filter(function(l){return !isCardio(l)})}catch(e){return[]}}
  function card(title,body,cls){return '<section class="history-block '+(cls||'')+'"><div class="history-block-head"><h3>'+title+'</h3></div>'+body+'</section>'}

  function renderHistoryClean(){
    cleanLogs();
    var h=document.getElementById('history');if(!h)return;
    var logs=strengthLogs();
    var total=logs.reduce(function(a,l){return a+volume(l)},0);
    var reps=logs.reduce(function(a,l){return a+num(l.repsCompleted)},0);
    var exercises={};logs.forEach(function(l){(exercises[l.exercise]||(exercises[l.exercise]=[])).push(l)});
    var exerciseNames=Object.keys(exercises).sort(function(a,b){return a.localeCompare(b)});
    var sessions={};logs.forEach(function(l){var key=String(l.date||'');var d=dateObj(l.date);var day=d?d.toLocaleDateString():key;sessions[day]=true});
    var workoutCount=Object.keys(sessions).length;

    var html='<div class="history-clean">';
    html+='<header class="history-hero"><h2>History &amp; Progress</h2><p>Strength and cardio in one clean timeline.</p></header>';
    html+='<div class="history-metrics"><div><b>'+logs.length+'</b><span>Strength Sets</span></div><div><b>'+Math.round(reps).toLocaleString()+'</b><span>Reps</span></div><div><b>'+Math.round(total).toLocaleString()+'</b><span>Volume (lb)</span></div><div><b>'+workoutCount+'</b><span>Workout Days</span></div></div>';

    if(exerciseNames.length){
      var prog='';
      exerciseNames.forEach(function(ex){
        var ls=exercises[ex],ws=ls.map(function(x){return num(x.weight)}).filter(function(x){return x>0}),best=ws.length?Math.max.apply(Math,ws):0,last=ls[0]||{},vol=Math.round(ls.reduce(function(a,l){return a+volume(l)},0));
        prog+='<div class="progress-item"><div class="progress-main"><b>'+esc(ex)+'</b><span>'+esc(last.repsCompleted||'—')+' reps × '+esc(last.weight||'BW')+'</span></div><div class="progress-stats"><span><small>Best</small><strong>'+(best?best+' lb':'—')+'</strong></span><span><small>Volume</small><strong>'+vol.toLocaleString()+' lb</strong></span><span><small>Equipment</small><strong>'+esc(last.equipment||'—')+'</strong></span></div></div>';
      });
      html+=card('Exercise Progression','<div class="progress-list">'+prog+'</div>','strength-progression');
    }else{
      html+=card('Exercise Progression','<div class="history-empty">Complete a strength set to start tracking progression.</div>','strength-progression');
    }

    var cardio=cardioData();
    var cbody='';
    if(cardio.length){
      cbody='<div class="cardio-list">'+cardio.map(function(x){var sec=Number(x.seconds||0)||Math.round(Number(x.minutes||x.durationMinutes||0)*60),m=Math.floor(sec/60),s=sec%60,dist=x.distance==null||x.distance===''?'—':String(x.distance)+(x.unit?' '+x.unit:'');return '<article class="cardio-item"><div class="cardio-top"><b>'+esc(x.type||x.cardioType||'Cardio')+'</b><strong>'+m+':'+String(s).padStart(2,'0')+'</strong></div><div class="cardio-meta"><span>'+esc(dateText(x.date||x.timestamp))+' · '+esc(timeText(x.date||x.timestamp))+'</span><span>'+esc(dist)+'</span></div><div class="cardio-routine">'+esc(x.routine||'Cardio')+'</div></article>'}).join('')+'</div>';
    }else cbody='<div class="history-empty">No cardio sessions recorded yet.</div>';
    html+=card('Cardio History',cbody,'cardio-history-unified');

    var recent=logs.slice(0,100),rbody='';
    if(recent.length){
      rbody='<div class="recent-list">'+recent.map(function(l){var v=Math.round(volume(l));return '<article class="recent-item"><div class="recent-top"><b>'+esc(l.exercise||'Exercise')+'</b><span>'+esc(dateText(l.date))+' · '+esc(timeText(l.date))+'</span></div><div class="recent-grid"><span><small>Set</small><strong>'+esc(l.setNo||'—')+'</strong></span><span><small>Reps</small><strong>'+esc(l.repsCompleted||'—')+'</strong></span><span><small>Weight</small><strong>'+esc(l.weight||'BW')+'</strong></span><span><small>Volume</small><strong>'+(v?v.toLocaleString()+' lb':'—')+'</strong></span></div><div class="recent-routine">'+esc(l.routine||'')+' · '+esc(l.equipment||'—')+'</div></article>'}).join('')+'</div>';
    }else rbody='<div class="history-empty">Your completed strength sets will appear here.</div>';
    html+=card('Recent Strength Sets',rbody,'recent-strength');
    html+='</div>';
    h.innerHTML=html;
  }

  function styles(){
    if(document.getElementById('history-clean-style'))return;
    var s=document.createElement('style');s.id='history-clean-style';s.textContent=`
#history{width:100%!important;max-width:100%!important;min-width:0!important;overflow:hidden!important}
#history .history-clean{width:100%;min-width:0}
#history .history-hero{padding:2px 2px 12px}
#history .history-hero h2{margin:0!important;font-size:28px!important;line-height:1.1!important;letter-spacing:-.5px!important}
#history .history-hero p{margin:6px 0 0!important;color:#6c6c70!important;font-size:14px!important}
#history .history-metrics{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin-bottom:14px}
#history .history-metrics>div{background:#f2f2f7;border-radius:14px;padding:12px 10px;min-width:0}
#history .history-metrics b{display:block;font-size:21px;line-height:1.1;color:#1c1c1e}
#history .history-metrics span{display:block;margin-top:4px;font-size:11px;color:#6c6c70;line-height:1.2}
#history .history-block{background:#fff;border:1px solid rgba(60,60,67,.12);border-radius:17px;padding:14px;margin:12px 0;box-shadow:0 3px 12px rgba(0,0,0,.035);min-width:0;overflow:hidden}
#history .history-block-head h3{margin:0 0 10px!important;font-size:21px!important;line-height:1.15!important;letter-spacing:-.2px!important}
#history .progress-list,#history .cardio-list,#history .recent-list{display:grid;gap:8px}
#history .progress-item,#history .cardio-item,#history .recent-item{background:#f8f8fa;border:1px solid #e5e5ea;border-radius:13px;padding:11px;min-width:0;overflow:hidden}
#history .progress-main{display:flex;justify-content:space-between;gap:10px;align-items:flex-start;min-width:0}
#history .progress-main b{font-size:15px;line-height:1.25;overflow-wrap:anywhere;min-width:0}
#history .progress-main span{font-size:12px;color:#6c6c70;white-space:nowrap;flex:0 0 auto}
#history .progress-stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px;margin-top:9px}
#history .progress-stats span,#history .recent-grid span{background:#fff;border-radius:9px;padding:7px;min-width:0}
#history small{display:block;color:#8e8e93;font-size:10px;line-height:1.1;margin-bottom:3px}
#history .progress-stats strong,#history .recent-grid strong{display:block;font-size:12px;color:#1c1c1e;overflow-wrap:anywhere}
#history .cardio-top,.recent-top{display:flex;justify-content:space-between;gap:10px;align-items:center}
#history .cardio-top b{font-size:16px}
#history .cardio-top strong{font-size:17px;color:#007aff;white-space:nowrap}
#history .cardio-meta{display:flex;justify-content:space-between;gap:8px;margin-top:6px;font-size:12px;color:#6c6c70;min-width:0}
#history .cardio-meta span{min-width:0;overflow-wrap:anywhere}
#history .cardio-routine,.recent-routine{margin-top:7px;color:#8e8e93;font-size:11px;line-height:1.3;overflow-wrap:anywhere}
#history .recent-top b{font-size:15px;line-height:1.25;overflow-wrap:anywhere}
#history .recent-top span{font-size:11px;color:#6c6c70;white-space:nowrap}
#history .recent-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;margin-top:9px}
#history .history-empty{padding:14px;background:#f8f8fa;border-radius:11px;color:#6c6c70;font-size:13px}
#history .history-analytics{margin-top:14px!important}
#history .ha-card{border-radius:17px!important;overflow:hidden!important}
#history .ha-drill{overflow:hidden!important}
#history .ha-drill table{width:100%!important;table-layout:fixed!important;word-break:normal!important}
#history .ha-drill th,#history .ha-drill td{overflow-wrap:anywhere!important}
@media(max-width:650px){
 #history .history-hero h2{font-size:25px!important}
 #history .history-metrics{grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}
 #history .history-metrics>div{padding:11px 10px}
 #history .history-metrics b{font-size:20px}
 #history .history-block{padding:12px;border-radius:15px}
 #history .history-block-head h3{font-size:20px!important}
 #history .progress-main{display:block}
 #history .progress-main span{display:block;margin-top:4px;white-space:normal}
 #history .progress-stats{grid-template-columns:repeat(3,minmax(0,1fr));gap:5px}
 #history .progress-stats span{padding:6px}
 #history .cardio-meta{display:block;line-height:1.35}
 #history .cardio-meta span{display:block}
 #history .cardio-meta span+span{margin-top:2px}
 #history .recent-top{display:block}
 #history .recent-top span{display:block;margin-top:4px;white-space:normal}
 #history .recent-grid{grid-template-columns:repeat(4,minmax(0,1fr));gap:5px}
 #history .recent-grid span{padding:6px 5px}
 #history .ha-controls{grid-template-columns:repeat(2,minmax(0,1fr))!important}
 #history .ha-summary{grid-template-columns:repeat(2,minmax(0,1fr))!important}
 #history .ha-drill{overflow-x:auto!important}
 #history .ha-drill table{min-width:520px!important}
}
`;
    document.head.appendChild(s);
  }

  function install(){
    styles();
    if(typeof window.renderHistory!=='function')return false;
    if(window.renderHistory.__historyCleanV4)return true;
    window.renderHistory=renderHistoryClean;
    window.renderHistory.__historyCleanV4=true;
    if(document.getElementById('history')&&document.getElementById('historyTab')&&document.getElementById('historyTab').style.display!=='none')renderHistoryClean();
    return true;
  }
  styles();
  var tries=0,t=setInterval(function(){if(install()){clearInterval(t)}else if(++tries>200)clearInterval(t)},50);
  window.addEventListener('load',function(){install()});
  setTimeout(install,600);
  window.addEventListener('storage',function(e){if(e.key===TIMER_KEY||e.key===CARDIO_KEY){setTimeout(function(){if(document.getElementById('historyTab')&&document.getElementById('historyTab').style.display!=='none')renderHistoryClean()},80)}});
})();