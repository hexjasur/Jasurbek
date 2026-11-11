/**
 * Global Site Configuration
 */
export const SITE_CONFIG = {
  // Sayt sarlavhalari va footerda ko'rinadigan domen nomi
  domain: 'jasurdev.uz',

  // To'liq sayt URL manzili
  siteUrl: 'https://jasurdev.uz',

  // Muallif va sayt ma'lumotlari
  title: 'Jasurbek Haydarov',
  author: 'Jasurbek Haydarov',
  description: 'Jasurbek Haydarov — Software Engineer, Personal Portfolio & Tech Blog',

  // SEO
  language: 'en',
  locale: 'en_US',
  jobTitle: 'Software Engineer',
  themeColor: '#d8cfc0',
  keywords: ['Jasurbek Haydarov', 'software engineer', 'web developer', 'TypeScript', 'React', 'Astro', 'portfolio', 'tech blog'],
  // Default social preview image (generated at build time, see src/pages/og/)
  defaultOgImage: 'og/default.png',

  // Ijtimoiy tarmoqlar
  github: 'https://github.com/hexjasur',
  telegram: 'https://t.me/jasurhaydarovcode',
  email: 'jasurhaydarovcode@gmail.com',
  formspreeFormId: 'mzzpozok',
  turnstileSiteKey: '0x4AAAAAAFwsHifRv5JhQIOd',

  // Giscus comments (GitHub Discussions). Comments stay hidden until `categoryId` is filled in.
  // Setup: 1) enable Discussions in the repo settings, 2) install https://github.com/apps/giscus,
  // 3) open https://giscus.app, pick the repo + category, then paste the generated category id below.
  comments: {
    repo: 'hexjasur/Jasurbek',
    repoId: 'R_kgDOVe23Jw',
    category: 'Announcements',
    categoryId: '',
  },
};
