(function(){
  'use strict';
  if(window.__uiCleanupV1)return;
  window.__uiCleanupV1=true;
  var css=''
    +'html,body{background:#f2f2f7!important;color:#1c1c1e!important}'
    +'body{min-height:100vh!important}'
    +'.top{background:rgba(255,255,255,.94)!important;color:#1c1c1e!important;border-bottom:1px solid rgba(60,60,67,.18)!important;box-shadow:0 1px 0 rgba(60,60,67,.06)!important}'
    +'.wrap{background:transparent!important}'
    +'.card{background:#fff!important;border-color:rgba(60,60,67,.10)!important;box-shadow:0 1px 3px rgba(0,0,0,.05),0 6px 18px rgba(0,0,0,.035)!important}'
    +'.section,.exercise-group h3{background:#f2f2f7!important;color:#1c1c1e!important}'
    +'.metric{background:#f7f7f9!important}'
    +'.setrow{background:#f7f7f9!important}'
    +'.setrow.completed{background:#e7f8ed!important}'
    +'.cats button,.routine,.tab,.muscles label{background:#fff!important;color:#1c1c1e!important;border-color:#d1d1d6!important}'
    +'.cats button.active,.routine.active,.tab.active{background:#007aff!important;color:#fff!important;border-color:#007aff!important}'
    +'.toolbar select,.toolbar input,.builder-row select,.builder-row input,.setrow input{background:#fff!important;color:#1c1c1e!important;border-color:#c7c7cc!important}'
    +'.progress-table th,.progress-table td{border-bottom-color:#d1d1d6!important}'
    +'#haDrill{width:100%!important;max-width:100%!important;overflow:hidden!important}'
    +'#haDrill table{width:100%!important;max-width:100%!important;table-layout:fixed!important;border-collapse:collapse!important}'
    +'#haDrill th,#haDrill td{box-sizing:border-box!important;overflow-wrap:anywhere!important;word-break:normal!important;vertical-align:top!important}'
    +'#haDrill th:nth-child(1),#haDrill td:nth-child(1){width:20%!important;white-space:nowrap!important}'
    +'#haDrill th:nth-child(2),#haDrill td:nth-child(2){width:13%!important;white-space:normal!important}'
    +'#haDrill th:nth-child(3),#haDrill td:nth-child(3){width:47%!important;white-space:normal!important}'
    +'#haDrill th:nth-child(4),#haDrill td:nth-child(4){width:20%!important;white-space:nowrap!important}'
    +'@media(max-width:600px),(pointer:coarse){'
    +'#haDrill th,#haDrill td{padding:8px 5px!important;font-size:13px!important;line-height:1.25!important}'
    +'#haDrill th:nth-child(1),#haDrill td:nth-child(1){width:23%!important}'
    +'#haDrill th:nth-child(2),#haDrill td:nth-child(2){width:12%!important}'
    +'#haDrill th:nth-child(3),#haDrill td:nth-child(3){width:43%!important}'
    +'#haDrill th:nth-child(4),#haDrill td:nth-child(4){width:22%!important}'
    +'}';
  var s=document.createElement('style');s.id='ui-cleanup-v1';s.textContent=css;document.head.appendChild(s);
})();
