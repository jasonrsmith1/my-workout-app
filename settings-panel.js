(function(){
  'use strict';
  if(window.__settingsPanelV2)return;
  window.__settingsPanelV2=true;
  var BUILD=window.__APP_BUILD_VERSION||'v37';
  function home(){
    var panel=document.getElementById('appSettingsPanel');if(panel)panel.remove();
    var h=document.getElementById('homeTab');if(h){h.style.display='block';document.documentElement.classList.add('hr-home-active');document.body.classList.add('hr-home-active')}
    window.scrollTo({top:0,behavior:'smooth'});
  }
  function resetSavedDays(){
    if(!window.confirm('Reset Saved Days? This will permanently delete all saved workout history, cardio history, and progress. Your workout routines and exercise setup will stay.'))return;
    try{if(typeof state==='object'&&state){state.logs=[];if(typeof save==='function')save();}}catch(e){}
    try{localStorage.removeItem('cardio_history_v1');}catch(e){}
    try{localStorage.removeItem('workout_timer_v1');}catch(e){}
    try{if(typeof renderHistory==='function')renderHistory();}catch(e){}
    alert('Saved days reset. Your workout routines were kept.');
  }
  function show(){
    var old=document.getElementById('appSettingsPanel');if(old)old.remove();
    var p=document.createElement('section');p.id='appSettingsPanel';var savedWeight='';try{savedWeight=localStorage.getItem('user_body_weight_lb_v1')||'';}catch(e){}p.innerHTML='<div class="asp-card"><button class="asp-back" type="button">‹ Home</button><div class="asp-icon">⚙</div><h1>Settings</h1><p class="asp-sub">Simple app preferences and information.</p><div class="asp-weight"><div class="asp-weight-head"><b>Current Body Weight</b><span>Saved until you change it</span></div><div class="asp-weight-input"><input id="aspBodyWeight" type="number" min="1" max="1500" step="0.1" inputmode="decimal" placeholder="Enter weight" value="'+String(savedWeight).replace(/[^0-9.]/g,'')+'"><span>lb</span><button class="asp-weight-save" type="button">Save</button></div><p class="asp-weight-status" aria-live="polite">'+(savedWeight?'Saved: '+String(savedWeight).replace(/[^0-9.]/g,'')+' lb':'No body weight saved yet.')+'</p><small>This setting does not change workout volume or past workouts.</small></div><div class="asp-row"><div><b>Workout data</b><span>Your saved workouts stay on this device.</span></div><strong>On</strong></div><div class="asp-row"><div><b>History &amp; Progress</b><span>Completed strength and cardio sessions are kept separate.</span></div><strong>Ready</strong></div><div class="asp-danger"><div><b>Reset Saved Days</b><span>Permanently clear all saved workout history, cardio history, and progress. Your routines stay.</span></div><button class="asp-reset" type="button">Clear History</button></div><div class="asp-info"><b>My Workout App</b><span>Train / Track / Improve</span><small>Settings panel v2 • Build '+BUILD+'</small></div></div>';
    document.body.appendChild(p);
    p.querySelector('.asp-back').addEventListener('click',home);
    p.querySelector('.asp-reset').addEventListener('click',resetSavedDays);
    p.querySelector('.asp-weight-save').addEventListener('click',function(){var input=p.querySelector('#aspBodyWeight'),status=p.querySelector('.asp-weight-status'),value=String(input.value||'').trim(),n=Number(value);if(!value||!Number.isFinite(n)||n<=0||n>1500){status.textContent='Enter a valid body weight in pounds.';return;}var normalized=String(n);try{localStorage.setItem('user_body_weight_lb_v1',normalized);status.textContent='Saved: '+normalized+' lb. This stays until you update it.';}catch(e){status.textContent='Could not save on this device. Please check browser storage settings.';}});
  }
  function style(){if(document.getElementById('settings-panel-style'))return;var s=document.createElement('style');s.id='settings-panel-style';s.textContent=`
#appSettingsPanel{position:fixed;inset:0;z-index:80;background:#f2f2f7;overflow:auto;padding:calc(18px + env(safe-area-inset-top)) 14px calc(24px + env(safe-area-inset-bottom));font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","Segoe UI",sans-serif}
#appSettingsPanel .asp-card{max-width:680px;margin:0 auto;background:#fff;border-radius:24px;padding:18px;box-shadow:0 12px 40px rgba(0,30,80,.12)}
#appSettingsPanel .asp-back{border:0;background:#eef5ff;color:#087cff;border-radius:12px;padding:10px 14px;font-size:16px;font-weight:700}
#appSettingsPanel .asp-icon{margin:28px auto 12px;width:62px;height:62px;border-radius:18px;display:grid;place-items:center;background:#eef1f6;font-size:31px}
#appSettingsPanel h1{text-align:center;margin:0;font-size:30px;letter-spacing:-.7px}#appSettingsPanel .asp-sub{text-align:center;color:#6c6c70;margin:7px 0 22px}
#appSettingsPanel .asp-weight{margin:10px 0 18px;padding:17px;background:#f2f7ff;border:1px solid #d8e8ff;border-radius:17px}#appSettingsPanel .asp-weight-head b{display:block;font-size:17px}#appSettingsPanel .asp-weight-head span{display:block;margin-top:3px;color:#6c6c70;font-size:13px}#appSettingsPanel .asp-weight-input{display:flex;align-items:center;gap:9px;margin-top:13px}#appSettingsPanel .asp-weight-input input{width:100%;min-width:0;flex:1;padding:12px;border:1px solid #c7c7cc;border-radius:11px;background:#fff;font:inherit;font-size:16px;min-height:46px}#appSettingsPanel .asp-weight-input>span{color:#6c6c70;font-weight:700}#appSettingsPanel .asp-weight-save{border:0;border-radius:11px;background:#007aff;color:#fff;padding:11px 17px;font-size:15px;font-weight:700;min-height:46px}#appSettingsPanel .asp-weight-status{margin:10px 0 4px;font-size:14px;font-weight:600}#appSettingsPanel .asp-weight small{color:#6c6c70;line-height:1.4;display:block}
#appSettingsPanel .asp-row{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:16px 4px;border-top:1px solid #e5e5ea}#appSettingsPanel .asp-row div{min-width:0}#appSettingsPanel .asp-row b{display:block;font-size:16px}#appSettingsPanel .asp-row span{display:block;color:#6c6c70;font-size:13px;margin-top:4px;line-height:1.35}#appSettingsPanel .asp-row strong{flex:0 0 auto;color:#16843a;font-size:13px}
#appSettingsPanel .asp-danger{margin-top:12px;padding:16px 4px;border-top:1px solid #e5e5ea;display:flex;align-items:center;justify-content:space-between;gap:14px}#appSettingsPanel .asp-danger div{min-width:0}#appSettingsPanel .asp-danger b{display:block;font-size:16px;color:#c62828}#appSettingsPanel .asp-danger span{display:block;color:#6c6c70;font-size:13px;margin-top:4px;line-height:1.35}.asp-reset{flex:0 0 auto;border:0;border-radius:12px;background:#ffe8e8;color:#c62828;padding:11px 14px;font-size:15px;font-weight:700;min-height:44px;touch-action:manipulation}
#appSettingsPanel .asp-info{margin-top:22px;padding:16px;border-radius:16px;background:#f7f8fa;text-align:center}#appSettingsPanel .asp-info b,#appSettingsPanel .asp-info span,#appSettingsPanel .asp-info small{display:block}#appSettingsPanel .asp-info span{margin-top:4px;color:#6c6c70}#appSettingsPanel .asp-info small{margin-top:10px;color:#9a9aa0}
@media(max-width:430px){#appSettingsPanel .asp-danger{align-items:stretch;flex-direction:column}#appSettingsPanel .asp-reset{width:100%}}
` ;document.head.appendChild(s)}
  function open(){var h=document.getElementById('homeTab');if(h)h.style.display='none';document.documentElement.classList.remove('hr-home-active');document.body.classList.remove('hr-home-active');style();show()}
  window.openAppSettings=open;
  document.addEventListener('click',function(e){var b=e.target&&e.target.closest?e.target.closest('[data-nav="settings"]'):null;if(!b)return;e.preventDefault();e.stopPropagation();open()},true);
})();