'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { Icon } from './icons'

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
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.4'] })

  // A single payment travels the full width as the section scrolls.
  const fast = variant === 'speed'
  const travel = useTransform(scrollYProgress, fast ? [0.1, 0.45] : [0.1, 0.9], ['0%', '100%'])
  const coinOpacity = useTransform(
    scrollYProgress,
    fast ? [0.05, 0.12, 0.45, 0.52] : [0.05, 0.15, 0.9, 1],
    [0, 1, 1, 0],
  )
  const trackFill = useTransform(scrollYProgress, fast ? [0.1, 0.45] : [0.1, 0.9], ['0%', '100%'])
  const noteOpacity = useTransform(
    scrollYProgress,
    fast ? [0.3, 0.42] : [0.42, 0.55],
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
                    ? 'border-blue-400/45 bg-blue-500/12 text-blue-200'
                    : 'border-foam/12 bg-hull/80 text-mist'
                  : i === 2
                    ? 'border-blue-400/45 bg-blue-500/12 text-blue-200'
                    : 'border-foam/12 bg-hull/80 text-mist')
              }
            >
              <Glyph className="h-5 w-5" />
            </span>
            <span className="text-[0.6875rem] font-semibold tracking-[0.16em] text-fog uppercase">
              {n.label}
            </span>
          </div>
          )
        })}

        {/* Track behind the three nodes */}
        <div className="absolute inset-x-14 top-7 -z-0 h-px -translate-y-1/2 bg-foam/10">
          <motion.div
            data-scroll-fx="track"
            style={{ width: trackFill }}
            className="h-px w-full bg-linear-to-r from-blue-400 to-blue-300"
          />
          <motion.span
            data-scroll-fx="decor"
            style={{ left: travel, opacity: coinOpacity }}
            className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-200 shadow-[0_0_14px_var(--color-blue-300)]"
          />
        </div>
      </div>

      {/* The whole point of the diagram */}
      <motion.div
        data-scroll-fx="reveal"
        style={{ opacity: noteOpacity }}
        className="mx-auto mt-8 w-fit rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-center"
      >
        <p className="text-[0.8125rem] font-medium text-blue-100">
          {variant === 'fee'
            ? 'There is no hidden fee in between'
            : 'As soon as we receive them'}
        </p>
      </motion.div>
    </div>
  )
}
