(function(){
  'use strict';
  if(window.__buildVersionV2)return;
  window.__buildVersionV2=true;
  var BUILD='v36';
  function render(){
    var panel=document.getElementById('appSettingsPanel');
    if(!panel)return;
    var info=panel.querySelector('.asp-info');
    if(!info)return;
    var el=info.querySelector('[data-build-version]');
    if(!el){
      el=document.createElement('small');
      el.setAttribute('data-build-version','1');
      el.textContent='Build '+BUILD+' • cache refresh enabled';
      info.appendChild(el);
    }else if(el.textContent!=='Build '+BUILD+' • cache refresh enabled'){
      el.textContent='Build '+BUILD+' • cache refresh enabled';
    }
  }
  var timer=0;
  function schedule(){
    clearTimeout(timer);
    timer=setTimeout(render,100);
  }
  render();
  new MutationObserver(schedule).observe(document.documentElement,{childList:true,subtree:true});
})();
