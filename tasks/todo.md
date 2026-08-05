# OceanHub 深度极致优化计划 (In-Depth Platform Optimization Plan)

## 核心优化目标 (Objectives)
将 OceanHub 从现代化静态展示站点全面升级为**深海工程级交互决策中枢与数字化情报工作台**，达到国际顶级海洋工程科技平台（如 Fugro / SLB / DNV / Wood Mackenzie）水准。

---

## 深度优化任务清单 (Task Breakdown)

### 1. 深度交互组件：交互式全水深地层剖面透视器 (`src/components/SubsurfaceVisualizer.astro`)
- [x] 打造沉浸式 4 阶全深度海洋地层交互剖面（Surface Water -> Seabed Bathymetry -> Shallow Soil 0-120m -> Deep Reservoir 800-3000m）
- [x] 支持点击/滑动不同深度层位，实时透视多波束、CPTu 锥尖阻力、浅层气断层、4D DAS 光纤与海洋哺乳动物声学场
- [x] 嵌入首页与各大领域页面，提供沉浸式工程级交互

### 2. 工程决策辅助工具：交互式海洋决策与勘察测绘方案配置器 (`src/components/DecisionScoper.astro`)
- [x] 构建交互式工程选型与勘察方案生成器（Decision Scoping Engine）
- [x] 用户选择工程类型（海上风电/深海CCUS/海缆路由/海洋基线）、作业水深与海底地质条件
- [x] 实时动态生成推荐的多学科地球物理、深水原位岩土 CPTu、生态声学及长效 MRV 监测方案包
- [x] 支持一键保存方案至离线公文包（Briefcase）或导出标准决策简报

### 3. 全局 Command Palette 实时全文本地搜索优化 (`src/layouts/Layout.astro`)
- [x] 为 `⌘K` 弹窗构建全量内容索引（包含 4 大领域、全量 Intelligence 研报及平台使命）
- [x] 支持键盘上下键选择、实时关键词高亮匹配与无刷新直达

### 4. 离线公文包工作台深度增强 (`src/pages/briefcase.astro`)
- [x] 增加公文包数据一键导出（Export as Markdown Dossier / Printable Briefing）
- [x] 增加离线存储容量与本地缓存健康度可视化仪表
- [x] 提供打印友好模式（Printable Decision Briefing）

### 5. 四大核心领域深度内容扩展与工程参数升级
- [x] `src/content/focus-areas/ccus.md`: 增加 4D DAS 光纤布设、盖层毛细管压力不确定性、ISO 27914 合规标准与 ASCII 架构图
- [x] `src/content/focus-areas/offshore-energy.md`: 增加超大直径单桩横向循环受荷 (P-Y)、深水漂浮式吸力锚与 CPTu 联合反演
- [x] `src/content/focus-areas/marine-ecology.md`: 增加打桩噪声水下声传播损失模型 (RAM/PE)、PAM 水听器阵列与 eDNA
- [x] `src/content/focus-areas/offshore-infrastructure.md`: 增加海底滑坡与浊流冲击力、海缆悬跨冲刷与自主 USV 声学巡检

### 6. 全面质量验证与构建确认
- [x] 执行 `npm run check` 确保 0 错误 0 警告
- [x] 执行 `npm run build` 确保所有 14+ 页面与优化组件极速静态打包
- [x] 运行 CI 策略与安全检查（`python scripts/check-ci-policy.py --enforce`）
- [x] 提交并推送到远端仓库

---

## 阶段总结与评审 (Review)
1. **交互体验跃迁**：首页新增的 `SubsurfaceVisualizer`（水深地层剖面透视器）与 `DecisionScoper`（工程勘察决策方案配置器）极大增强了工业级专业度和科技感。
2. **全局搜索赋能**：`⌘K` 实现了客户端 0 延迟实时多字段检索，能够快速定位焦点领域、深度研报和离线工作台。
3. **公文包工作站升级**：支持导出 Markdown 格式决策证据档案（Evidence Dossier）并支持一键打印，满足海上工程团队无网作业下的协同需求。
4. **内容专业深度**：4 大核心战略领域均补充了严格的工程参数（如 CPTu $q_c$、DNV-RP-F105 跨长振动、RAM 抛物方程声学模型、ISO 27914 封存标准）与可视化 ASCII 架构图。
