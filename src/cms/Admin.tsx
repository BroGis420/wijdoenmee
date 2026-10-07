import React, { useMemo, useState } from 'react'
import { useCms } from './store'
import type { Article, CustomPage, FaqItem, MediaItem, NavItem, Theme, Tool } from './types'
import { slugify, uid } from './types'

type Tab =
  | 'dashboard'
  | 'settings'
  | 'nav'
  | 'themes'
  | 'articles'
  | 'tools'
  | 'pages'
  | 'media'
  | 'export'

const shell: React.CSSProperties = {
  display: 'flex',
  minHeight: '100vh',
  fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
  background: '#FFFFFF',
  color: '#171717',
}

const sidebar: React.CSSProperties = {
  width: 260,
  background: '#116296',
  color: '#fff',
  padding: '1.25rem 0',
  flexShrink: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  boxShadow: '8px 0 32px rgba(17, 98, 150, 0.12)',
}

const main: React.CSSProperties = {
  flex: 1,
  padding: '2rem 2.25rem 3rem',
  overflow: 'auto',
  maxHeight: '100vh',
  background: 'linear-gradient(180deg, #EAF5FC 0%, #FFFFFF 28%)',
}

const card: React.CSSProperties = {
  background: '#fff',
  borderRadius: 16,
  padding: '1.35rem 1.5rem',
  boxShadow: '0 8px 24px rgba(17, 98, 150, 0.08)',
  marginBottom: '1rem',
  border: '1px solid rgba(24, 138, 209, 0.1)',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.7rem 0.85rem',
  borderRadius: 12,
  border: '1.5px solid rgba(23, 23, 23, 0.12)',
  fontFamily: 'inherit',
  fontSize: 14,
  boxSizing: 'border-box',
  background: '#fff',
  color: '#171717',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 13,
  fontWeight: 700,
  marginBottom: 6,
  color: '#171717',
}

const hintStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 12,
  fontWeight: 500,
  color: '#595959',
  marginTop: 4,
  lineHeight: 1.4,
}

const btnPrimary: React.CSSProperties = {
  background: '#FECB01',
  color: '#171717',
  border: '1.5px solid #171717',
  borderRadius: 50,
  padding: '0.6rem 1.2rem',
  fontWeight: 700,
  cursor: 'pointer',
  fontFamily: 'inherit',
  fontSize: 14,
}

const btnGhost: React.CSSProperties = {
  background: '#fff',
  color: '#116296',
  border: '1.5px solid rgba(17, 98, 150, 0.35)',
  borderRadius: 50,
  padding: '0.55rem 1.05rem',
  fontWeight: 600,
  cursor: 'pointer',
  fontFamily: 'inherit',
  fontSize: 13,
}

const btnDanger: React.CSSProperties = {
  ...btnGhost,
  color: '#b42318',
  borderColor: 'rgba(180, 35, 24, 0.45)',
}

const table: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: 14,
}

function Field({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={labelStyle}>{label}</label>
      {children}
      {hint ? <span style={hintStyle}>{hint}</span> : null}
    </div>
  )
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} style={{ ...inputStyle, ...props.style }} />
}

function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} style={{ ...inputStyle, minHeight: 100, resize: 'vertical', ...props.style }} />
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} style={{ ...inputStyle, ...props.style }} />
}

function Row({ children }: { children: React.ReactNode }) {
  return <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>{children}</div>
}

function goPublic() {
  window.history.pushState(null, '', '/')
  window.dispatchEvent(new PopStateEvent('popstate'))
}

/* ---------- editors ---------- */

