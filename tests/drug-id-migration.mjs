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
const unresolved = migration.mappings.filter(item => item.status !== 'resolved');
assert.equal(resolved.length, 3, '当前仅允许固化 3 个唯一匹配');
assert.equal(unresolved.length, 9, '9 个未进入统一药库的药名必须保持阻塞');
assert.ok(resolved.every(item => /^drug-[a-z0-9-]+$/i.test(item.drugId)), '已解决项必须使用稳定 drugId');
assert.ok(unresolved.every(item => item.drugId === null), '未解决项不得分配猜测 ID');

for (const flow of flows) {
  const refs = migration.refsForFlow(flow);
  assert.equal(refs.drugRefs.length + refs.unresolvedDrugNames.length, flow.drugs.length, `${flow.id} 的每个药名都必须有迁移状态`);
  assert.ok(refs.drugRefs.every(ref => !Object.hasOwn(ref, 'drugName')), `${flow.id} 的引用不得复制药名`);
}

assert.equal(migration.refsForFlow(flows.find(flow => flow.id === 'chest-pain')).drugRefs[0].drugId, 'drug-025');
assert.equal(migration.refsForFlow(flows.find(flow => flow.id === 'hypoglycemia')).drugRefs[0].drugId, 'drug-096');
assert.equal(migration.refsForFlow(flows.find(flow => flow.id === 'infection')).drugRefs[0].drugId, 'drug-164');

console.log('急救 drug_id 迁移审计通过：3 个唯一匹配，9 个明确阻塞，0 个猜测 ID');
