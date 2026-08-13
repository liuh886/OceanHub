import type { EvidenceSource, OffshoreReferenceCase } from '../lib/decisionEvidence';

export const evidenceSources: EvidenceSource[] = [
  {
    id: 'iso-27914-2026',
    title: 'ISO 27914:2026 — Carbon dioxide capture, transportation and storage — Geological storage',
    publisher: 'ISO',
    url: 'https://www.iso.org/standard/84578.html',
    publishedYear: 2026,
    sourceType: 'standard',
    note: 'Current international standard covering geological storage lifecycle requirements, including screening, characterization, development, operation and project termination.'
  },
  {
    id: 'equinor-sleipner-monitoring-2009',
    title: 'Greenhouse store staying sealed',
    publisher: 'Equinor',
    url: 'https://www.equinor.com/news/archive/2009/03/05/03MarSleipner',
    publishedYear: 2009,
    sourceType: 'operator',
    note: 'Operator account describing repeated 4D seismic acquisition and wellhead-pressure monitoring at Sleipner.'
  },
  {
    id: 'equinor-sleipner-data-2019',
    title: 'Sleipner partnership releases CO2 storage data',
    publisher: 'Equinor',
    url: 'https://www.equinor.com/news/archive/2019-06-12-sleipner-co2-storage-data',
    publishedYear: 2019,
    sourceType: 'operator',
    note: 'Operator account describing long-running storage and monitoring datasets released for research and method development.'
  },
  {
    id: 'northern-lights-storage-2020',
    title: 'How does CO2 storage work?',
    publisher: 'Northern Lights',
    url: 'https://norlights.com/news/how-does-co2-storage-work/',
    publishedYear: 2020,
    sourceType: 'project',
    note: 'Project explanation of storage-site characterization, Eos well core evidence and seismic plume monitoring.'
  },
  {
    id: 'northern-lights-norsar-2025',
    title: 'Northern Lights partners with NORSAR for CO2 storage monitoring',
    publisher: 'Northern Lights',
    url: 'https://norlights.com/news/northern-lights-partners-with-norsar-for-co2-storage-monitoring/',
    publishedYear: 2025,
    sourceType: 'project',
    note: 'Project announcement describing continuous monitoring of injection-related seismic activity for the Aurora storage reservoir.'
  }
];

