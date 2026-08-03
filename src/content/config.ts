import { defineCollection, z } from 'astro:content';

const focusAreas = defineCollection({
  type: 'content',
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
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    publishDate: z.date().default(() => new Date()),
    author: z.string().default('OceanHub Team'),
  }),
});

export const collections = {
  'focus-areas': focusAreas,
  insights,
};
