(function(){
  'use strict';
  if(window.__buttonSafetyV1)return;
  window.__buttonSafetyV1=true;

  function normalize(root){
    (root||document).querySelectorAll('button').forEach(function(b){
      if(!b.getAttribute('type'))b.setAttribute('type','button');
      b.style.touchAction='manipulation';
      if(!b.getAttribute('aria-label') && !b.textContent.trim() && b.dataset.nav)b.setAttribute('aria-label',b.dataset.nav);
    });
  }

  function boot(){
    normalize(document);
    if(window.MutationObserver){
      new MutationObserver(function(mutations){
        mutations.forEach(function(m){
          Array.prototype.forEach.call(m.addedNodes,function(n){
            if(n.nodeType===1)normalize(n);
          });
        });
      }).observe(document.body,{childList:true,subtree:true});
    }
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
