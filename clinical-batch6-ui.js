(() => {
  const C=window.CLINICAL_DATA;
  if(!C||!window.EMERGENCY_CLINICAL_UI) return;
  const topicKeys=['急性胰腺炎','意外低体温','一氧化碳中毒','三环类/钠通道阻滞剂中毒','β受体阻滞剂中毒','钙通道阻滞剂中毒'];
  const drugKeys=['碳酸氢钠（钠通道阻滞）','高剂量胰岛素（BB/CCB中毒）'];
  document.addEventListener('click',e=>{
    const node=e.target.closest('[data-topic],[data-critical],[data-drug],[data-flow]');
    if(!node) return;
    const raw=node.dataset.topic||node.dataset.critical||node.dataset.drug||node.dataset.flow;
    if(topicKeys.includes(raw)){
      e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
      window.EMERGENCY_CLINICAL_UI.topicCard(raw);return;
    }
    if(drugKeys.includes(raw)){
      e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
      window.EMERGENCY_CLINICAL_UI.drugCard(raw);return;
    }
    if(raw==='低体温急救流程'){
      e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
      window.EMERGENCY_CLINICAL_UI.topicCard('意外低体温');return;
    }
    if(raw==='危重中毒快速流程'){
      e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
      window.EMERGENCY_CLINICAL_UI.topicCard('三环类/钠通道阻滞剂中毒');
    }
  },true);
})();
