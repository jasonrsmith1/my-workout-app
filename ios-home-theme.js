(function(){
  'use strict';
  if(window.__iosHomeThemeV1)return;
  window.__iosHomeThemeV1=true;
  var id='ios-home-theme-v1';
  if(document.getElementById(id))return;
  var s=document.createElement('style');
  s.id=id;
  s.textContent=`
:root{
  --brand-navy:#06235f;
  --brand-navy-deep:#061b46;
  --brand-cyan:#19bfff;
  --brand-cyan-bright:#23d7df;
  --brand-green:#55f06c;
  --brand-purple:#8b48ff;
  --brand-ink:#0b1730;
  --brand-soft:#eef7ff;
  --brand-line:#cfe3f5;
}
html,body{max-width:100%!important;overflow-x:hidden!important;-webkit-text-size-adjust:100%!important}
body{background:linear-gradient(180deg,#eef7ff 0,#f2f2f7 32%,#f2f2f7 100%)!important;color:var(--brand-ink)!important}
.top{background:linear-gradient(135deg,var(--brand-navy),#073b6f)!important;color:#fff!important;border-bottom:0!important;box-shadow:0 3px 14px rgba(6,35,95,.18)!important}
.top h1{color:#fff!important;max-width:100%;overflow-wrap:anywhere!important}
.top p{color:#d9efff!important;max-width:100%;overflow-wrap:anywhere!important}
.card{border-color:rgba(25,191,255,.16)!important}
.tabs .tab{background:#e7f4ff!important;color:var(--brand-navy)!important;border:1px solid #c9e6f8!important}
.tabs .tab.active{background:linear-gradient(135deg,var(--brand-cyan),var(--brand-cyan-bright))!important;color:#06235f!important;border-color:transparent!important;box-shadow:0 3px 9px rgba(25,191,255,.25)!important}
.log{background:linear-gradient(135deg,var(--brand-cyan),var(--brand-cyan-bright))!important;color:#06235f!important;box-shadow:0 3px 8px rgba(25,191,255,.22)!important}
.toolbar select:focus,.toolbar input:focus,.builder-row select:focus,.builder-row input:focus,.setrow input:focus{border-color:var(--brand-cyan)!important;box-shadow:0 0 0 3px rgba(25,191,255,.14)!important}
.section,.exercise-group h3{background:linear-gradient(135deg,#e7f5ff,#edf9f4)!important;color:var(--brand-navy)!important;border-left:4px solid var(--brand-cyan)!important}
.setdone{background:var(--brand-green)!important;color:#06235f!important}
.setrow.completed{background:#e8faeb!important;border-color:#bcefc6!important}
.metric{background:linear-gradient(145deg,#f7fbff,#eef9f5)!important;border-color:rgba(25,191,255,.14)!important}
.progress-table th{background:var(--brand-navy)!important;color:#fff!important}
.muscles label{border-color:#c9e6f8!important;background:#f8fcff!important}
.badge{background:#eee8ff!important;color:#6532c7!important}
.empty{background:#f5faff!important;border-color:#a9d9f5!important}
#freeBuildBarDirect{background:#f1f9ff!important;border-color:#bfe4f8!important}
#workoutTimer{background:linear-gradient(135deg,var(--brand-navy),#073b6f)!important;color:#fff!important;border-color:transparent!important;border-radius:16px!important;box-shadow:0 6px 18px rgba(6,35,95,.2)!important}
#workoutTimer button{background:var(--brand-cyan)!important;color:#06235f!important;border:0!important;border-radius:10px!important;font-weight:700!important}
#workoutTimer button:disabled{opacity:.55!important}
#builderTab .card{border-color:rgba(25,191,255,.18)!important}
#builderTab h2,#builderTab #builder h3{color:var(--brand-navy)!important}
#builderTab .toolbar .log,#builderTab .card>div>.log,#builderTab button.log,#builderTab #builder>div:last-child .log{background:linear-gradient(135deg,var(--brand-cyan),var(--brand-cyan-bright))!important;color:#06235f!important}
#muscleChoices label:has(input:checked){background:#e7f8ee!important;border-color:var(--brand-green)!important;color:#0b5c29!important}
#muscleChoices input{accent-color:var(--brand-green)!important}
@media(max-width:600px),(pointer:coarse){
  .top h1{font-size:19px!important;line-height:1.15!important}
  .top p{font-size:12px!important;line-height:1.3!important}
  .card{padding:13px!important}
  .card h1,.card h2,.card h3,.card h4,.card p,.section,.exercise-group h3,.exercise-item{overflow-wrap:anywhere!important;word-break:normal!important;max-width:100%!important}
  .tabs .tab,.log,.tab,button,select,input{font-size:16px!important}
  button,.tabs .tab,.log{min-height:44px!important}
  select,input{min-height:44px!important}
  .toolbar{align-items:stretch!important}
  .toolbar>*{max-width:100%!important;min-width:0!important}
  .exercise-item{gap:8px!important;padding:9px!important}
  .exercise-item b,.exercise-item strong{font-size:15px!important;line-height:1.25!important}
  .muted{font-size:13px!important;line-height:1.35!important}
  .section{font-size:14px!important;line-height:1.3!important}
  .progress-table{display:block!important;overflow-x:auto!important;-webkit-overflow-scrolling:touch!important;white-space:nowrap!important}
  .progress-table table{min-width:560px!important}
}
@media(max-width:390px){
  .top h1{font-size:18px!important}
  .tabs .tab{font-size:15px!important;padding-left:5px!important;padding-right:5px!important}
  .card{padding:11px!important}
  .section{font-size:13px!important}
}
`;
  (document.head||document.documentElement).appendChild(s);
})();
