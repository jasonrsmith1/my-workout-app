(function(){
  'use strict';
  if(window.__cardioDrilldownV2)return;
  window.__cardioDrilldownV2=true;
  var KEY='cardio_history_v1';
  function read(){try{var a=JSON.parse(localStorage.getItem(KEY)||'[]');return Array.isArray(a)?a:[]}catch(e){return[]}}
  function esc(s){return String(s==null?'':s).replace(/[&<>\"']/g,function(m){return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[m]})}
  function cardioData(){return read().filter(function(x){return Number(x.seconds||0)>0||Number(x.minutes||x.durationMinutes||0)>0})}
  function findDistance(row,data){
    var text=(row.textContent||'').toLowerCase(),best=null,score=-1;
    data.forEach(function(x){var s=0,d=new Date(x.date||x.timestamp),rt=String(x.type||x.cardioType||'cardio').toLowerCase();
      if(!isNaN(d)){if(text.indexOf(String(d.getDate()))>=0&&text.indexOf(d.toLocaleString(undefined,{month:'short'}).toLowerCase())>=0)s+=3;if(text.indexOf(String(d.getFullYear()))>=0)s+=1}
      if(text.indexOf(rt)>=0)s+=4;
      if(text.indexOf('walking')>=0&&rt.indexOf('walking')>=0)s+=3;
      if(text.indexOf('running')>=0&&rt.indexOf('running')>=0)s+=3;
      if(text.indexOf('cycling')>=0&&rt.indexOf('cycling')>=0)s+=3;
      if(s>score){score=s;best=x}
    });
    if(!best||score<3)return '—';
    var dist=best.distance;if(dist==null||dist==='')return '—';
    var unit=String(best.unit||'miles').toLowerCase();if(unit==='mi'||unit==='mile')unit='miles';
    return esc(dist)+' '+esc(unit);
  }
  function enhance(){
    var root=document.getElementById('haDrill');if(!root)return;
    var table=root.querySelector('table');if(!table)return;
    var head=table.querySelector('thead tr'),body=table.querySelector('tbody');if(!head||!body)return;
    if(!head.querySelector('.cardio-distance-head')){var th=document.createElement('th');th.className='cardio-distance-head';th.textContent='Miles';head.appendChild(th)}
    var data=cardioData();
    Array.prototype.forEach.call(body.rows,function(row){
      var cells=row.cells;if(!cells.length)return;
      var value=findDistance(row,data),last=cells[cells.length-1];
      if(last&&last.classList.contains('cardio-distance-cell')){if(last.textContent!==value)last.textContent=value;return}
      var td=document.createElement('td');td.className='cardio-distance-cell';td.textContent=value;row.appendChild(td);
    });
  }
  function style(){if(document.getElementById('cardio-drilldown-style-v2'))return;var s=document.createElement('style');s.id='cardio-drilldown-style-v2';s.textContent='#history .ha-drill table{width:100%!important;table-layout:fixed!important}#history .ha-drill th,#history .ha-drill td{overflow-wrap:anywhere!important;white-space:normal!important}#history .ha-drill th:last-child,#history .ha-drill td:last-child{width:18%!important}@media(max-width:650px){#history .ha-drill table{font-size:12px!important}#history .ha-drill th,#history .ha-drill td{padding:7px 5px!important}}';document.head.appendChild(s)}
  function boot(){style();var r=document.getElementById('haDrill');if(r&&!r.__cdObserver){r.__cdObserver=new MutationObserver(function(){clearTimeout(r.__cdTimer);r.__cdTimer=setTimeout(enhance,30)});r.__cdObserver.observe(r,{childList:true,subtree:true})}enhance()}
  boot();setTimeout(boot,300);setTimeout(boot,1000);window.addEventListener('load',boot);
})();
