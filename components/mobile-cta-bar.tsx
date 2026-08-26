'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { site } from '@/lib/content'
import { openEnquiry } from '@/lib/audience-store'
import { Icon } from './ui/icons'

/**
 * Persistent conversion bar for phones. Appears once the hero is behind the
 * visitor and hides again while the enquiry form is on screen, so it never
 * covers the thing it is pointing at.
 */
export function MobileCtaBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const form = document.getElementById('register')

    const onScroll = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.75

      let formOnScreen = false
      if (form) {
        const r = form.getBoundingClientRect()
        formOnScreen = r.top < window.innerHeight * 0.85 && r.bottom > 0
      }

      setVisible(pastHero && !formOnScreen)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-3 bottom-3 z-40 lg:hidden"
        >
          <div className="glass flex items-center gap-2 rounded-full p-1.5 shadow-[0_18px_50px_-12px_rgba(0,0,0,0.85)]">
            <a
              href={'tel:' + site.phoneHref}
              data-cta="mobilebar-call"
              aria-label={'Call ' + site.phone}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-foam/10 text-aqua-300 transition-colors active:bg-foam/10"
            >
              <Icon.phone className="h-4.5 w-4.5" />
            </a>
            <button
              type="button"
              data-cta="mobilebar-enquiry"
              onClick={() => openEnquiry('site')}
              className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-linear-to-r from-aqua-400 to-tide-400 text-[0.875rem] font-semibold text-abyss active:brightness-110"
            >
              Register your site
              <Icon.arrowRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
