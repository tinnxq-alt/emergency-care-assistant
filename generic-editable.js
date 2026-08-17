(() => {
  const D=window.EMERGENCY_DATA, C=window.CLINICAL_DATA;
  if(!D) return;
  const STORAGE='emergency_generic_content_edits_v1';
  const esc=(s='')=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let store={cards:{},tools:{},records:{}};
  try{const x=JSON.parse(localStorage.getItem(STORAGE)||'{}');store={cards:x.cards||{},tools:x.tools||{},records:x.records||{}};}catch{}
  const save=()=>localStorage.setItem(STORAGE,JSON.stringify(store));
  const overlay=document.querySelector('#overlay'), titleEl=document.querySelector('#modalTitle'), content=document.querySelector('#modalContent');
  if(!overlay||!titleEl||!content) return;

  const criticalNames=()=>new Set((D.critical||[]).map(x=>x.name));
  const isGenericCard=(title)=>{
    if(C?.topics?.[title]||C?.drugs?.[title]||C?.algorithms?.[title]) return false;
    return (D.complaint||[]).includes(title)||(D.diagnosis||[]).includes(title)||(D.flows||[]).includes(title)||criticalNames().has(title);
  };
  const labelFor=(title)=> (D.flows||[]).includes(title)?'普通流程内容':'普通急症/主诉内容';

  function modal(title,subtitle,html){
    titleEl.textContent=title;document.querySelector('#modalSubtitle').textContent=subtitle||'';content.innerHTML=html;overlay.classList.add('open');overlay.setAttribute('aria-hidden','false');
  }
  function customHtml(text){
    const parts=String(text||'').split(/\n+/).map(x=>x.trim()).filter(Boolean);
    return parts.length?`<div class="user-edit-note"><strong>本机自定义内容</strong>${parts.map(x=>`<div>${esc(x)}</div>`).join('')}</div>`:'';
  }
  function injectGenericCard(){
    const title=titleEl.textContent.trim();if(!isGenericCard(title)||content.querySelector('.generic-edit-toolbar')||content.querySelector('#genericEditForm'))return;
    const saved=store.cards[title];
    if(saved?.text){const existing=content.querySelector('.user-generic-content');if(!existing){const box=document.createElement('div');box.className='user-generic-content';box.innerHTML=customHtml(saved.text);content.prepend(box);}}
    const bar=document.createElement('div');bar.className='edit-toolbar generic-edit-toolbar';bar.innerHTML=`<div class="edit-state">${saved?'<span class="local-edit-badge">本机已编辑 · 需复核</span>':'<span class="default-content-badge">默认内容</span>'}</div><div class="edit-actions"><button class="edit-card-btn">编辑此项</button>${saved?'<button class="reset-card-btn">恢复默认</button>':''}</div>`;
    content.prepend(bar);
    bar.querySelector('.edit-card-btn').onclick=()=>openGenericEditor(title);
    bar.querySelector('.reset-card-btn')?.addEventListener('click',()=>{delete store.cards[title];save();location.reload();});
  }
  function openGenericEditor(key){
    const current=store.cards[key]?.text||'';
    modal('编辑 · '+key,labelFor(key)+' · 仅保存在当前浏览器',`<div class="edit-warning">⚠ 这里用于补充你的本地流程/主诉内容。若涉及药物剂量或高风险操作，保存后仍需自行复核。</div><form id="genericEditForm" class="clinical-edit-form"><label class="edit-field"><span>自定义内容（每行一项）</span><textarea id="genericEditText" rows="12">${esc(current)}</textarea></label><div class="edit-form-actions"><button class="save-edit-btn" type="submit">保存修改</button><button class="cancel-edit-btn" type="button">取消</button></div></form>`);
    const form=document.querySelector('#genericEditForm');
    form?.addEventListener('submit',e=>{e.preventDefault();const text=document.querySelector('#genericEditText')?.value.trim()||'';if(text)store.cards[key]={text};else delete store.cards[key];save();location.reload();});
    form?.querySelector('.cancel-edit-btn')?.addEventListener('click',()=>location.reload());
  }

  function injectToolEditors(){
    if(titleEl.textContent.trim()!=='计算工具'||content.querySelector('[data-tool-edit-ready]'))return;
    content.setAttribute('data-tool-edit-ready','1');
    content.querySelectorAll('.modal-card').forEach(section=>{
      const h=section.querySelector('h3');if(!h)return;const name=h.textContent.trim();if(!(D.tools||[]).includes(name))return;
      const saved=store.tools[name];
      const wrap=document.createElement('div');wrap.className='edit-actions';wrap.style.marginTop='8px';wrap.innerHTML=`<button class="edit-card-btn" data-edit-tool="${esc(name)}">编辑说明</button>${saved?`<button class="reset-card-btn" data-reset-tool="${esc(name)}">恢复默认</button>`:''}`;section.append(wrap);
      if(saved?.text){const note=document.createElement('div');note.className='user-edit-note';note.innerHTML=`<strong>本机说明</strong><div>${esc(saved.text).replace(/\n/g,'<br>')}</div>`;h.insertAdjacentElement('afterend',note);}
    });
    content.querySelectorAll('[data-edit-tool]').forEach(b=>b.onclick=()=>openToolEditor(b.dataset.editTool));
    content.querySelectorAll('[data-reset-tool]').forEach(b=>b.onclick=()=>{delete store.tools[b.dataset.resetTool];save();location.reload();});
  }
  function openToolEditor(name){
    modal('编辑工具说明 · '+name,'不改变工具公式/安全锁，只补充本机说明',`<form id="toolEditForm" class="clinical-edit-form"><label class="edit-field"><span>本机说明</span><textarea id="toolEditText" rows="10">${esc(store.tools[name]?.text||'')}</textarea></label><div class="edit-form-actions"><button class="save-edit-btn" type="submit">保存</button><button class="cancel-edit-btn" type="button">取消</button></div></form>`);
    document.querySelector('#toolEditForm')?.addEventListener('submit',e=>{e.preventDefault();const text=document.querySelector('#toolEditText')?.value.trim()||'';if(text)store.tools[name]={text};else delete store.tools[name];save();location.reload();});
    document.querySelector('#toolEditForm .cancel-edit-btn')?.addEventListener('click',()=>location.reload());
  }

  function defaultRecordTemplate(type){return `${type}\n\n主诉：\n现病史/事件经过：\n生命体征：\n意识/气道/呼吸/循环：\n查体：\n辅助检查：\n初步判断及鉴别：\n处置经过：\n动态复评：\n患者去向：\n交代事项：\n记录时间：`;}
  function injectRecordEditor(){
    if(titleEl.textContent.trim()!=='急诊病历'||content.querySelector('#editRecordTemplateBtn'))return;
    const btn=document.createElement('button');btn.id='editRecordTemplateBtn';btn.className='edit-card-btn';btn.textContent='编辑当前模板';
    const gen=document.querySelector('#generateRecordBtn');gen?.insertAdjacentElement('afterend',btn);
    btn.onclick=()=>{const type=document.querySelector('#recordType')?.value||D.records?.[0];openRecordEditor(type);};
  }
  function openRecordEditor(type){
    const text=store.records[type]?.text||defaultRecordTemplate(type);
    modal('编辑病历模板 · '+type,'仅保存在当前浏览器；可随时恢复默认',`<form id="recordTemplateForm" class="clinical-edit-form"><label class="edit-field"><span>模板正文</span><textarea id="recordTemplateText" rows="18">${esc(text)}</textarea></label><div class="edit-form-actions"><button class="save-edit-btn" type="submit">保存模板</button>${store.records[type]?'<button class="reset-card-btn" id="resetRecordTemplateBtn" type="button">恢复默认</button>':''}<button class="cancel-edit-btn" type="button">取消</button></div></form>`);
    document.querySelector('#recordTemplateForm')?.addEventListener('submit',e=>{e.preventDefault();const v=document.querySelector('#recordTemplateText')?.value||'';store.records[type]={text:v};save();location.reload();});
    document.querySelector('#resetRecordTemplateBtn')?.addEventListener('click',()=>{delete store.records[type];save();location.reload();});
    document.querySelector('#recordTemplateForm .cancel-edit-btn')?.addEventListener('click',()=>location.reload());
  }
  document.body.addEventListener('click',e=>{
    if(e.target.id==='generateRecordBtn'){
      queueMicrotask(()=>{const type=document.querySelector('#recordType')?.value;const box=document.querySelector('#recordDraft');if(type&&box&&store.records[type]?.text)box.value=store.records[type].text;});
    }
  });

  function scan(){if(!overlay.classList.contains('open'))return;injectGenericCard();injectToolEditors();injectRecordEditor();}
  const observer=new MutationObserver(()=>queueMicrotask(scan));observer.observe(overlay,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['class','aria-hidden']});
  queueMicrotask(scan);
})();
