(function(){
  'use strict';
  if(window.__iosTextFitV2)return;
  window.__iosTextFitV2=true;
  var id='ios-text-fit-v2';
  if(document.getElementById(id))return;
  var s=document.createElement('style');
  s.id=id;
  s.textContent=`
/* iOS TEXT FIT V2 — fluid type, wrapping, and width-safe controls */
html,body{max-width:100%!important;overflow-x:hidden!important;-webkit-text-size-adjust:100%!important}
body{font-size:16px!important;line-height:1.42!important}
*,*:before,*:after{min-width:0}
.top h1{font-size:clamp(18px,5vw,22px)!important;line-height:1.12!important;overflow-wrap:anywhere!important}
.top p{font-size:clamp(12px,3.2vw,14px)!important;line-height:1.3!important;overflow-wrap:anywhere!important}
.card h1{font-size:clamp(21px,6vw,30px)!important;line-height:1.12!important}
.card h2{font-size:clamp(19px,5vw,25px)!important;line-height:1.18!important}
.card h3,.exercise-group h3{font-size:clamp(16px,4.4vw,20px)!important;line-height:1.22!important}
.card h4{font-size:clamp(15px,4vw,18px)!important;line-height:1.25!important}
.card p,.exercise-item,.builder-row,.setrow,.metric,.section{overflow-wrap:anywhere!important;word-break:normal!important}
.section{font-size:clamp(13px,3.7vw,16px)!important;line-height:1.28!important}
.muted{font-size:clamp(12px,3.4vw,14px)!important;line-height:1.35!important}
.badge{font-size:clamp(10px,2.8vw,12px)!important;line-height:1.15!important;white-space:normal!important}
.tabs .tab{font-size:clamp(14px,4vw,16px)!important;line-height:1.15!important;white-space:normal!important;overflow-wrap:anywhere!important;text-align:center!important}
button,.log,.setdone{font-size:clamp(14px,4vw,16px)!important;line-height:1.18!important;white-space:normal!important;overflow-wrap:anywhere!important}
select,input{font-size:16px!important;line-height:1.2!important;min-width:0!important;max-width:100%!important}
.toolbar{min-width:0!important;max-width:100%!important}
.toolbar>*{min-width:0!important;max-width:100%!important}
.exercise-item b,.exercise-item strong{font-size:clamp(14px,4vw,16px)!important;line-height:1.22!important}
.metric b{font-size:clamp(18px,5vw,22px)!important;line-height:1.05!important;overflow-wrap:anywhere!important}
.metric{font-size:clamp(13px,3.5vw,15px)!important}
.progress-table{max-width:100%!important;overflow-x:auto!important;-webkit-overflow-scrolling:touch!important}
.progress-table table{min-width:560px!important}
#workoutTimer{max-width:100%!important;overflow:hidden!important}
#workoutTimer strong{font-size:clamp(16px,4.5vw,20px)!important;overflow-wrap:anywhere!important}
#timerDisplay{font-size:clamp(17px,5vw,22px)!important;white-space:nowrap!important}
#workoutTimer button{font-size:clamp(13px,3.8vw,15px)!important;line-height:1.15!important;white-space:normal!important}
#builderTab h2,#builderTab #builder h3{overflow-wrap:anywhere!important}
#muscleChoices label{font-size:clamp(13px,3.6vw,15px)!important;line-height:1.2!important;overflow-wrap:anywhere!important}
@media(max-width:430px){
  .wrap{padding:8px!important}
  .card{padding:12px!important}
  .tabs{gap:6px!important}
  .tabs .tab{min-height:44px!important;padding:10px 5px!important}
  .toolbar{gap:7px!important}
  .exercise-item{gap:7px!important;padding:8px!important}
  .metricgrid{gap:8px!important}
  .metric{padding:10px!important}
  .section{margin-top:14px!important;margin-bottom:5px!important;padding:8px 9px!important}
  #history .ha-drill{overflow:hidden!important}
  #history .ha-drill table{width:100%!important;table-layout:fixed!important;font-size:12.5px!important}
  #history .ha-drill th,#history .ha-drill td{padding:7px 5px!important;white-space:normal!important;overflow-wrap:anywhere!important;word-break:normal!important;vertical-align:top!important}
  #history .ha-drill th:nth-child(1),#history .ha-drill td:nth-child(1){width:21%!important;white-space:nowrap!important}
  #history .ha-drill th:nth-child(2),#history .ha-drill td:nth-child(2){width:15%!important;white-space:nowrap!important}
  #history .ha-drill th:nth-child(3),#history .ha-drill td:nth-child(3){width:44%!important}
  #history .ha-drill th:nth-child(4),#history .ha-drill td:nth-child(4){width:20%!important;white-space:nowrap!important}
  #history .ha-drill td:nth-child(3) strong{display:block!important;font-size:13px!important;line-height:1.2!important}
  #history .ha-drill .hd-routine{font-size:11px!important;line-height:1.2!important;display:block!important;margin-top:2px!important;overflow-wrap:anywhere!important;word-break:normal!important}
  #homeTab.home-redesign .hr-bottomnav{grid-template-columns:repeat(4,minmax(0,1fr))!important;padding-left:8px!important;padding-right:8px!important}
  #homeTab.home-redesign .hr-navbtn{min-width:0!important;width:100%!important;font-size:11px!important;line-height:1!important;white-space:nowrap!important;overflow:hidden!important;gap:2px!important}
  #homeTab.home-redesign .hr-navbtn span{white-space:nowrap!important;display:block!important;max-width:100%!important;overflow:visible!important}
  #homeTab.home-redesign .hr-navbtn svg{width:27px!important;height:27px!important;flex:0 0 27px!important}
}
@media(max-width:360px){
  .card{padding:10px!important}
  .tabs .tab{padding:9px 4px!important}
  .metricgrid{gap:6px!important}
  .metric{padding:9px!important}
  .setrow{gap:5px!important;padding:7px!important}
  .exercise-item{padding:7px!important}
  #history .ha-drill table{font-size:12px!important}
  #history .ha-drill th,#history .ha-drill td{padding:6px 4px!important}
  #history .ha-drill th:nth-child(1),#history .ha-drill td:nth-child(1){width:22%!important}
  #history .ha-drill th:nth-child(2),#history .ha-drill td:nth-child(2){width:14%!important}
  #history .ha-drill th:nth-child(3),#history .ha-drill td:nth-child(3){width:44%!important}
  #history .ha-drill th:nth-child(4),#history .ha-drill td:nth-child(4){width:20%!important}
  #homeTab.home-redesign .hr-navbtn{font-size:10px!important}
}
`;
  (document.head||document.documentElement).appendChild(s);
  function compactDate(t){var m=String(t||'').match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);return m?m[1]+'/'+m[2]+'/'+m[3].slice(-2):t}
  function compactType(t){var x=String(t||'').trim();if(/^workout$/i.test(x))return'W/O';if(/^walking$/i.test(x))return'Walk';if(/^running$/i.test(x))return'Run';if(/^weight\s*training$/i.test(x))return'Weights';return x}
  function compactRoutine(t){return String(t||'').trim()}
  function compactDrilldown(){var d=document.getElementById('haDrill');if(!d||window.innerWidth>430)return;var table=d.querySelector('table');if(!table)return;var heads=table.querySelectorAll('thead th');Array.prototype.forEach.call(heads,function(h){var t=(h.textContent||'').trim();if(/^main focus$/i.test(t))h.textContent='Focus';if(/^type$/i.test(t))h.textContent='Type';});Array.prototype.forEach.call(table.querySelectorAll('tbody tr'),function(row){var c=row.querySelectorAll('td');if(c.length<4)return;c[0].textContent=compactDate(c[0].textContent.trim());c[1].textContent=compactType(c[1].textContent.trim());var strong=c[2].querySelector('strong'),span=c[2].querySelector('.hd-routine');if(strong)strong.textContent=compactType(strong.textContent);if(span)span.textContent=compactRoutine(span.textContent);else c[2].textContent=compactRoutine(c[2].textContent);});}
  function boot(){compactDrilldown();setTimeout(compactDrilldown,250);setTimeout(compactDrilldown,800);}
  boot();window.addEventListener('resize',compactDrilldown);window.addEventListener('load',compactDrilldown);
  if(window.MutationObserver){var mo=new MutationObserver(function(){clearTimeout(window.__iosTextFitDrillTimer);window.__iosTextFitDrillTimer=setTimeout(compactDrilldown,40)});mo.observe(document.body,{childList:true,subtree:true});}
})();