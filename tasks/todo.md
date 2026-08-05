# OceanHub 技术联盟与绿色工程联合攻关 (JIP) 升级计划

## 核心定位对齐 (Aligned Positioning)
- **定位**：**绿色海洋工程技术联盟 (Green Offshore Technology Alliance & Collaborative Innovation Network)**
- **使命**：**探索下一代绿色工程技术，助力海洋绿色可持续开发 (Exploring next-generation green offshore engineering technologies for sustainable marine development)**
- **核心抓手**：**联合工业攻关项目 (Joint Industry Projects / JIP)**，汇聚业主、物探船队、岩土专家与科研机构攻克重大工程断裂与绿色转型难题。

---

## 实施任务清单 (Task Breakdown)

### 1. 全局品牌与定位文案重塑 (Brand & Tagline Re-alignment)
- [x] 更新 `Layout.astro`、`index.astro`、`about.astro` 导航、页脚与头部标语：
  - “A Collaborative Green Marine Innovation Network: Exploring next-generation green engineering technologies for sustainable ocean development.”
  - 强化“绿色海洋工程技术联盟”与“打通跨学科证据链”的核心心智。

### 2. 打造专属「绿色工程联合攻关专区」 (JIP Hub: `src/pages/jips/index.astro` & 首页模块)
- [x] 创建 `src/pages/jips/index.astro` 页面，系统展示 4 大标志性联合攻关方向：
  - **JIP 01: Offshore CCUS 4D Optical DAS & Microseismic MRV** (深水 CCUS 4D 永久光纤与微地震长期封存监测联合攻关)
  - **JIP 02: Floating Offshore Wind Foundation & Cyclic Soil Mechanics** (漂浮式深远海风电吸力锚与复杂地层循环受荷联合攻关)
  - **JIP 03: Ultra-Low Impact Marine Acoustics & Active Bubble Curtain** (极低生态扰动施工与水下噪声主动微气泡降噪联合攻关)
  - **JIP 04: Subsea Green Energy Corridor & Autonomous USV Integrity** (深海绿电/绿氢海缆冲刷悬跨与自主 USV 智能巡护联合攻关)
- [x] 首页新增 JIP 联合攻关专区，支持直观浏览课题目标、参研准入与发起协作。

### 3. 构建全站「加入技术联盟 / 提交合作意向」交互模态框 (`JoinAllianceModal.astro`)
- [x] 打造交互式多步骤申请流程（取代普通 mailto 链接）：
  - **Step 1 机构类型选择**：项目业主/开发商、测绘与装备提供商、科研高校、海事工程总包
  - **Step 2 合作课题匹配**：选择感兴趣的 JIP 攻关方向或提出新课题
  - **Step 3 核心能力与诉求**：填写技术优势、作业船队/实验室资源与预期目标
  - **Step 4 意向书生成与提交**：支持一键导出合作意向书草案并触发直连通道
- [x] 全站导航栏、CTA 按钮统一绑定该交互模态框。

### 4. 导航、离线公文包与全局搜索 (`⌘K`) 深度联动
- [x] 在主导航栏与移动端抽屉中增加「Joint Projects (JIPs)」和「Join Alliance」入口。
- [x] 将 JIP 项目与联盟章程索引至 `Layout.astro` 的客户端 `⌘K` 搜索引擎。
- [x] 离线公文包（`briefcase.astro`）同步支持离线缓存 JIP 攻关方案与合作草案。

### 5. 全面质量验证与构建确认
- [x] 运行 `npm run check` 确保 0 错误 0 警告 (28 files verified)
- [x] 运行 `npm run build` 确保所有 15+ 页面极速静态生成 (15 pages in 5.95s)
- [x] 运行 `python scripts/check-ci-policy.py --enforce` 确保合规 (0 violations)

---

## 阶段成果回顾 (Review)
1. **战略定位跃迁**：从泛化的数据共享平台，升华为具有实体工程研发号召力的“**绿色海洋工程技术联盟 (Green Offshore Technology Alliance)**”。
2. **落地抓手成型**：推出 4 大具象化 JIP 课题，解决行业痛点（CCUS 4D DAS 长期监测、漂浮式风电吸力锚土体弱化、水下微气泡降噪、海缆冲刷与 USV 智能巡检）。
3. **转化闭环建立**：全站配备 `JoinAllianceModal`，将单向内容展示转化为双向产业合作发起通道，极大提升了平台专业度与行业公信力。
