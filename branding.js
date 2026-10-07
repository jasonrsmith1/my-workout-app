(function(){
  'use strict';
  var art='./home-art.jpg?image2=6';
  function css(){
    var s=document.createElement('style');s.id='image2-branding-v6';s.textContent=`
/* Image 2 branding: remove legacy artwork and make the title bar image-first. */
.top{position:relative!important;overflow:hidden!important;min-height:82px!important;padding:0!important;background:#087fd4!important;color:#fff!important;border:0!important;box-shadow:0 3px 16px rgba(0,70,150,.22)!important;display:flex!important;align-items:flex-end!important}
.top>*{position:relative!important;z-index:2!important}
.top:before{content:'';position:absolute!important;inset:0!important;z-index:0!important;background-image:url('./home-art.jpg?image2=6')!important;background-size:cover!important;background-position:center 42%!important;background-repeat:no-repeat!important}
.top:after{content:'';position:absolute!important;inset:0!important;z-index:1!important;background:linear-gradient(90deg,rgba(0,28,80,.66),rgba(0,60,130,.18),rgba(0,0,0,.03))!important;pointer-events:none!important}
.top p,.top svg,.top canvas,.top .image2-title-art,.top .image2-title-bg,.top img{display:none!important}
.top h1{margin:0!important;padding:18px 20px!important;color:#fff!important;font-size:25px!important;line-height:1.05!important;font-weight:800!important;letter-spacing:-.45px!important;text-shadow:0 2px 8px rgba(0,0,0,.3)!important}
#image2-home{position:fixed!important;inset:0!important;z-index:999999!important;background:#087fd4!important;display:block!important;overflow:hidden!important}
#image2-home:before{content:'';position:absolute!important;inset:0!important;background-image:url('./home-art.jpg?image2=6')!important;background-size:cover!important;background-position:center center!important;background-repeat:no-repeat!important}
#image2-home:after{content:'';position:absolute!important;inset:0!important;background:linear-gradient(180deg,rgba(0,25,80,.02) 15%,rgba(0,20,60,.08) 50%,rgba(0,20,55,.72) 100%)!important;pointer-events:none!important}
#image2-home>*{position:relative!important;z-index:2!important}
#image2-home>img{display:none!important}
#image2-home .image2-home-card{position:absolute!important;z-index:3!important;left:18px!important;right:18px!important;bottom:calc(28px + env(safe-area-inset-bottom))!important;text-align:center!important;color:#fff!important}
#image2-home h1{margin:0 0 18px!important;font-size:34px!important;line-height:1.05!important;letter-spacing:-1px!important;font-weight:800!important;text-shadow:0 2px 9px rgba(0,0,0,.35)!important}
#image2-home p{display:none!important}
#image2-home button{width:100%!important;min-height:54px!important;border:0!important;border-radius:16px!important;background:#fff!important;color:#0067d9!important;font-size:18px!important;font-weight:800!important;box-shadow:0 5px 18px rgba(0,0,0,.2)!important}
@media(max-width:600px){.top{min-height:78px!important}.top h1{font-size:23px!important;padding:16px 18px!important}#image2-home h1{font-size:31px!important}}
`;
    document.head.appendChild(s);
  }
  function theme(){
    var m=document.querySelector('meta[name="theme-color"]');
    if(!m){m=document.createElement('meta');m.name='theme-color';document.head.appendChild(m)}
    m.content='#087fd4';
    var a=document.querySelector('link[rel="apple-touch-icon"]');
    if(a)a.href=art;
  }
  function removeLegacy(){
    document.querySelectorAll('#image2-home,.image2-home-bg,.image2-title-bg,.image2-title-art,.top img,.top svg,.top canvas').forEach(function(x){
      if(x.id!=='image2-home') x.remove();
    });
    var old=document.getElementById('image2-home');if(old)old.remove();
  }
  function title(){
    var top=document.querySelector('.top');if(!top)return;
    var h=top.querySelector('h1');
    if(!h){h=document.createElement('h1');top.appendChild(h)}
    h.textContent='My Workout App';
    var p=top.querySelector('p');if(p)p.remove();
  }
  function home(){
    if(new URLSearchParams(location.search).get('home')!=='1')return;
    var splash=document.createElement('div');splash.id='image2-home';
    splash.innerHTML='<div class="image2-home-card"><h1>My Workout App</h1><button type="button">Start Workout</button></div>';
    document.body.appendChild(splash);
    splash.querySelector('button').onclick=function(){splash.remove();history.replaceState(null,'',location.pathname+'?v=35');window.scrollTo(0,0)};
  }
  function run(){css();theme();removeLegacy();title();home()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
})();
