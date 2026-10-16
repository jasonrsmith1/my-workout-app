(function(){
  'use strict';
  var NS='legs-glutes-loader-v1';
  if(window[NS])return;
  window[NS]=true;
  function install(payload){
    if(!payload||typeof DATA==='undefined'||!Array.isArray(DATA))return false;
    if(typeof EXERCISES==='undefined'||!Array.isArray(EXERCISES))return false;
    var group=DATA.find(function(x){return x.sheet==='Legs'||x.sheet==='Legs.Glutes';});
    if(!group){group={sheet:'Legs',routines:[]};DATA.push(group);}
    else{group.sheet='Legs';if(!Array.isArray(group.routines))group.routines=[];}
    (payload.routines||[]).forEach(function(r){
      if(!r||!r.name)return;
      var i=group.routines.findIndex(function(x){return String(x.name).toLowerCase()===String(r.name).toLowerCase();});
      if(i>=0)group.routines[i]=r;else group.routines.push(r);
    });
    (payload.exerciseLibrary||[]).forEach(function(e){
      if(!e||!e.exercise)return;
      var existing=EXERCISES.find(function(x){return String(x.exercise).toLowerCase()===String(e.exercise).toLowerCase();});
      if(existing){
        if(!Array.isArray(existing.muscles))existing.muscles=[];
        (e.muscles||[]).forEach(function(m){if(existing.muscles.indexOf(m)<0)existing.muscles.push(m);});
      }else EXERCISES.push({exercise:e.exercise,muscles:Array.isArray(e.muscles)?e.muscles.slice():['Other'],sources:Array.isArray(e.sources)?e.sources.slice():['Workbook — Legs.Glutes']});
    });
    if(typeof renderCats==='function')renderCats();
    if(typeof renderWorkout==='function')renderWorkout();
    if(typeof renderPremade==='function')renderPremade();
    if(typeof renderExerciseLibrary==='function')renderExerciseLibrary();
    if(typeof renderBuilder==='function')renderBuilder();
    return true;
  }
  function retry(payload,tries){if(install(payload))return;if(tries>0)setTimeout(function(){retry(payload,tries-1);},100);}
  fetch('./legs-glutes-workouts.json?v=1',{cache:'no-store'}).then(function(r){if(!r.ok)throw new Error('load');return r.json();}).then(function(payload){retry(payload,50);}).catch(function(){});
})();
