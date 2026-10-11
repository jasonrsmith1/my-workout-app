(function(){
  'use strict';
  if(window.__armRepSemanticsV1)return;
  window.__armRepSemanticsV1=true;

  function isArmWorkout(){
    try{
      var sheet=String(typeof currentSheet!=='undefined'&&currentSheet?currentSheet:'').toLowerCase();
      return /arm|bicep|tricep/.test(sheet);
    }catch(e){return false;}
  }

  function mark(){
    if(!isArmWorkout())return;
    document.querySelectorAll('select[id^="eq_"]').forEach(function(eq){
      var row=eq.closest('.setrow');
      if(!row)return;
      var rep=row.querySelector('select[id^="rep_"],input[id^="rep_"]');
      if(!rep)return;
      var label=row.querySelector('label[data-arm-reps]');
      if(!label){
        label=document.createElement('span');
        label.setAttribute('data-arm-reps','1');
        label.style.cssText='display:block;font-size:11px;color:#64748b;margin-top:3px;';
        rep.parentNode.insertBefore(label,rep);
      }
      label.textContent='Dumbbells = reps per arm';
      label.style.display=String(eq.value||'').trim().toLowerCase()==='dumbbells'?'block':'none';
    });
  }

  function boot(){mark();}
  var timer=0;
  new MutationObserver(function(){clearTimeout(timer);timer=setTimeout(boot,60);}).observe(document.documentElement,{childList:true,subtree:true});
  document.addEventListener('change',function(e){if(e.target&&/^eq_/.test(e.target.id||''))setTimeout(boot,0);},true);
  document.addEventListener('click',function(){setTimeout(boot,0)},true);
  boot();
})();
