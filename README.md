# Wij doen mee, rond Gent

Prototype website + volledig CMS voor toegankelijke vrijetijdsparticipatie (geïnspireerd op [kommaaraf.be](https://www.kommaaraf.be)).

## Starten

```bash
npm install
# of: bun install
npm run dev
```

Open daarna:
- **Website:** http://localhost:5173/
- **CMS:** http://localhost:5173/admin  
  (of knop “CMS beheer” rechtsonder)

## Wat zit erin

- Publieke site (home, thema’s, tools, inspiratie-artikels, custom pagina’s)
- CMS met localStorage: artikels, tools, thema’s, navigatie, kleuren, media, import/export
- Design: teal/peach/mint + Plus Jakarta Sans

## Scripts

| Commando | Doel |
|----------|------|
| `npm run dev` | Development server |
| `npm run build` | Productie-build naar `dist/` |
| `npm run check-types` | TypeScript check |

## Content

CMS-data start vanuit seed (`src/cms/seed.ts`) en wordt opgeslagen in de browser (`localStorage` key `wijdoenmee_cms_v2`). Via **Import/Export** in het CMS kun je JSON backuppen of herstellen.
