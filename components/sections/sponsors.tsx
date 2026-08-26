'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { sponsorPillars } from '@/lib/content'
import { Icon } from '../ui/icons'
import { Reveal } from '../ui/reveal'
import { SectionGlow } from '../ui/atmosphere'
import { SectionHeading } from '../ui/section-heading'
import { ButtonLink } from '../ui/button'

/**
 * The four sponsor pillars as an accordion on the left with the active
 * pillar's detail cross-fading on the right. Falls back to a readable
 * stacked list below `lg`.
 */
export function Sponsors() {
  const [openIndex, setOpenIndex] = useState(0)
  const active = sponsorPillars[openIndex]

  return (
    <section id="sponsors" className="relative scroll-mt-24 py-28 md:py-36">
      <SectionGlow className="top-1/4 -left-56 h-[40rem] w-[40rem]" />

      <div className="container-page relative">
        <SectionHeading
          label="One step solution"
          title={
            <>
              End-to-end solution for{' '}
              <span className="text-gradient">sponsors &amp; CROs</span>
            </>
          }
          body="Orca brings you the end-to-end solution in clinical research — a single point of contact for identification, budget, contract and startup."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
          {/* Selector */}
          <Reveal direction="left">
            <ul className="grid gap-2">
              {sponsorPillars.map((p, i) => {
                const isActive = i === openIndex
                return (
                  <li key={p.n}>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(i)}
                      aria-expanded={isActive}
                      className={
                        'group relative flex w-full items-center gap-5 rounded-3xl border px-6 py-5 text-left transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ' +
                        (isActive
                          ? 'border-aqua-400/28 bg-foam/6'
                          : 'border-foam/7 bg-transparent hover:border-foam/14 hover:bg-foam/3')
                      }
                    >
                      <span
                        className={
                          'font-display text-sm font-semibold tabular-nums transition-colors duration-500 ' +
                          (isActive ? 'text-aqua-300' : 'text-fog')
                        }
                      >
                        {p.n}
                      </span>
                      <span
                        className={
                          'font-display text-[1.0625rem] font-medium tracking-[-0.015em] transition-colors duration-500 ' +
                          (isActive ? 'text-foam' : 'text-mist group-hover:text-foam')
                        }
                      >
                        {p.title}
                      </span>
                      <Icon.arrowRight
                        className={
                          'ml-auto h-4 w-4 shrink-0 transition-all duration-500 ' +
                          (isActive
                            ? 'translate-x-0 text-aqua-300 opacity-100'
                            : '-translate-x-2 text-fog opacity-0 group-hover:translate-x-0 group-hover:opacity-60')
                        }
                      />
                      {isActive && (
                        <motion.span
                          layoutId="sponsor-bar"
                          className="absolute top-4 bottom-4 -left-px w-0.5 rounded-full bg-linear-to-b from-aqua-300 to-tide-500"
                          transition={{ type: 'spring', stiffness: 360, damping: 34 }}
                        />
                      )}
                    </button>

                    {/* Mobile: reveal the body inline under the selected item */}
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.p
                          key="m-body"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden px-6 text-[0.9375rem] leading-relaxed text-mist lg:hidden"
                        >
                          <span className="block py-4">{p.body}</span>
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </li>
                )
              })}
            </ul>
          </Reveal>

          {/* Detail panel */}
          <Reveal direction="right" className="hidden lg:block">
            <div className="glass ring-glow sticky top-28 overflow-hidden rounded-5xl p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,var(--color-aqua-500)_0%,transparent_66%)] opacity-22 blur-3xl"
              />
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.n}
                  initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="font-display text-[4.5rem] leading-none font-semibold tracking-tight text-foam/8">
                    {active.n}
                  </span>
                  <h3 className="mt-4 font-display text-[2rem] leading-[1.1] font-semibold tracking-[-0.035em] text-foam text-balance">
                    {active.title}
                  </h3>
                  <p className="mt-6 text-[1rem] leading-relaxed text-mist text-pretty">
                    {active.body}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="mt-10 border-t border-foam/8 pt-8">
                <ButtonLink href="#register" variant="outline" className="px-6 py-3">
                  Start a conversation
                  <Icon.arrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
