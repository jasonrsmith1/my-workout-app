(function(){
  'use strict';
  if(window.__drilldownMonthFixV1)return;
  window.__drilldownMonthFixV1=true;
  function apply(){
    var box=document.querySelector('.history-analytics');
    var drill=document.getElementById('haDrill');
    if(!box||!drill)return;
    var ys=document.getElementById('haYear'),ms=document.getElementById('haMonth'),mode=box.dataset.mode||'month';
    if(!ys||!ms)return;
    var year=Number(ys.value),month=ms.value==='all'?'all':Number(ms.value);
    Array.prototype.forEach.call(drill.querySelectorAll('tbody tr'),function(row){
      var cell=row.querySelector('td');
      if(!cell){return}
      var d=new Date((cell.textContent||'').trim());
      var visible=true;
      if(!isNaN(d)){
        visible=d.getFullYear()===year && (mode==='year'||month==='all'||d.getMonth()===month);
      }
      row.style.display=visible?'':'none';
    });
  }
  var timer=0;
  function schedule(){clearTimeout(timer);timer=setTimeout(apply,40)}
  new MutationObserver(schedule).observe(document.documentElement,{childList:true,subtree:true});
  document.addEventListener('change',schedule,true);
  window.addEventListener('load',schedule);
  schedule();
})();
