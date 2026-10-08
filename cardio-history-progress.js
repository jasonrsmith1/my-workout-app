(function(){
  'use strict';
  if(window.__cardioHistoryProgressV6)return;
  window.__cardioHistoryProgressV6=true;
  var TIMER_KEY='workout_timer_v1',CARDIO_KEY='cardio_history_v1',CARDIO_ROUTINE='Cardio',CARDIO_SHEET='Cardio';
  function read(k){try{var a=JSON.parse(localStorage.getItem(k)||'[]');return Array.isArray(a)?a:[]}catch(e){return[]}}
  function write(k,a){try{localStorage.setItem(k,JSON.stringify(a).slice(0,200000))}catch(e){}}
  function cardioRows(){return read(CARDIO_KEY).filter(function(x){return Number(x.seconds||0)>0||Number(x.minutes||x.durationMinutes||0)>0})}
  function stateObj(){try{if(typeof state==='object'&&state){state.logs=Array.isArray(state.logs)?state.logs:[];return state}}catch(e){}return null}
  function keyFor(kind,x,i){return kind+'|'+String(x.id||x.timestamp||x.date||i)+'|'+String(x.type||x.cardioType||'')+'|'+String(x.seconds||x.minutes||x.durationMinutes||0)+'|'+String(x.distance||'')+'|'+String(x.unit||'')}

  /* Cardio is its own activity. It must never inherit the strength workout/routine that happened to be open. */
  function normalizeCardioStore(){
    var a=read(CARDIO_KEY),changed=false;
    a.forEach(function(x){
      if(x.routine!==CARDIO_ROUTINE){x.routine=CARDIO_ROUTINE;changed=true}
      if(x.sheet!==CARDIO_SHEET){x.sheet=CARDIO_SHEET;changed=true}
      if(x.cardio!==true){x.cardio=true;changed=true}
    });
    if(changed)write(CARDIO_KEY,a);
    return a;
  }

  function normalizeTimerStore(){
    var a=read(TIMER_KEY),changed=false;
    a.forEach(function(x){
      if(!x||x.cardio!==true)return;
      if(x.routine!==CARDIO_ROUTINE){x.routine=CARDIO_ROUTINE;changed=true}
      if(x.sheet!==CARDIO_SHEET){x.sheet=CARDIO_SHEET;changed=true}
    });
    if(changed)write(TIMER_KEY,a);
  }

  function normalizeStateLogs(){
    var s=stateObj();if(!s)return;
    var changed=false;
    s.logs.forEach(function(l){
      if(!l||l.cardio!==true)return;
      if(l.routine!==CARDIO_ROUTINE){l.routine=CARDIO_ROUTINE;changed=true}
      if(l.sheet!==CARDIO_SHEET){l.sheet=CARDIO_SHEET;changed=true}
      if(l.weight!==''){l.weight='';changed=true}
      if(l.volume!=null){delete l.volume;changed=true}
      if(l.bestWeight!=null){delete l.bestWeight;changed=true}
      if(l.repsCompleted!==''){l.repsCompleted='';changed=true}
    });
    if(changed){try{if(typeof save==='function')save()}catch(e){}}
  }

  function syncAnalytics(){
    var timers=read(TIMER_KEY),existing={};
    timers.forEach(function(x){if(x&&x.cardioSourceKey)existing[String(x.cardioSourceKey)]=true});
    var changed=false;
    cardioRows().forEach(function(x,i){
      var seconds=Number(x.seconds||0)||Math.round(Number(x.minutes||x.durationMinutes||0)*60),key=keyFor('cardio',x,i);
      if(seconds<=0||existing[key])return;
      timers.unshift({date:x.date||x.timestamp||new Date().toLocaleString(),seconds:seconds,type:String(x.type||x.cardioType||'Cardio'),routine:CARDIO_ROUTINE,sheet:CARDIO_SHEET,cardio:true,cardioSourceKey:key});
      existing[key]=true;changed=true;
    });
    if(changed)write(TIMER_KEY,timers.slice(0,2000));
  }

  function syncHistory(){
    var s=stateObj();if(!s)return;
    var existing={};s.logs.forEach(function(l){if(l&&l.cardioKey)existing[String(l.cardioKey)]=true});
    var changed=false;
    cardioRows().forEach(function(x,i){
      var seconds=Number(x.seconds||0)||Math.round(Number(x.minutes||x.durationMinutes||0)*60);if(seconds<=0)return;
      var key=keyFor('cardio',x,i);if(existing[key])return;
      var type=String(x.type||x.cardioType||'Cardio'),date=x.date||x.timestamp||new Date().toLocaleString(),distance=x.distance==null?'':String(x.distance),unit=String(x.unit||'');
      s.logs.unshift({date:date,sheet:CARDIO_SHEET,routine:CARDIO_ROUTINE,exercise:type,sets:Math.round(seconds/60)+' min',reps:'',setNo:1,repsCompleted:'',weight:'',equipment:'Cardio',completed:true,cardio:true,cardioType:type,durationSeconds:seconds,durationMinutes:Math.round(seconds/60),distance:distance,unit:unit,cardioKey:key});
      existing[key]=true;changed=true;
    });
    if(changed){s.logs=s.logs.slice(0,2000);try{if(typeof save==='function')save()}catch(e){}}
  }

  function refresh(){
    normalizeCardioStore();
    normalizeTimerStore();
    normalizeStateLogs();
    syncAnalytics();
    syncHistory();
  }

  refresh();
  var oldSet=localStorage.setItem.bind(localStorage);
  if(!window.__cardioStorageHookV6){
    window.__cardioStorageHookV6=true;
    localStorage.setItem=function(k,v){var r=oldSet(k,v);if(k===TIMER_KEY||k===CARDIO_KEY)setTimeout(refresh,0);return r};
  }
  setTimeout(refresh,500);
})();