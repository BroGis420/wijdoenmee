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

const STORAGE_KEY = 'wijdoenmee_cms_v2'

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
  // themes
  saveTheme: (theme: Theme) => void
  deleteTheme: (id: string) => void
  // articles
  saveArticle: (article: Article) => void
  deleteArticle: (id: string) => void
  // tools
  saveTool: (tool: Tool) => void
  deleteTool: (id: string) => void
  // pages
  savePage: (page: CustomPage) => void
  deletePage: (id: string) => void
  // media
  saveMedia: (item: MediaItem) => void
  deleteMedia: (id: string) => void
}

const CmsContext = createContext<CmsContextValue | null>(null)

/** Map only known previous default palette values → brand defaults. Custom CMS colours stay. */
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
  const p = (colors.primary || '').trim()
  const pd = (colors.primaryDark || '').trim()
  const a = (colors.accent || '').trim()
  const s = (colors.secondary || '').trim()
  const l = (colors.link || '').trim()
  if (OLD_PRIMARY.has(p)) next.primary = BRAND_COLORS.primary
  if (OLD_PRIMARY_DARK.has(pd)) next.primaryDark = BRAND_COLORS.primaryDark
  if (OLD_ACCENT.has(a)) next.accent = BRAND_COLORS.accent
  if (OLD_SECONDARY.has(s)) next.secondary = BRAND_COLORS.secondary
  if (OLD_LINK.has(l)) next.link = BRAND_COLORS.link
  return next
}

function loadData(): CmsData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as CmsData
      // Force refresh when seed version bumps so full content lands
      if (parsed && parsed.version >= 2 && parsed.settings && parsed.themes?.[0]?.faqs) {
        if (parsed.settings.colors) {
          parsed.settings = {
            ...parsed.settings,
            colors: migrateLegacyPalette(parsed.settings.colors),
          }
        }
        return parsed
      }
    }
    // clear stale v1
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
          if (!parsed?.settings || !parsed?.articles) return false
          setData({ ...createSeedData(), ...parsed, version: 1 })
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
      deleteTheme: (id) =>
        update((d) => ({ ...d, themes: d.themes.filter((t) => t.id !== id) })),
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
      deleteTool: (id) =>
        update((d) => ({ ...d, tools: d.tools.filter((t) => t.id !== id) })),
      savePage: (page) =>
        update((d) => {
          const i = d.pages.findIndex((p) => p.id === page.id)
          const pages = [...d.pages]
          if (i >= 0) pages[i] = page
          else pages.push(page)
          return { ...d, pages }
        }),
      deletePage: (id) =>
        update((d) => ({ ...d, pages: d.pages.filter((p) => p.id !== id) })),
      saveMedia: (item) =>
        update((d) => {
          const i = d.media.findIndex((m) => m.id === item.id)
          const media = [...d.media]
          if (i >= 0) media[i] = item
          else media.push(item)
          return { ...d, media }
        }),
      deleteMedia: (id) =>
        update((d) => ({ ...d, media: d.media.filter((m) => m.id !== id) })),
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
