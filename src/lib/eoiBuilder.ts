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
  mandatoryCapabilityIds?: string[];
  desirableCapabilityIds?: string[];
  includeHseClause?: boolean;
  includeClassificationClause?: boolean;
  classificationSocieties?: string[];
  includeLocalContentClause?: boolean;
  localContentPercentage?: number;
  submissionDeadline?: string;
  clarificationDeadline?: string;
  contractModel?: ContractModel;
}

export interface StructuredEoiCapability {
  id: string;
  label: string;
  family: string;
  tier: 'mandatory' | 'desirable';
  operationalEnvelopeSummary?: string;
  evidenceGuidance?: string;
}

export interface StructuredEoiReference {
  code: string;
  title: string;
  issuer: string;
  status: string;
  keyClauses?: string[];
  complianceChecklist?: string[];
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
  },
  options: ProcurementClauseOptions = {}
): StructuredEoiDocument {
  const context = contextInfo.projectContext?.trim() || '[Project / Region context not specified]';
  const stageLabel = contextInfo.stageLabel?.trim() || '[Stage not specified]';
  const focusLabel = contextInfo.focusLabel?.trim() || '[Focus not specified]';
  const archetype = contextInfo.archetype?.trim() || 'Offshore CO2 geological storage';

  const decisions = uniqueStrings(plan.map((item) => item.decision));
  const workstreams = uniqueStrings(plan.map((item) => item.requirement.evidenceNeeded));
  const deliverables = uniqueStrings(plan.flatMap((item) => item.requirement.deliverables));

  const allCapabilities = [...new Map(plan.flatMap((item) => item.capabilities).map((cap) => [cap.id, cap])).values()];
  const mandatorySet = new Set(options.mandatoryCapabilityIds ?? allCapabilities.map((c) => c.id));

  const structuredCapabilities: StructuredEoiCapability[] = allCapabilities.map((cap) => {
    const isMandatory = mandatorySet.has(cap.id);
    const envParts: string[] = [];
    if (cap.operationalEnvelope?.waterDepthTiers?.length) {
      envParts.push(`Water depths: ${cap.operationalEnvelope.waterDepthTiers.join(', ')}`);
    }
    if (cap.operationalEnvelope?.coreAssets?.length) {
      envParts.push(`Key assets: ${cap.operationalEnvelope.coreAssets.slice(0, 2).join(', ')}`);
    }
    return {
      id: cap.id,
      label: cap.label,
      family: cap.family,
      tier: isMandatory ? 'mandatory' : 'desirable',
      operationalEnvelopeSummary: envParts.length ? envParts.join(' · ') : undefined,
      evidenceGuidance: cap.evidenceTriadGuidance?.referenceProjectExample
    };
  });

  const referencesMap = new Map<string, StructuredEoiReference>();
  for (const item of plan) {
    for (const ref of item.references) {
      if (!referencesMap.has(ref.code)) {
        referencesMap.set(ref.code, {
          code: ref.code,
          title: ref.title,
          issuer: ref.issuer,
          status: ref.status,
          keyClauses: ref.keyClauses,
          complianceChecklist: ref.complianceChecklist
        });
      }
    }
  }

  const procurementClauses: StructuredEoiClause[] = [];

  // HSE & Quality Clause
  if (options.includeHseClause ?? true) {
    procurementClauses.push({
      title: 'HSE & Operational Safety Standards',
      requirements: [
        'Documented zero-fatality and lost time injury (LTI) safety track record over past 3 years.',
        'Certified ISO 45001 (Occupational Health & Safety) and ISO 14001 (Environmental Management) systems or recognized equivalent offshore standards.',
        'Site-specific offshore emergency response, marine environmental protection and containment contingency plan.'
      ]
    });
  }

  // Marine Classification & Quality Assurance
  if (options.includeClassificationClause ?? true) {
    const societies = options.classificationSocieties?.length ? options.classificationSocieties.join(' / ') : 'DNV / ABS / Lloyd’s Register / CCS';
    procurementClauses.push({
      title: 'Classification & Technical Verification',
      requirements: [
        `Marine spreads, geotechnical/geophysical vessels and major assets must hold valid class certification from recognized IACS societies (${societies}).`,
        'Laboratory test facilities and analytical equipment must maintain ISO/IEC 17025 accreditation or documented third-party qualification dossiers.'
      ]
    });
  }

  // Local Content & Delivery Footprint
  if (options.includeLocalContentClause && options.localContentPercentage) {
    procurementClauses.push({
      title: 'Local Content & Mobilization Footprint',
      requirements: [
        `Target minimum local content commitment: ${options.localContentPercentage}% across offshore personnel, logistics base and subcontracted regional services.`,
        'Clear mobilization plan detailing base ports, transit days, and contingency logistics for regional weather windows.'
      ]
    });
  }

  // Timelines & Sourcing Mechanism
  const timelineReqs: string[] = [];
  if (options.clarificationDeadline) {
    timelineReqs.push(`Technical clarification request deadline: ${options.clarificationDeadline}`);
  }
  if (options.submissionDeadline) {
    timelineReqs.push(`EOI submission closing deadline: ${options.submissionDeadline}`);
  }
  if (options.contractModel) {
    const modelLabels: Record<ContractModel, string> = {
      'lump-sum': 'Firm Lump-Sum Deliverable Basis',
      'time-and-materials': 'Time & Materials with Target Price Cap',
      'epci': 'Integrated EPCI Turnkey Basis',
      'feed-call-off': 'Pre-FEED / FEED Engineering Call-off Framework'
    };
    timelineReqs.push(`Anticipated downstream contracting model: ${modelLabels[options.contractModel]}`);
  }
  if (timelineReqs.length) {
    procurementClauses.push({
      title: 'Procurement Schedule & Contracting Basis',
      requirements: timelineReqs
    });
  }

  const supplierResponseGuidelines = [
    'Confirm which required canonical capabilities your organization can directly deliver versus subcontract.',
    'State operating region, likely delivery location / mobilization base, and key marine subcontracting interfaces.',
    'Provide verifiable reference projects (client, water depth, year, scope), asset specifications or deliverable datasets for each claimed capability.',
    'Complete the Engineering Standard Compliance matrix, explicitly noting any proposed deviations or clarifications.',
    'Submit structured responses via the OceanHub digital intake link to ensure inclusion in the sourcing comparison matrix.'
  ];

  return {
    title: 'OceanHub — Technical Sourcing Expression of Interest (EOI)',
    projectContext: context,
    archetype,
    stageLabel,
    focusLabel,
    decisionScope: decisions,
    workstreams,
    capabilities: structuredCapabilities,
    deliverables,
    engineeringReferences: [...referencesMap.values()],
    procurementClauses,
    supplierResponseGuidelines,
    exportMetadata: {
      generatedAt: new Date().toISOString().split('T')[0],
      version: 'OceanHub EOI Engine v2.0'
    }
  };
}

