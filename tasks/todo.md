# OceanHub 全球顶级深海科技 UI/UX 重构与现代化升级规划 (Next-Gen UI/UX Redesign)

## 目标与设计愿景 (Design Vision)
将 OceanHub 打造为全球顶级的**深海科技与海洋多学科协同决策平台（Cyber-Ocean / High-Tech Marine Intelligence）**，具备媲美 Linear / Vercel / Apple / Palantir 级别的视觉质感、沉浸式深海数据遥测动态交互、决策证据链多维透视与无缝离线 PWA 体验。

---

## 任务拆解与进度 (Task Breakdown & Progress)

### Phase 1: 规划与设计规范升级 (Design Tokens & Visual Architecture)
- [x] 升级全局设计系统 (`src/styles/global.css`):
  - 引入高阶深海科技色系体系（Deep Abyss, Oceanic Cyan, Bioluminescent Emerald, Neon Sky, Electric Indigo, Alert Amber）
  - 定制发光边框动效（Mesh Glow & Border Shimmer）、玻璃拟态层级系统（Glassmorphism Hierarchy: Ultra-thin, Frosted, Opaque Deep）
  - 引入科技 HUD 遥测仪表盘组件样式、高对比度微动效与柔和光波滤镜 (Sonar Pulse / Ocean Caustics)
  - 确保全站 100% 符合 WCAG AA 级别对比度及无障碍 (a11y) 标准

### Phase 2: 导航与全局外壳沉浸化 (Global Shell & Navigation Elevation)
- [x] 升级全局布局 `src/layouts/Layout.astro`:
  - 升级超流线型毛玻璃发光导航栏（含实时系统状态微脉冲、海洋数据协作标签、离线公文包实时计数器徽章）
  - 新增快捷搜索 / 快速探索指令面板（Search & Quick Navigator Modal ⌘K）
  - 重塑现代化科技感 Footer，增加交互式网络拓扑节点、全球海洋协同网络指标及平滑返回顶部动效
- [x] 升级深海科技动效背景 `src/components/TechBackground.astro`:
  - 引入多层粒子网格 + 声呐波纹扫描（Sonar Radar Sweep）+ 水深等深线微动效，自适应性能与节能模式

### Phase 3: 首页 (Index) 颠覆级 UI 视觉与交互重构 (`src/pages/index.astro`)
- [x] **Hero 区域**:
  - 极具视觉冲击力的双栏布局：左侧科技标语 + 决策流入口；右侧**交互式海洋遥测 HUD 仪表板 (Live Ocean Telemetry Matrix)**，动态展示多波束测深 (Bathymetry)、浅层地震 (HR Seismic)、CPTu 锥尖阻力与 4D CCUS 光纤应变监测指标
  - 底部新增动态遥测数据条（Live Telemetry Ribbon: 4 Core Disciplines, 100% Ground Rigour, Sub-seabed to Water Column, Real-time Evidence Chain）
- [x] **Interactive Decision-to-Evidence Pipeline (交互式决策证据流)**:
  - 打造可视化的 3 阶段证据装配流交互组件（01 问题定义 -> 02 多学科传感器与勘测融合 -> 03 决策就绪地质与风险模型），支持点击切换透视不同工程场景
- [x] **Strategic Focus Areas 矩阵**:
  - 重构 4 大核心领域卡片（Offshore CCUS, Offshore Energy, Marine Ecology, Marine Infrastructure）
  - 增加水深作业层级（Depth Horizon）、核心传感器技术标签、声呐图谱微动效及 3D 光感悬停微交互
- [x] **Interactive Offshore Capability Matrix (交互式海洋能力矩阵与过滤器)**:
  - 首页新增交互式决策场景筛选器（按阶段：Feasibility, Pre-FEED, Installation, Asset Monitoring 筛选对应能力与报告）
- [x] **Deep Blue Intelligence 科技情报流**:
  - 精选海洋决策前沿报告，增加阅读时长估算、技术标签、一键收藏至离线公文包及科技高光卡片
- [x] **Founding Network 合作生态**:
  - BGP Offshore（海洋地球物理勘探船队）与 Guangzhou Peneson（深水岩土工程与原位测试）的高端品牌认证展示卡与合作发起抽屉

### Phase 4: Focus Areas 与 Insights 列表及详情页体验精修
- [x] 重构 Focus Areas 列表与详情页 (`src/pages/focus-areas/`):
  - 详情页引入左侧浮动目录导航（Sticky Section Tracker）
  - 决策风险 (Decision Risks) 与证据收益 (Evidence Outcomes) 高科技对比雷达卡片
  - 深度集成离线保存与协同发起 CTA
- [x] 重构 Insights 列表与详情页 (`src/pages/insights/`):
  - 科技研报阅读器排版、代码与图表引用块高级质感、阅读进度指示器
- [x] 精修 About 页面 (`src/pages/about.astro`) & Briefcase 页面 (`src/pages/briefcase.astro`):
  - 强化使命蓝图、海洋圆桌对话（Ocean Talks @ SBGf Rio 25）和离线公文包数据管理视觉

### Phase 5: 验证、性能优化与 CI 确认 (Verification & Testing)
- [x] 运行 `npm run check` (Astro diagnostic: 0 errors, 0 warnings, 0 hints)
- [x] 运行 `npm run build` (13 条路由静态页面全部极速构建成功)
- [x] 运行 `python scripts/check-ci-policy.py --output ci-report.json --enforce` (CI Policy 0 violations)
- [x] 验证 PWA 离线存储、Service Worker 缓存机制与多端自适应响应式效果

---

## Review & Verification Summary
1. **视觉与设计系统 (Aesthetic Excellence)**:
   - 全面引入深渊蓝（Deep Abyss）、深海荧光青（Oceanic Cyan）、生物发光绿（Bioluminescent Emerald）与天青（Sky Blue）配色体系，配合毛玻璃多层穿透质感，视觉质感与专业科技度显著提升。
2. **交互性与动态效果 (Rich Dynamic Interactivity)**:
   - 首页右侧集成 Live Ocean Telemetry Matrix 交互式控制台，支持实时切换地震、原位岩土、CCUS 4D 光纤应变、海洋生态 PAM 声学通道。
   - 首页集成交互式项目生命周期能力矩阵（Capability Matrix），支持按可行性研究、Pre-FEED、施工安装、长效运营监测进行实时筛选。
   - 全局支持 `Cmd+K / Ctrl+K` 快速指令搜索弹窗，直达 4 大核心领域与技术研报。
   - 导航栏实时同步离线公文包（Briefcase）保存数量徽标。
3. **工程质量与规范 (Engineering Rigour)**:
   - 严格遵循 GitHub Pages Base 路径规范，所有静态链接与资源引用均使用 `url()` 辅助函数与相对路径。
   - `npm run check` 通过，24 个文件 0 错误、0 警告、0 提示。
   - 生产构建产物 `dist/` 13 个静态路由及优化图片生成完整。
   - CI 安全审计策略脚本 100% 达标通过。
