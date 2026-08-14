import { capabilities } from '../data/capabilities';
import { marketProviders } from '../data/marketProviders';
import type { ProviderMatch } from './marketProvider';

const capabilityIds = new Set(capabilities.map((capability) => capability.id));

export function validateMarketProviders() {
  const providerIds = new Set<string>();

  for (const provider of marketProviders) {
    if (providerIds.has(provider.id)) throw new Error(`Duplicate market provider ID: ${provider.id}`);
    providerIds.add(provider.id);

    if (!provider.sources.length) throw new Error(`Market provider ${provider.id} has no public evidence sources.`);

    for (const capabilityId of provider.capabilityIds) {
      if (!capabilityIds.has(capabilityId)) {
        throw new Error(`Unknown capability ID ${capabilityId} in market provider ${provider.id}`);
      }
    }
  }
}

export function matchMarketProviders(requiredCapabilityIds: string[]): ProviderMatch[] {
  const required = [...new Set(requiredCapabilityIds)];
  const requiredSet = new Set(required);

  return marketProviders
    .map((provider) => {
      const matchedCapabilityIds = provider.capabilityIds.filter((capabilityId) => requiredSet.has(capabilityId));
      const providerCapabilities = new Set(provider.capabilityIds);
      const missingCapabilityIds = required.filter((capabilityId) => !providerCapabilities.has(capabilityId));
      return { provider, matchedCapabilityIds, missingCapabilityIds };
    })
    .filter((match) => match.matchedCapabilityIds.length > 0)
    .sort((a, b) => b.matchedCapabilityIds.length - a.matchedCapabilityIds.length || a.provider.name.localeCompare(b.provider.name));
}

validateMarketProviders();
