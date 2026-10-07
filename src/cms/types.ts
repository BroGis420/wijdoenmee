export type CmsId = string

export interface SiteSettings {
  siteName: string
  logoLine1: string
  logoLine2: string
  logoLine3: string
  homeTitle: string
  homeIntro: string
  homeSectionTitle: string
  homeSectionCta: string
  homeSectionCtaRoute: string
  footerCopyright: string
  footerCredit: string
  colors: {
    primary: string
    primaryDark: string
    accent: string
    secondary: string
    link: string
  }
}

export interface NavItem {
  id: CmsId
  label: string
  route: string
  order: number
}

/** answer supports simple markdown: ## headings, - bullets, **bold**, blank-line paragraphs */
export interface FaqItem {
  id: CmsId
  question: string
  answer: string
}

export interface DeepdiveItem {
  id: CmsId
  title: string
  description: string
  buttonLabel: string
  buttonUrl: string
  imageUrl: string
  imageAlt: string
}

export interface Theme {
  id: CmsId
  title: string
  slug: string
  intro: string
  imageUrl: string
  imageAlt: string
  published: boolean
  order: number
  faqs: FaqItem[]
  deepdives: DeepdiveItem[]
}

export interface Article {
  id: CmsId
  title: string
  slug: string
  description: string
  source: string
  themes: string[]
  /** simple markdown body */
  body: string
  imageUrl: string
  imageAlt: string
  videoUrl: string
  published: boolean
  featured: boolean
  faqs: FaqItem[]
  relatedToolSlugs: string[]
  createdAt: string
  updatedAt: string
}

export interface Tool {
  id: CmsId
  title: string
  slug: string
  description: string
  themes: string[]
  imageUrl: string
  imageAlt: string
  /** longer body markdown */
  body: string
  /** bullet summary lines */
  summary: string[]
  downloadLabel: string
  downloadUrl: string
  externalUrl: string
  faqs: FaqItem[]
  published: boolean
  order: number
}

export type PageType = 'custom' | 'home' | 'listing-tools' | 'listing-inspiratie'

export interface CustomPage {
  id: CmsId
  title: string
  slug: string
  type: PageType
  bannerTitle: string
  bannerIntro: string
  body: string
  published: boolean
  showInNav: boolean
  order: number
}

export interface MediaItem {
  id: CmsId
  name: string
  url: string
  alt: string
}

export interface CmsData {
  version: number
  settings: SiteSettings
  nav: NavItem[]
  footerLinks: NavItem[]
  themes: Theme[]
  articles: Article[]
  tools: Tool[]
  pages: CustomPage[]
  media: MediaItem[]
}

export function uid(prefix = 'id'): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36).slice(-4)}`
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 80) || 'pagina'
}
