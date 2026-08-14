export type ProviderEvidenceBasis = 'public-source-mapped' | 'oceanhub-reviewed';

export interface ProviderSource {
  title: string;
  publisher: string;
  url: string;
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
}

export interface ProviderMatch {
  provider: MarketProvider;
  matchedCapabilityIds: string[];
  missingCapabilityIds: string[];
}
