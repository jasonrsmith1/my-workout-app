(function(){
  'use strict';
  if(window.__finishWorkoutResetV1)return;
  window.__finishWorkoutResetV1=true;

  function stateObj(){try{return (typeof state==='object'&&state)?state:null}catch(e){return null}}
  function routineName(sheet,ri){try{var g=DATA.find(function(x){return String(x.sheet)===String(sheet)}),r=g&&g.routines[Number(ri)];return r&&r.name?r.name:''}catch(e){return ''}}
  function hash(s){var h=0;for(var i=0;i<s.length;i++)h=((h<<5)-h)+s.charCodeAt(i)|0;return Math.abs(h)}
  function save(){try{if(typeof window.save==='function')window.save()}catch(e){}}

  function saveFormSets(){
    var s=stateObj();if(!s)return;
    s.logs=Array.isArray(s.logs)?s.logs:[];
    var sheet=(typeof currentSheet!=='undefined'&&currentSheet)||s.sheet;
    var ri=(typeof currentRoutine!=='undefined'&&currentRoutine)!==undefined?currentRoutine:s.routine;
    var routine=routineName(sheet,ri)||String(ri||'');
    document.querySelectorAll('#routine .setrow').forEach(function(row){
      var card=row.closest('.card');
      var exEl=card&&card.querySelector('.workout-summary-exercise strong');
      var rp=row.querySelector('[id^="rep_"]'),wt=row.querySelector('[id^="wt_"]');
      if(!exEl||!rp||!wt)return;
      var reps=String(rp.value||'').trim(),weight=String(wt.value||'').trim();
      if(!reps)return;
      var ex=exEl.textContent.trim();
      var setNo=Number((row.id||'').split('_').pop())||1;
      var eq=card&&card.querySelector('select[id^="eq_"]');
      var ps=card?card.querySelectorAll('.workout-summary-pair strong'):[];
      var sets=ps[0]?ps[0].textContent.trim():'';
      var entry={date:new Date().toLocaleString(),sheet:sheet,routine:routine,exercise:ex,sets:sets,reps:'',setNo:setNo,repsCompleted:reps,weight:weight,equipment:eq?String(eq.value||''):'',completed:true};
      var ix=s.logs.findIndex(function(l){return String(l.sheet)===String(sheet)&&String(l.routine)===String(routine)&&String(l.exercise)===String(ex)&&Number(l.setNo)===setNo});
      if(ix>=0)s.logs[ix]=entry;else s.logs.unshift(entry);
    });
    s.logs=s.logs.slice(0,2000);
    save();
    try{if(typeof window.renderHistory==='function')window.renderHistory()}catch(e){}
  }

  function resetForms(){
    document.querySelectorAll('#routine input[id^="rep_"],#routine input[id^="wt_"]').forEach(function(el){el.value='';el.dispatchEvent(new Event('change',{bubbles:true}));});
    document.querySelectorAll('#routine select[id^="rep_"]').forEach(function(el){el.value='';el.dispatchEvent(new Event('change',{bubbles:true}));});
    document.querySelectorAll('#routine .setrow').forEach(function(row){
      row.classList.remove('completed');
      var b=row.querySelector('.setdone');
      if(b){b.dataset.saved='';b.setAttribute('aria-pressed','false');b.disabled=false;}
    });
    document.querySelectorAll('#routine select[id^="eq_"]').forEach(function(el){el.selectedIndex=0;});
  }

  function isFinishButton(el){
    var b=el&&el.closest?el.closest('button'):null;if(!b)return false;
    var t=(b.textContent||'').trim().toLowerCase();
    return /^(finish|finish workout|complete workout|end workout)$/.test(t)||t.indexOf('finish workout')>=0;
  }

  document.addEventListener('click',function(e){
    if(!isFinishButton(e.target))return;
    saveFormSets();
    setTimeout(resetForms,350);
    setTimeout(resetForms,900);
  },true);
  document.addEventListener('pointerup',function(e){
    if(!isFinishButton(e.target))return;
    saveFormSets();
    setTimeout(resetForms,350);
    setTimeout(resetForms,900);
  },true);
})();
