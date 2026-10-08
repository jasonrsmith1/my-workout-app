(function(){
  'use strict';
  if(window.__cardioHistoryProgressV4)return;
  window.__cardioHistoryProgressV4=true;

  var TIMER_KEY='workout_timer_v1', CARDIO_KEY='cardio_history_v1';

  function read(key){try{var a=JSON.parse(localStorage.getItem(key)||'[]');return Array.isArray(a)?a:[]}catch(e){return[]}}
  function write(key,a){try{localStorage.setItem(key,JSON.stringify(a).slice(0,200000))}catch(e){}}
  function timerRows(){return read(TIMER_KEY).filter(function(x){return Number(x.seconds)>0})}
  function cardioRows(){return read(CARDIO_KEY).filter(function(x){return Number(x.minutes)>0||Number(x.seconds)>0||Number(x.durationMinutes)>0})}
  function stateObj(){try{if(typeof state==='object'&&state){state.logs=Array.isArray(state.logs)?state.logs:[];return state}}catch(e){}return null}
  function routineName(sheet,ri){try{var g=typeof DATA!=='undefined'&&DATA.find(function(x){return String(x.sheet)===String(sheet)});var r=g&&g.routines&&g.routines[Number(ri)];return r&&r.name?r.name:''}catch(e){return''}}
  function currentRoutineName(){try{var s=stateObj();var sh=(typeof currentSheet!=='undefined'&&currentSheet)||s&&s.sheet;var ri=(typeof currentRoutine!=='undefined'&&currentRoutine)!==undefined?currentRoutine:s&&s.routine;return routineName(sh,ri)||''}catch(e){return''}}
  function saveState(){try{if(typeof save==='function')save()}catch(e){}}
  function keyFor(kind,x,i){return kind+'|'+String(x.id||x.timestamp||x.date||i)+'|'+String(x.type||x.cardioType||'')+'|'+String(x.routine||'')+'|'+String(x.seconds||x.minutes||0)+'|'+String(x.distance||'')+'|'+String(x.unit||'')}
  function isCardioTimer(x){var t=String(x.type||'').toLowerCase(),r=String(x.routine||'').toLowerCase();return t.indexOf('cardio')>=0||t.indexOf('hiit')>=0||r.indexOf('cardio')>=0||r.indexOf('hiit')>=0||x.cardio===true}

  function enrichLatestCardio(){
    var a=read(CARDIO_KEY);if(!a.length)return;
    var x=a[0],changed=false;
    if(!x.sheet){try{x.sheet=(typeof currentSheet!=='undefined'&&currentSheet)||'';changed=true}catch(e){}}
    if(!x.routine){var r=currentRoutineName();if(r){x.routine=r;changed=true}}
    if(changed)write(CARDIO_KEY,a);
  }

  function syncAnalytics(){
    var timers=read(TIMER_KEY),existing={};
    timers.forEach(function(x){if(x&&x.cardioSourceKey)existing[String(x.cardioSourceKey)]=true});
    var changed=false;
    cardioRows().forEach(function(x,i){
      var seconds=Number(x.seconds||0)||Math.round(Number(x.minutes||x.durationMinutes||0)*60);if(seconds<=0)return;
      var key=keyFor('cardio',x,i);if(existing[key])return;
      timers.unshift({date:x.date||x.timestamp||new Date().toLocaleString(),seconds:seconds,type:String(x.type||x.cardioType||'Cardio'),routine:String(x.routine||currentRoutineName()||'Cardio'),sheet:String(x.sheet||'Cardio'),cardio:true,cardioSourceKey:key});
      existing[key]=true;changed=true;
    });
    if(changed)write(TIMER_KEY,timers.slice(0,2000));
  }

  function syncHistory(){
    var s=stateObj();if(!s)return;
    var changed=false,existing={};
    s.logs.forEach(function(l){if(l&&l.cardioKey)existing[String(l.cardioKey)]=true});

    cardioRows().forEach(function(x,i){
      var seconds=Number(x.seconds||0)||Math.round(Number(x.minutes||x.durationMinutes||0)*60);if(seconds<=0)return;
      var type=String(x.type||x.cardioType||'Cardio'),date=x.date||x.timestamp||new Date().toLocaleString(),routine=String(x.routine||currentRoutineName()||'Cardio'),sheet=String(x.sheet||'Cardio'),distance=x.distance==null?'':String(x.distance),unit=String(x.unit||''),key=keyFor('cardio',x,i);
      if(existing[key])return;
      s.logs.unshift({date:date,sheet:sheet,routine:routine,exercise:type,sets:Math.round(seconds/60)+' min',reps:'',setNo:1,repsCompleted:Math.round(seconds/60),weight:distance?(distance+' '+unit):'',equipment:'Cardio',completed:true,cardio:true,cardioType:type,durationSeconds:seconds,durationMinutes:Math.round(seconds/60),distance:distance,unit:unit,cardioKey:key});
      existing[key]=true;changed=true;
    });

    timerRows().filter(function(x){return isCardioTimer(x)&&!x.cardioSourceKey}).forEach(function(x,i){
      var seconds=Number(x.seconds)||0;if(seconds<=0)return;
      var type=String(x.type||'Cardio'),date=x.date||x.timestamp||new Date().toLocaleString(),routine=String(x.routine||'Cardio'),sheet=String(x.sheet||'Cardio'),key=keyFor('timer',x,i);
      if(existing[key])return;
      s.logs.unshift({date:date,sheet:sheet,routine:routine,exercise:type,sets:Math.round(seconds/60)+' min',reps:'',setNo:1,repsCompleted:Math.round(seconds/60),weight:'',equipment:'Cardio',completed:true,cardio:true,cardioType:type,durationSeconds:seconds,durationMinutes:Math.round(seconds/60),cardioKey:key});
      existing[key]=true;changed=true;
    });

    if(changed){s.logs=s.logs.slice(0,2000);saveState()}
  }

  function removeOldStandalone(){
    var h=document.getElementById('history');if(!h)return;
    Array.prototype.forEach.call(h.querySelectorAll('.cardio-history,.cardio-linked-history'),function(el){el.remove()});
  }

  function refresh(){enrichLatestCardio();syncAnalytics();syncHistory();removeOldStandalone();if(typeof renderHistory==='function')setTimeout(renderHistory,0)}

  var originalSet=localStorage.setItem.bind(localStorage);
  if(!window.__cardioStorageHookV4){
    window.__cardioStorageHookV4=true;
    localStorage.setItem=function(k,v){var r=originalSet(k,v);if(k===TIMER_KEY||k===CARDIO_KEY)setTimeout(refresh,0);return r};
  }

  var cardioSaveTries=0,cardioSaveTimer=setInterval(function(){
    var b=document.getElementById('saveCardio');
    if(b&&!b.__cardioMetaV4){b.__cardioMetaV4=true;b.addEventListener('click',function(){setTimeout(enrichLatestCardio,0)},false);clearInterval(cardioSaveTimer)}
    else if(++cardioSaveTries>160)clearInterval(cardioSaveTimer);
  },50);

  var tries=0,t=setInterval(function(){
    if(typeof renderHistory==='function'){
      var o=window.renderHistory;
      if(!o.__cardioSharedV4){
        window.renderHistory=function(){var r=o.apply(this,arguments);setTimeout(refresh,0);return r};
        window.renderHistory.__cardioSharedV4=true;
      }
      refresh();clearInterval(t);
    }else if(++tries>160)clearInterval(t);
  },50);

  setTimeout(refresh,250);
  setTimeout(refresh,1000);
})();
