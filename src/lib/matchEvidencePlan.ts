import { resolveEngineeringReferences } from '../data/engineeringReferences';
import { evidenceSourceById, referenceCases } from '../data/referenceCases';
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
  return referenceCases
    .filter((referenceCase) => referenceCase.projectArchetype === query.projectArchetype)
    .filter((referenceCase) => !query.lifecycleStage || referenceCase.lifecycleStages.includes(query.lifecycleStage))
    .filter((referenceCase) => !query.tags?.length || hasAnyTag(referenceCase.tags, query.tags))
    .map((referenceCase) => ({
      case: referenceCase,
      matchingEvidence: referenceCase.evidence
    }));
}

export function resolveEvidenceSources(requirement: EvidenceRequirement): EvidenceSource[] {
  return requirement.sourceIds.map((sourceId) => {
    const source = evidenceSourceById.get(sourceId);
    if (!source) throw new Error(`Unknown evidence source ID: ${sourceId}`);
    return source;
  });
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
      references: resolveEngineeringReferences(requirement.referenceIds),
      sources: resolveEvidenceSources(requirement)
    }))
  );
}
