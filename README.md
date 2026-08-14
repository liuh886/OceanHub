# OceanHub

OceanHub is an offshore technical-sourcing product. It turns an engineering decision into a traceable evidence plan, derives the capabilities required to resolve that decision, generates a supplier EOI, and carries supplier capability evidence through review.

## Product

- **Knowledge:** real cases encoded as project → stage → decision → uncertainty → evidence → method → capability → deliverable → engineering reference → source.
- **Decision:** Decision Scoper builds source-backed evidence plans and shows evidence gaps explicitly.
- **Sourcing:** canonical capability requirements become a supplier EOI and an explainable provider shortlist based on exact capability overlap.
- **Qualification:** selected suppliers return capability-specific evidence; reviewers record `supported`, `partially-supported`, or `insufficient` per assertion. No supplier score or star rating is produced.
- **Collaboration:** proposed JIPs connect recurring capability gaps to potential collaborators.

The interactive evidence-backed Scoper slice remains offshore CO2 geological storage. The knowledge layer is broader, but new interactive project archetypes are exposed only when their reference evidence is deep enough.

Public-source provider mapping is a discovery signal, supplier-submitted evidence is a separate assertion, and only an explicit OceanHub review produces a reviewed outcome.

Green Offshore Technology Alliance is a forming collaboration concept, not a constituted institution. The JIPs remain proposals unless a commitment is explicitly confirmed.

## Architecture

- Astro 7 + Tailwind CSS 4 + TypeScript
- Static public product on GitHub Pages
- Canonical case, engineering-reference and capability registries in the repository
- Supabase persistence for tracked EOIs, supplier responses and capability assertions
- Public buyer/supplier writes through a validated Edge Function; review actions through an authenticated admin-only Edge Function
- Existing Supabase Auth + `membership_admins` reused for reviewer authorization
- OceanHub review tables deny direct `anon` and `authenticated` access
- Playwright product-contract tests and GitHub Actions deployment gates

No service-role or secret API key is shipped to the browser. The public Supabase publishable key is used only for reviewer authentication; privileged database work remains inside Edge Functions.

## Main workflow

`Decision Scoper → Evidence Plan → Canonical Capabilities → Supplier EOI → Provider Shortlist → Tracked Provider Requests → Supplier Evidence → Capability Review → Buyer Status`

Review states are explicit:

`evidence-submitted → under-review → reviewed`

Reviewed outcomes are capability-specific:

`supported | partially-supported | insufficient`

## Development

```bash
npm ci
npm run dev
npm run ci
```

Browser contracts cover the Scoper, supplier EOI and tracked response flow, reviewer queue, JIPs, references, capability library, conversion paths, deployed shell and retained Briefcase behavior.
