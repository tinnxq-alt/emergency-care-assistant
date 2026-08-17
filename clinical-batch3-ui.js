(() => {
  const C = window.CLINICAL_DATA;
  const UI = window.EMERGENCY_CLINICAL_UI;
  if (!C || !UI) return;

  const topicMap = {
    '急性缺血性卒中':'急性缺血性卒中',
    '自发性脑出血':'自发性脑出血',
    '急性主动脉综合征':'急性主动脉综合征',
    'DKA/HHS':'DKA/HHS',
    '高钾血症':'高钾血症',
    '热射病':'热射病',
    '溺水':'溺水',
    '上消化道出血':'上消化道出血'
  };

  document.addEventListener('click', e => {
    const node = e.target.closest('[data-topic],[data-critical]');
    if (node) {
      const raw = node.dataset.topic || node.dataset.critical;
      const key = topicMap[raw];
      if (key && C.topics[key]) {
        e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
        UI.topicCard(key); return;
      }
    }
    const drug = e.target.closest('[data-drug]');
    if (drug && ['氯化钙','葡萄糖酸钙','普通胰岛素（高钾/DKA）'].includes(drug.dataset.drug)) {
      e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
      UI.drugCard(drug.dataset.drug); return;
    }
  }, true);
})();
