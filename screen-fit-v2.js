(function(){
  'use strict';
  if(window.__screenFitV2)return;
  window.__screenFitV2=true;
  var css=''
    /* PASS 1: viewport + safe areas */
    +'html,body{width:100%!important;max-width:100%!important;min-width:0!important;overflow-x:hidden!important;-webkit-text-size-adjust:100%!important}'
    +'body{padding-bottom:env(safe-area-inset-bottom)!important}'
    /* PASS 2: shared shell */
    +'.wrap,main,.grid,.card,#homeTab,#workoutTab,#routine,#progress,#history{width:100%!important;max-width:100%!important;min-width:0!important}'
    +'main{overflow:visible!important}'
    +'.card{overflow:hidden!important}'
    /* PASS 3: header fit */
    +'.top{width:100%!important;max-width:100%!important;overflow:hidden!important}'
    +'.top h1,.top p{max-width:100%!important;overflow-wrap:anywhere!important}'
    /* PASS 4: tabs + controls */
    +'.tabs,.toolbar,.workout-nav{width:100%!important;max-width:100%!important;min-width:0!important}'
    +'.tabs>*{min-width:0!important;max-width:100%!important}'
    +'.toolbar select,.toolbar input,.workout-nav select,.workout-nav input{width:100%!important;max-width:100%!important;min-width:0!important}'
    /* PASS 5: routine content */
    +'#routine{overflow:hidden!important}'
    +'#routine h1,#routine h2,#routine h3,#routine p,#routine strong{max-width:100%!important;overflow-wrap:anywhere!important;word-break:normal!important}'
    +'.exercise-item{min-width:0!important;max-width:100%!important;overflow:hidden!important}'
    +'.exercise-item>*{min-width:0!important;max-width:100%!important}'
    /* PASS 6: set rows */
    +'.setrow{width:100%!important;max-width:100%!important;min-width:0!important}'
    +'.setrow>*{min-width:0!important;max-width:100%!important}'
    +'.setrow input{width:100%!important;max-width:100%!important;min-width:0!important;font-size:16px!important}'
    /* PASS 7: analytics/history table */
    +'#haDrill{width:100%!important;max-width:100%!important;min-width:0!important;overflow-x:hidden!important}'
    +'#haDrill table{display:table!important;width:100%!important;max-width:100%!important;min-width:0!important;table-layout:fixed!important;border-collapse:collapse!important}'
    +'#haDrill tr{width:100%!important;max-width:100%!important}'
    +'#haDrill th,#haDrill td{box-sizing:border-box!important;min-width:0!important;max-width:100%!important;vertical-align:top!important;overflow-wrap:anywhere!important;word-break:normal!important}'
    +'#haDrill th:nth-child(1),#haDrill td:nth-child(1){width:23%!important;white-space:nowrap!important}'
    +'#haDrill th:nth-child(2),#haDrill td:nth-child(2){width:13%!important;white-space:nowrap!important}'
    +'#haDrill th:nth-child(3),#haDrill td:nth-child(3){width:42%!important;white-space:normal!important}'
    +'#haDrill th:nth-child(4),#haDrill td:nth-child(4){width:22%!important;white-space:nowrap!important}'
    /* PASS 8: mobile table typography */
    +'@media(max-width:600px),(pointer:coarse){'
    +'#haDrill th,#haDrill td{padding:8px 5px!important;font-size:13px!important;line-height:1.28!important}'
    +'#haDrill th:nth-child(1),#haDrill td:nth-child(1){width:25%!important}'
    +'#haDrill th:nth-child(2),#haDrill td:nth-child(2){width:13%!important}'
    +'#haDrill th:nth-child(3),#haDrill td:nth-child(3){width:40%!important}'
    +'#haDrill th:nth-child(4),#haDrill td:nth-child(4){width:22%!important}'
    +'.metricgrid{width:100%!important;max-width:100%!important}'
    '}'
    /* PASS 9: bottom navigation clearance */
    +'body.hr-home-active{padding-bottom:0!important}'
    +'.hr-bottomnav{padding-bottom:calc(7px + env(safe-area-inset-bottom))!important;height:calc(78px + env(safe-area-inset-bottom))!important}'
    +'.hr-shell{padding-bottom:calc(96px + env(safe-area-inset-bottom))!important}'
    /* PASS 10: small-phone tightening */
    +'@media(max-width:390px){'
    +'.wrap{padding:8px!important}.card{padding:11px!important;border-radius:13px!important}'
    +'.tabs{gap:6px!important}.tabs .tab{padding:10px 5px!important;font-size:14px!important}'
    +'.setrow{grid-template-columns:42px minmax(0,1fr) minmax(0,1fr)!important;gap:5px!important}'
    +'#haDrill th,#haDrill td{padding:7px 4px!important;font-size:12px!important}'
    +'}';
  var s=document.createElement('style');s.id='screen-fit-v2-style';s.textContent=css;document.head.appendChild(s);
})();
