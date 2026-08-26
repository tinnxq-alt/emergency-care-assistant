(() => {
  const C = window.CLINICAL_DATA;
  if (!C) return;

  Object.assign(C.sources, {
    aasldPortal2024: {
      name:'AASLD Practice Guidance on Risk Stratification and Management of Portal Hypertension and Varices in Cirrhosis',
      year:'2024', org:'AASLD',
      url:'https://www.aasld.org/practice-guidelines/portal-hypertension-bleeding-cirrhosis'
    },
    aasldTips2024: {
      name:'AASLD Practice Guidance on TIPS, Variceal Embolization and Retrograde Transvenous Obliteration',
      year:'2024', org:'AASLD',
      url:'https://pubmed.ncbi.nlm.nih.gov/37390489/'
    },
    baveno7: {
      name:'Baveno VII – Renewing consensus in portal hypertension',
      year:'2022', org:'Baveno VII Faculty / Journal of Hepatology',
      url:'https://www.journal-of-hepatology.eu/article/S0168-8278%2821%2902299-6/fulltext'
    },
    esgeVariceal2022: {
      name:'ESGE Guideline: Endoscopic diagnosis and management of esophagogastric variceal hemorrhage',
      year:'2022', org:'European Society of Gastrointestinal Endoscopy',
      url:'https://www.esge.com/endoscopic-diagnosis-and-management-of-esophagogastric-variceal-hemorrhage'
    }
  });

  C.topics['急性食管胃静脉曲张出血'] = {
    status:'verified',
    sourceIds:['aasldPortal2024','aasldTips2024','baveno7','esgeVariceal2022'],
    summary:'肝硬化/门脉高压患者出现呕血、黑便或失血性休克时，应把急性静脉曲张出血作为时间敏感急症：同步复苏、尽早血管活性药和抗菌药，并在血流动力学复苏后尽快内镜止血。',
    redFlags:[
      '大量呕血、持续活动性出血或循环不稳',
      '肝硬化/门脉高压背景并上消化道出血',
      '意识障碍、误吸风险或无法保护气道',
      'Child–Pugh C 或 Child–Pugh B 且内镜见活动性出血',
      '内镜/药物治疗后仍持续出血或早期再出血'
    ],
    steps:[
      '立即 ABC 评估、建立静脉通路并交叉配血；复苏目标是恢复器官灌注，同时避免过度输液/输血导致门静脉压力进一步升高。',
      '血流动力学稳定、无明显心血管缺血背景时采用限制性红细胞输注：Hb ≤70 g/L 时考虑输注，常见目标 70–90 g/L；休克、持续大出血或心血管病需个体化。',
      '一旦怀疑静脉曲张出血即启动血管活性药（特利加压素、奥曲肽或生长抑素之一），通常持续至最多 5 天；不要等待内镜确认后才开始。',
      '肝硬化/进展性慢性肝病伴急性静脉曲张出血应早期给予抗菌预防；ESGE 推荐头孢曲松 1 g/日、最多 7 天，并结合当地耐药谱、过敏史和感染情况调整。',
      '完成初始血流动力学复苏后，疑似静脉曲张出血应在到院后 12 小时内完成上消化道内镜。',
      '食管静脉曲张活动性出血首选内镜套扎（EBL）。胃底静脉曲张（GOV2/IGV1）与 GOV1 的内镜策略不同，应由具备经验的内镜/介入团队处理。',
      '高再出血风险患者应尽早评估预防性 TIPS：Child–Pugh C ≤13，或 Child–Pugh B >7 且内镜时仍有活动性食管静脉曲张出血等情形，建议 72 小时内、最好 24 小时内考虑。',
      '药物+内镜仍无法控制的食管静脉曲张出血，应紧急评估救援 TIPS；胃静脉曲张失败/早期再出血时可进入 TIPS 或 BRTO 等专门路径。'
    ],
    doses:[
      '头孢曲松：1 g IV，每日 1 次，最多 7 天；结合当地耐药谱、药物过敏和感染情况调整。',
      '如无禁忌且预计胃内大量血液/血块影响内镜，可考虑红霉素 250 mg IV，于内镜前 30–120 分钟给予。',
      '血管活性药应尽早启动并持续最多 5 天；具体制剂、起始剂量和泵速按本机构急救方案/药品说明书执行。'
    ],
    reassess:'持续复评血压、心率、乳酸/灌注、Hb、尿量、意识状态、再出血征象及肝肾功能；同时计算 Child–Pugh/MELD 并尽早识别是否符合预防性 TIPS。',
    caution:'不要仅凭 INR 异常机械追求“纠正凝血”后才做内镜；不要过量输血。活动性大出血、气道保护困难、严重肝性脑病、心血管病和肾功能不全均需个体化复苏与专科升级。'
  };

  Object.assign(C.drugs, {
    '头孢曲松（静脉曲张出血）': {
      status:'verified', sourceIds:['esgeVariceal2022'],
      indications:['进展性慢性肝病/肝硬化患者急性静脉曲张出血的感染预防'],
      doses:['1 g IV，每日 1 次，最多 7 天；结合当地耐药谱、过敏史和已存在感染调整。'],
      cautions:['头孢菌素严重过敏史需替代方案。','应结合当地细菌耐药谱和患者既往多重耐药菌定植/感染史。']
    },
    '红霉素（内镜前）': {
      status:'verified', sourceIds:['esgeVariceal2022'],
      indications:['疑似急性静脉曲张出血且预计胃内血液/血块影响内镜视野，在无禁忌时作为内镜前促胃排空辅助'],
      doses:['250 mg IV，于上消化道内镜前 30–120 分钟给予。'],
      cautions:['注意 QT 延长、相关药物相互作用及心律失常风险。','这是内镜前辅助措施，不能替代血管活性药、抗菌药和内镜止血。']
    },
    '奥曲肽（静脉曲张出血）': {
      status:'source-bound', sourceIds:['aasldPortal2024','esgeVariceal2022'],
      indications:['疑似急性静脉曲张出血时可作为血管活性治疗之一，需尽早启动'],
      doses:['当前网站仅解锁“到院即启动、通常持续至最多 5 天”的治疗时机；具体负荷剂量、持续泵速按本机构方案/药品说明书复核后再解锁。'],
      cautions:['不要等待内镜结果后才开始。','监测心率、血糖和相关不良反应。']
    }
  });

  C.meta.version = 'v0.8-variceal-bleeding';
  C.meta.verifiedAt = '2026-08-17';
})();
