import React, { useEffect, useMemo, useState } from 'react'
import { useCms } from './store'
import type { Article, CustomPage, FaqItem, Theme, Tool } from './types'
import RichText from './RichText'

function NavLink({
  to,
  children,
  className,
  'aria-label': ariaLabel,
}: {
  to: string
  children: React.ReactNode
  className?: string
  'aria-label'?: string
}) {
  return (
    <a className={className} data-navigate-routes={JSON.stringify([to])} aria-label={ariaLabel}>
      {children}
    </a>
  )
}

function Logo() {
  const { data } = useCms()
  const s = data.settings
  const descriptor = s.logoLine3 || 'rond Gent'
  return (
    <NavLink to="/" className="logo-link" aria-label="Wij doen mee rond Gent">
      <span className="logo__text">
        <img
          className="logo__wordmark"
          src="/brand/wij-doen-mee-wordmark.png"
          alt=""
          width={220}
          height={40}
          decoding="async"
        />
        <span className="logo__sub" aria-hidden="true">
          {descriptor}
        </span>
      </span>
    </NavLink>
  )
}

/** Inert yellow brand loop — decorative only */
function BrandLoop({ variant = 'hero' }: { variant?: 'hero' | 'footer' }) {
  const src = variant === 'footer' ? '/brand/loop-footer.svg' : '/brand/loop-hero.svg'
  return (
    <div className={`brand-loop brand-loop--${variant}`} aria-hidden="true">
      <img src={src} alt="" decoding="async" />
    </div>
  )
}

