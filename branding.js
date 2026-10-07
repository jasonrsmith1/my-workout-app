(function(){
  'use strict';
  var art='./home-art.jpg?image2=2';
  function addStyle(){
    if(document.getElementById('image2-branding-v2'))return;
    var s=document.createElement('style');s.id='image2-branding-v2';s.textContent=`
.top{background:#0647a8 url('./home-art.jpg?image2=2') center 38%/cover no-repeat!important;color:#fff!important;border:0!important;box-shadow:0 3px 16px rgba(0,70,150,.24)!important;display:flex!important;align-items:center!important;justify-content:space-between!important;gap:12px!important;overflow:hidden!important;position:relative!important}
.top:before{content:'';position:absolute;inset:0;background:linear-gradient(90deg,rgba(4,71,168,.88),rgba(8,185,209,.56),rgba(92,240,107,.38));pointer-events:none!important}
.top h1,.top p,.image2-title-art{position:relative!important;z-index:1!important}.top h1{color:#fff!important;text-shadow:0 1px 3px rgba(0,0,0,.22)!important}.top p{color:rgba(255,255,255,.9)!important}
.image2-title-art{width:48px!important;height:48px!important;flex:0 0 48px!important;border-radius:12px!important;object-fit:cover!important;object-position:center!important;box-shadow:0 2px 8px rgba(0,0,0,.2)!important;border:1px solid rgba(255,255,255,.58)!important}
#image2-home{position:fixed;inset:0;z-index:99999;background:#063f96 url('./home-art.jpg?image2=2') center top/cover no-repeat;display:flex;align-items:flex-end;justify-content:center;padding:28px 18px calc(28px + env(safe-area-inset-bottom));}
#image2-home:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,30,90,.02) 18%,rgba(0,20,70,.12) 48%,rgba(0,20,55,.82) 100%)}
#image2-home .image2-home-card{position:relative;z-index:1;width:min(560px,100%);text-align:center;color:#fff}
#image2-home h1{margin:0 0 8px;font-size:36px;line-height:1.05;letter-spacing:-1px;font-weight:800;text-shadow:0 2px 8px rgba(0,0,0,.3)}
#image2-home p{margin:0 0 20px;font-size:16px;color:rgba(255,255,255,.94)}
#image2-home button{width:100%;min-height:54px;border:0;border-radius:16px;background:#fff;color:#0067d9;font-size:18px;font-weight:800;box-shadow:0 5px 18px rgba(0,0,0,.2)}
@media(max-width:600px){#image2-home h1{font-size:32px}.image2-title-art{width:44px!important;height:44px!important;flex-basis:44px!important}}
`;
    document.head.appendChild(s);
  }
  function setTheme(){
    var meta=document.querySelector('meta[name="theme-color"]');
    if(!meta){meta=document.createElement('meta');meta.name='theme-color';document.head.appendChild(meta)}
    meta.content='#08b9d1';
    var old=document.querySelector('link[rel="apple-touch-icon"]');
    if(old)old.remove();
    var l=document.createElement('link');l.rel='apple-touch-icon';l.href=art;document.head.appendChild(l);
  }
  function titleArt(){
    var top=document.querySelector('.top');
    if(!top||top.querySelector('.image2-title-art'))return;
    var img=document.createElement('img');img.className='image2-title-art';img.src=art;img.alt='My Workout App';top.appendChild(img);
  }
  function home(){
    if(new URLSearchParams(location.search).get('home')!=='1')return;
    if(document.getElementById('image2-home'))return;
    var splash=document.createElement('div');splash.id='image2-home';splash.innerHTML='<div class="image2-home-card"><h1>My Workout App</h1><p>Strength, cardio, progress — all in one place.</p><button type="button">Start Workout</button></div>';
    document.body.appendChild(splash);
    splash.querySelector('button').onclick=function(){splash.remove();history.replaceState(null,'',location.pathname+'?v=35');window.scrollTo(0,0)};
  }
  function run(){addStyle();setTheme();titleArt();home();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
})();
