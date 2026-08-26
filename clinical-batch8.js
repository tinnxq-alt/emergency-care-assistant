(() => {
  const C=window.CLINICAL_DATA;
  if(!C) return;

  Object.assign(C.sources,{
    nicePneumonia2025:{name:'NICE NG250 Pneumonia: diagnosis and management',year:'2025 / Jan 2026 update',org:'NICE',url:'https://www.nice.org.uk/guidance/ng250',note:'2025 consolidated pneumonia guideline; January 2026 minor update to adult antibiotic/corticosteroid wording.'},
    niceAKI2024:{name:'NICE NG148 Acute kidney injury: prevention, detection and management',year:'2019 / updated 2024',org:'NICE',url:'https://www.nice.org.uk/guidance/ng148',note:'Current NICE AKI guideline; contrast-associated AKI recommendations updated October 2024.'},
    nicePyelo2024:{name:'NICE NG111 Pyelonephritis (acute): antimicrobial prescribing',year:'2018 / safety table updated 2024',org:'NICE',url:'https://www.nice.org.uk/guidance/ng111',note:'Antimicrobial table updated September 2024 for fluoroquinolone safety advice.'},
    gold2026:{name:'GOLD 2026 Report and Pocket Guide',year:'2026',org:'Global Initiative for Chronic Obstructive Lung Disease',url:'https://goldcopd.org/2026-gold-report-and-pocket-guide/',note:'Current GOLD COPD strategy and pocket guide; detailed local drug/device implementation still requires local formulary verification.'}
  });

  Object.assign(C.topics,{
    '社区获得性肺炎（成人）':{
      status:'verified',sourceIds:['nicePneumonia2025'],
      summary:'成人社区获得性肺炎应同时评估氧合、循环、意识和脓毒症风险，并用 CRB65/CURB65 辅助决定照护层级；严重征象优先处理，不因评分低而忽略临床恶化。',
      redFlags:['呼吸衰竭或明显低氧','SBP≤90 mmHg 或循环灌注不良','新发意识改变','脓毒症/休克表现','无法口服或快速恶化','高严重度 CAP 或重要基础病'],
      steps:['院外/基层首诊：结合临床判断与 CRB65；CRB65≥2 通常应转医院，CRB65=1 结合合并症、妊娠、社会支持与可用医疗资源决定升级。','住院成人临床诊断 CAP 后使用 CURB65 评估死亡风险，并结合 NEWS/器官功能和整体临床状态决定普通病房、监护或 ICU。','医院应尽快完成胸部影像；NICE 目标为到院 4 小时内完成 CAP 诊断流程，确认肺炎后抗菌治疗也应尽快并在 4 小时内启动。','中高严重度 CAP 根据病情考虑血培养、痰培养、肺炎球菌/军团菌尿抗原等；低严重度患者不常规进行广泛微生物检查。','成人 CAP 抗菌疗程通常 5 天，除非微生物学或临床不稳定提示需要延长；IV 抗菌药 48 小时复评并尽可能序贯口服。','高严重度住院 CAP 可考虑在抗菌药基础上短程全身糖皮质激素；具体药物、剂量和禁忌证按本机构方案和患者风险复核。'],
      target:'持续复评呼吸频率、SpO₂、血压、心率、体温、意识、进食能力及临床趋势；出现呼吸/循环衰竭或脓毒症立即升级。',
      caution:'CRB65/CURB65 是风险辅助工具，不是排除重症的工具；疑似脓毒症时进入脓毒症专门路径。抗菌药选择应结合本地耐药谱、过敏史、近期抗菌药和微生物结果。'
    },
    '急性肾损伤':{
      status:'verified',sourceIds:['niceAKI2024'],
      summary:'AKI 的基层急诊重点是尽早识别肌酐/尿量变化、寻找可逆病因、评估容量和梗阻、停/调潜在肾毒性药物，并识别需要立即肾脏/重症支持的并发症。',
      redFlags:['难治性高钾','难治性代谢性酸中毒','尿毒症并发症（如心包炎/脑病）','难治性液体负荷或肺水肿','无尿/进行性少尿','梗阻性 AKI 合并感染、孤立肾或双侧梗阻'],
      steps:['诊断线索：48 小时内血肌酐上升≥26 μmol/L，或 7 天内较基线上升≥50%，或成人尿量<0.5 mL/kg/h 持续>6 小时。','立即回顾基线肾功能、容量状态、感染/休克、尿路梗阻、近期造影和 NSAIDs、ACEI/ARB、利尿剂、氨基糖苷等药物。','所有疑似/确诊 AKI 尽早尿试纸检查血、蛋白、白细胞、亚硝酸盐和葡萄糖；病因不明或有梗阻风险时安排泌尿系超声。','疑似脓肾/感染性梗阻时超声应急，NICE 建议评估后 6 小时内；病因不明或有梗阻风险时通常 24 小时内完成超声。','纠正低血容量/低灌注、治疗感染和梗阻；不常规使用袢利尿剂“治疗 AKI”，仅在液体负荷等特定场景考虑。','若高钾、酸中毒、尿毒症并发症、液体负荷或肺水肿对药物治疗无反应，应立即联系肾脏科/重症并评估肾替代治疗。'],
      reassess:'住院期间按临床需要重复肌酐、电解质、尿量和液体平衡；病情不稳定者需要更频密监测。',
      caution:'开始肾替代治疗不能只看单个尿素、肌酐或血钾数字，应基于患者整体临床状态。紧急且有明确获益的造影检查不应因 AKI 风险被不合理延误。'
    },
    '急性肾盂肾炎':{
      status:'verified-partial',sourceIds:['nicePyelo2024'],
      summary:'急性肾盂肾炎需在抗菌治疗前尽量留取尿培养，判断是否存在脓毒症、脱水、妊娠、免疫抑制或尿路结构异常，并根据病情选择口服、静脉治疗或转院。',
      redFlags:['脓毒症或血流动力学不稳','持续呕吐/不能口服','明显脱水','妊娠','糖尿病/免疫抑制','已知或疑似尿路梗阻/结构异常','治疗 48 小时仍无改善或恶化'],
      steps:['成人尽量在首剂抗菌药前留取中段尿培养和药敏；严重感染时同时按脓毒症路径评估血培养、乳酸和器官功能。','可口服且病情不重者优先口服抗菌药；呕吐、不能口服或严重全身感染者考虑 IV 抗菌药并住院/转诊。','抗菌药选择必须结合当地耐药谱、既往尿培养、近期抗菌药、肾功能、妊娠和过敏史；培养结果返回后尽量窄谱化。','IV 抗菌药通常在 48 小时复评，病情允许时转为口服。','出现脓毒症、显著脱水、妊娠或高并发症风险时应转医院/专科；疑似感染性梗阻需尽快泌尿外科/影像评估。'],
      caution:'不把单纯腰痛/尿频自动诊断为肾盂肾炎。氟喹诺酮类因严重且可能持久的不良反应受到更严格限制；本卡不设“一刀切”首选药，具体方案按本地抗菌药政策。'
    }
  });

  // Upgrade the previously source-bound COPD card without hard-coding local formulary details.
  if(C.topics['COPD急性加重']){
    Object.assign(C.topics['COPD急性加重'],{
      status:'source-bound',sourceIds:['gold2026'],
      summary:'COPD 急性加重首先评估呼吸功、氧合/通气、意识和循环，寻找感染、心衰、肺栓塞、气胸等替代或并存病因；2026 GOLD 为当前主来源。',
      redFlags:['静息严重呼吸困难或进行性呼吸衰竭','意识改变/嗜睡','低氧或高碳酸血症恶化','血流动力学不稳','新发发绀/外周水肿','疑似肺炎、肺栓塞、气胸或急性心衰'],
      steps:['给予短效支气管扩张治疗并根据病情联合抗胆碱能药；氧疗应目标化并复查血气/通气状态。','中重度急性加重通常需要短程全身糖皮质激素；抗菌药仅在符合感染指征或需机械通气等场景使用。','出现急性高碳酸性呼吸衰竭且无禁忌证时尽早评估无创通气；失败或存在气道保护问题时升级有创通气/重症支持。','同时主动排查肺炎、心衰、肺栓塞、气胸、心律失常等导致“COPD样恶化”的其他急症。'],
      caution:'本卡暂不硬编码统一氧流量、激素剂量和抗菌方案；应结合血气、既往 CO₂ 潴留、设备、当地方案和具体药品说明书。'
    });
  }

  Object.assign(C.algorithms,{
    '肺炎严重度与转诊流程':{status:'verified',sourceIds:['nicePneumonia2025'],points:['识别低氧、休克、意识改变、脓毒症等立即升级征象。','基层成人 CAP 用 CRB65 + 临床判断辅助决定照护层级；CRB65≥2 通常转医院。','住院使用 CURB65 并结合 NEWS/器官功能决定病房层级。','医院尽快影像确诊并在确认后尽快、目标 4 小时内启动抗菌治疗。','48 小时复评 IV→口服可能性与微生物结果。']},
    'AKI快速评估流程':{status:'verified',sourceIds:['niceAKI2024'],points:['确认肌酐/尿量变化是否符合 AKI。','评估容量、感染/休克、肾毒药物和尿路梗阻。','尿试纸；必要时 6–24 小时内完成泌尿系超声。','处理低灌注、感染、梗阻和电解质/酸碱异常。','难治性高钾、酸中毒、尿毒症、液体负荷/肺水肿立即评估 RRT。']}
  });
})();
