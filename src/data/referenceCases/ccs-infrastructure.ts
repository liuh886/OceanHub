import type { ReferenceCase } from '../../lib/decisionEvidence';

export const ccsInfrastructureCases: ReferenceCase[] = [
  {
    id: 'northern-lights-phase2-scaleup', title: 'Northern Lights Phase 2 — scale an integrated CO2 transport and storage chain', projectArchetype: 'offshore-ccs', lifecycleStages: ['feed','construction'],
    projectContext: 'Expansion of an operating CCS chain with additional receiving-terminal, shipping, pipeline and injection capacity.',
    decision: 'What additional infrastructure is required to scale throughput without shifting the bottleneck elsewhere in the chain?',
    outcome: 'Coordinate terminal expansion, shipping, subsea transport and injection-well capacity as one integrated system.',
    evidence: [{ id: 'northern-lights-phase2-system', discipline: 'data-integration', uncertainty: 'Capacity expansion can move constraints between receiving, buffer storage, shipping, pipeline transport and injection.', evidenceNeeded: 'Integrated capacity and interface definition across terminal, vessels, pipeline and wells.', methods: ['System capacity modelling','Terminal and jetty engineering','Subsea pipeline extension design','Injection-well planning','Marine logistics planning'], capabilityIds: ['co2-terminal-process-engineering','co2-marine-logistics','subsea-pipeline-engineering','ccs-well-engineering','systems-integration','marine-operations-planning'], deliverables: ['Integrated expansion basis','Interface register','Capacity and bottleneck model','Construction and commissioning sequence'], referenceIds: ['iso-27913-2024','iso-27914-2026','dnv-st-f101','dnv-st-n001'], rationale: 'Northern Lights Phase 2 combines new tanks and pumps, a jetty, two injection wells, pipeline extension and additional CO2 vessels.', sourceIds: ['northern-lights-phase2-2026'] }],
    tags: ['ccs-hub','terminal','shipping','pipeline','injection-well','scale-up']
  },
  {
    id: 'porthos-brownfield-conversion', title: 'Porthos — convert gas-production infrastructure for CO2 injection', projectArchetype: 'offshore-ccs', lifecycleStages: ['feed','construction','operations'],
    projectContext: 'A depleted offshore gas system where the P18-A platform, wells and reservoir are repurposed for permanent CO2 storage.',
    decision: 'Can existing offshore production infrastructure be safely converted into a remotely monitored CO2 injection system?',
    outcome: 'Define platform, well, instrumentation and control modifications required for brownfield CCS reuse.',
    evidence: [{ id: 'porthos-platform-well-conversion', discipline: 'wells', uncertainty: 'Legacy production wells and platform systems were not originally designed for CO2 injection service.', evidenceNeeded: 'Condition, conversion and monitoring evidence covering wells, platform process paths and remote control.', methods: ['Brownfield platform survey','Well conversion engineering','Tubing replacement','Pressure and temperature instrumentation','Remote-control integration'], capabilityIds: ['brownfield-offshore-conversion','ccs-well-engineering','instrumentation-control','subsea-integrity-engineering'], deliverables: ['Conversion design basis','Well modification package','Instrumentation architecture','Operational monitoring plan'], referenceIds: ['iso-27914-2026','iso-27913-2024','dnv-rp-j203'], rationale: 'Porthos is converting the former gas-production platform and wells and installing pressure and temperature monitoring for injection.', sourceIds: ['porthos-project','porthos-platform-wells-2025'] }],
    tags: ['depleted-field','brownfield','platform-conversion','well-conversion','instrumentation']
  },
  {
    id: 'porthos-offshore-pipeline', title: 'Porthos — offshore CO2 pipeline installation and protection', projectArchetype: 'offshore-ccs', lifecycleStages: ['construction'],
    projectContext: 'Offshore transport link from the Rotterdam compression system to the repurposed P18-A platform.',
    decision: 'How should the offshore CO2 pipeline be installed, protected and tied into the storage platform?',
    outcome: 'Deliver a route, installation and protection package that supports safe CO2 transport to the offshore storage asset.',
    evidence: [{ id: 'porthos-pipeline-installation', discipline: 'marine-operations', uncertainty: 'Route condition, landfall/interface constraints and seabed interaction affect installation and long-term integrity.', evidenceNeeded: 'Survey-supported installation design, protection requirements and platform tie-in readiness.', methods: ['Route survey and engineering','Offshore pipelay','Landfall and pull-in engineering','Trenching and burial/protection','Platform tie-in'], capabilityIds: ['marine-geophysics','pipeline-route-engineering','pipeline-installation','marine-operations-planning','brownfield-offshore-conversion'], deliverables: ['Installation route package','Marine operations plan','Burial/protection record','As-laid and as-built survey'], referenceIds: ['iso-27913-2024','dnv-st-f101','dnv-st-n001'], rationale: 'Porthos combines a new offshore CO2 pipeline with repurposed platform infrastructure, creating a direct transport-to-storage construction interface.', sourceIds: ['porthos-project'] }],
    tags: ['co2-pipeline','route','pipelay','trenching','burial','tie-in']
  },
  {
    id: 'ravenna-infrastructure-reuse', title: 'Ravenna CCS — reuse gas pipelines, platform and depleted field', projectArchetype: 'offshore-ccs', lifecycleStages: ['construction','operations'],
    projectContext: 'Italian CCS phase using reconverted natural-gas pipelines to an existing offshore platform and depleted gas reservoir.',
    decision: 'Which existing offshore gas assets can be repurposed for a reliable capture-to-storage chain?',
    outcome: 'Integrate converted transport infrastructure, offshore platform and depleted reservoir into an operating CCS system.',
    evidence: [{ id: 'ravenna-reuse-chain', discipline: 'subsea-engineering', uncertainty: 'Repurposed pipelines and offshore facilities must be fit for CO2 transport and injection service.', evidenceNeeded: 'Asset condition, conversion design and integrated operating evidence across transport, platform and reservoir.', methods: ['Existing-asset integrity assessment','Pipeline conversion engineering','Platform modification','Injection integration','Operational monitoring'], capabilityIds: ['brownfield-offshore-conversion','subsea-pipeline-engineering','ccs-well-engineering','reservoir-characterization','subsea-integrity-engineering'], deliverables: ['Reuse suitability assessment','Conversion design package','Integrated commissioning basis','Operational assurance record'], referenceIds: ['iso-27913-2024','iso-27914-2026','dnv-st-f101'], rationale: 'Ravenna Phase 1 transports captured CO2 through reconverted gas pipelines to an offshore platform for injection into a depleted gas field.', sourceIds: ['ravenna-launch-2024'] }],
    tags: ['depleted-field','pipeline-reuse','platform-reuse','brownfield','injection']
  }
];
