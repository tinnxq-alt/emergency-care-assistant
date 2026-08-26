(() => {
  const C=window.CLINICAL_DATA;
  if(!C||!window.EMERGENCY_CLINICAL_UI) return;
  const map={
    '社区获得性肺炎（成人）':'社区获得性肺炎（成人）','社区获得性肺炎':'社区获得性肺炎（成人）','肺炎严重度与转诊流程':'肺炎严重度与转诊流程',
    '急性肾损伤':'急性肾损伤','AKI':'急性肾损伤','AKI快速评估流程':'AKI快速评估流程',
    '急性肾盂肾炎':'急性肾盂肾炎','COPD急性加重':'COPD急性加重'
  };
  document.addEventListener('click',e=>{
    const node=e.target.closest('[data-topic],[data-critical],[data-flow]');
    if(!node) return;
    const raw=node.dataset.topic||node.dataset.critical||node.dataset.flow;
    const key=map[raw]; if(!key) return;
    e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
    if(C.algorithms[key]) window.EMERGENCY_CLINICAL_UI.algorithmCard(key);
    else if(C.topics[key]) window.EMERGENCY_CLINICAL_UI.topicCard(key);
  },true);
})();
