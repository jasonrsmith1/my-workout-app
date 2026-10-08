(function(){
  'use strict';
  if(window.__workoutTrackingFixV1)return;
  window.__workoutTrackingFixV1=true;

  function getState(){
    try{return JSON.parse(localStorage.getItem('workout_v3')||'{"sheet":null,"routine":0,"logs":[],"custom":[]}')}catch(e){return {sheet:null,routine:0,logs:[],custom:[]};}
  }
  function saveState(s){localStorage.setItem('workout_v3',JSON.stringify(s));}
  function hashLocal(s){let h=0;for(let i=0;i<s.length;i++)h=((h<<5)-h)+s.charCodeAt(i)|0;return Math.abs(h)}
  function escLocal(s){return String(s==null?'':s).replace(/[&<>\"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[m]))}

  window.logSet=function(ex,sets,reps,setNo){
    const id=hashLocal(ex);
    const rp=document.getElementById('rep_'+id+'_'+setNo);
    const wt=document.getElementById('wt_'+id+'_'+setNo);
    const eq=document.getElementById('eq_'+id);
    const row=document.getElementById('set_'+id+'_'+setNo);
    if(!rp||!wt||!row)return;
    const repsCompleted=String(rp.value||'').trim();
    const weight=String(wt.value||'').trim();
    if(!repsCompleted){rp.focus();return;}

    const s=getState();
    s.sheet=(typeof currentSheet!=='undefined'&&currentSheet)||s.sheet;
    s.routine=(typeof currentRoutine!=='undefined'&&currentRoutine)||s.routine;
    s.logs=Array.isArray(s.logs)?s.logs:[];
    const routineName=(()=>{try{const g=DATA.find(x=>x.sheet===s.sheet);return g&&g.routines[Number(s.routine)]?g.routines[Number(s.routine)].name:''}catch(e){return''}})();
    const equipment=eq?String(eq.value||''):'';
    const existingIndex=s.logs.findIndex(l=>String(l.sheet)===String(s.sheet)&&String(l.routine)===String(routineName)&&String(l.exercise)===String(ex)&&Number(l.setNo)===Number(setNo));
    const entry={date:new Date().toLocaleString(),sheet:s.sheet,routine:routineName,exercise:ex,sets:sets,reps:reps,setNo:setNo,repsCompleted:repsCompleted,weight:weight,equipment:equipment};
    if(existingIndex>=0)s.logs[existingIndex]=entry;else s.logs.unshift(entry);
    s.logs=s.logs.slice(0,2000);
    saveState(s);

    row.classList.add('completed');
    const b=row.querySelector('.setdone');
    if(b){b.disabled=false;b.textContent='Saved';b.setAttribute('aria-label','Saved');b.dataset.saved='1';}
    if(typeof renderHistory==='function')renderHistory();
  };

  function restoreSetValues(){
    let s=getState();
    const sheet=(typeof currentSheet!=='undefined'&&currentSheet)||s.sheet;
    let routineName='';
    try{const g=DATA.find(x=>x.sheet===sheet);routineName=g&&g.routines[Number((typeof currentRoutine!=='undefined'&&currentRoutine)||s.routine)]?g.routines[Number((typeof currentRoutine!=='undefined'&&currentRoutine)||s.routine)].name:''}catch(e){}
    (s.logs||[]).forEach(l=>{
      if(String(l.sheet)!==String(sheet)||String(l.routine)!==String(routineName))return;
      const id=hashLocal(l.exercise),rp=document.getElementById('rep_'+id+'_'+l.setNo),wt=document.getElementById('wt_'+id+'_'+l.setNo),eq=document.getElementById('eq_'+id),row=document.getElementById('set_'+id+'_'+l.setNo);
      if(rp)rp.value=l.repsCompleted||'';
      if(wt)wt.value=l.weight||'';
      if(eq&&l.equipment)eq.value=l.equipment;
      if(row){row.classList.add('completed');const b=row.querySelector('.setdone');if(b){b.textContent='Saved';b.disabled=false;b.dataset.saved='1';}}
    });
  }

  const oldRenderRoutine=window.renderRoutine;
  if(typeof oldRenderRoutine==='function'){
    window.renderRoutine=function(){oldRenderRoutine();setTimeout(restoreSetValues,0);};
  }
  document.addEventListener('input',function(e){
    if(e.target&&/^rep_|^wt_/.test(e.target.id||'')){const row=e.target.closest('.setrow');if(row){const b=row.querySelector('.setdone');if(b&&b.dataset.saved==='1'){b.dataset.saved='';b.textContent='✓';b.disabled=false;}}}
  });
  setTimeout(restoreSetValues,100);
})();
