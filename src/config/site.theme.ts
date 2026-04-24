import { defineSiteTheme } from '@/config/site.theme.defaults'

export const SITE_THEME = defineSiteTheme({
  shell: 'market',
  hero: {
    variant: 'catalog-promo',
    eyebrow: 'PDF + social profile platform',
  },
  home: {
    layout: 'market-catalog',
    primaryTask: 'pdf',
    featuredTaskKeys: ['pdf', 'profile', 'article'],
  },
  navigation: {
    variant: 'minimal',
  },
  footer: {
    variant: 'minimal',
  },
  cards: {
    listing: 'listing-elevated',
    article: 'editorial-feature',
    image: 'studio-panel',
    profile: 'social-note',
    classified: 'catalog-grid',
    pdf: 'pdf-sheet',
    sbm: 'editorial-feature',
    social: 'social-note',
    org: 'catalog-grid',
    comment: 'editorial-feature',
  },
})
