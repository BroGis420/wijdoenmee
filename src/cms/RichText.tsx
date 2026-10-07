import React from 'react'

/**
 * Renders plain/Word-friendly text:
 * - blank line = new paragraph
 * - ## / ### headings (auto-inserted when pasting Word titles)
 * - lines starting with - * • = list
 * - **bold** and [text](url) optional
 */
export default function RichText({ text }: { text: string }) {
  if (!text?.trim()) return null

  const normalized = text
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/\u00a0/g, ' ')
    .replace(/^[ \t]+/gm, '')

  const blocks = normalized.split(/\n\n+/)

  return (
    <>
      {blocks.map((block, bi) => {
        const lines = block.split('\n').map((l) => l.trimEnd())
        const first = lines[0]?.trim() || ''

        if (first.startsWith('### ')) {
          return (
            <h3 key={bi} style={{ marginTop: '1.25rem' }}>
              {inline(first.slice(4))}
            </h3>
          )
        }
        if (first.startsWith('## ')) {
          return (
            <h2 key={bi} style={{ marginTop: '1.5rem' }}>
              {inline(first.slice(3))}
            </h2>
          )
        }

        const isList = lines.every(
          (l) => !l.trim() || /^[-*•●]\s+/.test(l.trim()) || /^\d+[.)]\s+/.test(l.trim())
        )
        if (isList && lines.some((l) => /^[-*•●]\s+/.test(l.trim()) || /^\d+[.)]\s+/.test(l.trim()))) {
          return (
            <ul key={bi}>
              {lines
                .filter((l) => l.trim())
                .map((l, li) => (
                  <li key={li}>{inline(l.trim().replace(/^([-*•●]|\d+[.)])\s+/, ''))}</li>
                ))}
            </ul>
          )
        }

        return (
          <p key={bi}>
            {lines.map((l, li) => (
              <React.Fragment key={li}>
                {li > 0 ? <br /> : null}
                {inline(l)}
              </React.Fragment>
            ))}
          </p>
        )
      })}
    </>
  )
}

function inline(s: string): React.ReactNode {
  const parts: React.ReactNode[] = []
  const re = /(\*\*[^*]+\*\*|\[([^\]]+)\]\(([^)]+)\))/g
  let last = 0
  let m: RegExpExecArray | null
  let key = 0
  while ((m = re.exec(s))) {
    if (m.index > last) parts.push(s.slice(last, m.index))
    if (m[0].startsWith('**')) {
      parts.push(<strong key={key++}>{m[0].slice(2, -2)}</strong>)
    } else {
      parts.push(
        <a key={key++} href={m[3]} target="_blank" rel="noopener noreferrer" className="external-link">
          {m[2]}
        </a>
      )
    }
    last = m.index + m[0].length
  }
  if (last < s.length) parts.push(s.slice(last))
  return parts.length ? parts : s
}
