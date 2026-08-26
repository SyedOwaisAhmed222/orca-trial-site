import { therapeuticAreas } from '@/lib/content'
import { AreaIcon } from '../ui/icons'
import { RevealGroup, RevealItem } from '../ui/reveal'
import { SectionGlow } from '../ui/atmosphere'
import { SectionHeading } from '../ui/section-heading'

/**
 * Deliberately a dense inline list rather than another grid of stacked-icon
 * cards — the page already has three of those, and twelve more would read as
 * filler while doubling the section's height.
 */
export function TherapeuticAreas() {
  return (
    <section id="areas" className="relative scroll-mt-24 section-pad">
      <SectionGlow
        className="top-1/3 -right-48 h-[36rem] w-[36rem]"
        color="var(--color-kelp-400)"
      />

      <div className="container-page relative">
        <SectionHeading
          index="05"
          label="Therapeutic coverage"
          title={
            <>
              Major <span className="text-gradient">therapeutic areas</span>
            </>
          }
          body="Twelve core competencies across the network — each backed by investigators with a proven record in that study area."
        />

        <RevealGroup className="mt-12 grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
          {therapeuticAreas.map((area) => {
            const Glyph = AreaIcon[area.icon]
            return (
              <RevealItem key={area.name}>
                <div className="group flex items-center gap-4 border-b border-foam/8 py-5 transition-colors duration-500 hover:border-aqua-400/40">
                  <Glyph className="h-5 w-5 shrink-0 text-aqua-400 transition-transform duration-500 group-hover:scale-110" />
                  <span className="font-display text-[1.0625rem] font-medium tracking-[-0.015em] text-foam">
                    {area.name}
                  </span>
                  <span
                    aria-hidden
                    className="ml-auto h-1.5 w-1.5 rounded-full bg-transparent transition-all duration-500 group-hover:bg-aqua-400 group-hover:shadow-[0_0_10px_var(--color-aqua-400)]"
                  />
                </div>
              </RevealItem>
            )
          })}
        </RevealGroup>
      </div>
    </section>
  )
}
