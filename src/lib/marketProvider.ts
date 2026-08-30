export type ProviderEvidenceBasis = 'public-source-mapped' | 'oceanhub-reviewed';

export interface ProviderSource {
  title: string;
  publisher: string;
  url: string;
}

export interface ProviderCredentials {
  classificationSocieties?: string[];
  hseCertifications?: string[];
  coreFleetOrLabs?: string[];
}

export interface ProviderEvidenceTriad {
  referenceProjectsCount?: number;
  featuredAssets?: string[];
  sampleDeliverables?: string[];
}

export interface MarketProvider {
  id: string;
  name: string;
  summary: string;
  website: string;
  deliveryFootprint: string;
  capabilityIds: string[];
  evidenceBasis: ProviderEvidenceBasis;
  sources: ProviderSource[];
  credentials?: ProviderCredentials;
  evidenceTriad?: ProviderEvidenceTriad;
}

export interface ProviderMatch {
  provider: MarketProvider;
  matchedCapabilityIds: string[];
  missingCapabilityIds: string[];
}

