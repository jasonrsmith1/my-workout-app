(function(){
  'use strict';
  if(window.__analyticsVolumeV5)return;
  window.__analyticsVolumeV5=true;
  function n(v){var x=parseFloat(String(v==null?'':v).replace(/[^0-9.]/g,''));return isFinite(x)?x:0;}
  function reps(l){var r=l&&l.repsCompleted!=null?l.repsCompleted:l&&l.reps;return String(r).trim().toLowerCase()==='failure'?n(l&&l.actualReps!=null?l.actualReps:l&&l.completedReps):n(r);}
  function multiplier(l){var eq=String(l&&l.equipment||'').trim().toLowerCase();return eq==='dumbbell'||eq==='dumbbells'?2:1;}
  function logs(){try{var x=JSON.parse(localStorage.getItem('workout_v3')||'{}').logs;return Array.isArray(x)?x:[]}catch(e){return[]}}
  function volume(l){if(!l||l.cardio===true)return 0;return reps(l)*n(l.weight||l.load||l.actualWeight||0)*multiplier(l);}
  function dateOf(l){var d=new Date(l&&(l.date||l.timestamp));return isNaN(d)?null:d;}
  function selected(){var y=document.getElementById('haYear'),m=document.getElementById('haMonth'),t=document.getElementById('haType'),r=document.getElementById('haRoutine');return {year:y?Number(y.value):0,month:m&&m.value!=='all'?Number(m.value):'all',type:t?t.value:'all',routine:r?r.value:'all'};}
  function typeMatches(l,want){if(!want||want==='all')return true;var a=[l.sheet,l.type,l.category,l.workoutType].map(function(v){return String(v==null?'':v).trim().toLowerCase()}),w=String(want).trim().toLowerCase();return a.indexOf(w)>=0||a.some(function(v){return v&&((v.indexOf(w)>=0)||(w.indexOf(v)>=0))});}
  function routineMatches(l,want){if(!want||want==='all')return true;return String(l.routine||l.workout||'').trim().toLowerCase()===String(want).trim().toLowerCase();}
  function render(){var summary=document.getElementById('haSummary');if(!summary)return;var f=selected(),total=0;logs().forEach(function(l){var d=dateOf(l);if(!d||l.cardio===true)return;if(f.year&&d.getFullYear()!==f.year)return;if(f.month!=='all'&&d.getMonth()!==f.month)return;if(!typeMatches(l,f.type)||!routineMatches(l,f.routine))return;total+=volume(l)});var stat=summary.querySelector('[data-total-volume]');if(!stat){stat=document.createElement('div');stat.className='ha-stat';stat.setAttribute('data-total-volume','1');stat.innerHTML='<b></b><span>Total Volume</span>';summary.appendChild(stat)}var value=Math.round(total).toLocaleString()+' lb',valueNode=stat.querySelector('b');if(valueNode)valueNode.textContent=value;}
  var timer=0;function boot(){render();}new MutationObserver(function(){clearTimeout(timer);timer=setTimeout(boot,60)}).observe(document.documentElement,{childList:true,subtree:true});document.addEventListener('change',function(e){if(/^ha(Year|Month|Type|Routine)$/.test(e.target&&e.target.id||''))setTimeout(render,0)},true);window.addEventListener('load',boot);setTimeout(boot,300);setTimeout(boot,1000);setTimeout(boot,2000);
})();