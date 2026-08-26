(() => {
  'use strict';
  const C=window.CLINICAL_DATA;
  const CART=window.CRASH_CART;
  if(!C||!CART)return;

  C.meta=C.meta||{};
  C.meta.verifiedAt='2026-08-18';
  C.meta.auditRevision='v0.17-crash-cart-18-item-audit';
  C.meta.auditNote='按本院抢救车照片中的18个药品/液体逐项复核：区分现代急救指南明确使用、特定场景使用、支持性液体/制剂，以及仅库存记录且未建立现代指南急救映射的条目。';

  const addDrug=(name,data)=>{C.drugs[name]=Object.assign({},C.drugs[name]||{},data);};

  addDrug('利多卡因',{
    status:'verified',sourceIds:['aha2025','ahaAlgorithms2025'],
    indications:['成人 VF/pVT 经除颤仍持续时，可作为胺碘酮的替代抗心律失常药','部分无长 QT 的多形性室速复发可在专科/高级生命支持环境考虑'],
    doses:['心搏骤停 VF/pVT：首剂 1–1.5 mg/kg IV/IO；第二剂 0.5–0.75 mg/kg。'],
    cautions:['不是所有宽 QRS 心动过速的常规首选；有脉患者需先判断稳定性和节律机制。','与胺碘酮在难治性 VF/pVT 中均属于“可考虑”，不要为给药延误除颤和高质量 CPR。']
  });

  addDrug('葡萄糖',{
    status:'verified-partial',sourceIds:['adaHypo2026','ada2026'],
    indications:['不能安全吞咽或严重低血糖时的静脉葡萄糖治疗'],
    doses:['ADA 2026 支持严重/不能口服低血糖使用静脉葡萄糖，但不指定必须使用50%浓度；具体浓度、总克数和给药速度按本院低血糖流程及静脉条件执行。'],
    cautions:['高浓度葡萄糖外渗可造成组织损伤；给药后应约15分钟复测血糖并持续处理复发诱因。','不要把50%葡萄糖的“10 g/支”照片规格自动换算成体积或推注速度，必须核对实物标签。']
  });

  addDrug('葡萄糖酸钙',{
    status:'verified',sourceIds:['rcukElectrolyte2025','sfeHypocalcaemia2019','sfeEmergencyCurrent'],
    indications:['重度高钾伴 ECG 改变时稳定心肌','症状性急性低钙/严重低钙'],
    doses:['高钾 + ECG 改变：RCUK 2025 在无10%氯化钙时可用10%葡萄糖酸钙 30 mL IV约10分钟。','急性低钙：10%葡萄糖酸钙 10–20 mL，稀释后约10分钟 IV，持续 ECG 监护；后续维持按低钙专门流程。'],
    cautions:['高钾与低钙的给药体积/目标不同，不能混用。','照片仅记录“10%葡萄糖酸钙 1 g”，实际安瓿体积必须现场核对后才能套用按mL计的指南剂量。','不同钙盐元素钙含量不同；地高辛使用者/心律失常患者需更严密 ECG 监护。']
  });

  addDrug('碳酸氢钠',{
    status:'verified-partial',sourceIds:['ahaTox2025','aha2025','rcukElectrolyte2025'],
    indications:['危及生命的 TCA/其他钠通道阻滞剂心脏毒性','特定高钾/严重代谢性问题按专门流程处理'],
    doses:['钠通道阻滞剂中毒：AHA 2025 成人初始 50–150 mEq IV；持续液参考 150 mEq/L、1–3 mL/kg/h，并按 QRS、血压、pH、血钠滴定。'],
    cautions:['常规心搏骤停不推荐常规使用碳酸氢钠。','照片只记录“250 mL”，未确认浓度/每瓶总mEq；未核对实物前严禁直接按瓶数替代mEq剂量。','避免 pH>7.55 或血清 Na>155 mEq/L；高钾性心搏骤停的辅助药证据强度与有脉高钾不同。']
  });

  addDrug('0.9%氯化钠',{
    status:'verified-partial',sourceIds:['rcuk2025','niceAdrenal2024','sfeHypercalcaemia'],
    indications:['存在低血容量/循环不足时的等渗晶体液补充','肾上腺危象等特定急症中的复苏液体','部分药物稀释/静脉通路用途'],
    doses:['液体量按具体急症、血流动力学、年龄及心肾功能决定；本卡不把抢救车250 mL包装视为固定复苏剂量。'],
    cautions:['心搏骤停期间仅在低血容量等明确指征时补液，不常规“挂一瓶”。','心衰、肾衰、老年患者警惕容量过负荷。']
  });

  addDrug('5%葡萄糖',{
    status:'verified-partial',sourceIds:['dka2024','sfeHypocalcaemia2019'],
    indications:['DKA/HHS 治疗中血糖下降后为继续胰岛素清除酮体而加入葡萄糖','部分静脉药物/钙剂稀释用途'],
    doses:['具体加入时机和速度按 DKA/HHS 专门卡及血糖、电解质、渗透压动态调整。'],
    cautions:['不是休克/低血容量初始容量复苏液。','需结合血糖、血钠和液体平衡监测。']
  });

  addDrug('地塞米松',{
    status:'verified-partial',sourceIds:['niceMeningitis2024','rcukAna'],
    indications:['强烈怀疑或确诊细菌性脑膜炎的辅助治疗（进入脑膜炎专门路径）'],
    doses:['脑膜炎：最好与首剂抗菌药同时或之前；如延迟不足12小时仍应尽快评估给药。具体成人剂量按本地脑膜炎方案。'],
    cautions:['不能为等待地塞米松而延误抗菌药。','严重过敏反应中肾上腺素是救命一线；糖皮质激素不再作为常规一线 ABC 治疗。','常规心搏骤停使用糖皮质激素的获益不确定。']
  });

  addDrug('呋塞米',{
    status:'verified-partial',sourceIds:['ahaHF2022'],
    indications:['急性心衰/肺水肿且存在明显液体潴留/充血时的静脉袢利尿剂去充血治疗'],
    doses:['起始静脉剂量取决于既往袢利尿剂暴露、肾功能、充血程度和本院路径；不设置抢救车20 mg/支的一刀切“固定急救剂量”。'],
    cautions:['并非所有呼吸困难/肺部啰音都应立即利尿；先判断灌注、容量状态及是否存在 ACS、感染、肺栓塞等。','监测尿量、血压、肌酐、钾/钠/镁及症状变化。']
  });

  addDrug('甘油果糖',{
    status:'inventory-review',sourceIds:[],
    indications:['仅记录为本院抢救车现有库存；本轮未建立基于当前已审计国际急救指南的一线急救映射。'],
    doses:[],
    cautions:['不要仅因抢救车存有该液体，就自动用于意识障碍、卒中或疑似颅内压升高。','具体适应证、禁忌、输注速度及肾功能/容量风险应按该院现行制度和实物说明书单独核验。']
  });

  addDrug('二羟丙茶碱',{
    status:'inventory-review',sourceIds:['gina2026','gold2026'],
    indications:['仅库存记录；本轮未把二羟丙茶碱映射为哮喘/COPD急性发作的现代指南一线急救药。'],
    doses:[],
    cautions:['哮喘/COPD急性气道危象应优先进入现有支气管扩张、氧合/通气和升级监护路径。','如本院仍使用该药，需按具体说明书、本院适应证和不良反应监护标准另行建立本地卡。']
  });

  addDrug('去乙酰毛花苷',{
    status:'inventory-review',sourceIds:['aha2025','af2023'],
    indications:['仅库存记录；当前 AHA 急性房颤/房扑路径提到的是 digoxin（地高辛）等药物，不应把去乙酰毛花苷自动当作同一药物或等效剂量。'],
    doses:[],
    cautions:['出现房颤/房扑伴快速心室率时先判断血流动力学稳定性、预激和左室收缩功能。','预激房颤/房扑不应使用地高辛类房室结阻滞路径；本品若使用必须按本院心内科方案和实物说明书。']
  });

  addDrug('盐酸洛贝林',{
    status:'inventory-review',sourceIds:['aha2025','rcuk2025'],
    indications:['仅库存记录；本轮审计的 AHA/RCUK 2025 成人复苏与呼吸骤停路径未建立洛贝林的常规急救药物位置。'],
    doses:[],
    cautions:['呼吸停止/严重呼吸抑制的首要处理是气道开放、有效通气、氧合并处理病因；不能因准备呼吸兴奋药延误通气或 CPR。','如本院保留使用，应另行核对具体说明书和院内适应证。']
  });

  addDrug('尼可刹米',{
    status:'inventory-review',sourceIds:['aha2025','rcuk2025'],
    indications:['仅库存记录；本轮审计的现代成人复苏路径未建立尼可刹米作为常规心搏/呼吸骤停治疗药物。'],
    doses:[],
    cautions:['呼吸抑制首先保障气道与通气并处理可逆病因。','不要用尼可刹米替代纳洛酮、通气支持或标准 ALS 等有明确适应证的处理。']
  });

  addDrug('酚磺乙胺',{
    status:'inventory-review',sourceIds:['trauma2023'],
    indications:['仅库存记录；本轮严重创伤/大出血主指南未把酚磺乙胺列为替代明确止血措施或氨甲环酸的核心治疗。'],
    doses:[],
    cautions:['严重创伤出血应优先直接压迫/止血带、尽快控制出血源、按大出血流程复苏，并在适应证内早期使用氨甲环酸。','不能因使用酚磺乙胺延误 definitive bleeding control 或规范大量输血/凝血管理。']
  });

  const auditMap={
    '甘油果糖':['review','仅库存·待本院核验','本轮未建立现代急救指南一线映射'],
    '0.9%氯化钠':['support','支持性液体','按病因和容量状态使用'],
    '5%葡萄糖':['support','支持性液体','DKA/HHS后段或稀释等特定用途'],
    '碳酸氢钠':['specific','特定场景','钠通道阻滞/部分高钾；非例行心搏骤停'],
    '盐酸肾上腺素':['core','现代核心急救药','心搏骤停/严重过敏；场景剂量完全不同'],
    '利多卡因':['specific','特定场景','难治性VF/pVT的抗心律失常替代方案'],
    '10%葡萄糖酸钙':['specific','特定场景','高钾ECG改变/急性低钙；剂量场景不同'],
    '盐酸多巴胺':['specific','特定场景','阿托品无效症状性心动过缓桥接'],
    '50%葡萄糖':['specific','特定场景','严重低血糖可用IV葡萄糖；50%浓度方案本地化'],
    '盐酸胺碘酮':['core','现代核心/特定节律','VF/pVT与有脉宽QRS剂量不同'],
    '二羟丙茶碱':['review','仅库存·待本院核验','未映射为哮喘/COPD现代一线急救药'],
    '去乙酰毛花苷':['review','仅库存·待本院核验','不可自动等同当前指南中的digoxin'],
    '盐酸洛贝林':['review','仅库存·待本院核验','不能替代气道/通气/ALS'],
    '尼可刹米':['review','仅库存·待本院核验','不能替代通气/病因特异处理'],
    '硫酸阿托品':['core','现代核心急救药','症状性心动过缓；中毒场景剂量另算'],
    '酚磺乙胺':['review','仅库存·待本院核验','不能替代创伤明确止血和TXA路径'],
    '地塞米松磷酸钠':['specific','特定场景','细菌性脑膜炎辅助；非过敏反应一线'],
    '呋塞米':['specific','特定场景','充血性急性心衰/肺水肿去充血']
  };

  const keyMap={
    '0.9%氯化钠':'0.9%氯化钠','5%葡萄糖':'5%葡萄糖','碳酸氢钠':'碳酸氢钠','利多卡因':'利多卡因',
    '10%葡萄糖酸钙':'葡萄糖酸钙','50%葡萄糖':'葡萄糖','二羟丙茶碱':'二羟丙茶碱','去乙酰毛花苷':'去乙酰毛花苷',
    '盐酸洛贝林':'盐酸洛贝林','尼可刹米':'尼可刹米','酚磺乙胺':'酚磺乙胺','地塞米松磷酸钠':'地塞米松','呋塞米':'呋塞米','甘油果糖':'甘油果糖'
  };

  CART.drugs.forEach(item=>{
    if(keyMap[item.name])item.clinicalKey=keyMap[item.name];
    const a=auditMap[item.name];
    if(a)item.audit={tier:a[0],label:a[1],note:a[2],auditedAt:'2026-08-18'};
  });

  function numberFrom(text){const m=String(text||'').match(/([\d.]+)/);return m?Number(m[1]):NaN;}
  function dynamicWarning(item){
    if(item.name==='硫酸阿托品'){
      const mg=numberFrom(item.spec),n=numberFrom(item.qty);
      if(Number.isFinite(mg)&&Number.isFinite(n)){
        const total=mg*n;
        if(total<3)return `当前记录总量约 ${total} mg；低于 AHA 2025 成人症状性心动过缓算法最大累计量 3 mg。此提示仅用于盘点复核，不自动决定本院备药基数。`;
      }
    }
    if(item.name==='盐酸肾上腺素')return '照片规格仅记录为“1 mg”；严重过敏需核对实物是否为 1 mg/mL 制剂，绝不能仅凭“1 mg/支”直接套用给药体积。';
    if(item.name==='碳酸氢钠')return '照片未记录碳酸氢钠浓度/每瓶总 mEq；使用任何 mEq 剂量前必须核对实物标签。';
    if(item.name==='10%葡萄糖酸钙')return '照片记录“10% / 1 g”，但指南按 mL 给药；必须核对每支实际体积。';
    return '';
  }

  window.CRASH_CART_AUDIT={version:'v0.17',auditedAt:'2026-08-18',get:item=>({...(item.audit||{}),warning:dynamicWarning(item)}),counts:()=>{
    const out={core:0,specific:0,support:0,review:0};
    CART.drugs.forEach(x=>{const t=x.audit?.tier;if(t&&out[t]!==undefined)out[t]++;});return out;
  }};
})();