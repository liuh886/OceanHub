# OceanHub

OceanHub is an offshore technical-sourcing product. It turns an engineering decision into a traceable evidence plan, derives the capabilities required to resolve that decision, applies explicit project constraints, generates a supplier EOI, and carries supplier capability evidence through review.

## Product

- **Knowledge:** real cases encoded as project → stage → decision → uncertainty → evidence → method → capability → deliverable → engineering reference → source.
- **Decision:** Decision Scoper builds source-backed evidence plans and shows evidence gaps explicitly.
- **Constraints:** water-depth tier and delivery region are explicit sourcing inputs; encoded capability operational envelopes are hard gates, not hidden scores.
- **Sourcing:** required canonical capabilities become a supplier EOI and an explainable provider shortlist based on exact capability overlap after project constraints.
- **Qualification:** selected suppliers return capability-specific evidence; reviewers record `supported`, `partially-supported`, or `insufficient` per assertion. No supplier score or star rating is produced.
- **Comparison:** the sourcing matrix starts from public-source mapping and hydrates tracked supplier-response / review states from the persisted EOI.
- **Collaboration:** proposed JIPs connect recurring capability gaps to potential collaborators.

The interactive Scoper exposes only archetypes with multiple source-backed evidence combinations. Current encoded slices include offshore CO₂ geological storage, floating offshore wind, fixed-bottom offshore wind, and subsea infrastructure / corridors. New archetypes should not be exposed before the evidence-depth contract is met.

Public-source provider mapping is a discovery signal, supplier-submitted evidence is a separate assertion, and only an explicit OceanHub review produces a reviewed outcome.

Green Offshore Technology Alliance is a forming collaboration concept, not a constituted institution. The JIPs remain proposals unless a commitment is explicitly confirmed.

## Architecture

- Astro 7 + Tailwind CSS 4 + TypeScript
- Static public product on GitHub Pages
- Canonical case, engineering-reference, capability and public-provider registries in the repository
- Supabase persistence for tracked EOIs, supplier responses and capability assertions
- Public buyer/supplier writes through a validated Edge Function; review actions through an authenticated admin-only Edge Function
- Existing Supabase Auth + `membership_admins` reused for reviewer authorization
- OceanHub review tables deny direct `anon` and `authenticated` access
- Playwright product-contract tests and GitHub Actions deployment gates

No service-role or secret API key is shipped to the browser. The public Supabase publishable key is used only for reviewer authentication; privileged database work remains inside Edge Functions.

## Main workflow

`Decision Scoper → Evidence Plan → Project Constraints → Required Capabilities → Supplier EOI → Constraint-aware Provider Shortlist → Tracked Provider Requests → Supplier Evidence → Capability Review → Reviewed Sourcing Matrix / Buyer Status`

Review states are explicit:

`evidence-submitted → under-review → reviewed`

Reviewed outcomes are capability-specific:

`supported | partially-supported | insufficient`

Engineering-reference metadata may include OceanHub applicability summaries and procurement checks. These are aids for scoping; project users are directed to the official publication for authoritative requirements.

## Development

```bash
npm ci
npm run dev
npm run ci
```

Browser contracts cover the Scoper, constraint-aware EOI Studio, supplier EOI and tracked response flow, reviewer queue, JIPs, references, capability library, conversion paths, deployed shell and retained Briefcase behavior.
