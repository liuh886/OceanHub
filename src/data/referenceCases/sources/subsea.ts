import type { EvidenceSource } from '../../../lib/decisionEvidence';

export const subseaEvidenceSources: EvidenceSource[] = [
  { id: 'ormen-route', title: 'The world’s largest pipelay vessels meet at Ormen Lange', publisher: 'Equinor', url: 'https://www.equinor.com/news/archive/2006/08/04/TheworldsLargestPipelayVesselsMeetAtOrmenLange', publishedYear: 2006, sourceType: 'operator' },
  { id: 'ormen-templates', title: 'Ormen Lange templates break depth record', publisher: 'Equinor', url: 'https://www.equinor.com/news/archive/2005/08/22/OrmenLangeTemplatesBreakDepthRecord', publishedYear: 2005, sourceType: 'operator' },
  { id: 'sverdrup-lift', title: 'Record-breaking lift completes the Johan Sverdrup field centre', publisher: 'Equinor', url: 'https://www.equinor.com/news/archive/2019-03-22-record-breaking-lift-johan-sverdrup', publishedYear: 2019, sourceType: 'operator' },
  { id: 'sverdrup-subsea', title: 'Subsea production system for Johan Sverdrup phase 2', publisher: 'Equinor', url: 'https://www.equinor.com/news/archive/2019-03-20-johan-sverdrup-subsea-contract', publishedYear: 2019, sourceType: 'operator' },
  { id: 'sverdrup-pipelines', title: 'Subsea pipelines and marine operations for Johan Sverdrup phase II', publisher: 'Equinor', url: 'https://www.equinor.com/news/archive/2019-06-13-pipelines-marine-operations-johan-sverdrup', publishedYear: 2019, sourceType: 'operator' },
  { id: 'sea-link-surveys', title: 'Sea Link surveys', publisher: 'National Grid', url: 'https://www.nationalgrid.com/the-great-grid-upgrade/sea-link/surveys', publishedYear: 2026, sourceType: 'project' },
  { id: 'princess-island', title: 'Princess Elisabeth Island', publisher: 'European Investment Bank', url: 'https://www.eib.org/en/projects/all/20230946', publishedYear: 2024, sourceType: 'government' },
  { id: 'freedom-auv', title: 'Freedom AUV Pipeline Inspection Pilot for TotalEnergies', publisher: 'Oceaneering', url: 'https://www.oceaneering.com/oceaneering-conducts-freedom-auv-pipeline-inspection-pilot-for-totalenergies/', publishedYear: 2024, sourceType: 'technical-body' }
];
