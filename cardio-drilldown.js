(function(){
  'use strict';
  if(window.__cardioDrilldownV1)return;
  window.__cardioDrilldownV1=true;
  var KEY='cardio_history_v1';
  function read(){try{var a=JSON.parse(localStorage.getItem(KEY)||'[]');return Array.isArray(a)?a:[]}catch(e){return[]}}
  function esc(s){return String(s==null?'':s).replace(/[&<>\"']/g,function(m){return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[m]})}
  function dateKey(v){var d=new Date(v);return isNaN(d)?'':d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()+'-'+d.getHours()+'-'+d.getMinutes()}
  function cardioData(){return read().filter(function(x){return Number(x.seconds||0)>0||Number(x.minutes||x.durationMinutes||0)>0})}
  function findDistance(row,data){
    var text=(row.textContent||'').toLowerCase();
    var best=null,score=-1;
    data.forEach(function(x){
      var s=0,d=new Date(x.date||x.timestamp),rt=String(x.type||x.cardioType||'cardio').toLowerCase();
      if(!isNaN(d)){
        var rowText=text;
        if(rowText.indexOf(String(d.getDate()))>=0&&rowText.indexOf(d.toLocaleString(undefined,{month:'short'}).toLowerCase())>=0) s+=3;
        if(rowText.indexOf(String(d.getFullYear()))>=0)s+=1;
      }
      if(text.indexOf(rt)>=0)s+=4;
      if(text.indexOf('walking')>=0&&rt.indexOf('walking')>=0)s+=3;
      if(text.indexOf('running')>=0&&rt.indexOf('running')>=0)s+=3;
      if(text.indexOf('cycling')>=0&&rt.indexOf('cycling')>=0)s+=3;
      if(s>score){score=s;best=x}
    });
    if(!best||score<3)return '—';
    var dist=best.distance;
    if(dist==null||dist==='')return '—';
    var unit=String(best.unit||'miles').toLowerCase();
    if(unit==='mi'||unit==='mile')unit='miles';
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
      var last=cells[cells.length-1];
      if(last&&last.classList.contains('cardio-distance-cell')){last.innerHTML=findDistance(row,data);return}
      var td=document.createElement('td');td.className='cardio-distance-cell';td.innerHTML=findDistance(row,data);row.appendChild(td);
    });
  }
  function style(){if(document.getElementById('cardio-drilldown-style'))return;var s=document.createElement('style');s.id='cardio-drilldown-style';s.textContent='#history .ha-drill table{width:100%!important;table-layout:fixed!important}#history .ha-drill th,#history .ha-drill td{overflow-wrap:anywhere!important;white-space:normal!important}#history .ha-drill th:last-child,#history .ha-drill td:last-child{width:18%!important}@media(max-width:650px){#history .ha-drill{overflow-x:auto!important}#history .ha-drill table{min-width:560px!important}}';document.head.appendChild(s)}
  style();
  var obs=new MutationObserver(function(){setTimeout(enhance,0)});
  function boot(){var r=document.getElementById('haDrill');if(r)obs.observe(r,{childList:true,subtree:true});enhance()}
  var tries=0,t=setInterval(function(){var r=document.getElementById('haDrill');if(r){clearInterval(t);boot()}else if(++tries>200)clearInterval(t)},50);
  window.addEventListener('load',boot);setTimeout(boot,1000);
})();