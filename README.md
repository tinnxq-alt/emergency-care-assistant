# 急救诊疗助手 v0.16（第二轮既有内容深审预览）

这是一个独立的基层急诊、抢救与值班工作台项目，与“基层用药助手”分开维护、分开部署、分开回退。

## GitHub Pages

发布源：`preview` / `/(root)`

- 首页：https://tinnxq-alt.github.io/emergency-care-assistant/
- 急症：https://tinnxq-alt.github.io/emergency-care-assistant/emergency.html
- 用药 / 本院抢救车 / 病房药库：https://tinnxq-alt.github.io/emergency-care-assistant/drugs.html
- 待办：https://tinnxq-alt.github.io/emergency-care-assistant/todo.html

> `preview` 是开发发布分支；`main` 继续保持稳定基线，Draft PR #1 暂不合并。

## v0.16：第二轮既有内容深审

复核日期：2026-08-18。继续优先核验、纠错和补充已有内容，不以增加疾病数量为目标。

### 电解质急症

- 高钾血症：补齐 RCUK 2025 胰岛素/葡萄糖、治疗前血糖 <7 mmol/L 后续葡萄糖、沙丁胺醇及钙剂路径；同时加入 AHA 2025 对高钾性心搏骤停钙/碳酸氢钠人体结局证据不确定的提示，避免把不同指南体系混成一个绝对结论。
- 严重症状性低钠：确认 Society for Endocrinology 当前页面仍列出 2022 更新；保留 3% NaCl 150 mL / 约20 min、初始约 +5 mmol/L 的保守路径，并继续要求本院高渗盐水标准化制剂和过度纠正救援协议。
- 急性低钙：复核 10% calcium gluconate 负荷和维持输注，并强化 calcium chloride / gluconate 元素钙差异与静脉刺激性。
- 急性高钙：补充旧版 Society 4–6 L/24 h 仅为可耐受容量患者的参考范围，不是固定处方；loop diuretic 仅用于容量负荷；zoledronic acid 需结合肾功能、病因和说明书。

### 危重中毒

主来源：AHA 2025 CPR/ECC Part 10。

- TCA / 钠通道阻滞剂：解锁 AHA 成人 sodium bicarbonate 50–150 mEq 初始范围，以及 150 mEq/L、1–3 mL/kg/h 的参考持续范围；继续限制 pH >7.55、Na >155 mEq/L。
- β 阻滞剂：high-dose regular human insulin 成人 1 U/kg 初始、1–10 U/kg/h 维持；glucagon 2–10 mg 初始、1–15 mg/h 维持为合理辅助；持续强调血糖、钾和容量监测。
- CCB：high-dose insulin + vasopressor 路径解锁；AHA Table 4 的 toxicology calcium chloride / calcium gluconate 负荷和持续范围加入卡片，并与普通低钙补钙路径严格区分。
- ECLS、dialysis、ILE、methylene blue 等继续按各毒物证据强度标识，不机械套用。

### 心血管急症

- 高血压急症主来源升级到 2025 ACC/AHA BP guideline：通常 >180/120 mmHg + acute target-organ damage；无急性靶器官损害的严重升压不机械 IV 快速降压。
- 急性主动脉综合征：anti-impulse therapy 解锁 HR 60–80/min、SBP <120 mmHg 或维持终末器官灌注的最低可耐受血压；β 阻滞优先，必要时再加 vasodilator。
- 高血压性急性肺水肿：补充 clevidipine / nitroglycerin / nitroprusside 等可滴定 IV vasodilator 路径，并与慢性稳定心衰 beta-blocker 管理区分。
- 急性心衰/肺水肿：明确明显充血住院患者 IV loop diuretic 为快速有效去充血治疗；动态记录 I/O、daily weight、电解质、BUN/Cr；仍不硬编码统一 furosemide 起始剂量。

### COPD

GOLD 官方 2026 Report / Pocket Guide 已确认是当前正式来源，但本轮工具链没有可靠逐条解析官方 Pocket Guide 的精确急性参数。因此 COPD 继续保持 `source-bound`，不使用二手摘要硬编码氧目标、激素剂量或抗菌方案。

详细第二轮审计记录：`CLINICAL_AUDIT_V016.md`。实际修订集中在 `clinical-audit-v016.js`，它在旧 batch 和 v0.15 audit 后加载，保留完整演进和回退能力。

## 已保留能力

- v0.15 第一轮既有内容复核继续保留。
- 病房 166 种药品自动关联：直接读取“基层用药助手”稳定病房目录，不复制第二份药库。
- 本院抢救车 18 个药品/液体默认库存及本机盘点、有效期/复核日期、JSON 导入导出。
- 首页 / 急症 / 用药 / 待办均为独立页面。
- 急症、药物、流程、工具说明、病历模板支持本机编辑；个人修改与指南默认内容分层。
- `verified / verified-partial / source-bound / 待核验` 状态继续保留。
- PWA 和离线缓存。

## 数据职责

- `基层用药助手`：病房药库名称、通用名、规格、剂型、厂家、分类和药品资料。
- `急救诊疗助手`：急症场景、急救流程、指南剂量/参数和安全边界。
- `本院抢救车`：现场库存、数量、有效期和盘点状态。

库存可获得性永远不会覆盖指南推荐优先级或核验状态。

## 开发策略

- `main`：稳定基线，暂不合并当前功能。
- `agent/emergency-assistant-v0.2`：当前开发分支（沿用原分支名保留 PR 历史）。
- `preview`：GitHub Pages 开发发布分支。
- Draft PR #1：确认满意后再决定是否合并。
