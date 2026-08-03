# OceanHub dependency audit

Audit date: 2026-08-03  
Evidence source: GitHub Actions, Node.js 24 and npm 11 (`npm audit --json` plus `npm audit --omit=dev --json`).

## Outcome

Dependency remediation is complete for the audited graph.

| Scope | Baseline | Final |
|---|---:|---:|
| Complete dependency graph | 20 advisories | **0 advisories** |
| npm production graph | 14 advisories | **0 advisories** |
| Critical | 0 | **0** |
| High | 12 | **0** |
| Moderate | 7 | **0** |
| Low | 1 | **0** |

The final clean result was produced from a fresh `npm ci`, not from an existing `node_modules` directory.

## Baseline assessment

The initial complete graph reported 12 high, 7 moderate and 1 low advisory. npm's production-only graph reported 10 high, 3 moderate and 1 low.

OceanHub is deployed to GitHub Pages as static HTML, CSS, JavaScript and images. There is no deployed Node.js server, Astro SSR process, Vite development server or Sharp image-processing process. The initial production label therefore overstated browser-runtime exposure because static build tooling was listed under `dependencies`.

The findings still required remediation because the build and contributor toolchain processes repository content and runs in CI.

## Direct vulnerable packages remediated

| Package | Baseline | Remediated version | Treatment |
|---|---|---|---|
| `astro` | `^5.16.15` | `^7.1.6` | Upgraded to the audit-specified patched major release and moved to `devDependencies`. |
| `sharp` | `^0.34.5` | `^0.35.3` | Upgraded to the audit-specified patched release. |

## Framework migration

Astro 7 required migration from the removed legacy Content Collections API to the Content Layer API:

- moved configuration from `src/content/config.ts` to `src/content.config.ts`;
- added explicit `glob()` loaders for Focus Areas and Insights;
- imported Zod from `astro/zod`;
- changed collection entry routing from `entry.slug` to `entry.id`;
- changed Markdown rendering from `entry.render()` to `render(entry)`.

The migration preserves the existing public routes and content structure.

## Dependency classification cleanup

Static-site build tooling is now classified under `devDependencies`, including:

- Astro and the React integration;
- Tailwind and the Vite integration;
- React type packages;
- Sharp and other build/test tooling.

`react` and `react-dom` remain application dependencies. This makes the production-only audit better reflect what the deployed PWA actually uses.

## Remediation method

1. Upgraded Astro and Sharp explicitly.
2. Applied compatible transitive lockfile fixes without `--force`.
3. Regenerated `package-lock.json` from the controlled branch.
4. Removed the one-time self-modifying workflow after the generated files were committed.
5. Re-ran full and production-only audits from a clean install.

`npm audit fix --force` was not used.

## Validation evidence

All required checks passed after remediation:

- `npm ci`;
- `astro check`;
- production static build;
- Chromium installation;
- browser-level offline Briefcase workflow, including save, update, offline open and clear;
- full dependency audit: **0**;
- production-only dependency audit: **0**.

The raw final JSON reports and generated classifier output are retained as a short-lived GitHub Actions artifact attached to PR #5.

## Remaining supply-chain note

npm 11 reports that the `esbuild` install scripts are not yet covered by an explicit `allowScripts` policy. This is not an npm vulnerability advisory and did not prevent a clean install or build. It should be handled separately as install-script allowlisting rather than mixed into vulnerability remediation.
