---
path: 100_Project/2601_OceanHub/README.md
version: 0.1.2
last_edit_date: 2026-01-27
status: active
tags:
  - todo/now
  - project/oceanhub
---

## Project: OceanHub

### Module 1: Project Charter
- **Core Goal**: Build OceanHub as a platform-style portal that aligns clients and ecosystem partners around offshore energy, monitoring, and marine intelligence.
- **Success Criteria (KPIs)**:
  - [x] Partner-facing homepage exists in Astro (`src/pages/index.astro`). #todo/now
  - [x] Homepage CTA language reflects platform positioning (e.g., "Propose a Collaboration"). #todo/now
  - [x] A partner introduction deck is generated and reusable (`partner_deck/OceanHub_Partner_Deck_v1.0.pptx`). #todo/now
  - [ ] Focus Areas and Insights content are expanded with OceanHub-aligned narratives. #todo/next
  - [ ] A lightweight workflow is defined for "content update -> review -> publish". #todo/next
- **Anti-Goals**:
  - [ ] Do not position OceanHub as a single company selling services. #todo/next
  - [ ] Do not expose internal gating, tiering, or compliance mechanics publicly. #todo/next
  - [ ] Do not let project documentation drift into scattered notes without README write-back. #todo/next

### Module 2: Strategy & Key Factors
- **Key Success Factors (KSF)**:
  - Maintain a consistent platform voice across homepage, content collections, and partner collateral.
  - Treat `src/content/` as the structured knowledge base that drives pages.
  - Keep changes incremental: micro-copy and clarity improvements over heavy redesigns.
  - Ensure partner onboarding collateral can be regenerated from source files (MD/HTML -> PPTX pipeline).
- **Risks/Dependencies**:
  - Playwright/Sharp/PptxGenJS dependencies are now part of the local toolchain for deck generation.
  - Thumbnail validation for PPTX requires LibreOffice (`soffice`), which is not currently available on this machine.
  - Deployment automation (e.g., GitHub Pages via GitHub Actions) is not yet bound in this project.

### Module 3: Architecture & Methods
- **Workflow Binding**:
  - `500_Workflows/weekly_workspace_panel.workflow.md`: Weekly control panel and planning anchor.
  - Project-specific content workflow: *(TBD — define a minimal "content update -> review -> publish" workflow and bind it here).*
- **Tech Stack & Delivery Model** (merged from `NBW_Architecture_Design.md` and adapted to OceanHub):
  - Framework: Astro 5.x (static-first for performance and SEO).
  - Styling: Tailwind CSS 4.x.
  - UI: React where interactivity is needed.
  - Content: Markdown-driven content collections under `src/content/` (type-safe schema via `src/content/config.ts`).
  - Deployment intent: GitHub Pages via GitHub Actions (not yet implemented here).
- **Folder Structure**:
  - `src/pages/`: routing and key landing pages (homepage, focus areas, insights).
  - `src/content/`: structured content collections that act as the project knowledge base.
    - `src/content/focus-areas/`: initiative pages that ladder up to the platform story.
    - `src/content/insights/`: long-tail narrative and thought-leadership content.
    - `src/content/case-studies/`: proof points and ecosystem credibility.
  - `src/layouts/`: shared layout shell (`src/layouts/Layout.astro`).
  - `partner_deck/`: partner-facing deck assets and generation pipeline.
    - `partner_deck/oceanhub_partner_deck_6slides.md`: source narrative.
    - `partner_deck/slides/slide*.html`: slide definitions for conversion.
    - `partner_deck/scripts/build_partner_deck.cjs`: MD/HTML -> PPTX build script.
    - `partner_deck/OceanHub_Partner_Deck_v1.0.pptx`: latest generated deck artifact.
  - `findings.md`, `progress.md`: working notes that must be periodically consolidated here.
- **Content Update Pattern**:
  - Add or edit Markdown in `src/content/*`.
  - Ensure frontmatter is complete and aligned to the platform voice.
  - Let Astro collections drive routes like `/focus-areas/<slug>` and `/insights/<slug>`.
  - After meaningful changes, write back decisions and next actions to this README.

### Module 4: Roadmap & Status
- **Milestones**:
  - M1 — Platform Homepage Foundation: implemented (homepage exists; CTA micro-copy aligned). Target: 2026-01-27.
  - M2 — Partner Collateral v1: implemented (`partner_deck/OceanHub_Partner_Deck_v1.0.pptx`). Target: 2026-01-27.
  - M3 — Content System Expansion: next (focus areas, insights, case studies). Target: TBD.
  - M4 — Project Governance Hardening: in progress (this README rebuild is part of it). Target: 2026-01-27.
- **Current Status**: Active. The platform positioning is now consistent across homepage CTA and partner deck v1.
- **Blockers**:
  - PPTX thumbnail validation cannot run without LibreOffice (`soffice`).
  - No formal workflow document is bound yet for repeatable content operations.

### Module 5: Next Actions
- [ ] Define and bind a minimal content operations workflow in `500_Workflows/` for OceanHub. #todo/now
- [ ] Add 1–2 new Focus Areas or refine existing ones to reflect OceanHub positioning. #todo/now
- [ ] Add one OceanHub-specific "How to contribute content" note under this project (and link it here). #todo/next
- [ ] Decide whether to keep PPTX toolchain dependencies in `package.json` or isolate them. #todo/next
- [ ] If deck visuals need verification, install LibreOffice or use a manual PPTX review pass. #todo/next

### Module 6: Run Log
- **2026-01-27**: Reviewed OceanHub homepage positioning; shifted CTA language to a platform tone -> Homepage now uses "Explore Focus Areas" and "Propose a Collaboration".
- **2026-01-27**: Updated hero subheading to platform framing -> "A shared platform for offshore energy, monitoring, and marine intelligence."
- **2026-01-27**: Created partner deck pipeline (MD/HTML -> PPTX) and generated `partner_deck/OceanHub_Partner_Deck_v1.0.pptx`.
- **2026-01-27**: Consolidated scattered project notes (`findings.md`, `progress.md`, `NBW_Architecture_Design.md`) into this LifeOS-standard README.
- **2026-01-27**: Merged the useful parts of `NBW_Architecture_Design.md` directly into Module 3 (tech stack, content model, and update pattern).
