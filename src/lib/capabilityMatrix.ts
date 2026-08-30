import type { Capability } from './capability';
import type { MarketProvider } from './marketProvider';

export type CellStatus =
  | 'matched-public'
  | 'missing-public'
  | 'claimed-with-evidence'
  | 'unclaimed'
  | 'reviewed-supported'
  | 'reviewed-partial'
  | 'reviewed-insufficient'
  | 'awaiting';

export interface ProviderResponseAssertion {
  capability_id: string;
  capability_label?: string;
  evidence_type?: string;
  evidence_detail?: string;
  review_state?: string;
  review_outcome?: 'supported' | 'partially-supported' | 'insufficient' | null;
}

export interface ProviderResponseStatus {
  providerId: string;
  providerName?: string;
  responseState: 'awaiting-response' | 'evidence-submitted' | 'under-review' | 'reviewed';
  submittedAt?: string | null;
  notClaimedCapabilityIds?: string[];
  assertions?: ProviderResponseAssertion[];
}

export interface MatrixColumn {
  providerId: string;
  providerName: string;
  evidenceBasis: string;
  responseState: string;
  coverageCount: number;
  coveragePercentage: number;
}

export interface MatrixCell {
  status: CellStatus;
  statusLabel: string;
  evidenceType?: string;
  evidenceSnippet?: string;
  reviewOutcome?: string;
}

export interface MatrixRow {
  capabilityId: string;
  capabilityLabel: string;
  capabilityFamily: string;
  tier: 'mandatory' | 'desirable';
  cells: Record<string, MatrixCell>;
}

export interface CapabilityMatrixResult {
  columns: MatrixColumn[];
  rows: MatrixRow[];
  summary: {
    totalRequiredCapabilities: number;
    mandatoryCapabilitiesCount: number;
    providerCount: number;
    topCoverageProviderName?: string;
  };
}

export function buildCapabilityMatrix(
  requiredCapabilities: Capability[],
  providers: MarketProvider[],
  responses: ProviderResponseStatus[] = [],
  options: { mandatoryCapabilityIds?: string[] } = {}
): CapabilityMatrixResult {
  const mandatorySet = new Set(options.mandatoryCapabilityIds ?? requiredCapabilities.map((c) => c.id));
  const responseByProvider = new Map(responses.map((r) => [r.providerId, r]));

  const columns: MatrixColumn[] = providers.map((provider) => {
    const response = responseByProvider.get(provider.id);
    const requiredIds = requiredCapabilities.map((c) => c.id);

    let coveredCount = 0;
    if (response && response.responseState !== 'awaiting-response') {
      const claimedIds = new Set(response.assertions?.map((a) => a.capability_id) ?? []);
      coveredCount = requiredIds.filter((id) => claimedIds.has(id)).length;
    } else {
      const publicSet = new Set(provider.capabilityIds);
      coveredCount = requiredIds.filter((id) => publicSet.has(id)).length;
    }

    const percentage = requiredCapabilities.length > 0 ? Math.round((coveredCount / requiredCapabilities.length) * 100) : 0;

    return {
      providerId: provider.id,
      providerName: provider.name,
      evidenceBasis: provider.evidenceBasis,
      responseState: response?.responseState ?? 'awaiting-response',
      coverageCount: coveredCount,
      coveragePercentage: percentage
    };
  });

  const rows: MatrixRow[] = requiredCapabilities.map((cap) => {
    const isMandatory = mandatorySet.has(cap.id);
    const cells: Record<string, MatrixCell> = {};

    for (const provider of providers) {
      const response = responseByProvider.get(provider.id);

      if (response && response.responseState !== 'awaiting-response') {
        const assertion = response.assertions?.find((a) => a.capability_id === cap.id);
        const isNotClaimed = response.notClaimedCapabilityIds?.includes(cap.id);

        if (assertion) {
          if (assertion.review_outcome === 'supported') {
            cells[provider.id] = {
              status: 'reviewed-supported',
              statusLabel: 'Supported (Verified)',
              evidenceType: assertion.evidence_type,
              evidenceSnippet: assertion.evidence_detail,
              reviewOutcome: 'supported'
            };
          } else if (assertion.review_outcome === 'partially-supported') {
            cells[provider.id] = {
              status: 'reviewed-partial',
              statusLabel: 'Partially Supported',
              evidenceType: assertion.evidence_type,
              evidenceSnippet: assertion.evidence_detail,
              reviewOutcome: 'partially-supported'
            };
          } else if (assertion.review_outcome === 'insufficient') {
            cells[provider.id] = {
              status: 'reviewed-insufficient',
              statusLabel: 'Insufficient Evidence',
              evidenceType: assertion.evidence_type,
              evidenceSnippet: assertion.evidence_detail,
              reviewOutcome: 'insufficient'
            };
          } else {
            cells[provider.id] = {
              status: 'claimed-with-evidence',
              statusLabel: 'Claimed (Evidence Submitted)',
              evidenceType: assertion.evidence_type,
              evidenceSnippet: assertion.evidence_detail
            };
          }
        } else if (isNotClaimed) {
          cells[provider.id] = {
            status: 'unclaimed',
            statusLabel: 'Not Claimed'
          };
        } else {
          cells[provider.id] = {
            status: 'awaiting',
            statusLabel: 'Awaiting Response'
          };
        }
      } else {
        // Public mapping state
        const hasPublicMapping = provider.capabilityIds.includes(cap.id);
        if (hasPublicMapping) {
          cells[provider.id] = {
            status: 'matched-public',
            statusLabel: 'Public Mapped'
          };
        } else {
          cells[provider.id] = {
            status: 'missing-public',
            statusLabel: 'Uncovered'
          };
        }
      }
    }

    return {
      capabilityId: cap.id,
      capabilityLabel: cap.label,
      capabilityFamily: cap.family,
      tier: isMandatory ? 'mandatory' : 'desirable',
      cells
    };
  });

  const sortedColumns = [...columns].sort((a, b) => b.coverageCount - a.coverageCount);

  return {
    columns,
    rows,
    summary: {
      totalRequiredCapabilities: requiredCapabilities.length,
      mandatoryCapabilitiesCount: requiredCapabilities.filter((c) => mandatorySet.has(c.id)).length,
      providerCount: providers.length,
      topCoverageProviderName: sortedColumns[0]?.providerName
    }
  };
}
