(function(){
  'use strict';
  if(window.__workoutTrackingFixV5)return;
  window.__workoutTrackingFixV5=true;

  var style=document.createElement('style');
  style.id='workout-tracking-state-v5';
  style.textContent='#routine .setrow .setdone{background:#e5e5ea!important;color:#6c6c70!important;border:2px solid #8e8e93!important;border-radius:11px!important;font-size:0!important;font-weight:800!important;cursor:pointer!important;opacity:1!important;box-shadow:none!important}#routine .setrow .setdone::after{content:"✓";font-size:20px!important;color:#8e8e93!important}#routine .setrow .setdone[data-saved="1"]{background:#34c759!important;border-color:#34c759!important;color:#fff!important}#routine .setrow .setdone[data-saved="1"]::after{color:#fff!important}#routine .setrow.completed{background:#dff7e5!important}';
  document.head.appendChild(style);

  function getState(){try{return JSON.parse(localStorage.getItem('workout_v3')||'{"sheet":null,"routine":0,"logs":[],"custom":[]}')}catch(e){return {sheet:null,routine:0,logs:[],custom:[]}}}
  function saveState(s){localStorage.setItem('workout_v3',JSON.stringify(s))}
  function hashLocal(s){let h=0;for(let i=0;i<s.length;i++)h=((h<<5)-h)+s.charCodeAt(i)|0;return Math.abs(h)}
  function routineNameFor(sheet,routine){try{const g=DATA.find(x=>String(x.sheet)===String(sheet));const r=g&&g.routines[Number(routine)];return r&&r.name?r.name:''}catch(e){return ''}}
  function migrateRoutineNames(s){let changed=false;(s.logs||[]).forEach(function(l){const n=routineNameFor(l.sheet,l.routine);if(n&&String(l.routine)!==String(n)){l.routine=n;changed=true}});if(changed)saveState(s);return s}
  function markButton(row,saved){if(!row)return;row.classList.toggle('completed',!!saved);const b=row.querySelector('.setdone');if(!b)return;b.disabled=false;b.dataset.saved=saved?'1':'';b.setAttribute('aria-pressed',saved?'true':'false');b.setAttribute('aria-label',saved?'Set completed':'Mark set completed');b.textContent=''}
  function saveSet(ex,sets,reps,setNo){
    const id=hashLocal(ex),rp=document.getElementById('rep_'+id+'_'+setNo),wt=document.getElementById('wt_'+id+'_'+setNo),eq=document.getElementById('eq_'+id),row=document.getElementById('set_'+id+'_'+setNo);
    if(!rp||!wt||!row)return false;
    const repsCompleted=String(rp.value||'').trim(),weight=String(wt.value||'').trim();
    if(!repsCompleted){rp.focus();return false}
    const s=getState();s.sheet=(typeof currentSheet!=='undefined'&&currentSheet)||s.sheet;s.routine=(typeof currentRoutine!=='undefined'&&currentRoutine)||s.routine;s.logs=Array.isArray(s.logs)?s.logs:[];
    const routineName=routineNameFor(s.sheet,s.routine)||String(s.routine||'');
    const entry={date:new Date().toLocaleString(),sheet:s.sheet,routine:routineName,exercise:ex,sets:sets,reps:reps,setNo:setNo,repsCompleted:repsCompleted,weight:weight,equipment:eq?String(eq.value||''):'',completed:true};
    const ix=s.logs.findIndex(l=>String(l.sheet)===String(entry.sheet)&&String(l.routine)===String(entry.routine)&&String(l.exercise)===String(ex)&&Number(l.setNo)===Number(setNo));
    if(ix>=0)s.logs[ix]=entry;else s.logs.unshift(entry);s.logs=s.logs.slice(0,2000);saveState(s);row.setAttribute('data-exercise',ex);row.setAttribute('data-set',setNo);markButton(row,true);if(typeof renderHistory==='function')renderHistory();return true;
  }
  function clearSavedSet(row){
    if(!row)return;
    const b=row.querySelector('.setdone');if(b)markButton(row,false);
    const ex=row.getAttribute('data-exercise');const setNo=row.getAttribute('data-set');if(!ex||setNo==null)return;
    const s=getState(),sheet=(typeof currentSheet!=='undefined'&&currentSheet)||s.sheet,ri=(typeof currentRoutine!=='undefined'&&currentRoutine)!==undefined?currentRoutine:s.routine,routineName=routineNameFor(sheet,ri)||String(ri||'');
    const before=s.logs.length;s.logs=(s.logs||[]).filter(function(l){return !(String(l.sheet)===String(sheet)&&String(l.routine)===String(routineName)&&String(l.exercise)===String(ex)&&Number(l.setNo)===Number(setNo))});
    if(s.logs.length!==before)saveState(s);
  }
  function restoreSetValues(){
    const s=migrateRoutineNames(getState()),sheet=(typeof currentSheet!=='undefined'&&currentSheet)||s.sheet,ri=(typeof currentRoutine!=='undefined'&&currentRoutine)!==undefined?currentRoutine:s.routine,routineName=routineNameFor(sheet,ri)||String(ri||'');
    document.querySelectorAll('#routine .setrow').forEach(function(row){markButton(row,false)});
    (s.logs||[]).forEach(function(l){if(l.completed!==true)return;if(String(l.sheet)!==String(sheet)||String(l.routine)!==String(routineName))return;const id=hashLocal(l.exercise),rp=document.getElementById('rep_'+id+'_'+l.setNo),wt=document.getElementById('wt_'+id+'_'+l.setNo),eq=document.getElementById('eq_'+id),row=document.getElementById('set_'+id+'_'+l.setNo);if(rp)rp.value=l.repsCompleted||'';if(wt)wt.value=l.weight||'';if(eq&&l.equipment)eq.value=l.equipment;if(row){row.setAttribute('data-exercise',l.exercise);row.setAttribute('data-set',l.setNo)}markButton(row,true)})
  }
  window.logSet=function(ex,sets,reps,setNo){return saveSet(ex,sets,reps,setNo)};
  function wrapRender(){if(typeof window.renderRoutine!=='function'||window.renderRoutine.__trackingV5)return false;const original=window.renderRoutine;function wrapped(){const result=original.apply(this,arguments);setTimeout(restoreSetValues,0);setTimeout(restoreSetValues,120);return result}wrapped.__trackingV5=true;window.renderRoutine=wrapped;return true}
  let tries=0;const timer=setInterval(function(){if(wrapRender()){clearInterval(timer);restoreSetValues()}else if(++tries>120){clearInterval(timer)}},50);
  document.addEventListener('click',function(e){const b=e.target&&e.target.closest?e.target.closest('.setdone'):null;if(!b)return;const m=(b.getAttribute('onclick')||'').match(/logSet\((.*)\)$/);if(!m)return;try{const args=Function('return ['+m[1]+']')();const ok=saveSet(args[0],args[1],args[2],args[3]);e.preventDefault();e.stopImmediatePropagation();if(!ok)return}catch(err){}},true);
  function changed(e){if(!e.target||!/^(rep_|wt_)/.test(e.target.id||''))return;const row=e.target.closest('.setrow');if(row)clearSavedSet(row)}
  document.addEventListener('input',changed);document.addEventListener('change',changed);
  setTimeout(function(){migrateRoutineNames(getState());if(typeof renderHistory==='function')renderHistory();restoreSetValues()},150);
})();
