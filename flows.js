(() => {
  const flows = window.EMERGENCY_FLOWS_V020 || [];
  const $ = (selector) => document.querySelector(selector);
  const esc = (value = '') => String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[char]));
  const grid = $('#flowGrid');
  const search = $('#flowSearch');
  const overlay = $('#flowOverlay');

  function statusClass(status) {
    if (status.includes('已核验')) return 'ready';
    if (status.includes('指南卡')) return 'partial';
    return 'pending';
  }

  function render() {
    const query = (search?.value || '').trim().toLowerCase();
    const visible = flows.filter((flow) => {
      const text = [flow.title, flow.summary, flow.status, ...flow.topics, ...flow.drugs, ...flow.branches].join(' ').toLowerCase();
      return !query || text.includes(query);
    });
    grid.innerHTML = visible.map((flow) => `
      <button class="flow-entry flow-entry--${esc(flow.tone)}" data-flow-id="${esc(flow.id)}">
        <span class="flow-entry__icon" aria-hidden="true">${esc(flow.icon)}</span>
        <span class="flow-entry__body">
          <strong>${esc(flow.title)}</strong>
          <small>${esc(flow.summary)}</small>
          <span class="status ${statusClass(flow.status)}">${esc(flow.status)}</span>
        </span>
        <span aria-hidden="true">→</span>
      </button>`).join('') || '<div class="page-empty">没有匹配的急救流程</div>';
    $('#flowCount').textContent = `${visible.length} 个流程入口`;
  }

  function openFlow(id) {
    const flow = flows.find((item) => item.id === id);
    if (!flow) return;
    $('#flowModalTitle').textContent = flow.title;
    $('#flowModalSubtitle').textContent = `${flow.status} · v0.20 导航框架`;
    $('#flowModalContent').innerHTML = `
      <div class="callout"><strong>使用边界：</strong>此页提供快速导航和处置结构。具体药物剂量、操作参数、禁忌证及转诊标准，必须进入对应已核验临床卡并结合本院制度复核。</div>
      <section class="modal-card"><h3>分流方向</h3><div class="flow-tags">${flow.branches.map((item) => `<span>${esc(item)}</span>`).join('')}</div></section>
      <section class="modal-card"><h3>共同处理骨架</h3><ol class="flow-checklist">${flow.steps.map((item) => `<li>${esc(item)}</li>`).join('')}</ol></section>
      <section class="modal-card"><h3>关联临床主题</h3><div class="flow-links">${flow.topics.map((item) => `<a href="./emergency.html?q=${encodeURIComponent(item)}">${esc(item)} →</a>`).join('')}</div></section>
      <section class="modal-card"><h3>关联用药</h3>${flow.drugs.length ? `<div class="flow-links">${flow.drugs.map((item) => `<a href="./drugs.html?q=${encodeURIComponent(item)}">${esc(item)} →</a>`).join('')}</div>` : '<p>此入口不预设药物；请根据病因和已核验流程选择。</p>'}</section>
      <section class="modal-card"><h3>资料分层</h3><p>指南内容、本院抢救车可获得性、病房药库和本机编辑分层显示；“本院有药”不代表该场景优先推荐。</p></section>`;
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    $('#closeFlowModal').focus();
  }

  function closeFlow() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
  }

  search?.addEventListener('input', render);
  grid?.addEventListener('click', (event) => {
    const target = event.target.closest('[data-flow-id]');
    if (target) openFlow(target.dataset.flowId);
  });
  $('#closeFlowModal')?.addEventListener('click', closeFlow);
  overlay?.addEventListener('click', (event) => { if (event.target === overlay) closeFlow(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && overlay.classList.contains('open')) closeFlow(); });
  render();
})();
