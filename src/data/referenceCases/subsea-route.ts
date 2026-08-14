import type { ReferenceCase } from '../../lib/decisionEvidence';

export const subseaRouteCases: ReferenceCase[] = [
  {
    id: 'ormen-lange-route-geohazard', title: 'Ormen Lange — deepwater route and geohazard engineering', projectArchetype: 'offshore-field-development', lifecycleStages: ['feasibility', 'feed', 'construction'],
    projectContext: 'Deepwater pipeline development across irregular Storegga terrain with demanding seabed and current conditions.',
    decision: 'Can a pipeline route be selected and prepared to avoid unacceptable geohazard, free-span and installation risk?',
    outcome: 'Use detailed seabed evidence, positioning and route engineering to support constructible alignment and intervention decisions.',
    evidence: [{ id: 'ormen-route-evidence', discipline: 'geophysics', uncertainty: 'Irregular seabed morphology and strong currents can create installation and span risk.', evidenceNeeded: 'High-resolution seabed mapping and route observations tied to installation engineering.', methods: ['Bathymetric/seabed survey', 'ROV/AUV inspection', 'Acoustic subsea positioning', 'Route engineering', 'Seabed preparation'], capabilityIds: ['hydrographic-survey','marine-geophysics','autonomous-subsea-survey','acoustic-positioning','pipeline-route-engineering','marine-operations-planning'], deliverables: ['Route alignment', 'Geohazard register', 'Seabed intervention plan', 'Installation survey package'], referenceIds: ['iho-s44-6-2-0', 'iso-19901-10-2021', 'iso-19901-1-2015', 'dnv-st-f101'], rationale: 'Ormen Lange used detailed seabed examination, unmanned subsea systems and acoustic positioning to manage a difficult deepwater route.', sourceIds: ['ormen-route'] }],
    tags: ['route', 'geohazard', 'bathymetry', 'rov', 'auv', 'positioning']
  },
  {
    id: 'ormen-lange-template-installation', title: 'Ormen Lange — deepwater subsea template installation', projectArchetype: 'offshore-field-development', lifecycleStages: ['construction'],
    projectContext: 'Installation of large subsea production templates at deepwater locations requiring accurate landing and lift control.',
    decision: 'Can the subsea structure be installed within positional and load limits at the target seabed location?',
    outcome: 'Combine lift engineering, simulation, seabed mapping and acoustic positioning into the installation plan.',
    evidence: [{ id: 'ormen-template-installation', discipline: 'marine-operations', uncertainty: 'Heavy subsea lifts are sensitive to vessel motion, rigging, position and seabed landing conditions.', evidenceNeeded: 'Installation analysis and real-time positional evidence for the lift and landing operation.', methods: ['Lift analysis', 'Installation simulation', 'Seabed mapping', 'Acoustic positioning'], capabilityIds: ['marine-heavy-lift','subsea-production-systems','marine-operations-planning','acoustic-positioning','hydrographic-survey'], deliverables: ['Lift plan', 'Installation simulation', 'Landing/position record', 'As-installed survey'], referenceIds: ['dnv-st-n001', 'dnv-rp-0002'], rationale: 'The Ormen Lange template installation used extensive simulation, seabed mapping and acoustic positioning for deepwater placement.', sourceIds: ['ormen-templates'] }],
    tags: ['subsea-template', 'heavy-lift', 'installation', 'positioning']
  }
];