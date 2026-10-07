import React, { useEffect, useMemo, useState } from 'react'
import { useCms } from './store'
import type { Article, CustomPage, FaqItem, Theme, Tool } from './types'
import RichText from './RichText'

function NavLink({ to, children, className }: { to: string; children: React.ReactNode; className?: string }) {
  return (
    <a className={className} data-navigate-routes={JSON.stringify([to])}>
      {children}
    </a>
  )
}

function Logo() {
  const { data } = useCms()
  const s = data.settings
  return (
    <NavLink to="/">
      <span className="logo__text">
        <span className="logo__line">{s.logoLine1}</span>
        <span className="logo__line">{s.logoLine2}</span>
        <span className="logo__sub">{s.logoLine3}</span>
      </span>
    </NavLink>
  )
}

function SiteHeader({ activePath }: { activePath: string }) {
  const { data } = useCms()
  const nav = [...data.nav].sort((a, b) => a.order - b.order)
  const path = activePath.split('?')[0]
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="content">
      <div className="header--large large-only">
        <div className="header__top">
          <div className="logo">
            <Logo />
          </div>
        </div>
        <nav className="nav__main">
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
              <a>
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
        <nav className="nav__main nav__main--small" style={{ display: menuOpen ? 'flex' : 'none' }}>
          <ul className="menu">
            {nav.map((item) => (
              <li key={item.id} className="menu-item">
                <NavLink to={item.route}>
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

function SiteFooter() {
  const { data } = useCms()
  const links = [...data.footerLinks].sort((a, b) => a.order - b.order)
  const mid = Math.ceil(links.length / 2)
  const col1 = links.slice(0, mid)
  const col2 = links.slice(mid)

  return (
    <footer className="full-bleed">
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
          <p>{data.settings.footerCredit}</p>
        </div>
      </div>
    </footer>
  )
}

function ArticleCard({ article }: { article: Article }) {
  const route = `/inspiratie/${article.slug}`
  return (
    <div className="teaser">
      <div className="teaser__img">
        {article.imageUrl ? (
          <img loading="lazy" alt={article.imageAlt || article.title} src={article.imageUrl} width={357} height={238} />
        ) : null}
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
        ) : null}
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
          <NavLink to={route}>Lees meer</NavLink>
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
                    {t.imageUrl ? <img loading="lazy" alt={t.imageAlt || t.title} width={552} height={276} src={t.imageUrl} /> : null}
                    <h2 className="thema__title">
                      <NavLink to={`/themas/${t.slug}`}>
                        <span>{t.title}</span>
                      </NavLink>
                    </h2>
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
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  style={{
                    borderRadius: 50,
                    border: '1px solid #000',
                    padding: '0.5rem 1rem',
                    background: '#fff',
                    fontFamily: 'inherit',
                  }}
                >
                  <option value="all">Alle thema&apos;s</option>
                  {themeOptions.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
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
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  style={{
                    borderRadius: 50,
                    border: '1px solid #000',
                    padding: '0.5rem 1rem',
                    background: '#fff',
                    fontFamily: 'inherit',
                  }}
                >
                  <option value="all">Alle thema&apos;s</option>
                  {themeOptions.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
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
        <span
          style={{
            position: 'fixed',
            right: 16,
            bottom: 16,
            zIndex: 9999,
            background: 'var(--color-green)',
            color: '#fff',
            borderRadius: 50,
            padding: '0.75rem 1.25rem',
            fontWeight: 700,
            fontSize: 14,
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
            cursor: 'pointer',
            fontFamily: 'var(--font-bold)',
          }}
        >
          CMS beheer
        </span>
      </NavLink>
    </body>
  )
}
