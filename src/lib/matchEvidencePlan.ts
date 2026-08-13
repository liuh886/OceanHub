import { evidenceSourceById, offshoreReferenceCases } from '../data/offshoreReferenceCases';
import type {
  EvidencePlanQuery,
  EvidenceRequirement,
  EvidenceSource,
  MatchedEvidenceCase
} from './decisionEvidence';

function hasAnyTag(caseTags: string[], requestedTags: string[]) {
  return requestedTags.some((tag) => caseTags.includes(tag));
}

export function matchEvidenceCases(query: EvidencePlanQuery): MatchedEvidenceCase[] {
  return offshoreReferenceCases
    .filter((referenceCase) => referenceCase.projectArchetype === query.projectArchetype)
    .filter((referenceCase) => !query.lifecycleStage || referenceCase.lifecycleStages.includes(query.lifecycleStage))
    .filter((referenceCase) => !query.tags?.length || hasAnyTag(referenceCase.tags, query.tags))
    .map((referenceCase) => ({
      case: referenceCase,
      matchingEvidence: referenceCase.evidence
    }));
}

export function resolveEvidenceSources(requirement: EvidenceRequirement): EvidenceSource[] {
  return requirement.sourceIds
    .map((sourceId) => evidenceSourceById.get(sourceId))
    .filter((source): source is EvidenceSource => Boolean(source));
}

export function getEvidencePlan(query: EvidencePlanQuery) {
  return matchEvidenceCases(query).flatMap(({ case: referenceCase, matchingEvidence }) =>
    matchingEvidence.map((requirement) => ({
      caseId: referenceCase.id,
      caseTitle: referenceCase.title,
      decision: referenceCase.decision,
      outcome: referenceCase.outcome,
      projectContext: referenceCase.projectContext,
      requirement,
      sources: resolveEvidenceSources(requirement)
    }))
  );
}
