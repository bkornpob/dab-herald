import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const digests = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/digests' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    questId: z.string(),
    tags: z.array(z.string()),
    severity: z.enum(['critical', 'high', 'medium', 'low']),
    authors: z.array(z.string()),
    heroImage: z.string().optional(),
    canonicalUrl: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const newsletter = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/newsletter' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    issueNumber: z.number(),
    authors: z.array(z.string()),
    tags: z.array(z.string()),
    draft: z.boolean().default(false),
  }),
});

export const collections = { digests, newsletter };