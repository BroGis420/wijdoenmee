import React, { useRef } from 'react'
import { htmlToBodyText, insertAtSelection, plainToBodyText } from './bodyPaste'

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.85rem 1rem',
  borderRadius: 12,
  border: '1.5px solid rgba(23, 23, 23, 0.12)',
  fontFamily: 'inherit',
  fontSize: 15,
  lineHeight: 1.55,
  boxSizing: 'border-box',
  background: '#fff',
  color: '#171717',
  minHeight: 200,
  resize: 'vertical',
}

type Props = {
  value: string
  onChange: (v: string) => void
  minHeight?: number
  placeholder?: string
}

/**
 * Beginner-friendly body field: paste from Word/Docs works.
 * Headings/lists are detected from the paste; no # needed.
 */
export default function BodyEditor({ value, onChange, minHeight = 200, placeholder }: Props) {
  const ref = useRef<HTMLTextAreaElement>(null)

  const apply = (next: string, caret?: number) => {
    onChange(next)
    if (caret != null && ref.current) {
      requestAnimationFrame(() => {
        ref.current?.focus()
        ref.current?.setSelectionRange(caret, caret)
      })
    }
  }

  const onPaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const html = e.clipboardData.getData('text/html')
    const plain = e.clipboardData.getData('text/plain')
    let converted = ''
    if (html && /<(p|div|h\d|li|ul|ol|br|span)\b/i.test(html)) {
      converted = htmlToBodyText(html)
    } else if (plain) {
      converted = plainToBodyText(plain)
    }
    if (!converted) return
    e.preventDefault()
    const el = e.currentTarget
    const start = el.selectionStart ?? value.length
    const end = el.selectionEnd ?? value.length
    const { value: next, caret } = insertAtSelection(value, start, end, converted)
    apply(next, caret)
  }

  /** Turn the current line into a section title (no markdown knowledge needed) */
  const makeHeading = () => {
    const el = ref.current
    if (!el) return
    const start = el.selectionStart
    const before = value.slice(0, start)
    const after = value.slice(start)
    const lineStart = before.lastIndexOf('\n') + 1
    const lineEndRel = after.indexOf('\n')
    const lineEnd = lineEndRel === -1 ? value.length : start + lineEndRel
    let line = value.slice(lineStart, lineEnd).trim()
    if (!line) return
    line = line.replace(/^#{1,3}\s+/, '')
    const next = value.slice(0, lineStart) + '## ' + line + value.slice(lineEnd)
    apply(next, lineStart + 3 + line.length)
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
          marginBottom: 8,
          alignItems: 'center',
        }}
      >
        <span style={{ fontSize: 13, color: '#595959', flex: 1, minWidth: 200, lineHeight: 1.4 }}>
          Tip: schrijf in Word of Google Docs en <strong>plak hier</strong>. Alinea’s en lijstjes blijven bewaard.
        </span>
        <button
          type="button"
          onClick={makeHeading}
          style={{
            border: '1.5px solid rgba(17, 98, 150, 0.35)',
            background: '#EAF5FC',
            color: '#116296',
            borderRadius: 999,
            padding: '0.4rem 0.85rem',
            fontWeight: 700,
            fontSize: 13,
            fontFamily: 'inherit',
            cursor: 'pointer',
          }}
          title="Zet de regel waar je cursor staat om naar een tussentitel"
        >
          Regel → tussentitel
        </button>
      </div>
      <textarea
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onPaste={onPaste}
        style={{ ...inputStyle, minHeight }}
        placeholder={
          placeholder ||
          'Plak hier je tekst uit Word…\n\nElke alinea komt onder elkaar.\nVoor een tussentitel: zet de cursor op die regel en klik “Regel → tussentitel”.'
        }
      />
    </div>
  )
}
