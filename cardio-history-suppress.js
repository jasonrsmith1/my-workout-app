(function(){
  'use strict';
  if(window.__cardioHistorySuppressV2)return;
  window.__cardioHistorySuppressV2=true;

  function remove(){
    document.querySelectorAll('.cardio-history,.cardio-linked-history,.cardio-progress-linked,.cardio-history-fixed').forEach(function(el){
      el.remove();
    });
    document.querySelectorAll('#history h3,#history h2').forEach(function(el){
      var t=(el.textContent||'').trim().toLowerCase();
      if(t!=='cardio history'&&t!=='cardio sessions')return;
      var block=el.closest('.history-block,.card');
      if(block)block.remove();
    });
  }

  var pending=0;
  function schedule(){
    if(pending)return;
    pending=setTimeout(function(){pending=0;remove();},50);
  }

  remove();
  new MutationObserver(schedule).observe(document.documentElement,{childList:true,subtree:true});
})();
