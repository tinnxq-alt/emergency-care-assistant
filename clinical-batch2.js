(() => {
  const C = window.CLINICAL_DATA;
  const D = window.EMERGENCY_DATA;
  if (!C || !D) return;

  Object.assign(C.sources, {
    trauma2023: {
      name: 'European Guideline on Major Bleeding and Coagulopathy Following Trauma — Sixth Edition',
      year: '2023',
      org: 'European multidisciplinary task force / Critical Care',
      url: 'https://doi.org/10.1186/s13054-023-04327-7',
      note: 'Open access, CC BY 4.0；本站使用原创结构化中文摘要并保留来源。'
    },
    ahaBP2024: {
      name: 'AHA Scientific Statement: Management of Elevated Blood Pressure in the Acute Care Setting',
      year: '2024',
      org: 'American Heart Association',
      url: 'https://professional.heart.org/en/science-news/management-of-elevated-blood-pressure-in-the-acute-care-setting'
    },
    ahaHF2022: {
      name: '2022 AHA/ACC/HFSA Guideline for the Management of Heart Failure',
      year: '2022',
      org: 'AHA/ACC/HFSA',
      url: 'https://professional.heart.org/en/science-news/2022-guideline-for-the-management-of-heart-failure'
    },
    ahaSpecial2025: {
      name: 'AHA 2025 CPR & ECC — Adult and Pediatric Special Circumstances of Resuscitation',
      year: '2025',
      org: 'American Heart Association',
      url: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-and-pediatric-special-circumstances-of-resuscitation'
    },
    ahaPE2026: {
      name: '2026 AHA/ACC Multisociety Guideline for Acute Pulmonary Embolism in Adults',
      year: '2026',
      org: 'AHA/ACC/ACCP/ACEP/CHEST/SCAI/SHM/SIR/SVM/SVN',
      url: 'https://professional.heart.org/en/science-news/2026-guideline-for-the-evaluation-and-management-of-acute-pulmonary-embolism-in-adults'
    }
  });

  Object.assign(C.topics, {
    '严重创伤/大出血': {
      aliases: ['大出血/严重创伤'],
      status: 'verified',
      sourceIds: ['trauma2023'],
      summary: '严重创伤伴活动性或疑似重大出血时，核心不是“先把血压补正常”，而是同步止血、缩短到 definitive bleeding control 的时间、复苏凝血与体温，并根据是否存在严重颅脑损伤选择复苏目标。',
      redFlags: ['无法通过直接压迫控制的外出血', '低血压、皮肤湿冷、意识改变或进行性灌注不良', '疑似胸腹盆腔等隐匿性大出血', '合并严重颅脑损伤、气道受威胁或低氧'],
      steps: [
        '外出血立即直接压迫；四肢开放伤导致危及生命的大出血、直接压迫不能控制时使用止血带。',
        '尽快转运至具备相应创伤救治能力的机构，并尽量缩短从受伤到控制出血的时间；不要让低价值检查延误止血或转运。',
        '气道梗阻、GCS ≤8、通气不足或低氧时尽快建立高级气道；持续避免低氧。',
        '无临床严重颅脑损伤时，在大出血控制前采用限制性容量复苏；目标收缩压约 80–90 mmHg。严重颅脑损伤（GCS ≤8）时应避免低灌注，指南建议维持 MAP ≥80 mmHg。',
        '存在活动性出血或重大出血风险时尽早给予氨甲环酸，并在伤后 3 小时内启动。',
        '启动大出血/大量输血流程时同步关注凝血、纤维蛋白原、血小板、离子钙与体温；积极保温并纠正低钙。'
      ],
      doses: ['氨甲环酸：1 g 静脉输注约 10 分钟，随后 1 g 持续静脉输注 8 小时；应尽早并在伤后 3 小时内开始。'],
      target: '无严重颅脑损伤：出血控制前 SBP 约 80–90 mmHg；严重颅脑损伤：避免低血压，MAP 目标至少约 80 mmHg。',
      caution: '“允许性低血压”不适用于所有创伤患者；严重颅脑损伤、脊髓损伤、老年及长期高血压患者需个体化。'
    },
    '高血压急症': {
      aliases: [],
      status: 'verified-partial',
      sourceIds: ['ahaBP2024'],
      summary: '高血压急症的关键是“明显升高的血压 + 新发或进行性靶器官损害”，而不是单凭一个血压数字。无症状的严重升压与真正高血压急症应分开处理。',
      redFlags: ['胸痛、急性心衰或肺水肿', '神经功能缺损、意识改变、惊厥或高血压脑病表现', '撕裂样胸背痛或疑似主动脉综合征', '急性肾损伤/少尿、视力改变等新发靶器官损害'],
      steps: [
        '使用合适袖带和规范技术重复测量血压，确认并排除疼痛、焦虑、药物、尿潴留等可纠正因素。',
        '快速评估脑、心脏、主动脉、肾脏及眼底等靶器官损害；一旦确认高血压急症，应在可监护环境中使用静脉降压药并尽快升级/转诊。',
        '无新发或进行性靶器官损害的严重升压，不应机械套用高血压急症路径；AHA 2024 更强调规范复测、处理诱因和安排可靠随访。',
        '具体降压速度、目标和药物取决于主动脉夹层、脑卒中、脑出血、ACS、肺水肿等具体综合征，本站暂不提供一个通用百分比目标。'
      ],
      caution: '不要为了“快速把数字降下来”而对无靶器官损害患者常规使用静脉降压药；真正急症也必须按具体器官综合征制定目标。'
    },
    '急性心力衰竭/肺水肿': {
      aliases: ['急性心力衰竭'],
      status: 'verified-partial',
      sourceIds: ['ahaHF2022'],
      summary: '急性心力衰竭/肺水肿首先判断氧合、灌注和容量状态，并寻找 ACS、快速心律失常、感染、未控制高血压等诱因；存在液体潴留/充血时，利尿是去充血治疗的重要组成部分。',
      redFlags: ['严重低氧或呼吸窘迫', '低血压、休克或明显低灌注', '伴 ACS 或恶性心律失常', '快速进行性肺水肿或意识恶化'],
      steps: [
        '立即评估气道、呼吸、循环、血压、氧饱和度和灌注，并进行 ECG 与必要的床旁检查。',
        '明确是否存在肺/体循环充血与液体潴留；有明显充血时按心衰路径给予利尿治疗并动态评估尿量、肾功能和症状。',
        '同步寻找并处理诱因：ACS、心律失常、感染、未控制高血压、药物/饮食因素及机械性并发症等。',
        '出现休克、进行性低氧或需高级呼吸支持时，尽快升级监护并转诊。'
      ],
      caution: '本站暂不固化静脉袢利尿剂、硝酸酯或正性肌力药的统一起始剂量；应依据既往利尿剂暴露、血压、肾功能和本机构路径个体化。'
    },
    '急性肺栓塞': {
      aliases: [],
      status: 'verified',
      sourceIds: ['ahaPE2026'],
      summary: '2026 AHA/ACC 首次发布成人急性肺栓塞专门指南，并采用 A–E 五级临床分类。治疗强度取决于症状、严重度评分、右心室功能、心肌损伤标志物以及是否出现心肺衰竭。',
      redFlags: ['持续低血压或循环衰竭', '进行性低氧/呼吸衰竭', '晕厥伴高危表现', '右心室功能障碍和/或心肌损伤标志物升高'],
      steps: [
        '完成急性 PE 的诊断与风险分层，并根据 2026 AHA/ACC Acute PE Clinical Categories A–E 判断去向与治疗强度。',
        'Category C（症状 + 较高严重度/生物标志物或右室功能异常）、D（即将发生心肺衰竭）和 E（持续低血压的心肺衰竭）应住院治疗。',
        '需要初始肠外抗凝且无特殊禁忌时，2026 指南推荐 LMWH 优于 UFH；适合口服抗凝的患者，DOAC 优于 VKA，除非存在禁忌。',
        '高危患者应尽快启动多学科 PE response team/上级中心协作。',
        '系统溶栓、导管溶栓、机械取栓或外科取栓并非所有 PE 的常规处理；对 Category E1 合理，对部分 D1–D2 可考虑。'
      ],
      caution: '抗凝、溶栓和介入治疗必须评估活动性出血、近期手术/卒中等禁忌；基层场景的核心是早期识别、稳定和快速转诊。'
    },
    '阿片类中毒': {
      aliases: [],
      status: 'verified',
      sourceIds: ['ahaSpecial2025'],
      summary: '疑似阿片类中毒的首要威胁是呼吸抑制/呼吸停止。AHA 2025 强调立即支持通气，并在怀疑阿片毒性时使用阿片受体拮抗剂；不能因为给纳洛酮而延误标准复苏。',
      redFlags: ['呼吸频率明显下降或呼吸停止', '意识水平下降且疑似阿片暴露', '低氧/发绀', '无脉搏或心搏骤停'],
      steps: [
        '有脉搏但呼吸停止/严重呼吸抑制：立即开放气道并给予人工通气/球囊面罩通气，同时给予阿片受体拮抗剂。',
        '若无脉搏或不能确认有效循环，优先按标准心搏骤停流程进行高质量 CPR；给纳洛酮不能中断或延误 CPR。',
        '纳洛酮有效后仍需持续观察，因为药效消退后可再次出现呼吸抑制；复发时可能需要重复给药和继续呼吸支持。',
        '即使患者苏醒，也应评估共摄入物、长效/高效价阿片、肺水肿、外伤及自杀风险，并决定观察或转诊。'
      ],
      caution: 'AHA 2025 并未给出适用于所有现代阿片暴露的一种“理想统一初始纳洛酮剂量”；本站不把某个固定剂量硬编码为唯一方案，应按可用制剂、给药途径和本机构毒理流程滴定至恢复有效通气。'
    },
    '有机磷/氨基甲酸酯中毒': {
      aliases: [],
      status: 'verified-partial',
      sourceIds: ['ahaSpecial2025'],
      summary: '严重有机磷/氨基甲酸酯中毒可导致大量气道分泌物、支气管痉挛、呼吸衰竭、心动过缓、低血压和惊厥。AHA 2025 强调施救者防护、去污、早期气道支持和足量阿托品。',
      redFlags: ['大量支气管分泌物/支气管痉挛或低氧', '心动过缓、低血压或休克', '惊厥、明显意识障碍', '明确农药/胆碱酯酶抑制剂暴露并出现胆碱能综合征'],
      steps: [
        '先保护施救人员，避免二次污染；尽快去除污染衣物并进行皮肤去污。',
        '出现严重呼吸问题时尽早给予氧合、通气和高级气道支持。',
        '阿托品应立即使用，并根据支气管分泌物、通气、心率和血压等临床反应快速滴定；AHA 2025 描述可每约 5 分钟递增/加倍，直至达到临床阿托品化目标。',
        '惊厥或明显躁动使用苯二氮䓬类。',
        '危及生命的有机磷中毒可合理使用 pralidoxime/解磷定类药物，同时尽快联系毒物中心/上级医院。'
      ],
      caution: '阿托品的具体首次剂量、维持泵速及解磷定负荷/维持剂量受制剂和当地毒理方案影响，本站暂不固化；AHA 2025 还提示避免使用琥珀胆碱或米库氯铵等可能延长阻滞的药物。'
    }
  });

  Object.assign(C.drugs, {
    '氨甲环酸': {
      status: 'verified',
      sourceIds: ['trauma2023'],
      indications: ['严重创伤伴活动性出血或有重大出血风险，且处于伤后 3 小时内'],
      doses: ['1 g 静脉输注约 10 分钟，随后 1 g 持续静脉输注 8 小时；应尽早启动。'],
      cautions: ['不要等待血栓弹力图/黏弹性检测结果才开始 TXA。', '超过伤后 3 小时不应机械套用该创伤方案；同时按本机构输血/创伤路径复核。']
    },
    '纳洛酮': {
      status: 'verified-partial',
      sourceIds: ['ahaSpecial2025'],
      indications: ['疑似阿片类毒性导致的严重呼吸抑制或呼吸停止'],
      doses: ['按可用鼻喷/肌注/静脉等制剂及本机构方案给药并可重复，治疗终点是恢复足够的自发通气；AHA 2025 未确定一种适用于所有现代阿片暴露的统一理想初始剂量。'],
      cautions: ['不能因等待或给予纳洛酮而延误人工通气或高质量 CPR。', '药效短于部分阿片，症状可复发，需持续观察和必要时重复给药。']
    },
    '氯解磷定': {
      status: 'verified-partial',
      sourceIds: ['ahaSpecial2025'],
      indications: ['危及生命的有机磷类胆碱酯酶抑制剂中毒，作为阿托品和支持治疗的辅助'],
      doses: ['AHA 2025 支持 pralidoxime/解磷定类药物用于危及生命的有机磷中毒；具体负荷和维持剂量本站暂锁定，按具体制剂说明书/本地毒理路径执行。'],
      cautions: ['不能替代足量阿托品和气道/通气支持。', '氨基甲酸酯中毒是否常规使用需结合具体毒物和毒理咨询。']
    }
  });

  if (C.drugs['阿托品']) {
    C.drugs['阿托品'] = {
      ...C.drugs['阿托品'],
      sourceIds: [...new Set([...(C.drugs['阿托品'].sourceIds || []), 'ahaSpecial2025'])],
      indications: [...new Set([...(C.drugs['阿托品'].indications || []), '严重有机磷/氨基甲酸酯中毒的胆碱能危象'])],
      doses: [...new Set([...(C.drugs['阿托品'].doses || []), '毒物场景：按临床阿托品化目标快速滴定；AHA 2025 描述可约每 5 分钟递增/加倍。具体首次剂量与维持方案按毒理协议。'])],
      cautions: [...new Set([...(C.drugs['阿托品'].cautions || []), '毒物场景的目标和剂量远不同于心动过缓算法，切勿混用两套给药逻辑。'])]
    };
  }

  const addUnique = (arr, values) => values.forEach(v => { if (!arr.includes(v)) arr.push(v); });
  addUnique(D.diagnosis, ['严重创伤/大出血', '急性心力衰竭/肺水肿', '急性肺栓塞', '阿片类中毒', '有机磷/氨基甲酸酯中毒']);
  addUnique(D.flows, ['严重创伤/大出血快速处置', '急性肺栓塞风险分层', '中毒 ABC 支持与解毒流程']);

  const ensureDrug = (name, group) => {
    if (!D.drugs.some(x => x.name === name)) D.drugs.push({name, group, verified: C.drugs[name]?.status === 'verified'});
  };
  ensureDrug('氨甲环酸', '创伤/止血');
  ensureDrug('纳洛酮', '解毒药');
  ensureDrug('氯解磷定', '解毒药');

  C.meta.version = 'v0.5-clinical-alpha';
  C.meta.verifiedAt = '2026-08-17';
})();
