import type { Capability } from './capability';
import type { EngineeringReference } from './engineeringReference';

export interface Requirement {
  id: string;
  evidenceNeeded: string;
  deliverables: string[];
}

export interface PlanItem {
  decision: string;
  requirement: Requirement;
  capabilities: Capability[];
  references: EngineeringReference[];
}

export type ContractModel = 'lump-sum' | 'time-and-materials' | 'epci' | 'feed-call-off';

export interface ProcurementClauseOptions {
  includeHseClause?: boolean;
  includeClassificationClause?: boolean;
  classificationSocieties?: string[];
  contractModel?: ContractModel;
}

export interface StructuredEoiCapability {
  id: string;
  label: string;
  family: string;
  operationalEnvelopeSummary?: string;
  evidenceGuidance?: string;
}

export interface StructuredEoiReference {
  code: string;
  title: string;
  issuer: string;
  status: string;
  officialUrl: string;
  applicabilitySummary?: string[];
  procurementChecks?: string[];
}

export interface StructuredEoiClause {
  title: string;
  requirements: string[];
}

export interface StructuredEoiDocument {
  title: string;
  projectContext: string;
  archetype: string;
  stageLabel: string;
  focusLabel: string;
  waterDepthTier?: string;
  deliveryRegion?: string;
  decisionScope: string[];
  workstreams: string[];
  capabilities: StructuredEoiCapability[];
  deliverables: string[];
  engineeringReferences: StructuredEoiReference[];
  procurementClauses: StructuredEoiClause[];
  supplierResponseGuidelines: string[];
  exportMetadata: {
    generatedAt: string;
    version: string;
  };
}

function uniqueStrings(items: string[]): string[] {
  return [...new Set(items.filter(Boolean))];
}

export function buildStructuredEoi(
  plan: PlanItem[],
  contextInfo: {
    projectContext?: string;
    stageLabel?: string;
    focusLabel?: string;
    archetype?: string;
    waterDepthTier?: string;
    deliveryRegion?: string;
  },
  options: ProcurementClauseOptions = {}
): StructuredEoiDocument {
  const decisions = uniqueStrings(plan.map((item) => item.decision));
  const workstreams = uniqueStrings(plan.map((item) => item.requirement.evidenceNeeded));
  const deliverables = uniqueStrings(plan.flatMap((item) => item.requirement.deliverables));
  const allCapabilities = [...new Map(plan.flatMap((item) => item.capabilities).map((capability) => [capability.id, capability])).values()];

  const capabilities = allCapabilities.map((capability): StructuredEoiCapability => {
    const envelope: string[] = [];
    if (capability.operationalEnvelope?.waterDepthTiers?.length) envelope.push(`Water-depth envelope: ${capability.operationalEnvelope.waterDepthTiers.join(', ')}`);
    if (capability.operationalEnvelope?.deliveryRegions?.length) envelope.push(`Delivery regions: ${capability.operationalEnvelope.deliveryRegions.join(', ')}`);
    if (capability.operationalEnvelope?.coreAssets?.length) envelope.push(`Representative assets: ${capability.operationalEnvelope.coreAssets.slice(0, 2).join(', ')}`);
    return {
      id: capability.id,
      label: capability.label,
      family: capability.family,
      operationalEnvelopeSummary: envelope.length ? envelope.join(' · ') : undefined,
      evidenceGuidance: capability.evidenceTriadGuidance?.referenceProjectExample
    };
  });

  const referenceMap = new Map<string, StructuredEoiReference>();
  for (const item of plan) {
    for (const reference of item.references) {
      if (referenceMap.has(reference.code)) continue;
      referenceMap.set(reference.code, {
        code: reference.code,
        title: reference.title,
        issuer: reference.issuer,
        status: reference.status,
        officialUrl: reference.officialUrl,
        applicabilitySummary: reference.keyClauses,
        procurementChecks: reference.complianceChecklist
      });
    }
  }

  const procurementClauses: StructuredEoiClause[] = [];
  if (options.includeHseClause ?? true) {
    procurementClauses.push({
      title: 'HSE & operational safety',
      requirements: [
        'Provide the project-relevant safety performance record requested by the buyer and identify material incidents or exclusions.',
        'Provide current ISO 45001 / ISO 14001 certification or the buyer-approved equivalent where these systems are required.',
        'Provide the project-specific offshore emergency-response and marine-environment controls relevant to the proposed scope.'
      ]
    });
  }

  if (options.includeClassificationClause ?? true) {
    const societies = options.classificationSocieties?.length ? options.classificationSocieties.join(' / ') : 'DNV / ABS / Lloyd’s Register / CCS';
    procurementClauses.push({
      title: 'Classification & technical verification',
      requirements: [
        `Where class is applicable, identify the current class status and certifying society for proposed marine spreads (${societies}).`,
        'Identify third-party accreditation or qualification applicable to material laboratories, measurement systems and specialist facilities.'
      ]
    });
  }

  if (options.contractModel) {
    const labels: Record<ContractModel, string> = {
      'lump-sum': 'Firm lump-sum deliverable basis',
      'time-and-materials': 'Time & materials with target cap',
      'epci': 'Integrated EPCI turnkey basis',
      'feed-call-off': 'Pre-FEED / FEED engineering call-off framework'
    };
    procurementClauses.push({
      title: 'Anticipated contracting basis',
      requirements: [`Current sourcing assumption: ${labels[options.contractModel]}. Supplier deviations and key commercial assumptions should be stated explicitly.`]
    });
  }

  return {
    title: 'OceanHub — Technical Sourcing Expression of Interest (EOI)',
    projectContext: contextInfo.projectContext?.trim() || '[Project / region not specified]',
    archetype: contextInfo.archetype?.trim() || '[Project archetype not specified]',
    stageLabel: contextInfo.stageLabel?.trim() || '[Stage not specified]',
    focusLabel: contextInfo.focusLabel?.trim() || '[Focus not specified]',
    waterDepthTier: contextInfo.waterDepthTier?.trim() || undefined,
    deliveryRegion: contextInfo.deliveryRegion?.trim() || undefined,
    decisionScope: decisions,
    workstreams,
    capabilities,
    deliverables,
    engineeringReferences: [...referenceMap.values()],
    procurementClauses,
    supplierResponseGuidelines: [
      'Respond to every required canonical capability and distinguish direct delivery from material subcontracting.',
      'Provide capability-specific evidence: reference project, relevant asset or facility, and representative delivered output where available.',
      'State the operating region / mobilization basis and any project constraint that falls outside the proposed delivery envelope.',
      'Review the cited official engineering references and identify project-specific deviations or clarification requests.',
      'Submit the structured response through the OceanHub evidence intake so review state remains auditable.'
    ],
    exportMetadata: {
      generatedAt: new Date().toISOString().split('T')[0],
      version: 'OceanHub EOI Engine v2.1'
    }
  };
}

