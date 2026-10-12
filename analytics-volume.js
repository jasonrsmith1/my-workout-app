(function(){
  'use strict';
  if(window.__analyticsVolumeV1)return;
  window.__analyticsVolumeV1=true;
  function n(v){var x=parseFloat(String(v==null?'':v).replace(/[^0-9.]/g,''));return isFinite(x)?x:0;}
  function logs(){try{var x=JSON.parse(localStorage.getItem('workout_v3')||'{}').logs;return Array.isArray(x)?x:[]}catch(e){return[]}}
  function volume(l){if(!l||l.cardio===true)return 0;var mult=String(l.equipment||'').trim().toLowerCase()==='dumbbells'?2:1;return n(l.repsCompleted)*n(l.weight)*mult;}
  function dateOf(l){var d=new Date(l&& (l.date||l.timestamp));return isNaN(d)?null:d;}
  function selected(){var y=document.getElementById('haYear'),m=document.getElementById('haMonth'),t=document.getElementById('haType'),r=document.getElementById('haRoutine');return {year:y?Number(y.value):0,month:m&&m.value!=='all'?Number(m.value):'all',type:t?t.value:'all',routine:r?r.value:'all'};}
  function render(){
    var summary=document.getElementById('haSummary');if(!summary)return;
    var f=selected(),total=0;
    logs().forEach(function(l){var d=dateOf(l);if(!d||l.cardio===true)return;if(f.year&&d.getFullYear()!==f.year)return;if(f.month!=='all'&&d.getMonth()!==f.month)return;if(f.type!=='all'&&String(l.sheet||l.type||'')!==String(f.type))return;if(f.routine!=='all'&&String(l.routine||'')!==String(f.routine))return;total+=volume(l);});
    var stat=summary.querySelector('[data-total-volume]');
    if(!stat){stat=document.createElement('div');stat.className='ha-stat';stat.setAttribute('data-total-volume','1');stat.innerHTML='<b>0 lb</b><span>Total Volume</span>';summary.appendChild(stat);}
    stat.querySelector('b').textContent=Math.round(total).toLocaleString()+' lb';
  }
  function boot(){render();}
  var timer=0;
  new MutationObserver(function(){clearTimeout(timer);timer=setTimeout(boot,60)}).observe(document.documentElement,{childList:true,subtree:true});
  document.addEventListener('change',function(e){if(/^ha(Year|Month|Type|Routine)$/.test(e.target&&e.target.id||''))setTimeout(render,0)},true);
  window.addEventListener('load',boot);
  setTimeout(boot,300);setTimeout(boot,1000);
})();
