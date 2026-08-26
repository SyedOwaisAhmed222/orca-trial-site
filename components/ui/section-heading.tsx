import type { ReactNode } from 'react'
import { Reveal } from './reveal'

export function SectionHeading({
  label,
  title,
  body,
  align = 'left',
  className = '',
}: {
  label: string
  title: ReactNode
  body?: ReactNode
  align?: 'left' | 'center'
  className?: string
}) {
  const centered = align === 'center'
  return (
    <div
      className={`${centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'} ${className}`}
    >
      <Reveal>
        <span className="section-label">
          <span className="h-px w-8 bg-linear-to-r from-transparent to-aqua-400" />
          {label}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-5 font-display text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-balance">
          {title}
        </h2>
      </Reveal>
      {body ? (
        <Reveal delay={0.16}>
          <p className="mt-5 text-[1.0625rem] leading-relaxed text-mist text-pretty">{body}</p>
        </Reveal>
      ) : null}
    </div>
  )
}
