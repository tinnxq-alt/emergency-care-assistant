(() => {
  const mapping = {
    '严重创伤/大出血':'严重创伤/大出血',
    '大出血/严重创伤':'严重创伤/大出血',
    '高血压急症':'高血压急症',
    '急性心力衰竭':'急性心力衰竭/肺水肿',
    '急性心力衰竭/肺水肿':'急性心力衰竭/肺水肿',
    '急性肺栓塞':'急性肺栓塞',
    '阿片类中毒':'阿片类中毒',
    '有机磷/氨基甲酸酯中毒':'有机磷/氨基甲酸酯中毒'
  };

  document.addEventListener('click', e => {
    const node = e.target.closest('[data-topic],[data-critical]');
    if (!node) return;
    const raw = node.dataset.topic || node.dataset.critical;
    const key = mapping[raw];
    if (!key || !window.CLINICAL_DATA?.topics?.[key] || !window.EMERGENCY_CLINICAL_UI?.topicCard) return;
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    window.EMERGENCY_CLINICAL_UI.topicCard(key);
  }, true);
})();
