(function(){
  'use strict';
  var NS='beginner-bodyweight-loader-v2';
  if(window[NS]) return;
  window[NS]=true;
  fetch('./beginner-bodyweight-workouts.json?v=2',{cache:'no-store'})
    .then(function(r){if(!r.ok)throw new Error('load');return r.json();})
    .then(function(group){
      if(typeof DATA==='undefined'||!Array.isArray(DATA)||!group||!Array.isArray(group.routines))return;
      var sheet='Beginner Body Weight Only';
      var existing=DATA.find(function(x){return x.sheet===sheet;});
      if(existing) existing.routines=group.routines.slice();
      else DATA.push({sheet:sheet,routines:group.routines.slice()});
      if(typeof renderCats==='function')renderCats();
      if(typeof renderWorkout==='function')renderWorkout();
      if(typeof renderPremade==='function')renderPremade();
      if(typeof renderBuilder==='function')renderBuilder();
    }).catch(function(){});
})();
