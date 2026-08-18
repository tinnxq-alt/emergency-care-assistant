(() => {
  const C=window.CLINICAL_DATA; if(!C) return;
  const safeTopicMap={
    '心搏骤停':'心搏骤停','心搏骤停/无反应':'心搏骤停','急性胸痛高危':'胸痛','急性冠脉综合征':'胸痛','胸痛':'胸痛',
    '严重过敏反应':'严重过敏反应','严重过敏表现':'严重过敏反应','脓毒症':'脓毒症','低血糖':'低血糖',
    '癫痫持续状态':'癫痫持续状态','哮喘急性发作':'哮喘急性发作','COPD急性加重':'COPD急性加重'
  };
  function label(status){
    if(status==='verified') return ['✓ 已核验','verified'];
    if(status==='verified-partial') return ['◐ 部分核验','partial'];
    if(status==='source-bound') return ['↗ 已绑定来源','bound'];
    if(status==='inventory-review') return ['未建立指南急救卡','pending'];
    return ['待核验','pending'];
  }
  function decorate(){
    document.querySelectorAll('[data-drug]').forEach(el=>{
      const d=C.drugs[el.dataset.drug]; if(!d) return;
      const [text,kind]=label(d.status);
      const last=el.lastElementChild;
      if(last && !last.matches('div')){ last.textContent=`${text} →`; last.dataset.verify=kind; }
      el.dataset.clinicalStatus=kind;
    });
    document.querySelectorAll('[data-topic],[data-critical]').forEach(el=>{
      const raw=el.dataset.topic||el.dataset.critical; const key=safeTopicMap[raw]; const t=key&&C.topics[key];
      if(!t) return;
      const [text,kind]=label(t.status);
      let mark=el.querySelector('.clinical-card-mark');
      if(!mark){ mark=document.createElement('span'); el.appendChild(mark); }
      mark.className=`clinical-card-mark ${kind}`; mark.textContent=text;
    });
  }
  const root=document.querySelector('#modalContent');
  if(root) new MutationObserver(decorate).observe(root,{childList:true,subtree:true});
  const topic=document.querySelector('#topicGrid');
  if(topic) new MutationObserver(decorate).observe(topic,{childList:true,subtree:true});
  const critical=document.querySelector('#criticalGrid');
  if(critical) new MutationObserver(decorate).observe(critical,{childList:true,subtree:true});
  decorate();

  if(!document.querySelector('script[data-clinical-audit-v019]')){
    const s=document.createElement('script');
    s.src='./clinical-audit-v019.js';
    s.dataset.clinicalAuditV019='1';
    s.onload=decorate;
    document.head.appendChild(s);
  }
})();
