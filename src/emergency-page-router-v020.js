/* 急救诊疗助手 v0.20
 * 急症入口路由
 */

window.EMERGENCY_ROUTES = {
  'cardiac-arrest': {
    title: '心跳骤停',
    page: 'cardiac-arrest.html',
    linkedDrugs: ['肾上腺素', '胺碘酮', '利多卡因']
  },
  'hypoglycemia': {
    title: '低血糖',
    linkedDrugs: ['葡萄糖', '胰岛素']
  },
  'shock': {
    title: '休克',
    linkedDrugs: ['肾上腺素', '多巴胺', '补液']
  }
};

function openEmergencyFlow(id) {
  const flow = window.EMERGENCY_ROUTES[id];
  if (!flow) return;
  window.location.href = flow.page;
}
