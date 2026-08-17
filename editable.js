(() => {
  const C=window.CLINICAL_DATA;
  const UI=window.EMERGENCY_CLINICAL_UI;
  if(!C||!UI) return;

  const STORAGE='emergency_clinical_user_edits_v1';
  const clone=o=>JSON.parse(JSON.stringify(o));
  const esc=(s='')=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const defaults={topics:clone(C.topics||{}),drugs:clone(C.drugs||{}),algorithms:clone(C.algorithms||{})};
  let edits={};
  try{edits=JSON.parse(localStorage.getItem(STORAGE)||'{}')||{};}catch{edits={};}

  const collectionFor=type=>type==='topic'?'topics':type==='drug'?'drugs':'algorithms';
  const idFor=(type,key)=>`${type}:${key}`;
  const saveStore=()=>localStorage.setItem(STORAGE,JSON.stringify(edits));
  const replaceObject=(target,source)=>{Object.keys(target).forEach(k=>delete target[k]);Object.assign(target,clone(source));};
  const applyOne=(type,key)=>{
    const col=collectionFor(type), target=C[col]?.[key], change=edits[idFor(type,key)];
    if(!target||!change) return;
    Object.entries(change).forEach(([k,v])=>{if(k!=='displayTitle'&&k!=='userNote') target[k]=clone(v);});
  };
  Object.keys(edits).forEach(id=>{const p=id.indexOf(':');if(p>0) applyOne(id.slice(0,p),id.slice(p+1));});

  const schemas={
    topic:[['summary','摘要','text'],['redFlags','红旗征象 / 立即升级条件','list'],['steps','首要处置与流程','list'],['doses','关键剂量 / 参数','list'],['fluids','液体复苏','text'],['reassess','复评','text'],['target','目标','text'],['caution','安全提醒','text']],
    drug:[['indications','适应证','list'],['doses','关键剂量','list'],['cautions','禁忌 / 慎用 / 易错点','list']],
    algorithm:[['points','识别与处置','list'],['doses','关键剂量','list']]
  };

  function modal(title,subtitle,html){
    const o=document.querySelector('#overlay'),t=document.querySelector('#modalTitle'),s=document.querySelector('#modalSubtitle'),c=document.querySelector('#modalContent');
    if(!o||!t||!s||!c) return;
    t.textContent=title;s.textContent=subtitle||'';c.innerHTML=html;o.classList.add('open');o.setAttribute('aria-hidden','false');
  }

  function injectToolbar(type,key,rerender){
    const c=document.querySelector('#modalContent'), t=document.querySelector('#modalTitle');
    if(!c||!t||c.querySelector('.edit-toolbar')||c.querySelector('#clinicalEditForm')) return;
    const id=idFor(type,key), changed=!!edits[id], change=edits[id]||{};
    if(change.displayTitle) t.textContent=change.displayTitle;
    const bar=document.createElement('div');bar.className='edit-toolbar';
    bar.innerHTML=`<div class="edit-state">${changed?'<span class="local-edit-badge">本机已编辑 · 需复核</span>':'<span class="default-content-badge">指南默认内容</span>'}</div><div class="edit-actions"><button class="edit-card-btn">编辑此卡</button>${changed?'<button class="reset-card-btn">恢复默认</button>':''}</div>`;
    c.prepend(bar);
    if(change.userNote){const note=document.createElement('div');note.className='user-edit-note';note.innerHTML=`<strong>本机备注</strong><div>${esc(change.userNote).replace(/\n/g,'<br>')}</div>`;bar.insertAdjacentElement('afterend',note);}
    if(changed){const badge=c.querySelector('.clinical-badge');if(badge){badge.textContent='本机已编辑 · 需复核';badge.classList.remove('verified','bound');badge.classList.add('partial');}}
    bar.querySelector('.edit-card-btn')?.addEventListener('click',()=>openEditor(type,key,rerender));
    bar.querySelector('.reset-card-btn')?.addEventListener('click',()=>{
      const col=collectionFor(type), base=defaults[col]?.[key], target=C[col]?.[key];
      if(base&&target) replaceObject(target,base);
      delete edits[id];saveStore();rerender(key);
    });
  }

  function openEditor(type,key,rerender){
    const col=collectionFor(type), obj=C[col]?.[key];if(!obj) return;
    const current=edits[idFor(type,key)]||{};
    const fields=schemas[type]||[];
    const fieldHtml=fields.map(([name,label,kind])=>{
      const value=obj[name]??'';
      const text=kind==='list'?(Array.isArray(value)?value.join('\n'):String(value||'')):String(value||'');
      return `<label class="edit-field"><span>${esc(label)}</span><textarea data-field="${name}" data-kind="${kind}" rows="${kind==='list'?6:3}">${esc(text)}</textarea></label>`;
    }).join('');
    modal('编辑 · '+key,'仅保存在当前浏览器；修改后不再视为原指南已核验原文',`
      <div class="edit-warning">⚠ 个人修改不会更改原始指南来源。保存后此卡会标记为“本机已编辑 · 需复核”，可随时恢复指南默认内容。</div>
      <form id="clinicalEditForm" class="clinical-edit-form">
        <label class="edit-field"><span>显示标题</span><input data-special="displayTitle" value="${esc(current.displayTitle||key)}"></label>
        ${fieldHtml}
        <label class="edit-field"><span>本机备注</span><textarea data-special="userNote" rows="3">${esc(current.userNote||'')}</textarea></label>
        <div class="edit-form-actions"><button type="submit" class="save-edit-btn">保存修改</button><button type="button" class="cancel-edit-btn">取消</button></div>
      </form>`);
    const form=document.querySelector('#clinicalEditForm');
    form?.addEventListener('submit',e=>{
      e.preventDefault();const patch={};
      form.querySelectorAll('[data-field]').forEach(el=>{const name=el.dataset.field;patch[name]=el.dataset.kind==='list'?el.value.split(/\n/).map(x=>x.trim()).filter(Boolean):el.value.trim();});
      patch.displayTitle=form.querySelector('[data-special="displayTitle"]')?.value.trim()||key;
      patch.userNote=form.querySelector('[data-special="userNote"]')?.value.trim()||'';
      edits[idFor(type,key)]=patch;saveStore();applyOne(type,key);rerender(key);
    });
    form?.querySelector('.cancel-edit-btn')?.addEventListener('click',()=>rerender(key));
  }

  const original={topicCard:UI.topicCard,drugCard:UI.drugCard,algorithmCard:UI.algorithmCard};
  UI.topicCard=function(key){applyOne('topic',key);original.topicCard(key);injectToolbar('topic',key,UI.topicCard);};
  UI.drugCard=function(key){applyOne('drug',key);original.drugCard(key);injectToolbar('drug',key,UI.drugCard);};
  UI.algorithmCard=function(key){applyOne('algorithm',key);original.algorithmCard(key);injectToolbar('algorithm',key,UI.algorithmCard);};

  function resolveOpenCard(){
    const overlay=document.querySelector('#overlay'), title=document.querySelector('#modalTitle')?.textContent?.trim()||'', content=document.querySelector('#modalContent');
    if(!overlay?.classList.contains('open')||!title||!content||content.querySelector('#clinicalEditForm')||content.querySelector('.edit-manager-list')) return;
    for(const [type,col] of [['topic','topics'],['drug','drugs'],['algorithm','algorithms']]){
      if(C[col]?.[title]){injectToolbar(type,title,UI[type+'Card']);return;}
      const match=Object.keys(C[col]||{}).find(key=>edits[idFor(type,key)]?.displayTitle===title);
      if(match){injectToolbar(type,match,UI[type+'Card']);return;}
    }
  }
  const modalNode=document.querySelector('#overlay');
  if(modalNode){const observer=new MutationObserver(()=>queueMicrotask(resolveOpenCard));observer.observe(modalNode,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['class','aria-hidden']});}

  function openManager(){
    const rows=Object.keys(edits).sort().map(id=>{const p=id.indexOf(':'),type=id.slice(0,p),key=id.slice(p+1);return `<div class="edit-manager-row"><div><strong>${esc(edits[id].displayTitle||key)}</strong><small>${type==='topic'?'急症卡':type==='drug'?'药物卡':'流程卡'}</small></div><button data-reset-edit="${esc(id)}">恢复默认</button></div>`;}).join('');
    modal('个人编辑管理',`${Object.keys(edits).length} 项本机修改`,`
      <div class="edit-manager-actions"><button id="exportEditsBtn">导出编辑 JSON</button><label class="import-edit-btn">导入编辑 JSON<input id="importEditsInput" type="file" accept="application/json" hidden></label>${Object.keys(edits).length?'<button id="clearEditsBtn" class="danger-soft">全部恢复默认</button>':''}</div>
      <div class="edit-manager-list">${rows||'<div class="empty-state">目前没有个人编辑。打开任意急症、药物或流程卡即可编辑。</div>'}</div>
      <div class="clinical-note">权威来源、指南年份和原始默认内容不会被个人编辑覆盖；导出的 JSON 仅包含你的本机修改。</div>`);
    document.querySelectorAll('[data-reset-edit]').forEach(btn=>btn.addEventListener('click',()=>{const id=btn.dataset.resetEdit,p=id.indexOf(':'),type=id.slice(0,p),key=id.slice(p+1),col=collectionFor(type),base=defaults[col]?.[key],target=C[col]?.[key];if(base&&target)replaceObject(target,base);delete edits[id];saveStore();openManager();}));
    document.querySelector('#clearEditsBtn')?.addEventListener('click',()=>{Object.entries(defaults).forEach(([col,map])=>Object.entries(map).forEach(([key,base])=>{if(C[col]?.[key])replaceObject(C[col][key],base);}));edits={};saveStore();openManager();});
    document.querySelector('#exportEditsBtn')?.addEventListener('click',()=>{const blob=new Blob([JSON.stringify({version:1,exportedAt:new Date().toISOString(),edits},null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='急救诊疗助手_个人编辑.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);});
    document.querySelector('#importEditsInput')?.addEventListener('change',async e=>{const file=e.target.files?.[0];if(!file)return;try{const obj=JSON.parse(await file.text());if(!obj||typeof obj.edits!=='object')throw new Error('格式错误');edits=obj.edits;saveStore();Object.keys(edits).forEach(id=>{const p=id.indexOf(':');if(p>0)applyOne(id.slice(0,p),id.slice(p+1));});openManager();}catch{alert('导入失败：文件格式不正确。');}});
  }

  const sourceBtn=document.querySelector('#openGuidelinesBtn');
  if(sourceBtn){const b=document.createElement('button');b.className='guideline-btn edit-manager-btn';b.textContent='管理个人编辑';b.addEventListener('click',openManager);sourceBtn.insertAdjacentElement('afterend',b);}
  window.EMERGENCY_EDITING={openManager,edits};
})();
