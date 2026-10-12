(function(){
  'use strict';
  if(window.__historyCleanupV1)return;
  window.__historyCleanupV1=true;
  function hideSetHistory(){
    var root=document.getElementById('history');
    if(!root)return;
    Array.prototype.forEach.call(root.querySelectorAll('h2,h3,h4,h5'),function(h){
      var text=(h.textContent||'').trim();
      if(/recent exercise/i.test(text)){
        var box=h.closest('.card')||h.parentElement;
        if(box)box.style.display='none';
      }
    });
    Array.prototype.forEach.call(root.querySelectorAll('table'),function(table){
      if(table.closest('.ha-drill'))return;
      var heads=Array.prototype.map.call(table.querySelectorAll('thead th'),function(th){return (th.textContent||'').trim().toLowerCase()});
      var looksLikeSets=heads.some(function(x){return /exercise|movement/.test(x)}) && heads.some(function(x){return /rep/.test(x)}) && heads.some(function(x){return /weight|load/.test(x)});
      if(looksLikeSets){var box=table.closest('.card')||table.parentElement;if(box)box.style.display='none';}
    });
  }
  hideSetHistory();
  var timer=0;
  new MutationObserver(function(){clearTimeout(timer);timer=setTimeout(hideSetHistory,40)}).observe(document.documentElement,{childList:true,subtree:true});
})();
