(function(){
  'use strict';
  var selectedCategory='';

  function categoryLabel(sheet){
    return sheet==='Shoulders.Back'?'Shoulders & Back':sheet;
  }

  function filterPremade(sheet){
    selectedCategory=sheet||'';
    var wanted=categoryLabel(selectedCategory);
    var list=document.getElementById('premadeList');
    if(!list)return;
    Array.prototype.forEach.call(list.children,function(card){
      var h=card.querySelector('h3');
      var match=!wanted || (h && h.textContent.trim()===wanted);
      card.style.display=match?'block':'none';
    });
  }

  function openCategory(sheet){
    if(!sheet)return;
    selectedCategory=sheet;
    if(typeof showTab==='function')showTab('premade');
    filterPremade(sheet);
    var list=document.getElementById('premadeList');
    var first=list && Array.prototype.find.call(list.children,function(card){return card.style.display!=='none';});
    if(first)first.scrollIntoView({behavior:'smooth',block:'start'});
  }

  window.openWorkoutPage=openCategory;
  window.selectSheet=openCategory;

  function wire(){
    var cats=document.getElementById('cats');
    if(cats && cats.dataset.categoryNavFix!=='1'){
      cats.dataset.categoryNavFix='1';
      cats.addEventListener('click',function(ev){
        var b=ev.target.closest('button');
        if(!b)return;
        ev.preventDefault();
        ev.stopImmediatePropagation();
        var text=b.textContent.trim();
        openCategory(text==='Shoulders & Back'?'Shoulders.Back':text);
      },true);
    }

    var select=document.getElementById('premadePageSelect');
    if(select && select.dataset.categoryNavFix!=='1'){
      select.dataset.categoryNavFix='1';
      select.addEventListener('change',function(){
        var i=parseInt(select.value,10);
        if(!Number.isFinite(i))return;
        var all=typeof allRoutines==='function'?allRoutines():[];
        var r=all[i];
        if(!r)return;
        if(typeof window.__setWorkoutSelection==='function')window.__setWorkoutSelection(r.sheet,r.ri);
        else if(typeof renderWorkout==='function'){
          /* The native onchange installed by renderWorkout handles the actual selection. */
          setTimeout(function(){
            var current=document.getElementById('premadePageSelect');
            if(current && current.value!==String(i)){
              current.value=String(i);
            }
          },0);
        }
      },true);
    }

    if(selectedCategory)filterPremade(selectedCategory);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',wire);else wire();
  new MutationObserver(wire).observe(document.documentElement,{childList:true,subtree:true});
})();
