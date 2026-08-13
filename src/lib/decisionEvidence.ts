export type ProjectArchetype =
  | 'offshore-ccs'
  | 'fixed-offshore-wind'
  | 'floating-offshore-wind'
  | 'subsea-corridor';

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
  | 'geophysics'
  | 'geology'
  | 'geomechanics'
  | 'wells'
  | 'environment'
  | 'monitoring'
  | 'data-integration';

export interface EvidenceSource {
  id: string;
  title: string;
  publisher: string;
  url: string;
  publishedYear: number;
  sourceType: 'operator' | 'project' | 'standard';
  note?: string;
}

export interface EvidenceRequirement {
  id: string;
  discipline: EvidenceDiscipline;
  uncertainty: string;
  evidenceNeeded: string;
  methods: string[];
  capabilities: string[];
  deliverables: string[];
  referenceIds: string[];
  rationale: string;
  sourceIds: string[];
}

export interface OffshoreReferenceCase {
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
  case: OffshoreReferenceCase;
  matchingEvidence: EvidenceRequirement[];
}
