# 急救诊疗助手 v0.13（开发预览）

这是一个独立的基层急诊、抢救与值班工作台项目，与“基层用药助手”分开维护、分开部署、分开回退。

## GitHub Pages

发布源：`preview` / `/(root)`

- 首页：https://tinnxq-alt.github.io/emergency-care-assistant/
- 急症：https://tinnxq-alt.github.io/emergency-care-assistant/emergency.html
- 用药 / 本院抢救车：https://tinnxq-alt.github.io/emergency-care-assistant/drugs.html
- 待办：https://tinnxq-alt.github.io/emergency-care-assistant/todo.html

> `preview` 是开发发布分支；`main` 继续保持稳定基线，当前 Draft PR 暂不合并。

## v0.13

### 本院抢救车库存管理

根据用户提供的《抢救车示意图》照片保留 18 个药品/液体默认条目，并新增本机盘点能力：

- 规格、数量可编辑。
- 库存状态：正常 / 待补 / 缺货 / 已停用。
- 可记录有效期、最近复核日期和本机备注。
- 自动提示已过期或 30 天内临期项目。
- “本次全部已复核”可快速写入当天复核日期。
- 支持库存 JSON 导出 / 导入。
- 可一键恢复照片录入默认库存。
- 所有库存修改仅保存在当前浏览器 LocalStorage，不覆盖指南默认内容。

本院有药只代表现场可获得性，不代表指南推荐、适应证或首选顺序；临床使用前仍需核对实物标签、有效期和本机构制度。

### 心律失常急救扩展

依据 2025 AHA Adult Advanced Life Support / 2025 AHA Algorithms，并结合 2023 ACC/AHA/ACCP/HRS AF 指南，新增/升级：

- 症状性心动过缓。
- 规则窄 QRS 心动过速。
- 宽 QRS 心动过速（有脉）。
- 房颤 / 房扑伴快速心室率。
- 成人有脉心动过缓流程。
- 成人有脉心动过速流程。
- 阿托品、胺碘酮、腺苷药物卡。

高风险要点包括：不稳定心动过速优先电复律；多形性室速按非同步高能量电击；预激房颤/房扑避免常规房室结阻滞药；阿托品的心动过缓剂量与有机磷中毒剂量逻辑严格分开。

## 当前主要能力

- 多页面底部导航：首页 / 急症 / 用药 / 待办均为独立页面。
- 急症、药物、临床流程、普通流程、工具说明、病历模板支持本机编辑；个人修改与指南默认内容分层。
- 指南来源、版本、核验状态与个人编辑分开保存。
- PWA 与基础离线缓存。
- 临床内容按 batch 拆分，方便独立审查和回退。

## 开发策略

- `main`：稳定基线，暂不合并当前功能。
- `agent/emergency-assistant-v0.2`：当前开发分支（沿用原分支名保留 PR 历史）。
- `preview`：GitHub Pages 开发发布分支。
- Draft PR #1：确认满意后再决定是否合并。
