'use client'

import { audiences, whyOrca } from '@/lib/content'
import { openEnquiry } from '@/lib/audience-store'
import { Icon } from '../ui/icons'
import { Reveal, RevealGroup, RevealItem } from '../ui/reveal'
import { SectionGlow } from '../ui/atmosphere'
import { SectionHeading } from '../ui/section-heading'
import { SpotlightCard } from '../ui/spotlight-card'

export function WhyOrca() {
  return (
    <section id="why" className="relative scroll-mt-24 section-pad">
      <SectionGlow className="top-10 -left-40 h-[34rem] w-[34rem]" />

      <div className="container-page relative">
        <SectionHeading
          index="01"
          label="Why choose Orca"
          title={<>Why choose <span className="text-gradient">Orca</span></>}
          body="Orca focuses on medical trials matched to the capabilities of our independent network of sites."
        />

        {/* Bento */}
        <RevealGroup className="mt-14 grid gap-4 lg:grid-cols-6">
          {whyOrca.map((item) => {
            const Glyph = Icon[item.icon as keyof typeof Icon]
            return (
              <RevealItem key={item.body} className={item.span}>
                <SpotlightCard className="h-full rounded-4xl p-7 hover:-translate-y-1">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl border border-blue-400/22 bg-blue-400/8 text-blue-300 transition-colors duration-500 group-hover/spot:bg-blue-400/14">
                    <Glyph className="h-5 w-5" />
                  </span>
                  <p className="mt-5 text-[1rem] leading-relaxed text-mist text-pretty">
                    {item.body}
                  </p>
                </SpotlightCard>
              </RevealItem>
            )
          })}
        </RevealGroup>

        {/* Two audiences */}
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {audiences.map((a, i) => (
            <Reveal key={a.key} delay={i * 0.1} direction={i === 0 ? 'left' : 'right'}>
              <SpotlightCard className="h-full rounded-4xl p-8 md:p-10">
                <h3 className="section-label">{a.eyebrow}</h3>
                <ul className="mt-6 grid gap-4">
                  {a.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-[1.0625rem] text-foam">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-blue-400/12 text-blue-300">
                        <Icon.check className="h-3 w-3" strokeWidth={2.4} />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  data-cta={'why-' + a.key}
                  onClick={() => openEnquiry(a.key === 'sponsors' ? 'sponsor' : 'site')}
                  className="group/cta mt-8 inline-flex items-center gap-2 text-[0.875rem] font-semibold text-blue-300 transition-colors hover:text-blue-200"
                >
                  {a.key === 'sponsors' ? 'Request site feasibility' : 'Register your site'}
                  <Icon.arrowRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
                </button>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
