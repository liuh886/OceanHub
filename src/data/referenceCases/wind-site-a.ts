import type { ReferenceCase } from '../../lib/decisionEvidence';

export const windSiteCasesA: ReferenceCase[] = [
  {
    id: 'vineyard-metocean-site-assessment',
    title: 'Vineyard Mid-Atlantic — metocean site assessment',
    projectArchetype: 'fixed-offshore-wind',
    lifecycleStages: ['screening', 'feasibility'],
    projectContext: 'Early site assessment using floating LiDAR and seabed wave/current measurements.',
    decision: 'Are wind, wave and current conditions sufficiently characterized for site selection and early engineering?',
    outcome: 'Establish a measured metocean baseline before design assumptions are fixed.',
    evidence: [{ id: 'vineyard-metocean', discipline: 'metocean', uncertainty: 'Site conditions vary spatially and seasonally.', evidenceNeeded: 'Atmospheric and oceanographic observations for model calibration and design-basis work.', methods: ['Floating LiDAR', 'Wave/current measurement', 'Metocean QA/QC'], capabilities: ['Floating LiDAR', 'Oceanographic instrumentation', 'Metocean analysis'], deliverables: ['Validated time series', 'Wind/wave/current statistics'], referenceIds: ['iso-19901-1-2015', 'dnv-rp-c205'], rationale: 'BOEM records floating LiDAR and seabed wave/current measurement for this site.', sourceIds: ['vineyard-mid-atlantic-boem'] }],
    tags: ['metocean', 'flidar', 'waves', 'currents']
  },
  {
    id: 'new-england-integrated-site-investigation',
    title: 'New England Wind — integrated marine site investigation',
    projectArchetype: 'fixed-offshore-wind',
    lifecycleStages: ['feasibility', 'pre-feed', 'feed'],
    projectContext: 'Wind-farm and cable-corridor investigation combining geophysics, geotechnics, sampling and MEC/UXO evidence.',
    decision: 'Is the site sufficiently characterized for layout, foundation and route design?',
    outcome: 'Combine direct and indirect ground evidence into a common ground and hazard model.',
    evidence: [{ id: 'new-england-site-investigation', discipline: 'geophysics', uncertainty: 'Seabed, shallow stratigraphy and hazards affect foundations and cable routes.', evidenceNeeded: 'Bathymetric, side-scan, sub-bottom, magnetic and direct ground evidence.', methods: ['MBES', 'Side-scan sonar', 'Sub-bottom profiling', 'Magnetometer', 'Geotechnical investigation'], capabilities: ['Hydrography', 'Marine geophysics', 'Marine geotechnics', 'UXO/MEC assessment'], deliverables: ['Ground model', 'Geohazard register', 'GIR inputs', 'UXO/MEC register'], referenceIds: ['iho-s44-6-2-0', 'iso-19901-10-2021', 'iso-19901-8-2023', 'boem-gg-guidance-2024'], rationale: 'The BOEM project record includes these survey, geotechnical and hazard datasets.', sourceIds: ['new-england-wind-cop'] }],
    tags: ['site-investigation', 'geophysics', 'geotechnics', 'uxo']
  }
];
