(function(){
  'use strict';
  if(document.getElementById('branding-fix-v1'))return;
  var s=document.createElement('style');s.id='branding-fix-v1';s.textContent=`
/* Image 2 branding */
.top{
  background:#0647a8 url('./home-art.jpg') center 35%/cover no-repeat!important;
  color:#fff!important;
  border-bottom:0!important;
  box-shadow:0 4px 18px rgba(0,0,0,.18)!important;
  position:relative!important;
  overflow:hidden!important;
}
.top:before{content:'';position:absolute;inset:0;background:linear-gradient(90deg,rgba(4,52,130,.88),rgba(0,166,210,.58),rgba(46,220,120,.45));pointer-events:none}
.top h1,.top p{position:relative;z-index:1;color:#fff!important;text-shadow:0 1px 3px rgba(0,0,0,.22)!important}
.top h1{font-weight:800!important}
#homeTab{display:block!important}
#homeTab .home-hero{
  min-height:calc(100svh - 150px)!important;
  border-radius:24px!important;
  padding:0!important;
  background:#0647a8 url('./home-art.jpg') center top/cover no-repeat!important;
  display:flex!important;
  align-items:flex-end!important;
  overflow:hidden!important;
}
#homeTab .home-hero:before{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,45,120,.08) 30%,rgba(0,35,95,.18) 55%,rgba(0,22,65,.82) 100%);pointer-events:none}
#homeTab .home-copy{max-width:none!important;width:100%!important;padding:34px 24px 26px!important;z-index:3!important;text-align:center!important}
#homeTab .home-copy>div:first-child{display:none!important}
#homeTab .home-copy h2{font-size:clamp(30px,8vw,46px)!important;margin:0 0 8px!important;letter-spacing:-1.2px!important}
#homeTab .home-copy p{font-size:16px!important;color:#f4f8ff!important;margin:0 auto 20px!important;max-width:620px!important}
#homeTab .home-art{display:none!important}
#homeTab .home-actions{justify-content:center!important}
#homeTab .home-actions button{min-height:54px!important;padding:14px 28px!important;font-size:18px!important}
#homeTab .home-actions .primary{color:#0877dd!important}
@media(max-width:600px),(pointer:coarse){
  .top{padding:14px 16px!important}
  #homeTab .home-hero{min-height:calc(100svh - 120px)!important;border-radius:20px!important;background-position:center top!important}
  #homeTab .home-copy{padding:28px 18px 22px!important}
  #homeTab .home-copy h2{font-size:34px!important}
}
`;
  document.head.appendChild(s);
  function addAppleIcon(){if(!document.querySelector('link[rel="apple-touch-icon"]')){var l=document.createElement('link');l.rel='apple-touch-icon';l.href='./home-art.jpg?v=image2';document.head.appendChild(l)}}
  addAppleIcon();
})();
