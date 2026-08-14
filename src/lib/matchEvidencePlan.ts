import { resolveCapabilities } from '../data/capabilities';
import { resolveEngineeringReferences } from '../data/engineeringReferences';
import { evidenceSourceById, referenceCases } from '../data/referenceCases';
import type { EvidencePlanQuery, EvidenceRequirement, EvidenceSource, MatchedEvidenceCase } from './decisionEvidence';

function hasAnyTag(tags: string[] | undefined, requestedTags: string[]) {
  return Boolean(tags?.some((tag) => requestedTags.includes(tag)));
}

export function matchEvidenceCases(query: EvidencePlanQuery): MatchedEvidenceCase[] {
  return referenceCases
    .filter((referenceCase) => referenceCase.projectArchetype === query.projectArchetype)
    .filter((referenceCase) => !query.lifecycleStage || referenceCase.lifecycleStages.includes(query.lifecycleStage))
    .map((referenceCase) => ({
      case: referenceCase,
      matchingEvidence: query.tags?.length
        ? referenceCase.evidence.filter((requirement) => hasAnyTag(requirement.tags, query.tags!))
        : referenceCase.evidence
    }))
    .filter(({ matchingEvidence }) => matchingEvidence.length > 0);
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
      capabilities: resolveCapabilities(requirement.capabilityIds),
      references: resolveEngineeringReferences(requirement.referenceIds),
      sources: resolveEvidenceSources(requirement)
    }))
  );
}
