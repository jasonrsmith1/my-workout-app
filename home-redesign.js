(function(){
  'use strict';
  if(window.__homeRedesignV3)return;
  window.__homeRedesignV3=true;

  function icon(type){
    if(type==='workout')return '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M10 25h8v14h-8zM18 19h7v26h-7zM39 19h7v26h-7zM46 25h8v14h-8zM25 29h14v6H25z" fill="currentColor"/></svg>';
    if(type==='premade')return '<svg viewBox="0 0 64 64" aria-hidden="true"><rect x="15" y="10" width="34" height="45" rx="6" fill="none" stroke="currentColor" stroke-width="5"/><path d="M24 8h16v7H24zM24 24h18M24 33h18M24 42h13" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><circle cx="19" cy="24" r="2" fill="currentColor"/><circle cx="19" cy="33" r="2" fill="currentColor"/><circle cx="19" cy="42" r="2" fill="currentColor"/></svg>';
    if(type==='progress')return '<svg viewBox="0 0 64 64" aria-hidden="true"><rect x="10" y="34" width="9" height="20" rx="2" fill="currentColor"/><rect x="27" y="24" width="9" height="30" rx="2" fill="currentColor"/><rect x="44" y="12" width="9" height="42" rx="2" fill="currentColor"/></svg>';
    return '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M26 8h12l2 7a18 18 0 0 1 5 3l7-2 6 10-5 5a18 18 0 0 1 0 6l5 5-6 10-7-2a18 18 0 0 1-5 3l-2 7H26l-2-7a18 18 0 0 1-5-3l-7 2-6-10 5-5a18 18 0 0 1 0-6l-5-5 6-10 7 2a18 18 0 0 1 5-3z" fill="currentColor"/><circle cx="32" cy="34" r="9" fill="#0b1730"/></svg>';
  }
  function navIcon(type){return type==='home'?'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 10.5 12 3l9 7.5v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" fill="currentColor"/></svg>':type==='workouts'?icon('workout'):type==='progress'?icon('progress'):icon('settings')}

  function setHomeActive(on){
    document.documentElement.classList.toggle('hr-home-active',!!on);
    document.body.classList.toggle('hr-home-active',!!on);
  }
  function home(){
    var h=document.getElementById('homeTab');
    if(!h)return;
    h.style.display='block';
    setHomeActive(true);
    window.scrollTo({top:0,behavior:'smooth'});
    setTimeout(function(){sync()},0);
  }
  function navigate(tab){
    var h=document.getElementById('homeTab');
    if(tab==='home'){home();return;}
    if(h)h.style.display='none';
    setHomeActive(false);
    try{if(typeof window.showTab==='function')window.showTab(tab)}catch(e){}
    setTimeout(function(){sync()},0);
    setTimeout(function(){sync()},100);
  }
  function styles(){
    if(document.getElementById('home-redesign-style-v3'))return;
    var s=document.createElement('style');s.id='home-redesign-style-v3';s.textContent=`
html.hr-home-active,body.hr-home-active{background:#f2f2f7!important}
body.hr-home-active .top,body.hr-home-active .tabs,body.hr-home-active #workoutTimer{display:none!important}
body.hr-home-active main> :not(#homeTab){display:none!important}
body.hr-home-active #homeTab{display:block!important}
#homeTab.home-redesign{display:block!important;width:100%!important;margin:0!important;padding:0!important}
#homeTab.home-redesign .hr-shell{margin:0 auto;max-width:1180px;padding:0 12px 96px}
#homeTab.home-redesign .hr-hero{position:relative;overflow:hidden;min-height:500px;border-radius:24px;background:#06235f url('./home-art.jpg?homeRedesign=3') center center/cover no-repeat;box-shadow:0 14px 40px rgba(0,36,100,.25)}
#homeTab.home-redesign .hr-hero:after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,18,65,.72),rgba(0,70,130,.20) 52%,rgba(0,25,60,.08)),linear-gradient(180deg,rgba(0,20,65,.08),rgba(0,20,55,.38));pointer-events:none}
#homeTab.home-redesign .hr-brand{position:relative;z-index:2;display:flex;align-items:center;gap:12px;padding:22px 24px 0;color:#fff}
#homeTab.home-redesign .hr-logo{width:58px;height:58px;flex:0 0 58px;border:3px solid #20e5e6;border-radius:50%;display:grid;place-items:center;color:#20e5e6;box-shadow:0 0 18px rgba(32,229,230,.45)}
#homeTab.home-redesign .hr-logo svg{width:42px;height:42px}
#homeTab.home-redesign .hr-brand-title{font-size:28px;line-height:1;font-weight:900;letter-spacing:-.8px}.hr-brand-title span{background:linear-gradient(90deg,#19bfff,#23d7df,#55f06c);-webkit-background-clip:text;background-clip:text;color:transparent}.hr-tag{margin-top:7px;font-size:12px;letter-spacing:.25em;font-weight:800;color:#eef8ff}
#homeTab.home-redesign .hr-copy{position:relative;z-index:2;padding:92px 28px 38px;max-width:66%;color:#fff}.hr-copy h2{margin:0;font-size:50px;line-height:.94;font-weight:900;font-style:italic;letter-spacing:-1.7px;text-transform:uppercase}.hr-copy h2 span{display:block;color:#56f064}.hr-copy p{margin:18px 0 0;font-size:17px;font-weight:750;letter-spacing:.14em;line-height:1.55;text-transform:uppercase}
#homeTab.home-redesign .hr-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin-top:18px}
#homeTab.home-redesign .hr-card{min-height:185px;border-radius:20px;padding:22px 20px;background:linear-gradient(145deg,#092b6e,#061b46);border:2px solid #12bfff;color:#fff;box-shadow:0 10px 25px rgba(0,36,90,.12);position:relative;cursor:pointer}.hr-card:nth-child(2){border-color:#32e85d;background:linear-gradient(145deg,#063c35,#062b2b)}.hr-card:nth-child(3){border-color:#18dbe8;background:linear-gradient(145deg,#073b5a,#062a45)}.hr-card:nth-child(4){border-color:#8b48ff;background:linear-gradient(145deg,#24205d,#15163d)}
#homeTab.home-redesign .hr-card-icon{width:48px;height:48px;margin-bottom:18px}.hr-card-icon svg{width:100%;height:100%}.hr-card h3{margin:0 34px 8px 0;font-size:20px;line-height:1.08;font-weight:850;letter-spacing:-.4px}.hr-card p{margin:0;max-width:90%;font-size:13px;line-height:1.35;color:#d9e8fa}.hr-card-arrow{position:absolute;right:16px;top:50%;transform:translateY(-50%);font-size:34px;line-height:1;color:#19c9ff}.hr-card:nth-child(2) .hr-card-arrow{color:#54ef70}.hr-card:nth-child(4) .hr-card-arrow{color:#9c6aff}
#homeTab.home-redesign .hr-bottomnav{position:fixed;left:0;right:0;bottom:0;z-index:50;height:78px;padding:7px max(12px,env(safe-area-inset-left)) calc(7px + env(safe-area-inset-bottom));display:grid;grid-template-columns:repeat(4,1fr);background:rgba(3,18,43,.96);border-top:1px solid rgba(130,190,255,.18);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px)}
#homeTab.home-redesign .hr-navbtn{border:0;background:transparent;color:#91a9d6;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;font-size:12px;font-weight:700;cursor:pointer}.hr-navbtn svg{width:29px;height:29px}.hr-navbtn.active{color:#39f15d}.hr-navbtn.active:after{content:'';width:74%;height:4px;border-radius:99px;background:#39f15d;margin-top:3px;box-shadow:0 0 10px rgba(57,241,93,.6)}
@media(max-width:650px){#homeTab.home-redesign .hr-shell{padding:0 8px 90px}.hr-hero{min-height:470px!important;border-radius:20px!important}.hr-brand{padding:18px 16px 0!important}.hr-logo{width:48px!important;height:48px!important;flex-basis:48px!important}.hr-brand-title{font-size:23px!important}.hr-tag{font-size:10px!important}.hr-copy{padding:72px 18px 28px!important;max-width:78%!important}.hr-copy h2{font-size:35px!important}.hr-copy p{font-size:11px!important;letter-spacing:.12em!important}.hr-grid{gap:10px!important;margin-top:12px!important}.hr-card{min-height:172px!important;padding:18px 15px!important;border-radius:17px!important}.hr-card-icon{width:42px!important;height:42px!important;margin-bottom:15px!important}.hr-card h3{font-size:17px!important}.hr-card p{font-size:12px!important}.hr-card-arrow{right:11px!important;font-size:29px!important}}
@media(max-width:420px){.hr-hero{min-height:450px!important}.hr-copy{max-width:80%!important;padding-top:58px!important}.hr-copy h2{font-size:31px!important}.hr-grid{grid-template-columns:1fr 1fr!important}.hr-card{min-height:164px!important}.hr-card h3{font-size:15px!important}.hr-card p{font-size:11px!important}.hr-card-icon{width:38px!important;height:38px!important;margin-bottom:11px!important}}
`;
    document.head.appendChild(s);
  }
  function markup(){return '<div class="hr-shell"><section class="hr-hero"><div class="hr-brand"><div class="hr-logo"><svg viewBox="0 0 64 64"><path d="M9 28h9v8H9zM18 20h7v24h-7zM39 20h7v24h-7zM46 28h9v8h-9zM25 29h14v6H25z" fill="currentColor"/><path d="M27 32h10" stroke="#55f06c" stroke-width="2"/></svg></div><div><div class="hr-brand-title">MY <span>WORKOUT APP</span></div><div class="hr-tag">TRAIN &nbsp; / &nbsp; TRACK &nbsp; / &nbsp; IMPROVE</div></div></div><div class="hr-copy"><h2>STRONGER<br>HEALTHIER <span>YOU</span></h2><p>REAL WORKOUTS.<br>REAL PROGRESS.</p></div></section><div class="hr-grid"><button class="hr-card" type="button" data-nav="workout"><div class="hr-card-icon">'+icon('workout')+'</div><h3>WORKOUT PAGES</h3><p>Browse by muscle group and find your next workout.</p><span class="hr-card-arrow">›</span></button><button class="hr-card" type="button" data-nav="premade"><div class="hr-card-icon">'+icon('premade')+'</div><h3>PREMADE WORKOUTS</h3><p>Get started with ready-to-go routines.</p><span class="hr-card-arrow">›</span></button><button class="hr-card" type="button" data-nav="history"><div class="hr-card-icon">'+icon('progress')+'</div><h3>HISTORY &amp; PROGRESS</h3><p>Track your workouts and see your progress.</p><span class="hr-card-arrow">›</span></button><button class="hr-card" type="button" data-nav="settings"><div class="hr-card-icon">'+icon('settings')+'</div><h3>SETTINGS</h3><p>Customize your experience and app preferences.</p><span class="hr-card-arrow">›</span></button></div><nav class="hr-bottomnav" aria-label="Main navigation"><button class="hr-navbtn active" type="button" data-nav="home">'+navIcon('home')+'<span>Home</span></button><button class="hr-navbtn" type="button" data-nav="workout">'+navIcon('workouts')+'<span>Workouts</span></button><button class="hr-navbtn" type="button" data-nav="history">'+navIcon('progress')+'<span>Progress</span></button><button class="hr-navbtn" type="button" data-nav="settings">'+navIcon('settings')+'<span>Settings</span></button></nav></div>'}
  function sync(){styles();var h=document.getElementById('homeTab');if(!h)return;var active=h.style.display!=='none';setHomeActive(active)}
  function bind(root){root.querySelectorAll('[data-nav]').forEach(function(b){b.onclick=function(e){e.preventDefault();e.stopPropagation();navigate(b.getAttribute('data-nav'));return false}})}
  function apply(){styles();var h=document.getElementById('homeTab');if(!h){if(typeof ensureHome==='function')try{ensureHome()}catch(e){};h=document.getElementById('homeTab')}if(!h)return false;if(h.dataset.hrApplied!=='3'){h.className='home-redesign';h.innerHTML=markup();h.dataset.hrApplied='3';bind(h)}h.style.display='block';setHomeActive(true);return true}
  function boot(){apply();setTimeout(apply,100);setTimeout(apply,400);setTimeout(apply,1000)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
