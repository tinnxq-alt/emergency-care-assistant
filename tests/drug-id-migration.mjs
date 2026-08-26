import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const context = { window: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync('flow-data.js', 'utf8'), context);
vm.runInContext(fs.readFileSync('drug-id-migration-v020.js', 'utf8'), context);

const flows = context.window.EMERGENCY_FLOWS_V020;
const migration = context.window.EMERGENCY_DRUG_ID_MIGRATION_V020;
const names = [...new Set(flows.flatMap(flow => flow.drugs || []))];

assert.equal(flows.length, 10, 'v0.20 应保持 10 个急救流程');
assert.equal(names.length, 12, '急救流程应覆盖 12 个不同药名');
assert.equal(migration.mappings.length, names.length, '每个急救药名都必须有迁移结论');
assert.deepEqual(new Set(migration.mappings.map(item => item.emergencyName)), new Set(names), '迁移表必须完整覆盖流程药名');

const resolved = migration.mappings.filter(item => item.status === 'resolved');
const singleProduct = migration.mappings.filter(item => item.status === 'single-product-candidate');
const ambiguous = migration.mappings.filter(item => item.status === 'multiple-product-candidates');
const missing = migration.mappings.filter(item => item.status === 'missing-from-unified-catalog');
const unresolved = [...singleProduct, ...ambiguous, ...missing];
assert.equal(resolved.length, 0, '院内品规 ID 不得直接固化为通用药物 ID');
assert.equal(singleProduct.length, 1, '头孢曲松应记录为单品规候选而不是通用药物 ID');
assert.equal(ambiguous.length, 2, '阿司匹林和葡萄糖必须保持多品规待选');
assert.equal(missing.length, 9, '9 个未进入统一药库的药名必须保持阻塞');
assert.ok(resolved.every(item => /^drug-[a-z0-9-]+$/i.test(item.drugId)), '已解决项必须使用稳定 drugId');
assert.ok(unresolved.every(item => item.drugId === null), '未解决项不得分配猜测 ID');

for (const flow of flows) {
  const refs = migration.refsForFlow(flow);
  assert.equal(refs.drugRefs.length + refs.unresolvedDrugNames.length, flow.drugs.length, `${flow.id} 的每个药名都必须有迁移状态`);
  assert.ok(refs.drugRefs.every(ref => !Object.hasOwn(ref, 'drugName')), `${flow.id} 的引用不得复制药名`);
}

assert.equal(migration.refsForFlow(flows.find(flow => flow.id === 'chest-pain')).drugRefs.length, 0);
assert.deepEqual([...migration.refsForFlow(flows.find(flow => flow.id === 'chest-pain')).unresolvedDrugNames], ['阿司匹林']);
assert.equal(migration.refsForFlow(flows.find(flow => flow.id === 'hypoglycemia')).drugRefs.length, 0);
assert.deepEqual([...migration.refsForFlow(flows.find(flow => flow.id === 'hypoglycemia')).unresolvedDrugNames], ['葡萄糖']);
assert.equal(migration.refsForFlow(flows.find(flow => flow.id === 'infection')).drugRefs.length, 0);
assert.deepEqual([...migration.refsForFlow(flows.find(flow => flow.id === 'infection')).unresolvedDrugNames], ['头孢曲松（脑膜炎）']);

console.log('急救 drug_id 迁移审计通过：0 个品规 ID 被误用，1 个单品规候选，2 个多品规候选，9 个缺失');
