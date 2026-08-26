import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { Hero } from '@/components/sections/hero'
import { Marquee } from '@/components/sections/marquee'
import { WhyOrca } from '@/components/sections/why-orca'
import { BusinessModel } from '@/components/sections/business-model'
import { Sponsors } from '@/components/sections/sponsors'
import { SiteNetwork } from '@/components/sections/site-network'
import { TherapeuticAreas } from '@/components/sections/therapeutic-areas'
import { Register } from '@/components/sections/register'
import { Contact } from '@/components/sections/contact'

export default function HomePage() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <Marquee />
        <WhyOrca />
        <BusinessModel />
        <Sponsors />
        <SiteNetwork />
        <TherapeuticAreas />
        <Register />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
