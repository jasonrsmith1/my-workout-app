(function(){
  'use strict';
  var art='./home-art.jpg?image2=3';
  function addStyle(){
    if(document.getElementById('image2-branding-v3'))return;
    var s=document.createElement('style');s.id='image2-branding-v3';s.textContent=`
.top{position:relative!important;overflow:hidden!important;min-height:88px!important;padding:0!important;background:#087fd4!important;color:#fff!important;border:0!important;box-shadow:0 3px 16px rgba(0,70,150,.22)!important;display:flex!important;align-items:flex-end!important;justify-content:flex-start!important}
.top .image2-title-bg{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;object-fit:cover!important;object-position:center 42%!important;z-index:0!important;display:block!important}
.top:after{content:'';position:absolute!important;inset:0!important;background:linear-gradient(90deg,rgba(0,45,110,.68),rgba(0,80,150,.18),rgba(0,0,0,.04))!important;z-index:1!important;pointer-events:none!important}
.top h1{position:relative!important;z-index:2!important;margin:0!important;padding:18px 20px!important;color:#fff!important;font-size:26px!important;line-height:1.05!important;font-weight:800!important;letter-spacing:-.4px!important;text-shadow:0 2px 7px rgba(0,0,0,.28)!important}
.top p,.top .image2-title-art{display:none!important}
#image2-home{position:fixed!important;inset:0!important;z-index:99999!important;background:#087fd4!important;display:block!important;overflow:hidden!important}
#image2-home .image2-home-bg{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;object-fit:cover!important;object-position:center top!important;display:block!important}
#image2-home:after{content:'';position:absolute!important;inset:0!important;background:linear-gradient(180deg,rgba(0,25,80,.02) 25%,rgba(0,20,60,.08) 52%,rgba(0,20,55,.72) 100%)!important;pointer-events:none!important}
#image2-home .image2-home-card{position:absolute!important;z-index:2!important;left:18px!important;right:18px!important;bottom:calc(28px + env(safe-area-inset-bottom))!important;text-align:center!important;color:#fff!important}
#image2-home h1{margin:0 0 18px!important;font-size:36px!important;line-height:1.05!important;letter-spacing:-1px!important;font-weight:800!important;text-shadow:0 2px 8px rgba(0,0,0,.3)!important}
#image2-home p{display:none!important}
#image2-home button{width:100%!important;min-height:54px!important;border:0!important;border-radius:16px!important;background:#fff!important;color:#0067d9!important;font-size:18px!important;font-weight:800!important;box-shadow:0 5px 18px rgba(0,0,0,.2)!important}
@media(max-width:600px){.top{min-height:82px!important}.top h1{font-size:24px!important;padding:16px 18px!important}#image2-home h1{font-size:32px!important}}
`;
    document.head.appendChild(s);
  }
  function setTheme(){
    var meta=document.querySelector('meta[name="theme-color"]');
    if(!meta){meta=document.createElement('meta');meta.name='theme-color';document.head.appendChild(meta)}
    meta.content='#087fd4';
    var old=document.querySelector('link[rel="apple-touch-icon"]');
    if(old)old.remove();
    var l=document.createElement('link');l.rel='apple-touch-icon';l.href=art;document.head.appendChild(l);
  }
  function titleArt(){
    var top=document.querySelector('.top');
    if(!top||top.querySelector('.image2-title-bg'))return;
    var img=document.createElement('img');img.className='image2-title-bg';img.src=art;img.alt='';top.prepend(img);
  }
  function home(){
    if(new URLSearchParams(location.search).get('home')!=='1')return;
    if(document.getElementById('image2-home'))return;
    var splash=document.createElement('div');splash.id='image2-home';
    splash.innerHTML='<img class="image2-home-bg" src="'+art+'" alt="My Workout App"><div class="image2-home-card"><h1>My Workout App</h1><button type="button">Start Workout</button></div>';
    document.body.appendChild(splash);
    splash.querySelector('button').onclick=function(){splash.remove();history.replaceState(null,'',location.pathname+'?v=35');window.scrollTo(0,0)};
  }
  function run(){addStyle();setTheme();titleArt();home();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
})();
