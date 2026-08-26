import { networkPillars } from '@/lib/content'
import { Icon } from '../ui/icons'
import { NetworkMap } from '../ui/network-map'
import { Reveal } from '../ui/reveal'
import { SectionGlow } from '../ui/atmosphere'
import { SectionHeading } from '../ui/section-heading'
import { SpotlightCard } from '../ui/spotlight-card'
import { PullQuote } from '../ui/pull-quote'

export function SiteNetwork() {
  return (
    <section id="network" className="relative scroll-mt-24 section-pad section-band">
      <SectionGlow className="top-0 left-1/2 h-[36rem] w-[52rem] -translate-x-1/2" />

      <div className="container-page relative">
        <SectionHeading
          index="04"
          label="Site network"
          title={
            <>
              Where you can <span className="text-gradient">rely on us</span>
            </>
          }
          body="Orca's commitment to enhanced efficiency, productivity and quality data begins with our carefully vetted research sites — dedicated clinics with highly experienced physician investigators, supported by well-trained research staff."
        />

        <Reveal delay={0.12} amount={0.1}>
          <div className="relative mt-14 overflow-hidden rounded-5xl border border-line bg-surface-2 px-6 py-10 md:px-12 md:py-12">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 grid-veil opacity-45"
            />
            <NetworkMap className="relative mx-auto max-w-4xl" />

            <div className="relative mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 border-t border-ink/8 pt-6 text-[0.8125rem] text-ink-faint">
              <span className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-700" />
                Regional hub
              </span>
              <span className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                Research site
              </span>
              <span className="text-ink-muted">
                Illustrative footprint — 360+ sites across the United States
              </span>
            </div>
          </div>
        </Reveal>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {networkPillars.map((p, i) => {
            const Glyph = Icon[p.icon as keyof typeof Icon]
            return (
              <Reveal key={p.title} delay={i * 0.1}>
                <SpotlightCard className="h-full rounded-4xl p-8 md:p-10">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl border border-blue-200 bg-blue-50 text-blue-600">
                    <Glyph className="h-5 w-5" />
                  </span>
                  <p className="mt-5 text-[0.6875rem] font-semibold tracking-[0.16em] text-ink-faint uppercase">
                    {p.title}
                  </p>
                  <PullQuote className="mt-3" lead={p.lead} body={p.body} size="sm" />
                </SpotlightCard>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
