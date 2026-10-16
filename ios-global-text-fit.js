(function(){
  'use strict';
  if(window.__iosGlobalTextFitV1)return;
  window.__iosGlobalTextFitV1=true;
  var id='ios-global-text-fit-v1';
  if(document.getElementById(id))return;
  var s=document.createElement('style');
  s.id=id;
  s.textContent=`
/* iOS GLOBAL TEXT FIT V1 — shared sizing across every app page; preserves the art-derived theme */
html,body{width:100%!important;max-width:100%!important;overflow-x:hidden!important;-webkit-text-size-adjust:100%!important}
body{font-size:16px!important;line-height:1.42!important}
main,.wrap,.content,.page,.panel,.card,.section{max-width:100%!important;min-width:0!important}
/* Page titles and section hierarchy */
.top h1,.page h1,.panel h1,.card h1{font-size:clamp(20px,6vw,30px)!important;line-height:1.12!important;letter-spacing:-.2px!important;overflow-wrap:anywhere!important}
.top h2,.page h2,.panel h2,.card h2{font-size:clamp(18px,5.2vw,25px)!important;line-height:1.18!important;overflow-wrap:anywhere!important}
.top h3,.page h3,.panel h3,.card h3,.exercise-group h3{font-size:clamp(16px,4.5vw,20px)!important;line-height:1.22!important;overflow-wrap:anywhere!important}
.top h4,.page h4,.panel h4,.card h4{font-size:clamp(15px,4vw,18px)!important;line-height:1.25!important;overflow-wrap:anywhere!important}
/* Body copy, labels, helper text */
p,.description,.help,.hint,.note,.muted,.small,small,label,.field-label{overflow-wrap:anywhere!important;word-break:normal!important}
p{font-size:clamp(14px,3.8vw,16px)!important;line-height:1.4!important}
.muted,.small,small,.hint,.help,.note{font-size:clamp(12px,3.4vw,14px)!important;line-height:1.35!important}
label,.field-label{font-size:clamp(13px,3.6vw,15px)!important;line-height:1.25!important}
/* Navigation, tabs and controls */
.tabs .tab{font-size:clamp(14px,4vw,16px)!important;line-height:1.15!important;overflow-wrap:anywhere!important;text-align:center!important}
button,.button,.log,.setdone,input,select,textarea{font-family:inherit!important}
button,.button,.log,.setdone{font-size:clamp(14px,4vw,16px)!important;line-height:1.18!important;white-space:normal!important;overflow-wrap:anywhere!important;max-width:100%!important}
input,select,textarea{font-size:16px!important;line-height:1.25!important;max-width:100%!important;min-width:0!important}
input::placeholder,textarea::placeholder{font-size:14px!important;opacity:.82}
.toolbar,.toolbar>*{max-width:100%!important;min-width:0!important}
/* Workout/exercise content */
.exercise-item,.exercise-item b,.exercise-item strong,.builder-row,.setrow,.routine,.routine-name{overflow-wrap:anywhere!important;word-break:normal!important}
.exercise-item b,.exercise-item strong,.routine-name{font-size:clamp(14px,4vw,16px)!important;line-height:1.22!important}
.setrow{font-size:clamp(13px,3.7vw,15px)!important;line-height:1.25!important}
.badge{font-size:clamp(10px,2.8vw,12px)!important;line-height:1.15!important;white-space:normal!important}
.metric{font-size:clamp(13px,3.5vw,15px)!important;line-height:1.25!important;overflow-wrap:anywhere!important}
.metric b{font-size:clamp(18px,5vw,23px)!important;line-height:1.05!important}
.section{font-size:clamp(13px,3.7vw,16px)!important;line-height:1.28!important;overflow-wrap:anywhere!important}
/* Tables: fit compact columns without changing the established color treatment */
table{max-width:100%!important}
th,td{font-size:clamp(12px,3.4vw,14px)!important;line-height:1.25!important;overflow-wrap:anywhere!important;word-break:normal!important}
.progress-table,.table-wrap,.table-container{max-width:100%!important;overflow-x:auto!important;-webkit-overflow-scrolling:touch!important}
/* Timer and builder */
#workoutTimer{max-width:100%!important;overflow:hidden!important}
#workoutTimer strong{font-size:clamp(16px,4.5vw,20px)!important;overflow-wrap:anywhere!important}
#timerDisplay{font-size:clamp(18px,5.5vw,24px)!important;white-space:nowrap!important}
#workoutTimer button{font-size:clamp(13px,3.8vw,15px)!important;line-height:1.15!important}
#builderTab h2,#builderTab h3,#builderTab label,#muscleChoices label{overflow-wrap:anywhere!important;word-break:normal!important}
#muscleChoices label{font-size:clamp(13px,3.6vw,15px)!important;line-height:1.2!important}
/* Keep the art-derived palette intact while using its cyan for focus only. */
input:focus,select:focus,textarea:focus{border-color:var(--brand-cyan,#19bfff)!important;box-shadow:0 0 0 3px rgba(25,191,255,.14)!important}
@media(max-width:600px),(pointer:coarse){
  .wrap{padding-left:8px!important;padding-right:8px!important}
  .card{padding:12px!important}
  .tabs{gap:6px!important}
  .tabs .tab{min-height:44px!important;padding:10px 6px!important}
  button,.button,.log{min-height:44px!important;padding:9px 11px!important}
  input,select{min-height:44px!important}
  .toolbar{gap:7px!important;align-items:stretch!important}
  .exercise-item{gap:7px!important;padding:8px!important}
  .metricgrid{gap:8px!important}
  .metric{padding:10px!important}
  .section{margin-top:14px!important;margin-bottom:5px!important;padding:8px 9px!important}
}
@media(max-width:430px){
  body{font-size:15.5px!important}
  .top h1,.page h1,.panel h1,.card h1{font-size:clamp(19px,5.8vw,26px)!important}
  .top h2,.page h2,.panel h2,.card h2{font-size:clamp(17px,5vw,23px)!important}
  .top h3,.page h3,.panel h3,.card h3,.exercise-group h3{font-size:clamp(15px,4.3vw,19px)!important}
  p{font-size:14px!important}
  label,.field-label{font-size:13px!important}
  .tabs .tab{font-size:15px!important}
  button,.button,.log,.setdone{font-size:15px!important}
  th,td{font-size:12.5px!important}
  .card{padding:11px!important}
}
@media(max-width:360px){
  .card{padding:10px!important}
  .tabs .tab{font-size:14px!important;padding-left:5px!important;padding-right:5px!important}
  button,.button,.log,.setdone{font-size:14px!important;padding-left:9px!important;padding-right:9px!important}
  p{font-size:13.5px!important}
  th,td{font-size:12px!important}
}
`;
  (document.head||document.documentElement).appendChild(s);
})();
