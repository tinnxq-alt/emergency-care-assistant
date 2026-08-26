(() => {
  'use strict';

  const mappings = [
    { emergencyName: '阿司匹林', status: 'resolved-concept', drugId: 'drug-concept-aspirin', candidateProductIds: ['drug-025', 'outpatient-dl0783', 'outpatient-gx0780'] },
    { emergencyName: '葡萄糖', status: 'resolved-concept', drugId: 'drug-concept-glucose', candidateProductIds: ['drug-096', 'outpatient-gx3674'] },
    { emergencyName: '头孢曲松（脑膜炎）', status: 'resolved-concept', drugId: 'drug-concept-ceftriaxone', candidateProductIds: ['drug-164'] },
    { emergencyName: '肾上腺素', status: 'resolved-concept', drugId: 'drug-concept-epinephrine', inventoryEvidence: '本院抢救车：盐酸肾上腺素 1 mg' },
    { emergencyName: '胺碘酮', status: 'resolved-concept', drugId: 'drug-concept-amiodarone', inventoryEvidence: '本院抢救车：盐酸胺碘酮 0.15 g' },
    { emergencyName: '去甲肾上腺素', status: 'resolved-concept', drugId: 'drug-concept-norepinephrine' },
    { emergencyName: '沙丁胺醇', status: 'resolved-concept', drugId: 'drug-concept-salbutamol' },
    { emergencyName: '异丙托溴铵', status: 'resolved-concept', drugId: 'drug-concept-ipratropium' },
    { emergencyName: '纳洛酮', status: 'resolved-concept', drugId: 'drug-concept-naloxone' },
    { emergencyName: '左乙拉西坦', status: 'resolved-concept', drugId: 'drug-concept-levetiracetam' },
    { emergencyName: '地西泮', status: 'resolved-concept', drugId: 'drug-concept-diazepam' },
    { emergencyName: '氨甲环酸', status: 'resolved-concept', drugId: 'drug-concept-tranexamic-acid' }
  ];

  const byName = Object.fromEntries(mappings.map(item => [item.emergencyName, Object.freeze({ ...item })]));

  function refsForFlow(flow) {
    const drugRefs = [];
    const unresolvedDrugNames = [];
    for (const emergencyName of flow?.drugs || []) {
      const mapping = byName[emergencyName];
      if (mapping?.status === 'resolved-concept') {
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
    policy: 'Emergency flows reference stable drug_concepts. Existing drug-* and outpatient-* IDs remain product IDs; concept resolution does not assert a local product or current inventory availability.',
    mappings: Object.freeze(mappings.map(item => Object.freeze({ ...item }))),
    refsForFlow
  });
})();

