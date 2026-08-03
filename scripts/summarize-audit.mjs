import { readFile } from 'node:fs/promises';

const [fullPath, productionPath] = process.argv.slice(2);
if (!fullPath || !productionPath) {
  throw new Error('Usage: node scripts/summarize-audit.mjs <full-audit.json> <production-audit.json>');
}

async function readAudit(path) {
  const raw = await readFile(path, 'utf8');
  const parsed = JSON.parse(raw);
  if (parsed.auditReportVersion !== 2 || typeof parsed.vulnerabilities !== 'object') {
    throw new Error(`Unsupported npm audit report in ${path}`);
  }
  return parsed;
}

function totals(report) {
  const values = report.metadata?.vulnerabilities ?? {};
  return {
    low: values.low ?? 0,
    moderate: values.moderate ?? 0,
    high: values.high ?? 0,
    critical: values.critical ?? 0,
    total: values.total ?? 0
  };
}

function viaSummary(via) {
  if (!Array.isArray(via)) return '';
  return via.map((item) => {
    if (typeof item === 'string') return item;
    return item.title ?? item.name ?? `GHSA/source ${item.source ?? 'unknown'}`;
  }).join('; ');
}

function fixSummary(value) {
  if (value === false || value == null) return 'No fix listed';
  if (value === true) return 'Compatible fix available';
  if (typeof value === 'object') {
    const target = [value.name, value.version].filter(Boolean).join('@');
    return `${target || 'Upgrade available'}${value.isSemVerMajor ? ' (major)' : ''}`;
  }
  return String(value);
}

const full = await readAudit(fullPath);
const production = await readAudit(productionPath);
const fullTotals = totals(full);
const productionTotals = totals(production);
const productionNames = new Set(Object.keys(production.vulnerabilities));

const rows = Object.values(full.vulnerabilities)
  .map((item) => ({
    name: item.name,
    severity: item.severity,
    direct: Boolean(item.isDirect),
    production: productionNames.has(item.name),
    range: item.range ?? '',
    via: viaSummary(item.via),
    effects: Array.isArray(item.effects) ? item.effects.join(', ') : '',
    fix: fixSummary(item.fixAvailable)
  }))
  .sort((a, b) => {
    const rank = { critical: 4, high: 3, moderate: 2, low: 1, info: 0 };
    return (rank[b.severity] ?? 0) - (rank[a.severity] ?? 0) || a.name.localeCompare(b.name);
  });

console.log('# OceanHub npm dependency audit');
console.log('');
console.log(`- Full dependency graph: ${fullTotals.total} advisories (${fullTotals.critical} critical, ${fullTotals.high} high, ${fullTotals.moderate} moderate, ${fullTotals.low} low).`);
console.log(`- Production graph only: ${productionTotals.total} advisories (${productionTotals.critical} critical, ${productionTotals.high} high, ${productionTotals.moderate} moderate, ${productionTotals.low} low).`);
console.log(`- Direct vulnerable packages: ${rows.filter((row) => row.direct).length}.`);
console.log(`- Vulnerable packages reachable in production graph: ${rows.filter((row) => row.production).length}.`);
console.log('');
console.log('| Package | Severity | Direct | Production graph | Affected range | Fix | Advisory path | Effects |');
console.log('|---|---:|:---:|:---:|---|---|---|---|');
for (const row of rows) {
  const clean = (value) => String(value).replaceAll('|', '\\|').replaceAll('\n', ' ');
  console.log(`| ${clean(row.name)} | ${clean(row.severity)} | ${row.direct ? 'yes' : 'no'} | ${row.production ? 'yes' : 'no'} | ${clean(row.range)} | ${clean(row.fix)} | ${clean(row.via)} | ${clean(row.effects)} |`);
}

console.log('');
console.log('AUDIT_CLASSIFICATION_JSON=' + JSON.stringify({
  full: fullTotals,
  production: productionTotals,
  rows
}));
