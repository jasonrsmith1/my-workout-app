(function(){
  'use strict';
  if(window.__timerRoutineFixV2)return;
  window.__timerRoutineFixV2=true;
  var GENERIC=/^(workout|routine)(?:\s+[ivxlcdm0-9]+)?$/i;
  var PLACEHOLDER=/^(select\s+premade\s+workout|select\s+workout|choose\s+(?:a\s+)?workout|choose\s+(?:a\s+)?routine)$/i;
  function good(v){v=String(v==null?'':'').trim();return v&&!GENERIC.test(v)&&!PLACEHOLDER.test(v)?v:''}
  function routineName(){
    var n='';
    try{
      var data=typeof DATA!=='undefined'&&Array.isArray(DATA)?DATA:[];
      var sheet=typeof currentSheet!=='undefined'?currentSheet:'';
      var ri=typeof currentRoutine!=='undefined'?currentRoutine:'';
      var g=data.find(function(x){return String(x.sheet)===String(sheet)});
      var r=g&&g.routines&&g.routines[Number(ri)];
      n=r&&good(r.name);
      if(n)return n;
    }catch(e){}
    try{
      var sheet2=typeof currentSheet!=='undefined'?currentSheet:'';
      var ri2=typeof currentRoutine!=='undefined'?currentRoutine:'';
      var all=typeof allRoutines==='function'?allRoutines():[];
      var hit=all.find(function(x){return String(x.sheet)===String(sheet2)&&String(x.ri)===String(ri2)});
      n=hit&&good(hit.name);
      if(n)return n;
    }catch(e){}
    try{
      var s=document.getElementById('premadePageSelect');
      if(s&&s.selectedIndex>=0)n=good((s.options[s.selectedIndex]||{}).text||'');
    }catch(e){}
    return n||'';
  }
  function patch(v){
    try{
      var a=JSON.parse(v||'[]');
      if(!Array.isArray(a)||!a.length)return v;
      var name=routineName();
      var changed=false;
      for(var i=0;i<a.length;i++){
        if(!a[i]||typeof a[i]!=='object')continue;
        var old=String(a[i].routine||'').trim();
        if(!good(old)&&name){a[i].routine=name;changed=true}
        var old2=String(a[i].routineName||'').trim();
        if(!good(old2)&&name){a[i].routineName=name;changed=true}
        var old3=String(a[i].workoutName||'').trim();
        if(!good(old3)&&name){a[i].workoutName=name;changed=true}
      }
      return changed?JSON.stringify(a):v;
    }catch(e){return v}
  }
  var nativeSet=localStorage.setItem.bind(localStorage);
  if(!window.__timerRoutineStorageV2){
    window.__timerRoutineStorageV2=true;
    localStorage.setItem=function(k,v){
      if(k==='workout_timer_v1')v=patch(v);
      return nativeSet(k,v)
    }
  }
  function repair(){try{var raw=localStorage.getItem('workout_timer_v1')||'[]',next=patch(raw);if(next!==raw)nativeSet('workout_timer_v1',next)}catch(e){}}
  repair();setTimeout(repair,250);setTimeout(repair,1000);
})();
