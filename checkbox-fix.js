(function(){
  if(document.getElementById('visible-checkbox-fix-v1'))return;
  var s=document.createElement('style');s.id='visible-checkbox-fix-v1';s.textContent=`
#exerciseLibrary input[type="checkbox"],#muscleChoices input[type="checkbox"]{appearance:auto!important;-webkit-appearance:checkbox!important;width:22px!important;height:22px!important;min-width:22px!important;min-height:22px!important;max-width:22px!important;display:inline-block!important;opacity:1!important;visibility:visible!important;position:relative!important;flex:0 0 22px!important;margin:2px 8px 0 0!important;accent-color:#007aff!important;z-index:2!important}
#exerciseLibrary .exercise-item,#muscleChoices label{display:flex!important;align-items:flex-start!important;visibility:visible!important;opacity:1!important}
#exerciseLibrary .exercise-item>div,#muscleChoices label{min-width:0!important}
@media(max-width:600px),(pointer:coarse){#exerciseLibrary input[type="checkbox"],#muscleChoices input[type="checkbox"]{width:24px!important;height:24px!important;min-width:24px!important;min-height:24px!important;flex-basis:24px!important;margin-right:9px!important}}
`;
  document.head.appendChild(s);
})();
