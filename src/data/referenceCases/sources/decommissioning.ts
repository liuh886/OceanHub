import type { EvidenceSource } from '../../../lib/decisionEvidence';

export const decommissioningEvidenceSources: EvidenceSource[] = [
  { id: 'brent-comparative-assessment', title: 'Brent Field Comparative Assessment', publisher: 'Shell UK', url: 'https://www.shell.co.uk/about-us/sustainability/decommissioning/brent-field-decommissioning/brent-field-comparative-assessment.html', publishedYear: 2026, sourceType: 'operator' },
  { id: 'brent-pipelines', title: 'Brent Field Pipelines', publisher: 'Shell UK', url: 'https://www.shell.co.uk/about-us/sustainability/decommissioning/brent-field-decommissioning/pipelines.html', publishedYear: 2026, sourceType: 'operator' },
  { id: 'brent-environmental-monitoring', title: 'Brent Field Environmental Monitoring', publisher: 'Shell UK', url: 'https://www.shell.co.uk/about-us/sustainability/decommissioning/brent-field-decommissioning/environmental-monitoring.html', publishedYear: 2026, sourceType: 'operator' },
  { id: 'opred-decommissioning-guidance', title: 'Oil and gas: decommissioning of offshore installations and pipelines', publisher: 'UK OPRED', url: 'https://www.gov.uk/guidance/oil-and-gas-decommissioning-of-offshore-installations-and-pipelines', publishedYear: 2026, sourceType: 'regulator' },
  { id: 'ospar-decision-98-3', title: 'OSPAR Decision 98/3 on the Disposal of Disused Offshore Installations', publisher: 'OSPAR Commission', url: 'https://www.ospar.org/convention/agreements/page2?t=32282', publishedYear: 2024, sourceType: 'regulator' }
];
