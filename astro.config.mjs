// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'Khazanah Kitab',
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
      defaultLocale: 'root',
      locales: { root: { label: 'ไทย', lang: 'th' } },
    }),
  ],
  site: 'https://example.com',
});
