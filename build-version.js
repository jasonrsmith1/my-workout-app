(function(){
  'use strict';
  if(window.__buildVersionV3)return;
  window.__buildVersionV3=true;
  var BUILD='v36';
  function render(){
    var panel=document.getElementById('appSettingsPanel');
    if(!panel)return false;
    var info=panel.querySelector('.asp-info');
    if(!info)return false;
    if(!info.querySelector('[data-build-version]')){
      var el=document.createElement('small');
      el.setAttribute('data-build-version','1');
      el.textContent='Build '+BUILD+' • cache refresh enabled';
      info.appendChild(el);
    }
    return true;
  }
  render();
  var tries=0;
  function retry(){
    if(render()||tries++>=12)return;
    setTimeout(retry,250);
  }
  retry();
})();
