
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

const resolved = migration.mappings.filter(item => item.status === 'resolved-concept');
const unresolved = migration.mappings.filter(item => item.status !== 'resolved-concept');
assert.equal(resolved.length, 12, '12 个急救药名都应解析为通用药物身份');
assert.equal(unresolved.length, 0, '通用药物身份注册完成后不应保留未解析药名');
assert.ok(resolved.every(item => /^drug-concept-[a-z0-9-]+$/i.test(item.drugId)), '急救流程必须引用稳定 drug-concept ID');
assert.ok(resolved.every(item => !(item.candidateProductIds || []).includes(item.drugId)), '院内品规 ID 不得被误用为通用药物 ID');

for (const flow of flows) {
  const refs = migration.refsForFlow(flow);
  assert.equal(refs.drugRefs.length, flow.drugs.length, `${flow.id} 的每个药名都必须解析为 drug_id`);
  assert.equal(refs.unresolvedDrugNames.length, 0, `${flow.id} 不得保留未解析药名`);
  assert.ok(refs.drugRefs.every(ref => !Object.hasOwn(ref, 'drugName')), `${flow.id} 的引用不得复制药名`);
}

assert.equal(migration.refsForFlow(flows.find(flow => flow.id === 'chest-pain')).drugRefs[0].drugId, 'drug-concept-aspirin');
assert.equal(migration.refsForFlow(flows.find(flow => flow.id === 'hypoglycemia')).drugRefs[0].drugId, 'drug-concept-glucose');
assert.equal(migration.refsForFlow(flows.find(flow => flow.id === 'infection')).drugRefs[0].drugId, 'drug-concept-ceftriaxone');
const cardiacArrestRefs = migration.refsForFlow(flows.find(flow => flow.id === 'cardiac-arrest')).drugRefs.map(ref => ref.drugId);
assert.ok(cardiacArrestRefs.includes('drug-concept-epinephrine'));
assert.ok(cardiacArrestRefs.includes('drug-concept-amiodarone'));

console.log('急救 drug_id 迁移检查通过：12 个药名全部引用通用药物身份，0 个品规 ID 被误用');

