// v0.20 emergency flows
// 高热感染、活动性出血、急性腹痛流程模块

export const infectionFlow = {
  title: '高热感染',
  steps: ['识别感染危险信号', '评估脓毒症风险', '监测生命体征', '建立治疗和转诊路径'],
  notes: '指南内容与本院流程分层管理'
};

export const bleedingFlow = {
  title: '活动性出血',
  steps: ['ABCDE评估', '控制出血源', '循环支持', '评估转诊需求'],
  notes: '重点关注休克风险'
};

export const abdominalPainFlow = {
  title: '急性腹痛',
  steps: ['生命体征评估', '识别急腹症', '必要检查', '外科/专科转诊判断'],
  notes: '避免延误外科急症'
};
