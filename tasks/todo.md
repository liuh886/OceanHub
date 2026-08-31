# Action Plan: OceanHub Compact & Exquisite EOI Engine Scaffolding & Multi-Archetype Expansion (Phase 3)

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
- [x] 5. Phase 3: Deep Multi-Archetype Engineering Slice Expansion <!-- id: 6 -->
  - [x] Enrich Standards for Wind & Subsea: `iec-61400-3-2-2025`, `dnv-st-0119`, `dnv-rp-e303`, `dnv-rp-f401`, `dnv-st-f101`, `dnv-rp-f105` with `keyClauses` & `complianceChecklist` in `src/data/engineeringReferences.ts`
  - [x] Enrich Capabilities for Floating Wind & Subsea Corridors (`floating-structures`, `mooring-engineering`, `subsea-cable-engineering`, `pipeline-route-engineering`, `autonomous-subsea-survey`, `subsea-integrity-engineering`) in `src/data/capabilities.ts`
  - [x] Add market provider representation for offshore wind / subsea EPCI (`aker-solutions`, `boskalis`, `nexans`) in `src/data/marketProviders.ts`
  - [x] Upgrade `src/components/DecisionScoper.astro` with interactive archetype selection supporting `offshore-ccs`, `floating-offshore-wind`, `fixed-offshore-wind`, `subsea-corridor` with dynamic stage & focus mapping
  - [x] Upgrade `src/components/ProjectEOI.astro` to dynamically adapt to selected archetype context
- [x] 6. Verification & PR Update <!-- id: 7 -->
  - [x] Update `scripts/test-eoi-studio.mjs` with multi-archetype tests
  - [x] Run full CI checks (`npm run ci` -> typecheck + build: 0 errors, 0 warnings across 22 routes)
  - [x] Push to `feat/eoi-studio-foundations` and update PR #51

## Review & Results
- Successfully introduced **Modular EOI Studio Architecture** with technical and procurement compliance gates.
- Built **Engineering Reference Compliance & Clause Mapping** across ISO, DNV, IEC standards for CCS, Floating Wind, Fixed Wind, and Subsea Pipelines.
- Built **Canonical Capability Operational Envelopes & Evidence Triad Guidance** for 54 offshore capabilities.
- Added major offshore contractor profiles (`Aker Solutions`, `Boskalis`, `Nexans`) to `src/data/marketProviders.ts`.
- Upgraded `DecisionScoper.astro` to dynamically support 4 major offshore archetypes:
  1. **Offshore CO₂ Geological Storage (`offshore-ccs`)**
  2. **Floating Offshore Wind (`floating-offshore-wind`)**
  3. **Fixed-Bottom Offshore Wind (`fixed-offshore-wind`)**
  4. **Subsea Infrastructure & Corridors (`subsea-corridor`)**
- Built **Capability Comparison & Gap Matrix Engine (`src/lib/capabilityMatrix.ts`)** for procurement evaluation meetings.
- Enhanced UI in `src/components/ProjectEOI.astro` with dual Document/Matrix view and Markdown export.
- Verified all routes and automated tests.
