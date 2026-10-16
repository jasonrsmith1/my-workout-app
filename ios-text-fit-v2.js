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
}
@media(max-width:360px){
  .card{padding:10px!important}
  .tabs .tab{padding:9px 4px!important}
  .metricgrid{gap:6px!important}
  .metric{padding:9px!important}
  .setrow{gap:5px!important;padding:7px!important}
  .exercise-item{padding:7px!important}
}
`;
  (document.head||document.documentElement).appendChild(s);
})();
