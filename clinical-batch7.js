(() => {
  const C = window.CLINICAL_DATA;
  if (!C) return;

  Object.assign(C.sources, {
    niceMeningitis2024: {name:'NICE NG240 — Bacterial meningitis and meningococcal disease',year:'2024（links updated 2025）',org:'NICE',url:'https://www.nice.org.uk/guidance/ng240',note:'用于成人疑似细菌性脑膜炎/脑膜炎球菌病识别、转运、检查、抗菌药与地塞米松时机。'},
    niceAdrenal2024: {name:'NICE NG243 — Adrenal insufficiency: identification and management',year:'2024（minor updates 2025）',org:'NICE',url:'https://www.nice.org.uk/guidance/ng243/',note:'用于成人肾上腺危象识别、氢化可的松和液体复苏。'},
    sfeAdrenal: {name:'Adrenal crisis — clinical guidance',year:'current page',org:'Society for Endocrinology',url:'https://www.endocrinology.org/clinical-practice/clinical-guidance/adrenal-crisis/',note:'强调怀疑即治疗，不应等待诊断确认。'},
    sfeHyponatraemia: {name:'Emergency management of severe symptomatic hyponatraemia',year:'2016；Society page lists 2022 update',org:'Society for Endocrinology',url:'https://www.endocrinology.org/clinical-practice/clinical-guidance/society-for-endocrinology-guidance/',note:'本站采用保守摘要；高渗盐水必须在可频繁复测血钠的监护环境使用。'},
    sfeHypocalcaemia2019: {name:'Emergency management of acute hypocalcaemia in adult patients + 2019 addendum',year:'2016/2019',org:'Society for Endocrinology',url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC8117371/',note:'用于急性低钙静脉钙剂剂量与钙盐等效提醒。'},
    sfeHypercalcaemia: {name:'Emergency management of acute hypercalcaemia in adult patients',year:'2016',org:'Society for Endocrinology',url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC5314807/',note:'用于严重高钙初始补液及双膦酸盐路径；较旧但仍为 Society 官方急诊指导。'}
  });

  Object.assign(C.topics, {
    '细菌性脑膜炎': {
      status:'verified-partial',sourceIds:['niceMeningitis2024'],
      summary:'疑似细菌性脑膜炎属于时间敏感的感染急症。诊断检查应与尽快启动抗菌治疗并行；不能为了影像或腰穿造成有临床意义的抗菌药延误。',
      redFlags:['发热 + 头痛 + 颈项强直 + 意识/认知改变的组合','进行性意识下降、抽搐或局灶神经功能缺损','免疫功能受损/高龄并出现非典型感染表现','伴休克、紫癜样皮疹或快速恶化时同时考虑脑膜炎球菌病/脓毒症'],
      steps:['立即 ABCDE、监护、建立静脉通路，采血培养和必要实验室检查；不要因等待检查延误抗菌治疗。','若腰穿安全且不会造成有临床意义的延误，可在首剂抗菌药前完成；若存在脑疝/占位风险、严重不稳定或会明显延误，则先抗菌治疗并按专门路径处理。','NICE 2024：院内一旦怀疑细菌性脑膜炎，静脉抗菌药应尽快给，目标为到院后 1 小时内。经验治疗首选 ceftriaxone 的“脑膜炎剂量”，具体成人剂量按本地抗菌方案/说明书；ceftriaxone 禁忌时考虑 cefotaxime。','存在 Listeria monocytogenes 风险因素时，在 ceftriaxone/cefotaxime 基础上加 IV amoxicillin；具体剂量按本地抗菌方案。','强烈怀疑/确诊细菌性脑膜炎者给予 IV dexamethasone；最好与首剂抗菌药同时或之前给，但绝不能为等待 dexamethasone 而延误抗菌药。','病原明确后：肺炎链球菌或 Hib 可继续 dexamethasone；其他病原停止。未明确病原时由感染专科决定是否继续。'],
      reassess:'动态复评意识、瞳孔、抽搐、灌注、氧合与脓毒症表现；必要时神经重症/感染专科升级。',
      caution:'不要把“先做头颅 CT”设成所有疑似脑膜炎患者的固定步骤；只有明确指征时才在腰穿前影像。不要常规给 aciclovir，除非强烈怀疑 HSV 脑炎。ceftriaxone 与含钙溶液存在配伍禁忌，需按具体制剂说明书执行。'
    },
    '脑膜炎球菌病': {
      status:'verified',sourceIds:['niceMeningitis2024'],
      summary:'脑膜炎球菌病可在短时间内进展为休克、DIC 和多器官衰竭。疑似病例应按感染急症/脓毒症立即转运和治疗。',
      redFlags:['发热伴非褪色性紫癜/瘀点样皮疹','快速进展的休克、肢端灌注差或意识改变','颈项强直/头痛伴脓毒症表现','青年或年轻成人“看起来尚可”但短时间快速恶化'],
      steps:['紧急转院并提前通知接收医院；不要因为院前给药而延误转运。','若院前强烈怀疑脑膜炎球菌病，可尽快 IM/IV ceftriaxone 或 benzylpenicillin，前提是不延误转运且无严重相关过敏。','院内疑似/确诊脑膜炎球菌病使用 IV ceftriaxone；具体剂量按本地脑膜炎/脓毒症抗菌方案。','同步按脓毒症/休克路径处理灌注、乳酸、液体与血管活性药，并尽快进入重症监护。','不常规给予高剂量糖皮质激素；若脑膜炎球菌感染性休克对高剂量血管活性药仍反应不佳，可按休克/肾上腺支持路径评估低剂量替代激素。'],
      caution:'非褪色性皮疹并非所有病例都会出现，不能以“无皮疹”排除。感染控制、公共卫生报告和密切接触者预防属于专门流程。'
    },
    '肾上腺危象': {
      status:'verified',sourceIds:['niceAdrenal2024','sfeAdrenal'],
      summary:'肾上腺危象是可逆但致命的内分泌急症。对已知/高风险肾上腺功能不全患者出现低血压、休克、低钠、低血糖或对常规治疗反应差时，应立即治疗，不等待皮质醇结果。',
      redFlags:['已知肾上腺功能不全或长期/近期停用外源性糖皮质激素','低血压、循环崩溃或对常规复苏反应差','低钠、低血糖、呕吐/腹泻、发热或严重感染','明显乏力、意识改变；原发性肾上腺功能不全可有色素沉着'],
      steps:['立即给予 hydrocortisone 100 mg IV 或 IM；急症情况下无需担心短期过量。','NICE 2024：给予 0.9% NaCl 1 L IV，约 30 分钟完成；后续液体依据血流动力学、电解质、年龄、心肾功能继续个体化。','持续 hydrocortisone 200 mg/24 h IV 持续输注，或 50 mg IV/IM 每 6 小时，直至血流动力学稳定且可可靠口服吸收。','频繁监测血压、心率、电解质和血糖；低血糖同时纠正。','寻找并治疗诱因，如感染、漏服/停用激素、胃肠道疾病、手术/创伤等，并尽早联系内分泌专科。'],
      doses:['Hydrocortisone：100 mg IV/IM 立即。','随后 hydrocortisone：200 mg/24 h IV 持续输注，或 50 mg IV/IM 每 6 小时。','0.9% NaCl：初始 1 L IV / 30 min；后续按灌注与电解质状态调整。'],
      caution:'不要为了采集皮质醇/ACTH 而延误治疗；如可在不延误的前提下先留血样即可。心衰、肾衰、老年患者液体复苏应更谨慎。'
    },
    '严重症状性低钠血症': {
      status:'verified-partial',sourceIds:['sfeHyponatraemia'],
      summary:'低钠处理优先级由症状严重程度和发生速度决定，而不是只看一个血钠数字。抽搐、昏迷/深度意识下降或心肺骤停属于危重症状，应立即在监护环境使用高渗盐水。',
      redFlags:['抽搐','昏迷/显著意识下降（如 GCS≤8）','心肺骤停或严重呼吸循环不稳','低钠伴快速进行性神经症状'],
      steps:['立即 ABCDE、床旁血糖、监护并重复测血钠；同时寻找药物、SIADH、低容量、肾/心/肝衰竭、肾上腺功能不全等病因，但病因鉴别不能延误严重症状的急救。','Society for Endocrinology 经典急诊方案：3% NaCl 150 mL IV 约 20 分钟；可按神经症状和复测血钠重复，目标是在第 1 小时使血钠上升约 5 mmol/L。','达到初始神经学目标后放慢/停止高渗治疗，并频繁复测血钠和尿量，防止自发水利尿导致过度纠正。','若 24 小时内升幅超过约 10 mmol/L 或 48 小时内超过约 18 mmol/L，应停止高渗盐水并立即请有经验团队处理过度纠正；高 ODS 风险患者应采用更保守上限。'],
      doses:['3% NaCl：150 mL IV 约 20 min（经典 Society/European emergency bolus；具体制剂浓度和本地配制须核对）。'],
      target:'严重症状初始目标：第 1 小时血钠上升约 5 mmol/L，而不是“尽快纠正到正常”。随后严格限制总纠正幅度。',
      caution:'高渗盐水属于高风险治疗；必须使用标准化制剂/配制流程并在可频繁复测血钠的环境执行。慢性低钠、营养不良、酒精依赖、低钾、晚期肝病等患者发生渗透性脱髓鞘风险更高。'
    },
    '急性低钙血症': {
      status:'verified',sourceIds:['sfeHypocalcaemia2019'],
      summary:'症状性低钙或校正钙 <1.9 mmol/L 可引起喉痉挛、抽搐、QT 延长和心律失常，属于医疗急症，应在 ECG 监护下静脉补钙并同时查明病因。',
      redFlags:['手足搐搦/喉痉挛','抽搐','QT 延长或心律失常','校正钙 <1.9 mmol/L','甲状腺/甲状旁腺术后快速下降或合并低镁'],
      steps:['检测校正钙/离子钙、Mg、P、肾功能、PTH、维生素 D；严重症状时不要等待所有结果再补钙。','首选 10% calcium gluconate 10–20 mL，加入 50–100 mL 5% glucose，约 10 分钟 IV，并持续 ECG 监护；症状未缓解可重复。','随后可将 10% calcium gluconate 100 mL 稀释于 1 L 0.9% NaCl 或 5% glucose，约 50–100 mL/h 起始并按血钙/症状滴定。','同步纠正低镁、维生素 D 缺乏或甲状旁腺功能减退等病因。'],
      doses:['10% calcium gluconate：10–20 mL IV / 10 min（稀释后、ECG 监护）。','维持：10% calcium gluconate 100 mL 加至 1 L 0.9% NaCl 或 5% glucose，约 50–100 mL/h 起始，按复测滴定。'],
      caution:'calcium chloride 静脉刺激性更强，通常需中心静脉；不同浓度制剂所含元素钙不同，必须按制剂实际浓度核算。使用地高辛或已有心律失常者尤其需要连续 ECG 监护。'
    },
    '急性高钙血症': {
      status:'verified-partial',sourceIds:['sfeHypercalcaemia'],
      summary:'明显高钙可导致脱水、肾损伤、意识障碍和心律失常。严重或有症状高钙首先纠正容量不足，再根据病因与肾功能选择抗骨吸收治疗。',
      redFlags:['校正钙 >3.5 mmol/L','意识障碍/昏迷','心律失常或明显 QT 缩短','严重脱水、少尿或急性肾损伤'],
      steps:['确认校正钙/离子钙并检测 PTH、磷、肾功能；同时评估肿瘤、甲旁亢、维生素 D 相关等原因。','若容量不足且无明显容量负荷禁忌，使用 0.9% NaCl 复苏；老年、心衰或肾衰患者需更慢并频繁复评。','补液后仍需进一步降钙时可考虑 IV bisphosphonate；旧版 Society 急诊指导列出 zoledronic acid 4 mg IV / 15 min，肾功能不全需减量/延长输注并按本地说明书执行。','严重肾衰、难治性高钙或特殊病因尽早联系内分泌/肾脏/肿瘤团队，必要时评估透析、calcitonin、denosumab 或特异治疗。'],
      doses:['Zoledronic acid：4 mg IV ≥15 min（较旧 Society 急诊指导；必须结合肾功能、制剂说明书与本地流程）。'],
      caution:'袢利尿剂不是常规“降钙药”，仅在液体负荷过多等特定情形考虑。该模块来源较旧，因此双膦酸盐及二线药物保持“部分核验/本地复核”状态。'
    }
  });

  Object.assign(C.drugs, {
    '氢化可的松（肾上腺危象）': {status:'verified',sourceIds:['niceAdrenal2024','sfeAdrenal'],indications:['疑似或确诊成人肾上腺危象','严重应激状态下已知肾上腺功能不全患者的应激替代'],doses:['100 mg IV/IM 立即。','随后 200 mg/24 h IV 持续输注，或 50 mg IV/IM 每 6 小时，直至血流动力学稳定并可口服。'],cautions:['不要等待皮质醇结果才给药。','急症短期高剂量氢化可的松的风险远低于漏治肾上腺危象的风险。']},
    '高渗氯化钠（症状性低钠）': {status:'verified-partial',sourceIds:['sfeHyponatraemia'],indications:['严重症状性低钠血症（如抽搐、昏迷/深度意识下降）'],doses:['3% NaCl 150 mL IV 约 20 min；按症状与复测结果决定是否重复，初始目标约 +5 mmol/L。'],cautions:['高风险药液：浓度、配制、通路和监测必须标准化。','避免过度纠正；慢性低钠/ODS 高风险患者应采用更保守纠正上限。']},
    '葡萄糖酸钙（急性低钙）': {status:'verified',sourceIds:['sfeHypocalcaemia2019'],indications:['症状性急性低钙','校正钙 <1.9 mmol/L 或伴喉痉挛、抽搐、QT 延长/心律失常'],doses:['10% calcium gluconate 10–20 mL，加入 50–100 mL 5% glucose，IV 约 10 min，ECG 监护；必要时可重复。','维持：10% calcium gluconate 100 mL 加至 1 L 0.9% NaCl 或 5% glucose，50–100 mL/h 起始并按复测滴定。'],cautions:['不同钙盐/不同浓度所含元素钙不同，不可按体积直接互换。','calcium chloride 更刺激静脉；地高辛/心律失常患者需特别谨慎。']},
    '头孢曲松（脑膜炎）': {status:'source-bound',sourceIds:['niceMeningitis2024'],indications:['疑似细菌性脑膜炎的经验治疗','疑似/确诊脑膜炎球菌病'],doses:['NICE 要求使用 ceftriaxone 的最高脑膜炎剂量；本站不硬编码跨地区统一剂量，按本地抗菌药物方案/药品说明书执行。'],cautions:['疑似细菌性脑膜炎院内目标为到院后 1 小时内开始 IV 抗菌药。','ceftriaxone 与含钙溶液存在重要配伍禁忌；遵循具体制剂说明书。','Listeria 风险存在时需额外覆盖，不要依赖 ceftriaxone 单药。']},
    '地塞米松（细菌性脑膜炎）': {status:'source-bound',sourceIds:['niceMeningitis2024'],indications:['强烈怀疑或确诊细菌性脑膜炎的辅助治疗'],doses:['最好与首剂抗菌药同时或之前给；具体成人剂量按本地脑膜炎方案。若抗菌药已开始 <12 h，仍应尽快评估给药。'],cautions:['绝不能为等待 dexamethasone 而延误抗菌药。','病原明确为肺炎链球菌/Hib 可继续；其他病原一般停止。']},
    '唑来膦酸（急性高钙）': {status:'verified-partial',sourceIds:['sfeHypercalcaemia'],indications:['补液后仍需进一步降钙的严重/症状性高钙（按病因和专科判断）'],doses:['Society 旧版急诊指导：4 mg IV，输注至少 15 min。'],cautions:['肾功能不全需调整剂量/输注方案并按当前制剂说明书。','起效并非即时；严重危象可能需要额外专科治疗。']}
  });
})();
