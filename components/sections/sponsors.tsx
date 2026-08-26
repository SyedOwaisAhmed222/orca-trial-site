'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { sponsorPillars } from '@/lib/content'
import { openEnquiry } from '@/lib/audience-store'
import { Icon } from '../ui/icons'
import { Reveal } from '../ui/reveal'
import { SectionGlow } from '../ui/atmosphere'
import { SectionHeading } from '../ui/section-heading'
import { Button } from '../ui/button'
import { PillarVisual } from '../ui/pillar-visual'
import { PullQuote } from '../ui/pull-quote'

/**
 * Scrollytelling: the four pillars scroll past on the left while a single
 * sticky panel on the right swaps its diagram to match. Replaces a click
 * accordion — this advances on its own, so the visitor gets all four without
 * deciding to click anything.
 *
 * Below `lg` the sticky panel would fight the scroll, so each step simply
 * carries its own diagram inline.
 */
export function Sponsors() {
  const [active, setActive] = useState(0)
  const stepRefs = useRef<Array<HTMLDivElement | null>>([])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (!visible) return
        const i = stepRefs.current.indexOf(visible.target as HTMLDivElement)
        if (i >= 0) setActive(i)
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: [0, 0.4, 1] },
    )
    stepRefs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section id="sponsors" className="relative scroll-mt-24 section-pad">
      <SectionGlow className="top-1/4 -left-56 h-[40rem] w-[40rem]" />

      <div className="container-page relative">
        <SectionHeading
          index="03"
          label="One step solution"
          title={<span className="text-gradient">Sponsor / CROs</span>}
          body="Orca brings you the end to end solution in clinical research!"
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          {/* Steps */}
          <div className="grid gap-6 lg:gap-28">
            {sponsorPillars.map((p, i) => (
              <div
                key={p.n}
                ref={(el) => {
                  stepRefs.current[i] = el
                }}
                className="lg:min-h-[18rem] lg:flex lg:flex-col lg:justify-center"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={
                      'font-display text-sm font-semibold tabular-nums transition-colors duration-500 ' +
                      (i === active ? 'text-blue-300' : 'text-fog')
                    }
                  >
                    {p.n}
                  </span>
                  <span
                    className={
                      'h-px flex-1 transition-colors duration-500 ' +
                      (i === active ? 'bg-blue-400/50' : 'bg-foam/8')
                    }
                  />
                </div>

                <h3
                  className={
                    'mt-4 font-display text-[1.5rem] leading-tight font-semibold tracking-[-0.03em] transition-colors duration-500 md:text-[1.75rem] ' +
                    (i === active ? 'text-foam' : 'text-mist')
                  }
                >
                  {p.title}
                </h3>

                {/* Diagram travels with the step on narrow screens */}
                <div className="mt-5 h-40 w-full lg:hidden">
                  <PillarVisual index={i} />
                </div>

                <PullQuote className="mt-4" lead={p.lead} body={p.body} size="sm" />
              </div>
            ))}

            <div className="lg:pt-4">
              <Button data-cta="sponsors-panel" onClick={() => openEnquiry('sponsor')}>
                Request site feasibility
                <Icon.arrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          {/* Sticky diagram */}
          <div className="hidden lg:block">
            <div className="glass ring-glow sticky top-28 aspect-4/3 overflow-hidden rounded-5xl p-4">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 grid-veil opacity-45"
              />
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.03 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="relative h-full w-full"
                >
                  <PillarVisual index={active} />
                </motion.div>
              </AnimatePresence>

              <div className="absolute right-8 bottom-8 flex gap-1.5">
                {sponsorPillars.map((p, i) => (
                  <span
                    key={p.n}
                    className={
                      'h-1 rounded-full transition-all duration-500 ' +
                      (i === active ? 'w-6 bg-blue-300' : 'w-1.5 bg-foam/20')
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
