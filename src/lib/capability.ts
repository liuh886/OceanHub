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

export type WaterDepthTier = 'shallow' | 'deepwater' | 'ultra-deepwater';

export interface OperationalEnvelope {
  waterDepthTiers?: WaterDepthTier[];
  coreAssets?: string[];
  deliveryRegions?: string[];
}

export interface EvidenceTriadGuidance {
  referenceProjectExample?: string;
  assetRequirement?: string;
  deliverableExample?: string;
}

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
  operationalEnvelope?: OperationalEnvelope;
  evidenceTriadGuidance?: EvidenceTriadGuidance;
}

