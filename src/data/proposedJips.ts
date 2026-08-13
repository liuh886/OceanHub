export type JipFormationStatus =
  | 'Concept / Problem Framing'
  | 'Seeking Technical Partners'
  | 'Seeking Co-sponsors'
  | 'Scope Development'
  | 'Ready for Consortium Formation';

export interface ProposedJip {
  id: string;
  number: string;
  category: string;
  status: JipFormationStatus;
  title: string;
  premise: string;
  problem: string;
  whyCollaborate: string;
  targetOutcome: string;
  workstreams: string[];
  capabilities: string[];
  referenceIds: string[];
  regulatoryNotes?: string[];
  deliverables: string[];
  partnerProfiles: string[];
  collaborationModel: string;
}

export const proposedJips: ProposedJip[] = [
  {
    id: 'ccus-4d-mrv',
    number: 'JIP-01',
    category: 'Offshore CCUS',
    status: 'Seeking Technical Partners',
    title: 'Offshore CCUS 4D Optical DAS & Microseismic MRV',
    premise: 'Explore how permanent sensing can complement episodic marine seismic campaigns in offshore storage assurance.',
    problem: 'Offshore CO₂ storage needs monitoring that can connect plume imaging, injection behaviour and geomechanical response across long operating periods. Repeat vessel surveys provide strong spatial imaging but are episodic and mobilization-intensive.',
    whyCollaborate: 'A credible field pathway spans fiber hardware, marine installation, seismic interrogation, passive seismicity, reservoir interpretation and regulatory MRV. No single capability owner can validate the full evidence chain alone.',
    targetOutcome: 'Define and field-test a traceable monitoring architecture that shows where permanent optical and passive-seismic sensing adds decision value alongside repeat seismic and operational surveillance.',
    workstreams: [
      'Monitoring-objective and decision-gate definition for baseline, injection and assurance phases',
      'Seabed / wellbore fiber configuration and interrogation benchmarking',
      'Passive seismic event-detection and interpretation workflow',
      'Integration with repeat seismic, injection data and reservoir / geomechanical models',
      'MRV evidence packaging, provenance and escalation criteria'
    ],
    capabilities: [
      'DAS / distributed fiber-optic sensing',
      'Passive seismic and microseismic monitoring',
      'Marine seismic acquisition and 4D processing',
      'Subsea cable deployment and protection',
      'Reservoir geomechanics and storage modelling',
      'CCS monitoring, verification and regulatory evidence design'
    ],
    referenceIds: ['iso-27914-2026', 'dnv-rp-j203', 'imo-london-protocol-ccs'],
    deliverables: [
      'Proposed permanent-sensing reference architecture and field-test protocol',
      'Cross-method data-integration and interpretation workflow',
      'Monitoring decision matrix showing where each sensing method changes an operational or assurance decision',
      'Audit-ready evidence-package template with explicit provenance and limitations'
    ],
    partnerProfiles: ['Storage operators', 'Fiber / interrogator technology providers', 'Marine geophysical contractors', 'Subsea EPC / cable specialists', 'Seismology and geomechanics teams', 'MRV / assurance specialists'],
    collaborationModel: 'Proposed multi-party field-validation JIP with shared methods, benchmark datasets and jointly reviewed evidence criteria.'
  },
  {
    id: 'floating-wind-foundations',
    number: 'JIP-02',
    category: 'Floating Offshore Wind',
    status: 'Scope Development',
    title: 'Floating Offshore Wind Foundation & Cyclic Soil Mechanics',
    premise: 'Connect site characterization directly to anchor and mooring decisions under repeated cyclic loading.',
    problem: 'Floating-wind anchor performance depends on soil behaviour under complex cyclic loading, yet geophysical interpretation, CPTu, laboratory testing and foundation analysis are often delivered as separate work packages.',
    whyCollaborate: 'Developers, geotechnical contractors, laboratories, anchor designers and numerical-modelling teams need a common evidence chain so field measurements translate consistently into design parameters and installation decisions.',
    targetOutcome: 'Create a reusable workflow linking regional ground models, in-situ testing, cyclic laboratory evidence and anchor design checks for floating-wind developments.',
    workstreams: [
      'Ground-model uncertainty and geohazard framing for anchor / mooring layouts',
      'Deep CPTu and sampling strategy linked to design decisions',
      'Cyclic DSS / triaxial testing programme and parameter derivation',
      'Suction-caisson / anchor response modelling and sensitivity analysis',
      'Field-to-model traceability and design-parameter handoff'
    ],
    capabilities: [
      'Marine geophysics and integrated ground modelling',
      'Deepwater CPTu and seabed sampling',
      'Advanced cyclic soil laboratory testing',
      'Foundation / anchor engineering',
      'Finite-element and soil-structure interaction modelling',
      'Mooring-system engineering'
    ],
    referenceIds: ['dnv-st-0119', 'iso-19901-4-2025', 'iso-19901-8-2023', 'dnv-rp-e303'],
    regulatoryNotes: ['Contracted projects may additionally specify API or national foundation standards; verify the required edition in the project design basis.'],
    deliverables: [
      'Decision-linked site-characterization workflow for floating-wind anchors',
      'Cyclic soil parameter derivation and uncertainty framework',
      'Anchor-design evidence matrix connecting field / lab data to engineering checks',
      'Reference dataset structure for cross-project comparison'
    ],
    partnerProfiles: ['Floating-wind developers', 'Marine geotechnical contractors', 'Geotechnical laboratories', 'Anchor / mooring designers', 'Engineering consultancies', 'Research groups'],
    collaborationModel: 'Proposed shared-method and benchmark-data JIP focused on repeatable site-to-design handoffs.'
  },
  {
    id: 'low-impact-acoustics',
    number: 'JIP-03',
    category: 'Marine Acoustics & Ecology',
    status: 'Seeking Co-sponsors',
    title: 'Ultra-Low Impact Marine Acoustics & Active Bubble Curtain Damping',
    premise: 'Connect acoustic prediction, mitigation performance and real-time ecological observation into one consenting evidence chain.',
    problem: 'High-energy offshore construction and survey activities face increasingly demanding underwater-noise and marine-fauna constraints, while propagation modelling, mitigation systems and PAM observations are often evaluated separately.',
    whyCollaborate: 'The useful evidence chain crosses acoustic modelling, source characterization, mitigation engineering, hydrophone / PAM networks, ecological interpretation and consenting requirements.',
    targetOutcome: 'Develop a field-verifiable workflow for predicting, measuring and documenting acoustic impact and mitigation performance during offshore operations.',
    workstreams: [
      'Site-specific propagation-model inputs and uncertainty treatment',
      'Source characterization and mitigation-system test design',
      'Bubble-curtain / alternative mitigation field trials with before-after measurement',
      'PAM detection, review and operational trigger workflow',
      'Consenting-ready acoustic evidence and provenance package'
    ],
    capabilities: [
      'Underwater acoustic propagation modelling',
      'Hydrophone and PAM system deployment',
      'Marine mammal bioacoustics',
      'Noise-mitigation engineering and bubble-curtain systems',
      'Offshore construction / survey operations',
      'Environmental impact and consenting support'
    ],
    referenceIds: ['iso-18405-2017'],
    regulatoryNotes: ['Underwater-noise thresholds, protected-species procedures and mitigation requirements are jurisdiction- and consent-specific and must be resolved from the applicable regulator and project consent.'],
    deliverables: [
      'Common field-trial protocol for mitigation performance',
      'Model-to-measurement calibration workflow with uncertainty reporting',
      'Real-time PAM operational decision workflow',
      'Consenting evidence template linking predictions, observations, mitigation and operational actions'
    ],
    partnerProfiles: ['Offshore developers / EPCIs', 'Acoustic technology providers', 'PAM operators', 'Noise-mitigation suppliers', 'Marine ecologists', 'Regulatory / consenting specialists'],
    collaborationModel: 'Proposed co-sponsored field-trial JIP combining engineering and ecological evidence rather than treating them as separate studies.'
  },
  {
    id: 'subsea-energy-corridors',
    number: 'JIP-04',
    category: 'Subsea Infrastructure',
    status: 'Concept / Problem Framing',
    title: 'Subsea Green Energy Corridor & Autonomous USV Inspection',
    premise: 'Use repeat autonomous observation to turn route change into actionable cable / pipeline integrity evidence.',
    problem: 'Export cables, interconnectors and future low-carbon subsea corridors cross mobile seabeds where scour, burial change and free spans evolve between conventional inspection campaigns.',
    whyCollaborate: 'Autonomous survey alone does not create an integrity decision. Survey operators, asset owners, geoscience teams and structural / cable engineers need shared change-detection and escalation rules.',
    targetOutcome: 'Frame a repeatable low-footprint inspection workflow connecting autonomous survey, change detection and engineering screening for subsea energy corridors.',
    workstreams: [
      'Inspection decision gates and minimum detectable-change requirements',
      'USV / autonomous survey repeatability and navigation-control design',
      '4D bathymetric / seabed-change detection and QA/QC',
      'Free-span, scour, burial and route-risk screening',
      'Engineering escalation thresholds and evidence handoff'
    ],
    capabilities: [
      'USV / autonomous marine survey',
      'Multibeam bathymetry and sub-bottom profiling',
      'Repeat-survey positioning and change detection',
      'Subsea cable / pipeline integrity engineering',
      'Scour, free-span and VIV assessment',
      'Geospatial data processing and asset-risk integration'
    ],
    referenceIds: ['iho-s44-6-2-0', 'dnv-rp-f105', 'dnv-rp-f109', 'dnv-rp-f116', 'dnv-rp-0360'],
    regulatoryNotes: ['Survey class, cable-owner criteria and marine-operations requirements remain asset- and project-specific.'],
    deliverables: [
      'Autonomous repeat-survey reference workflow',
      'Change-detection QA/QC and minimum-detectable-change framework',
      'Engineering screening matrix for scour, burial and free-span change',
      'Decision-ready inspection evidence package for asset teams'
    ],
    partnerProfiles: ['Cable / pipeline owners', 'USV operators', 'Marine survey companies', 'Cable installers / EPCIs', 'Integrity engineering teams', 'Sensor and autonomy technology providers'],
    collaborationModel: 'Early-stage proposed JIP; first objective is to agree the shared problem statement, evidence thresholds and a realistic pilot scope.'
  }
];
