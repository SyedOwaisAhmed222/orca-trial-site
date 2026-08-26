'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'
import { nav, site } from '@/lib/content'
import { openEnquiry } from '@/lib/audience-store'
import { Icon } from './ui/icons'
import { Logo, Wordmark } from './ui/logo'
import { ButtonLink } from './ui/button'

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>('')

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.3 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight the nav item whose section currently owns the viewport.
  useEffect(() => {
    const sections = nav
      .map((n) => document.getElementById(n.href.slice(1)))
      .filter((el): el is HTMLElement => Boolean(el))

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive('#' + visible.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] },
    )

    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header
        className={
          'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ' +
          (scrolled
            ? 'border-b border-foam/8 bg-abyss/72 backdrop-blur-xl backdrop-saturate-150'
            : 'border-b border-transparent')
        }
      >
        <div className="container-page flex h-[var(--nav-h)] items-center justify-between gap-6">
          <a href="#top" className="flex items-center gap-2.5" aria-label="Orca Trial — home">
            <Logo />
            <Wordmark />
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {nav.map((item) => {
              const isActive = active === item.href
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={
                    'relative rounded-full px-4 py-2 text-[0.8125rem] font-medium transition-colors duration-300 ' +
                    (isActive ? 'text-foam' : 'text-mist hover:text-foam')
                  }
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      aria-hidden
                      className="absolute inset-0 rounded-full border border-aqua-400/25 bg-foam/6"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </a>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            {/* Clinical research is a phone-first business — keep the number
                one tap away at every scroll position. */}
            <a
              href={'tel:' + site.phoneHref}
              data-cta="nav-phone"
              className="hidden items-center gap-2 rounded-full px-3 py-2 text-[0.8125rem] font-medium text-mist transition-colors hover:text-foam xl:flex"
            >
              <Icon.phone className="h-4 w-4 text-aqua-400" />
              {site.phone}
            </a>

            {/* Wrapper owns the breakpoint — putting `hidden` on the button
                itself would collide with its own `inline-flex`. */}
            <div className="hidden sm:block">
              <ButtonLink
                href="#register"
                data-cta="nav-primary"
                onClick={(e) => {
                  e.preventDefault()
                  openEnquiry('site')
                }}
                className="px-5 py-2.5 whitespace-nowrap"
              >
                Register your site
                <Icon.arrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </ButtonLink>
            </div>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="glass grid h-11 w-11 place-items-center rounded-full text-foam transition-colors hover:bg-foam/10 lg:hidden"
              aria-label="Open menu"
              aria-expanded={open}
            >
              <Icon.menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Reading progress */}
        <motion.div
          style={{ scaleX: progress }}
          className="h-px origin-left bg-linear-to-r from-aqua-400 via-tide-400 to-kelp-400"
        />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-60 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div
              className="absolute inset-0 bg-abyss/85 backdrop-blur-xl"
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="absolute inset-x-3 top-3 rounded-4xl border border-foam/10 bg-hull/95 p-6 shadow-2xl"
              initial={{ y: -28, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Logo className="h-8 w-8" />
                  <Wordmark />
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-foam/10 text-mist transition-colors hover:text-foam"
                  aria-label="Close menu"
                >
                  <Icon.close className="h-5 w-5" />
                </button>
              </div>

              <nav className="mt-7 grid gap-1" aria-label="Mobile">
                {nav.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.05, duration: 0.4 }}
                    className="flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-lg font-medium text-foam transition-colors hover:bg-foam/6"
                  >
                    {item.label}
                    <Icon.arrowRight className="h-4 w-4 text-aqua-400" />
                  </motion.a>
                ))}
              </nav>

              <ButtonLink
                href="#register"
                data-cta="mobilemenu-primary"
                onClick={(e) => {
                  e.preventDefault()
                  setOpen(false)
                  openEnquiry('site')
                }}
                className="mt-6 w-full"
              >
                Register your site
                <Icon.arrowRight className="h-4 w-4" />
              </ButtonLink>
              <button
                type="button"
                data-cta="mobilemenu-sponsor"
                onClick={() => {
                  setOpen(false)
                  openEnquiry('sponsor')
                }}
                className="mt-2 w-full rounded-full border border-foam/10 py-3 text-[0.875rem] font-medium text-mist transition-colors hover:text-foam"
              >
                I&apos;m a sponsor / CRO
              </button>

              <div className="mt-6 grid gap-2 border-t border-foam/8 pt-5 text-sm text-mist">
                <a href={'mailto:' + site.email} className="flex items-center gap-2.5 hover:text-foam">
                  <Icon.mail className="h-4 w-4 text-aqua-400" /> {site.email}
                </a>
                <a href={'tel:' + site.phoneHref} className="flex items-center gap-2.5 hover:text-foam">
                  <Icon.phone className="h-4 w-4 text-aqua-400" /> {site.phone}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
