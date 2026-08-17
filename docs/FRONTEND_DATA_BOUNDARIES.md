# Frontend data boundaries

## Decision Scoper

The default Decision Scoper keeps its decision-plan corpus inline while the total number of stage × focus cases is **50 or fewer**. At this size the payload remains a small, deterministic part of the scope page and preserves offline-first behavior without another request lifecycle.

If the corpus grows beyond 50 cases, keep only the default case inline and publish the remaining plans as static `public/plans/*.json` assets loaded on demand. Those assets should use the existing service-worker runtime cache. Do not add a second canonical plan schema or a remote API solely for delivery.

The threshold is a delivery boundary, not a reason to split the current corpus prematurely.
