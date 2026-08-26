(() => {
  'use strict';
  const C=window.CLINICAL_DATA;
  if(!C||window.__CLINICAL_AUDIT_V019__) return;
  window.__CLINICAL_AUDIT_V019__=true;

  C.meta=C.meta||{};
  C.meta.version='v0.19-existing-content-audit';
  C.meta.verifiedAt='2026-08-19';
  C.meta.auditRevision='v0.19-evidence-vs-inventory-and-remaining-partials';
  C.meta.auditNote='第四轮既有内容核验：把指南证据状态与本院库存/制剂规格核对状态彻底分离；完成细菌性脑膜炎流程和2022症状性低钠更新核验，并为急性高钙补入现代恶性肿瘤相关高钙分支。';
  C.meta.statusModel='临床指南核验状态与本院药品/库存规格状态分开显示；库存规格不完整不会再降低已核验临床证据的等级。';

  Object.assign(C.sources,{
    sfeHyponatraemia2022:{
      name:'Society for Endocrinology — Emergency management of severe and moderately severely symptomatic hyponatraemia in adult patients',
      year:'2022',org:'Society for Endocrinology',
      url:'https://www.endocrinology.org/media/xhrhxhxm/emergency-management-of-severe-and-moderately-severely-symptomatic-hyponatraemia-in-adult-patients-2022.pdf',
      note:'2022更新版；用于3%高渗盐水间歇bolus、首小时+5 mmol/L目标、纠正上限和过度纠正处理。'
    },
    endocrineHCM2022:{
      name:'Treatment of Hypercalcemia of Malignancy in Adults — Endocrine Society Clinical Practice Guideline',
      year:'2022/2023',org:'Endocrine Society',
      url:'https://www.endocrine.org/clinical-practice-guidelines/hypercalcemia',
      note:'2022-12发布、2023刊发；只用于恶性肿瘤相关高钙血症分支，不外推为所有病因高钙的统一方案。'
    },
    adaHospital2026:{
      name:'ADA Standards of Care in Diabetes—2026, Diabetes Care in the Hospital',
      year:'2026',org:'American Diabetes Association',
      url:'https://diabetesjournals.org/care/article/49/Supplement_1/S339/163925/16-Diabetes-Care-in-the-Hospital-Standards-of-Care',
      note:'住院低血糖：能吞咽者快速碳水；不能安全口服者可用静脉葡萄糖或胰高血糖素；约每15分钟复测直至稳定。'
    }
  });

  // 1) Bacterial meningitis: the emergency workflow itself is fully verifiable from NICE.
  // Exact ceftriaxone/dexamethasone numeric dosing stays local/source-bound because NICE explicitly
  // directs clinicians to BNF/BNFC or local antimicrobial guidance rather than giving one universal dose.
  if(C.topics['细菌性脑膜炎']){
    Object.assign(C.topics['细菌性脑膜炎'],{
      status:'verified',sourceIds:['niceMeningitis2024'],
      verificationNote:'急救流程已按NICE NG240核验：疑似后院内IV抗菌药目标1小时内；安全且不造成明显延误时先腰穿；Listeria风险需额外覆盖；地塞米松最好与首剂抗菌药同时/之前且绝不延误抗菌药。具体成人抗菌药/地塞米松数值剂量仍按本院抗菌方案、现行说明书或可访问的本地处方集执行，因此相关“药物卡”可继续保持来源绑定。'
    });
  }
  if(C.drugs['头孢曲松（脑膜炎）']){
    Object.assign(C.drugs['头孢曲松（脑膜炎）'],{
      status:'source-bound',sourceIds:['niceMeningitis2024'],
      verificationNote:'适应证、时机和ceftriaxone与含钙溶液不相容的安全边界已核验；NICE要求使用BNF/BNFC最高脑膜炎剂量或本地抗菌指导，因此本站不伪造一个跨地区统一成人剂量。'
    });
  }
  if(C.drugs['地塞米松（细菌性脑膜炎）']){
    Object.assign(C.drugs['地塞米松（细菌性脑膜炎）'],{
      status:'source-bound',sourceIds:['niceMeningitis2024'],
      verificationNote:'使用时机和病原学停/继续规则已按NICE核验；当前NICE页面不提供本站可直接跨地区固化的统一成人数值剂量，因此剂量仍服从本院脑膜炎方案/说明书。'
    });
  }

  // 2) Symptomatic hyponatraemia: 2022 Society guidance is now directly parsed and can be upgraded.
  if(C.topics['严重症状性低钠血症']){
    Object.assign(C.topics['严重症状性低钠血症'],{
      status:'verified',sourceIds:['sfeHyponatraemia2022'],
      summary:'2022 Society for Endocrinology更新强调：低钠急救按症状严重程度驱动，不只看血钠数字。严重或中度严重症状均应立即在可密切监护环境使用静脉高渗氯化钠，目标是尽快解除脑水肿危险，同时严格避免过度纠正。',
      redFlags:['持续呕吐','心肺骤停','抽搐','GCS≤8的意识下降/昏迷','中度严重症状：恶心（无呕吐）、意识混乱、头痛；需结合血钠及其他病因判断'],
      steps:[
        '立即ABCDE、床旁血糖、监护并复测血钠；同步查病因，但严重/中度严重神经症状的高渗盐水治疗不等待完整病因鉴别。',
        '3% NaCl 150 mL（或等效高渗液）IV约20 min；复测血钠，可重复bolus，首小时目标约+5 mmol/L。2022指导优先间歇bolus而不是24小时连续高渗输注。',
        '达到约+5 mmol/L且症状改善后停止高渗盐水，静脉通路以最低需要量0.9% NaCl维持并进入病因特异治疗。',
        '若首小时血钠已升约5 mmol/L但临床未改善，可再给一次高渗bolus，目标额外约+1 mmol/L，同时积极寻找其他导致症状的原因。',
        '限制首24小时总升幅≤10 mmol/L；此后每24小时≤8 mmol/L，直至Na约130 mmol/L。出现快速水利尿、首/第二bolus后升幅>5 mmol/L或需要≥3次bolus者加密监测。',
        '如超过纠正上限，停止高渗液并立即请有经验团队处理；可根据具体情况考虑低渗液和/或静脉去氨加压素以限制/逆转过度纠正。'
      ],
      doses:['3% NaCl 150 mL IV约20 min（或等效高渗钠液）；按症状和复测结果间歇bolus，首小时目标约+5 mmol/L。'],
      target:'首小时约+5 mmol/L；首24小时总升幅≤10 mmol/L；以后每24小时≤8 mmol/L。达到症状改善、总升幅接近安全上限或Na达到约130 mmol/L时停止进一步高渗治疗并复评。',
      caution:'2022指导不建议在严重/中度严重症状性低钠中使用vaptan，也不建议用Adrogué–Madias公式机械计算高渗液量/速度。具体3%制剂配制、静脉通路和过度纠正救援必须按本院高风险药液制度。',
      verificationNote:'临床目标、150 mL 3% bolus、纠正上限及过度纠正处理已直接核对2022 Society原始PDF；“本院3%盐水如何配制/储备”属于机构药学与库存状态，另行核对。'
    });
  }
  if(C.drugs['高渗氯化钠（症状性低钠）']){
    Object.assign(C.drugs['高渗氯化钠（症状性低钠）'],{
      status:'verified',sourceIds:['sfeHyponatraemia2022'],
      indications:['严重或中度严重症状性低钠血症，需要紧急纠正脑水肿风险'],
      doses:['3% NaCl 150 mL IV约20 min（或等效高渗钠液）；根据症状与复测血钠间歇bolus，首小时目标约+5 mmol/L。'],
      cautions:['首24小时总升幅≤10 mmol/L；以后每24小时≤8 mmol/L。','超过上限立即停高渗液并请有经验团队处理；可按专科方案考虑低渗液±静脉去氨加压素。','高风险制剂：本院实际浓度、配制、储存、通路和双人核对流程必须现场确认。'],
      verificationNote:'指南剂量/目标已核验；本院制剂规格与配制方式仍属于库存/药学核对，不影响本卡的临床证据状态。'
    });
  }

  // 3) Acute hypercalcaemia: keep generic all-cause card partial, but add a current HCM-specific branch.
  if(C.topics['急性高钙血症']){
    const t=C.topics['急性高钙血症'];
    t.status='verified-partial';
    t.sourceIds=[...new Set([...(t.sourceIds||[]),'endocrineHCM2022'])];
    t.verificationNote='一般急性高钙仍保留Society 2016急诊框架，因此全病因卡继续“部分核验”；但恶性肿瘤相关高钙已补入Endocrine Society 2022/2023现代分支，二者不会混成一套处方。';
    const extra=[
      '若明确/高度怀疑恶性肿瘤相关高钙（HCM）：Endocrine Society推荐IV双膦酸盐或denosumab；并倾向denosumab优于IV双膦酸盐。',
      '严重HCM（血钙>3.5 mmol/L / 14 mg/dL）：可考虑calcitonin联合IV双膦酸盐或denosumab作为初始治疗；calcitonin因快速耐受仅限48–72小时。',
      'calcitriol介导的HCM（如部分淋巴瘤）首先使用糖皮质激素；仍有严重/症状性高钙时再加IV双膦酸盐或denosumab。'
    ];
    const current=t.steps||[];
    t.steps=[...current,...extra.filter(x=>!current.includes(x))];
  }
  if(C.drugs['唑来膦酸（急性高钙）']){
    const d=C.drugs['唑来膦酸（急性高钙）'];
    d.status='verified-partial';
    d.sourceIds=[...new Set([...(d.sourceIds||[]),'endocrineHCM2022'])];
    d.verificationNote='IV双膦酸盐在恶性肿瘤相关高钙中的治疗地位已由现代Endocrine Society指南确认；现有4 mg/≥15 min数值来自较旧Society急诊指导，肾功能、具体制剂和病因差异仍需按现行说明书/专科方案复核。';
  }

  // 4) Evidence vs inventory: clinical roles can be verified even when the photographed product specification is incomplete.
  if(C.drugs['葡萄糖']){
    Object.assign(C.drugs['葡萄糖'],{
      status:'verified',sourceIds:['adaHospital2026','ada2026'],
      indications:['低血糖：能安全吞咽时首选快速吸收葡萄糖/含葡萄糖碳水','不能安全口服或严重低血糖时可使用静脉葡萄糖；另可使用胰高血糖素'],
      doses:['能安全吞咽的一般成人：约15 g快速碳水/葡萄糖，约15 min后复测。','不能安全吞咽：静脉葡萄糖或胰高血糖素；具体IV葡萄糖浓度、总克数和速度按本院低血糖流程与静脉条件。'],
      cautions:['约每15 min复测并重复处理，直至血糖稳定>3.9 mmol/L，同时处理复发诱因。','抢救车记录的“50%葡萄糖 10 g/支”只代表本院库存规格；ADA并不要求所有严重低血糖固定使用50%浓度。','高浓度葡萄糖外渗可导致组织损伤，使用前核对静脉条件和本院给药规范。'],
      verificationNote:'低血糖使用葡萄糖/IV葡萄糖的临床角色已按ADA 2026核验；本院抢救车50%制剂的每支体积、推注速度属于产品/机构层核对，不再降低临床证据等级。'
    });
  }
  if(C.drugs['碳酸氢钠']){
    Object.assign(C.drugs['碳酸氢钠'],{
      status:'verified',sourceIds:['ahaTox2025','aha2025'],
      verificationNote:'危及生命的TCA/其他钠通道阻滞剂心脏毒性使用碳酸氢钠的临床角色已按AHA 2025核验；常规心搏骤停仍不推荐例行使用。抢救车照片仅有“250 mL”而未确认浓度/总mEq，这是库存规格核对问题，不再把临床卡降为“部分核验”。'
    });
  }

  // UI: visible version/status and explicit verification-note block without changing older clinical.js architecture.
  const esc=(s='')=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const refreshShell=()=>{
    document.querySelectorAll('.version').forEach(x=>x.textContent='v0.19');
    if(document.title) document.title=document.title.replace(/v0\.18/g,'v0.19');
    const banner=document.querySelector('.safety-banner');
    if(banner){
      const page=document.body.dataset.page||'home';
      if(page==='drugs') banner.textContent='⚠ v0.19 已把“指南证据”和“本院库存规格”拆分：临床用途已核验，不代表照片中的浓度/体积已核对。细菌性脑膜炎流程、2022症状性低钠更新和恶性肿瘤相关高钙现代分支已完成本轮复核。';
      else banner.textContent='⚠ 2026-08-19 第四轮既有内容核验：细菌性脑膜炎流程与2022症状性低钠已升级核验；指南证据状态与本院库存/制剂规格状态正式分离。';
    }
    const grid=document.querySelector('.status-grid');
    if(grid){
      const first=grid.firstElementChild;
      if(first) first.innerHTML='<strong>第四轮既有内容核验</strong><span class="status ready">v0.19</span><p>脑膜炎、2022低钠更新与证据/库存状态分层已完成。</p>';
    }
    const panel=document.querySelector('#clinicalVerification');
    if(panel){
      const nums=panel.querySelectorAll('.metric b');
      if(nums[0]) nums[0].textContent=Object.values(C.topics||{}).filter(x=>x.status==='verified').length;
      if(nums[1]) nums[1].textContent=Object.values(C.topics||{}).filter(x=>x.status==='source-bound').length;
      if(nums[2]) nums[2].textContent=Object.values(C.drugs||{}).filter(x=>x.status==='verified').length;
    }
  };
  const injectVerificationNote=()=>{
    const overlay=document.querySelector('#overlay');
    const title=document.querySelector('#modalTitle');
    const content=document.querySelector('#modalContent');
    if(!overlay?.classList.contains('open')||!title||!content||content.querySelector('.v019-verification-note')) return;
    const key=title.textContent.trim();
    const entry=C.topics?.[key]||C.drugs?.[key]||C.algorithms?.[key];
    if(!entry?.verificationNote) return;
    const box=document.createElement('div');
    box.className='clinical-note v019-verification-note';
    box.innerHTML=`<strong>核验说明：</strong>${esc(entry.verificationNote)}`;
    const anchor=content.querySelector('.clinical-meta-line');
    if(anchor) anchor.insertAdjacentElement('afterend',box); else content.prepend(box);
  };
  refreshShell();
  const overlay=document.querySelector('#overlay');
  if(overlay){
    const ob=new MutationObserver(()=>queueMicrotask(injectVerificationNote));
    ob.observe(overlay,{subtree:true,childList:true,attributes:true,attributeFilter:['class','aria-hidden']});
    queueMicrotask(injectVerificationNote);
  }
  window.dispatchEvent(new CustomEvent('clinical-audit-v019-ready'));
})();
