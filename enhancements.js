(() => {
  const $ = (s) => document.querySelector(s);
  const D = window.EMERGENCY_DATA || {};
  const FAVORITES_KEY = 'emergency_assistant_v03_favorites';
  const RECENTS_KEY = 'emergency_assistant_v03_recents';
  let deferredPrompt = null;

  const read = (key, fallback=[]) => {
    try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); }
    catch { return fallback; }
  };
  const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));
  const esc = (s='') => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  function identify(el){
    if(el?.dataset.topic) return {name:el.dataset.topic,type:'急症'};
    if(el?.dataset.critical) return {name:el.dataset.critical,type:'红旗'};
    if(el?.dataset.drug) return {name:el.dataset.drug,type:'用药'};
    if(el?.dataset.flow) return {name:el.dataset.flow,type:'流程'};
    return null;
  }

  function saveRecent(item){
    if(!item) return;
    let items = read(RECENTS_KEY);
    items = [item, ...items.filter(x => !(x.name===item.name && x.type===item.type))].slice(0,8);
    write(RECENTS_KEY, items);
    renderPersonal();
  }

  function isFavorite(item){
    return read(FAVORITES_KEY).some(x => x.name===item.name && x.type===item.type);
  }

  function toggleFavorite(item){
    let items = read(FAVORITES_KEY);
    const exists = items.some(x => x.name===item.name && x.type===item.type);
    items = exists ? items.filter(x => !(x.name===item.name && x.type===item.type)) : [item, ...items].slice(0,20);
    write(FAVORITES_KEY, items);
    decorateFavorites();
    renderPersonal();
  }

  function openSaved(item){
    const selectors = [
      `[data-topic="${CSS.escape(item.name)}"]`,
      `[data-critical="${CSS.escape(item.name)}"]`,
      `[data-drug="${CSS.escape(item.name)}"]`,
      `[data-flow="${CSS.escape(item.name)}"]`
    ];
    for(const selector of selectors){
      const el = document.querySelector(selector);
      if(el){ el.click(); return; }
    }
    const input = $('#globalSearch');
    if(input){ input.value=item.name; $('#searchBtn')?.click(); }
  }

  function decorateFavorites(){
    document.querySelectorAll('[data-topic],[data-critical]').forEach(card => {
      if(card.querySelector('.favorite-btn')) return;
      const item = identify(card);
      if(!item) return;
      const btn = document.createElement('button');
      btn.className = 'favorite-btn' + (isFavorite(item) ? ' active' : '');
      btn.type = 'button';
      btn.title = isFavorite(item) ? '取消收藏' : '收藏';
      btn.setAttribute('aria-label', btn.title);
      btn.textContent = '★';
      btn.dataset.favoriteName = item.name;
      btn.dataset.favoriteType = item.type;
      card.appendChild(btn);
    });
    document.querySelectorAll('.favorite-btn').forEach(btn => {
      const item={name:btn.dataset.favoriteName,type:btn.dataset.favoriteType};
      btn.classList.toggle('active',isFavorite(item));
      btn.title=isFavorite(item)?'取消收藏':'收藏';
    });
  }

  function renderList(items, empty){
    if(!items.length) return `<div class="personal-empty">${empty}</div>`;
    return `<div class="personal-list">${items.map((x,i)=>`<button class="personal-item" data-saved-kind="${esc(x.type)}" data-saved-name="${esc(x.name)}"><span class="kind">${esc(x.type)}</span><strong>${esc(x.name)}</strong><span>→</span></button>`).join('')}</div>`;
  }

  function renderPersonal(){
    const root = $('#personalWorkspace');
    if(!root) return;
    const favorites = read(FAVORITES_KEY);
    const recents = read(RECENTS_KEY);
    root.innerHTML = `
      <div class="preview-stats">
        <div class="preview-stat"><b>${favorites.length}</b><span>我的收藏</span></div>
        <div class="preview-stat"><b>${recents.length}</b><span>最近使用</span></div>
        <div class="preview-stat"><b>${(D.complaint||[]).length + (D.diagnosis||[]).length}</b><span>急症入口</span></div>
        <div class="preview-stat"><b>${(D.drugs||[]).length}</b><span>抢救药物字段</span></div>
      </div>
      <div class="personal-grid">
        <article class="personal-card"><div class="personal-card-head"><h3>⭐ 我的收藏</h3><span>本机保存</span></div>${renderList(favorites,'点击常见急症卡片右上角 ★ 即可收藏。')}</article>
        <article class="personal-card"><div class="personal-card-head"><h3>🕘 最近使用</h3><span>最多 8 项</span></div>${renderList(recents,'打开急症、药物或流程后会自动记录。')}</article>
      </div>`;
  }

  function updateNetwork(){
    const pill = $('#networkPill');
    if(!pill) return;
    const online = navigator.onLine;
    pill.classList.toggle('offline', !online);
    pill.textContent = online ? '● 在线 · 缓存准备中' : '● 离线 · 使用已缓存页面';
  }

  function injectUI(){
    const common = $('#topicGrid')?.closest('.section');
    if(common){
      const section = document.createElement('section');
      section.className='section';
      section.innerHTML=`<div class="section-head"><div><h2>我的工作台</h2><p>收藏与最近使用只保存在当前设备</p></div><span id="networkPill" class="network-pill"></span></div><div id="personalWorkspace"></div><div class="install-tip"><span>可作为网页 App 使用；支持离线缓存基础页面。</span><button id="installAppBtn" type="button">添加到桌面</button></div>`;
      common.insertAdjacentElement('afterend',section);
    }

    const twoCol = document.querySelector('.two-col');
    if(twoCol){
      const handoff = document.createElement('section');
      handoff.className='section';
      handoff.innerHTML=`<article class="panel"><div class="panel-head"><h2>交班快速清单</h2><span>结构原型</span></div><div class="quick-handoff"><div><b>未完成处置</b><span>仍需复评、检查或治疗的事项</span></div><div><b>高风险患者</b><span>需要重点观察或升级处理</span></div><div><b>待回结果</b><span>检验、影像、会诊等未闭环项目</span></div><div><b>转诊/去向</b><span>转诊、留观、住院与家属沟通</span></div></div></article>`;
      twoCol.insertAdjacentElement('afterend',handoff);
    }
  }

  document.addEventListener('click', (e) => {
    const fav = e.target.closest('.favorite-btn');
    if(fav){
      e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
      toggleFavorite({name:fav.dataset.favoriteName,type:fav.dataset.favoriteType});
      return;
    }
    const saved = e.target.closest('[data-saved-name]');
    if(saved){ openSaved({name:saved.dataset.savedName,type:saved.dataset.savedKind}); return; }
    const target = e.target.closest('[data-topic],[data-critical],[data-drug],[data-flow]');
    const item = identify(target);
    if(item) saveRecent(item);
    if(e.target.closest('#installAppBtn')){
      if(deferredPrompt){
        deferredPrompt.prompt();
        deferredPrompt.userChoice.finally(()=>{deferredPrompt=null;});
      } else {
        alert('如浏览器未弹出安装提示，可使用浏览器菜单中的“添加到主屏幕/安装应用”。');
      }
    }
  }, true);

  window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferredPrompt=e; });
  window.addEventListener('online', updateNetwork);
  window.addEventListener('offline', updateNetwork);

  injectUI();
  renderPersonal();
  decorateFavorites();
  updateNetwork();

  const topicGrid = $('#topicGrid');
  if(topicGrid) new MutationObserver(()=>decorateFavorites()).observe(topicGrid,{childList:true});

  if('serviceWorker' in navigator){
    window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
  }
})();
