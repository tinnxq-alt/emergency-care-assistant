(() => {
  const C = window.CLINICAL_DATA;
  if (!C) return;

  Object.assign(C.sources, {
    esoSah2026: {
      name:'2026 ESO/EANS/ESMINT Guideline on Aneurysmal Subarachnoid Haemorrhage',
      year:'2026',
      org:'ESO / EANS / ESMINT',
      url:'https://academic.oup.com/esj/article/11/5/aakag043/8671382',
      note:'2026-05 发布的欧洲联合指南；用于动脉瘤处理、尼莫地平、再出血/DCI 与系统化神经重症管理。'
    },
    ahaSah2023: {
      name:'2023 AHA/ASA Guideline for Aneurysmal Subarachnoid Hemorrhage',
      year:'2023',
      org:'AHA / ASA',
      url:'https://professional.heart.org/en/science-news/2023-guideline-for-the-management-of-patients-with-aneurysmal-subarachnoid-hemorrhage',
      note:'用于急性评估、24 小时内处理破裂动脉瘤、血流动力学、脑积水、癫痫和迟发性脑缺血。'
    },
    nimodipineLabel: {
      name:'Nimodipine Oral Solution — US Prescribing Information',
      year:'2024 label',
      org:'DailyMed / U.S. National Library of Medicine',
      url:'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f829de8b-fabd-4aec-ac8d-c9aaef7be55b',
      note:'用于核对尼莫地平给药途径、剂量、疗程和低血压警示；具体国内制剂仍需核对本地说明书。'
    }
  });

  C.topics['动脉瘤性蛛网膜下腔出血'] = {
    status:'verified',
    sourceIds:['esoSah2026','ahaSah2023','nimodipineLabel'],
    summary:'突发雷击样头痛或伴意识下降、呕吐、颈抵抗、癫痫/局灶神经缺损时应高度警惕蛛网膜下腔出血。确诊动脉瘤性 SAH 后，应尽快进入神经血管中心路径，早期封闭破裂动脉瘤并预防再出血与迟发性脑缺血。',
    redFlags:[
      '突发、迅速达到高峰的“雷击样”剧烈头痛',
      '头痛伴意识下降、晕厥或进行性神经恶化',
      '呕吐、颈抵抗/脑膜刺激征、畏光',
      '新发癫痫、局灶神经功能缺损或动眼神经麻痹',
      '已知颅内动脉瘤背景下的新发剧烈头痛'
    ],
    steps:[
      '立即 ABC 评估，记录发病/最后正常时间、抗凝/抗血小板药使用、血压和神经功能；低氧、低血压和明显血压波动均应避免。',
      '高度疑似 SAH 时尽快完成头颅非增强 CT；若初始影像未能解释但临床怀疑仍高，应继续进入 SAH 专门诊断路径（结合发病时间、影像质量、本地条件选择进一步脑脊液/血管影像评估），不能仅凭一次阴性检查草率排除。',
      '一旦发现 SAH，应尽快行脑血管成像寻找责任动脉瘤，并尽早联系具备神经介入/神经外科与神经重症能力的中心。',
      '破裂动脉瘤应尽快处理；AHA/ASA 2023 与 ESO/EANS/ESMINT 2026 均支持在条件允许时于发病后 24 小时内完成动脉瘤治疗。能够完全闭塞时应以降低再出血风险为目标。',
      '尽早开始肠内尼莫地平以降低迟发性脑缺血风险并改善功能结局；维持正常容量状态，避免预防性高容量治疗。',
      '持续监测迟发性脑缺血/血管痉挛：任何新发局灶体征、意识下降或无法解释的神经恶化都应立即升级评估；TCD、CTA、CTP 等可作为专科监测工具。',
      '出现症状性迟发性脑缺血时，在维持正常容量的前提下，专科监护下升高血压可有益；不建议对无症状患者常规预防性血流动力学增压。',
      '急性脑积水伴意识恶化属于神经急症，应立即联系神经外科/神经重症团队评估脑脊液引流。',
      '新发癫痫应治疗；无高危特征者不常规预防性抗癫痫。高危患者可个体化考虑短期预防，苯妥英与较差结局相关，应避免常规使用。'
    ],
    doses:[
      '尼莫地平：60 mg 口服/胃管，每 4 小时 1 次，共 21 天；官方标签要求在 SAH 后 96 小时内开始。',
      '尼莫地平只能肠内给药（口服、鼻胃管或胃管）；严禁静脉或其他肠外给药。'
    ],
    target:'动脉瘤未封闭前不设一个适用于所有人的固定血压数字：目标是减少明显高血压与血压波动，同时避免低血压和脑灌注不足；使用可滴定短效药物并结合患者原有血压、颅内压、肾功能和神经状态个体化。',
    caution:'常规抗纤溶治疗未改善功能结局，2026 欧洲联合指南不推荐常规使用。常规他汀或静脉镁亦不用于预防迟发性脑缺血。尼莫地平可致低血压，治疗中应密切监测血压；具体制剂规格、肝功能异常及药物相互作用需按本地说明书复核。'
  };

  C.drugs['尼莫地平'] = {
    status:'verified',
    sourceIds:['esoSah2026','ahaSah2023','nimodipineLabel'],
    indications:['动脉瘤性蛛网膜下腔出血后改善神经功能结局、降低迟发性缺血性神经损害风险。'],
    doses:['成人：60 mg 口服/鼻胃管/胃管，每 4 小时 1 次，连续 21 天；在 SAH 后 96 小时内开始。'],
    cautions:[
      '仅限肠内给药；严禁静脉或其他肠外给药。',
      '可引起明显低血压，治疗期间需监测血压和脉搏；出现低血压时应由神经重症/神经血管团队个体化调整。',
      '强 CYP3A4 抑制剂可增加低血压风险，强诱导剂可降低疗效；需核对相互作用。',
      '美国标签中肝硬化患者推荐减量至 30 mg 每 4 小时；国内具体制剂与特殊人群方案应以本地说明书/院内规范为准。'
    ]
  };
})();
