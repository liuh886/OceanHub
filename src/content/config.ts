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

const caseStudies = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    client: z.string(),
    industry: z.string(),
    challenge: z.string(),
    result: z.string(),
    solution: z.string(), // Link to solution slug
    featured: z.boolean().default(false),
    publishDate: z.date().default(() => new Date()),
  }),
});

const insights = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    publishDate: z.date().default(() => new Date()),
    author: z.string().default('NBW Team'),
  }),
});

export const collections = {
  'focus-areas': focusAreas,
  'case-studies': caseStudies,
  insights,
};
