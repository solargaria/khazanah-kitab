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
    label: 'ตัฟซีร',
    translations: { ms: 'Tafsir', 'ms-Arab': 'تفسير' },
    autogenerate: { directory: 'tafsir' },
  },
  {
    label: 'อะกีดะฮ์',
    translations: { ms: 'Akidah', 'ms-Arab': 'عقيدة' },
    autogenerate: { directory: 'aqidah' },
  },
  {
    label: 'ฟิกฮ์',
    translations: { ms: 'Fiqh', 'ms-Arab': 'فقه' },
    autogenerate: { directory: 'fiqh' },
  },
  {
    label: 'ประวัติศาสตร์',
    translations: { ms: 'Tarikh', 'ms-Arab': 'تاريخ' },
    autogenerate: { directory: 'tarikh' },
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