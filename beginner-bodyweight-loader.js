(function(){
  'use strict';
  var NS='beginner-bodyweight-loader-v1';
  if(window[NS]) return;
  window[NS]=true;
  fetch('./beginner-bodyweight-workouts.json?v=1',{cache:'no-store'})
    .then(function(r){if(!r.ok)throw new Error('load');return r.json();})
    .then(function(group){
      if(typeof DATA==='undefined'||!Array.isArray(DATA)||!group||!Array.isArray(group.routines))return;
      var existing=DATA.find(function(x){return x.sheet==='Beginner';});
      if(!existing){DATA.push({sheet:'Beginner',routines:group.routines.slice()});}
      else{
        var names={};
        existing.routines.forEach(function(r){names[String(r.name).toLowerCase()]=true;});
        group.routines.forEach(function(r){if(r&&!names[String(r.name).toLowerCase()]){existing.routines.push(r);names[String(r.name).toLowerCase()]=true;}});
      }
      if(typeof renderCats==='function')renderCats();
      if(typeof renderWorkout==='function')renderWorkout();
      if(typeof renderPremade==='function')renderPremade();
      if(typeof renderBuilder==='function')renderBuilder();
    }).catch(function(){});
})();
