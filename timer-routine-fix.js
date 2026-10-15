(function(){
  'use strict';
  if(window.__timerRoutineFixV1)return;
  window.__timerRoutineFixV1=true;
  var GENERIC=/^(workout|routine)(?:\s+[ivxlcdm0-9]+)?$/i;
  function good(v){v=String(v==null?'':v).trim();return v&&!GENERIC.test(v)?v:''}
  function selectedName(){try{var s=document.getElementById('premadePageSelect');if(s&&s.selectedIndex>=0){var t=String((s.options[s.selectedIndex]||{}).text||'').trim();if(good(t))return t}}catch(e){}return ''}
  function routineName(){var n=selectedName();if(n)return n;try{var sheet=typeof currentSheet!=='undefined'?currentSheet:'';var ri=typeof currentRoutine!=='undefined'?currentRoutine:'';var all=typeof allRoutines==='function'?allRoutines():[];var hit=all.find(function(x){return String(x.sheet)===String(sheet)&&String(x.ri)===String(ri)});n=hit&&good(hit.name);if(n)return n}catch(e){}try{var data=typeof DATA!=='undefined'&&Array.isArray(DATA)?DATA:[];var sheet2=typeof currentSheet!=='undefined'?currentSheet:'';var ri2=typeof currentRoutine!=='undefined'?currentRoutine:'';var g=data.find(function(x){return String(x.sheet)===String(sheet2)});var r=g&&g.routines&&g.routines[Number(ri2)];n=r&&good(r.name);if(n)return n}catch(e){}return ''}
  function patch(v){try{var a=JSON.parse(v||'[]');if(!Array.isArray(a)||!a.length)return v;var name=routineName();var changed=false;for(var i=0;i<a.length;i++){if(!a[i]||typeof a[i]!=='object')continue;var old=String(a[i].routine||'').trim();if(!good(old)&&name){a[i].routine=name;changed=true}var old2=String(a[i].routineName||'').trim();if(!good(old2)&&name){a[i].routineName=name;changed=true}var old3=String(a[i].workoutName||'').trim();if(!good(old3)&&name){a[i].workoutName=name;changed=true}}return changed?JSON.stringify(a):v}catch(e){return v}}
  var nativeSet=localStorage.setItem.bind(localStorage);
  if(!window.__timerRoutineStorageV1){window.__timerRoutineStorageV1=true;localStorage.setItem=function(k,v){if(k==='workout_timer_v1')v=patch(v);return nativeSet(k,v)}}
  function repair(){try{var raw=localStorage.getItem('workout_timer_v1')||'[]',next=patch(raw);if(next!==raw)nativeSet('workout_timer_v1',next)}catch(e){}}
  repair();setTimeout(repair,250);setTimeout(repair,1000);
})();
