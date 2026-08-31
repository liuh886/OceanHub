import type { EngineeringReference } from '../lib/engineeringReference';

export const engineeringReferences: EngineeringReference[] = [
  {
    id: 'iso-27914-2026', code: 'ISO 27914:2026', title: 'Carbon dioxide capture, transportation and storage — Geological storage', issuer: 'ISO', kind: 'standard',
    edition: 'Edition 2, 2026-03', publishedYear: 2026, status: 'current', officialUrl: 'https://www.iso.org/standard/84578.html',
    domains: ['ccs-storage'], lifecycleStages: ['screening','feasibility','pre-feed','feed','operations','monitoring','closure'],
    decisionTopics: ['storage-site screening','characterization','development','operations','termination preparation','stored CO2 quantification'],
    scopeSummary: 'Lifecycle requirements for geological CO2 storage, including site-specific risk and uncertainty management.',
    keyClauses: [
      'Clause 5: Storage site selection and characterization requirements',
      'Clause 6: Risk management and plume migration containment assessment',
      'Clause 8: Design and verification of measurement, monitoring and verification (MMV) systems'
    ],
    complianceChecklist: [
      'Geomechanical integrity assessment conforming to Clause 5.4',
      'Plume migration and spill-point containment models compliant with Clause 6.2',
      'Monitoring baseline datasets and trigger thresholds conforming to Clause 8.3'
    ],
    relevanceLevel: 'primary'
  },
  {
    id: 'iso-27913-2024', code: 'ISO 27913:2024', title: 'Carbon dioxide capture, transportation and geological storage — Pipeline transportation systems', issuer: 'ISO', kind: 'standard',
    edition: 'Edition 2, 2024-10; corrected 2025-09', publishedYear: 2024, status: 'current', officialUrl: 'https://www.iso.org/standard/84840.html',
    domains: ['co2-transport','subsea-pipelines'], lifecycleStages: ['feasibility','pre-feed','feed','construction','operations'],
    decisionTopics: ['CO2 pipeline design','existing-pipeline conversion','stream quality','transport monitoring'],
    scopeSummary: 'Requirements and recommendations for onshore and offshore CO2 pipeline transport systems.',
    keyClauses: [
      'Clause 6: Dense-phase CO2 pipeline material selection and fracture control',
      'Clause 9: Subsea tie-in and conversion integrity assessment'
    ],
    complianceChecklist: [
      'Dense-phase running fracture arrest verification',
      'Impurity stream tolerance limits specification'
    ],
    relevanceLevel: 'primary'
  },
  {
    id: 'dnv-rp-j203', code: 'DNV-RP-J203', title: 'Geological storage of carbon dioxide', issuer: 'DNV', kind: 'recommended-practice',
    edition: '2019-09; amended 2021-09', publishedYear: 2019, status: 'current', officialUrl: 'https://www.dnv.com/energy/standards-guidelines/dnv-rp-j203-geological-storage-of-carbon-dioxide/',
    domains: ['ccs-storage'], lifecycleStages: ['screening','feasibility','pre-feed','feed','operations','monitoring','closure'],
    decisionTopics: ['site qualification','risk management','monitoring','well management','closure'],
    scopeSummary: 'Procedures and performance requirements for qualifying and managing geological CO2 storage sites.',
    keyClauses: [
      'Section 3: Storage site qualification process and evidence matrices',
      'Section 5: Monitoring plan and leakage risk mitigation'
    ],
    complianceChecklist: [
      'Site qualification dossier aligned with DNV evidence criteria',
      'Quantitative containment risk assessment'
    ],
    relevanceLevel: 'primary'
  },
  {
    id: 'dnv-se-0617', code: 'DNV-SE-0617', title: 'Qualification management for geological storage of CO2', issuer: 'DNV', kind: 'service-specification',
    edition: '2022-03', publishedYear: 2022, status: 'current', officialUrl: 'https://www.dnv.com/energy/standards-guidelines/dnv-se-0617-qualification-management-for-geological-storage-of-co2/',
    domains: ['ccs-storage'], lifecycleStages: ['feasibility','pre-feed','feed','operations','monitoring','closure'],
    decisionTopics: ['storage-site qualification','assurance','certification framework'],
    scopeSummary: 'Certification-service framework supporting qualification management for geological CO2 storage sites.'
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
    scopeSummary: 'Design requirements for floating offshore wind turbines, including site conditions, floating systems and anchor design.',
    keyClauses: [
      'Clause 7: Coupled hydrodynamic and aerodynamic load cases for floating wind',
      'Clause 9: Station-keeping and mooring redundancy criteria',
      'Clause 11: Dynamic cable mechanical interface integration'
    ],
    complianceChecklist: [
      'Coupled aero-hydro-servo-elastic load simulation dossier',
      'Mooring line intact and single-line failure ULS/FLS analysis',
      'Extreme offset and dynamic cable bend-stiffener envelope verification'
    ],
    relevanceLevel: 'primary'
  },
  {
    id: 'dnv-st-0126', code: 'DNV-ST-0126', title: 'Support structures for wind turbines', issuer: 'DNV', kind: 'standard',
    edition: '2021-12', publishedYear: 2021, status: 'current', officialUrl: 'https://www.dnv.com/energy/standards-guidelines/dnv-st-0126-support-structures-for-wind-turbines',
    domains: ['fixed-offshore-wind'], lifecycleStages: ['pre-feed','feed','construction','operations'],
    decisionTopics: ['support-structure design','structural safety','installation','in-service inspection'],
    scopeSummary: 'General principles and minimum requirements for structural design of wind-turbine support structures.'
  },
  {
    id: 'dnv-st-0119', code: 'DNV-ST-0119', title: 'Floating wind turbines', issuer: 'DNV', kind: 'standard',
    edition: '2025-12', publishedYear: 2025, status: 'current', officialUrl: 'https://www.dnv.com/energy/standards-guidelines/dnv-st-0119-floating-wind-turbines/',
    domains: ['floating-offshore-wind'], lifecycleStages: ['pre-feed','feed','construction','operations'],
    decisionTopics: ['floating structures','station keeping','design','construction','in-service inspection'],
    scopeSummary: 'General principles and requirements for design and assessment of floating wind turbines.',
    keyClauses: [
      'Section 4: Structural design and stability of floating substructures',
      'Section 6: Station-keeping system design, anchor holding and fatigue',
      'Section 9: Marine operations, tow-out and offshore hook-up'
    ],
    complianceChecklist: [
      'Substructure naval architecture and intact/damaged stability book',
      'Anchor holding capacity geotechnical verification in target seabed',
      'Tow-out, station hook-up and tensioning marine operational procedures'
    ],
    relevanceLevel: 'primary'
  },
  {
    id: 'dnv-rp-e303', code: 'DNV-RP-E303', title: 'Geotechnical design and installation of suction anchors in clay', issuer: 'DNV', kind: 'recommended-practice',
    edition: '2017-04; amended 2021-10', publishedYear: 2017, status: 'current', officialUrl: 'https://www.dnv.com/energy/standards-guidelines/dnv-rp-e303-geotechnical-design-and-installation-of-suction-anchors-in-clay/',
    domains: ['marine-geotechnics','floating-offshore-wind'], lifecycleStages: ['pre-feed','feed','construction'],
    decisionTopics: ['suction-anchor design','installation','clay response'],
    scopeSummary: 'Design code and guidance for geotechnical design and installation of suction anchors in clay.',
    keyClauses: [
      'Section 3: Holding capacity calculation under multi-directional cyclic loading',
      'Section 5: Penetration resistance and underpressure limits during installation'
    ],
    complianceChecklist: [
      'Site-specific cyclic shear strength DSS/triaxial geotechnical test basis',
      'Suction anchor holding capacity ULS/ALS safety factor verification'
    ],
    relevanceLevel: 'primary'
  },
  {
    id: 'dnv-rp-0360', code: 'DNV-RP-0360', title: 'Subsea power cables in shallow water', issuer: 'DNV', kind: 'recommended-practice',
    edition: '2016-03; amended 2021-10', publishedYear: 2016, status: 'current', officialUrl: 'https://www.dnv.com/energy/standards-guidelines/dnv-rp-0360-subsea-power-cables-in-shallow-water/',
    domains: ['subsea-cables'], lifecycleStages: ['feasibility','pre-feed','feed','construction','operations','closure'],
    decisionTopics: ['cable lifecycle','installation','commissioning','maintenance','decommissioning','risk management'],
    scopeSummary: 'Lifecycle guidance for static subsea power cable projects in shallow water.'
  },
  {
    id: 'dnv-rp-f401', code: 'DNV-RP-F401', title: 'Electrical power cables in subsea applications', issuer: 'DNV', kind: 'recommended-practice',
    edition: '2019-09; amended 2021-09', publishedYear: 2019, status: 'current', officialUrl: 'https://www.dnv.com/energy/standards-guidelines/dnv-rp-f401-electrical-power-cables-in-subsea-applications/',
    domains: ['subsea-cables','floating-offshore-wind'], lifecycleStages: ['pre-feed','feed','construction','operations'],
    decisionTopics: ['deepwater power cables','dynamic excitation','subsea electrical cable design'],
    scopeSummary: 'Additional requirements for subsea power cables exposed to deep water or dynamic excitation.',
    keyClauses: [
      'Section 3: Dynamic cable configuration design (Lazy wave, pliant wave)',
      'Section 5: Fatigue life and mechanical-electrical insulation integrity'
    ],
    complianceChecklist: [
      'Coupled floater motion and dynamic cable bend radius verification',
      'Subsea cable buoyancy module distribution and seabed touchdown stability'
    ],
    relevanceLevel: 'primary'
  },
  {
    id: 'iec-63026-2019', code: 'IEC 63026:2019', title: 'Submarine power cables with extruded insulation and accessories for 6 kV to 60 kV — Test methods and requirements', issuer: 'IEC', kind: 'standard',
    edition: 'Edition 1, 2019', publishedYear: 2019, status: 'current', officialUrl: 'https://webstore.iec.ch/en/publication/33417',
    domains: ['subsea-cables'], lifecycleStages: ['feed','construction','operations'],
    decisionTopics: ['submarine cable qualification','electrical testing','mechanical testing'],
    scopeSummary: 'Test methods and requirements for fixed submarine cable systems from 6 kV to 60 kV.',
    applicabilityNotes: ['Does not cover dynamic cables connected directly to floating structures and is limited to its stated voltage and water-depth scope.']
  },
  {
    id: 'dnv-st-f101', code: 'DNV-ST-F101', title: 'Submarine pipeline systems', issuer: 'DNV', kind: 'standard',
    edition: '2021-08; amended 2021-12', publishedYear: 2021, status: 'current', officialUrl: 'https://www.dnv.com/energy/standards-guidelines/dnv-st-f101-submarine-pipeline-systems/',
    domains: ['subsea-pipelines','co2-transport'], lifecycleStages: ['feasibility','pre-feed','feed','construction','operations','closure'],
    decisionTopics: ['pipeline design','materials','installation','pre-commissioning','operation','abandonment'],
    scopeSummary: 'Lifecycle structural-integrity framework for submarine pipeline systems.',
    keyClauses: [
      'Section 5: Wall thickness design and pressure containment (limit state criteria)',
      'Section 10: Construction, pipelay tension, trenching and as-built survey'
    ],
    complianceChecklist: [
      'Pipeline wall thickness and local buckling limit state verification',
      'Pipelay installation analysis under design sea state limits'
    ],
    relevanceLevel: 'primary'
  },
  {
    id: 'dnv-rp-f105', code: 'DNV-RP-F105', title: 'Free spanning pipelines', issuer: 'DNV', kind: 'recommended-practice',
    edition: '2025-12', publishedYear: 2025, status: 'current', officialUrl: 'https://www.dnv.com/energy/standards-guidelines/dnv-rp-f105-free-spanning-pipelines/',
    domains: ['subsea-pipelines'], lifecycleStages: ['feed','construction','operations','monitoring'],
    decisionTopics: ['free spans','VIV','fatigue','wave loading','sensor evidence'],
    scopeSummary: 'Assessment guidance for free-span ULS/FLS, VIV and direct wave loading.',
    keyClauses: [
      'Section 3: Vortex-induced vibration (VIV) screening and modal analysis',
      'Section 5: Multi-span interaction and seabed intervention triggers'
    ],
    complianceChecklist: [
      'High-resolution multi-beam survey span length and gap identification',
      'Fatigue life verification against cross-flow and in-line VIV'
    ],
    relevanceLevel: 'primary'
  },
  {
    id: 'dnv-rp-f109', code: 'DNV-RP-F109', title: 'On-bottom stability design of submarine pipelines, cables and umbilicals', issuer: 'DNV', kind: 'recommended-practice',
    edition: '2021-05; amended 2025-09', publishedYear: 2021, status: 'current', officialUrl: 'https://www.dnv.com/energy/standards-guidelines/dnv-rp-f109-on-bottom-stability-design-of-submarine-pipelines/',
    domains: ['subsea-pipelines','subsea-cables'], lifecycleStages: ['pre-feed','feed','construction','operations'],
    decisionTopics: ['lateral stability','vertical stability','hydrodynamic loading'],
    scopeSummary: 'Design criteria and guidance for on-bottom stability under hydrodynamic loading.'
  },
  {
    id: 'dnv-rp-f116', code: 'DNV-RP-F116', title: 'Integrity management of submarine pipeline systems', issuer: 'DNV', kind: 'recommended-practice',
    edition: '2021-12', publishedYear: 2021, status: 'current', officialUrl: 'https://www.dnv.com/energy/standards-guidelines/dnv-rp-f116-integrity-management-of-submarine-pipeline-systems/',
    domains: ['subsea-pipelines'], lifecycleStages: ['operations','monitoring','closure'],
    decisionTopics: ['integrity management','inspection planning','risk assessment','maintenance'],
    scopeSummary: 'Guidance for establishing, implementing and maintaining submarine pipeline integrity management.'
  },
  {
    id: 'dnv-rp-f115', code: 'DNV-RP-F115', title: 'Pre-commissioning of submarine pipelines', issuer: 'DNV', kind: 'recommended-practice',
    edition: '2025-09', publishedYear: 2025, status: 'current', officialUrl: 'https://www.dnv.com/energy/standards-guidelines/dnv-rp-f115-pre-commissioning-of-submarine-pipelines/',
    domains: ['subsea-pipelines'], lifecycleStages: ['construction'],
    decisionTopics: ['pipeline pre-commissioning','planning','execution','readiness'],
    scopeSummary: 'Guidance for safe and effective pre-commissioning of submarine pipeline systems compliant with DNV-ST-F101.'
  },
  {
    id: 'dnv-rp-0002', code: 'DNV-RP-0002', title: 'Integrity management of subsea production systems', issuer: 'DNV', kind: 'recommended-practice',
    edition: '2019-09; amended 2021-09', publishedYear: 2019, status: 'current', officialUrl: 'https://www.dnv.com/energy/standards-guidelines/dnv-rp-0002-integrity-management-of-subsea-production-systems/',
    domains: ['subsea-production'], lifecycleStages: ['feed','construction','operations','monitoring','closure'],
    decisionTopics: ['subsea production integrity','inspection','maintenance','life-cycle integrity'],
    scopeSummary: 'Recommendations for managing subsea production system integrity from concept through abandonment.'
  },
  {
    id: 'iso-18405-2017', code: 'ISO 18405:2017', title: 'Underwater acoustics — Terminology', issuer: 'ISO', kind: 'standard',
    edition: 'Edition 1, 2017; confirmed 2022', publishedYear: 2017, status: 'current-confirmed', officialUrl: 'https://www.iso.org/standard/62406.html',
    domains: ['underwater-acoustics'], lifecycleStages: ['screening','feasibility','pre-feed','feed','construction','operations','monitoring'],
    decisionTopics: ['underwater acoustics terminology','sound generation','propagation','reception','effects'],
    scopeSummary: 'Common terminology for natural, biological and anthropogenic underwater acoustics.'
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
