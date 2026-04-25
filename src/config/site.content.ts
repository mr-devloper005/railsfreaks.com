import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'Premium PDF and profile workspace',
  },
  footer: {
    tagline: 'Documents, profiles, and trusted publishing',
  },
  hero: {
    badge: 'Document command center',
    title: ['Publish polished PDFs,', 'amplify them with social profiles.'],
    description:
      'Turn every PDF into a discoverable asset with profile-led distribution, clearer credibility cues, and faster sharing workflows.',
    primaryCta: {
      label: 'Open PDF library',
      href: '/pdf',
    },
    secondaryCta: {
      label: 'Explore profiles',
      href: '/profile',
    },
    searchPlaceholder: 'Search PDFs, creators, and updates',
    focusLabel: 'Focus',
    featureCardBadge: 'featured release',
    featureCardTitle: 'Lead documents and profile voices shape the homepage rhythm.',
    featureCardDescription:
      'Primary surfaces now prioritize PDF publishing and social profile distribution without touching platform logic.',
  },
  home: {
    metadata: {
      title: 'Premium PDF publishing with social profiles',
      description:
        'Publish and discover PDFs through a premium, profile-first experience designed for clarity and trust.',
      openGraphTitle: 'Premium PDF publishing with social profiles',
      openGraphDescription:
        'A premium PDF and social profile platform built for discoverability, credibility, and conversion.',
      keywords: ['pdf platform', 'social profiles', 'document publishing', 'creator profiles'],
    },
    introBadge: 'About the platform',
    introTitle: 'Built to make PDFs discoverable through profile credibility.',
    introParagraphs: [
      'The platform combines a focused PDF library with social-profile storytelling so visitors can move from document to author context instantly.',
      'Publishing teams can present downloadable assets and profile proof points inside one coherent product experience.',
      'The result is a faster path from discovery to trust without fragmenting content across disconnected tools.',
    ],
    sideBadge: 'At a glance',
    sidePoints: [
      'PDF library promoted as the primary homepage action.',
      'Social profile lane maintained as the secondary action surface.',
      'Articles and other routes remain available with reduced prominence.',
      'Lightweight motion and mobile-first utility for high performance.',
    ],
    primaryLink: {
      label: 'Browse PDFs',
      href: '/pdf',
    },
    secondaryLink: {
      label: 'See profiles',
      href: '/profile',
    },
  },
  cta: {
    badge: 'Start publishing',
    title: 'Ship premium PDFs and elevate reach through social profile distribution.',
    description:
      'From document hosting to profile-led trust signals, every core action is now tuned for PDF + social profile growth.',
    primaryCta: {
      label: 'Create Account',
      href: '/register',
    },
    secondaryCta: {
      label: 'Open PDF Library',
      href: '/pdf',
    },
  },
  taskSectionHeading: 'Latest {label}',
  taskSectionDescriptionSuffix: 'Browse the newest posts in this section.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Articles and stories',
    description: 'Read editorial analysis, product notes, and long-form explainers connected to your documents.',
  },
  listing: {
    title: 'Listings and discoverable pages',
    description: 'Explore listings, services, brands, and structured pages organized for easier browsing.',
  },
  classified: {
    title: 'Classifieds and announcements',
    description: 'Browse classifieds, offers, notices, and time-sensitive posts across categories.',
  },
  image: {
    title: 'Images and visual posts',
    description: 'Explore image-led posts, galleries, and visual stories from across the platform.',
  },
  profile: {
    title: 'Profiles and public pages',
    description: 'Discover social profiles, creator identity pages, and distribution-ready author surfaces.',
  },
  sbm: {
    title: 'Curated links and saved resources',
    description: 'Browse useful links, saved references, and curated resources organized for discovery.',
  },
  pdf: {
    title: 'PDF Library and downloadable assets',
    description: 'Open, preview, and download polished PDFs shared by teams and creators.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: {
    title: 'Listings, services, and structured pages',
    paragraphs: [
      'Explore listings, services, brands, and discoverable pages across categories. Each entry is organized to make browsing clearer and help visitors quickly understand what a post offers.',
      'Listings connect naturally with articles, images, resources, and other content types so supporting information stays easy to reach from the same platform.',
      'Browse by category to compare posts in context, discover related content, and move between formats without losing your place.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'Explore classifieds', href: '/classifieds' },
      { label: 'View profiles', href: '/profile' },
    ],
  },
  article: {
    title: 'Articles, stories, and long-form reading',
    paragraphs: [
      'This section publishes editorial explainers, updates, and long-form commentary around documents and profile activity.',
      'Articles complement PDFs by adding context, release narratives, and deeper product insight.',
      'Use this lane when you need richer storytelling beyond the core document preview surfaces.',
    ],
    links: [
      { label: 'Open PDF library', href: '/pdf' },
      { label: 'Explore profiles', href: '/profile' },
      { label: 'Visit community', href: '/community' },
    ],
  },
  classified: {
    title: 'Classifieds, offers, and timely updates',
    paragraphs: [
      'Classified posts help surface offers, notices, deals, and time-sensitive opportunities in a faster-scanning format.',
      'They work well alongside articles, listings, and profiles, making it easier to connect short-term posts with more structured content.',
      'Browse by category to find announcements quickly, then continue into related sections when you need more detail.',
    ],
    links: [
      { label: 'Business listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'View profiles', href: '/profile' },
    ],
  },
  image: {
    title: 'Image-led posts and visual stories',
    paragraphs: [
      'Images take the lead in this section through galleries, visual posts, and story-led content where imagery carries the experience.',
      'These posts connect with articles, listings, and other sections so visuals can act as entry points into deeper content.',
      'Browse the latest visual updates, then continue into related stories or supporting pages for more context.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'Explore listings', href: '/listings' },
      { label: 'Open classifieds', href: '/classifieds' },
    ],
  },
  profile: {
    title: 'Creator profiles and trusted public pages',
    paragraphs: [
      'Profiles show who is behind each PDF so visitors can evaluate expertise before opening downloads.',
      'Each page highlights role clarity, publishing focus, and credibility cues that support faster trust decisions.',
      'Use this section to scan creators, compare specialties, and jump into their best documents.',
    ],
    links: [
      { label: 'Open PDF library', href: '/pdf' },
      { label: 'Create your profile', href: '/register' },
      { label: 'Browse all profiles', href: '/profile' },
    ],
  },
  sbm: {
    title: 'Curated links and bookmarked resources',
    paragraphs: [
      'This section collects useful links, references, tools, and saved resources in a text-first browsing format.',
      'Bookmarks stay connected to the rest of the platform, making it easier to move from a saved link into related stories, listings, or resources.',
      'Use this section to organize helpful sources and discover connected content without leaving the broader site experience.',
    ],
    links: [
      { label: 'Browse articles', href: '/articles' },
      { label: 'Explore listings', href: '/listings' },
      { label: 'Open PDFs', href: '/pdf' },
    ],
  },
  pdf: {
    title: 'PDFs, documents, and downloadable files',
    paragraphs: [
      'The PDF library is the primary product lane for reports, one-pagers, playbooks, and downloadable resources.',
      'Each document is connected to social profile context so visitors can validate source credibility immediately.',
      'Browse by category, open inline previews, and download what matters without friction.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'Explore profiles', href: '/profile' },
      { label: 'Open community', href: '/community' },
    ],
  },
  social: {
    title: 'Short updates and community signals',
    paragraphs: [
      'The social lane captures quick updates, launch moments, and distribution signals around new PDFs.',
      'Use it to see what creators are sharing now before jumping into full documents or profile pages.',
      'It is intentionally lightweight and activity-driven to complement the deeper PDF surfaces.',
    ],
    links: [
      { label: 'Open PDF library', href: '/pdf' },
      { label: 'Read articles', href: '/articles' },
      { label: 'Explore profiles', href: '/profile' },
    ],
  },
  comment: {
    title: 'Comments and contextual responses',
    paragraphs: [
      'Comments surface responses connected directly to articles and help keep discussion close to the writing it belongs to.',
      'This layer adds perspective and reaction without needing a separate standalone content format.',
      'Use comments as supporting context beneath stories, then continue exploring related content from the same topic area.',
    ],
    links: [
      { label: 'Explore articles', href: '/articles' },
      { label: 'View listings', href: '/listings' },
      { label: 'See classifieds', href: '/classifieds' },
    ],
  },
  org: {
    title: 'Organizations, teams, and structured entities',
    paragraphs: [
      'Organization pages provide structured identity surfaces for teams, brands, communities, and agencies.',
      'Used with listings, stories, profiles, and resources, they help create stronger structure across the platform.',
      'Connect organization pages with related content to build a clearer and more unified site presence.',
    ],
    links: [
      { label: 'Business listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'PDF library', href: '/pdf' },
    ],
  },
}
