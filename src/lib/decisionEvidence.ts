export type ProjectArchetype =
  | 'offshore-ccs'
  | 'fixed-offshore-wind'
  | 'floating-offshore-wind'
  | 'subsea-corridor'
  | 'offshore-field-development'
  | 'marine-infrastructure'
  | 'decommissioning';

export type LifecycleStage =
  | 'screening'
  | 'feasibility'
  | 'pre-feed'
  | 'feed'
  | 'construction'
  | 'operations'
  | 'monitoring'
  | 'closure';

export type EvidenceDiscipline =
  | 'hydrography'
  | 'geophysics'
  | 'geology'
  | 'geotechnics'
  | 'geomechanics'
  | 'wells'
  | 'metocean'
  | 'uxo-archaeology'
  | 'marine-ecology'
  | 'acoustics'
  | 'structures'
  | 'electrical'
  | 'subsea-engineering'
  | 'marine-operations'
  | 'inspection-integrity'
  | 'environment'
  | 'monitoring'
  | 'data-integration';

export interface EvidenceSource {
  id: string;
  title: string;
  publisher: string;
  url: string;
  publishedYear: number;
  sourceType: 'operator' | 'project' | 'regulator' | 'government' | 'technical-body';
  note?: string;
}

export interface EvidenceRequirement {
  id: string;
  discipline: EvidenceDiscipline;
  uncertainty: string;
  evidenceNeeded: string;
  methods: string[];
  capabilityIds: string[];
  deliverables: string[];
  referenceIds: string[];
  rationale: string;
  sourceIds: string[];
  tags?: string[];
}

export interface ReferenceCase {
  id: string;
  title: string;
  projectArchetype: ProjectArchetype;
  lifecycleStages: LifecycleStage[];
  projectContext: string;
  decision: string;
  outcome: string;
  evidence: EvidenceRequirement[];
  tags: string[];
}

export interface EvidencePlanQuery {
  projectArchetype: ProjectArchetype;
  lifecycleStage?: LifecycleStage;
  tags?: string[];
}

export interface MatchedEvidenceCase {
  case: ReferenceCase;
  matchingEvidence: EvidenceRequirement[];
}
