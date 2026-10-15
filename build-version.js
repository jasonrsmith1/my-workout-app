(function(){
  'use strict';
  var BUILD='v38';
  window.__APP_BUILD_VERSION=BUILD;
  window.__buildVersionV5=true;
  function render(){
    var panel=document.getElementById('appSettingsPanel');
    if(!panel)return false;
    var info=panel.querySelector('.asp-info');
    if(!info)return false;
    var el=info.querySelector('[data-build-version]');
    if(!el){el=document.createElement('small');el.setAttribute('data-build-version','1');info.appendChild(el)}
    el.textContent='Build '+BUILD+' • fresh cache + artwork';
    return true;
  }
  render();
  document.addEventListener('click',function(){setTimeout(render,0)},true);
})();
