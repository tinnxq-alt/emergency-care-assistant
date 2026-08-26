(() => {
  const commonSteps = [
    '快速判断：先识别气道、呼吸、循环、意识和其他立即威胁生命的异常。',
    '初始处理：按当前危险程度启动监护、呼叫支援并执行本院急救流程。',
    '检查与监测：围绕最危险且可逆的病因安排检查，并持续复评。',
    '升级与记录：达到升级条件时尽早转诊/会诊，完整记录时间轴与疗效。'
  ];

  window.EMERGENCY_FLOWS_V020 = [
    {
      id: 'cardiac-arrest', icon: '❤', title: '心搏骤停', tone: 'danger',
      summary: '从无反应入口快速进入复苏、节律判断、可逆原因和记录闭环。',
      status: '已有指南卡', topics: ['心搏骤停'], drugs: ['肾上腺素', '胺碘酮'],
      branches: ['立即复苏与呼叫支援', '节律与除颤路径', '可逆原因', '自主循环恢复后处置'],
      steps: commonSteps
    },
    {
      id: 'shock', icon: '◆', title: '休克/循环不稳', tone: 'danger',
      summary: '先确认灌注异常，再按感染、失血、过敏和心源性等方向分流。',
      status: '流程框架', topics: ['脓毒症', '严重过敏反应', '严重创伤/大出血'], drugs: ['去甲肾上腺素', '肾上腺素'],
      branches: ['感染性休克', '低容量/失血性休克', '过敏性休克', '心源性休克'],
      steps: commonSteps
    },
    {
      id: 'respiratory-distress', icon: '◌', title: '严重呼吸困难', tone: 'primary',
      summary: '从气道和氧合危险开始，避免在病因未明时过早固定为单一诊断。',
      status: '已有多张指南卡', topics: ['急性心力衰竭', '哮喘急性发作', 'COPD急性加重', '急性肺栓塞'], drugs: ['沙丁胺醇', '异丙托溴铵'],
      branches: ['急性心衰/肺水肿', '哮喘或 COPD 急性加重', '肺栓塞', '气胸或其他气道问题'],
      steps: commonSteps
    },
    {
      id: 'chest-pain', icon: '♥', title: '急性胸痛', tone: 'danger',
      summary: '优先排查高危胸痛，并将 ACS、主动脉综合征和肺栓塞分开处理。',
      status: '已有指南卡', topics: ['急性冠脉综合征', '急性主动脉综合征', '急性肺栓塞'], drugs: ['阿司匹林'],
      branches: ['急性冠脉综合征', '主动脉综合征', '肺栓塞', '其他高危胸痛'],
      steps: commonSteps
    },
    {
      id: 'altered-consciousness', icon: '◎', title: '意识障碍', tone: 'primary',
      summary: '先保护生命功能并排除低血糖等可逆原因，再进入卒中、抽搐、中毒或感染路径。',
      status: '流程框架', topics: ['低血糖', '急性缺血性卒中', '癫痫持续状态', '急性中毒（待核验）'], drugs: ['葡萄糖', '纳洛酮'],
      branches: ['低血糖', '急性脑卒中', '癫痫持续状态', '中毒或严重感染'],
      steps: commonSteps
    },
    {
      id: 'hypoglycemia', icon: '↓', title: '低血糖', tone: 'primary',
      summary: '围绕即时确认、意识与吞咽能力、纠正和复测建立闭环。',
      status: '已核验', topics: ['低血糖'], drugs: ['葡萄糖'],
      branches: ['可安全口服', '不能安全口服', '复发或诱因未明'],
      steps: commonSteps
    },
    {
      id: 'seizure', icon: '⚡', title: '抽搐/癫痫持续状态', tone: 'danger',
      summary: '保护患者、记录持续时间、处理可逆原因，并在持续发作时升级。',
      status: '已有指南卡', topics: ['癫痫持续状态'], drugs: ['左乙拉西坦', '地西泮'],
      branches: ['首次或短暂发作', '持续/反复发作', '代谢或中毒相关', '妊娠等特殊情形'],
      steps: commonSteps
    },
    {
      id: 'infection', icon: '✣', title: '严重感染/高热', tone: 'warning',
      summary: '从感染危险信号与器官功能异常切入，并同步寻找感染来源。',
      status: '已有相关指南卡', topics: ['脓毒症', '细菌性脑膜炎', '脑膜炎球菌病'], drugs: ['头孢曲松（脑膜炎）'],
      branches: ['脓毒症', '中枢神经系统感染', '呼吸/泌尿/腹腔来源', '不明来源感染'],
      steps: commonSteps
    },
    {
      id: 'bleeding', icon: '●', title: '大出血/严重创伤', tone: 'danger',
      summary: '优先控制出血、识别失血性休克并尽早启动转诊和资源协调。',
      status: '已有相关指南卡', topics: ['严重创伤/大出血', '上消化道出血', '急性食管胃静脉曲张出血'], drugs: ['氨甲环酸'],
      branches: ['外伤性出血', '消化道出血', '产科或其他出血', '隐匿性失血'],
      steps: commonSteps
    },
    {
      id: 'abdominal-pain', icon: '◇', title: '急性腹痛', tone: 'warning',
      summary: '先识别休克、腹膜刺激征和其他急腹症危险，再进行病因分流。',
      status: '入口框架', topics: ['急性胰腺炎', '急性主动脉综合征'], drugs: [],
      branches: ['外科急腹症', '血管性急症', '消化系统急症', '泌尿或妇产科方向'],
      steps: commonSteps
    }
  ];
})();
