# OceanHub

OceanHub is an offshore decision-intelligence product. It turns an engineering decision into a traceable evidence plan and connects that plan to required capabilities and collaboration paths.

## Product

- **Knowledge:** real cases encoded as project → stage → decision → uncertainty → evidence → method → capability → deliverable → standard → source.
- **Decision:** Decision Scoper builds source-backed evidence plans and shows evidence gaps explicitly.
- **Network:** proposed JIPs connect recurring capability gaps to potential collaborators.

The current evidence-backed Scoper slice is offshore CO2 geological storage. Other domains are added only when validated reference cases exist.

Green Offshore Technology Alliance is a forming collaboration concept, not a constituted institution. The four JIPs are proposals unless a commitment is explicitly confirmed.

## Technology

- Astro 7
- Tailwind CSS 4
- TypeScript
- Astro content collections
- Playwright product-contract tests
- GitHub Actions and GitHub Pages

PWA/offline infrastructure remains in the repository but is not a current product priority.

## Development

```bash
npm ci
npm run dev
npm run ci
```

Browser contracts are defined in `package.json` for the Scoper, JIPs, conversion paths, deployed shell and retained Briefcase behavior.

## Next milestone

Deepen the offshore CCS case corpus and add material project constraints to the Decision Scoper. After that, introduce a canonical capability registry linking evidence requirements to JIPs and later to evidence-backed provider profiles.
