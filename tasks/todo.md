# OceanHub 顶级网站标准深度精炼计划 (High-Quality Website Standards Refinement)

## 总体目标 (Goal)
以国际顶尖工程科技网站（如 NASA JPL, Schlumberger SLB Digital, DNV Horizon, Stripe Press）的极高设计与交互标准，深度打磨 OceanHub 全站：打造具备极致视觉冲击力、深海赛博科技感、无缝微交互、深水工程严谨度与离线 PWA 韧性的世界级绿色海洋工程技术联盟门户。

---

## 阶段执行清单 (Execution Checklist)

### 阶段 1：首页 Hero 实时海洋遥测台架 (Real-time Telemetry Canvas HUD)
- [x] 升级 `src/pages/index.astro` 右侧 Hero 遥测 HUD，引入实时 HTML5 Canvas 动态波形渲染引擎：
  - **CH 01 (Seismic 3D)**: 动态多道地震反射波形与浅层地质灾害反射扫频动画
  - **CH 02 (Geotech CPTu)**: 实时原位静力触探锥尖阻力 $q_c$ 曲线向下贯入绘制与超孔隙水压力动态图
  - **CH 03 (CCUS 4D DAS)**: 永久光纤微应变光干涉脉冲波与盖层封存安全指示
  - **CH 04 (PAM Ecology)**: 水下被动声学多频段 FFT 频谱跳动与海洋哺乳动物特征波
- [x] 增强频道切换平滑过渡、实时参数微计数器动画与全响应式触摸适配。

### 阶段 2：JIP 绿色工程联合攻关中心深度交互化 (`src/pages/jips/index.astro`)
- [x] 增加 JIP 课题分类动态筛选器（全部 / CCUS 监测 / 漂浮式风电 / 水下声学与生态 / 绿能海缆走廊）。
- [x] 增加 JIP 攻关提案一键预览与导出 (JIP Technical Briefing Export & Print) 及离线公文包一键缓存。
- [x] 丰富各课题的技术标准规范徽章 (DNV-ST-0119, ISO 27914, OSPAR, DNV-RP-F105, API RP 2GEO)。
- [x] 深度绑定 `data-open-alliance-modal`，支持带入当前课题 ID 的精准入盟申请。

### 阶段 3：Focus Areas 战略领域工程严谨度与交互工具化 (`src/pages/focus-areas/`)
- [x] 在 `src/pages/focus-areas/[...slug].astro` 增设「工程决策风险 vs 证据成果矩阵」与「战略联合攻关专项 (Active JIP Track)」联动卡片。
- [x] 增加关联 JIP 联合攻关专项入口卡片，打通“问题领域 → 联合攻关课题”的闭环。
- [x] 替换残留的普通 mailto 链接为联盟模态框触发器。

### 阶段 4：Marine Intelligence 研报阅读体验与学术引用级打磨 (`src/pages/insights/`)
- [x] 在 `src/pages/insights/[...slug].astro` 增加阅读时间预估、执行证据概要 (Executive Synopsis) 与一键引用生成器 (APA / BibTeX / Markdown Cite)。
- [x] 提升研报正文排版（高对比度代码块、工程公式卡片、核心证据高亮摘要、表格深色模式适配）。

### 阶段 5：全站全局视觉、微交互、无障碍 (a11y) 与离线体验打磨
- [x] 全局滚动平滑度、视差发光与 Focus-visible 键盘导航优化。
- [x] 离线公文包 (`src/pages/briefcase.astro`) 支持全量 JIP 离线缓存、批量导出与打印。
- [x] 移动端底部快捷导航与抽屉菜单流畅度优化。

### 阶段 6：全量构建验证、CI 策略合规与部署确认
- [x] 运行 `npm run check` 确保 0 错误 0 警告 0 提示。
- [x] 运行 `npm run build` 确保所有 15+ 页面快速静态生成。
- [x] 运行 `python scripts/check-ci-policy.py --output dist/ci-policy-report.json` 确保合规。
- [x] 提交并推送到远端仓库 `main` 分支。

---

## 质量审核与总结 (Review & Audit)

1. **视觉与交互标杆 (Visuals & Micro-interactions)**:
   - 首页 Hero 搭载自主研发的 60FPS Procedural HTML5 Canvas 示波器模拟器，具备 `requestAnimationFrame` 自适应循环与 `visibilitychange` 智能休眠节电机制。
   - JIP 联合攻关中心支持客户端毫秒级分类瞬切，卡片集成里程碑进度指示器、TRL 成熟度阶梯与国际合规标准徽章。

2. **工程严谨度与闭环设计 (Engineering Rigor & Closed-loop Architecture)**:
   - 全面贯通从底层科学感知（地震/CPTu/DAS/PAM）、Focus Areas 决策矩阵到 JIP 产业联合攻关与联盟入盟申请模态框 (`JoinAllianceModal`) 的完整链路。
   - Marine Intelligence 研报提供学术级阅读时长测算与一键论文级引用生成器。

3. **系统可靠性与工程指标 (System Reliability & Metrics)**:
   - `astro check`: **0 错误、0 警告、0 提示** (28 个源文件全部通过静态诊断)。
   - `astro build`: **15 个静态页面在 5.02 秒内极速编译生成**，零死链、零破损资产引用。
   - `CI Policy`: **4 个工作流、3 个受控流程、0 处违规**。
