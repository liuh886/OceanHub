import type { EvidenceSource } from '../../../lib/decisionEvidence';

export const windEvidenceSources: EvidenceSource[] = [
  { id: 'vineyard-mid-atlantic-boem', title: 'Vineyard Mid-Atlantic', publisher: 'BOEM', url: 'https://www.boem.gov/renewable-energy/state-activities/vineyard-mid-atlantic', publishedYear: 2025, sourceType: 'regulator' },
  { id: 'new-england-wind-cop', title: 'New England Wind Construction and Operations Plan', publisher: 'BOEM', url: 'https://www.boem.gov/renewable-energy/state-activities/new-england-wind-ocs-0534-construction-and-operations-plan', publishedYear: 2024, sourceType: 'regulator' },
  { id: 'revolution-wind-cop', title: 'Revolution Wind Farm Construction and Operations Plan', publisher: 'BOEM', url: 'https://www.boem.gov/renewable-energy/state-activities/revolution-wind-farm-construction-and-operations-plan', publishedYear: 2023, sourceType: 'regulator' },
  { id: 'cvow-noaa-ita', title: 'Incidental Take Authorization: Coastal Virginia Offshore Wind construction', publisher: 'NOAA Fisheries', url: 'https://www.fisheries.noaa.gov/action/incidental-take-authorization-dominion-energy-virginia-construction-coastal-virginia', publishedYear: 2024, sourceType: 'regulator' },
  { id: 'cvow-cop', title: 'Coastal Virginia Offshore Wind Construction and Operations Plan', publisher: 'BOEM', url: 'https://www.boem.gov/renewable-energy/state-activities/coastal-virginia-offshore-wind-project-construction-and-0', publishedYear: 2023, sourceType: 'regulator' },
  { id: 'dogger-bank-offshore', title: 'Dogger Bank offshore construction', publisher: 'Dogger Bank Wind Farm', url: 'https://doggerbank.com/construction/offshore/', publishedYear: 2025, sourceType: 'project' },
  { id: 'hywind-tampen', title: 'Hywind Tampen', publisher: 'Equinor', url: 'https://www.equinor.com/energy/hywind-tampen', publishedYear: 2023, sourceType: 'operator' },
  { id: 'hywind-tampen-construction-2020', title: 'Construction starts on Hywind Tampen', publisher: 'Equinor', url: 'https://www.equinor.com/news/archive/20201001-contruction-start-hywind-tampen', publishedYear: 2020, sourceType: 'operator' },
  { id: 'hywind-scotland-maintenance', title: 'Heavy maintenance campaign completed on Hywind Scotland', publisher: 'Equinor', url: 'https://www.equinor.com/news/uk/heavy-maintenance-campaign-completed-on-hywind-scotland-floating-offshore-wind-farm', publishedYear: 2025, sourceType: 'operator' }
];