export function formatEoiAsMarkdown(doc: StructuredEoiDocument): string {
  const lines: string[] = [
    `# ${doc.title}`,
    '',
    `**Project / Region:** ${doc.projectContext}`,
    `**Project Archetype:** ${doc.archetype}`,
    `**Lifecycle Stage:** ${doc.stageLabel}`,
    `**Decision Focus:** ${doc.focusLabel}`
  ];

  if (doc.waterDepthTier) lines.push(`**Water-depth tier:** ${doc.waterDepthTier}`);
  if (doc.deliveryRegion) lines.push(`**Delivery region:** ${doc.deliveryRegion}`);
  lines.push(`**Date Generated:** ${doc.exportMetadata.generatedAt} · *${doc.exportMetadata.version}*`, '', '---', '');

  lines.push('## 1. Technical Decision Scope');
  doc.decisionScope.forEach((decision) => lines.push(`- ${decision}`));
  lines.push('', '## 2. Required Evidence Workstreams');
  doc.workstreams.forEach((workstream) => lines.push(`- ${workstream}`));

  lines.push('', '## 3. Required Canonical Capabilities');
  for (const capability of doc.capabilities) {
    lines.push(`- ${capability.id} — ${capability.label}`);
    if (capability.operationalEnvelopeSummary) lines.push(`  - Operational envelope: ${capability.operationalEnvelopeSummary}`);
  }

  lines.push('', '## 4. Expected Technical Deliverables');
  doc.deliverables.forEach((deliverable) => lines.push(`- ${deliverable}`));

  lines.push('', '## 5. Applicable Engineering References');
  for (const reference of doc.engineeringReferences) {
    lines.push(`### ${reference.code} — ${reference.title}`);
    lines.push(`Official source: ${reference.officialUrl}`);
    if (reference.applicabilitySummary?.length) {
      lines.push('**OceanHub applicability summary — verify against the official publication for project use:**');
      reference.applicabilitySummary.forEach((item) => lines.push(`- ${item}`));
    }
    if (reference.procurementChecks?.length) {
      lines.push('**Project procurement checks derived from the reference scope:**');
      reference.procurementChecks.forEach((item) => lines.push(`- [ ] ${item}`));
    }
    lines.push('');
  }

  if (doc.procurementClauses.length) {
    lines.push('## 6. Procurement, HSE & Quality Gates');
    for (const clause of doc.procurementClauses) {
      lines.push(`### ${clause.title}`);
      clause.requirements.forEach((requirement) => lines.push(`- ${requirement}`));
      lines.push('');
    }
  }

  lines.push('## 7. Supplier Submission Guidelines');
  doc.supplierResponseGuidelines.forEach((guide) => lines.push(`- ${guide}`));
  lines.push('', '---', '*OceanHub assembles this EOI from traceable case evidence, canonical capability definitions and official reference metadata. Project-specific engineering and procurement review remain required.*');
  return lines.join('\n');
}
