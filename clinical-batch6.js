(() => {
  const C = window.CLINICAL_DATA;
  if (!C) return;

  Object.assign(C.sources, {
    acgAP2024:{name:'ACG Clinical Guideline: Management of Acute Pancreatitis',year:'2024',org:'American College of Gastroenterology',url:'https://pubmed.ncbi.nlm.nih.gov/38857482/',note:'成人急性胰腺炎诊断、早期补液、营养、ERCP 与抗菌药边界。'},
    ahaTox2025:{name:'AHA 2025 CPR/ECC — Adult and Pediatric Special Circumstances of Resuscitation',year:'2025',org:'American Heart Association',url:'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-and-pediatric-special-circumstances-of-resuscitation',note:'用于危重中毒、低体温及围心搏骤停特殊情境。'},
    rcukHypo2025:{name:'RCUK/ERC 2025 Special Circumstances — Accidental Hypothermia',year:'2025',org:'Resuscitation Council UK / ERC',url:'https://www.resus.org.uk/professional-library/2025-resuscitation-guidelines/special-circumstances-guidelines'},
    cdcCO2024:{name:'CDC Clinical Guidance for Carbon Monoxide Poisoning',year:'2024',org:'U.S. Centers for Disease Control and Prevention',url:'https://www.cdc.gov/carbon-monoxide/hcp/clinical-guidance/index.html'}
  });

  Object.assign(C.topics, {
    '急性胰腺炎':{
      status:'verified',sourceIds:['acgAP2024'],
      summary:'急性胰腺炎通常以典型腹痛、胰酶升高和影像学表现中的至少 2 项确立诊断；早期重点是识别器官功能障碍、适度补液、镇痛、寻找胆源性病因并尽早恢复肠内营养。',
      redFlags:['持续低血压/休克或进行性器官功能障碍','低氧或呼吸衰竭','持续 SIRS、少尿/急性肾损伤','胆管炎或持续胆道梗阻证据','进行性腹胀、坏死/感染并发症风险'],
      steps:[
        '诊断通常需满足 3 项中的至少 2 项：符合胰腺炎的腹痛；血清淀粉酶和/或脂肪酶 > 正常上限 3 倍；影像符合急性胰腺炎。脂肪酶通常优先于淀粉酶。',
        '入院常规早期 CT 不用于单纯“判严重程度”；诊断不清或经治疗 48–72 小时仍无临床改善时再考虑 CT/MRI 评估坏死等并发症。',
        '进行适度积极的等渗晶体液复苏，ACG 倾向乳酸林格液；有低血容量时可追加补液，并在最初 6 小时及随后 24–48 小时频繁复评，心衰/肾衰患者防止容量过负荷。',
        '轻症患者耐受时 24–48 小时内尽早口服进食，可直接从低脂固体饮食开始，不需要等待胰酶恢复正常。中重症/重症优先肠内营养，能经胃管完成时不必常规追求空肠管。',
        '胆源性胰腺炎合并急性胆管炎时需尽快进入 ERCP 路径；若无胆管炎，ACG 不支持仅因胆源性胰腺炎就在最初 72 小时常规早期 ERCP。',
        '不常规使用“预防性抗菌药”治疗重症急性胰腺炎或无感染证据的坏死；出现感染性坏死/胆管炎/其他明确感染时按感染源治疗。'
      ],
      fluids:'首选等渗晶体液，ACG 倾向乳酸林格液；强调“适度积极 + 动态复评”，而不是固定大剂量灌注。',
      reassess:'持续监测血压、心率、尿量、BUN/肌酐、血细胞比容、氧合与器官功能；若 48–72 小时无改善，重新评估坏死、感染、胆道梗阻等并发症。',
      caution:'不要因脂肪酶持续升高而延迟进食或出院；也不要在无感染证据时机械使用抗生素。胆源性胰腺炎的 ERCP 取决于胆管炎/梗阻，而不是“所有胆源性都急诊 ERCP”。'
    },
    '意外低体温':{
      status:'verified',sourceIds:['rcukHypo2025','ahaTox2025'],
      summary:'低体温可使脉搏和呼吸极慢并模拟死亡。除明确致死性损伤外，应在复苏同时持续复温，并尽早识别需要体外生命支持复温的高危患者。',
      redFlags:['核心体温 <30°C','收缩压 <90 mmHg','心率 <45 次/分','室性心律失常','意识障碍/无生命体征'],
      steps:[
        '脱离寒冷环境，轻柔搬运，去除湿衣并保温；使用可低温读数的核心体温监测。无可靠体温时可结合意识与寒战情况分期。',
        '无意识低体温患者检查生命体征可延长至约 1 分钟，避免把极慢循环误判为心搏骤停。',
        '出现心搏骤停且无明确致死性损伤时立即完整复苏并同步复温；低体温心搏骤停可在长时间复苏后仍获得良好神经结局。',
        'RCUK 2025 建议心率 <45 次/分、SBP <90 mmHg、室性心律失常或核心体温 <30°C 的患者考虑直接转至具备 ECPR/体外复温能力中心。',
        '持续 VF 若 3 次除颤仍失败，RCUK 建议体温 >30°C 前延后后续除颤；<30°C 时肾上腺素代谢明显减慢，药物策略需按低体温 ALS 专门流程。',
        '低体温心搏骤停优先考虑 VA-ECMO/ECLS 复温；无法持续 CPR 的危险环境中，特定严重低体温情境可采用延迟/间歇 CPR 以完成快速撤离。'
      ],
      target:'复温与循环支持同步进行；ECLS 复温时 AHA 2025 提供约 1.5–5°C/小时的可考虑范围，具体由体外生命支持团队决定。',
      caution:'固定瞳孔、僵硬、极慢脉搏在严重低体温下不能单独作为死亡依据。低体温除颤和肾上腺素策略与常温 ALS 不完全相同，应进入专门算法。'
    },
    '一氧化碳中毒':{
      status:'verified',sourceIds:['cdcCO2024'],
      summary:'CO 中毒表现常非特异，诊断依赖暴露史、症状和 COHb；严重病例可累及脑和心脏。治疗核心是立即脱离暴露并给予高浓度氧，同时识别需要高压氧评估的人群。',
      redFlags:['意识丧失/昏迷或持续神经功能异常','心肌缺血、心律失常或胸痛','严重代谢性酸中毒','低血压/呼吸衰竭','妊娠','COHb 明显升高'],
      steps:[
        '立即停止暴露并给予 100% 氧；CDC 建议通常持续至患者症状消失，并进行连续神经系统复评。',
        '尽快测 COHb，但必须结合离开暴露环境后的时间解释；常规脉搏氧饱和度不能可靠排除 CO 中毒。',
        '评估 ECG、心肌损伤、酸碱状态、神经功能及合并烟雾吸入/创伤；火灾现场同时考虑氰化物等共暴露。',
        'CDC 建议在 COHb >25–30%、心脏受累、严重酸中毒、短暂或持续意识丧失、神经损害或异常神经心理测试时考虑高压氧；临床严重时即使 COHb 较低也可考虑。',
        '孕妇应更积极与高压氧中心/毒理专家讨论，CDC 将妊娠列为高压氧治疗的重要特殊情境。'
      ],
      doses:['100% 氧吸入；具体装置和高压氧方案由急诊/高压氧团队决定。'],
      caution:'COHb 数值与临床严重程度并非线性对应，离开现场后数值会下降；不能只看 COHb 决定是否重症。'
    },
    '三环类/钠通道阻滞剂中毒':{
      status:'verified-partial',sourceIds:['ahaTox2025'],
      summary:'TCA 及其他钠通道阻滞剂可导致 QRS 增宽、低血压、惊厥、室性心律失常和心源性休克。危及生命的 TCA 心脏毒性首选碳酸氢钠，并需连续 ECG 与酸碱/电解质监测。',
      redFlags:['QRS 进行性增宽或 aVR 终末右偏','低血压/休克','室性心律失常','惊厥或意识障碍','心搏骤停'],
      steps:[
        'ABCDE、连续 ECG、血气/电解质/血糖监测并尽早联系毒理/重症支持。',
        'AHA 2025：成人危及生命的三环/四环类抗抑郁药心脏毒性应使用碳酸氢钠；其他危及生命的钠通道阻滞剂心脏毒性也可考虑碳酸氢钠。',
        '机械通气患者可将适度过度通气与碳酸氢钠联合用于危及生命的钠通道阻滞；目标更重视 QRS/低血压改善并避免过度碱血症。',
        'AHA 支持避免血清 Na >155 mEq/L 和 pH >7.55 的医源性极端值。',
        '持续难治性心源性休克可考虑 ECLS/VA-ECMO；标准治疗失败后某些病例可考虑利多卡因或脂肪乳等专科救援策略。'
      ],
      caution:'本站暂不把碳酸氢钠单次剂量和持续泵注方案统一硬编码；制剂浓度、重复频率及酸碱目标应由本机构毒理/重症方案确认。'
    },
    'β受体阻滞剂中毒':{
      status:'verified-partial',sourceIds:['ahaTox2025'],
      summary:'危及生命的 β 阻滞剂中毒常表现为心动过缓、低血压、传导阻滞、心源性休克，并可能伴低血糖；治疗需要血管活性药与针对性高剂量胰岛素/胰高血糖素等策略。',
      redFlags:['顽固低血压/心源性休克','严重心动过缓或高级房室传导阻滞','低血糖','惊厥或 QRS/QT 异常','心搏骤停'],
      steps:[
        '持续 ECG、血压、血糖、电解质和灌注监测；识别药物种类及缓释制剂，尽早联系毒理中心。',
        'AHA 2025 建议对危及生命 β 阻滞剂中毒的低血压给予血管活性药；对血管活性药难治性低血压应给予高剂量胰岛素/正常血糖治疗。',
        '症状性心动过缓或低血压时，可考虑胰高血糖素负荷后持续输注。',
        '难治性心源性休克可考虑 ECLS/VA-ECMO；危及生命的 atenolol、nadolol 或 sotalol 中毒可评估血液透析。',
        'propranolol 兼具钠通道阻滞，sotalol 影响钾通道；出现宽 QRS/QT 延长时不能只按普通心动过缓处理。'
      ],
      caution:'高剂量胰岛素治疗需严密葡萄糖、钾和容量监测。本站暂不把高剂量胰岛素/胰高血糖素的完整泵注剂量固化为通用方案。'
    },
    '钙通道阻滞剂中毒':{
      status:'verified-partial',sourceIds:['ahaTox2025'],
      summary:'危及生命的钙通道阻滞剂中毒可产生严重心动过缓、负性肌力和/或血管扩张性休克；AHA 2025 推荐高剂量胰岛素和血管活性药，并可联合钙剂。',
      redFlags:['进行性低血压/休克','严重心动过缓/传导阻滞','高血糖伴循环衰竭','肺水肿/低灌注','心搏骤停'],
      steps:[
        '持续 ECG、血压、血糖、钾、离子钙、酸碱与灌注监测；缓释制剂可能导致延迟和长时间毒性。',
        'AHA 2025：危及生命 CCB 中毒导致低血压时应给予高剂量胰岛素和血管活性药。',
        '可给予静脉钙剂作为联合治疗；多数重症患者仍需要多种循环支持手段。',
        '难治性休克/心搏骤停可评估 ECLS/VA-ECMO。',
        '胰高血糖素、亚甲蓝和脂肪乳在 CCB 中毒中的获益不确定，不应替代高剂量胰岛素、血管活性药和高级循环支持。'
      ],
      caution:'高剂量胰岛素及钙剂策略需要协议化监测，防止低血糖、低钾和容量负荷。具体剂量/滴定目标保持机构级配置。'
    }
  });

  Object.assign(C.drugs, {
    '碳酸氢钠（钠通道阻滞）':{status:'verified-partial',sourceIds:['ahaTox2025'],indications:['TCA/四环类抗抑郁药危及生命的心脏毒性','其他严重钠通道阻滞导致 QRS 增宽、低血压或室性心律失常'],doses:['具体负荷、重复与持续输注方案由本机构毒理/重症协议确认；治疗中避免 pH>7.55、血清 Na>155 mEq/L。'],cautions:['连续 ECG、血气、电解质和血钠监测','不要仅追求某个 pH 数字而忽视 QRS 与灌注改善','碳酸氢钠并非所有宽 QRS 中毒的万能药，必须结合毒物机制。']},
    '高剂量胰岛素（BB/CCB中毒）':{status:'source-bound',sourceIds:['ahaTox2025'],indications:['危及生命 CCB 中毒的低血压/休克','β阻滞剂中毒经血管活性药仍顽固低血压'],doses:['本站暂不固化统一负荷与泵速；需按本机构毒理方案并进行协议化葡萄糖/钾监测。'],cautions:['显著低血糖风险','低钾风险','大剂量葡萄糖支持可能造成容量负荷','应由具备持续监护和快速实验室复测条件的团队实施。']}
  });

  C.meta.version='v0.9-editable-clinical-alpha';
  C.meta.verifiedAt='2026-08-17';
})();
