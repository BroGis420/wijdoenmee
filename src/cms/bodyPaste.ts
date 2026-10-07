/** Convert Word/Google Docs HTML paste into simple plain text for RichText. */

export function normalizePlainText(raw: string): string {
  return raw
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/\u00a0/g, ' ')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[–—]/g, '-')
    .replace(/^[ \t]+/gm, '')
    .replace(/[ \t]+$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

/** Turn common bullet characters into markdown-ish list lines */
export function normalizeBullets(text: string): string {
  return text
    .split('\n')
    .map((line) => {
      const t = line.trim()
      if (/^[•●○▪◦►▸]\s+/.test(t)) return '- ' + t.replace(/^[•●○▪◦►▸]\s+/, '')
      if (/^\d+[.)]\s+/.test(t)) return t // keep numbered as plain lines
      return line
    })
    .join('\n')
}

/**
 * Convert clipboard HTML (Word, Docs, browsers) to plain text
 * with paragraphs, lists and headings — no user-facing # needed.
 * Headings become lines prefixed with ## / ### for RichText.
 */
export function htmlToBodyText(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  // Remove junk
  doc.querySelectorAll('style, script, meta, link, xml, o\\:p').forEach((n) => n.remove())

  const parts: string[] = []

  const walk = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const v = (node.textContent || '').replace(/\s+/g, ' ')
      if (v.trim()) parts.push(v)
      return
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return
    const el = node as HTMLElement
    const tag = el.tagName.toLowerCase()

    if (tag === 'br') {
      parts.push('\n')
      return
    }

    if (['h1', 'h2'].includes(tag)) {
      const t = (el.textContent || '').trim()
      if (t) {
        parts.push('\n\n')
        parts.push('## ' + t)
        parts.push('\n\n')
      }
      return
    }
    if (tag === 'h3' || tag === 'h4') {
      const t = (el.textContent || '').trim()
      if (t) {
        parts.push('\n\n')
        parts.push('### ' + t)
        parts.push('\n\n')
      }
      return
    }

    if (tag === 'p' || tag === 'div') {
      // Word often wraps everything in divs — treat block as paragraph if it has text
      const before = parts.length
      el.childNodes.forEach(walk)
      if (parts.length > before) {
        parts.push('\n\n')
      }
      return
    }

    if (tag === 'li') {
      const t = (el.textContent || '').trim()
      if (t) parts.push('\n- ' + t)
      return
    }

    if (tag === 'ul' || tag === 'ol') {
      parts.push('\n')
      el.childNodes.forEach(walk)
      parts.push('\n\n')
      return
    }

    if (tag === 'strong' || tag === 'b') {
      const t = (el.textContent || '').trim()
      if (t) parts.push('**' + t + '**')
      return
    }

    if (tag === 'a') {
      const t = (el.textContent || '').trim()
      const href = el.getAttribute('href') || ''
      if (t && href && !href.startsWith('#')) parts.push(`[${t}](${href})`)
      else if (t) parts.push(t)
      return
    }

    el.childNodes.forEach(walk)
  }

  doc.body.childNodes.forEach(walk)

  let out = parts.join('')
  // collapse spaces but keep newlines
  out = out.replace(/[ \t]+\n/g, '\n').replace(/\n[ \t]+/g, '\n')
  out = out.replace(/[ \t]{2,}/g, ' ')
  out = normalizePlainText(out)
  out = normalizeBullets(out)
  return out
}

export function plainToBodyText(plain: string): string {
  return normalizeBullets(normalizePlainText(plain))
}

/** Insert converted paste into textarea value at selection */
export function insertAtSelection(
  value: string,
  start: number,
  end: number,
  insert: string
): { value: string; caret: number } {
  const next = value.slice(0, start) + insert + value.slice(end)
  return { value: next, caret: start + insert.length }
}
