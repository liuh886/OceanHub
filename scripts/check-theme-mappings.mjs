import { readdir, readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootPath = fileURLToPath(new URL('../', import.meta.url));
const sourceRootPath = fileURLToPath(new URL('../src/', import.meta.url));
const theme = await readFile(fileURLToPath(new URL('../src/styles/theme.css', import.meta.url)), 'utf8');

if (theme.includes("[class*='")) {
  throw new Error('Light-theme utility mapping must use exact class-token selectors, not substring selectors.');
}

const surfacePatterns = [
  /^bg-slate-(?:900|950)\//,
  /^bg-(?:cyan|emerald|blue|amber)-950\//,
  /^bg-\[#0/i,
];
const tokens = new Set();

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await walk(path);
    else if (['.astro', '.ts', '.tsx'].includes(extname(entry.name))) {
      const text = await readFile(path, 'utf8');
      for (const match of text.matchAll(/(?:class|className)\s*=\s*["'`]([^"'`]+)["'`]/g)) {
        for (const token of match[1].split(/\s+/).filter(Boolean)) {
          if (surfacePatterns.some((pattern) => pattern.test(token))) tokens.add(token);
        }
      }
    }
  }
}

await walk(sourceRootPath);
const missing = [...tokens].filter((token) => !theme.includes(`[class~='${token}']`)).sort();
if (missing.length) {
  throw new Error(`Dark surface utilities missing exact light-theme mappings:\n${missing.join('\n')}`);
}

console.log(`Light-theme mapping contract passed for ${tokens.size} dark surface utility tokens under ${rootPath}.`);
