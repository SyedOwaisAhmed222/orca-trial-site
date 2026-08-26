import { businessModel, processSteps } from '@/lib/content'
import { Reveal } from '../ui/reveal'
import { SectionGlow } from '../ui/atmosphere'
import { SectionHeading } from '../ui/section-heading'
import { SpotlightCard } from '../ui/spotlight-card'

export function BusinessModel() {
  return (
    <section id="model" className="relative scroll-mt-24 section-pad section-band">
      <SectionGlow className="-top-20 right-0 h-[38rem] w-[38rem]" color="var(--color-tide-500)" />

      <div className="container-page relative">
        <SectionHeading
          index="02"
          label="Only the best"
          title={
            <>
              Our <span className="text-gradient">business model</span>
            </>
          }
          body="Two commitments hold the whole model together — and neither has an asterisk."
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          {businessModel.map((m, i) => (
            <Reveal key={m.kicker} delay={i * 0.12}>
              <SpotlightCard className="relative h-full rounded-5xl p-9 md:p-11">
                <span
                  aria-hidden
                  className="pointer-events-none absolute top-6 right-8 font-display text-[7rem] leading-none font-semibold text-foam/4 select-none"
                >
                  0{i + 1}
                </span>
                <span className="section-label">{m.kicker}</span>
                <h3 className="mt-5 max-w-sm font-display text-[clamp(1.6rem,2.6vw,2.1rem)] leading-[1.12] font-semibold tracking-[-0.035em] text-foam text-balance">
                  {m.title}
                </h3>
                <p className="mt-6 text-[0.9375rem] leading-relaxed text-mist text-pretty">
                  {m.body}
                </p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        {/* Process rail */}
        <Reveal delay={0.1}>
          <ol className="mt-14 grid gap-px overflow-hidden rounded-4xl border border-foam/8 bg-foam/6 md:grid-cols-5">
            {processSteps.map((step, i) => (
              <li
                key={step.label}
                className="group relative bg-abyss/70 p-6 transition-colors duration-500 hover:bg-hull/70"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-aqua-400/25 text-[0.6875rem] font-semibold text-aqua-300">
                    {i + 1}
                  </span>
                  <h4 className="font-display text-[0.9375rem] font-semibold tracking-[-0.01em] text-foam">
                    {step.label}
                  </h4>
                </div>
                <p className="mt-3 text-[0.8125rem] leading-relaxed text-fog">{step.body}</p>
                <span className="absolute inset-x-0 top-0 h-px scale-x-0 bg-linear-to-r from-transparent via-aqua-400 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  )
}
