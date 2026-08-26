import { guarantees } from '@/lib/content'
import { Icon } from '../ui/icons'
import { RevealGroup, RevealItem } from '../ui/reveal'

/**
 * Four statements lifted from Orca's own copy, surfaced under the hero rather
 * than three screens down. Wording stays Orca's — these are not guarantees we
 * invented on their behalf.
 */
export function TrustBar() {
  return (
    <section aria-label="Orca at a glance" className="relative border-y border-ink/7 bg-surface/20 py-8 md:py-10">
      <div className="container-page">
        <RevealGroup className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
          {guarantees.map((g) => {
            const Glyph = Icon[g.icon as keyof typeof Icon]
            return (
              <RevealItem key={g.label}>
                <div className="flex h-full items-start gap-3.5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-blue-200 bg-blue-50 text-blue-600">
                    <Glyph className="h-4.5 w-4.5" />
                  </span>
                  <span>
                    <span className="block font-display text-[0.9375rem] leading-snug font-semibold tracking-[-0.01em] text-ink">
                      {g.label}
                    </span>
                    <span className="mt-1 block text-[0.8125rem] leading-snug text-ink-faint">
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
