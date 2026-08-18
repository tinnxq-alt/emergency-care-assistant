(() => {
  const CART=window.CRASH_CART;if(!CART)return;
  const KEY='emergency_crash_cart_inventory_v1';
  const esc=(s='')=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const original=CART.drugs.map(x=>({...x}));
  let saved={items:{},lastSaved:''};
  try{const x=JSON.parse(localStorage.getItem(KEY)||'{}');saved={items:x.items||{},lastSaved:x.lastSaved||''};}catch{}
  const apply=()=>CART.drugs.forEach((d,i)=>{const x=saved.items[d.name];if(x)Object.assign(d,x);d._default=original[i];});
  const persist=()=>{saved.lastSaved=new Date().toISOString();localStorage.setItem(KEY,JSON.stringify(saved));};
  apply();
  window.CRASH_CART_MANAGER={get:()=>saved,reset:()=>{localStorage.removeItem(KEY);location.reload();}};
  if(document.body.dataset.page!=='drugs')return;

  const overlay=document.querySelector('#overlay'),title=document.querySelector('#modalTitle'),subtitle=document.querySelector('#modalSubtitle'),content=document.querySelector('#modalContent');
  const openModal=(t,st,html)=>{title.textContent=t;subtitle.textContent=st||'';content.innerHTML=html;overlay.classList.add('open');overlay.setAttribute('aria-hidden','false');};
  const today=()=>new Date().toISOString().slice(0,10);
  const expiryState=(v)=>{if(!v)return '';const now=new Date(today()+'T00:00:00');const d=new Date(v+'T00:00:00');if(Number.isNaN(d.getTime()))return '';const days=Math.ceil((d-now)/86400000);if(days<0)return '已过期';if(days<=30)return `临期 ${days} 天`;return '';};
  const stockBadge=(x)=>x.stockState&&x.stockState!=='正常'?`<span class="cart-stock-badge ${x.stockState==='缺货'?'danger':'warn'}">${esc(x.stockState)}</span>`:'<span class="cart-stock-badge ok">正常</span>';

  function injectSummary(){
    if(document.querySelector('#cartInventorySummary'))return;
    const anchor=document.querySelector('.page-tabs');if(!anchor)return;
    const box=document.createElement('section');box.id='cartInventorySummary';box.className='cart-inventory-summary';
    anchor.insertAdjacentElement('afterend',box);renderSummary();
    const btn=document.createElement('button');btn.className='page-chip';btn.id='manageCrashCartBtn';btn.textContent='管理本院抢救车';anchor.append(btn);btn.onclick=openManager;
  }
  function renderSummary(){
    const box=document.querySelector('#cartInventorySummary');if(!box)return;
    const items=CART.drugs;const shortage=items.filter(x=>['待补','缺货'].includes(x.stockState)).length;const exp=items.filter(x=>expiryState(x.expiry)).length;const checked=items.filter(x=>x.checkDate).length;
    box.innerHTML=`<div><strong>本院抢救车</strong><span>${items.length} 个药品/液体条目</span></div><div class="cart-summary-metrics"><span>已记录复核日期 ${checked}</span><span class="${shortage?'danger-text':''}">待补/缺货 ${shortage}</span><span class="${exp?'danger-text':''}">过期/30天内临期 ${exp}</span></div>${saved.lastSaved?`<small>本机库存资料最近保存：${esc(saved.lastSaved.slice(0,16).replace('T',' '))}</small>`:'<small>当前显示照片录入默认库存；尚未保存本机盘点修改。</small>'}`;
  }
  function row(x,i){const exp=expiryState(x.expiry);return `<div class="cart-edit-row" data-cart-row="${i}"><div class="cart-edit-head"><strong>${esc(x.name)}</strong><span>${esc(x.layer)}</span>${stockBadge(x)}${exp?`<span class="cart-stock-badge danger">${esc(exp)}</span>`:''}</div><div class="cart-edit-grid"><label>规格<input data-f="spec" value="${esc(x.spec||'')}"></label><label>数量<input data-f="qty" value="${esc(x.qty||'')}"></label><label>库存状态<select data-f="stockState"><option ${!x.stockState||x.stockState==='正常'?'selected':''}>正常</option><option ${x.stockState==='待补'?'selected':''}>待补</option><option ${x.stockState==='缺货'?'selected':''}>缺货</option><option ${x.stockState==='已停用'?'selected':''}>已停用</option></select></label><label>有效期<input data-f="expiry" type="date" value="${esc(x.expiry||'')}"></label><label>最近复核<input data-f="checkDate" type="date" value="${esc(x.checkDate||'')}"></label><label class="wide">本机备注<input data-f="note" value="${esc(x.note||'')}"></label></div></div>`;}
  function openManager(){
    openModal('管理本院抢救车',`${CART.drugs.length} 个药品/液体条目 · 修改仅保存在当前浏览器`, `<div class="edit-warning">⚠ 库存状态、规格、数量和有效期属于本院本机资料，不会改变指南推荐或药物核验状态。临床使用前仍应核对实物标签。</div><div class="cart-manager-actions"><button id="markCartCheckedBtn" class="edit-card-btn">本次全部已复核</button><button id="exportCartBtn" class="edit-card-btn">导出库存 JSON</button><button id="importCartBtn" class="edit-card-btn">导入 JSON</button><button id="resetCartBtn" class="reset-card-btn">恢复照片默认</button></div><form id="cartInventoryForm">${CART.drugs.map(row).join('')}<div class="edit-form-actions sticky-actions"><button class="save-edit-btn" type="submit">保存本机库存</button></div></form><input id="cartImportFile" type="file" accept="application/json" hidden>`);
    document.querySelector('#cartInventoryForm')?.addEventListener('submit',e=>{e.preventDefault();const items={};document.querySelectorAll('[data-cart-row]').forEach((r,i)=>{const base=original[i];const obj={};r.querySelectorAll('[data-f]').forEach(el=>obj[el.dataset.f]=el.value.trim());items[base.name]=obj;});saved.items=items;persist();location.reload();});
    document.querySelector('#markCartCheckedBtn')?.addEventListener('click',()=>{document.querySelectorAll('[data-f="checkDate"]').forEach(x=>x.value=today());document.querySelectorAll('[data-f="stockState"]').forEach(x=>{if(x.value!=='缺货'&&x.value!=='已停用')x.value='正常';});});
    document.querySelector('#resetCartBtn')?.addEventListener('click',()=>{if(confirm('恢复照片录入的默认规格和数量，并清除本机盘点修改？')){localStorage.removeItem(KEY);location.reload();}});
    document.querySelector('#exportCartBtn')?.addEventListener('click',()=>{const blob=new Blob([JSON.stringify({meta:CART.meta,inventory:saved},null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`急救诊疗助手_抢救车库存_${today()}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500);});
    const file=document.querySelector('#cartImportFile');document.querySelector('#importCartBtn')?.addEventListener('click',()=>file.click());file?.addEventListener('change',async()=>{try{const obj=JSON.parse(await file.files[0].text());const inv=obj.inventory||obj;if(!inv.items)throw new Error('格式不正确');saved={items:inv.items,lastSaved:inv.lastSaved||''};persist();location.reload();}catch(err){alert('导入失败：'+err.message);}});
  }
  queueMicrotask(injectSummary);
})();