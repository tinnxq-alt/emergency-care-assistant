(() => {
  const D=window.EMERGENCY_DATA;
  if(!D) return;
  const page=document.body.dataset.page;
  const $=s=>document.querySelector(s);
  const esc=(s='')=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const overlay=$('#overlay'), title=$('#modalTitle'), subtitle=$('#modalSubtitle'), content=$('#modalContent');
  const openModal=(t,st,html)=>{if(!overlay)return;title.textContent=t;subtitle.textContent=st||'';content.innerHTML=html;overlay.classList.add('open');overlay.setAttribute('aria-hidden','false');};
  const closeModal=()=>{overlay?.classList.remove('open');overlay?.setAttribute('aria-hidden','true');};
  $('#closeModalBtn')?.addEventListener('click',closeModal);
  overlay?.addEventListener('click',e=>{if(e.target===overlay)closeModal();});

  function genericEmergency(name,critical=false){
    const sections=['立即评估','红旗征象','首要处置','必要检查/鉴别','动态复评','转诊/留观','记录要点'];
    openModal(name,critical?'高危入口 · 尚无专属指南卡':'主诉/急症入口 · 尚无专属指南卡',`<div class="callout">当前条目用于安全的信息结构和本机补充。未完成权威核验的药物剂量、操作参数不会自动生成。</div>${sections.map((x,i)=>`<section class="modal-card"><h3>${i+1}. ${x}</h3><p>${x==='红旗征象'?'请补充本机构需要立即抢救、升级监护或转诊的触发条件。':'可通过“编辑此项”保存你的本机内容。'}</p></section>`).join('')}`);
  }
  function genericDrug(name){
    const item=(D.drugs||[]).find(x=>x.name===name);
    openModal(name,item?.group||'抢救用药',`<div class="callout">此药物尚无完整结构化临床卡。剂量、稀释、泵速等高风险字段在权威核验前保持锁定；你可以添加本机备注，但应重新临床复核。</div>${['适应证','成人剂量','给药途径','稀释/泵速','禁忌与慎用','不良反应','特殊人群','来源与更新时间'].map(x=>`<section class="modal-card"><h3>${x}</h3><p>待权威来源核验或本机补充。</p></section>`).join('')}`);
  }

  function renderEmergency(){
    const criticalGrid=$('#criticalPageGrid'), grid=$('#emergencyPageGrid'), search=$('#emergencySearch');
    let mode='diagnosis';
    const renderCritical=(q='')=>{if(!criticalGrid)return;const arr=(D.critical||[]).filter(x=>!q||`${x.name} ${x.desc}`.toLowerCase().includes(q));criticalGrid.innerHTML=arr.map(x=>`<button class="page-item" data-critical="${esc(x.name)}"><div><strong>${esc(x.name)}</strong><small>${esc(x.desc)}</small></div><span>→</span></button>`).join('')||'<div class="page-empty">没有匹配的红旗入口</div>';};
    const renderList=(q='')=>{if(!grid)return;const arr=(D[mode]||[]).filter(x=>!q||String(x).toLowerCase().includes(q));grid.innerHTML=arr.map(x=>`<button class="page-item" data-topic="${esc(x)}"><strong>${esc(x)}</strong><span>→</span></button>`).join('')||'<div class="page-empty">没有匹配内容</div>';};
    const refresh=()=>{const q=(search?.value||'').trim().toLowerCase();renderCritical(q);renderList(q);};
    document.querySelectorAll('[data-emergency-mode]').forEach(btn=>btn.addEventListener('click',()=>{mode=btn.dataset.emergencyMode;document.querySelectorAll('[data-emergency-mode]').forEach(x=>x.classList.toggle('active',x===btn));refresh();}));
    search?.addEventListener('input',refresh);renderCritical();renderList();
  }

  function renderDrugs(){
    const host=$('#drugPageGroups'), search=$('#drugSearch');
    const render=()=>{
      const q=(search?.value||'').trim().toLowerCase();
      const arr=(D.drugs||[]).filter(x=>!q||`${x.name} ${x.group}`.toLowerCase().includes(q));
      const groups=new Map();arr.forEach(x=>{if(!groups.has(x.group))groups.set(x.group,[]);groups.get(x.group).push(x);});
      host.innerHTML=[...groups.entries()].map(([group,items])=>`<section class="drug-group"><h3>${esc(group)}</h3><div class="page-grid">${items.map(x=>`<button class="page-item" data-drug="${esc(x.name)}"><div><strong>${esc(x.name)}</strong><small>${x.verified===true?'已核验':x.verified==='partial'?'部分核验':'待核验'}</small></div><span>→</span></button>`).join('')}</div></section>`).join('')||'<div class="page-empty">没有匹配药物</div>';
    };
    search?.addEventListener('input',render);render();
  }

  function renderTodo(){
    const key='emergency_assistant_v02_todos';let todos=[];
    try{todos=JSON.parse(localStorage.getItem(key)||'[]');}catch{}
    if(!todos.length)todos=[{text:'复核抢救车药品',done:false},{text:'补充常用急症流程',done:false}];
    const host=$('#standaloneTodo'),input=$('#standaloneTodoInput');
    const save=()=>localStorage.setItem(key,JSON.stringify(todos));
    const render=()=>{host.innerHTML=todos.map((t,i)=>`<div class="todo-row ${t.done?'done':''}"><input type="checkbox" data-todo-check="${i}" ${t.done?'checked':''}><span>${esc(t.text)}</span><button data-todo-del="${i}">删除</button></div>`).join('')||'<div class="page-empty">暂无待办</div>';$('#standaloneTodoCount').textContent=`${todos.filter(x=>!x.done).length} 项未完成`;save();};
    $('#standaloneTodoAdd')?.addEventListener('click',()=>{const v=input.value.trim();if(!v)return;todos.unshift({text:v,done:false});input.value='';render();});
    input?.addEventListener('keydown',e=>{if(e.key==='Enter')$('#standaloneTodoAdd')?.click();});
    host?.addEventListener('change',e=>{if(e.target.matches('[data-todo-check]')){todos[+e.target.dataset.todoCheck].done=e.target.checked;render();}});
    host?.addEventListener('click',e=>{if(e.target.matches('[data-todo-del]')){todos.splice(+e.target.dataset.todoDel,1);render();}});render();
  }

  if(page==='emergency')renderEmergency();
  if(page==='drugs')renderDrugs();
  if(page==='todo')renderTodo();

  // Fallback handlers run only when no clinical capture-layer handler consumed the click.
  document.body.addEventListener('click',e=>{
    if(page==='emergency'){
      const c=e.target.closest('[data-critical]');if(c){genericEmergency(c.dataset.critical,true);return;}
      const t=e.target.closest('[data-topic]');if(t){genericEmergency(t.dataset.topic,false);return;}
    }
    if(page==='drugs'){
      const d=e.target.closest('[data-drug]');if(d){genericDrug(d.dataset.drug);return;}
    }
  });
})();