export const offshoreReferenceCases: OffshoreReferenceCase[] = [
  {
    id: 'sleipner-plume-containment-monitoring',
    title: 'Sleipner — repeat seismic for plume migration and containment',
    projectArchetype: 'offshore-ccs',
    lifecycleStages: ['operations', 'monitoring'],
    projectContext: 'Offshore saline-aquifer CO2 storage in the Utsira Formation, with long-term injection and repeat monitoring.',
    decision: 'Is injected CO2 remaining within the intended storage formation and migrating in a manner consistent with the storage model?',
    outcome: 'Use repeat geophysical observations together with operational measurements to update the storage model and assess containment.',
    evidence: [
      {
        id: 'sleipner-4d-seismic',
        discipline: 'geophysics',
        uncertainty: 'The spatial extent and evolution of the subsurface CO2 plume are uncertain between monitoring campaigns.',
        evidenceNeeded: 'Repeatable time-lapse seismic observations that can image changes in the storage formation through time.',
        methods: ['Baseline and repeat 3D seismic acquisition', '4D seismic processing and interpretation'],
        capabilities: ['Marine seismic acquisition', '4D repeatability design', 'Time-lapse processing', 'CO2 plume interpretation'],
        deliverables: ['Time-lapse seismic difference volumes', 'Plume extent interpretation', 'Containment-focused monitoring update'],
        referenceIds: ['iso-27914-2026', 'dnv-rp-j203'],
        rationale: 'Sleipner demonstrates that repeat seismic can be used to observe plume evolution and test whether storage behaviour remains consistent with expectations.',
        sourceIds: ['equinor-sleipner-monitoring-2009', 'equinor-sleipner-data-2019', 'iso-27914-2026']
      },
      {
        id: 'sleipner-operational-pressure',
        discipline: 'monitoring',
        uncertainty: 'Geophysical imaging alone does not describe the operational response of the injection system.',
        evidenceNeeded: 'Operational pressure observations that can be interpreted alongside subsurface imaging.',
        methods: ['Wellhead pressure monitoring', 'Integrated trend review with seismic interpretation'],
        capabilities: ['Injection surveillance', 'Pressure-data QA/QC', 'Integrated reservoir monitoring'],
        deliverables: ['Pressure trend record', 'Integrated monitoring interpretation'],
        referenceIds: ['iso-27914-2026', 'dnv-rp-j203'],
        rationale: 'Equinor describes wellhead pressure as a complementary monitoring measurement alongside repeated seismic observations at Sleipner.',
        sourceIds: ['equinor-sleipner-monitoring-2009', 'iso-27914-2026']
      }
    ],
    tags: ['saline-storage', 'baseline-seismic', '4d-seismic', 'plume-monitoring', 'containment']
  },
  {
    id: 'aurora-storage-characterization',
    title: 'Northern Lights Aurora — characterize reservoir and seal before injection',
    projectArchetype: 'offshore-ccs',
    lifecycleStages: ['feasibility', 'pre-feed', 'feed'],
    projectContext: 'Offshore storage-site development in the North Sea where reservoir quality and sealing capacity must be demonstrated before commercial injection.',
    decision: 'Is the candidate storage interval suitable for injection and long-term containment, and what baseline evidence should anchor later monitoring?',
    outcome: 'Combine well and subsurface evidence to establish reservoir/seal suitability and a defensible pre-injection baseline.',
    evidence: [
      {
        id: 'aurora-well-characterization',
        discipline: 'wells',
        uncertainty: 'Reservoir quality and seal presence cannot be resolved reliably from regional interpretation alone.',
        evidenceNeeded: 'Direct well evidence describing reservoir rock and sealing units at the proposed storage site.',
        methods: ['Exploration / confirmation well', 'Core acquisition and analysis', 'Well-log interpretation'],
        capabilities: ['Offshore drilling support', 'Core handling and laboratory analysis', 'Petrophysical interpretation', 'Storage geology integration'],
        deliverables: ['Reservoir-quality assessment', 'Seal characterization', 'Well-to-seismic calibration inputs'],
        referenceIds: ['iso-27914-2026', 'dnv-rp-j203', 'dnv-se-0617'],
        rationale: 'Northern Lights cites the Eos well and core analysis as evidence confirming reservoir sandstone quality and an overlying sealing layer.',
        sourceIds: ['northern-lights-storage-2020', 'iso-27914-2026']
      },
      {
        id: 'aurora-baseline-model',
        discipline: 'data-integration',
        uncertainty: 'Future plume movement cannot be interpreted confidently without a coherent pre-injection reference model.',
        evidenceNeeded: 'An integrated baseline that links well evidence, seismic interpretation and the expected storage behaviour.',
        methods: ['Well-seismic integration', 'Static storage model construction', 'Baseline monitoring design'],
        capabilities: ['Subsurface data integration', 'Geological modelling', 'Reservoir monitoring design'],
        deliverables: ['Pre-injection reference model', 'Monitoring objectives and baseline evidence register'],
        referenceIds: ['iso-27914-2026', 'dnv-rp-j203'],
        rationale: 'The current ISO storage lifecycle explicitly treats characterization and development as site-specific risk and uncertainty work; Northern Lights describes seismic monitoring as a way to refine models and check plume migration.',
        sourceIds: ['northern-lights-storage-2020', 'iso-27914-2026']
      }
    ],
    tags: ['saline-storage', 'pre-feed', 'site-characterization', 'well-data', 'baseline']
  },
  {
    id: 'aurora-induced-seismicity-monitoring',
    title: 'Northern Lights Aurora — continuous seismicity surveillance during injection',
    projectArchetype: 'offshore-ccs',
    lifecycleStages: ['operations', 'monitoring'],
    projectContext: 'Commercial offshore CO2 injection where operational integrity requires surveillance of injection-related seismic activity.',
    decision: 'Is injection occurring without seismic behaviour that would challenge operational integrity or the storage assurance case?',
    outcome: 'Maintain continuous seismicity surveillance and integrate detected events into operational storage monitoring.',
    evidence: [
      {
        id: 'aurora-seismicity-network',
        discipline: 'monitoring',
        uncertainty: 'Injection-related seismic activity may occur between periodic geophysical surveys and needs continuous surveillance.',
        evidenceNeeded: 'Continuous observations capable of detecting and analysing seismic activity associated with injection.',
        methods: ['Permanent seismic monitoring station', 'Continuous event detection and analysis'],
        capabilities: ['Passive seismic monitoring', 'Event detection', 'Seismological interpretation', 'Operational alert integration'],
        deliverables: ['Seismic event catalogue', 'Operational integrity monitoring record', 'Escalation-ready event interpretation'],
        referenceIds: ['iso-27914-2026', 'dnv-rp-j203'],
        rationale: 'Northern Lights states that continuous monitoring of injection and seismic activity supports safe storage and reliable operations at Aurora.',
        sourceIds: ['northern-lights-norsar-2025', 'iso-27914-2026']
      }
    ],
    tags: ['saline-storage', 'operations', 'passive-seismic', 'induced-seismicity', 'monitoring']
  }
];

export const evidenceSourceById = new Map(evidenceSources.map((source) => [source.id, source]));
