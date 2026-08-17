(() => {
  const C = window.CLINICAL_DATA;
  if (!C || !window.EMERGENCY_CLINICAL_UI) return;

  const topicKey = '急性食管胃静脉曲张出血';
  document.addEventListener('click', (e) => {
    const node = e.target.closest('[data-topic],[data-critical],[data-drug],[data-flow]');
    if (!node) return;
    const raw = node.dataset.topic || node.dataset.critical || node.dataset.drug || node.dataset.flow;

    if (raw === topicKey || raw === '静脉曲张破裂出血' || raw === '静脉曲张出血快速流程') {
      e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
      window.EMERGENCY_CLINICAL_UI.topicCard(topicKey); return;
    }

    if (['头孢曲松（静脉曲张出血）','红霉素（内镜前）','奥曲肽（静脉曲张出血）'].includes(raw)) {
      e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
      window.EMERGENCY_CLINICAL_UI.drugCard(raw);
    }
  }, true);
})();
