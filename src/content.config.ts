import { defineCollection } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { z } from 'zod';

export const collections = {
  docs: defineCollection({ 
    loader: docsLoader(), 
    schema: docsSchema({
      extend: z.object({
        category: z.enum(["tafsir", "aqidah", "fiqh", "tarikh"]),
        titleAr: z.string().optional(),
        author: z.string().optional(),
        originalTitle: z.string().optional(),
        source: z.string().optional(),
        scanUrl: z.string().url().optional(),
      }),
    }),
  }),
};
