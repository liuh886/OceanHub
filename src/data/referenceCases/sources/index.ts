import { ccsEvidenceSources } from './ccs';
import { decommissioningEvidenceSources } from './decommissioning';
import { subseaEvidenceSources } from './subsea';
import { windEvidenceSources } from './wind';

export const evidenceSources = [...ccsEvidenceSources, ...windEvidenceSources, ...subseaEvidenceSources, ...decommissioningEvidenceSources];
const sourceIds = new Set<string>();
for (const source of evidenceSources) {
  if (sourceIds.has(source.id)) throw new Error(`Duplicate evidence source ID: ${source.id}`);
  sourceIds.add(source.id);
}
export const evidenceSourceById = new Map(evidenceSources.map((source) => [source.id, source]));
