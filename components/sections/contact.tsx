'use client'

import { site } from '@/lib/content'
import { openEnquiry } from '@/lib/audience-store'
import { Button } from '../ui/button'
import { Icon } from '../ui/icons'
import { Reveal, RevealGroup, RevealItem } from '../ui/reveal'
import { SectionGlow } from '../ui/atmosphere'
import { SpotlightCard } from '../ui/spotlight-card'

const channels = [
  { icon: 'mail', label: 'Email', value: site.email, href: 'mailto:' + site.email },
  { icon: 'phone', label: 'Phone', value: site.phone, href: 'tel:' + site.phoneHref },
  { icon: 'pin', label: 'Office', value: site.address },
  { icon: 'clock', label: 'Opening hours', value: site.hours },
] as const

export function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-24 pt-4 pb-20 md:pt-8 md:pb-28">
      <SectionGlow className="-top-24 left-1/2 h-[34rem] w-[44rem] -translate-x-1/2" />

      <div className="container-page relative">
        <Reveal>
          <div className="glass ring-glow relative overflow-hidden rounded-5xl px-8 py-14 text-center md:px-16 md:py-20">
            <div aria-hidden className="pointer-events-none absolute inset-0 grid-veil opacity-50" />

            <span className="section-label relative">
              We&apos;re looking forward to speaking with you!
            </span>
            <h2 className="relative mx-auto mt-5 max-w-3xl font-display text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.05] font-semibold tracking-[-0.035em] text-balance">
              Let&apos;s <span className="text-gradient">Connect</span>
            </h2>
            <p className="relative mx-auto mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-muted text-pretty">
              Orca Trial represents an entirely new approach to align all stakeholders in clinical
              research from patients to physician and clinic research. Whether your interest is
              from the perspective of a CRO, sponsor, or Site, contact Orca to learn what we can do
              together to improve clinical research.
            </p>

            <div className="relative mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                data-cta="contact-site"
                onClick={() => openEnquiry('site')}
                className="px-7 py-3.5 text-[0.9375rem]"
              >
                Register your site
                <Icon.arrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button
                data-cta="contact-sponsor"
                variant="outline"
                onClick={() => openEnquiry('sponsor')}
                className="px-7 py-3.5 text-[0.9375rem]"
              >
                I&apos;m a sponsor / CRO
                <Icon.arrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </Reveal>

        <RevealGroup className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((c) => {
            const Glyph = Icon[c.icon]
            const inner = (
              <>
                <Glyph className="h-5 w-5 text-blue-400" />
                <span className="mt-4 block text-[0.6875rem] font-semibold tracking-[0.16em] text-ink-faint uppercase">
                  {c.label}
                </span>
                <span className="mt-1.5 block text-[0.9375rem] leading-snug text-ink">
                  {c.value}
                </span>
              </>
            )
            return (
              <RevealItem key={c.label}>
                <SpotlightCard className="h-full rounded-3xl p-6 transition-transform duration-500 hover:-translate-y-1">
                  {'href' in c && c.href ? (
                    <a href={c.href} className="block">
                      {inner}
                    </a>
                  ) : (
                    inner
                  )}
                </SpotlightCard>
              </RevealItem>
            )
          })}
        </RevealGroup>
      </div>
    </section>
  )
}
