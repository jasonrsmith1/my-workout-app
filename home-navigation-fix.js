(function(){
  'use strict';
  if(window.__homeNavigationFixV2)return;
  window.__homeNavigationFixV2=true;

  function nativeButton(label){
    var wanted=String(label||'').trim().toLowerCase();
    var buttons=document.querySelectorAll('.tabs .tab');
    for(var i=0;i<buttons.length;i++){
      var text=(buttons[i].textContent||'').trim().toLowerCase();
      if(text===wanted)return buttons[i];
    }
    return null;
  }
  function hideHome(){
    var h=document.getElementById('homeTab');
    if(h)h.style.display='none';
    document.documentElement.classList.remove('hr-home-active');
    document.body.classList.remove('hr-home-active');
  }
  function go(tab){
    if(tab==='home'){
      var h=document.getElementById('homeTab');
      if(h)h.style.display='block';
      document.documentElement.classList.add('hr-home-active');
      document.body.classList.add('hr-home-active');
      window.scrollTo({top:0,behavior:'smooth'});
      return;
    }
    hideHome();
    var label={workout:'Workout',premade:'Premade Workouts',history:'History & Progress',exercises:'Exercises',builder:'Create Workout',settings:'Settings'}[tab]||tab;
    var b=nativeButton(label);
    if(b){b.click();return;}
    if(typeof showTab==='function')showTab(tab);
  }
  function wire(){
    var root=document.getElementById('homeTab');
    if(!root)return;
    root.querySelectorAll('[data-nav]').forEach(function(b){
      if(b.dataset.homeNavFix==='2')return;
      b.dataset.homeNavFix='2';
      b.addEventListener('click',function(e){
        e.preventDefault();e.stopPropagation();
        go(b.getAttribute('data-nav'));
      },true);
    });
  }
  function boot(){wire();setTimeout(wire,100);setTimeout(wire,500);setTimeout(wire,1200)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  new MutationObserver(wire).observe(document.documentElement,{childList:true,subtree:true});
})();
