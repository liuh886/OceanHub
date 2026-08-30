# Action Plan: OceanHub Compact & Exquisite EOI Engine Scaffolding

## Todo List
- [x] 1. Initialize Task & Fix Platform Compatibility <!-- id: 1 -->
  - [x] Create `tasks/todo.md` and action plan
  - [x] Fix Windows pathname resolution in `scripts/check-theme-mappings.mjs` using `fileURLToPath`
  - [x] Verify `npm run ci` passes cleanly
- [x] 2. Deepen Engineering Standards & Capabilities Knowledge Schemas <!-- id: 2 -->
  - [x] Enrich `src/lib/engineeringReference.ts` and `src/data/engineeringReferences.ts` with compliance checklist requirements and applicability clauses
  - [x] Enrich `src/lib/capability.ts` and `src/data/capabilities.ts` with operational envelopes (water depth tiers, asset requirements, regional footprints)
  - [x] Enrich `src/lib/marketProvider.ts` with evidence triad metadata (reference projects, core assets, verified credentials)
- [x] 3. Implement Modular EOI Assembly & Procurement Clauses Engine <!-- id: 3 -->
  - [x] Create `src/lib/eoiBuilder.ts` to support modular EOI generation with technical + commercial clause toggles (HSE, classification, local content, timelines)
  - [x] Add capability comparison and gap matrix generator `src/lib/capabilityMatrix.ts`
  - [x] Wire up procurement gate options and compliance matrices in the frontend builder
- [x] 4. Update UI Components with Modular EOI Controls & Print/Export Preview <!-- id: 4 -->
  - [x] Enhance `src/components/ProjectEOI.astro` with modular clause switches (HSE, DNV/ABS certification, Local Content %, submission deadlines)
  - [x] Provide document mode view and structured data hooks for Word/PDF/Markdown exporting
  - [x] Enable tabbed Sourcing Comparison Matrix view directly in EOI Studio
- [x] 5. Verification & Tests <!-- id: 5 -->
  - [x] Add integration test for EOI studio, clauses and comparison matrix in `scripts/test-eoi-studio.mjs`
  - [x] Run full CI verification (`npm run ci` -> 0 errors, 0 warnings, 22 pages built)
  - [x] Create feature branch `feat/eoi-studio-foundations`, stage and commit changes

## Review & Results
- Successfully introduced **Modular EOI Studio Architecture** with technical and procurement compliance gates.
- Built **Engineering Reference Compliance & Clause Mapping** on top of ISO/DNV standards.
- Built **Canonical Capability Operational Envelopes & Evidence Triad Guidance**.
- Built **Capability Comparison & Gap Matrix Engine (`src/lib/capabilityMatrix.ts`)** for procurement evaluation meetings.
- Enhanced UI in `src/components/ProjectEOI.astro` with dual Document/Matrix view and Markdown export.
- Fixed script path resolution in `scripts/check-theme-mappings.mjs`.
