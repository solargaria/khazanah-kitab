// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { unified } from '@astrojs/markdown-remark';
import rehypeArabic from './src/plugins/rehype-arabic.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  markdown: {
    processor: unified({ rehypePlugins: [rehypeArabic] }),
  },
  integrations: [
    starlight({
      title: 'Khazanah Kitab',
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/solargaria/khazanah-kitab' },
      ],
      customCss: ['./src/styles/custom.css'],
      components: {
        Sidebar: './src/components/Sidebar.astro',
        Pagination: './src/components/Pagination.astro',
      },
      defaultLocale: 'root',
      locales: {
        root: { label: 'ไทย', lang: 'th' },
      },
    }),
  ],
});