import { readFile, writeFile } from 'node:fs/promises';

const pageFiles = [
  'src/pages/index.astro',
  'src/pages/briefcase.astro',
  'src/pages/focus-areas/index.astro',
  'src/pages/focus-areas/[...slug].astro',
  'src/pages/insights/index.astro',
  'src/pages/insights/[...slug].astro'
];

for (const path of pageFiles) {
  let source = await readFile(path, 'utf8');
  source = source
    .replaceAll('area.slug', 'area.id')
    .replaceAll('insight.slug', 'insight.id')
    .replaceAll('entry.slug', 'entry.id');

  if (path.includes('[...slug].astro')) {
    source = source
      .replace(
        "import { getCollection } from 'astro:content';",
        "import { getCollection, render } from 'astro:content';"
      )
      .replace(
        'const { Content } = await entry.render();',
        'const { Content } = await render(entry);'
      );
  }

  await writeFile(path, source);
}

console.log('Migrated OceanHub page queries to the Astro Content Layer API.');
