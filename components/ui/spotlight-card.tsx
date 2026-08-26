'use client'

import { useRef, type ReactNode } from 'react'

/**
 * Card that tracks the cursor and paints a soft aqua spotlight beneath it.
 * Position is written to CSS custom properties so the effect costs no re-render.
 */
export function SpotlightCard({
  children,
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  as?: 'div' | 'article' | 'li'
}) {
  const ref = useRef<HTMLDivElement>(null)

  function onMove(e: React.MouseEvent) {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <Tag
      ref={ref as never}
      onMouseMove={onMove}
      className={`group/spot glass ring-glow relative isolate overflow-hidden transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${className}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          background:
            'radial-gradient(340px circle at var(--mx, 50%) var(--my, 50%), color-mix(in oklab, var(--color-aqua-400) 16%, transparent), transparent 72%)',
        }}
      />
      {children}
    </Tag>
  )
}
