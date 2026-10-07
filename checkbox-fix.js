(function(){
  if(document.getElementById('visible-checkbox-fix-v2'))return;
  var s=document.createElement('style');s.id='visible-checkbox-fix-v2';s.textContent=`
#exerciseLibrary input[type="checkbox"],#muscleChoices input[type="checkbox"]{
  -webkit-appearance:none!important;
  appearance:none!important;
  display:inline-block!important;
  width:28px!important;height:28px!important;
  min-width:28px!important;min-height:28px!important;
  max-width:28px!important;max-height:28px!important;
  flex:0 0 28px!important;
  margin:1px 10px 0 0!important;
  padding:0!important;
  border:3px solid #8e8e93!important;
  border-radius:9px!important;
  background:#fff!important;
  opacity:1!important;
  visibility:visible!important;
  position:relative!important;
  box-sizing:border-box!important;
  z-index:2!important;
}
#exerciseLibrary input[type="checkbox"]:checked,#muscleChoices input[type="checkbox"]:checked{
  border-color:#0a84ff!important;
  background:#0a84ff!important;
}
#exerciseLibrary input[type="checkbox"]:checked::after,#muscleChoices input[type="checkbox"]:checked::after{
  content:'✓';
  position:absolute;
  left:50%;top:50%;
  transform:translate(-50%,-55%);
  color:#fff!important;
  font-size:20px!important;
  font-weight:900!important;
  line-height:1!important;
}
#exerciseLibrary .exercise-item,#muscleChoices label{
  display:flex!important;
  align-items:flex-start!important;
  visibility:visible!important;
  opacity:1!important;
}
#exerciseLibrary .exercise-item>div,#muscleChoices label{min-width:0!important}
@media(max-width:600px),(pointer:coarse){
  #exerciseLibrary input[type="checkbox"],#muscleChoices input[type="checkbox"]{
    width:30px!important;height:30px!important;
    min-width:30px!important;min-height:30px!important;
    max-width:30px!important;max-height:30px!important;
    flex-basis:30px!important;
    border-width:3px!important;
    border-radius:9px!important;
    margin-right:10px!important;
  }
}
`;
  document.head.appendChild(s);
})();
