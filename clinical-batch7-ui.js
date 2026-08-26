(() => {
  const C = window.CLINICAL_DATA;
  if (!C || !window.EMERGENCY_CLINICAL_UI) return;
  const topicAliases = {
    '细菌性脑膜炎':'细菌性脑膜炎','发热+颈硬/意识改变':'细菌性脑膜炎','疑似细菌性脑膜炎快速流程':'细菌性脑膜炎',
    '脑膜炎球菌病':'脑膜炎球菌病','紫癜样皮疹+休克/发热':'脑膜炎球菌病',
    '肾上腺危象':'肾上腺危象','休克+长期激素/肾上腺功能不全':'肾上腺危象','肾上腺危象快速流程':'肾上腺危象',
    '严重症状性低钠血症':'严重症状性低钠血症','低钠伴抽搐/昏迷':'严重症状性低钠血症','低钠危象快速流程':'严重症状性低钠血症',
    '急性低钙血症':'急性低钙血症','急性低钙快速流程':'急性低钙血症',
    '急性高钙血症':'急性高钙血症'
  };
  const drugAliases = new Set(['氢化可的松（肾上腺危象）','高渗氯化钠（症状性低钠）','葡萄糖酸钙（急性低钙）','头孢曲松（脑膜炎）','地塞米松（细菌性脑膜炎）','唑来膦酸（急性高钙）']);

  document.addEventListener('click', e => {
    const node = e.target.closest('[data-topic],[data-critical],[data-flow],[data-drug]');
    if (!node) return;
    const raw = node.dataset.topic || node.dataset.critical || node.dataset.flow || node.dataset.drug;
    if (topicAliases[raw]) {
      e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
      window.EMERGENCY_CLINICAL_UI.topicCard(topicAliases[raw]);return;
    }
    if (drugAliases.has(raw)) {
      e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
      window.EMERGENCY_CLINICAL_UI.drugCard(raw);
    }
  }, true);
})();
