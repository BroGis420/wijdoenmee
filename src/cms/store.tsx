import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type {
  Article,
  CmsData,
  CustomPage,
  MediaItem,
  NavItem,
  SiteSettings,
  Theme,
  Tool,
} from './types'
import { createSeedData } from './seed'
import {
  CONTENT_MIGRATION_VERSION,
  OLD_DUMMY_ARTICLE_IDS,
  OLD_DUMMY_TOOL_IDS,
  OLD_DUMMY_ARTICLE_TITLES,
  OLD_DUMMY_TOOL_TITLES,
  approvedArticles,
  approvedTools,
  approvedOverOnsPage,
} from './approvedContent'

const STORAGE_KEY = 'wijdoenmee_cms_v2'
const SCHEMA_VERSION = 3

type CmsContextValue = {
  data: CmsData
  ready: boolean
  resetToSeed: () => void
  exportJson: () => string
  importJson: (raw: string) => boolean
  updateSettings: (patch: Partial<SiteSettings>) => void
  updateColors: (patch: Partial<SiteSettings['colors']>) => void
  setNav: (items: NavItem[]) => void
  setFooterLinks: (items: NavItem[]) => void
  saveTheme: (theme: Theme) => void
  deleteTheme: (id: string) => void
  saveArticle: (article: Article) => void
  deleteArticle: (id: string) => void
  saveTool: (tool: Tool) => void
  deleteTool: (id: string) => void
  savePage: (page: CustomPage) => void
  deletePage: (id: string) => void
  saveMedia: (item: MediaItem) => void
  deleteMedia: (id: string) => void
}

const CmsContext = createContext<CmsContextValue | null>(null)

const OLD_PRIMARY = new Set(['#0a6b6b', '#056b40', '#0A6B6B', '#056B40'])
const OLD_PRIMARY_DARK = new Set(['#085252', '#045130'])
const OLD_ACCENT = new Set(['#ffe4d6', '#ffdcdc', '#FFE4D6', '#FFDCDC'])
const OLD_SECONDARY = new Set(['#d8f0eb', '#ffeac2', '#D8F0EB', '#FFEAC2'])
const OLD_LINK = new Set(['#e07a5f', '#0062ff', '#E07A5F', '#0062FF'])

const BRAND_COLORS: SiteSettings['colors'] = {
  primary: '#188AD1',
  primaryDark: '#116296',
  accent: '#FECB01',
  secondary: '#FFF8DB',
  link: '#116296',
}

function migrateLegacyPalette(colors: SiteSettings['colors']): SiteSettings['colors'] {
  const next = { ...colors }
  if (OLD_PRIMARY.has((colors.primary || '').trim())) next.primary = BRAND_COLORS.primary
  if (OLD_PRIMARY_DARK.has((colors.primaryDark || '').trim())) next.primaryDark = BRAND_COLORS.primaryDark
  if (OLD_ACCENT.has((colors.accent || '').trim())) next.accent = BRAND_COLORS.accent
  if (OLD_SECONDARY.has((colors.secondary || '').trim())) next.secondary = BRAND_COLORS.secondary
  if (OLD_LINK.has((colors.link || '').trim())) next.link = BRAND_COLORS.link
  return next
}

function isValidCms(data: unknown): data is CmsData {
  if (!data || typeof data !== 'object') return false
  const d = data as CmsData
  return !!(d.settings && Array.isArray(d.articles) && Array.isArray(d.tools) && Array.isArray(d.themes))
}

