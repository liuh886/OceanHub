# OceanHub

OceanHub is a shared platform for offshore energy, marine monitoring and decision-ready technical intelligence. It connects operators, geoscience teams and specialist partners around clearly framed offshore questions, coherent evidence chains and practical delivery pathways.

## Current product scope

OceanHub is a static-first Astro PWA deployed through GitHub Pages. The current release provides:

- four offshore focus areas: CCUS and storage, renewable energy, infrastructure, and marine ecology;
- a structured marine-intelligence content collection;
- base-aware navigation and deep links under `/OceanHub/`;
- installable PWA metadata and icons;
- a scoped service worker with offline fallback;
- responsive navigation, reduced-motion support and keyboard-accessible interaction;
- an open collaboration entry point for operators and specialist partners.

The present PWA is primarily an installable knowledge and collaboration portal. Richer user workflows such as saved reading lists and explicit offline content packs remain future work.

## Product principles

1. **Start with the decision.** Define the offshore question and material uncertainty before selecting technology.
2. **Connect the evidence chain.** Integrate geophysical, geotechnical, environmental and monitoring observations around a common decision model.
3. **Build complementary teams.** OceanHub is a platform layer, not a single-company service catalogue.
4. **Keep claims traceable.** Avoid fictional telemetry, unsupported performance metrics and unrelated template content.
5. **Design for constrained connectivity.** Preserve useful fallback behaviour on mobile devices and in weak-network environments.

## Technology

- Astro 5
- Tailwind CSS 4
- React for optional interactive components
- Astro content collections
- GitHub Pages and GitHub Actions
- Progressive Web App manifest and service worker

## Local development

```bash
npm ci
npm run dev
```

The development server will print the local URL.

## Validation

Run the same checks used by pull-request CI:

```bash
npm run ci
```

This performs:

```bash
npm run check
npm run build
```

## Deployment

The production site is built from `main` by `.github/workflows/deploy.yml` and deployed to GitHub Pages.

Astro is configured with:

```js
site: 'https://liuh886.github.io'
base: '/OceanHub'
trailingSlash: 'always'
```

Internal URLs, the manifest and service-worker registration must remain aware of this repository base path.

## Content structure

```text
src/content/focus-areas/   Offshore problem and evidence pathways
src/content/insights/      Marine-intelligence notes
src/pages/                 Astro routes
src/layouts/               Shared application shell
src/components/            PWA and ambient visual components
public/                    Manifest, service worker and app icons
```

Content should stay within OceanHub's marine and offshore scope. Generic consulting, fintech and unrelated AI templates do not belong in the production collections.

## Next product milestone

The next meaningful PWA capability should be a focused offline-reading workflow:

1. save a focus area or insight;
2. explicitly download it for offline use;
3. show what is available locally and when it was last updated;
4. make updates understandable when connectivity returns.

This should be implemented before adding accounts, dashboards or decorative real-time interfaces.
