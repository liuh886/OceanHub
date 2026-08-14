export type PartnerCapabilityReviewState =
  | 'self-declared'
  | 'evidence-submitted'
  | 'under-review'
  | 'reviewed';

export type PartnerCapabilityReviewOutcome =
  | 'supported'
  | 'partially-supported'
  | 'insufficient';

export type PartnerEvidenceType =
  | 'reference-project'
  | 'field-asset'
  | 'dataset-deliverable'
  | 'procedure-method'
  | 'certification-accreditation'
  | 'personnel-credential'
  | 'publication-paper'
  | 'third-party-assessment';

export interface PartnerCapabilityEvidenceItem {
  id: string;
  type: PartnerEvidenceType;
  title: string;
  description: string;
  sourceUrl?: string;
}

export interface PartnerCapabilityReviewRecord {
  outcome: PartnerCapabilityReviewOutcome;
  reviewedAt: string;
  reviewedBy: string;
  note?: string;
}

export interface PartnerCapabilityAssertion {
  id: string;
  capabilityId: string;
  operatingRegions: string[];
  evidenceItems: PartnerCapabilityEvidenceItem[];
  reviewState: PartnerCapabilityReviewState;
  review?: PartnerCapabilityReviewRecord;
}

export interface PartnerCapabilityProfile {
  organization: string;
  contactEmail: string;
  organizationType: string;
  jipIds: string[];
  assertions: PartnerCapabilityAssertion[];
}

export const partnerEvidenceTypeLabels: Record<PartnerEvidenceType, string> = {
  'reference-project': 'Reference project / client case',
  'field-asset': 'Field asset / equipment',
  'dataset-deliverable': 'Dataset / delivered technical output',
  'procedure-method': 'Procedure / method statement',
  'certification-accreditation': 'Certification / accreditation',
  'personnel-credential': 'Personnel credential',
  'publication-paper': 'Publication / technical paper',
  'third-party-assessment': 'Third-party audit / assessment'
};

export const partnerReviewStateLabels: Record<PartnerCapabilityReviewState, string> = {
  'self-declared': 'Self-declared',
  'evidence-submitted': 'Evidence submitted',
  'under-review': 'Under review',
  reviewed: 'Reviewed'
};

export const partnerReviewOutcomeLabels: Record<PartnerCapabilityReviewOutcome, string> = {
  supported: 'Supported',
  'partially-supported': 'Partially supported',
  insufficient: 'Insufficient evidence'
};
