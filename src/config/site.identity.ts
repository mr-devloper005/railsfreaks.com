export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || 'fgm44o8zll',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Railsfreaks',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'PDF + Social Profile platform',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'A multi-task publishing platform combining pdf, profile experiences in one connected site.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'railsfreaks.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://railsfreaks.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || 'AIzaSyBco7dIECu3rJWjP3J0MImnR_uxlbeqAe0',

} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const

