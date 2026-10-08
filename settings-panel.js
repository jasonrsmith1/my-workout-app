(function(){
  'use strict';
  if(window.__settingsPanelV1)return;
  window.__settingsPanelV1=true;
  function esc(s){return String(s==null?'':s).replace(/[&<>\"']/g,function(m){return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[m]})}
  function home(){
    var panel=document.getElementById('appSettingsPanel');if(panel)panel.remove();
    var h=document.getElementById('homeTab');if(h){h.style.display='block';document.documentElement.classList.add('hr-home-active');document.body.classList.add('hr-home-active')}
    window.scrollTo({top:0,behavior:'smooth'});
  }
  function show(){
    var old=document.getElementById('appSettingsPanel');if(old)old.remove();
    var p=document.createElement('section');p.id='appSettingsPanel';p.innerHTML='<div class="asp-card"><button class="asp-back" type="button">‹ Home</button><div class="asp-icon">⚙</div><h1>Settings</h1><p class="asp-sub">Simple app preferences and information.</p><div class="asp-row"><div><b>Workout data</b><span>Your saved workouts stay on this device.</span></div><strong>On</strong></div><div class="asp-row"><div><b>History &amp; Progress</b><span>Completed strength and cardio sessions are kept separate.</span></div><strong>Ready</strong></div><div class="asp-info"><b>My Workout App</b><span>Train / Track / Improve</span><small>Settings panel v1</small></div></div>';
    document.body.appendChild(p);p.querySelector('.asp-back').addEventListener('click',home);
  }
  function style(){if(document.getElementById('settings-panel-style'))return;var s=document.createElement('style');s.id='settings-panel-style';s.textContent=`
#appSettingsPanel{position:fixed;inset:0;z-index:80;background:#f2f2f7;overflow:auto;padding:calc(18px + env(safe-area-inset-top)) 14px calc(24px + env(safe-area-inset-bottom));font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","Segoe UI",sans-serif}
#appSettingsPanel .asp-card{max-width:680px;margin:0 auto;background:#fff;border-radius:24px;padding:18px;box-shadow:0 12px 40px rgba(0,30,80,.12)}
#appSettingsPanel .asp-back{border:0;background:#eef5ff;color:#087cff;border-radius:12px;padding:10px 14px;font-size:16px;font-weight:700}#appSettingsPanel .asp-icon{margin:28px auto 12px;width:62px;height:62px;border-radius:18px;display:grid;place-items:center;background:#eef1f6;font-size:31px}#appSettingsPanel h1{text-align:center;margin:0;font-size:30px;letter-spacing:-.7px}#appSettingsPanel .asp-sub{text-align:center;color:#6c6c70;margin:7px 0 22px}
#appSettingsPanel .asp-row{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:16px 4px;border-top:1px solid #e5e5ea}#appSettingsPanel .asp-row div{min-width:0}#appSettingsPanel .asp-row b{display:block;font-size:16px}#appSettingsPanel .asp-row span{display:block;color:#6c6c70;font-size:13px;margin-top:4px;line-height:1.35}#appSettingsPanel .asp-row strong{flex:0 0 auto;color:#16843a;font-size:13px}
#appSettingsPanel .asp-info{margin-top:22px;padding:16px;border-radius:16px;background:#f7f8fa;text-align:center}#appSettingsPanel .asp-info b,#appSettingsPanel .asp-info span,#appSettingsPanel .asp-info small{display:block}#appSettingsPanel .asp-info span{margin-top:4px;color:#6c6c70}#appSettingsPanel .asp-info small{margin-top:10px;color:#9a9aa0}
` ;document.head.appendChild(s)}
  function open(){var h=document.getElementById('homeTab');if(h)h.style.display='none';document.documentElement.classList.remove('hr-home-active');document.body.classList.remove('hr-home-active');style();show()}
  window.openAppSettings=open;
  document.addEventListener('click',function(e){var b=e.target&&e.target.closest?e.target.closest('[data-nav="settings"]'):null;if(!b)return;e.preventDefault();e.stopPropagation();open()},true);
})();
