import type { ReferenceCase } from '../../lib/decisionEvidence';

export const windSiteCasesB: ReferenceCase[] = [
  {
    id: 'revolution-foundation-cable-evidence', title: 'Revolution Wind — foundation and cable decision evidence', projectArchetype: 'fixed-offshore-wind', lifecycleStages: ['pre-feed', 'feed'],
    projectContext: 'Integrated investigation supporting foundation feasibility, cable burial and route-hazard decisions.',
    decision: 'Are foundation locations and cable routes feasible given ground conditions, burial constraints and MEC/UXO risk?',
    outcome: 'Translate site investigation evidence into foundation and cable design inputs.',
    evidence: [{ id: 'revolution-foundation-cable', discipline: 'geotechnics', uncertainty: 'Foundation response and burial feasibility depend on local ground and hazards.', evidenceNeeded: 'Geophysical/geotechnical evidence tied to foundation and cable locations.', methods: ['High-resolution geophysics', 'Boreholes/CPT', 'Ground modelling', 'Cable burial risk assessment', 'MEC/UXO assessment'], capabilityIds: ['marine-geophysics','marine-geotechnics','ground-modeling','foundation-anchor-engineering','subsea-cable-engineering','uxo-archaeology'], deliverables: ['Foundation ground model', 'Design parameters', 'CBRA', 'UXO/MEC register'], referenceIds: ['iso-19901-10-2021', 'iso-19901-8-2023', 'iso-19901-4-2025', 'dnv-st-0126', 'dnv-rp-0360', 'boem-gg-guidance-2024'], rationale: 'The Revolution Wind record explicitly links site investigation to foundation feasibility and cable burial.', sourceIds: ['revolution-wind-cop'] }],
    tags: ['foundation', 'cable-burial', 'cbra', 'uxo']
  },
  {
    id: 'revolution-environment-metocean', title: 'Revolution Wind — environmental and metocean evidence chain', projectArchetype: 'fixed-offshore-wind', lifecycleStages: ['feasibility', 'pre-feed', 'feed'],
    projectContext: 'Consenting evidence spanning hydrodynamics, sediment, acoustics, metocean, benthic habitat, fisheries and archaeology.',
    decision: 'What physical and environmental evidence is needed to define effects, mitigation and design constraints?',
    outcome: 'Connect baseline observations, models and impact assessment to project decisions.',
    evidence: [{ id: 'revolution-environment-chain', discipline: 'marine-ecology', uncertainty: 'Physical and ecological effects interact across multiple disciplines.', evidenceNeeded: 'Metocean, habitat, fisheries, protected-species, acoustic and archaeology evidence in one baseline.', methods: ['Metocean measurement', 'Hydrodynamic/sediment modelling', 'Benthic survey', 'Fisheries/protected-species survey', 'Underwater acoustic modelling'], capabilityIds: ['metocean-observation-analysis','ocean-coastal-modeling','marine-ecology','fisheries-socioeconomics','underwater-acoustics','uxo-archaeology'], deliverables: ['Integrated environmental baseline', 'Model outputs', 'Impact assessment inputs', 'Mitigation register'], referenceIds: ['iso-19901-1-2015', 'dnv-rp-c205', 'iso-18405-2017'], rationale: 'The COP integrates these disciplines in a single project evidence chain.', sourceIds: ['revolution-wind-cop'] }],
    tags: ['metocean', 'sediment', 'benthic', 'fisheries', 'acoustics', 'archaeology']
  }
];