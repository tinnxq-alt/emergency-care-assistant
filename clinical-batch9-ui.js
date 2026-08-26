(() => {
  const C=window.CLINICAL_DATA;if(!C||!window.EMERGENCY_CLINICAL_UI)return;
  const map={
    '症状性心动过缓':'症状性心动过缓','成人有脉心动过缓':'成人有脉心动过缓',
    '规则窄QRS心动过速':'规则窄QRS心动过速','成人有脉心动过速':'成人有脉心动过速',
    '宽QRS心动过速（有脉）':'宽QRS心动过速（有脉）',
    '房颤/房扑伴快速心室率':'房颤/房扑伴快速心室率'
  };
  document.addEventListener('click',e=>{
    const node=e.target.closest('[data-topic],[data-critical],[data-flow]');if(!node)return;
    const raw=node.dataset.topic||node.dataset.critical||node.dataset.flow;const key=map[raw];if(!key)return;
    e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
    if(C.algorithms[key])window.EMERGENCY_CLINICAL_UI.algorithmCard(key);else if(C.topics[key])window.EMERGENCY_CLINICAL_UI.topicCard(key);
  },true);
})();