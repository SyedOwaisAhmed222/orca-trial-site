'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { stats } from '@/lib/content'
import { ButtonLink } from '../ui/button'
import { Counter } from '../ui/counter'
import { Icon } from '../ui/icons'
import { NetworkMap } from '../ui/network-map'

const fadeUp = {
  hidden: { opacity: 0, y: 26, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

export function Hero() {
  const ref = useRef<HTMLElement>(null)

  // On phones the hero is taller than the viewport, so a scroll-linked fade
  // dims the stat rail while it is still the thing being read. Parallax is a
  // wide-screen flourish only.
  const [wide, setWide] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const sync = () => setWide(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.15])

  return (
    <section ref={ref} id="top" className="relative isolate overflow-hidden pt-[var(--nav-h)]">
      {/* The network itself, faint, behind the fold */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[16%] -right-[18%] hidden w-[80%] opacity-[0.16] [mask-image:radial-gradient(ellipse_at_60%_50%,#000_25%,transparent_72%)] lg:block"
      >
        <NetworkMap decorative />
      </div>

      <div className="container-page relative">
        <motion.div
          style={wide ? { y, opacity } : undefined}
          className="flex min-h-[calc(100svh-var(--nav-h))] flex-col justify-center py-20 md:py-24"
        >
          <motion.div
            variants={{ show: { transition: { staggerChildren: 0.11, delayChildren: 0.1 } } }}
            initial="hidden"
            animate="show"
            className="max-w-4xl"
          >
            <motion.div variants={fadeUp} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              <span className="glass inline-flex items-center gap-2.5 rounded-full py-2 pr-5 pl-2.5 text-[0.75rem] font-medium tracking-tight text-mist">
                <span className="relative grid h-6 w-6 place-items-center">
                  <span className="absolute h-2 w-2 rounded-full bg-aqua-400 animate-sonar" />
                  <span className="h-2 w-2 rounded-full bg-aqua-400" />
                </span>
                Clinical research network · United States
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 font-display text-[clamp(2.4rem,7.4vw,5.75rem)] leading-[1.02] font-semibold tracking-[-0.045em] text-balance md:leading-[0.98]"
            >
              Clinical research,
              <br />
              <span className="text-gradient">aligned end to end.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 max-w-2xl text-[1.0625rem] leading-relaxed text-mist text-pretty md:text-lg"
            >
              Orca provides study startup, financial services support and lead generation —
              matching medical trials to the capabilities of an independent network of sites.
              One budget. One contract. No hidden fees.
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="mt-11 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <ButtonLink href="#register" className="px-7 py-3.5 text-[0.9375rem]">
                Register your site
                <Icon.arrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </ButtonLink>
              <ButtonLink
                href="#sponsors"
                variant="outline"
                className="px-7 py-3.5 text-[0.9375rem]"
              >
                For sponsors &amp; CROs
              </ButtonLink>
            </motion.div>
          </motion.div>

          {/* Stat rail */}
          <motion.dl
            variants={{ show: { transition: { staggerChildren: 0.09, delayChildren: 0.55 } } }}
            initial="hidden"
            animate="show"
            className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-4xl border border-foam/8 bg-foam/6 lg:grid-cols-4"
          >
            {stats.map((s) => (
              <motion.div
                key={s.label}
                variants={fadeUp}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="group relative bg-abyss/80 px-6 py-7 backdrop-blur-md transition-colors duration-500 hover:bg-hull/80"
              >
                <dt className="text-[0.6875rem] font-semibold tracking-[0.16em] text-fog uppercase">
                  {s.label}
                </dt>
                <dd className="mt-3 font-display text-[clamp(2rem,3.6vw,2.75rem)] leading-none font-semibold tracking-[-0.04em] text-foam">
                  <Counter value={s.value} suffix={s.suffix} />
                </dd>
                <p className="mt-2 text-[0.8125rem] text-fog">{s.sub}</p>
                <span className="absolute inset-x-6 bottom-0 h-px scale-x-0 bg-linear-to-r from-aqua-400 to-transparent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
              </motion.div>
            ))}
          </motion.dl>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#why"
        aria-label="Scroll to content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-fog transition-colors hover:text-aqua-300 lg:flex"
      >
        <span className="text-[0.625rem] font-medium tracking-[0.24em] uppercase">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Icon.arrowDown className="h-4 w-4" />
        </motion.span>
      </motion.a>
    </section>
  )
}