export function formatEoiAsMarkdown(doc: StructuredEoiDocument): string {
  const lines: string[] = [];

  lines.push(`# ${doc.title}`);
  lines.push('');
  lines.push(`**Project / Region:** ${doc.projectContext}`);
  lines.push(`**Project Archetype:** ${doc.archetype}`);
  lines.push(`**Lifecycle Stage:** ${doc.stageLabel}`);
  lines.push(`**Decision Focus:** ${doc.focusLabel}`);
  lines.push(`**Date Generated:** ${doc.exportMetadata.generatedAt} · *${doc.exportMetadata.version}*`);
  lines.push('');
  lines.push('---');
  lines.push('');

  // 1. Decision Scope
  lines.push('## 1. Technical Decision Scope & Uncertainties');
  for (const decision of doc.decisionScope) {
    lines.push(`- **Target Decision:** ${decision}`);
  }
  lines.push('');

  // 2. Evidence Workstreams
  lines.push('## 2. Required Evidence Workstreams');
  for (const ws of doc.workstreams) {
    lines.push(`- ${ws}`);
  }
  lines.push('');

  // 3. Canonical Capabilities
  lines.push('## 3. Canonical Technical Capability Requirements');
  const mandatoryCaps = doc.capabilities.filter((c) => c.tier === 'mandatory');
  const desirableCaps = doc.capabilities.filter((c) => c.tier === 'desirable');

  if (mandatoryCaps.length) {
    lines.push('### Mandatory Capabilities (Gate Requirements)');
    for (const cap of mandatoryCaps) {
      let capLine = `- **\`${cap.id}\` — ${cap.label}**`;
      if (cap.operationalEnvelopeSummary) {
        capLine += `\n  - *Operational Envelope:* ${cap.operationalEnvelopeSummary}`;
      }
      lines.push(capLine);
    }
    lines.push('');
  }

  if (desirableCaps.length) {
    lines.push('### Desirable / Value-Add Capabilities');
    for (const cap of desirableCaps) {
      lines.push(`- \`${cap.id}\` — ${cap.label}`);
    }
    lines.push('');
  }

  // 4. Expected Deliverables
  lines.push('## 4. Expected Technical Deliverables');
  for (const del of doc.deliverables) {
    lines.push(`- ${del}`);
  }
  lines.push('');

  // 5. Engineering Standards & Compliance Checklist
  lines.push('## 5. Applicable Engineering Standards & Compliance Matrix');
  for (const ref of doc.engineeringReferences) {
    lines.push(`### ${ref.code} — ${ref.title} (${ref.issuer}, ${ref.status})`);
    if (ref.keyClauses?.length) {
      lines.push('**Key Requirement Clauses:**');
      for (const clause of ref.keyClauses) {
        lines.push(`- ${clause}`);
      }
    }
    if (ref.complianceChecklist?.length) {
      lines.push('**Supplier Compliance Checklist:**');
      for (const check of ref.complianceChecklist) {
        lines.push(`- [ ] ${check}`);
      }
    }
    lines.push('');
  }

  // 6. Procurement & Commercial Gates
  if (doc.procurementClauses.length) {
    lines.push('## 6. Procurement, HSE & Quality Gates');
    for (const clause of doc.procurementClauses) {
      lines.push(`### ${clause.title}`);
      for (const req of clause.requirements) {
        lines.push(`- ${req}`);
      }
      lines.push('');
    }
  }

  // 7. Supplier Response Guidelines
  lines.push('## 7. Supplier Submission Guidelines');
  for (const guide of doc.supplierResponseGuidelines) {
    lines.push(`- ${guide}`);
  }
  lines.push('');
  lines.push('---');
  lines.push('*OceanHub Note: This EOI specification is programmatically derived from validated offshore engineering benchmarks and international standard codes.*');

  return lines.join('\n');
}
