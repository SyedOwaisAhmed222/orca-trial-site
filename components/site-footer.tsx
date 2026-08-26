import { nav, site, therapeuticAreas } from '@/lib/content'
import { Icon } from './ui/icons'
import { Logo, Wordmark } from './ui/logo'

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-foam/8 bg-hull/30">
      <div className="container-page pt-16 pb-16 max-lg:pb-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.2fr)]">
          <div>
            <a href="#top" className="flex items-center gap-2.5">
              <Logo />
              <Wordmark />
            </a>
            <p className="mt-5 max-w-xs text-[0.875rem] leading-relaxed text-fog text-pretty">
              Study startup, financial services support and lead generation for an independent
              network of research sites across the United States.
            </p>
          </div>

          <nav aria-label="Footer">
            <h3 className="text-[0.6875rem] font-semibold tracking-[0.16em] text-fog uppercase">
              Menu
            </h3>
            <ul className="mt-3 grid">
              {[...nav, { label: 'Register with us', href: '#register' }].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="-mx-2 flex min-h-11 items-center rounded-lg px-2 text-[0.875rem] text-mist transition-colors hover:text-aqua-300 sm:min-h-9"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-[0.6875rem] font-semibold tracking-[0.16em] text-fog uppercase">
              Areas
            </h3>
            <ul className="mt-5 grid gap-2.5">
              {therapeuticAreas.slice(0, 6).map((a) => (
                <li key={a.name} className="text-[0.875rem] text-mist">
                  {a.name}
                </li>
              ))}
              <li>
                <a
                  href="#areas"
                  className="-mx-2 mt-1 inline-flex min-h-11 items-center rounded-lg px-2 text-[0.875rem] text-aqua-300 underline-offset-4 hover:underline sm:min-h-0 sm:mt-0"
                >
                  All 12 areas
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[0.6875rem] font-semibold tracking-[0.16em] text-fog uppercase">
              Get in touch
            </h3>
            <ul className="mt-5 grid gap-3.5 text-[0.875rem] text-mist">
              <li className="flex items-start gap-2.5">
                <Icon.pin className="mt-0.5 h-4 w-4 shrink-0 text-aqua-400" />
                <span className="leading-relaxed">{site.address}</span>
              </li>
              <li>
                <a
                  href={'mailto:' + site.email}
                  data-cta="footer-email"
                  className="-mx-2 flex min-h-11 items-center gap-2.5 rounded-lg px-2 transition-colors hover:text-aqua-300 sm:min-h-0 sm:py-0.5"
                >
                  <Icon.mail className="h-4 w-4 shrink-0 text-aqua-400" />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={'tel:' + site.phoneHref}
                  data-cta="footer-phone"
                  className="-mx-2 flex min-h-11 items-center gap-2.5 rounded-lg px-2 transition-colors hover:text-aqua-300 sm:min-h-0 sm:py-0.5"
                >
                  <Icon.phone className="h-4 w-4 shrink-0 text-aqua-400" />
                  {site.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Icon.clock className="h-4 w-4 shrink-0 text-aqua-400" />
                {site.hours}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-foam/8 pt-8 text-[0.8125rem] text-fog sm:flex-row">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-aqua-400 shadow-[0_0_10px_var(--color-aqua-400)]" />
            Fort Lauderdale, Florida
          </p>
        </div>
      </div>
    </footer>
  )
}
