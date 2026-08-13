import type { EngineeringReference } from '../lib/engineeringReference';

export const engineeringReferences: EngineeringReference[] = [
  {
    id: 'iso-27914-2026',
    code: 'ISO 27914:2026',
    title: 'Carbon dioxide capture, transportation and storage — Geological storage',
    issuer: 'ISO', kind: 'standard', edition: 'Edition 2, 2026-03', publishedYear: 2026, status: 'current',
    officialUrl: 'https://www.iso.org/standard/84578.html',
    domains: ['ccs-storage'], lifecycleStages: ['screening','feasibility','pre-feed','feed','operations','monitoring','closure'],
    decisionTopics: ['storage-site screening','characterization','development','operations','termination preparation','stored CO2 quantification'],
    scopeSummary: 'Lifecycle requirements for geological CO2 storage, including site-specific risk and uncertainty management.'
  },
  {
    id: 'iso-27913-2024',
    code: 'ISO 27913:2024',
    title: 'Carbon dioxide capture, transportation and geological storage — Pipeline transportation systems',
    issuer: 'ISO', kind: 'standard', edition: 'Edition 2, 2024-10; corrected 2025-09', publishedYear: 2024, status: 'current',
    officialUrl: 'https://www.iso.org/standard/84840.html',
    domains: ['co2-transport','subsea-pipelines'], lifecycleStages: ['feasibility','pre-feed','feed','construction','operations'],
    decisionTopics: ['CO2 pipeline design','existing-pipeline conversion','stream quality','transport monitoring'],
    scopeSummary: 'Requirements and recommendations for onshore and offshore CO2 pipeline transport systems.'
  },
  {
    id: 'dnv-rp-j203', code: 'DNV-RP-J203', title: 'Geological storage of carbon dioxide', issuer: 'DNV', kind: 'recommended-practice',
    edition: '2019-09; amended 2021-09', publishedYear: 2019, status: 'current', officialUrl: 'https://www.dnv.com/energy/standards-guidelines/dnv-rp-j203-geological-storage-of-carbon-dioxide/',
    domains: ['ccs-storage'], lifecycleStages: ['screening','feasibility','pre-feed','feed','operations','monitoring','closure'],
    decisionTopics: ['site qualification','risk management','monitoring','well management','closure'],
    scopeSummary: 'Procedures and performance requirements for qualifying and managing geological CO2 storage sites.'
  },
  {
    id: 'imo-london-protocol-ccs', code: 'London Protocol — CCS framework', title: 'Carbon dioxide sequestration in sub-seabed geological formations under the London Protocol', issuer: 'IMO', kind: 'convention',
    edition: 'Current treaty framework and CCS amendments', publishedYear: 2006, status: 'current', officialUrl: 'https://www.imo.org/en/mediacentre/hottopics/pages/carbon-capture-and-storage-%28ccs%29.aspx',
    domains: ['ccs-storage','offshore-regulatory'], lifecycleStages: ['feasibility','feed','operations','monitoring'],
    decisionTopics: ['sub-seabed CO2 storage','licensing','impact assessment','cross-border CO2 export'],
    scopeSummary: 'International legal framework permitting regulated CO2 storage in sub-seabed geological formations.',
    applicabilityNotes: ['Cross-border export depends on the London Protocol Article 6 amendment framework and participating states arrangements.']
  },
  {
    id: 'iho-s44-6-2-0', code: 'IHO S-44', title: 'IHO Standards for Hydrographic Surveys', issuer: 'IHO', kind: 'standard',
    edition: 'Edition 6.2.0, 2024-10', publishedYear: 2024, status: 'current', officialUrl: 'https://iho.int/standards-and-specifications',
    domains: ['hydrography','marine-geophysics'], lifecycleStages: ['screening','feasibility','pre-feed','feed','construction','operations','monitoring','closure'],
    decisionTopics: ['bathymetric survey quality','feature detection','survey uncertainty'],
    scopeSummary: 'International hydrographic survey quality framework, including survey orders and uncertainty expectations.'
  },
  {
    id: 'iso-19901-10-2021', code: 'ISO 19901-10:2021', title: 'Specific requirements for offshore structures — Part 10: Marine geophysical investigations', issuer: 'ISO', kind: 'standard',
    edition: 'Edition 1, 2021-03', publishedYear: 2021, status: 'current', officialUrl: 'https://www.iso.org/standard/77017.html',
    domains: ['marine-geophysics'], lifecycleStages: ['screening','feasibility','pre-feed','feed'],
    decisionTopics: ['survey planning','positioning','seafloor mapping','sub-seafloor mapping','geohazards','data integration'],
    scopeSummary: 'Requirements and guidance for planning, acquiring, processing, integrating and reporting marine geophysical investigations.'
  },
  {
    id: 'iso-19901-8-2023', code: 'ISO 19901-8:2023', title: 'Offshore structures — Part 8: Marine soil investigations', issuer: 'ISO', kind: 'standard',
    edition: 'Edition 2, 2023-09', publishedYear: 2023, status: 'current', officialUrl: 'https://www.iso.org/standard/83302.html',
    domains: ['marine-geotechnics'], lifecycleStages: ['feasibility','pre-feed','feed'],
    decisionTopics: ['soil investigation planning','drilling','in-situ testing','sampling','laboratory testing','reporting'],
    scopeSummary: 'Requirements and guidance for marine soil investigations supporting offshore structures and geohazard studies.'
  },
  {
    id: 'iso-19901-4-2025', code: 'ISO 19901-4:2025', title: 'Specific requirements for offshore structures — Part 4: Geotechnical design considerations', issuer: 'ISO', kind: 'standard',
    edition: 'Edition 3, 2025-02', publishedYear: 2025, status: 'current', officialUrl: 'https://www.iso.org/standard/79594.html',
    domains: ['marine-geotechnics','fixed-offshore-wind','floating-offshore-wind'], lifecycleStages: ['pre-feed','feed','construction'],
    decisionTopics: ['foundation design','soil-structure interaction','anchors','site and soil characterization'],
    scopeSummary: 'Geotechnical design provisions for offshore foundations, flowlines, risers and anchors, including lower-carbon applications.'
  },
  {
    id: 'boem-gg-guidance-2024', code: 'BOEM G&G / Geohazard Guidance 2024', title: 'Guidelines for Providing Geophysical, Geotechnical, and Geohazard Information Pursuant to 30 CFR Part 585', issuer: 'BOEM', kind: 'guidance',
    edition: 'Updated 2024-01', publishedYear: 2024, status: 'current', officialUrl: 'https://www.boem.gov/newsroom/notes-stakeholders/updated-guidelines-providing-geophysical-geotechnical-and-geohazard',
    domains: ['marine-geophysics','marine-geotechnics','offshore-regulatory'], lifecycleStages: ['screening','feasibility','pre-feed','feed'],
    decisionTopics: ['site reconnaissance','suitability assessment','site-specific design','HRG survey resolution','geohazard evidence'],
    scopeSummary: 'US offshore-renewables guidance for phased geophysical, geotechnical and geohazard data collection and technical review.'
  },
  {
    id: 'iso-19901-1-2015', code: 'ISO 19901-1:2015', title: 'Specific requirements for offshore structures — Part 1: Metocean design and operating considerations', issuer: 'ISO', kind: 'standard',
    edition: 'Edition 2, 2015-10', publishedYear: 2015, status: 'current-revision-pending', officialUrl: 'https://www.iso.org/standard/60183.html',
    domains: ['metocean','marine-operations'], lifecycleStages: ['screening','feasibility','pre-feed','feed','construction','operations','closure'],
    decisionTopics: ['metocean characterization','design conditions','weather windows','marine operations limits'],
    scopeSummary: 'Current published ISO basis for determining and using metocean conditions for offshore design, construction and operation.',
    applicabilityNotes: ['ISO Edition 3 is under publication in August 2026 and is expected to replace the 2015 edition; verify status before project use.']
  },
  {
    id: 'dnv-rp-c205', code: 'DNV-RP-C205', title: 'Environmental conditions and environmental loads', issuer: 'DNV', kind: 'recommended-practice',
    edition: '2025-04; amended 2026-03', publishedYear: 2025, status: 'current', officialUrl: 'https://www.dnv.com/energy/standards-guidelines/dnv-rp-c205-environmental-conditions-and-environmental-loads/',
    domains: ['metocean','marine-operations','fixed-offshore-wind','floating-offshore-wind'], lifecycleStages: ['pre-feed','feed','construction','operations'],
    decisionTopics: ['wind loads','wave loads','current loads','ice loads','environmental design criteria'],
    scopeSummary: 'Guidance for assessing environmental conditions and loads on marine structures.'
  },
  {
    id: 'dnv-st-n001', code: 'DNV-ST-N001', title: 'Marine operations and marine warranty', issuer: 'DNV', kind: 'standard',
    edition: '2023-12', publishedYear: 2023, status: 'current', officialUrl: 'https://www.dnv.com/energy/standards-guidelines/dnv-st-n001-marine-operations-and-marine-warranty/',
    domains: ['marine-operations'], lifecycleStages: ['construction','closure'],
    decisionTopics: ['load-out','voyage','lifting','installation','removal','marine warranty'],
    scopeSummary: 'Planning and design requirements for marine operations including transport, installation and removal.'
  },
  {
    id: 'iec-61400-3-1-2019', code: 'IEC 61400-3-1:2019', title: 'Wind energy generation systems — Part 3-1: Design requirements for fixed offshore wind turbines', issuer: 'IEC', kind: 'standard',
    edition: 'Edition 1, 2019', publishedYear: 2019, status: 'current', officialUrl: 'https://webstore.iec.ch/en/publication/29360',
    domains: ['fixed-offshore-wind'], lifecycleStages: ['pre-feed','feed','construction','operations'],
    decisionTopics: ['external conditions','design loads','structural integrity'],
    scopeSummary: 'Minimum design requirements for fixed offshore wind turbines.'
  },
  {
    id: 'iec-61400-3-2-2025', code: 'IEC 61400-3-2:2025', title: 'Wind energy generation systems — Part 3-2: Design requirements for floating offshore wind turbines', issuer: 'IEC', kind: 'standard',
    edition: 'Edition 1, 2025', publishedYear: 2025, status: 'current', officialUrl: 'https://webstore.iec.ch/en/publication/67761',
    domains: ['floating-offshore-wind'], lifecycleStages: ['pre-feed','feed','construction','operations'],
    decisionTopics: ['site external conditions','floating stability','loads','anchors','structural integrity'],
    scopeSummary: 'Design requirements for floating offshore wind turbines, including site conditions, floating systems and anchor design.'
  },
  {
    id: 'dnv-st-0126', code: 'DNV-ST-0126', title: 'Support structures for wind turbines', issuer: 'DNV', kind: 'standard',
    edition: '2021-12', publishedYear: 2021, status: 'current', officialUrl: 'https://www.dnv.com/energy/standards-guidelines/dnv-st-0126-support-structures-for-wind-turbines',
    domains: ['fixed-offshore-wind'], lifecycleStages: ['pre-feed','feed','construction','operations'],
    decisionTopics: ['support-structure design','structural safety','installation','in-service inspection'],
    scopeSummary: 'General principles and minimum requirements for structural design of wind-turbine support structures.'
  }
];

export const engineeringReferenceById = new Map(engineeringReferences.map((reference) => [reference.id, reference]));

export function resolveEngineeringReferences(referenceIds: string[]) {
  return referenceIds.map((referenceId) => {
    const reference = engineeringReferenceById.get(referenceId);
    if (!reference) throw new Error(`Unknown engineering reference ID: ${referenceId}`);
    return reference;
  });
}
