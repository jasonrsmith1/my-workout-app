(function(){
  'use strict';
  if(window.__buildVersionV1)return;
  window.__buildVersionV1=true;
  var BUILD='v36';
  function render(){
    var panel=document.getElementById('appSettingsPanel');
    if(!panel)return;
    var info=panel.querySelector('.asp-info');
    if(!info)return;
    var el=info.querySelector('[data-build-version]');
    if(!el){el=document.createElement('small');el.setAttribute('data-build-version','1');info.appendChild(el);}
    el.textContent='Build '+BUILD+' • cache refresh enabled';
  }
  new MutationObserver(function(){render()}).observe(document.documentElement,{childList:true,subtree:true});
  render();
})();
