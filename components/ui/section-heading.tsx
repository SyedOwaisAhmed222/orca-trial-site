import type { ReactNode } from 'react'
import { Reveal } from './reveal'

/**
 * Every section opens the same way: an index, a label, a hairline that runs to
 * the edge of the grid, then the title. The rule is what stops a left-aligned
 * heading from leaving half the row visually empty.
 */
export function SectionHeading({
  index,
  label,
  title,
  body,
  aside,
  className = '',
}: {
  index: string
  label: string
  title: ReactNode
  body?: ReactNode
  /** Optional content pinned to the right of the body on wide screens. */
  aside?: ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <Reveal>
        <div className="flex items-center gap-4">
          <span className="font-display text-[0.6875rem] font-semibold tracking-[0.14em] text-blue-400 tabular-nums">
            {index}
          </span>
          <span className="section-label">{label}</span>
          <span
            aria-hidden
            className="h-px flex-1 bg-linear-to-r from-ink/16 via-ink/8 to-ink/0"
          />
        </div>
      </Reveal>

      <div className="mt-6 grid gap-x-16 gap-y-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-end">
        <Reveal delay={0.08}>
          <h2 className="max-w-[19ch] font-display text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.04] font-semibold tracking-[-0.035em] text-balance">
            {title}
          </h2>
        </Reveal>

        {body ? (
          <Reveal delay={0.16}>
            <p className="max-w-prose text-[1rem] leading-relaxed text-ink-muted text-pretty lg:pb-1.5">
              {body}
            </p>
          </Reveal>
        ) : null}

        {aside ? (
          <Reveal delay={0.22} className="lg:col-span-2">
            {aside}
          </Reveal>
        ) : null}
      </div>
    </div>
  )
}
