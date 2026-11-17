import { defineUserContent } from '@astrojs/collapse';
import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';

/** @type {import('@astrojs/starlight').StarlightOptions} */
const starlightConfig = {
  title: 'Khazanah Kitab (خزانة الكتاب)',
  sidebar: [],
  autodata: true,
  defaultRoute: 'index',
};

export default defineConfig({
  site: 'https://khazanah-kitab.com',
  log: {
    default: 'info',
  },
  integrations: [
    starlight({ ...starlightConfig }),
  ],
  markdown: {
    extensions: [],
  },
  // Configuration for Multi-language support
  // We use a prefix-based system for standard i18n
  routes: {
    defaultRenderer: 'astro',
  },
  // Simple i18n setup for 4 languages
  // The content will be organized in /src/content/docs/[lang]/...
  locales: {
    th: {
      prefix: '/th',
    },
    ms: {
      prefix: '/ms',
    },
    'ms-Arab': {
      prefix: '/ms-Arab',
    },
    ar: {
      prefix: '/ar',
    },
  },
});
