import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const focusAreas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/focus-areas' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string().optional(),
    painPoints: z.array(z.string()).default([]),
    benefits: z.array(z.string()).default([]),
    order: z.number().default(0),
    featured: z.boolean().default(false),
  }),
});

const insights = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/insights' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    publishDate: z.coerce.date().default(() => new Date()),
    author: z.string().default('OceanHub Team'),
  }),
});

export const collections = {
  'focus-areas': focusAreas,
  insights,
};
