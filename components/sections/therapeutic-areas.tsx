import Image from 'next/image'
import { therapeuticAreas } from '@/lib/content'
import { RevealGroup, RevealItem } from '../ui/reveal'
import { SectionGlow } from '../ui/atmosphere'
import { SectionHeading } from '../ui/section-heading'

export function TherapeuticAreas() {
  return (
    <section id="areas" className="relative scroll-mt-24 section-pad">
      <SectionGlow className="top-1/3 -right-48 h-[36rem] w-[36rem]" />

      <div className="container-page relative">
        <SectionHeading
          index="05"
          label="Have a look at our"
          title={<>Major <span className="text-gradient">therapeutic areas</span></>}
          body="Orca focuses on medical trials matched to the capabilities of our independent network of sites."
        />

        <RevealGroup className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {therapeuticAreas.map((area) => (
            <RevealItem key={area.name}>
              <div className="glass ring-glow group flex h-full flex-col items-center gap-4 rounded-3xl p-6 text-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:bg-foam/6">
                <Image
                  src={area.image}
                  alt=""
                  width={282}
                  height={282}
                  className="h-16 w-16 object-contain transition-transform duration-500 group-hover:scale-105"
                />
                <h3 className="font-display text-[0.9375rem] leading-snug font-medium tracking-[-0.01em] text-foam">
                  {area.name}
                </h3>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
