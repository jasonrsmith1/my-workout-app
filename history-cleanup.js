(function(){
  'use strict';
  if(window.__historyCleanupV2)return;
  window.__historyCleanupV2=true;
  function hideSetHistory(){
    var root=document.getElementById('history');
    if(!root)return;
    Array.prototype.forEach.call(root.querySelectorAll('h2,h3,h4,h5'),function(h){
      var text=(h.textContent||'').trim();
      if(/recent exercise|individual sets?|set history|exercise history/i.test(text)){
        var box=h.closest('.card')||h.closest('section')||h.parentElement;
        if(box)box.style.display='none';
      }
    });
    Array.prototype.forEach.call(root.querySelectorAll('table'),function(table){
      if(table.closest('.ha-drill'))return;
      var heads=Array.prototype.map.call(table.querySelectorAll('thead th'),function(th){return (th.textContent||'').trim().toLowerCase()});
      var hasExercise=heads.some(function(x){return /exercise|movement/.test(x)});
      var hasRep=heads.some(function(x){return /rep/.test(x)});
      var hasWeight=heads.some(function(x){return /weight|load|lb/.test(x)});
      var hasSet=heads.some(function(x){return /set/.test(x)});
      if((hasExercise&&hasRep&&hasWeight)||(hasExercise&&hasSet&&hasRep)){
        var box=table.closest('.card')||table.closest('section')||table.parentElement;
        if(box)box.style.display='none';
      }
    });
  }
  hideSetHistory();
  var timer=0;
  new MutationObserver(function(){clearTimeout(timer);timer=setTimeout(hideSetHistory,40)}).observe(document.documentElement,{childList:true,subtree:true});
})();