function SettingsEditor() {
  const { data, updateSettings, updateColors } = useCms()
  const s = data.settings
  return (
    <div>
      <h1 style={{ marginTop: 0, color: '#116296' }}>Site-instellingen</h1>
      <p style={{ color: '#595959', marginTop: -4, maxWidth: 560 }}>
        Hier pas je de vaste teksten en kleuren van de website aan. Alles wordt meteen bewaard in je browser.
      </p>
      <div style={card}>
        <h3 style={{ marginTop: 0 }}>Identiteit</h3>
        <Field label="Sitenaam" hint="Verschijnt in de browser-tab en als titel van dit CMS.">
          <TextInput value={s.siteName} onChange={(e) => updateSettings({ siteName: e.target.value })} />
        </Field>
        <Row>
          <div style={{ flex: 1, minWidth: 140 }}>
            <Field label="Logo-tekst (regel 1)" hint="Alleen als backup; de site toont het echte logo-beeld.">
              <TextInput value={s.logoLine1} onChange={(e) => updateSettings({ logoLine1: e.target.value })} />
            </Field>
          </div>
          <div style={{ flex: 1, minWidth: 140 }}>
            <Field label="Logo-tekst (regel 2)">
              <TextInput value={s.logoLine2} onChange={(e) => updateSettings({ logoLine2: e.target.value })} />
            </Field>
          </div>
          <div style={{ flex: 1, minWidth: 140 }}>
            <Field label="Ondertitel bij logo" hint='Bijv. "rond Gent" — gele chip onder het logo.'>
              <TextInput value={s.logoLine3} onChange={(e) => updateSettings({ logoLine3: e.target.value })} />
            </Field>
          </div>
        </Row>
      </div>
      <div style={card}>
        <h3 style={{ marginTop: 0 }}>Homepage</h3>
        <Field label="Grote titel bovenaan" hint="De hoofdvraag of boodschap op de home.">
          <TextInput value={s.homeTitle} onChange={(e) => updateSettings({ homeTitle: e.target.value })} />
        </Field>
        <Field label="Korte uitleg eronder" hint="Elke Enter = nieuwe regel.">
          <TextArea value={s.homeIntro} onChange={(e) => updateSettings({ homeIntro: e.target.value })} />
        </Field>
        <Field label="Titel van de inspiratie-sectie">
          <TextInput value={s.homeSectionTitle} onChange={(e) => updateSettings({ homeSectionTitle: e.target.value })} />
        </Field>
        <Row>
          <div style={{ flex: 1 }}>
            <Field label="Knoptekst “meer lezen”">
              <TextInput value={s.homeSectionCta} onChange={(e) => updateSettings({ homeSectionCta: e.target.value })} />
            </Field>
          </div>
          <div style={{ flex: 1 }}>
            <Field label="Link van die knop" hint="Meestal /inspiratie">
              <TextInput value={s.homeSectionCtaRoute} onChange={(e) => updateSettings({ homeSectionCtaRoute: e.target.value })} />
            </Field>
          </div>
        </Row>
      </div>
      <div style={card}>
        <h3 style={{ marginTop: 0 }}>Kleuren</h3>
        <p style={{ ...hintStyle, marginBottom: 12 }}>
          Tip: blauw = hoofdkleur, geel = accent. Wijzig alleen als je zeker bent — de huisstijl is al ingesteld.
        </p>
        <Row>
          {(
            [
              ['primary', 'Hoofdkleur (blauw)'],
              ['primaryDark', 'Donkerblauw'],
              ['accent', 'Accent (geel)'],
              ['secondary', 'Lichte achtergrond'],
              ['link', 'Linkkleur'],
            ] as const
          ).map(([key, label]) => (
            <div key={key} style={{ minWidth: 140 }}>
              <Field label={label}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <input
                    type="color"
                    value={s.colors[key]}
                    onChange={(e) => updateColors({ [key]: e.target.value })}
                    style={{ width: 42, height: 36, border: 'none', background: 'none', cursor: 'pointer' }}
                  />
                  <TextInput
                    value={s.colors[key]}
                    onChange={(e) => updateColors({ [key]: e.target.value })}
                    style={{ width: 100 }}
                  />
                </div>
              </Field>
            </div>
          ))}
        </Row>
      </div>
      <div style={card}>
        <h3 style={{ marginTop: 0 }}>Footer</h3>
        <Field label="Copyright-regel">
          <TextInput value={s.footerCopyright} onChange={(e) => updateSettings({ footerCopyright: e.target.value })} />
        </Field>
        <Field label="Credit-regel" hint='Bijv. "gemaakt door Lieven :)" — feestelijke hover op de site.'>
          <TextInput value={s.footerCredit} onChange={(e) => updateSettings({ footerCredit: e.target.value })} />
        </Field>
      </div>
    </div>
  )
}

function NavEditor({ kind }: { kind: 'nav' | 'footer' }) {
  const { data, setNav, setFooterLinks } = useCms()
  const items = kind === 'nav' ? data.nav : data.footerLinks
  const setItems = kind === 'nav' ? setNav : setFooterLinks

  const update = (id: string, patch: Partial<NavItem>) => {
    setItems(items.map((i) => (i.id === id ? { ...i, ...patch } : i)))
  }

  return (
    <div>
      <h1 style={{ marginTop: 0, color: '#116296' }}>{kind === 'nav' ? 'Menu bovenaan' : 'Links onderaan (footer)'}</h1>
      <div style={card}>
        <table style={table}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid #eee' }}>
              <th style={{ padding: 8 }}>Label</th>
              <th style={{ padding: 8 }}>Route</th>
              <th style={{ padding: 8 }}>Volgorde</th>
              <th style={{ padding: 8 }} />
            </tr>
          </thead>
          <tbody>
            {[...items]
              .sort((a, b) => a.order - b.order)
              .map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: 8 }}>
                    <TextInput value={item.label} onChange={(e) => update(item.id, { label: e.target.value })} />
                  </td>
                  <td style={{ padding: 8 }}>
                    <TextInput value={item.route} onChange={(e) => update(item.id, { route: e.target.value })} />
                  </td>
                  <td style={{ padding: 8, width: 80 }}>
                    <TextInput
                      type="number"
                      value={item.order}
                      onChange={(e) => update(item.id, { order: Number(e.target.value) })}
                    />
                  </td>
                  <td style={{ padding: 8 }}>
                    <button type="button" style={btnDanger} onClick={() => setItems(items.filter((i) => i.id !== item.id))}>
                      Verwijder
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div style={{ marginTop: 12 }}>
          <button
            type="button"
            style={btnPrimary}
            onClick={() =>
              setItems([
                ...items,
                { id: uid('nav'), label: 'Nieuw', route: '/', order: items.length },
              ])
            }
          >
            + Item toevoegen
          </button>
        </div>
      </div>
    </div>
  )
}

