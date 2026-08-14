import type { EvidenceDiscipline, LifecycleStage, ProjectArchetype } from './decisionEvidence';

export type CapabilityFamily =
  | 'ccs-subsurface'
  | 'marine-survey'
  | 'geotechnics-foundations'
  | 'metocean-environment'
  | 'marine-construction'
  | 'subsea-electrical'
  | 'inspection-integrity'
  | 'digital-integration'
  | 'decommissioning';

export interface Capability {
  id: string;
  label: string;
  family: CapabilityFamily;
  summary: string;
  disciplines: EvidenceDiscipline[];
  lifecycleStages: LifecycleStage[];
  projectArchetypes: ProjectArchetype[];
  methodExamples: string[];
  providerTypes: string[];
}
