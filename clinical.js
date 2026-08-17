(() => {
  const C = window.CLINICAL_DATA;
  if(!C) return;
  const $ = (s) => document.querySelector(s);
  const esc = (s='') => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  // Conservative mapping: broad symptoms are not auto-mapped to one diagnosis.
  // The clinical card opens only for an explicit diagnosis or a highly specific red-flag entry.
  const topicMap = {
    '心搏骤停':'心搏骤停','心搏骤停/无反应':'心搏骤停','立即抢救入口':'心搏骤停',
    '胸痛':'胸痛','急性胸痛高危':'胸痛','急性冠脉综合征':'胸痛',
    '严重过敏反应':'严重过敏反应','严重过敏表现':'严重过敏反应',
    '脓毒症':'脓毒症','感染性休克':'脓毒症',
    '低血糖':'低血糖',
    '癫痫持续状态':'癫痫持续状态',
    '哮喘急性发作':'哮喘急性发作','COPD急性加重':'COPD急性加重'
  };

  function statusLabel(status){
    if(status==='verified') return ['已按权威指南核验','verified'];
    if(status==='verified-partial') return ['部分核验','partial'];
    if(status==='source-bound') return ['已绑定最新来源 · 参数待解锁','bound'];
    return ['待核验','partial'];
  }
  function sourceHtml(ids=[]){
    return `<div class="clinical-source-list">${ids.map(id=>{
      const s=C.sources[id]; if(!s) return '';
      return `<a class="clinical-source-link" href="${esc(s.url)}" target="_blank" rel="noopener noreferrer"><div><strong>${esc(s.name)}</strong><small>${esc(s.org)} · ${esc(s.year)}</small></div><span>官方来源 ↗</span></a>`;
    }).join('')}</div>`;
  }
  function list(title, arr, cls=''){
    if(!arr || !arr.length) return '';
    return `<h3 class="clinical-section-title">${esc(title)}</h3><div class="${cls}"><ul class="clinical-list">${arr.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>`;
  }
  function field(title, text, cls='clinical-note'){
    if(!text) return '';
    return `<h3 class="clinical-section-title">${esc(title)}</h3><div class="${cls}">${esc(text)}</div>`;
  }
  function openModal(title, subtitle, html){
    const overlay=$('#overlay'), mt=$('#modalTitle'), ms=$('#modalSubtitle'), mc=$('#modalContent');
    if(!overlay||!mt||!ms||!mc) return;
    mt.textContent=title; ms.textContent=subtitle||''; mc.innerHTML=html;
    overlay.classList.add('open'); overlay.setAttribute('aria-hidden','false');
  }
  function topicCard(key){
    const t=C.topics[key]; if(!t) return;
    const [label,kind]=statusLabel(t.status);
    const copyright=t.copyrightNote?`<div class="clinical-copyright">${esc(t.copyrightNote)}</div>`:'';
    openModal(key,`临床摘要 · 核验日期 ${C.meta.verifiedAt}`,`
      <div class="clinical-meta-line"><span class="clinical-badge ${kind}">${label}</span><span class="badge">成人为主</span><span class="badge">来源已绑定</span></div>
      <div class="clinical-summary">${esc(t.summary||'')}</div>
      ${list('红旗征象 / 立即升级条件',t.redFlags,'clinical-alert')}
      ${list('首要处置与流程',t.steps)}
      ${list('关键剂量 / 参数',t.doses,'dose-list')}
      ${field('液体复苏',t.fluids)}
      ${field('复评与目标',t.reassess||t.target)}
      ${field('安全提醒',t.caution)}
      ${copyright}
      <h3 class="clinical-section-title">指南来源</h3>${sourceHtml(t.sourceIds)}
      <div class="clinical-note">${esc(C.meta.disclaimer)}</div>`);
  }
  function drugCard(name){
    const d=C.drugs[name]; if(!d) return;
    const [label,kind]=statusLabel(d.status);
    openModal(name,'抢救药物临床卡',`
      <div class="clinical-meta-line"><span class="clinical-badge ${kind}">${label}</span><span class="badge">高风险药物需复核</span></div>
      ${list('适应证',d.indications)}
      ${list('关键剂量',d.doses,'dose-list')}
      ${list('禁忌 / 慎用 / 易错点',d.cautions,'clinical-alert')}
      <h3 class="clinical-section-title">指南来源</h3>${sourceHtml(d.sourceIds)}
      <div class="clinical-note">药品规格、配液浓度、泵速、相容性及特殊人群用法仍应以本机构标准和具体药品说明书复核。</div>`);
  }
  function algorithmCard(name){
    const a=C.algorithms[name]; if(!a) return;
    const [label,kind]=statusLabel(a.status);
    openModal(name,'AHA 2025 围心搏骤停算法摘要',`
      <div class="clinical-meta-line"><span class="clinical-badge ${kind}">${label}</span></div>
      ${list('识别与处置',a.points)}${list('关键剂量',a.doses,'dose-list')}
      <h3 class="clinical-section-title">指南来源</h3>${sourceHtml(a.sourceIds)}
      <div class="clinical-note">电复律/起搏能量、镇静和设备操作按具体除颤监护设备、本机构流程及患者情况执行。</div>`);
  }
  function openSourceLibrary(){
    const sources=Object.values(C.sources);
    openModal('权威指南来源库',`当前绑定 ${sources.length} 个一手来源`, `<div class="source-library">${sources.map(s=>`<a class="source-card" href="${esc(s.url)}" target="_blank" rel="noopener noreferrer"><strong>${esc(s.name)}</strong><small>${esc(s.org)} · ${esc(s.year)}</small>${s.note?`<small>${esc(s.note)}</small>`:''}</a>`).join('')}</div><div class="clinical-note">本站只保存原创结构化摘要和必要的临床参数，不复制受版权保护的整份指南、图表或大段原文。</div>`);
  }
  function injectStatus(){
    const main=document.querySelector('main'); if(!main) return;
    const verifiedTopics=Object.values(C.topics).filter(x=>x.status==='verified').length;
    const boundTopics=Object.values(C.topics).filter(x=>x.status==='source-bound').length;
    const verifiedDrugs=Object.values(C.drugs).filter(x=>x.status==='verified').length;
    const section=document.createElement('section'); section.className='section'; section.id='clinicalVerification';
    section.innerHTML=`<div class="clinical-status-panel"><div class="section-head"><div><h2>指南核验进度</h2><p>每条临床内容显示核验状态、版本和官方来源</p></div><button class="guideline-btn" id="openGuidelinesBtn">查看来源库</button></div><div class="clinical-progress"><div class="metric"><b>${verifiedTopics}</b><span>已核验急症卡</span></div><div class="metric"><b>${boundTopics}</b><span>已绑定来源待解锁</span></div><div class="metric"><b>${verifiedDrugs}</b><span>已核验药物卡</span></div><div class="metric"><b>${Object.keys(C.sources).length}</b><span>权威一手来源</span></div></div></div>`;
    const first=main.querySelector('.section'); first?.insertAdjacentElement('beforebegin',section);
    $('#openGuidelinesBtn')?.addEventListener('click',openSourceLibrary);
  }

  document.addEventListener('click',e=>{
    const drug=e.target.closest('[data-drug]');
    if(drug && C.drugs[drug.dataset.drug]){
      e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation(); drugCard(drug.dataset.drug); return;
    }
    const flow=e.target.closest('[data-flow]');
    if(flow && C.algorithms[flow.dataset.flow]){
      e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation(); algorithmCard(flow.dataset.flow); return;
    }
    const node=e.target.closest('[data-topic],[data-critical]');
    if(node){
      const raw=node.dataset.topic||node.dataset.critical; const key=topicMap[raw];
      if(key && C.topics[key]){ e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation(); topicCard(key); return; }
    }
  },true);

  injectStatus();
  window.EMERGENCY_CLINICAL_UI={topicCard,drugCard,algorithmCard,openSourceLibrary};
})();
