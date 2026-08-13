import { engineeringReferenceById } from '../engineeringReferences';
import { ccsInfrastructureCases } from './ccs-infrastructure';
import { ccsStorageCases } from './ccs-storage';
import { brentComparativeCase } from './decommissioning-brent-comparative';
import { brentMonitoringCase } from './decommissioning-brent-monitoring';
import { marineHubCase } from './marine-infrastructure';
import { corridorIntegrityCase } from './subsea-integrity';
import { subseaRouteCases } from './subsea-route';
import { seaLinkCase } from './subsea-sea-link';
import { subseaSverdrupCases } from './subsea-sverdrup';
import { freedomAuvCase } from './subsea-freedom';
import { cvowAcousticCase } from './wind-cvow-acoustics';
import { doggerCableCase } from './wind-dogger-cable';
import { doggerBankCase } from './wind-dogger-foundation';
import { hywindElectricalCase } from './wind-hywind-electrical';
import { hywindScotlandCase } from './wind-hywind-scotland';
import { hywindTampenCase } from './wind-hywind-tampen';
import { windSiteCasesA } from './wind-site-a';
import { windSiteCasesB } from './wind-site-b';
import { evidenceSourceById, evidenceSources } from './sources';

export { evidenceSourceById, evidenceSources } from './sources';

export const referenceCases = [
  ...ccsStorageCases,
  ...ccsInfrastructureCases,
  ...windSiteCasesA,
  ...windSiteCasesB,
  cvowAcousticCase,
  doggerBankCase,
  doggerCableCase,
  hywindTampenCase,
  hywindElectricalCase,
  hywindScotlandCase,
  ...subseaRouteCases,
  ...subseaSverdrupCases,
  seaLinkCase,
  marineHubCase,
  freedomAuvCase,
  corridorIntegrityCase,
  brentComparativeCase,
  brentMonitoringCase
];

if (referenceCases.length < 27) throw new Error(`Case Corpus v1 requires at least 27 reference cases; found ${referenceCases.length}.`);

const caseIds = new Set<string>();
const evidenceIds = new Set<string>();
for (const referenceCase of referenceCases) {
  if (caseIds.has(referenceCase.id)) throw new Error(`Duplicate reference case ID: ${referenceCase.id}`);
  caseIds.add(referenceCase.id);
  if (!referenceCase.evidence.length) throw new Error(`Reference case has no evidence requirements: ${referenceCase.id}`);
  for (const requirement of referenceCase.evidence) {
    if (evidenceIds.has(requirement.id)) throw new Error(`Duplicate evidence requirement ID: ${requirement.id}`);
    evidenceIds.add(requirement.id);
    if (!requirement.sourceIds.length) throw new Error(`Evidence requirement has no project/source provenance: ${requirement.id}`);
    if (!requirement.referenceIds.length) throw new Error(`Evidence requirement has no engineering references: ${requirement.id}`);
    for (const sourceId of requirement.sourceIds) {
      if (!evidenceSourceById.has(sourceId)) throw new Error(`Unknown evidence source ID ${sourceId} in ${requirement.id}`);
    }
    for (const referenceId of requirement.referenceIds) {
      if (!engineeringReferenceById.has(referenceId)) throw new Error(`Unknown engineering reference ID ${referenceId} in ${requirement.id}`);
    }
  }
}