function ThemeEditor() {
  const { data, saveTheme, deleteTheme } = useCms()
  const [edit, setEdit] = useState<Theme | null>(null)

  const blank = (): Theme => ({
    id: uid('theme'),
    title: '',
    slug: '',
    intro: '',
    imageUrl: data.media[0]?.url || '',
    imageAlt: '',
    published: true,
    order: data.themes.length,
    faqs: [],
    deepdives: [],
  })

  return (
    <div>
      <h1 style={{ marginTop: 0, color: '#116296' }}>Thema&apos;s</h1>
      {!edit ? (
        <div style={card}>
          <Row>
            <button type="button" style={btnPrimary} onClick={() => setEdit(blank())}>
              + Nieuw thema
            </button>
          </Row>
          <table style={{ ...table, marginTop: 16 }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid #eee' }}>
                <th style={{ padding: 8 }}>Titel</th>
                <th style={{ padding: 8 }}>Slug</th>
                <th style={{ padding: 8 }}>Status</th>
                <th style={{ padding: 8 }} />
              </tr>
            </thead>
            <tbody>
              {[...data.themes]
                .sort((a, b) => a.order - b.order)
                .map((t) => (
                  <tr key={t.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: 8 }}>{t.title}</td>
                    <td style={{ padding: 8 }}>/themas/{t.slug}</td>
                    <td style={{ padding: 8 }}>{t.published ? 'Live' : 'Concept'}</td>
                    <td style={{ padding: 8 }}>
                      <Row>
                        <button type="button" style={btnGhost} onClick={() => setEdit({ ...t })}>
                          Bewerk
                        </button>
                        <button type="button" style={btnDanger} onClick={() => deleteTheme(t.id)}>
                          Verwijder
                        </button>
                      </Row>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={card}>
          <Field label="Titel">
            <TextInput
              value={edit.title}
              onChange={(e) => {
                const title = e.target.value
                setEdit({ ...edit, title, slug: edit.slug || slugify(title) })
              }}
            />
          </Field>
          <Field label="Slug (URL)">
            <TextInput value={edit.slug} onChange={(e) => setEdit({ ...edit, slug: slugify(e.target.value) })} />
          </Field>
          <Field label="Intro">
            <TextArea value={edit.intro} onChange={(e) => setEdit({ ...edit, intro: e.target.value })} />
          </Field>
          <Field label="Afbeelding URL">
            <TextInput value={edit.imageUrl} onChange={(e) => setEdit({ ...edit, imageUrl: e.target.value })} />
          </Field>
          {data.media.length ? (
            <Field label="Of kies uit mediabibliotheek">
              <Select value={edit.imageUrl} onChange={(e) => setEdit({ ...edit, imageUrl: e.target.value })}>
                <option value="">—</option>
                {data.media.map((m) => (
                  <option key={m.id} value={m.url}>
                    {m.name}
                  </option>
                ))}
              </Select>
            </Field>
          ) : null}
          <Field label="Alt-tekst">
            <TextInput value={edit.imageAlt} onChange={(e) => setEdit({ ...edit, imageAlt: e.target.value })} />
          </Field>
          <Field label="Volgorde">
            <TextInput
              type="number"
              value={edit.order}
              onChange={(e) => setEdit({ ...edit, order: Number(e.target.value) })}
            />
          </Field>
          <label style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 16 }}>
            <input
              type="checkbox"
              checked={edit.published}
              onChange={(e) => setEdit({ ...edit, published: e.target.checked })}
            />
            Gepubliceerd
          </label>
          <Row>
            <button
              type="button"
              style={btnPrimary}
              onClick={() => {
                saveTheme(edit)
                setEdit(null)
              }}
            >
              Opslaan
            </button>
            <button type="button" style={btnGhost} onClick={() => setEdit(null)}>
              Annuleren
            </button>
          </Row>
        </div>
      )}
    </div>
  )
}

function ArticleEditor() {
  const { data, saveArticle, deleteArticle } = useCms()
  const [edit, setEdit] = useState<Article | null>(null)
  const themeNames = data.themes.map((t) => t.title)

  const blank = (): Article => ({
    id: uid('art'),
    title: '',
    slug: '',
    description: '',
    source: '',
    themes: [],
    body: '',
    imageUrl: data.media[0]?.url || '',
    imageAlt: '',
    videoUrl: '',
    published: true,
    featured: false,
    faqs: [],
    relatedToolSlugs: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })

  const toggleTheme = (name: string) => {
    if (!edit) return
    const has = edit.themes.includes(name)
    setEdit({
      ...edit,
      themes: has ? edit.themes.filter((t) => t !== name) : [...edit.themes, name],
    })
  }

  const updateFaq = (id: string, patch: Partial<FaqItem>) => {
    if (!edit) return
    setEdit({
      ...edit,
      faqs: edit.faqs.map((f) => (f.id === id ? { ...f, ...patch } : f)),
    })
  }

  return (
    <div>
      <h1 style={{ marginTop: 0, color: '#116296' }}>Artikels / Inspiratie</h1>
      {!edit ? (
        <div style={card}>
          <button type="button" style={btnPrimary} onClick={() => setEdit(blank())}>
            + Nieuw artikel
          </button>
          <table style={{ ...table, marginTop: 16 }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid #eee' }}>
                <th style={{ padding: 8 }}>Titel</th>
                <th style={{ padding: 8 }}>Featured</th>
                <th style={{ padding: 8 }}>Status</th>
                <th style={{ padding: 8 }} />
              </tr>
            </thead>
            <tbody>
              {data.articles.map((a) => (
                <tr key={a.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: 8 }}>{a.title}</td>
                  <td style={{ padding: 8 }}>{a.featured ? '★' : '—'}</td>
                  <td style={{ padding: 8 }}>{a.published ? 'Live' : 'Concept'}</td>
                  <td style={{ padding: 8 }}>
                    <Row>
                      <button type="button" style={btnGhost} onClick={() => setEdit({ ...a })}>
                        Bewerk
                      </button>
                      <button type="button" style={btnDanger} onClick={() => deleteArticle(a.id)}>
                        Verwijder
                      </button>
                    </Row>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={card}>
          <Field label="Titel">
            <TextInput
              value={edit.title}
              onChange={(e) => {
                const title = e.target.value
                setEdit({ ...edit, title, slug: edit.slug && edit.slug !== slugify(edit.title) ? edit.slug : slugify(title) })
              }}
            />
          </Field>
          <Field label="Slug → /inspiratie/...">
            <TextInput value={edit.slug} onChange={(e) => setEdit({ ...edit, slug: slugify(e.target.value) })} />
          </Field>
          <Field label="Korte beschrijving (teaser)">
            <TextArea value={edit.description} onChange={(e) => setEdit({ ...edit, description: e.target.value })} />
          </Field>
          <Field label="Bron / organisatie">
            <TextInput value={edit.source} onChange={(e) => setEdit({ ...edit, source: e.target.value })} />
          </Field>
          <Field label="Thema's">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {themeNames.map((name) => (
                <label
                  key={name}
                  style={{
                    display: 'inline-flex',
                    gap: 6,
                    alignItems: 'center',
                    background: edit.themes.includes(name) ? '#d8f0eb' : '#f0f0f0',
                    borderRadius: 50,
                    padding: '0.35rem 0.75rem',
                    fontSize: 13,
                    cursor: 'pointer',
                  }}
                >
                  <input type="checkbox" checked={edit.themes.includes(name)} onChange={() => toggleTheme(name)} />
                  {name}
                </label>
              ))}
            </div>
          </Field>
          <Field label="Body (paragrafen scheiden met lege regel)">
            <TextArea
              value={edit.body}
              onChange={(e) => setEdit({ ...edit, body: e.target.value })}
              style={{ minHeight: 180 }}
            />
          </Field>
          <Field label="Afbeelding URL">
            <TextInput value={edit.imageUrl} onChange={(e) => setEdit({ ...edit, imageUrl: e.target.value })} />
          </Field>
          <Field label="Mediabibliotheek">
            <Select value={edit.imageUrl} onChange={(e) => setEdit({ ...edit, imageUrl: e.target.value })}>
              <option value="">—</option>
              {data.media.map((m) => (
                <option key={m.id} value={m.url}>
                  {m.name}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Alt-tekst">
            <TextInput value={edit.imageAlt} onChange={(e) => setEdit({ ...edit, imageAlt: e.target.value })} />
          </Field>
          <Field label="Video URL (optioneel)">
            <TextInput value={edit.videoUrl} onChange={(e) => setEdit({ ...edit, videoUrl: e.target.value })} />
          </Field>
          <Row>
            <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input
                type="checkbox"
                checked={edit.published}
                onChange={(e) => setEdit({ ...edit, published: e.target.checked })}
              />
              Gepubliceerd
            </label>
            <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input
                type="checkbox"
                checked={edit.featured}
                onChange={(e) => setEdit({ ...edit, featured: e.target.checked })}
              />
              Op homepage
            </label>
          </Row>
          <h3 style={{ marginTop: 24 }}>FAQ&apos;s</h3>
          {edit.faqs.map((f) => (
            <div key={f.id} style={{ border: '1px solid #eee', borderRadius: 12, padding: 12, marginBottom: 10 }}>
              <Field label="Vraag">
                <TextInput value={f.question} onChange={(e) => updateFaq(f.id, { question: e.target.value })} />
              </Field>
              <Field label="Antwoord">
                <TextArea value={f.answer} onChange={(e) => updateFaq(f.id, { answer: e.target.value })} />
              </Field>
              <button
                type="button"
                style={btnDanger}
                onClick={() => setEdit({ ...edit, faqs: edit.faqs.filter((x) => x.id !== f.id) })}
              >
                FAQ verwijderen
              </button>
            </div>
          ))}
          <button
            type="button"
            style={{ ...btnGhost, marginBottom: 16 }}
            onClick={() =>
              setEdit({
                ...edit,
                faqs: [...edit.faqs, { id: uid('faq'), question: '', answer: '' }],
              })
            }
          >
            + FAQ toevoegen
          </button>
          <Row>
            <button
              type="button"
              style={btnPrimary}
              onClick={() => {
                saveArticle({ ...edit, updatedAt: new Date().toISOString() })
                setEdit(null)
              }}
            >
              Opslaan
            </button>
            <button type="button" style={btnGhost} onClick={() => setEdit(null)}>
              Annuleren
            </button>
          </Row>
        </div>
      )}
    </div>
  )
}

function ToolEditor() {
  const { data, saveTool, deleteTool } = useCms()
  const [edit, setEdit] = useState<Tool | null>(null)
  const themeNames = data.themes.map((t) => t.title)

  const blank = (): Tool => ({
    id: uid('tool'),
    title: '',
    slug: '',
    description: '',
    themes: [],
    imageUrl: data.media[0]?.url || '',
    imageAlt: '',
    body: '',
    summary: [],
    downloadLabel: '',
    downloadUrl: '',
    externalUrl: '',
    faqs: [],
    published: true,
    order: data.tools.length,
  })

  return (
    <div>
      <h1 style={{ marginTop: 0, color: '#116296' }}>Tools</h1>
      {!edit ? (
        <div style={card}>
          <button type="button" style={btnPrimary} onClick={() => setEdit(blank())}>
            + Nieuwe tool
          </button>
          <table style={{ ...table, marginTop: 16 }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid #eee' }}>
                <th style={{ padding: 8 }}>Titel</th>
                <th style={{ padding: 8 }}>Thema&apos;s</th>
                <th style={{ padding: 8 }}>Status</th>
                <th style={{ padding: 8 }} />
              </tr>
            </thead>
            <tbody>
              {[...data.tools]
                .sort((a, b) => a.order - b.order)
                .map((t) => (
                  <tr key={t.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: 8 }}>{t.title}</td>
                    <td style={{ padding: 8 }}>{t.themes.join(', ')}</td>
                    <td style={{ padding: 8 }}>{t.published ? 'Live' : 'Concept'}</td>
                    <td style={{ padding: 8 }}>
                      <Row>
                        <button type="button" style={btnGhost} onClick={() => setEdit({ ...t })}>
                          Bewerk
                        </button>
                        <button type="button" style={btnDanger} onClick={() => deleteTool(t.id)}>
                          Verwijder
                        </button>
                      </Row>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={card}>
          <Field label="Titel">
            <TextInput
              value={edit.title}
              onChange={(e) => {
                const title = e.target.value
                setEdit({ ...edit, title, slug: edit.slug || slugify(title) })
              }}
            />
          </Field>
          <Field label="Slug → /tools/...">
            <TextInput value={edit.slug} onChange={(e) => setEdit({ ...edit, slug: slugify(e.target.value) })} />
          </Field>
          <Field label="Beschrijving">
            <TextArea value={edit.description} onChange={(e) => setEdit({ ...edit, description: e.target.value })} />
          </Field>
          <Field label="Body (markdown)">
            <TextArea value={edit.body || ''} onChange={(e) => setEdit({ ...edit, body: e.target.value })} style={{ minHeight: 140 }} />
          </Field>
          <Field label="Thema's">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {themeNames.map((name) => (
                <label
                  key={name}
                  style={{
                    display: 'inline-flex',
                    gap: 6,
                    alignItems: 'center',
                    background: edit.themes.includes(name) ? '#d8f0eb' : '#f0f0f0',
                    borderRadius: 50,
                    padding: '0.35rem 0.75rem',
                    fontSize: 13,
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={edit.themes.includes(name)}
                    onChange={() => {
                      const has = edit.themes.includes(name)
                      setEdit({
                        ...edit,
                        themes: has ? edit.themes.filter((t) => t !== name) : [...edit.themes, name],
                      })
                    }}
                  />
                  {name}
                </label>
              ))}
            </div>
          </Field>
          <Field label="Afbeelding URL">
            <TextInput value={edit.imageUrl} onChange={(e) => setEdit({ ...edit, imageUrl: e.target.value })} />
          </Field>
          <Field label="Mediabibliotheek">
            <Select value={edit.imageUrl} onChange={(e) => setEdit({ ...edit, imageUrl: e.target.value })}>
              <option value="">—</option>
              {data.media.map((m) => (
                <option key={m.id} value={m.url}>
                  {m.name}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Externe link (optioneel)">
            <TextInput value={edit.externalUrl} onChange={(e) => setEdit({ ...edit, externalUrl: e.target.value })} />
          </Field>
          <Field label="Volgorde">
            <TextInput
              type="number"
              value={edit.order}
              onChange={(e) => setEdit({ ...edit, order: Number(e.target.value) })}
            />
          </Field>
          <label style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 16 }}>
            <input
              type="checkbox"
              checked={edit.published}
              onChange={(e) => setEdit({ ...edit, published: e.target.checked })}
            />
            Gepubliceerd
          </label>
          <Row>
            <button
              type="button"
              style={btnPrimary}
              onClick={() => {
                saveTool(edit)
                setEdit(null)
              }}
            >
              Opslaan
            </button>
            <button type="button" style={btnGhost} onClick={() => setEdit(null)}>
              Annuleren
            </button>
          </Row>
        </div>
      )}
    </div>
  )
}

function PageEditor() {
  const { data, savePage, deletePage } = useCms()
  const [edit, setEdit] = useState<CustomPage | null>(null)

  const blank = (): CustomPage => ({
    id: uid('page'),
    title: '',
    slug: '',
    type: 'custom',
    bannerTitle: '',
    bannerIntro: '',
    body: '',
    published: true,
    showInNav: false,
    order: data.pages.length,
  })

  return (
    <div>
      <h1 style={{ marginTop: 0, color: '#116296' }}>Pagina&apos;s</h1>
      <p style={{ color: '#666', marginTop: -8 }}>
        Custom pagina&apos;s verschijnen op <code>/pagina/jouw-slug</code>. Koppel ze via navigatie of footer.
      </p>
      {!edit ? (
        <div style={card}>
          <button type="button" style={btnPrimary} onClick={() => setEdit(blank())}>
            + Nieuwe pagina
          </button>
          <table style={{ ...table, marginTop: 16 }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid #eee' }}>
                <th style={{ padding: 8 }}>Titel</th>
                <th style={{ padding: 8 }}>URL</th>
                <th style={{ padding: 8 }}>Status</th>
                <th style={{ padding: 8 }} />
              </tr>
            </thead>
            <tbody>
              {data.pages.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: 8 }}>{p.title}</td>
                  <td style={{ padding: 8 }}>/pagina/{p.slug}</td>
                  <td style={{ padding: 8 }}>{p.published ? 'Live' : 'Concept'}</td>
                  <td style={{ padding: 8 }}>
                    <Row>
                      <button type="button" style={btnGhost} onClick={() => setEdit({ ...p })}>
                        Bewerk
                      </button>
                      <button type="button" style={btnDanger} onClick={() => deletePage(p.id)}>
                        Verwijder
                      </button>
                    </Row>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={card}>
          <Field label="Titel">
            <TextInput
              value={edit.title}
              onChange={(e) => {
                const title = e.target.value
                setEdit({
                  ...edit,
                  title,
                  slug: edit.slug || slugify(title),
                  bannerTitle: edit.bannerTitle || title,
                })
              }}
            />
          </Field>
          <Field label="Slug">
            <TextInput value={edit.slug} onChange={(e) => setEdit({ ...edit, slug: slugify(e.target.value) })} />
          </Field>
          <Field label="Banner titel">
            <TextInput value={edit.bannerTitle} onChange={(e) => setEdit({ ...edit, bannerTitle: e.target.value })} />
          </Field>
          <Field label="Banner intro">
            <TextArea value={edit.bannerIntro} onChange={(e) => setEdit({ ...edit, bannerIntro: e.target.value })} />
          </Field>
          <Field label="Inhoud (paragrafen met lege regel)">
            <TextArea
              value={edit.body}
              onChange={(e) => setEdit({ ...edit, body: e.target.value })}
              style={{ minHeight: 200 }}
            />
          </Field>
          <label style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 16 }}>
            <input
              type="checkbox"
              checked={edit.published}
              onChange={(e) => setEdit({ ...edit, published: e.target.checked })}
            />
            Gepubliceerd
          </label>
          <Row>
            <button
              type="button"
              style={btnPrimary}
              onClick={() => {
                savePage(edit)
                setEdit(null)
              }}
            >
              Opslaan
            </button>
            <button type="button" style={btnGhost} onClick={() => setEdit(null)}>
              Annuleren
            </button>
          </Row>
        </div>
      )}
    </div>
  )
}

function MediaEditor() {
  const { data, saveMedia, deleteMedia } = useCms()
  const [edit, setEdit] = useState<MediaItem | null>(null)

  return (
    <div>
      <h1 style={{ marginTop: 0, color: '#116296' }}>Media</h1>
      <p style={{ color: '#666' }}>
        Voeg afbeeldings-URL&apos;s toe (bestaande <code>/images/...</code> of externe links). Upload naar een host en plak de URL.
      </p>
      <div style={card}>
        <button
          type="button"
          style={btnPrimary}
          onClick={() => setEdit({ id: uid('media'), name: '', url: '', alt: '' })}
        >
          + Media toevoegen
        </button>
        {edit ? (
          <div style={{ marginTop: 16, borderTop: '1px solid #eee', paddingTop: 16 }}>
            <Field label="Naam">
              <TextInput value={edit.name} onChange={(e) => setEdit({ ...edit, name: e.target.value })} />
            </Field>
            <Field label="URL">
              <TextInput value={edit.url} onChange={(e) => setEdit({ ...edit, url: e.target.value })} />
            </Field>
            <Field label="Alt">
              <TextInput value={edit.alt} onChange={(e) => setEdit({ ...edit, alt: e.target.value })} />
            </Field>
            <Row>
              <button
                type="button"
                style={btnPrimary}
                onClick={() => {
                  saveMedia(edit)
                  setEdit(null)
                }}
              >
                Opslaan
              </button>
              <button type="button" style={btnGhost} onClick={() => setEdit(null)}>
                Annuleren
              </button>
            </Row>
          </div>
        ) : null}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
            gap: 12,
            marginTop: 20,
          }}
        >
          {data.media.map((m) => (
            <div
              key={m.id}
              style={{
                border: '1px solid #eee',
                borderRadius: 12,
                overflow: 'hidden',
                background: '#fafafa',
              }}
            >
              <div
                style={{
                  height: 90,
                  background: `#eee url(${m.url}) center/cover no-repeat`,
                }}
              />
              <div style={{ padding: 8, fontSize: 12 }}>
                <div style={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.name}</div>
                <Row>
                  <button type="button" style={{ ...btnGhost, padding: '2px 8px', fontSize: 11 }} onClick={() => setEdit(m)}>
                    Bewerk
                  </button>
                  <button
                    type="button"
                    style={{ ...btnDanger, padding: '2px 8px', fontSize: 11 }}
                    onClick={() => deleteMedia(m.id)}
                  >
                    ×
                  </button>
                </Row>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ExportPanel() {
  const { exportJson, importJson, resetToSeed } = useCms()
  const [raw, setRaw] = useState('')
  const [msg, setMsg] = useState('')

  return (
    <div>
      <h1 style={{ marginTop: 0, color: '#116296' }}>Import / Export</h1>
      <div style={card}>
        <h3>Export</h3>
        <p>Download alle content als JSON-backup.</p>
        <button
          type="button"
          style={btnPrimary}
          onClick={() => {
            const blob = new Blob([exportJson()], { type: 'application/json' })
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `wijdoenmee-cms-${new Date().toISOString().slice(0, 10)}.json`
            a.click()
            URL.revokeObjectURL(url)
          }}
        >
          Download JSON
        </button>
      </div>
      <div style={card}>
        <h3>Import</h3>
        <TextArea value={raw} onChange={(e) => setRaw(e.target.value)} placeholder="Plak JSON hier…" style={{ minHeight: 160 }} />
        <Row>
          <button
            type="button"
            style={btnPrimary}
            onClick={() => {
              const ok = importJson(raw)
              setMsg(ok ? 'Import geslaagd.' : 'Ongeldige JSON.')
            }}
          >
            Importeren
          </button>
          <button
            type="button"
            style={btnDanger}
            onClick={() => {
              if (confirm('Alle CMS-data terugzetten naar de standaard content?')) {
                resetToSeed()
                setMsg('Teruggezet naar standaard.')
              }
            }}
          >
            Reset naar standaard
          </button>
        </Row>
        {msg ? <p style={{ color: '#116296', fontWeight: 600 }}>{msg}</p> : null}
      </div>
    </div>
  )
}

function Dashboard({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
  const { data } = useCms()
  const primary = [
    {
      tab: 'articles' as Tab,
      title: 'Artikels',
      count: data.articles.length,
      text: 'Schrijf of pas inspiratieverhalen aan.',
    },
    {
      tab: 'tools' as Tab,
      title: 'Tools',
      count: data.tools.length,
      text: 'Beheer downloads en hulpmiddelen.',
    },
    {
      tab: 'themes' as Tab,
      title: "Thema's",
      count: data.themes.length,
      text: 'De kaarten op de homepage.',
    },
  ]

  return (
    <div style={{ maxWidth: 720 }}>
      <h1 style={{ margin: '0 0 10px', color: '#116296', fontSize: 26, fontWeight: 800 }}>Hallo 👋</h1>
      <p style={{ color: '#595959', lineHeight: 1.6, margin: '0 0 28px', fontSize: 16 }}>
        Wat wil je vandaag doen? Kies één van de drie. Meer opties staan links in het menu.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
        {primary.map((item) => (
          <button
            key={item.tab}
            type="button"
            onClick={() => onNavigate(item.tab)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              width: '100%',
              textAlign: 'left',
              background: '#fff',
              border: '1px solid rgba(24, 138, 209, 0.12)',
              borderRadius: 16,
              padding: '1.15rem 1.35rem',
              cursor: 'pointer',
              fontFamily: 'inherit',
              boxShadow: '0 4px 16px rgba(17, 98, 150, 0.06)',
            }}
          >
            <div
              style={{
                minWidth: 52,
                height: 52,
                borderRadius: 14,
                background: '#EAF5FC',
                color: '#116296',
                fontWeight: 800,
                fontSize: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {item.count}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: 17, color: '#171717' }}>{item.title}</div>
              <div style={{ fontSize: 14, color: '#595959', marginTop: 2 }}>{item.text}</div>
            </div>
            <div style={{ color: '#116296', fontWeight: 700, fontSize: 18 }}>→</div>
          </button>
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 10,
          alignItems: 'center',
          paddingTop: 8,
          borderTop: '1px solid rgba(23, 23, 23, 0.08)',
        }}
      >
        <button type="button" style={btnPrimary} onClick={goPublic}>
          Bekijk website
        </button>
        <button type="button" style={btnGhost} onClick={() => onNavigate('pages')}>
          Pagina&apos;s
        </button>
        <button type="button" style={btnGhost} onClick={() => onNavigate('settings')}>
          Instellingen
        </button>
      </div>
    </div>
  )
}

/** Primary nav first; secondary only when needed */
const NAV_PRIMARY: { id: Tab; label: string }[] = [
  { id: 'dashboard', label: 'Start' },
  { id: 'articles', label: 'Artikels' },
  { id: 'tools', label: 'Tools' },
  { id: 'themes', label: "Thema's" },
  { id: 'pages', label: "Pagina's" },
]

const NAV_MORE: { id: Tab; label: string }[] = [
  { id: 'media', label: 'Media' },
  { id: 'nav', label: 'Menu & footer' },
  { id: 'settings', label: 'Instellingen' },
  { id: 'export', label: 'Backup' },
]

export default function Admin() {
  const [tab, setTab] = useState<Tab>('dashboard')
  const [showMore, setShowMore] = useState(false)
  const { data } = useCms()

  React.useEffect(() => {
    document.title = `CMS — ${data.settings.siteName}`
  }, [data.settings.siteName])

  React.useEffect(() => {
    if (NAV_MORE.some((t) => t.id === tab)) setShowMore(true)
  }, [tab])

  const body = useMemo(() => {
    switch (tab) {
      case 'dashboard':
        return <Dashboard onNavigate={setTab} />
      case 'settings':
        return <SettingsEditor />
      case 'nav':
        return (
          <>
            <NavEditor kind="nav" />
            <div style={{ height: 16 }} />
            <NavEditor kind="footer" />
          </>
        )
      case 'themes':
        return <ThemeEditor />
      case 'articles':
        return <ArticleEditor />
      case 'tools':
        return <ToolEditor />
      case 'pages':
        return <PageEditor />
      case 'media':
        return <MediaEditor />
      case 'export':
        return <ExportPanel />
      default:
        return null
    }
  }, [tab])

  const navBtn = (t: { id: Tab; label: string }) => (
    <button
      key={t.id}
      type="button"
      onClick={() => setTab(t.id)}
      style={{
        background: tab === t.id ? '#FECB01' : 'transparent',
        color: tab === t.id ? '#171717' : '#fff',
        border: 'none',
        textAlign: 'left',
        padding: '0.7rem 1.25rem',
        cursor: 'pointer',
        fontFamily: 'inherit',
        fontSize: 15,
        fontWeight: tab === t.id ? 800 : 500,
        borderRadius: 0,
      }}
    >
      {t.label}
    </button>
  )

  return (
    <body style={{ margin: 0 }}>
      <div style={shell}>
        <aside style={sidebar}>
          <div style={{ padding: '0.25rem 1.25rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
            <div style={{ fontWeight: 800, fontSize: 14, lineHeight: 1.35, opacity: 0.95 }}>Wij doen mee</div>
            <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>rond Gent · CMS</div>
          </div>

          <div style={{ paddingTop: 8 }}>{NAV_PRIMARY.map(navBtn)}</div>

          <div style={{ marginTop: 12, padding: '0 1.25rem' }}>
            <button
              type="button"
              onClick={() => setShowMore((v) => !v)}
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.08)',
                color: '#fff',
                border: 'none',
                borderRadius: 10,
                padding: '0.55rem 0.75rem',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: 13,
                fontWeight: 600,
                textAlign: 'left',
              }}
            >
              {showMore ? 'Minder ▲' : 'Meer… ▼'}
            </button>
          </div>

          {showMore ? <div style={{ paddingTop: 6 }}>{NAV_MORE.map(navBtn)}</div> : null}

          <div style={{ marginTop: 'auto', padding: '1rem 1.25rem' }}>
            <button
              type="button"
              onClick={goPublic}
              style={{
                width: '100%',
                background: '#FECB01',
                color: '#171717',
                border: '1.5px solid #171717',
                borderRadius: 50,
                padding: '0.7rem',
                fontWeight: 800,
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: 14,
              }}
            >
              ← Website
            </button>
          </div>
        </aside>
        <main style={main}>{body}</main>
      </div>
    </body>
  )
}
