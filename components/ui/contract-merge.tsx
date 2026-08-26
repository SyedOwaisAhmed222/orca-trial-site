'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useMounted } from '@/lib/use-mounted'

/**
 * Site cards converge into one contract as the section scrolls. Wordless on
 * purpose — it dramatises Orca's own sentence, "Orca negotiates a single
 * budget and contract for multiple sites under one umbrella", without asking
 * anyone to read it.
 *
 * Offsets are in pixels, not percentages: a percentage on a transform resolves
 * against the element's own box, which piles every card on the centre.
 */

const COUNT = 12
const RX = 260 // horizontal spread, px
const RY = 118 // vertical spread, px

// Deterministic scatter — no Math.random, so SSR and client agree.
const SITES = Array.from({ length: COUNT }, (_, i) => {
  const angle = (i / COUNT) * Math.PI * 2 - Math.PI / 2
  const ring = 0.62 + (i % 3) * 0.19
  return {
    x: Math.cos(angle) * RX * ring,
    y: Math.sin(angle) * RY * ring,
    lag: (i % 4) * 0.045,
  }
})

function SiteCard({
  progress,
  x,
  y,
  lag,
}: {
  progress: MotionValue<number>
  x: number
  y: number
  lag: number
}) {
  const hold = 0.28 + lag
  const land = 0.62 + lag

  const tx = useTransform(progress, [0, hold, land], [x, x, 0])
  const ty = useTransform(progress, [0, hold, land], [y, y, 0])
  const scale = useTransform(progress, [0, hold, land], [1, 1, 0.28])
  const opacity = useTransform(progress, [0, hold, land - 0.06, land], [1, 1, 1, 0])

  return (
    <motion.div
      data-scroll-fx="decor"
      style={{ x: tx, y: ty, scale, opacity }}
      className="absolute top-1/2 left-1/2 -mt-7 -ml-14 h-14 w-28 rounded-xl border-2 border-blue-200 bg-canvas shadow-[0_4px_14px_-4px_rgba(16,25,43,0.18)]"
    >
      <span className="absolute inset-x-3 top-3.5 h-1.5 rounded-full bg-blue-200" />
      <span className="absolute inset-x-3 top-7 h-1.5 w-3/5 rounded-full bg-surface-3" />
      <span className="absolute right-3 bottom-3 h-1.5 w-1.5 rounded-full bg-blue-500" />
    </motion.div>
  )
}

export function ContractMerge() {
  const ref = useRef<HTMLDivElement>(null)
  const mounted = useMounted()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.95', 'end 0.85'],
  })

  const contractScale = useTransform(scrollYProgress, [0.56, 0.78], [0.6, 1])
  const contractOpacity = useTransform(scrollYProgress, [0.56, 0.72], [0, 1])
  const ringScale = useTransform(scrollYProgress, [0.54, 0.86], [0.3, 1.6])
  const ringOpacity = useTransform(scrollYProgress, [0.54, 0.68, 0.86], [0, 0.6, 0])

  const beforeOpacity = useTransform(scrollYProgress, [0, 0.28, 0.46], [1, 1, 0])
  const afterOpacity = useTransform(scrollYProgress, [0.6, 0.76], [0, 1])

  return (
    <div ref={ref} className="relative h-[20rem] w-full sm:h-[23rem]">
      <motion.p
        data-scroll-fx="decor"
        style={mounted ? { opacity: beforeOpacity } : { opacity: 0 }}
        className="absolute inset-x-0 top-0 text-center text-[0.6875rem] font-semibold tracking-[0.22em] text-ink-faint uppercase"
      >
        Multiple sites
      </motion.p>
      <motion.p
        data-scroll-fx="reveal"
        style={mounted ? { opacity: afterOpacity } : undefined}
        className="absolute inset-x-0 top-0 text-center text-[0.6875rem] font-semibold tracking-[0.22em] text-blue-600 uppercase"
      >
        One umbrella
      </motion.p>

      <div className="absolute inset-0">
        {mounted &&
          SITES.map((s, i) => (
            <SiteCard key={i} progress={scrollYProgress} x={s.x} y={s.y} lag={s.lag} />
          ))}

        {mounted && (
          <motion.span
            aria-hidden
            data-scroll-fx="decor"
            style={{ scale: ringScale, opacity: ringOpacity }}
            className="absolute top-1/2 left-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-blue-400"
          />
        )}

        <motion.div
          data-scroll-fx="reveal"
          style={mounted ? { scale: contractScale, opacity: contractOpacity } : undefined}
          className="absolute top-1/2 left-1/2 w-60 -translate-x-1/2 -translate-y-1/2 rounded-3xl border-2 border-blue-500 bg-canvas p-7 text-center shadow-[0_18px_40px_-16px_rgba(68,114,196,0.5)]"
        >
          <p className="font-display text-[3rem] leading-none font-semibold tracking-[-0.05em] text-blue-600">
            1
          </p>
          <p className="mt-2.5 text-[0.875rem] leading-snug text-ink-muted">
            budget and contract
            <br />
            for multiple sites
          </p>
        </motion.div>
      </div>
    </div>
  )
}
