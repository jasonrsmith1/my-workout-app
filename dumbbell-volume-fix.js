(function(){
  'use strict';
  if(window.__dumbbellVolumeFixV5)return;
  window.__dumbbellVolumeFixV5=true;
  function num(v){var n=parseFloat(String(v==null?'':v).replace(/[^0-9.]/g,''));return Number.isFinite(n)?n:0;}
  function reps(l){var r=l&&l.repsCompleted!=null?l.repsCompleted:l&&l.reps;return String(r).trim().toLowerCase()==='failure'?num(l&&l.actualReps!=null?l&&l.actualReps:l&&l.completedReps):num(r);}
  function multiplier(l){var eq=String(l&&l.equipment||'').trim().toLowerCase();return eq==='dumbbell'||eq==='dumbbells'?2:1;}
  function isCardio(l){return !!(l&&l.cardio===true);}
  function volume(l){return isCardio(l)?0:reps(l)*num(l&&l.weight||l&&l.load||l&&l.actualWeight||0)*multiplier(l);}
  function logs(){try{var x=JSON.parse(localStorage.getItem('workout_v3')||'{}').logs;return Array.isArray(x)?x:[]}catch(e){return[];}}
  function addEquipmentChoices(){document.querySelectorAll('select[id^="eq_"]').forEach(function(select){var values={};Array.prototype.forEach.call(select.options,function(o){values[String(o.value).trim().toLowerCase()]=true;});['Dumbbell','Dumbbells'].forEach(function(label){if(values[label.toLowerCase()])return;var o=document.createElement('option');o.value=label;o.textContent=label;select.appendChild(o);});});}
  function total(){return logs().reduce(function(a,l){return a+volume(l)},0);}
  function setText(el,value){if(el)el.textContent=Math.round(value).toLocaleString()+' lb';}
  function fixHome(){setText(document.getElementById('homeVolume'),total());}
  function fixHistory(){var h=document.getElementById('history');if(!h)return;var ls=logs().filter(function(l){return !isCardio(l)}),totalV=ls.reduce(function(a,l){return a+volume(l)},0),metric=h.querySelector('.history-metrics');if(metric&&metric.children[2]){var b=metric.children[2].querySelector('b');if(b)b.textContent=Math.round(totalV).toLocaleString()+' lb';}var byExercise={};ls.forEach(function(l){var key=String(l.exercise||'Exercise');byExercise[key]=(byExercise[key]||0)+volume(l);});h.querySelectorAll('.progress-item').forEach(function(item){var name=item.querySelector('.progress-main b'),stat=item.querySelectorAll('.progress-stats span');if(!name||stat.length<2)return;var strong=stat[1].querySelector('strong');if(strong)strong.textContent=Math.round(byExercise[name.textContent]||0).toLocaleString()+' lb';});var recent=ls.slice(0,100);h.querySelectorAll('.recent-item').forEach(function(item,i){var stat=item.querySelectorAll('.recent-grid span');if(!stat.length||!recent[i])return;var strong=stat[3]&&stat[3].querySelector('strong');if(strong){var v=volume(recent[i]);strong.textContent=v?Math.round(v).toLocaleString()+' lb':'—';}});}
  function patchRenderHistory(){if(typeof window.renderHistory!=='function')return false;if(window.renderHistory.__dumbbellVolumeWrapped)return true;var original=window.renderHistory;function wrapped(){var result=original.apply(this,arguments);setTimeout(function(){fixHistory();fixHome()},0);return result;}wrapped.__dumbbellVolumeWrapped=true;window.renderHistory=wrapped;return true;}
  function boot(){addEquipmentChoices();patchRenderHistory();fixHistory();fixHome();}
  var tries=0,timer=setInterval(function(){boot();if(++tries>120)clearInterval(timer)},50);window.addEventListener('load',boot);setTimeout(boot,800);var observer=new MutationObserver(function(){clearTimeout(observer._t);observer._t=setTimeout(boot,80)});observer.observe(document.documentElement,{childList:true,subtree:true});
})();