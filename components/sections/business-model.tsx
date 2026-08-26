import { businessModel } from '@/lib/content'
import { Reveal } from '../ui/reveal'
import { SectionGlow } from '../ui/atmosphere'
import { SectionHeading } from '../ui/section-heading'
import { SpotlightCard } from '../ui/spotlight-card'
import { PullQuote } from '../ui/pull-quote'
import { MoneyFlow } from '../ui/money-flow'
import { ContractMerge } from '../ui/contract-merge'

/**
 * Orca's two commitments, shown rather than described. Each card pairs a
 * diagram with the emphasised clause of Orca's own sentence; the full sentence
 * is one tap away inside the PullQuote.
 */
export function BusinessModel() {
  const [noFee, riskFree] = businessModel

  return (
    <section id="model" className="relative scroll-mt-24 section-pad section-band">
      <SectionGlow className="-top-20 right-0 h-[38rem] w-[38rem]" />

      <div className="container-page relative">
        <SectionHeading
          index="02"
          label="Only the best"
          title={
            <>
              Our <span className="text-gradient">business model</span>
            </>
          }
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          <Reveal>
            <SpotlightCard className="h-full rounded-5xl p-8 md:p-10">
              <span className="section-label">{noFee.title}</span>
              <MoneyFlow />
              <PullQuote lead={noFee.lead} body={noFee.body} size="md" />
            </SpotlightCard>
          </Reveal>

          <Reveal delay={0.12}>
            <SpotlightCard className="h-full rounded-5xl p-8 md:p-10">
              <span className="section-label">{riskFree.title}</span>
              <MoneyFlow variant="speed" />
              <PullQuote lead={riskFree.lead} body={riskFree.body} size="md" />
            </SpotlightCard>
          </Reveal>
        </div>

        {/* "a single budget and contract for multiple sites under one umbrella" */}
        <Reveal delay={0.1} amount={0.05}>
          <div className="relative mt-4 overflow-hidden rounded-5xl border border-line bg-surface-2 px-6 py-10 md:px-12">
            <div aria-hidden className="pointer-events-none absolute inset-0 grid-veil opacity-40" />
            <ContractMerge />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