function migrateApprovedContent(data: CmsData): CmsData {
  if ((data.contentMigration ?? 0) >= CONTENT_MIGRATION_VERSION) {
    return data
  }

  const oldArtIds = new Set<string>(OLD_DUMMY_ARTICLE_IDS as unknown as string[])
  const oldToolIds = new Set<string>(OLD_DUMMY_TOOL_IDS as unknown as string[])

  let articles = data.articles.filter(
    (a) => !oldArtIds.has(a.id) && !OLD_DUMMY_ARTICLE_TITLES.has(a.title)
  )
  let tools = data.tools.filter(
    (t) => !oldToolIds.has(t.id) && !OLD_DUMMY_TOOL_TITLES.has(t.title)
  )

  for (const a of approvedArticles) {
    const byId = articles.findIndex((x) => x.id === a.id)
    const bySlug = articles.findIndex((x) => x.slug === a.slug)
    if (byId >= 0) {
      articles[byId] = { ...a }
    } else if (bySlug >= 0) {
      const existing = articles[bySlug]
      if (oldArtIds.has(existing.id) || OLD_DUMMY_ARTICLE_TITLES.has(existing.title)) {
        articles[bySlug] = { ...a }
      }
    } else {
      articles.push({ ...a })
    }
  }

  for (const t of approvedTools) {
    const byId = tools.findIndex((x) => x.id === t.id)
    const bySlug = tools.findIndex((x) => x.slug === t.slug)
    if (byId >= 0) {
      tools[byId] = { ...t }
    } else if (bySlug >= 0) {
      const existing = tools[bySlug]
      if (oldToolIds.has(existing.id) || OLD_DUMMY_TOOL_TITLES.has(existing.title)) {
        tools[bySlug] = { ...t }
      }
    } else {
      tools.push({ ...t })
    }
  }

  const seenArt = new Set<string>()
  articles = articles.filter((a) => {
    const sk = `slug:${a.slug}`
    if (seenArt.has(a.id) || seenArt.has(sk)) return false
    seenArt.add(a.id)
    seenArt.add(sk)
    return true
  })
  const seenTool = new Set<string>()
  tools = tools.filter((t) => {
    const sk = `slug:${t.slug}`
    if (seenTool.has(t.id) || seenTool.has(sk)) return false
    seenTool.add(t.id)
    seenTool.add(sk)
    return true
  })

  let pages = data.pages.map((p) => {
    if (p.slug !== 'over-ons') return p
    const looksDummy =
      p.id === 'page_over' ||
      p.body.includes('online toolbox') ||
      (p.bannerIntro || '').includes('Wie zit er achter')
    if (looksDummy) {
      return { ...approvedOverOnsPage, id: p.id === 'page_over' ? 'page_c001' : p.id }
    }
    return p
  })
  if (!pages.some((p) => p.slug === 'over-ons')) {
    pages = [...pages, { ...approvedOverOnsPage }]
  }

  return {
    ...data,
    version: Math.max(data.version || 0, SCHEMA_VERSION),
    contentMigration: CONTENT_MIGRATION_VERSION,
    articles,
    tools,
    pages,
  }
}

function migrateSettings(data: CmsData): CmsData {
  let settings = { ...data.settings }
  if (settings.colors) {
    settings = { ...settings, colors: migrateLegacyPalette(settings.colors) }
  }
  if (settings.footerCredit === 'Gemaakt door Rekall') {
    settings = { ...settings, footerCredit: 'gemaakt door Lieven :)' }
  }
  return { ...data, settings }
}

function normalizeImported(parsed: CmsData): CmsData {
  const base = createSeedData()
  const merged: CmsData = {
    ...base,
    ...parsed,
    settings: { ...base.settings, ...(parsed.settings || {}) },
    version: Math.max(Number(parsed.version) || 0, SCHEMA_VERSION),
    contentMigration: Math.max(Number(parsed.contentMigration) || 0, CONTENT_MIGRATION_VERSION),
  }
  return migrateApprovedContent(migrateSettings(merged))
}

function loadData(): CmsData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as CmsData
      if (parsed && parsed.settings && parsed.themes?.[0]?.faqs) {
        let data = migrateSettings(parsed)
        data = migrateApprovedContent(data)
        if ((data.version || 0) < 2) data = { ...data, version: SCHEMA_VERSION }
        return data
      }
    }
    localStorage.removeItem('wijdoenmee_cms_v1')
  } catch {
    /* ignore */
  }
  return createSeedData()
}

