import type { Metadata } from 'next'
import { site } from '@/lib/content'
import { ButtonLink } from '@/components/ui/button'
import { Icon } from '@/components/ui/icons'
import { Logo } from '@/components/ui/logo'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-6 py-24">
      <div className="w-full max-w-lg text-center">
        <a href="/" className="inline-flex items-center gap-2.5">
          <Logo />
        </a>

        <p className="mt-12 font-display text-[5rem] leading-none font-semibold tracking-[-0.05em] text-foam/10">
          404
        </p>
        <h1 className="mt-4 font-display text-3xl leading-tight font-semibold tracking-[-0.03em] text-foam text-balance">
          That page has moved on.
        </h1>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-mist text-pretty">
          The link you followed does not exist. Everything about the Orca network — sites,
          sponsors, therapeutic areas and registration — lives on the home page.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href="/#top" className="px-6 py-3">
            Back to home
            <Icon.arrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </ButtonLink>
          <ButtonLink href="/#register" variant="outline" className="px-6 py-3">
            Register your site
          </ButtonLink>
        </div>

        <p className="mt-10 text-[0.8125rem] text-fog">
          Or reach us at{' '}
          <a
            href={'mailto:' + site.email}
            className="text-blue-300 underline-offset-4 hover:underline"
          >
            {site.email}
          </a>{' '}
          ·{' '}
          <a
            href={'tel:' + site.phoneHref}
            className="text-blue-300 underline-offset-4 hover:underline"
          >
            {site.phone}
          </a>
        </p>
      </div>
    </main>
  )
}
