import { networkPillars } from '@/lib/content'
import { Icon } from '../ui/icons'
import { NetworkMap } from '../ui/network-map'
import { Reveal } from '../ui/reveal'
import { SectionGlow } from '../ui/atmosphere'
import { SectionHeading } from '../ui/section-heading'
import { SpotlightCard } from '../ui/spotlight-card'

export function SiteNetwork() {
  return (
    <section id="network" className="relative scroll-mt-24 py-28 md:py-36">
      <SectionGlow className="top-0 left-1/2 h-[36rem] w-[52rem] -translate-x-1/2" />

      <div className="container-page relative">
        <SectionHeading
          align="center"
          label="Site network"
          title={
            <>
              Where you can <span className="text-gradient">rely on us</span>
            </>
          }
          body="Orca's commitment to enhanced efficiency, productivity and quality data begins with our carefully vetted research sites — dedicated clinics with highly experienced physician investigators, supported by well-trained research staff."
        />

        <Reveal delay={0.12} amount={0.1}>
          <div className="glass relative mt-16 overflow-hidden rounded-5xl px-6 py-12 md:px-14 md:py-16">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 grid-veil opacity-45"
            />
            <NetworkMap className="relative mx-auto max-w-4xl" />

            <div className="relative mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 border-t border-foam/8 pt-8 text-[0.8125rem] text-fog">
              <span className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-aqua-200 shadow-[0_0_10px_var(--color-aqua-300)]" />
                Regional hub
              </span>
              <span className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-aqua-400" />
                Research site
              </span>
              <span className="text-fog/70">
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
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-aqua-400/22 bg-aqua-400/8 text-aqua-300">
                    <Glyph className="h-5.5 w-5.5" />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-semibold tracking-[-0.02em] text-foam">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-mist text-pretty">
                    {p.body}
                  </p>
                </SpotlightCard>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