function persist(data: CmsData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    /* ignore quota */
  }
}

export function CmsProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<CmsData>(() => createSeedData())
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setData(loadData())
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    persist(data)
  }, [data, ready])

  useEffect(() => {
    if (!ready) return
    const c = data.settings.colors
    const root = document.documentElement
    root.style.setProperty('--color-green', c.primary)
    root.style.setProperty('--color-green-darker', c.primaryDark)
    root.style.setProperty('--color-pink', c.accent)
    root.style.setProperty('--color-yellow2', c.secondary)
    root.style.setProperty('--color-blue', c.link)
    root.style.setProperty('--color-blue-alpha', `${c.link}30`)
    root.style.setProperty('--color-black', '#171717')
    root.style.setProperty('--color-white', '#FFFFFF')
  }, [data.settings.colors, ready])

  const update = useCallback((fn: (prev: CmsData) => CmsData) => {
    setData((prev) => fn(prev))
  }, [])

  const value = useMemo<CmsContextValue>(
    () => ({
      data,
      ready,
      resetToSeed: () => setData(createSeedData()),
      exportJson: () => JSON.stringify(data, null, 2),
      importJson: (raw) => {
        try {
          const parsed = JSON.parse(raw) as CmsData
          if (!isValidCms(parsed)) return false
          setData(normalizeImported(parsed))
          return true
        } catch {
          return false
        }
      },
      updateSettings: (patch) =>
        update((d) => ({ ...d, settings: { ...d.settings, ...patch } })),
      updateColors: (patch) =>
        update((d) => ({
          ...d,
          settings: { ...d.settings, colors: { ...d.settings.colors, ...patch } },
        })),
      setNav: (items) => update((d) => ({ ...d, nav: items })),
      setFooterLinks: (items) => update((d) => ({ ...d, footerLinks: items })),
      saveTheme: (theme) =>
        update((d) => {
          const i = d.themes.findIndex((t) => t.id === theme.id)
          const themes = [...d.themes]
          if (i >= 0) themes[i] = theme
          else themes.push(theme)
          return { ...d, themes }
        }),
      deleteTheme: (id) => update((d) => ({ ...d, themes: d.themes.filter((t) => t.id !== id) })),
      saveArticle: (article) =>
        update((d) => {
          const i = d.articles.findIndex((a) => a.id === article.id)
          const articles = [...d.articles]
          if (i >= 0) articles[i] = article
          else articles.push(article)
          return { ...d, articles }
        }),
      deleteArticle: (id) =>
        update((d) => ({ ...d, articles: d.articles.filter((a) => a.id !== id) })),
      saveTool: (tool) =>
        update((d) => {
          const i = d.tools.findIndex((t) => t.id === tool.id)
          const tools = [...d.tools]
          if (i >= 0) tools[i] = tool
          else tools.push(tool)
          return { ...d, tools }
        }),
      deleteTool: (id) => update((d) => ({ ...d, tools: d.tools.filter((t) => t.id !== id) })),
      savePage: (page) =>
        update((d) => {
          const i = d.pages.findIndex((p) => p.id === page.id)
          const pages = [...d.pages]
          if (i >= 0) pages[i] = page
          else pages.push(page)
          return { ...d, pages }
        }),
      deletePage: (id) => update((d) => ({ ...d, pages: d.pages.filter((p) => p.id !== id) })),
      saveMedia: (item) =>
        update((d) => {
          const i = d.media.findIndex((m) => m.id === item.id)
          const media = [...d.media]
          if (i >= 0) media[i] = item
          else media.push(item)
          return { ...d, media }
        }),
      deleteMedia: (id) => update((d) => ({ ...d, media: d.media.filter((m) => m.id !== id) })),
    }),
    [data, ready, update]
  )

  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>
}

export function useCms() {
  const ctx = useContext(CmsContext)
  if (!ctx) throw new Error('useCms must be used within CmsProvider')
  return ctx
}
