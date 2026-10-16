(function(){
  'use strict';
  var NS='advanced-workout-loader-v1';
  if(window[NS])return;
  window[NS]=true;
  var files=[1,2,3,4,5,6,7].map(function(n){return './advanced-workout-day-'+n+'.json?v=1';});
  function install(payloads){
    if(typeof DATA==='undefined'||!Array.isArray(DATA))return false;
    var routines=[];
    payloads.forEach(function(p){
      if(!p)return;
      if(Array.isArray(p.routines))routines=routines.concat(p.routines);
      if(Array.isArray(p.exerciseLibrary)&&typeof EXERCISES!=='undefined'&&Array.isArray(EXERCISES)){
        p.exerciseLibrary.forEach(function(e){
          if(!e||!e.exercise)return;
          var existing=EXERCISES.find(function(x){return String(x.exercise).toLowerCase()===String(e.exercise).toLowerCase();});
          if(existing){
            (e.muscles||[]).forEach(function(m){if(existing.muscles.indexOf(m)<0)existing.muscles.push(m);});
            return;
          }
          EXERCISES.push({exercise:e.exercise,muscles:Array.isArray(e.muscles)?e.muscles.slice():['Other'],sources:Array.isArray(e.sources)?e.sources.slice():['Workbook — Advanced']});
        });
      }
    });
    if(routines.length){
      var group=DATA.find(function(x){return x.sheet==='Advanced';});
      if(group)group.routines=routines;
      else DATA.push({sheet:'Advanced',routines:routines});
    }
    if(typeof renderCats==='function')renderCats();
    if(typeof renderWorkout==='function')renderWorkout();
    if(typeof renderPremade==='function')renderPremade();
    if(typeof renderExerciseLibrary==='function')renderExerciseLibrary();
    if(typeof renderBuilder==='function')renderBuilder();
    return true;
  }
  Promise.all(files.map(function(src){return fetch(src,{cache:'no-store'}).then(function(r){if(!r.ok)throw new Error('load');return r.json();}).catch(function(){return null;});})).then(install).catch(function(){});
})();
