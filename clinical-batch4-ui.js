(() => {
  const C = window.CLINICAL_DATA;
  if (!C || !window.EMERGENCY_CLINICAL_UI) return;

  const topicKey = '动脉瘤性蛛网膜下腔出血';

  document.addEventListener('click', (e) => {
    const node = e.target.closest('[data-topic],[data-critical],[data-drug],[data-flow]');
    if (!node) return;

    const raw = node.dataset.topic || node.dataset.critical || node.dataset.drug || node.dataset.flow;

    if (raw === topicKey || raw === '蛛网膜下腔出血' || raw === '雷击样头痛/疑似SAH' || raw === '蛛网膜下腔出血快速流程') {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      window.EMERGENCY_CLINICAL_UI.topicCard(topicKey);
      return;
    }

    if (raw === '尼莫地平') {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      window.EMERGENCY_CLINICAL_UI.drugCard('尼莫地平');
    }
  }, true);
})();
