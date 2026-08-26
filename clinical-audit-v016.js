(() => {
  'use strict';
  const C = window.CLINICAL_DATA;
  if (!C) return;

  C.meta = C.meta || {};
  C.meta.verifiedAt = '2026-08-18';
  C.meta.auditRevision = 'v0.16-electrolyte-toxicology-cardiovascular-audit';
  C.meta.auditNote = '第二轮既有内容深审：高钾/低钠/低钙/高钙、钠通道阻滞剂/β阻滞剂/钙通道阻滞剂中毒、高血压急症、急性心衰/肺水肿、急性主动脉综合征及 COPD 来源状态。';

  Object.assign(C.sources, {
    ahaBP2025: {
      name:'2025 ACC/AHA Multisociety Guideline for High Blood Pressure in Adults',
      year:'2025',
      org:'ACC/AHA and partner societies',
      url:'https://www.ahajournals.org/doi/10.1161/CIR.0000000000001356',
      note:'用于高血压急症定义、急性靶器官损害、主动脉夹层与急性肺水肿的静脉降压策略。'
    },
    sfeEmergencyCurrent: {
      name:'Society for Endocrinology Guidance — Endocrine Emergencies',
      year:'current page; hyponatraemia update listed 2022',
      org:'Society for Endocrinology',
      url:'https://www.endocrinology.org/clinical-practice/clinical-guidance/society-for-endocrinology-guidance/',
      note:'当前 Society 页面仍列出低钠 2022 更新、急性低钙 2016/2019 addendum 与急性高钙 2016 急诊指导。'
    }
  });

  if (C.topics['高钾血症']) {
    Object.assign(C.topics['高钾血症'], {
      status:'verified',
      sourceIds:['rcukElectrolyte2025','ahaTox2025'],
      summary:'中重度高钾需同步稳定心肌、把钾移入细胞、促进钾清除并持续复测。RCUK 2025 提供明确非心搏骤停处置剂量；AHA 2025 对“高钾性心搏骤停时额外给予钙/碳酸氢钠是否改善结局”则明确认为人体证据仍不确定，因此两套信息必须分层显示。',
      redFlags:['K >6.5 mmol/L','高钾相关 ECG 改变','进行性肌无力、心动过缓或传导异常','肾衰/透析患者伴快速升钾','心搏骤停或围心搏骤停'],
      steps:[
        '持续 ECG，复核血钾并评估溶血假性高钾、肾功能、酸碱状态、药物和组织破坏等原因；严重心电改变时不等待重复检验才开始救治。',
        'RCUK 2025：中度（6.0–6.4 mmol/L）和重度（>6.5 mmol/L）高钾给予可溶性/短效胰岛素 10 U + 葡萄糖 25 g IV；治疗后严密监测低血糖。',
        '若治疗前血糖 <7 mmol/L，RCUK 2025 建议随后 10% 葡萄糖 50 mL/h 持续 5 h，以降低迟发低血糖风险。',
        '雾化沙丁胺醇 10–20 mg 可作为胰岛素-葡萄糖的辅助治疗，不能单独依赖。',
        '重度高钾伴 ECG 改变：RCUK 2025 使用 10% 氯化钙 10 mL IV 约 5 min；若无氯化钙，可用 10% 葡萄糖酸钙 30 mL 约 10 min。钙剂用于稳定心肌，不直接降低血钾。',
        '同步评估从体内清除钾：停致病药、处理酸中毒/组织破坏，按肾脏方案使用钾结合剂；难治性重度高钾或严重肾衰尽早透析。',
        '若已发生心搏骤停，优先标准高质量 ALS。RCUK 2025 给出氯化钙 + 碳酸氢钠路径；AHA 2025 同时指出这两项在疑似高钾心搏骤停中的人体结局获益尚未确定，因此不得为准备这些辅助治疗中断 CPR，并应按本地 ALS/肾脏急救流程执行。'
      ],
      doses:[
        '非心搏骤停中重度高钾：短效/可溶性胰岛素 10 U + 葡萄糖 25 g IV。',
        '若治疗前血糖 <7 mmol/L：随后 10% 葡萄糖 50 mL/h × 5 h（RCUK 2025）。',
        '雾化沙丁胺醇 10–20 mg，作为辅助。',
        '重度高钾 + ECG 改变：10% CaCl₂ 10 mL IV / 5 min；无 CaCl₂ 时 10% calcium gluconate 30 mL / 10 min。'
      ],
      reassess:'连续 ECG；胰岛素-葡萄糖后按机构高钾流程频繁复测血糖与血钾，警惕迟发低血糖和反跳高钾；治疗效果不足时尽快升级肾脏/重症并评估透析。',
      caution:'高钾“有脉患者”的钙剂/胰岛素处置证据与“高钾性心搏骤停”的证据强度不同。不要把 RCUK 的心搏骤停辅助药当作替代标准 CPR/除颤/可逆病因处理的措施。'
    });
  }

  if (C.topics['严重症状性低钠血症']) {
    Object.assign(C.topics['严重症状性低钠血症'], {
      status:'verified-partial',
      sourceIds:['sfeEmergencyCurrent','sfeHyponatraemia'],
      summary:'低钠急救由神经症状严重程度和发生速度驱动，而不是只看一个血钠数值。Society for Endocrinology 当前指导页仍列出 2022 年“严重及中度严重症状性低钠”更新；现有高渗盐水路径继续保留，但制剂配制与纠正上限必须按本院标准化方案执行。',
      steps:[
        '立即 ABCDE、床旁血糖、监护并复测血钠；同时评估药物、SIADH、低容量、肾/心/肝衰竭及肾上腺功能不全等病因，但病因鉴别不能延误严重神经症状的急救。',
        '严重神经症状时，现有 Society/European 急诊路径使用 3% NaCl 150 mL IV 约 20 min，并依据神经症状与复测血钠决定是否重复；初始目标是约 +5 mmol/L，而不是快速纠正至正常。',
        '达到初始神经学目标后应停止或显著放慢高渗治疗，频繁复测血钠、尿量与液体平衡，警惕突然水利尿导致过度纠正。',
        '若纠正速度逼近或超过机构设定安全上限，应立即停止进一步高渗盐水并请内分泌/肾脏/重症团队处理；慢性低钠、营养不良、酒精依赖、低钾和晚期肝病患者应采用更保守上限。'
      ],
      doses:['3% NaCl：150 mL IV 约 20 min；仅在标准化高渗盐水制剂和可频繁复测血钠的监护环境执行。'],
      target:'先解除脑水肿/严重神经症状危险，初始血钠上升约 5 mmol/L 即应重新评估；后续目标是避免过度纠正，而不是尽快达到正常血钠。',
      caution:'本卡继续保持“部分核验”：Society 当前页面确认 2022 更新仍有效，但不同地区高渗盐水制剂、输注泵和过度纠正救援方案存在机构差异；不得在无法快速复测血钠的环境机械执行。'
    });
  }

  if (C.topics['急性低钙血症']) {
    Object.assign(C.topics['急性低钙血症'], {
      status:'verified',
      sourceIds:['sfeEmergencyCurrent','sfeHypocalcaemia2019'],
      summary:'急性低钙在出现症状或校正钙 <1.9 mmol/L 时可危及生命。Society for Endocrinology 的急诊指导及 2019 addendum 仍支持 ECG 监护下静脉葡萄糖酸钙，并强调不同钙盐不能按相同体积互换。',
      redFlags:['手足搐搦或喉痉挛','抽搐','QT 延长或心律失常','校正钙 <1.9 mmol/L','甲状腺/甲状旁腺术后快速下降或合并低镁'],
      steps:[
        '检测离子钙/校正钙、Mg、P、肾功能、PTH 与维生素 D；有严重症状时不要等待全部结果才补钙。',
        '10% calcium gluconate 10–20 mL 加入 50–100 mL 5% glucose，约 10 min IV，并持续 ECG 监护；症状未缓解可重复。',
        '需要持续补钙时：10% calcium gluconate 100 mL 加入 1 L 0.9% NaCl 或 5% glucose，约 50–100 mL/h 起始并按症状/血钙滴定。',
        '同步纠正低镁和病因。使用地高辛、已有心律失常、严重肾功能异常者需更严密 ECG/电解质监测。'
      ],
      doses:['10% calcium gluconate 10–20 mL + 50–100 mL 5% glucose，IV 约 10 min，ECG 监护；可按症状重复。','维持：10% calcium gluconate 100 mL 加入 1 L NS 或 D5W，50–100 mL/h 起始，按复测滴定。'],
      caution:'Calcium chloride 静脉刺激性更强，Society 指导通常要求中心静脉使用；不同钙盐所含元素钙不同，绝不能把“10%”视为元素钙等量。'
    });
  }

  if (C.topics['急性高钙血症']) {
    Object.assign(C.topics['急性高钙血症'], {
      status:'verified-partial',
      sourceIds:['sfeEmergencyCurrent','sfeHypercalcaemia'],
      summary:'严重/有症状高钙常伴脱水、AKI、意识改变或心律失常。Society for Endocrinology 当前仍列出 2016 急诊指导：先评估并纠正容量不足，再根据病因和肾功能选择抗骨吸收治疗。由于指导年份较早且现代肿瘤性高钙治疗选择已扩展，本卡维持部分核验。',
      redFlags:['校正钙 >3.5 mmol/L','意识障碍/昏迷','心律失常或明显 QT 缩短','严重脱水、少尿或 AKI'],
      steps:[
        '确认校正钙/离子钙并检测 PTH、磷、肾功能；同时评估肿瘤、甲状旁腺功能亢进、维生素 D 相关等原因。',
        '容量不足且能耐受补液者使用 0.9% NaCl。Society 急诊指导给出 4–6 L/24 h 的参考总量，但这绝不是固定处方；老年、心衰、肾衰患者需显著减慢并频繁复评容量。',
        '袢利尿剂不用于常规“降钙”；仅在补液后发生容量负荷时考虑。严重肾衰或无法安全补液者应尽早联系肾脏/重症并评估透析。',
        '补液后仍需进一步降钙时可考虑 IV bisphosphonate；zoledronic acid 4 mg IV ≥15 min 是 Society 指导列出的方案之一，肾功能异常需按说明书/本地方案减量或延长输注。',
        'calcitonin、denosumab、糖皮质激素或其他治疗取决于病因与既往治疗，应由内分泌/肾脏/肿瘤团队选择。'
      ],
      doses:['0.9% NaCl：Society 旧版急诊指导参考 4–6 L/24 h，仅适用于能够耐受的容量不足患者并需动态调整。','Zoledronic acid：4 mg IV ≥15 min（需结合肾功能、适应证、说明书和本地流程）。'],
      caution:'不要机械执行 4–6 L/24 h；心衰、肾衰、老年患者可能发生严重容量负荷。袢利尿剂不是常规降钙药。'
    });
  }

  if (C.topics['三环类/钠通道阻滞剂中毒']) {
    Object.assign(C.topics['三环类/钠通道阻滞剂中毒'], {
      status:'verified',
      sourceIds:['ahaTox2025'],
      summary:'TCA 及其他危及生命的钠通道阻滞剂中毒可导致 QRS 增宽、低血压、惊厥和室性心律失常。AHA 2025 明确支持成人危及生命 TCA/四环类心脏毒性使用碳酸氢钠，并在官方解毒剂量表给出成人起始和持续输注范围。',
      steps:[
        'ABCDE、连续 ECG、血气、电解质和血糖监测，并尽早联系毒理/重症。',
        '成人危及生命的 TCA/四环类心脏毒性应使用碳酸氢钠；其他危及生命的钠通道阻滞剂心脏毒性也可合理使用。',
        '机械通气患者可在专科监护下联合适度过度通气与碳酸氢钠；疗效更重视 QRS、低血压和灌注改善，同时控制酸碱。',
        '持续难治性心源性休克可考虑 ECLS/VA-ECMO；Ia/Ic 类钠通道阻滞剂严重心脏毒性可考虑 lidocaine。ILE 仅作为其他治疗失败后的救援选择。'
      ],
      doses:['AHA 2025 成人 sodium bicarbonate：初始 50–150 mEq IV；持续液配制浓度 150 mEq/L，参考输注 1–3 mL/kg/h，并按 ECG、灌注、pH 与血钠滴定。'],
      reassess:'连续 ECG、血压、血气、电解质和血钠；以 QRS 缩窄/低血压改善等生理终点为核心，并防止医源性极端碱血症/高钠。',
      caution:'AHA 指出最佳剂量并非在所有毒物中都已确定；避免 pH >7.55、血清 Na >155 mEq/L。具体制剂浓度、重复 bolus 与持续输注仍应由毒理/重症团队协议化执行。'
    });
  }

  if (C.drugs['碳酸氢钠（钠通道阻滞）']) {
    Object.assign(C.drugs['碳酸氢钠（钠通道阻滞）'], {
      status:'verified',sourceIds:['ahaTox2025'],
      indications:['TCA/四环类抗抑郁药危及生命的心脏毒性','其他危及生命钠通道阻滞导致 QRS 增宽、低血压或室性心律失常'],
      doses:['成人初始：50–150 mEq IV（AHA 2025 critical-poisoning dose table）。','持续液：150 mEq/L，参考 1–3 mL/kg/h；根据 QRS、血压/灌注、pH 和血钠滴定。'],
      cautions:['连续 ECG、血气、电解质和血钠监测。','避免 pH >7.55、血清 Na >155 mEq/L。','不同碳酸氢钠制剂浓度和配液方式需按实物标签/本院药学流程复核。','不是所有宽 QRS 都适用；必须确认毒物机制并尽早毒理会诊。']
    });
  }

  if (C.topics['β受体阻滞剂中毒']) {
    Object.assign(C.topics['β受体阻滞剂中毒'], {
      status:'verified',sourceIds:['ahaTox2025'],
      summary:'危及生命 β 阻滞剂中毒可导致心动过缓、传导阻滞、低血压/心源性休克和低血糖。AHA 2025 推荐血管活性药，并在其难治性低血压时使用高剂量胰岛素/正常血糖治疗；胰高血糖素 bolus + infusion 为合理辅助方案。',
      steps:[
        '持续 ECG、血压、血糖、钾和灌注监测；确认具体药物、缓释制剂与共摄入。',
        '低血压先给予快速可滴定的血管活性药支持；若仍难治，AHA 2025 应给予高剂量胰岛素/正常血糖治疗。',
        '症状性心动过缓或低血压可考虑 glucagon bolus 后持续输注；大剂量 glucagon 常引起恶心/呕吐，需关注气道。',
        '难治性心源性休克可考虑 ECLS/VA-ECMO；atenolol、nadolol、sotalol 危及生命中毒可评估血液透析。',
        'propranolol 可兼有钠通道阻滞，sotalol 可影响钾通道；宽 QRS/QT 延长时需按额外毒理机制处理。'
      ],
      doses:['高剂量 regular human insulin：成人初始 1 U/kg IV；随后 1–10 U/kg/h，按血流动力学滴定并配套葡萄糖/钾监测。','Glucagon：成人初始 2–10 mg IV；随后 1–15 mg/h（AHA 2025 Table 4；主要用于 β 阻滞剂中毒的合理辅助治疗）。'],
      caution:'高剂量胰岛素必须协议化监测血糖、钾和液体负荷；这些剂量远超常规降糖用途，应在持续监护、快速实验室复测和毒理/重症支持条件下执行。'
    });
  }

  if (C.topics['钙通道阻滞剂中毒']) {
    Object.assign(C.topics['钙通道阻滞剂中毒'], {
      status:'verified',sourceIds:['ahaTox2025'],
      summary:'危及生命 CCB 中毒可产生严重心动过缓、负性肌力和/或血管扩张性休克。AHA 2025 明确推荐低血压时高剂量胰岛素和血管活性药，并认为静脉钙剂合理。',
      steps:[
        '持续 ECG、血压、血糖、钾、离子钙、酸碱和灌注监测；缓释制剂可导致延迟和长时间毒性。',
        '危及生命 CCB 中毒低血压时给予血管活性药，并启动高剂量胰岛素/正常血糖治疗。',
        '静脉钙剂可作为联合治疗；AHA 2025 的 critical-poisoning dose table 提供成人 calcium chloride / calcium gluconate 负荷和持续范围，必须按离子钙和血流动力学滴定。',
        '药物治疗难治的休克/心搏骤停尽早评估 ECLS/VA-ECMO。',
        'CCB 中毒中 glucagon、methylene blue 和 IV lipid emulsion 的获益不确定，不应替代高剂量胰岛素、血管活性药和高级循环支持。'
      ],
      doses:[
        '高剂量 regular human insulin：成人初始 1 U/kg IV；随后 1–10 U/kg/h，按血流动力学滴定并配套葡萄糖/钾监测。',
        'Calcium chloride：成人初始 2000 mg（10% 溶液 20 mL）；持续参考 20–40 mg/kg/h。',
        'Calcium gluconate：成人初始 6000 mg（10% 溶液 60 mL）；持续参考 60–120 mg/kg/h。'
      ],
      reassess:'连续血流动力学、ECG、血糖、钾和离子钙监测；AHA Table 4 提醒离子钙不宜超过正常上限约 1.5–2 倍。',
      caution:'毒理性高剂量钙与普通低钙补充剂量不是同一路径；不要把 calcium chloride 与 calcium gluconate 按等体积替换。持续钙输注、中心静脉需求及局部制剂浓度应按本院毒理/药学协议执行。'
    });
  }

  if (C.drugs['高剂量胰岛素（BB/CCB中毒）']) {
    Object.assign(C.drugs['高剂量胰岛素（BB/CCB中毒）'], {
      status:'verified',sourceIds:['ahaTox2025'],
      indications:['危及生命 CCB 中毒导致低血压/休克','危及生命 β 阻滞剂中毒经血管活性药仍顽固低血压'],
      doses:['Regular human insulin：成人初始 1 U/kg IV。','随后 1–10 U/kg/h 持续输注，按血流动力学反应滴定；同步葡萄糖支持与频繁血糖/钾监测。'],
      cautions:['剂量远超常规降糖用途，仅限危重中毒监护环境。','显著低血糖和低钾风险。','大剂量葡萄糖支持可造成容量负荷。','必须配置高频血糖、电解质和血流动力学复测，并尽早毒理/重症会诊。']
    });
  }

  if (C.topics['高血压急症']) {
    Object.assign(C.topics['高血压急症'], {
      status:'verified',sourceIds:['ahaBP2025','ahaBP2024'],
      summary:'高血压急症是严重升压（通常 >180/120 mmHg）合并急性新发或进行性靶器官损害。2025 ACC/AHA 再次强调：仅有 >180/120 而没有急性靶器官损害，不属于需要 ICU 静脉快速降压的高血压急症。',
      redFlags:['高血压脑病、意识改变/惊厥或急性神经功能缺损','ACS、急性左心衰/肺水肿','急性主动脉综合征','AKI/少尿等进行性肾损害','视网膜/其他明确急性靶器官损害'],
      steps:[
        '规范重复测压并同时快速评估脑、心脏、主动脉、肾脏和眼底等靶器官。',
        '确认高血压急症后进入可连续监测环境，优先使用短效、可滴定静脉药；目标取决于具体器官综合征。',
        '无特殊强制指征且非卒中/妊娠等专门情境时，通常避免第一小时降压过快，参考不超过约 25%，之后在 24–48 h 内逐步控制。',
        '急性主动脉夹层：2025 BP guideline 要求快速将 SBP 降至 ≤120 mmHg，目标约 20 min 内达到；先 β 阻滞，再在需要时加血管扩张剂。',
        '高血压性急性肺水肿：可选 clevidipine、nitroglycerin 或 nitroprusside 等可滴定 IV 血管扩张剂；该特定急性肺水肿情境不使用 β 阻滞剂作为急性降压治疗。',
        '急性缺血性卒中、脑出血、妊娠相关高血压等必须进入各自专门血压目标，不套用通用 25% 规则。',
        '若 >180/120 mmHg 但没有急性靶器官损害，2025 指南建议及时恢复/起始/加强口服降压和可靠随访，而不是机械给予 IV 或额外短效口服药快速降压。'
      ],
      caution:'“血压数字很高”不等于高血压急症；同样，真正存在主动脉夹层、卒中、肺水肿等靶器官损害时也不能用一个统一目标。'
    });
  }

  if (C.topics['急性主动脉综合征']) {
    Object.assign(C.topics['急性主动脉综合征'], {
      status:'verified',sourceIds:['aorta2022','ahaBP2025'],
      summary:'疑似急性主动脉综合征应立即降低主动脉壁剪切力、快速确定解剖分型并联系主动脉中心。当前 ACC/AHA 路径支持“镇痛 + IV β 阻滞优先 + 必要时加血管扩张剂”的 anti-impulse therapy。',
      redFlags:['突发爆发性胸背痛','脉搏缺失或双侧血压明显不对称','新发主动脉瓣返流杂音','晕厥、卒中样症状、肢体/肠系膜缺血','休克、心包压塞或破裂表现'],
      steps:[
        'ABCDE、双上肢血压/脉搏、ECG 和快速床旁评估；稳定且可行时尽快 CTA，不能转运/不稳定时根据资源使用 TEE 等。',
        '立即充分镇痛并启动 anti-impulse therapy。首选 IV β 阻滞剂（如 esmolol/labetalol 等适当药物），先控制心率和收缩力。',
        '若 β 阻滞后血压仍高，再加可滴定血管扩张剂，避免单独先扩血管引起反射性心动过速。',
        '目标参考 HR 60–80 次/分、SBP <120 mmHg，或在维持终末器官灌注前提下可耐受的最低血压；2025 BP guideline 对急性主动脉夹层要求 SBP ≤120 mmHg、目标约 20 min 内达到。',
        'Stanford A 型为外科急症；临床稳定时转至高容量/有经验主动脉中心可改善结局。复杂 B 型出现破裂、灌注不良、持续疼痛/难控高血压等需紧急主动脉团队评估。'
      ],
      target:'HR 约 60–80/min；SBP <120 mmHg 或维持终末器官灌注的最低可耐受血压。休克、破裂、心包压塞或严重灌注不良时必须按血流动力学实际情况个体化。',
      caution:'疑似夹层未排除前不要机械套用 ACS 抗凝/溶栓。发生休克并不意味着继续强行降压；此时应立即处理破裂/压塞/灌注失败并转入外科/主动脉救治。'
    });
  }

  if (C.topics['急性心力衰竭/肺水肿']) {
    Object.assign(C.topics['急性心力衰竭/肺水肿'], {
      status:'verified',sourceIds:['ahaHF2022','ahaBP2025'],
      summary:'急性失代偿心衰/肺水肿首先区分“充血”和“低灌注/休克”，同时识别 ACS、心律失常、感染、严重高血压和机械性病因。有明显容量潴留/充血时，静脉袢利尿剂是快速有效的去充血治疗。',
      redFlags:['严重低氧/呼吸窘迫','低血压、低灌注或心源性休克','伴 ACS 或恶性心律失常','高血压性闪电样肺水肿','机械并发症或快速恶化'],
      steps:[
        '立即评估气道、呼吸、氧合、血压、灌注和容量/充血状态；ECG、床旁超声/胸部影像和实验室检查按病情并行。',
        '有明显充血/容量潴留的住院患者应尽早使用 IV loop diuretic，并根据尿量、体重、症状和肾功能调整；持续充血可增加袢利尿剂强度或采用序贯肾单位阻断等专科策略。',
        '治疗中记录液体入出量、生命体征、每日体重，并动态复查电解质、BUN/肌酐；仅因轻度肌酐上升不应在仍明显充血时机械停止去充血。',
        '血压足够或升高且肺充血显著时，可选择 IV vasodilator 缓解肺充血；2025 BP guideline 对高血压性急性肺水肿列出 clevidipine、nitroglycerin、nitroprusside。',
        '低血压、冷湿、乳酸升高或进行性器官低灌注时不要套用单纯“利尿+扩血管”路径，应立即进入心源性休克评估并升级重症/循环支持。',
        '同步寻找并处理诱因：ACS、快速/缓慢心律失常、感染、严重高血压、药物/饮食因素和机械性并发症。'
      ],
      reassess:'症状、呼吸功/氧合、血压和灌注；尿量、净液体平衡、每日体重；电解质、BUN/肌酐。目标是改善充血且不造成症状性低血压或严重电解质紊乱。',
      caution:'本站仍不提供一个统一静脉呋塞米起始剂量，因为既往袢利尿剂暴露、肾功能和充血程度决定剂量。高血压性急性肺水肿与慢性稳定心衰的 β 阻滞剂处理不能混为一谈。'
    });
  }

  if (C.topics['COPD急性加重']) {
    Object.assign(C.topics['COPD急性加重'], {
      status:'source-bound',sourceIds:['gold2026'],
      summary:'GOLD 官方已发布 2026 Report 与 Pocket Guide，本站确认当前来源无误。急性加重仍应先评估氧合/通气、呼吸功、意识和循环，并主动排查肺炎、心衰、肺栓塞、气胸和心律失常等替代/并存急症。',
      steps:[
        '短效支气管扩张剂为急性支气管痉挛的核心治疗，并依据病情联合短效抗胆碱能药。',
        '氧疗必须目标化并结合血气/二氧化碳潴留风险复评；不能只追求“越高越好”的 SpO₂。',
        '中重度急性加重通常需要短程全身糖皮质激素；抗菌药仅在感染指征或机械通气等合适场景使用。',
        '急性高碳酸性呼吸衰竭且无禁忌证时尽早评估无创通气；失败、气道保护失败或进行性不稳定时升级有创通气/重症。',
        '同时排查肺炎、急性心衰、肺栓塞、气胸、心肌缺血/心律失常等可能模拟或触发 COPD 恶化的疾病。'
      ],
      caution:'本轮只确认 GOLD 2026 官方 Report/Pocket Guide 为当前主来源。由于官方 Pocket Guide 的具体急性参数未在本工作流中可靠逐条解析，本卡继续不新增精确氧饱和度目标、激素剂量或抗菌方案硬编码；这些参数需下一轮在可直接核对原文后再解锁。'
    });
  }

  C.meta.version = 'v0.16-audited-clinical-alpha';
})();
