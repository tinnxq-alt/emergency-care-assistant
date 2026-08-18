# 急救诊疗助手 v0.19 — 第四轮既有内容核验

核验日期：2026-08-19。

本轮不新增疾病主题，重点解决“指南证据状态”与“本院库存/制剂规格状态”混在一起的问题，并继续收敛现有 `verified-partial / source-bound` 条目。

## 1. 状态模型修正：证据 ≠ 库存规格

以后临床卡的 `verified / verified-partial / source-bound` 只描述临床指南证据和本站结构化摘要的核验程度。

本院抢救车/病房药库的浓度、每支体积、每瓶总量、库存数量、有效期属于另一层本地数据。照片没有拍到某个浓度或安瓿体积，只会触发“核对实物”警告，不再把已经核验的临床用途降成“部分核验”。

因此本轮将：
- `葡萄糖`：临床低血糖治疗角色升级为 `verified`；50%制剂的具体体积/速度继续本院核对。
- `碳酸氢钠`：危及生命钠通道阻滞剂中毒的临床角色升级为 `verified`；抢救车“250 mL”未显示浓度/总mEq仍单独报警。

## 2. 细菌性脑膜炎 — NICE NG240

主题流程升级为 `verified`：
- 疑似细菌性脑膜炎院内IV抗菌药目标到院后1小时内。
- 安全且不会造成有临床意义延误时，可在抗菌药前腰穿；不能为了腰穿/影像明显延误抗菌药。
- 病原未明确时使用ceftriaxone；NICE明确要求采用BNF/BNFC最高脑膜炎剂量或本地抗菌方案，因此本站不伪造一个跨地区统一成人数值剂量。
- Listeria风险时额外加IV amoxicillin。
- 强烈怀疑/确诊者给IV dexamethasone，最好与首剂抗菌药同时或之前；不得为等待激素延误抗菌药。
- 抗菌药后<12小时才考虑到dexamethasone时仍尽快给；>12小时需感染专科判断。
- ceftriaxone与含钙溶液不相容。

因此“细菌性脑膜炎”主题卡已核验，而`头孢曲松（脑膜炎）`、`地塞米松（细菌性脑膜炎）`两张药物卡继续 `source-bound`，原因是数值剂量需要本地处方集/本院抗菌方案。

## 3. 严重/中度严重症状性低钠 — Society for Endocrinology 2022

已直接核对2022原始PDF，主题卡和高渗氯化钠药物卡升级为 `verified`：
- 严重或中度严重症状均立即使用IV高渗氯化钠，不取决于单一血钠数值。
- 3% NaCl 150 mL（或等效高渗钠液）约20 min，采用间歇bolus。
- 首小时目标约+5 mmol/L。
- 首24小时总升幅≤10 mmol/L，以后每24小时≤8 mmol/L。
- 首小时达到+5 mmol/L但症状未改善时，可再给bolus，目标额外约+1 mmol/L，同时查找其他病因。
- 过度纠正时停高渗液，请有经验团队处理；可按具体情况使用低渗液和/或静脉DDAVP。
- 不建议vaptan用于这种急性场景，也不建议用Adrogué–Madias公式机械计算高渗液量/速度。

本院3%盐水的配制、储存、输注泵、静脉通路与双人核对流程仍属于本地药学制度。

## 4. 急性高钙：保留全病因“部分核验”，补现代HCM分支

一般急性高钙卡仍基于较旧的Society急诊框架，因此保持 `verified-partial`，不为了全绿而强行升级。

新增Endocrine Society恶性肿瘤相关高钙（HCM）现代分支：
- 成人HCM使用IV双膦酸盐或denosumab；指南倾向denosumab优于IV双膦酸盐。
- 严重HCM（血钙>3.5 mmol/L / 14 mg/dL）可用calcitonin + IV双膦酸盐/denosumab起始；calcitonin限48–72小时，避免快速耐受。
- calcitriol介导HCM首先糖皮质激素；仍严重/有症状时再加IV双膦酸盐或denosumab。

该分支只适用于恶性肿瘤相关高钙，不外推为所有甲旁亢、药物性或其他原因高钙的统一处方。

## 5. 葡萄糖 — ADA 2026

临床角色升级为 `verified`：
- 能安全吞咽的一般成人低血糖：约15 g快速碳水/葡萄糖，约15 min复测。
- 不能安全口服：IV glucose或glucagon。
- 医院场景约每15 min复测并重复处理，直至稳定>3.9 mmol/L。

ADA没有要求严重低血糖必须统一使用50%葡萄糖，因此抢救车的“50%葡萄糖 10 g/支”仍仅表示本院制剂可获得性。

## 6. 碳酸氢钠 — AHA 2025

临床证据状态升级为 `verified`，限定于已经核验的特定场景：
- 成人危及生命的TCA/四环类抗抑郁药钠通道阻滞心脏毒性：AHA推荐使用sodium bicarbonate。
- 其他危及生命钠通道阻滞剂中毒：AHA认为使用sodium bicarbonate合理。
- 常规心搏骤停仍不推荐例行使用。
- 高钾性心搏骤停的钙/碳酸氢钠/胰岛素葡萄糖人体结局证据仍不确定，不能替代标准CPR/除颤。

照片里的碳酸氢钠只显示250 mL，未显示浓度和总mEq，因此继续保留动态库存规格警告。

## 7. UI

`clinical-audit-v019.js`增加：
- `verificationNote`：明确解释为什么某卡已核验、为何仍来源绑定，或哪部分属于本院制剂核对。
- 页面运行时版本升级到v0.19。
- 临床核验进度重新计数。
- 不覆盖个人编辑、本院抢救车盘点或病房166种药品数据。

## 一手来源

- NICE NG240 — bacterial meningitis and meningococcal disease.
- Society for Endocrinology — Emergency management of severe and moderately severely symptomatic hyponatraemia in adult patients (2022).
- Endocrine Society — Treatment of Hypercalcemia of Malignancy in Adults (2022/2023).
- ADA Standards of Care in Diabetes—2026.
- AHA 2025 CPR/ECC Part 9 and Part 10.

## 开发/发布

- `main`继续保持稳定基线。
- `agent/emergency-assistant-v0.2`为开发分支。
- `preview`为GitHub Pages开发发布分支。
- Draft PR #1继续保持未合并。
