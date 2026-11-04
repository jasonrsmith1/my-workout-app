(function(){
  'use strict';
  if(window.__finishWorkoutResetV5)return;
  window.__finishWorkoutResetV5=true;
  function stateObj(){try{return(typeof state==='object'&&state)?state:null}catch(e){return null}}
  function genericName(v){return /^(workout|routine)(?:\s+[ivxlcdm0-9]+)?$/i.test(String(v||'').trim())}
  function displayedRoutineName(){
    try{
      var s=stateObj(),name='';
      var sel=document.getElementById('premadePageSelect');
      if(sel&&sel.selectedIndex>=0){var opt=sel.options[sel.selectedIndex];name=opt?(opt.textContent||'').trim():'';}
      if(genericName(name))name='';
      if(!name){var el=document.querySelector('#routine .routine-title,#routine .routine-name,#routine [data-routine-name],#routine h2,#routine h3');if(el)name=(el.textContent||'').trim();}
      if(genericName(name))name='';
      if(!name&&s){name=String(s.routineName||s.workoutName||'').trim();if(genericName(name))name='';}
      if(!name&&typeof currentRoutine!=='undefined'&&typeof currentRoutine==='string'&&!/^\d+$/.test(currentRoutine)&&!genericName(currentRoutine))name=currentRoutine.trim();
      return name;
    }catch(e){return ''}
  }
  function routineName(sheet,ri){var shown=displayedRoutineName();if(shown)return shown;try{var g=DATA.find(function(x){return String(x.sheet)===String(sheet)}),r=g&&g.routines[Number(ri)];return r&&r.name?r.name:''}catch(e){return ''}}
  function save(){try{if(typeof window.save==='function')window.save()}catch(e){}}
  var pending=[],busy=false;
  function saveFormSets(){var s=stateObj();if(!s)return[];s.logs=Array.isArray(s.logs)?s.logs:[];var sheet=(typeof currentSheet!=='undefined'&&currentSheet)||s.sheet,ri=(typeof currentRoutine!=='undefined'&&currentRoutine)!==undefined?currentRoutine:s.routine,routine=routineName(sheet,ri)||String(ri||''),saved=[];document.querySelectorAll('#routine .setrow').forEach(function(row){var card=row.closest('.card'),exEl=card&&card.querySelector('.workout-summary-exercise strong'),rp=row.querySelector('[id^="rep_"]'),wt=row.querySelector('[id^="wt_"]');if(!exEl||!rp||!wt)return;var reps=String(rp.value||'').trim(),weight=String(wt.value||'').trim();if(!reps)return;var ex=exEl.textContent.trim(),setNo=Number((row.id||'').split('_').pop())||1,eq=card&&card.querySelector('select[id^="eq_"]'),ps=card?card.querySelectorAll('.workout-summary-pair strong'):[],entry={date:new Date().toLocaleString(),sheet:sheet,routine:routine,routineName:routine,workoutName:routine,exercise:ex,sets:ps[0]?ps[0].textContent.trim():'',reps:'',setNo:setNo,repsCompleted:reps,weight:weight,equipment:eq?String(eq.value||''):'',completed:true},ix=s.logs.findIndex(function(l){return String(l.sheet)===String(sheet)&&String(l.routine)===String(routine)&&String(l.exercise)===String(ex)&&Number(l.setNo)===setNo});if(ix>=0)s.logs[ix]=entry;else s.logs.unshift(entry);saved.push(entry)});s.logs=s.logs.slice(0,2000);pending=saved;save();try{if(typeof window.renderHistory==='function')window.renderHistory()}catch(e){}return saved}
  function restoreSaved(){var s=stateObj();if(!s||!pending.length)return;s.logs=Array.isArray(s.logs)?s.logs:[];pending.forEach(function(entry){var ix=s.logs.findIndex(function(l){return String(l.sheet)===String(entry.sheet)&&String(l.routine)===String(entry.routine)&&String(l.exercise)===String(entry.exercise)&&Number(l.setNo)===Number(entry.setNo)});if(ix<0)s.logs.unshift(entry)});s.logs=s.logs.slice(0,2000);save();try{if(typeof window.renderHistory==='function')window.renderHistory()}catch(e){}}
  function resetForms(){document.querySelectorAll('#routine input[id^="rep_"],#routine input[id^="wt_"]').forEach(function(el){el.value=''});document.querySelectorAll('#routine select[id^="rep_"]').forEach(function(el){el.value=''});document.querySelectorAll('#routine .setrow').forEach(function(row){row.classList.remove('completed');var b=row.querySelector('.setdone');if(b){b.dataset.saved='';b.setAttribute('aria-pressed','false');b.disabled=false}});document.querySelectorAll('#routine select[id^="eq_"]').forEach(function(el){el.selectedIndex=0})}
  function buttonKind(el){var b=el&&el.closest?el.closest('button'):null;if(!b)return'';var t=(b.textContent||'').trim().toLowerCase();if(!b.closest('#workoutTimer')&&t.indexOf('finish workout')<0)return'';if(t.indexOf('finish workout')>=0||/^(finish|complete workout|end workout)$/.test(t))return'finish';if(/\breset\b/.test(t))return'reset';return''}
  function clearBurst(){[0,120,300,600,1000,1500].forEach(function(ms){setTimeout(resetForms,ms)});setTimeout(function(){pending=[];busy=false},1700)}
  function finish(){if(busy)return;busy=true;saveFormSets();setTimeout(restoreSaved,0);setTimeout(restoreSaved,150);setTimeout(restoreSaved,500);clearBurst()}
  function reset(){if(busy)return;busy=true;pending=[];clearBurst()}
  function handle(e){var kind=buttonKind(e.target);if(!kind)return;if(kind==='finish')finish();else reset()}
  document.addEventListener('click',handle,true);document.addEventListener('pointerup',handle,true);
})();
