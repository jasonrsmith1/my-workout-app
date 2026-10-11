(function(){
  'use strict';
  if(window.__dumbbellVolumeFixV2)return;
  window.__dumbbellVolumeFixV2=true;

  function num(v){var n=parseFloat(String(v==null?'':v).replace(/[^0-9.]/g,''));return Number.isFinite(n)?n:0;}
  function isCardio(l){return !!(l&&l.cardio===true);}
  function multiplier(l){return String(l&&l.equipment||'').trim().toLowerCase()==='dumbbells'?2:1;}
  function volume(l){return isCardio(l)?0:num(l&&l.repsCompleted)*num(l&&l.weight)*multiplier(l);}
  function logs(){try{var s=window.state;return s&&Array.isArray(s.logs)?s.logs:[]}catch(e){return[];}}

  function addEquipmentChoices(){
    document.querySelectorAll('select[id^="eq_"]').forEach(function(select){
      var values={};
      Array.prototype.forEach.call(select.options,function(o){values[String(o.value).trim().toLowerCase()]=true;});
      ['Dumbbell','Dumbbells'].forEach(function(label){
        if(values[label.toLowerCase()])return;
        var o=document.createElement('option');o.value=label;o.textContent=label;select.appendChild(o);
      });
    });
  }
  function homeVolume(){return logs().reduce(function(total,l){return total+volume(l)},0);}
  function setText(el,value){if(el)el.textContent=Math.round(value).toLocaleString()+' lb';}
  function fixHome(){setText(document.getElementById('homeVolume'),homeVolume());}
  function fixHistory(){
    var h=document.getElementById('history');if(!h)return;
    var ls=logs().filter(function(l){return !isCardio(l)}),total=ls.reduce(function(a,l){return a+volume(l)},0);
    var metric=h.querySelector('.history-metrics');
    if(metric&&metric.children[2]){var b=metric.children[2].querySelector('b');if(b)b.textContent=Math.round(total).toLocaleString();}
    var byExercise={};ls.forEach(function(l){var key=String(l.exercise||'Exercise');byExercise[key]=(byExercise[key]||0)+volume(l);});
    h.querySelectorAll('.progress-item').forEach(function(item){var name=item.querySelector('.progress-main b'),stat=item.querySelectorAll('.progress-stats span');if(!name||stat.length<2)return;var strong=stat[1].querySelector('strong');if(strong)strong.textContent=Math.round(byExercise[name.textContent]||0).toLocaleString()+' lb';});
    var recent=ls.slice(0,100);h.querySelectorAll('.recent-item').forEach(function(item,i){var stat=item.querySelectorAll('.recent-grid span');if(!stat.length||!recent[i])return;var strong=stat[3]&&stat[3].querySelector('strong');if(strong){var v=volume(recent[i]);strong.textContent=v?Math.round(v).toLocaleString()+' lb':'—';}});
  }
  function patchRenderHistory(){if(typeof window.renderHistory!=='function')return false;if(window.renderHistory.__dumbbellVolumeWrapped)return true;var original=window.renderHistory;function wrapped(){var result=original.apply(this,arguments);setTimeout(function(){fixHistory();fixHome()},0);return result;}wrapped.__dumbbellVolumeWrapped=true;window.renderHistory=wrapped;return true;}
  function boot(){addEquipmentChoices();patchRenderHistory();fixHistory();fixHome();}
  var tries=0,timer=setInterval(function(){boot();if(++tries>120)clearInterval(timer)},50);
  window.addEventListener('load',boot);setTimeout(boot,800);
  var observer=new MutationObserver(function(){clearTimeout(observer._t);observer._t=setTimeout(boot,80);});observer.observe(document.documentElement,{childList:true,subtree:true});
})();