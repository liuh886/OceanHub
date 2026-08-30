export interface EngineeringReference {
  id: string;
  code: string;
  title: string;
  issuer: string;
  kind: string;
  edition: string;
  publishedYear: number;
  status: string;
  officialUrl: string;
  domains: string[];
  lifecycleStages: string[];
  decisionTopics: string[];
  scopeSummary: string;
  applicabilityNotes?: string[];
  keyClauses?: string[];
  complianceChecklist?: string[];
  relevanceLevel?: 'primary' | 'supporting';
}

