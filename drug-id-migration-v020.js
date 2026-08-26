(() => {
  'use strict';

  const mappings = [
    { emergencyName: '阿司匹林', status: 'ambiguous-in-unified-catalog', drugId: null, candidateDrugIds: ['drug-025', 'outpatient-dl0783', 'outpatient-gx0780'] },
    { emergencyName: '葡萄糖', status: 'ambiguous-in-unified-catalog', drugId: null, candidateDrugIds: ['drug-096', 'outpatient-gx3674'] },
    { emergencyName: '头孢曲松（脑膜炎）', status: 'resolved', drugId: 'drug-164', matchedBy: 'alias-to-genericName', canonicalName: '注射用头孢曲松钠' },
    { emergencyName: '肾上腺素', status: 'missing-from-unified-catalog', drugId: null, inventoryEvidence: '本院抢救车：盐酸肾上腺素 1 mg' },
    { emergencyName: '胺碘酮', status: 'missing-from-unified-catalog', drugId: null, inventoryEvidence: '本院抢救车：盐酸胺碘酮 0.15 g' },
    { emergencyName: '去甲肾上腺素', status: 'missing-from-unified-catalog', drugId: null },
    { emergencyName: '沙丁胺醇', status: 'missing-from-unified-catalog', drugId: null },
    { emergencyName: '异丙托溴铵', status: 'missing-from-unified-catalog', drugId: null },
    { emergencyName: '纳洛酮', status: 'missing-from-unified-catalog', drugId: null },
    { emergencyName: '左乙拉西坦', status: 'missing-from-unified-catalog', drugId: null },
    { emergencyName: '地西泮', status: 'missing-from-unified-catalog', drugId: null },
    { emergencyName: '氨甲环酸', status: 'missing-from-unified-catalog', drugId: null }
  ];

  const byName = Object.fromEntries(mappings.map(item => [item.emergencyName, Object.freeze({ ...item })]));

  function refsForFlow(flow) {
    const drugRefs = [];
    const unresolvedDrugNames = [];
    for (const emergencyName of flow?.drugs || []) {
      const mapping = byName[emergencyName];
      if (mapping?.status === 'resolved') {
        drugRefs.push(Object.freeze({ drugId: mapping.drugId, purpose: '由急救流程上下文定义' }));
      } else {
        unresolvedDrugNames.push(emergencyName);
      }
    }
    return Object.freeze({ drugRefs: Object.freeze(drugRefs), unresolvedDrugNames: Object.freeze(unresolvedDrugNames) });
  }

  window.EMERGENCY_DRUG_ID_MIGRATION_V020 = Object.freeze({
    schemaVersion: 1,
    generatedAt: '2026-08-26',
    emergencyBaseline: '856805613e1967ae56493a77e7b3d5fd309f6dc2',
    medicationBaseline: '523cc38e42760d229c95537dfb74b1570a8738e8',
    policy: 'All 556 ward and outpatient items are audited. Only unique matches receive drugId; missing or ambiguous names remain unresolved for clinical and inventory review.',
    mappings: Object.freeze(mappings.map(item => Object.freeze({ ...item }))),
    refsForFlow
  });
})();
