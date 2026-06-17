import { defineCollection, z } from 'astro:content';

const digests = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    questId: z.string(),
    tags: z.array(z.string()),
    severity: z.enum(['critical', 'high', 'medium', 'low', 'uncertain']),
    authors: z.array(z.string()),
    heroImage: z.string().optional(),
    canonicalUrl: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { digests };