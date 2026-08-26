'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { Icon } from './icons'
import { useMounted } from '@/lib/use-mounted'

/**
 * Sponsor → Orca → Site, with the middle node explicitly marked as taking
 * nothing. Dramatises two of Orca's sentences at once:
 *   "There is no hidden fee in between."
 *   "…disburses them as soon as we receive them."
 *
 * The amount is a unit, not a claim about real money.
 */
export function MoneyFlow({ variant = 'fee' }: { variant?: 'fee' | 'speed' }) {
  const ref = useRef<HTMLDivElement>(null)
  const mounted = useMounted()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.95', 'end 0.75'] })

  // A single payment travels the full width as the section scrolls.
  const fast = variant === 'speed'
  const travel = useTransform(scrollYProgress, fast ? [0.08, 0.34] : [0.08, 0.62], ['0%', '100%'])
  const coinOpacity = useTransform(
    scrollYProgress,
    fast ? [0.04, 0.1, 0.34, 0.4] : [0.04, 0.12, 0.62, 0.7],
    [0, 1, 1, 0],
  )
  const trackFill = useTransform(scrollYProgress, fast ? [0.08, 0.34] : [0.08, 0.62], ['0%', '100%'])
  const noteOpacity = useTransform(
    scrollYProgress,
    fast ? [0.24, 0.34] : [0.45, 0.58],
    [0, 1],
  )

  return (
    <div ref={ref} className="relative py-10">
      <div className="relative flex items-center justify-between gap-3">
        {[
          { label: 'Sponsor', icon: 'layers' as const },
          { label: 'Orca', icon: 'shield' as const },
          { label: 'Site', icon: 'badge' as const },
        ].map((n, i) => {
          const Glyph = Icon[n.icon]
          return (
          <div key={n.label} className="relative z-10 flex flex-col items-center gap-3">
            <span
              className={
                'grid h-14 w-14 place-items-center rounded-2xl border backdrop-blur-sm transition-colors ' +
                (variant === 'fee'
                  ? i === 1
                    ? 'border-blue-500 bg-blue-500 text-white'
                    : 'border-ink/12 bg-surface/80 text-ink-muted'
                  : i === 2
                    ? 'border-blue-500 bg-blue-500 text-white'
                    : 'border-line bg-canvas text-ink-muted')
              }
            >
              <Glyph className="h-5 w-5" />
            </span>
            <span className="text-[0.6875rem] font-semibold tracking-[0.16em] text-ink-faint uppercase">
              {n.label}
            </span>
          </div>
          )
        })}

        {/* Track behind the three nodes */}
        <div className="absolute inset-x-14 top-7 -z-0 h-px -translate-y-1/2 bg-line">
          <motion.div
            data-scroll-fx="track"
            style={mounted ? { width: trackFill } : { width: '100%' }}
            className="h-px w-full bg-linear-to-r from-blue-400 to-blue-300"
          />
          <motion.span
            data-scroll-fx="decor"
            style={mounted ? { left: travel, opacity: coinOpacity } : { opacity: 0 }}
            className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600 shadow-[0_0_0_4px_rgba(68,114,196,0.18)]"
          />
        </div>
      </div>

      {/* The whole point of the diagram */}
      <motion.div
        data-scroll-fx="reveal"
        style={mounted ? { opacity: noteOpacity } : undefined}
        className="mx-auto mt-8 w-fit rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-center"
      >
        <p className="text-[0.8125rem] font-semibold text-blue-700">
          {variant === 'fee'
            ? 'There is no hidden fee in between'
            : 'As soon as we receive them'}
        </p>
      </motion.div>
    </div>
  )
}
