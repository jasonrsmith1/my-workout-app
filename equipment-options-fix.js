(function(){
  'use strict';
  if(window.__equipmentOptionsFixV1)return;
  window.__equipmentOptionsFixV1=true;
  var REQUIRED=['Barbell','Dumbbell','Dumbbells','Body Weight','Cable/Machine','Kettlebell','Other'];
  function fix(){
    document.querySelectorAll('#routine select[id^="eq_"]').forEach(function(sel){
      var current=String(sel.value||'').trim();
      var values=Array.from(sel.options).map(function(o){return String(o.value||'').trim()});
      REQUIRED.forEach(function(name){
        if(!values.some(function(v){return v.toLowerCase()===name.toLowerCase()})){
          var opt=document.createElement('option');
          opt.value=name;
          opt.textContent=name;
          sel.appendChild(opt);
        }
      });
      if(current){
        var match=Array.from(sel.options).find(function(o){return String(o.value||'').trim().toLowerCase()===current.toLowerCase()});
        if(match)sel.value=match.value;
      }
    });
  }
  function run(){fix();setTimeout(fix,100);setTimeout(fix,500)}
  run();
  if(window.MutationObserver){new MutationObserver(run).observe(document.body,{childList:true,subtree:true})}
})();
