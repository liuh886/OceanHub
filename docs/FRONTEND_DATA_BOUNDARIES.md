# Frontend data boundaries

## Decision Scoper

The Decision Scoper keeps its source-backed plan corpus inline while the total number of **evidence-bearing archetype × stage × focus combinations is 50 or fewer**. Empty combinations are not serialized. At this size the payload remains a deterministic part of the scope page and preserves offline-first behavior without adding another request lifecycle.

Interactive archetypes are exposed only after the encoded corpus produces multiple evidence-bearing combinations for that domain. A narrower focus may still show an explicit evidence gap when the underlying `EvidenceRequirement` records do not carry matching focus-level tags; OceanHub does not infer case-level tags into evidence-level recommendations.

If the evidence-bearing lookup grows beyond 50 combinations, keep the default archetype / initial plan inline and publish the remaining archetype plans as static `public/plans/*.json` assets loaded on demand. Those assets should use the existing service-worker runtime cache. Do not add a second canonical plan schema or a remote API solely for delivery.

The threshold is a delivery boundary, not a reason to split the current corpus prematurely.
