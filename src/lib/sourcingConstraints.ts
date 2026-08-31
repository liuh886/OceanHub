import type { Capability, WaterDepthTier } from './capability';
import type { MarketProvider } from './marketProvider';

export interface SourcingConstraints {
  waterDepthTier?: WaterDepthTier;
  deliveryRegion?: string;
}

export interface ProviderConstraintMatch {
  provider: MarketProvider;
  matchedCapabilityIds: string[];
  missingCapabilityIds: string[];
  outOfEnvelopeCapabilityIds: string[];
}

function capabilitySupportsConstraints(capability: Capability, constraints: SourcingConstraints): boolean {
  const envelope = capability.operationalEnvelope;
  if (!envelope) return true;

  if (constraints.waterDepthTier && envelope.waterDepthTiers?.length && !envelope.waterDepthTiers.includes(constraints.waterDepthTier)) {
    return false;
  }

  if (constraints.deliveryRegion && envelope.deliveryRegions?.length) {
    const normalized = envelope.deliveryRegions.map((region) => region.toLowerCase());
    const requested = constraints.deliveryRegion.toLowerCase();
    if (!normalized.includes('global') && !normalized.includes(requested)) return false;
  }

  return true;
}

export function matchProviderWithConstraints(
  provider: MarketProvider,
  requiredCapabilities: Capability[],
  constraints: SourcingConstraints
): ProviderConstraintMatch {
  const providerIds = new Set(provider.capabilityIds);
  const matchedCapabilityIds: string[] = [];
  const missingCapabilityIds: string[] = [];
  const outOfEnvelopeCapabilityIds: string[] = [];

  for (const capability of requiredCapabilities) {
    if (!providerIds.has(capability.id)) {
      missingCapabilityIds.push(capability.id);
      continue;
    }
    if (!capabilitySupportsConstraints(capability, constraints)) {
      outOfEnvelopeCapabilityIds.push(capability.id);
      continue;
    }
    matchedCapabilityIds.push(capability.id);
  }

  return { provider, matchedCapabilityIds, missingCapabilityIds, outOfEnvelopeCapabilityIds };
}

export function capabilityConstraintGaps(requiredCapabilities: Capability[], constraints: SourcingConstraints): Capability[] {
  return requiredCapabilities.filter((capability) => !capabilitySupportsConstraints(capability, constraints));
}
