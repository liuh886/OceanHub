import { access, readFile } from 'node:fs/promises';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');
const fail = (message) => { throw new Error(message); };

const [scoper, eoiBuilder, matrix, providers, references] = await Promise.all([
  read('src/components/DecisionScoper.astro'),
  read('src/lib/eoiBuilder.ts'),
  read('src/lib/capabilityMatrix.ts'),
  read('src/data/marketProviders.ts'),
  read('src/data/engineeringReferences.ts')
]);

if (scoper.includes('backwards-compatibility') || scoper.includes('data[`${stage.value}:${focus.value}`]')) {
  fail('Decision Scoper still contains a legacy stage:focus compatibility path.');
}
if (!scoper.includes('MAX_INLINE_COMBINATIONS = 50')) {
  fail('Decision Scoper must enforce the inline evidence payload boundary.');
}
if (eoiBuilder.includes('desirableCapabilityIds') || eoiBuilder.includes("tier: 'mandatory' | 'desirable'")) {
  fail('EOI still contains the superseded mandatory/desirable pseudo-tier model.');
}
if (matrix.includes('mandatoryCapabilitiesCount') || matrix.includes("tier: 'mandatory' | 'desirable'")) {
  fail('Capability matrix still contains the superseded tier model.');
}
if (!eoiBuilder.includes('verify against the official publication')) {
  fail('EOI standards output must explicitly direct project users to verify the official publication.');
}

const providerCount = (providers.match(/evidenceBasis:\s*'public-source-mapped'/g) ?? []).length;
const sourceBlockCount = (providers.match(/\bsources:\s*\[/g) ?? []).length;
if (providerCount === 0 || providerCount !== sourceBlockCount) {
  fail(`Every public-source-mapped provider must have an explicit source block (${providerCount} providers, ${sourceBlockCount} source blocks).`);
}

const enrichedReferenceCount = (references.match(/\bkeyClauses:\s*\[/g) ?? []).length;
const checklistCount = (references.match(/\bcomplianceChecklist:\s*\[/g) ?? []).length;
if (enrichedReferenceCount !== checklistCount) {
  fail(`Engineering reference applicability summaries and procurement checks must be paired (${enrichedReferenceCount} vs ${checklistCount}).`);
}

try {
  await access(new URL('../tasks/todo.md', import.meta.url));
  fail('Execution-only tasks/todo.md must not remain in the product repository.');
} catch (error) {
  if (error instanceof Error && !('code' in error && error.code === 'ENOENT')) throw error;
}

console.log(`OceanHub sourcing data contract passed: ${providerCount} sourced providers and ${enrichedReferenceCount} enriched engineering references.`);
