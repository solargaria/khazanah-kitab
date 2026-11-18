import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

const statusTags = ['original','human-translated','ai-translated','unreviewed','reviewed'] as const;
const langs = ['th','ms','ms-Arab','ar'] as const;

export const collections = {
  docs: defineCollection({ 
    loader: docsLoader(), 
    schema: docsSchema({
      extend: z.object({
        kind: z.enum(['category','book','chapter']).default('chapter'),
        lang: z.enum(langs).optional(),
        dir: z.enum(['ltr','rtl']).optional(),
        titleOriginal: z.string().optional(),
        titleAr: z.string().optional(),
        author: z.string().optional(),
        authorDeathHijri: z.number().int().optional(),
        originalLanguage: z.enum(langs).optional(),
        languages: z.array(z.enum(langs)).optional(),
        sourceEdition: z.string().optional(),
        scanUrl: z.string().url().optional(),
        translator: z.string().optional(),
        surah: z.number().int().min(1).max(114).optional(),
        ayahRange: z.string().optional(),
        scanPages: z.string().optional(),
        tags: z.array(z.enum(statusTags)).optional(),
      }),
    }),
  }),
};
