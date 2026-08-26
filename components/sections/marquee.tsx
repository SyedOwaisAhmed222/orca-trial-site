import { therapeuticAreas } from '@/lib/content'
import { AreaIcon } from '../ui/icons'

/**
 * Continuous ticker of therapeutic areas. The list is rendered twice and the
 * track translates -50%, so the loop is seamless at any viewport width.
 */
export function Marquee() {
  const items = [...therapeuticAreas, ...therapeuticAreas]

  return (
    <section aria-hidden className="relative border-y border-foam/7 bg-hull/25 py-6">
      <div className="fade-x flex overflow-hidden">
        <div className="animate-marquee flex shrink-0 items-center gap-12 pr-12">
          {items.map((area, i) => {
            const Glyph = AreaIcon[area.icon]
            return (
              <span
                key={area.name + i}
                className="flex shrink-0 items-center gap-2.5 text-[0.8125rem] font-medium tracking-[0.06em] whitespace-nowrap text-fog uppercase"
              >
                <Glyph className="h-4 w-4 text-aqua-500/70" />
                {area.name}
              </span>
            )
          })}
        </div>
      </div>
    </section>
  )
}
