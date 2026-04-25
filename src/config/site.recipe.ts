import type { SiteRecipe } from '@/design/factory/recipe-types'

export const SITE_RECIPE: SiteRecipe = {
  productFamily: 'curation',
  themePack: 'curation-warm',
  homepageTemplate: 'image-profile-home',
  navbarTemplate: 'utility-bar',
  footerTemplate: 'minimal-footer',
  motionPack: 'utility-snappy',
  primaryTask: 'profile',
  enabledTasks: ['profile'],
  taskTemplates: { profile: 'profile-creator', image: 'image-portfolio' },
  manualOverrides: {
    navbar: false,
    footer: false,
    homePage: false,
    taskListPage: false,
    taskDetailPage: false,
    taskCard: false,
    contactPage: false,
    loginPage: false,
    registerPage: false,
  },
}
