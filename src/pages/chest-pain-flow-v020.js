// v0.20 胸痛急救流程模块

export const chestPainFlow = {
  title: '胸痛',
  steps: [
    '快速识别高危胸痛',
    '心电图和基础监测',
    '鉴别ACS、主动脉综合征、肺栓塞等',
    '启动转诊和治疗路径'
  ],
  branches: [
    { name: '急性冠脉综合征', drugs: ['阿司匹林'], notes: '根据指南和禁忌评估处理' },
    { name: '主动脉综合征', drugs: [], notes: '避免延误诊断' },
    { name: '肺栓塞', drugs: ['抗凝相关药物'], notes: '风险分层后处理' }
  ]
};
