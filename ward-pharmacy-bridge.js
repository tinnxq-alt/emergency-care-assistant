(() => {
  'use strict';
  const CACHE_KEY='emergency_ward_pharmacy_cache_v1';
  const SOURCE_URL='https://tinnxq-alt.github.io/primary-medication-assistant/';
  const esc=(s='')=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  const aliases={
    '阿司匹林':['阿司匹林'],
    '头孢曲松（脑膜炎）':['头孢曲松钠','头孢曲松'],
    '头孢曲松（静脉曲张出血）':['头孢曲松钠','头孢曲松'],
    '地塞米松（细菌性脑膜炎）':['地塞米松磷酸钠'],
    '普通胰岛素（高钾/DKA）':['人胰岛素'],
    '葡萄糖':['葡萄糖'],
    '葡萄糖酸钙':['葡萄糖酸钙'],
    '呋塞米':['呋塞米'],
    '利多卡因':['利多卡因'],
    '吗啡':['吗啡'],
    '奥美拉唑':['奥美拉唑钠','奥美拉唑']
  };

  function minimal(d){
    return {
      id:d.id||'',drugName:d.drugName||d.name||'',genericName:d.genericName||'',tradeName:d.tradeName||'',
      specification:d.specification||d.spec||'',therapeuticClass:d.therapeuticClass||d.group||'其他作用药',
      category:d.category||'',manufacturer:d.manufacturer||'',dosageForm:d.dosageForm||'',pharmacyScopes:d.pharmacyScopes||['ward']
    };
  }
  function getCatalog(){
    const live=Array.isArray(window.DRUG_CATALOG)?window.DRUG_CATALOG.map(minimal):[];
    if(live.length){
      try{localStorage.setItem(CACHE_KEY,JSON.stringify({savedAt:new Date().toISOString(),drugs:live}));}catch{}
      return {drugs:live,mode:'live',savedAt:new Date().toISOString()};
    }
    try{
      const cached=JSON.parse(localStorage.getItem(CACHE_KEY)||'null');
      if(cached?.drugs?.length)return {drugs:cached.drugs,mode:'cache',savedAt:cached.savedAt||''};
    }catch{}
    return {drugs:[],mode:'unavailable',savedAt:''};
  }

  const norm=s=>String(s||'')
    .replace(/^※?\(甲\)/,'').replace(/[（(][^）)]*[）)]/g,'')
    .replace(/盐酸|硫酸|磷酸|枸橼酸|酒石酸|苯磺酸|甲磺酸|富马酸|马来酸|乳酸/g,'')
    .replace(/注射用|注射液|肠溶片|缓释片|控释片|分散片|咀嚼片|薄膜衣片|胶囊|软胶囊|颗粒|口服液|乳膏|软膏|滴眼液|溶液|片$/g,'')
    .replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g,'').toLowerCase();

  const state=getCatalog();
  const drugs=state.drugs;
  function queryNames(name){return [name,...(aliases[name]||[])].filter(Boolean);}
  function find(name){
    if(!name||!drugs.length)return [];
    const targets=new Set(queryNames(name).map(norm).filter(Boolean));
    return drugs.filter(d=>{
      const values=[d.drugName,d.genericName,d.tradeName].map(norm).filter(Boolean);
      return values.some(v=>targets.has(v));
    });
  }
  window.WARD_PHARMACY={name:'病房药库',count:drugs.length,drugs,sourceUrl:SOURCE_URL,mode:state.mode,savedAt:state.savedAt,find,norm};

  const page=document.body.dataset.page;
  const host=document.querySelector('#drugPageGroups');
  const search=document.querySelector('#drugSearch');
  if(page==='drugs'&&host){
    const tabs=document.querySelector('.page-tabs');
    if(tabs&&!tabs.querySelector('[data-ward-mode]')){
      const b=document.createElement('button');b.className='page-chip';b.dataset.wardMode='1';b.textContent=`病房药库${drugs.length?`（${drugs.length}）`:''}`;tabs.appendChild(b);
    }
    let wardMode=false;
    const renderWard=()=>{
      if(!wardMode)return;
      const q=(search?.value||'').trim().toLowerCase();
      if(!drugs.length){
        host.innerHTML='<div class="page-empty">病房药库暂未加载。联网打开一次“基层用药助手”后会自动同步并保留本机缓存。</div>';return;
      }
      const filtered=drugs.filter(d=>!q||`${d.drugName} ${d.genericName} ${d.specification} ${d.therapeuticClass} ${d.manufacturer} ${d.dosageForm}`.toLowerCase().includes(q));
      const groups=new Map();filtered.forEach(d=>{const g=d.therapeuticClass||'其他作用药';if(!groups.has(g))groups.set(g,[]);groups.get(g).push(d);});
      const source=state.mode==='cache'?'本机缓存':'基层用药助手实时目录';
      host.innerHTML=`<section class="page-section"><div class="clinical-note"><strong>病房药库 · ${drugs.length} 种</strong>　来源：${source}。这里表示病房可获得药品，不等同于急救指南推荐。</div></section>`+
        [...groups.entries()].map(([group,items])=>`<section class="drug-group"><h3>${esc(group)}</h3><div class="page-grid">${items.map(d=>`<button class="page-item" data-ward-drug="${esc(d.id)}"><div><strong>${esc(d.drugName)}</strong><small>${esc(d.genericName)} · ${esc(d.specification)} · 病房有药</small></div><span>→</span></button>`).join('')}</div></section>`).join('') || '<div class="page-empty">没有匹配药品</div>';
    };
    tabs?.addEventListener('click',e=>{
      const ward=e.target.closest('[data-ward-mode]');
      if(ward){wardMode=true;tabs.querySelectorAll('.page-chip').forEach(x=>x.classList.toggle('active',x===ward));renderWard();return;}
      const normal=e.target.closest('[data-drug-mode]');if(normal)wardMode=false;
    });
    search?.addEventListener('input',()=>{if(wardMode)queueMicrotask(renderWard);});
    document.body.addEventListener('click',e=>{
      const btn=e.target.closest('[data-ward-drug]');if(!btn)return;
      const d=drugs.find(x=>x.id===btn.dataset.wardDrug);if(!d)return;
      e.preventDefault();e.stopPropagation();
      const overlay=document.querySelector('#overlay'),title=document.querySelector('#modalTitle'),sub=document.querySelector('#modalSubtitle'),content=document.querySelector('#modalContent');
      if(!overlay||!title||!sub||!content)return;
      const emergencyMatches=(window.EMERGENCY_DATA?.drugs||[]).filter(x=>find(x.name).some(m=>m.id===d.id));
      title.textContent=d.drugName;sub.textContent='病房药库 · 基层用药助手自动同步';
      content.innerHTML=`<section class="modal-card"><h3>病房库存信息</h3><p><strong>通用名：</strong>${esc(d.genericName||'—')}</p><p><strong>规格：</strong>${esc(d.specification||'—')}</p><p><strong>剂型：</strong>${esc(d.dosageForm||'—')}</p><p><strong>分类：</strong>${esc(d.therapeuticClass||'—')}</p><p><strong>厂家：</strong>${esc(d.manufacturer||'—')}</p></section>${emergencyMatches.length?`<section class="modal-card"><h3>急救助手关联</h3><p>${emergencyMatches.map(x=>esc(x.name)).join('、')}</p></section>`:''}<div class="clinical-note">病房药库库存信息来自“基层用药助手”；临床急救剂量仍以急救助手已核验指南卡和本机构制度为准。</div><p><a class="guideline-btn" href="${SOURCE_URL}" target="_blank" rel="noopener noreferrer">打开基层用药助手 ↗</a></p>`;
      overlay.classList.add('open');overlay.setAttribute('aria-hidden','false');
    },true);
  }

  function injectAvailability(){
    const overlay=document.querySelector('#overlay'),title=document.querySelector('#modalTitle'),content=document.querySelector('#modalContent');
    if(!overlay?.classList.contains('open')||!title||!content||content.querySelector('.ward-pharmacy-availability'))return;
    const matches=find(title.textContent.trim());if(!matches.length)return;
    const box=document.createElement('section');box.className='modal-card ward-pharmacy-availability';
    box.innerHTML=`<h3>病房药库</h3>${matches.map(d=>`<p><strong>病房有药</strong> · ${esc(d.drugName)} · ${esc(d.specification)}${d.dosageForm?` · ${esc(d.dosageForm)}`:''}</p>`).join('')}<p><small>自动关联自基层用药助手病房药库；可获得性不等于指南首选。</small></p>`;
    content.prepend(box);
  }
  const overlay=document.querySelector('#overlay');
  if(overlay){const ob=new MutationObserver(()=>queueMicrotask(injectAvailability));ob.observe(overlay,{subtree:true,childList:true,attributes:true,attributeFilter:['class','aria-hidden']});}
})();