function goTo(path: string) {
  window.history.pushState(null, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

function ThemeFilter({
  value,
  options,
  onChange,
  label = "Alle thema's",
}: {
  value: string
  options: string[]
  onChange: (v: string) => void
  label?: string
}) {
  const [open, setOpen] = useState(false)
  const ref = React.useRef<HTMLDivElement>(null)
  const current = value === 'all' ? label : value

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="theme-filter" ref={ref}>
      <button
        type="button"
        className="theme-filter__btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{current}</span>
        <span className="theme-filter__chevron" aria-hidden="true" />
      </button>
      {open ? (
        <ul className="theme-filter__menu" role="listbox">
          <li>
            <button
              type="button"
              role="option"
              aria-selected={value === 'all'}
              className={`theme-filter__option${value === 'all' ? ' is-active' : ''}`}
              onClick={() => {
                onChange('all')
                setOpen(false)
              }}
            >
              {label}
            </button>
          </li>
          {options.map((opt) => (
            <li key={opt}>
              <button
                type="button"
                role="option"
                aria-selected={value === opt}
                className={`theme-filter__option${value === opt ? ' is-active' : ''}`}
                onClick={() => {
                  onChange(opt)
                  setOpen(false)
                }}
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

type SearchHit = { type: 'Artikel' | 'Tool' | 'Thema' | 'Pagina'; title: string; description: string; route: string }

function SearchOverlay({ onClose }: { onClose: () => void }) {
  const { data } = useCms()
  const [q, setQ] = useState('')
  const inputRef = React.useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const hits = useMemo(() => {
    const needle = q.trim().toLowerCase()
    if (needle.length < 2) return [] as SearchHit[]
    const out: SearchHit[] = []
    for (const a of data.articles.filter((x) => x.published)) {
      const hay = `${a.title} ${a.description} ${a.themes.join(' ')} ${a.source || ''}`.toLowerCase()
      if (hay.includes(needle)) {
        out.push({
          type: 'Artikel',
          title: a.title,
          description: a.description,
          route: `/inspiratie/${a.slug}`,
        })
      }
    }
    for (const t of data.tools.filter((x) => x.published)) {
      const hay = `${t.title} ${t.description} ${t.themes.join(' ')}`.toLowerCase()
      if (hay.includes(needle)) {
        out.push({
          type: 'Tool',
          title: t.title,
          description: t.description,
          route: `/tools/${t.slug}`,
        })
      }
    }
    for (const th of data.themes.filter((x) => x.published)) {
      const hay = `${th.title} ${th.intro || ''}`.toLowerCase()
      if (hay.includes(needle)) {
        out.push({
          type: 'Thema',
          title: th.title,
          description: th.intro || '',
          route: `/themas/${th.slug}`,
        })
      }
    }
    for (const p of data.pages.filter((x) => x.published)) {
      const hay = `${p.title} ${p.body || ''}`.toLowerCase()
      if (hay.includes(needle)) {
        out.push({
          type: 'Pagina',
          title: p.title,
          description: (p.body || '').replace(/<[^>]+>/g, ' ').slice(0, 120),
          route: `/pagina/${p.slug}`,
        })
      }
    }
    return out.slice(0, 20)
  }, [q, data])

  return (
    <div
      className="search-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Zoeken"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="search-overlay__panel">
        <div className="search-overlay__bar">
          <input
            ref={inputRef}
            className="search-overlay__input"
            type="search"
            placeholder="Zoek artikels, tools, thema's…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Zoekterm"
          />
          <button type="button" className="search-overlay__close" onClick={onClose}>
            Sluiten
          </button>
        </div>
        <div className="search-overlay__results">
          {q.trim().length < 2 ? (
            <p className="search-overlay__empty">Typ minstens 2 letters om te zoeken.</p>
          ) : hits.length === 0 ? (
            <p className="search-overlay__empty">Geen resultaten voor “{q.trim()}”.</p>
          ) : (
            hits.map((h) => (
              <button
                key={`${h.type}-${h.route}`}
                type="button"
                className="search-overlay__hit"
                onClick={() => {
                  goTo(h.route)
                  onClose()
                }}
              >
                <span className="search-overlay__hit-type">{h.type}</span>
                <span className="search-overlay__hit-title">{h.title}</span>
                {h.description ? <span className="search-overlay__hit-desc">{h.description}</span> : null}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

function SiteHeader({ activePath }: { activePath: string }) {
  const { data } = useCms()
  const nav = [...data.nav].sort((a, b) => a.order - b.order)
  const path = activePath.split('?')[0]
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <>
      <header className="content site-header">
        <div className="header--large large-only">
          <div className="header__top">
            <div className="logo">
              <Logo />
            </div>
          </div>
          <nav className="nav__main" aria-label="Hoofdmenu">
            <ul className="menu">
              {nav.map((item) => {
                const active = path === item.route || (item.route !== '/' && path.startsWith(item.route))
                return (
                  <li key={item.id} className={`menu-item${active ? ' menu-item--active-trail' : ''}`}>
                    <NavLink to={item.route}>
                      <span>{item.label}</span>
                    </NavLink>
                  </li>
                )
              })}
              <li className="search menu-item">
                <a
                  href="#zoek"
                  role="button"
                  onClick={(e) => {
                    e.preventDefault()
                    setSearchOpen(true)
                  }}
                >
                  <span>Zoek</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="header--small small-only">
          <div className="header__top">
            <div className="logo">
              <Logo />
            </div>
          </div>
          <button type="button" className="menu__toggle" onClick={() => setMenuOpen((v) => !v)}>
            Menu
          </button>
          <nav className="nav__main nav__main--small" style={{ display: menuOpen ? 'flex' : 'none' }} aria-label="Mobiel menu">
            <ul className="menu">
              {nav.map((item) => (
                <li key={item.id} className="menu-item">
                  <NavLink to={item.route}>
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
              <li className="search menu-item">
                <a
                  href="#zoek"
                  role="button"
                  onClick={(e) => {
                    e.preventDefault()
                    setMenuOpen(false)
                    setSearchOpen(true)
                  }}
                >
                  <span>Zoek</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      {searchOpen ? <SearchOverlay onClose={() => setSearchOpen(false)} /> : null}
    </>
  )
}

function SiteFooter() {
  const { data } = useCms()
  const links = [...data.footerLinks].sort((a, b) => a.order - b.order)
  const mid = Math.ceil(links.length / 2)
  const col1 = links.slice(0, mid)
  const col2 = links.slice(mid)

  return (
    <footer className="full-bleed footer--brand">
      <BrandLoop variant="footer" />
      <div className="content">
        <div className="footer__links">
          <nav className="nav__footer">
            <ul className="menu">
              {col1.map((l) => (
                <li key={l.id} className="menu-item">
                  <NavLink to={l.route}>
                    <span>{l.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="footer__links">
          <nav className="nav__footer">
            <ul className="menu">
              {col2.map((l) => (
                <li key={l.id} className="menu-item">
                  <NavLink to={l.route}>
                    <span>{l.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="footer__partners" />
        <div className="footer__copyright">
          <p>{data.settings.footerCopyright}</p>
          <CreditCelebrate text={data.settings.footerCredit} />
        </div>
      </div>
    </footer>
  )
}

/** Celebratory credit — confetti burst + dancing text on hover */
function CreditCelebrate({ text }: { text: string }) {
  const pieces = React.useMemo(
    () =>
      Array.from({ length: 48 }, (_, i) => {
        const angle = (i / 48) * Math.PI * 2 + (i % 3) * 0.2
        const dist = 70 + (i % 9) * 22
        return {
          id: i,
          dx: Math.round(Math.cos(angle) * dist * (0.85 + (i % 5) * 0.08)),
          dy: Math.round(Math.sin(angle) * dist * 0.55 - (55 + (i % 7) * 18)),
          rot: (i * 53) % 720 - 360,
          delay: (i % 12) * 0.025,
          size: 8 + (i % 7) * 2,
          kind: i % 5,
        }
      }),
    []
  )

  return (
    <p className="credit-celebrate" tabIndex={0} role="text">
      <span className="credit-celebrate__burst" aria-hidden="true">
        {pieces.map((p) => (
          <span
            key={p.id}
            className={`credit-celebrate__piece credit-celebrate__piece--${p.kind}`}
            style={
              {
                '--dx': `${p.dx}px`,
                '--dy': `${p.dy}px`,
                '--rot': `${p.rot}deg`,
                '--delay': `${p.delay}s`,
                '--size': `${p.size}px`,
              } as React.CSSProperties
            }
          />
        ))}
      </span>
      <span className="credit-celebrate__text">{text}</span>
    </p>
  )
}

function ArticleCard({ article }: { article: Article }) {
  const route = `/inspiratie/${article.slug}`
  return (
    <div className="teaser">
      <div className="teaser__img">
        {article.imageUrl ? (
          <img loading="lazy" alt={article.imageAlt || article.title} src={article.imageUrl} width={357} height={238} />
        ) : (
          <div className="teaser__placeholder" aria-hidden="true" />
        )}
      </div>
      <div className="teaser__body">
        <div>
          <h2 className="teaser__title">
            <NavLink to={route}>{article.title}</NavLink>
          </h2>
          <p>{article.description}</p>
          {article.source ? <p className="teaser__tag source">{article.source}</p> : null}
          {article.themes?.length ? <p className="teaser__tag theme">{article.themes.join(', ')}</p> : null}
        </div>
        <p className="teaser__cta button button--primary">
          <NavLink to={route}>Lees meer</NavLink>
        </p>
      </div>
    </div>
  )
}

function ToolCard({ tool }: { tool: Tool }) {
  const route = `/tools/${tool.slug}`
  return (
    <div className="teaser">
      <div className="teaser__img">
        {tool.imageUrl ? (
          <img loading="lazy" alt={tool.imageAlt || tool.title} src={tool.imageUrl} width={357} height={238} />
        ) : (
          <div className="teaser__placeholder" aria-hidden="true" />
        )}
      </div>
      <div className="teaser__body">
        <div>
          <h2 className="teaser__title">
            <NavLink to={route}>{tool.title}</NavLink>
          </h2>
          <p>{tool.description}</p>
          {tool.themes?.length ? <p className="teaser__tag theme">{tool.themes.join(', ')}</p> : null}
        </div>
        <p className="teaser__cta button button--primary">
          <NavLink to={route}>Bekijk tool</NavLink>
        </p>
      </div>
    </div>
  )
}

function FaqSection({ title, items }: { title: string; items: FaqItem[] }) {
  if (!items?.length) return null
  return (
    <div className="full-bleed">
      <div className="content">
        <div className="section">
          <h2 className="section__title">{title}</h2>
          <div className="faq__container">
            {items.map((f) => (
              <div className="faq__item" key={f.id}>
                <details>
                  <summary>{f.question}</summary>
                  <div className="faq__content">
                    <div className="block block__text">
                      <RichText text={f.answer} />
                    </div>
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function HomePage() {
  const { data } = useCms()
  const s = data.settings
  const themes = [...data.themes].filter((t) => t.published).sort((a, b) => a.order - b.order)
  const featured = data.articles
    .filter((a) => a.published && a.featured)
    .sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''))
    .slice(0, 3)
  const introLines = s.homeIntro.split('\n')

  return (
    <main>
      <div id="block-rekall-theme-content">
        <div className="bg-color-pink">
          <div className="banner__home">
            <BrandLoop variant="hero" />
            <div className="content">
              <div className="banner__body">
                <h1 className="banner__title">{s.homeTitle}</h1>
                <div className="banner__intro">
                  <p>
                    {introLines.map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i < introLines.length - 1 ? <br /> : null}
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div style={{ zIndex: 1, position: 'relative' }}>
            <div className="content">
              <div className="thema__container">
                {themes.map((t) => (
                  <div className="thema" key={t.id}>
                    <NavLink to={`/themas/${t.slug}`} className="thema__card">
                      {t.imageUrl ? (
                        <img
                          className="thema__media"
                          loading="lazy"
                          alt={t.imageAlt || t.title}
                          width={552}
                          height={276}
                          src={t.imageUrl}
                        />
                      ) : (
                        <div className="thema__media thema__media--empty" aria-hidden="true" />
                      )}
                      <span className="thema__label">
                        <span className="thema__label-text">{t.title}</span>
                      </span>
                    </NavLink>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="views-element-container">
          <div className="full-bleed bg-color-yellow section">
            <div className="content">
              <div className="section__header">
                <h2 className="section__title">{s.homeSectionTitle}</h2>
                <p className="section__cta">
                  <NavLink to={s.homeSectionCtaRoute}>{s.homeSectionCta}</NavLink>
                </p>
              </div>
              <div className="teaser__container teaser__container--3">
                {featured.map((a) => (
                  <div className="views-row" key={a.id}>
                    <ArticleCard article={a} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

function ToolsPage() {
  const { data } = useCms()
  const tools = [...data.tools].filter((t) => t.published).sort((a, b) => a.order - b.order)
  const [filter, setFilter] = useState('all')
  const themeOptions = Array.from(new Set(tools.flatMap((t) => t.themes))).sort()
  const filtered = filter === 'all' ? tools : tools.filter((t) => t.themes.includes(filter))

  return (
    <main>
      <div id="block-rekall-theme-content">
        <div className="full-bleed bg-color-pink">
          <div className="content">
            <div className="section" style={{ paddingTop: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                <h1 className="section__title" style={{ margin: 0 }}>
                  Tools
                </h1>
                <ThemeFilter value={filter} options={themeOptions} onChange={setFilter} />
              </div>
              <div className="teaser__container teaser__container--3">
                {filtered.map((t) => (
                  <ToolCard key={t.id} tool={t} />
                ))}
              </div>
              {filtered.length === 0 ? <p>Geen tools gevonden.</p> : null}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

function InspiratiePage() {
  const { data } = useCms()
  const articles = data.articles.filter((a) => a.published)
  const [filter, setFilter] = useState('all')
  const themeOptions = Array.from(new Set(articles.flatMap((a) => a.themes))).sort()
  const filtered = filter === 'all' ? articles : articles.filter((a) => a.themes.includes(filter))

  return (
    <main>
      <div id="block-rekall-theme-content">
        <div className="full-bleed bg-color-pink">
          <div className="content">
            <div className="section" style={{ paddingTop: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                <h1 className="section__title" style={{ margin: 0 }}>
                  Inspiratie
                </h1>
                <ThemeFilter value={filter} options={themeOptions} onChange={setFilter} />
              </div>
              <div className="teaser__container teaser__container--3">
                {filtered.map((a) => (
                  <ArticleCard key={a.id} article={a} />
                ))}
              </div>
              {filtered.length === 0 ? <p>Geen artikels gevonden.</p> : null}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

function ArticleDetail({ article }: { article: Article }) {
  const { data } = useCms()
  const related = data.articles
    .filter((a) => a.published && a.id !== article.id && a.themes.some((t) => article.themes.includes(t)))
    .slice(0, 3)
  const relatedTools = data.tools.filter(
    (t) => t.published && (article.relatedToolSlugs || []).includes(t.slug)
  )

  return (
    <main>
      <div id="block-rekall-theme-content">
        <div className="full-bleed bg-color-yellow">
          <div className="content">
            <div className="banner__inspiration">
              <div className="banner__body">
                <h1 className="banner__title">{article.title}</h1>
                <div className="banner__intro">
                  <p>{article.description}</p>
                </div>
              </div>
              {article.imageUrl ? (
                <div className="banner__img">
                  <img alt={article.imageAlt || article.title} src={article.imageUrl} />
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="content">
          <div className="content__blocks">
            <div className="block block__text">
              <RichText text={article.body} />
              {article.source ? (
                <p>
                  <strong>Bron:</strong> {article.source}
                </p>
              ) : null}
            </div>
          </div>
        </div>
        {relatedTools.length ? (
          <div className="full-bleed bg-color-pink">
            <div className="content">
              <div className="section">
                <h2 className="section__title">Hoe in de praktijk brengen?</h2>
                <div className="teaser__container teaser__container--3">
                  {relatedTools.map((t) => (
                    <ToolCard key={t.id} tool={t} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <FaqSection title="Wil je meer weten?" items={article.faqs || []} />
        {related.length ? (
          <div className="full-bleed bg-color-yellow">
            <div className="content">
              <div className="section">
                <h2 className="section__title">Meer inspiraties rond dit thema zien?</h2>
                <div className="teaser__container teaser__container--3">
                  {related.map((a) => (
                    <ArticleCard key={a.id} article={a} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  )
}

function ThemeDetail({ theme }: { theme: Theme }) {
  const { data } = useCms()
  const tools = data.tools.filter((t) => t.published && t.themes.includes(theme.title))
  const articles = data.articles.filter((a) => a.published && a.themes.includes(theme.title)).slice(0, 6)
  const deepdives = theme.deepdives || []

  return (
    <main>
      <div id="block-rekall-theme-content">
        <div className="full-bleed bg-color-green">
          <div className="content">
            <div className="banner__theme">
              <div className="banner__body">
                <h1 className="banner__title">{theme.title}</h1>
                <div className="banner__intro">
                  <p>{theme.intro}</p>
                </div>
              </div>
              {theme.imageUrl ? (
                <div className="banner__img">
                  <img alt={theme.imageAlt || theme.title} src={theme.imageUrl} />
                </div>
              ) : null}
            </div>
          </div>
        </div>
        {tools.length ? (
          <div className="full-bleed bg-color-pink">
            <div className="content">
              <div className="section">
                <h2 className="section__title">Aan de slag</h2>
                <div className="teaser__container teaser__container--3">
                  {tools.map((t) => (
                    <ToolCard key={t.id} tool={t} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <FaqSection title="Meer vragen" items={theme.faqs || []} />
        {deepdives.length ? (
          <div className="full-bleed bg-color-yellow">
            <div className="content">
              <div className="section">
                <h2 className="section__title">Verdiep je kennis</h2>
                <div className="deepdive__container deepdive__container--3">
                  {deepdives.map((d) => (
                    <div className="deepdive" key={d.id}>
                      {d.imageUrl ? (
                        <div className="deepdive__img">
                          <img alt={d.imageAlt || d.title} src={d.imageUrl} loading="lazy" />
                        </div>
                      ) : null}
                      <div className="deepdive__body">
                        <h3 className="deepdive__title">{d.title}</h3>
                        <p>{d.description}</p>
                        {d.buttonUrl ? (
                          <a
                            className="deepdive__btn external button ext external-link"
                            href={d.buttonUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="(opens in a new window)"
                          >
                            {d.buttonLabel}
                          </a>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {articles.length ? (
          <div className="full-bleed bg-color-yellow">
            <div className="content">
              <div className="section">
                <h2 className="section__title">Inspiratie rond dit thema</h2>
                <div className="teaser__container teaser__container--3">
                  {articles.map((a) => (
                    <ArticleCard key={a.id} article={a} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  )
}

function ToolDetail({ tool }: { tool: Tool }) {
  const { data } = useCms()
  const related = data.tools
    .filter((t) => t.published && t.id !== tool.id && t.themes.some((th) => tool.themes.includes(th)))
    .slice(0, 3)
  const relatedArticles = data.articles
    .filter((a) => a.published && a.themes.some((th) => tool.themes.includes(th)))
    .slice(0, 3)

  return (
    <main>
      <div id="block-rekall-theme-content">
        <div className="full-bleed bg-color-pink">
          <div className="content">
            <div className="banner__tool">
              <div className="banner__body">
                <h1 className="banner__title">{tool.title}</h1>
                <div className="banner__intro">
                  <p>{tool.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="content__blocks" style={{ padding: '2rem 0' }}>
            <div className="block block__text">
              <RichText text={tool.body} />
              {tool.summary?.length ? (
                <>
                  <h2>Samengevat</h2>
                  <ul>
                    {tool.summary.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </>
              ) : null}
              {tool.downloadUrl ? (
                <p style={{ marginTop: '1.5rem' }}>
                  <a className="button button--primary" href={tool.downloadUrl} target="_blank" rel="noopener noreferrer">
                    {tool.downloadLabel || 'Download'}
                  </a>
                </p>
              ) : null}
              {tool.externalUrl ? (
                <p style={{ marginTop: '1rem' }}>
                  <a className="button external ext external-link" href={tool.externalUrl} target="_blank" rel="noopener noreferrer">
                    {tool.downloadLabel || 'Ga naar de tool'}
                  </a>
                </p>
              ) : null}
            </div>
            {tool.imageUrl ? (
              <div className="block block__media" style={{ marginTop: '1.5rem' }}>
                <img alt={tool.imageAlt || tool.title} src={tool.imageUrl} style={{ maxWidth: '100%', borderRadius: 20 }} />
              </div>
            ) : null}
          </div>
        </div>
        <FaqSection title="Meer vragen" items={tool.faqs || []} />
        {related.length ? (
          <div className="full-bleed bg-color-pink">
            <div className="content">
              <div className="section">
                <h2 className="section__title">Meer tools</h2>
                <div className="teaser__container teaser__container--3">
                  {related.map((t) => (
                    <ToolCard key={t.id} tool={t} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {relatedArticles.length ? (
          <div className="full-bleed bg-color-yellow">
            <div className="content">
              <div className="section">
                <h2 className="section__title">Meer inspiraties</h2>
                <div className="teaser__container teaser__container--3">
                  {relatedArticles.map((a) => (
                    <ArticleCard key={a.id} article={a} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  )
}

function CustomPageView({ page }: { page: CustomPage }) {
  return (
    <main>
      <div id="block-rekall-theme-content">
        <div className="full-bleed bg-color-green">
          <div className="content">
            <div className="banner__page">
              <div className="banner__body">
                <h1 className="banner__title">{page.bannerTitle || page.title}</h1>
                {page.bannerIntro ? (
                  <div className="banner__intro">
                    <p>{page.bannerIntro}</p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="content__blocks" style={{ padding: '2rem 0' }}>
            <div className="block block__text">
              <RichText text={page.body} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

function NotFound() {
  return (
    <main>
      <div className="content" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h1>Pagina niet gevonden</h1>
        <p>
          <NavLink to="/">Terug naar home</NavLink>
        </p>
      </div>
    </main>
  )
}

function resolvePath(full: string) {
  return full.split('?')[0].split('#')[0] || '/'
}

export default function PublicSite() {
  const { data, ready } = useCms()
  const [path, setPath] = useState(() => window.location.pathname + window.location.search)

  useEffect(() => {
    const sync = () => setPath(window.location.pathname + window.location.search)
    window.addEventListener('popstate', sync)
    // catch pushState from CMS nav attribute handler
    const id = window.setInterval(sync, 300)
    return () => {
      window.removeEventListener('popstate', sync)
      window.clearInterval(id)
    }
  }, [])

  useEffect(() => {
    document.title = data.settings.siteName
  }, [data.settings.siteName])

  const pathname = resolvePath(path)

  // Always start at top when the route changes (article/tool/theme/page)
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [pathname])

  const content = useMemo(() => {
    if (pathname === '/' || pathname === '') return <HomePage />
    if (pathname === '/tools') return <ToolsPage />
    if (pathname === '/inspiratie') return <InspiratiePage />

    const toolMatch = pathname.match(/^\/tools\/([^/]+)$/)
    if (toolMatch) {
      const tool = data.tools.find((t) => t.slug === toolMatch[1] && t.published)
      return tool ? <ToolDetail tool={tool} /> : <NotFound />
    }

    const artMatch = pathname.match(/^\/inspiratie\/([^/]+)$/)
    if (artMatch) {
      const article = data.articles.find((a) => a.slug === artMatch[1] && a.published)
      return article ? <ArticleDetail article={article} /> : <NotFound />
    }

    const themeMatch = pathname.match(/^\/themas\/([^/]+)$/)
    if (themeMatch) {
      const theme = data.themes.find((t) => t.slug === themeMatch[1] && t.published)
      return theme ? <ThemeDetail theme={theme} /> : <NotFound />
    }

    const pageMatch = pathname.match(/^\/pagina\/([^/]+)$/)
    if (pageMatch) {
      const page = data.pages.find((p) => p.slug === pageMatch[1] && p.published)
      return page ? <CustomPageView page={page} /> : <NotFound />
    }

    return <NotFound />
  }, [pathname, data])

  if (!ready) {
    return (
      <body>
        <div style={{ padding: 40, fontFamily: 'system-ui' }}>Laden…</div>
      </body>
    )
  }

  return (
    <body data-once="klaro">
      <a className="visually-hidden focusable skip-link" data-navigate-routes={JSON.stringify(['/#main-content'])}>
        Overslaan en naar de inhoud gaan
      </a>
      <div className="dialog-off-canvas-main-canvas">
        <SiteHeader activePath={pathname} />
        {content}
        <SiteFooter />
      </div>
      <NavLink to="/admin">
        <span className="cms-fab">CMS beheer</span>
      </NavLink>
    </body>
  )
}
