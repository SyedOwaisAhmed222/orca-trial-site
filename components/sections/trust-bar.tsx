import { guarantees } from '@/lib/content'
import { Icon } from '../ui/icons'
import { RevealGroup, RevealItem } from '../ui/reveal'

/**
 * The four objections that stall an enquiry, answered before the visitor has
 * to scroll for them. Sits directly under the hero on purpose.
 */
export function TrustBar() {
  return (
    <section aria-label="What Orca guarantees" className="relative py-12 md:py-16">
      <div className="container-page">
        <RevealGroup className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {guarantees.map((g) => {
            const Glyph = Icon[g.icon as keyof typeof Icon]
            return (
              <RevealItem key={g.label}>
                <div className="glass flex h-full items-start gap-3.5 rounded-3xl p-5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-aqua-400/22 bg-aqua-400/8 text-aqua-300">
                    <Glyph className="h-4.5 w-4.5" />
                  </span>
                  <span>
                    <span className="block font-display text-[0.9375rem] leading-snug font-semibold tracking-[-0.01em] text-foam">
                      {g.label}
                    </span>
                    <span className="mt-1 block text-[0.8125rem] leading-snug text-fog">
                      {g.sub}
                    </span>
                  </span>
                </div>
              </RevealItem>
            )
          })}
        </RevealGroup>
      </div>
    </section>
  )
}
