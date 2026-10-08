(function(){
  'use strict';
  var selectedCategory='';
  function categoryLabel(sheet){return sheet==='Shoulders.Back'?'Shoulders & Back':sheet;}
  function filterPremade(sheet){selectedCategory=sheet||'';var wanted=categoryLabel(selectedCategory),list=document.getElementById('premadeList');if(!list)return;Array.prototype.forEach.call(list.children,function(card){var h=card.querySelector('h3');card.style.display=!wanted||(h&&h.textContent.trim()===wanted)?'block':'none';});}
  function openCategory(sheet){if(!sheet)return;selectedCategory=sheet;if(typeof showTab==='function'){showTab('premade');setTimeout(function(){filterPremade(sheet);},0);}}
  function wire(){var cats=document.getElementById('cats');if(cats){Array.prototype.forEach.call(cats.querySelectorAll('button'),function(b){if(b.dataset.categoryNavFix==='1')return;b.dataset.categoryNavFix='1';b.onclick=function(ev){if(ev){ev.preventDefault();ev.stopPropagation();}var text=(b.textContent||'').trim();openCategory(text==='Shoulders & Back'?'Shoulders.Back':text);return false;};});}var select=document.getElementById('premadePageSelect');if(select&&select.dataset.categoryNavFix!=='1'){select.dataset.categoryNavFix='1';select.addEventListener('change',function(){var i=parseInt(select.value,10);if(!Number.isFinite(i))return;var all=typeof allRoutines==='function'?allRoutines():[];var r=all[i];if(!r)return;if(typeof showTab==='function'){window.__categoryNavChanging=true;currentSheet=r.sheet;currentRoutine=r.ri;if(typeof state==='object'&&state){state.sheet=r.sheet;state.routine=r.ri;if(typeof save==='function')save();}renderWorkout();window.__categoryNavChanging=false;}});}if(selectedCategory)filterPremade(selectedCategory);}
  function loadScript(id,src){if(document.getElementById(id))return;var s=document.createElement('script');s.id=id;s.src=src;s.async=false;document.body.appendChild(s);}
  function boot(){wire();loadScript('app-enhancements-loader','./app-enhancements.js?v=2');loadScript('checkbox-fix-loader','./checkbox-fix.js?v=2');loadScript('image2-branding-loader','./branding.js?v=6');loadScript('workout-tracking-fix-loader','./workout-tracking-fix.js?v=1');}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  new MutationObserver(wire).observe(document.documentElement,{childList:true,subtree:true});
})();
