// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'Khazanah Kitab',
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
      sidebar: [
        {
          label: 'Guides',
          items: [],
        },
        {
          label: 'Reference',
          items: [{ autogenerate: { directory: 'reference' } }],
        },
      ],
      defaultLocale: 'th',
      locales: {
        th: {
          label: 'ไทย',
          lang: 'th',
        },
        ms: {
          label: 'Melayu (Rumi)',
          lang: 'ms',
        },
        'ms-arab': {
          label: 'ملايو (جاوي)',
          lang: 'ms-Arab',
          dir: 'rtl',
        },
      },
    }),
  ],
  site: 'https://example.com',
});