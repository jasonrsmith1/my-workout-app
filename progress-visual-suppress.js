(function(){
  'use strict';
  if(window.__progressVisualSuppressV1)return;
  window.__progressVisualSuppressV1=true;
  function hide(){
    document.querySelectorAll('.progress-item,.progress-chart,.progress-visual,.exercise-progression,.exercise-progression-chart').forEach(function(el){
      el.style.display='none';
    });
    document.querySelectorAll('#history h3,#history h4').forEach(function(el){
      if(/exercise progression/i.test(el.textContent||''))el.style.display='none';
    });
  }
  hide();
  var timer=0;
  new MutationObserver(function(){
    clearTimeout(timer);
    timer=setTimeout(hide,50);
  }).observe(document.documentElement,{childList:true,subtree:true});
})();
