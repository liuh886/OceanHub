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
  cells: Record<string, MatrixCell>;
}

export interface CapabilityMatrixResult {
  columns: MatrixColumn[];
  rows: MatrixRow[];
  summary: {
    totalRequiredCapabilities: number;
    providerCount: number;
    topCoverageProviderName?: string;
  };
}

function assertionCell(assertion: ProviderResponseAssertion): MatrixCell {
  if (assertion.review_outcome === 'supported') {
    return { status: 'reviewed-supported', statusLabel: 'Supported', evidenceType: assertion.evidence_type, evidenceSnippet: assertion.evidence_detail, reviewOutcome: 'supported' };
  }
  if (assertion.review_outcome === 'partially-supported') {
    return { status: 'reviewed-partial', statusLabel: 'Partially supported', evidenceType: assertion.evidence_type, evidenceSnippet: assertion.evidence_detail, reviewOutcome: 'partially-supported' };
  }
  if (assertion.review_outcome === 'insufficient') {
    return { status: 'reviewed-insufficient', statusLabel: 'Insufficient evidence', evidenceType: assertion.evidence_type, evidenceSnippet: assertion.evidence_detail, reviewOutcome: 'insufficient' };
  }
  return {
    status: 'claimed-with-evidence',
    statusLabel: assertion.review_state === 'under-review' ? 'Under review' : 'Evidence submitted',
    evidenceType: assertion.evidence_type,
    evidenceSnippet: assertion.evidence_detail
  };
}

export function buildCapabilityMatrix(
  requiredCapabilities: Capability[],
  providers: MarketProvider[],
  responses: ProviderResponseStatus[] = []
): CapabilityMatrixResult {
  const responseByProvider = new Map(responses.map((response) => [response.providerId, response]));
  const requiredIds = requiredCapabilities.map((capability) => capability.id);

  const columns: MatrixColumn[] = providers.map((provider) => {
    const response = responseByProvider.get(provider.id);
    let coverageCount = 0;
    if (response && response.responseState !== 'awaiting-response') {
      const claimed = new Set(response.assertions?.map((assertion) => assertion.capability_id) ?? []);
      coverageCount = requiredIds.filter((id) => claimed.has(id)).length;
    } else {
      const publicMapped = new Set(provider.capabilityIds);
      coverageCount = requiredIds.filter((id) => publicMapped.has(id)).length;
    }
    return {
      providerId: provider.id,
      providerName: provider.name,
      evidenceBasis: provider.evidenceBasis,
      responseState: response?.responseState ?? 'awaiting-response',
      coverageCount,
      coveragePercentage: requiredIds.length ? Math.round((coverageCount / requiredIds.length) * 100) : 0
    };
  });

  const rows: MatrixRow[] = requiredCapabilities.map((capability) => {
    const cells: Record<string, MatrixCell> = {};
    for (const provider of providers) {
      const response = responseByProvider.get(provider.id);
      if (!response || response.responseState === 'awaiting-response') {
        cells[provider.id] = provider.capabilityIds.includes(capability.id)
          ? { status: 'matched-public', statusLabel: 'Public mapped' }
          : { status: 'missing-public', statusLabel: 'Uncovered' };
        continue;
      }

      const assertion = response.assertions?.find((item) => item.capability_id === capability.id);
      if (assertion) {
        cells[provider.id] = assertionCell(assertion);
      } else if (response.notClaimedCapabilityIds?.includes(capability.id)) {
        cells[provider.id] = { status: 'unclaimed', statusLabel: 'Not claimed' };
      } else {
        cells[provider.id] = { status: 'awaiting', statusLabel: 'Awaiting response' };
      }
    }
    return {
      capabilityId: capability.id,
      capabilityLabel: capability.label,
      capabilityFamily: capability.family,
      cells
    };
  });

  const top = [...columns].sort((a, b) => b.coverageCount - a.coverageCount || a.providerName.localeCompare(b.providerName))[0];
  return {
    columns,
    rows,
    summary: {
      totalRequiredCapabilities: requiredCapabilities.length,
      providerCount: providers.length,
      topCoverageProviderName: top?.providerName
    }
  };
}
