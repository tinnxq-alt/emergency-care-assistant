export const CARDIAC_ARREST_FLOW_V020 = {
  id: 'cardiac-arrest',
  title: '心跳骤停',
  category: '急救流程',
  steps: [
    {
      title: '立即判断',
      items: [
        '确认患者反应和呼吸状态',
        '立即呼叫抢救团队',
        '启动心肺复苏流程'
      ]
    },
    {
      title: '初始处理',
      items: [
        '高质量胸外按压',
        '连接监护/除颤设备',
        '建立静脉或骨髓通路'
      ]
    },
    {
      title: '关键药物关联',
      drugs: [
        {
          name: '盐酸肾上腺素',
          source: ['抢救车'],
          role: '心搏骤停核心药物'
        },
        {
          name: '盐酸胺碘酮',
          source: ['抢救车'],
          role: '特定心律失常场景'
        },
        {
          name: '利多卡因',
          source: ['抢救车'],
          role: '部分心律失常场景'
        }
      ]
    },
    {
      title: '寻找可逆原因',
      items: [
        '5H：低氧、低血容量、酸中毒、低/高钾、低温',
        '5T：张力性气胸、心包填塞、毒物、肺栓塞、冠脉血栓'
      ]
    },
    {
      title: '记录模板',
      template: '抢救记录模板'
    }
  ],
  editable: true,
  sourceType: 'clinical-framework'
};
