(function(){
  'use strict';
  if(window.__cardioHistorySuppressV1)return;
  window.__cardioHistorySuppressV1=true;
  function remove(){
    document.querySelectorAll('.cardio-history,.cardio-linked-history,.cardio-progress-linked,.cardio-history-fixed').forEach(function(el){el.remove()});
    document.querySelectorAll('#history h3,#history h2').forEach(function(el){
      var t=(el.textContent||'').trim().toLowerCase();
      if(t==='cardio history'||t==='cardio sessions'){
        var block=el.closest('.history-block,.card');
        if(block)block.remove();
      }
    });
  }
  remove();
  new MutationObserver(remove).observe(document.documentElement,{childList:true,subtree:true});
  setInterval(remove,1000);
})();
