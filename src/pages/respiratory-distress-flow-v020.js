// v0.20 呼吸困难急救流程模块
// 与基层用药助手同风格，不同急救主题

export const respiratoryDistressFlow = {
  title: '呼吸困难',
  steps: [
    '快速判断气道、呼吸、循环及意识状态',
    '氧合评估与监测',
    '根据病因分流处理',
    '关联急救药物与转诊路径'
  ],
  branches: [
    { name: '急性心衰肺水肿', drugs: ['呋塞米'], notes: '关注容量状态和血流动力学' },
    { name: 'COPD急性加重', drugs: ['支气管扩张相关药物'], notes: '评估氧疗和NIV需求' },
    { name: '哮喘急性发作', drugs: ['支气管舒张药'], notes: '按严重程度处理' },
    { name: '肺栓塞', drugs: ['抗凝相关药物'], notes: '结合风险评估及转诊' },
    { name: '气胸', drugs: [], notes: '评估是否需要紧急处理' }
  ]
};
