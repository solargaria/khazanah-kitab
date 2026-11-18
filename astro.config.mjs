// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import rehypeArabic from './src/plugins/rehype-arabic.mjs';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'Khazanah Kitab',
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/solargaria/khazanah-kitab' }],
      customCss: ['./src/styles/custom.css'],
      defaultLocale: 'root',
      locales: { root: { label: 'ไทย', lang: 'th' } },
    }),
  ],
  site: 'https://example.com',
  markdown: { rehypePlugins: [rehypeArabic] },
});
