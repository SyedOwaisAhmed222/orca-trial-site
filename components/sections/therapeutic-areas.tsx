import { therapeuticAreas } from '@/lib/content'
import { AreaIcon } from '../ui/icons'
import { RevealGroup, RevealItem } from '../ui/reveal'
import { SectionGlow } from '../ui/atmosphere'
import { SectionHeading } from '../ui/section-heading'

export function TherapeuticAreas() {
  return (
    <section id="areas" className="relative scroll-mt-24 py-28 md:py-36">
      <SectionGlow
        className="top-1/3 -right-48 h-[36rem] w-[36rem]"
        color="var(--color-kelp-400)"
      />

      <div className="container-page relative">
        <SectionHeading
          label="Have a look at our"
          title={
            <>
              Major <span className="text-gradient">therapeutic areas</span>
            </>
          }
          body="Twelve core competencies across the network — each backed by investigators with a proven record in that study area."
        />

        <RevealGroup className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {therapeuticAreas.map((area) => {
            const Glyph = AreaIcon[area.icon]
            return (
              <RevealItem key={area.name}>
                <div className="glass ring-glow group relative h-full overflow-hidden rounded-3xl p-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:bg-foam/8">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full bg-[radial-gradient(circle,var(--color-aqua-400)_0%,transparent_68%)] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-45"
                  />
                  <Glyph className="relative h-7 w-7 text-aqua-400 transition-transform duration-500 group-hover:scale-110" />
                  <h3 className="relative mt-5 font-display text-[0.9375rem] leading-snug font-medium tracking-[-0.01em] text-foam">
                    {area.name}
                  </h3>
                </div>
              </RevealItem>
            )
          })}
        </RevealGroup>
      </div>
    </section>
  )
}
