/* 急救诊疗助手 v0.20
 * 首页急救入口组件
 */

window.EMERGENCY_HOME_ENTRIES = [
  { id: 'cardiac-arrest', icon: '❤️', title: '心跳骤停', color: 'danger', flow: 'emergency-flow-cardiac-arrest-v020' },
  { id: 'dyspnea', icon: '🫁', title: '呼吸困难', color: 'primary' },
  { id: 'shock', icon: '🩸', title: '休克', color: 'danger' },
  { id: 'altered-consciousness', icon: '🧠', title: '意识障碍', color: 'primary' },
  { id: 'chest-pain', icon: '🫀', title: '胸痛', color: 'danger' },
  { id: 'hypoglycemia', icon: '💉', title: '低血糖', color: 'primary' },
  { id: 'seizure', icon: '⚡', title: '抽搐', color: 'danger' },
  { id: 'infection', icon: '🌡', title: '高热感染', color: 'primary' },
  { id: 'bleeding', icon: '🩸', title: '活动性出血', color: 'danger' },
  { id: 'abdomen', icon: '🩺', title: '急性腹痛', color: 'primary' }
];

function renderEmergencyHomeEntries(target) {
  if (!target) return;
  target.innerHTML = window.EMERGENCY_HOME_ENTRIES.map(item => `
    <div class="app-card emergency-entry ${item.color}">
      <div class="entry-icon">${item.icon}</div>
      <div class="entry-title">${item.title}</div>
    </div>
  `).join('');
}
