(function(){
  'use strict';
  var NS='beginner-intermediate-workouts-loader-v1';
  if(window[NS]) return;
  window[NS]=true;
  function install(additions){
    if(typeof DATA==='undefined'||!Array.isArray(DATA)) return false;
    additions.forEach(function(group){
      var existing=DATA.find(function(x){return x.sheet===group.sheet;});
      if(existing) existing.routines=group.routines;
      else DATA.push(group);
    });
    if(typeof renderCats==='function') renderCats();
    if(typeof renderWorkout==='function') renderWorkout();
    if(typeof renderBuilder==='function') renderBuilder();
    return true;
  }
  fetch('./beginner-intermediate-workouts.json?v=1',{cache:'no-store'})
    .then(function(r){return r.json();})
    .then(function(additions){install(additions);})
    .catch(function(){});
})();
