# OceanHub dependency audit

Audit date: 2026-08-03  
Evidence source: GitHub Actions, Node.js 24 and npm 11 (`npm audit --json` plus `npm audit --omit=dev --json`).

## Executive finding

The complete dependency graph currently reports **20 advisories**: 12 high, 7 moderate and 1 low. npm's production-only graph reports **14 advisories**: 10 high, 3 moderate and 1 low.

That production label needs architectural context. OceanHub is built by Astro and deployed to GitHub Pages as static HTML, CSS, JavaScript and images. There is no deployed Node.js server, Astro SSR process, Vite development server or Sharp image-processing process. The npm production graph therefore overstates browser-runtime exposure because several build-time packages are currently listed under `dependencies` rather than `devDependencies`.

This does **not** mean the findings can be ignored. The build and contributor toolchain processes repository content and runs in CI, so direct and transitive advisories still require upgrades and controlled validation.

## Direct vulnerable packages

| Package | Current declaration | Severity | Audit fix path | Exposure assessment |
|---|---|---:|---|---|
| `astro` | `^5.16.15` in `dependencies` | High | `astro@7.1.6` (major) | Build framework and local preview server. Not shipped as a Node runtime on GitHub Pages, but processes project content during CI builds. |
| `sharp` | `^0.34.5` in `devDependencies` | High | `sharp@0.35.3` (major) | Build-time image processor. Not present in the deployed browser application. |

## Production-graph transitive findings

The production-only audit also reports vulnerable paths through Astro's build stack:

- `defu`
- `h3`
- `js-yaml`
- `picomatch`
- `postcss`
- `rollup`
- `svgo`
- `vite`
- `devalue`
- `smol-toml`
- `yaml`
- `@babel/core`

These are not independently imported by OceanHub application code. Their production classification is inherited from build tooling currently placed under `dependencies`. Compatible transitive fixes are listed by npm, but they must be resolved through a coherent framework/lockfile update rather than arbitrary overrides.

## Development-only findings

The full graph additionally reports six packages that do not appear in the production-only graph:

- high: `fast-uri`, `lodash`
- moderate: `@astrojs/language-server`, `ajv`, `volar-service-yaml`, `yaml-language-server`

These paths are associated with editor/type-checking and schema tooling. They remain relevant for malicious or untrusted project files, but they do not execute in the deployed PWA.

## Remediation policy

1. Move static-site build tooling (`astro`, Astro integration, Tailwind/Vite integration and type packages) to `devDependencies` so npm's production graph reflects the deployed architecture.
2. Upgrade Astro to the audit-specified patched major release and Sharp to the audit-specified patched release.
3. Apply only non-forced compatible lockfile remediation after the direct upgrades.
4. Do not use `npm audit fix --force`.
5. Require all of the following before merging:
   - clean `npm ci`;
   - `astro check`;
   - production static build;
   - Chromium offline Briefcase workflow;
   - refreshed full and production-only audit reports.
6. Record any remaining advisories as build-only, development-only, no-fix or intentionally deferred with a concrete compatibility reason.

## Baseline counts

| Scope | Critical | High | Moderate | Low | Total |
|---|---:|---:|---:|---:|---:|
| Complete graph | 0 | 12 | 7 | 1 | 20 |
| npm production graph | 0 | 10 | 3 | 1 | 14 |

The raw JSON reports and generated classifier output are retained as a short-lived GitHub Actions artifact for the audit run attached to PR #5.
