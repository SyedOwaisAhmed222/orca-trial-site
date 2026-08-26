'use client'

import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { site } from '@/lib/content'
import { setAudience, useAudience, type Audience } from '@/lib/audience-store'
import {
  SITE_COUNT_OPTIONS,
  TIMELINE_OPTIONS,
  emptySite,
  emptySponsor,
  validateRegistration,
  type FieldErrors,
  type SiteInput,
  type SponsorInput,
} from '@/lib/registration'
import { Button } from '../ui/button'
import { Field, SelectField, TextareaField } from '../ui/field'
import { Icon } from '../ui/icons'
import { Reveal } from '../ui/reveal'
import { SectionGlow } from '../ui/atmosphere'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const pitch: Record<Audience, { eyebrow: string; title: React.ReactNode; body: string; points: string[] }> = {
  site: {
    eyebrow: 'For research sites',
    title: (
      <>
        Put your site on the <span className="text-gradient">Orca network</span>.
      </>
    ),
    body: 'Study availability through the year, no additional fee from the site, and hassle-free business development. Five fields is all we need to start.',
    points: [
      'No long-term or exclusive agreements',
      'Compensation only on successful enrollment',
      'Payments disbursed the moment sponsors pay',
    ],
  },
  sponsor: {
    eyebrow: 'For sponsors & CROs',
    title: (
      <>
        Reach 360+ sites through <span className="text-gradient">one contract</span>.
      </>
    ),
    body: 'Tell us about the study and we will come back with relevant sites, a single budget and a feasibility view — contract and budget responses in two working days.',
    points: [
      'One negotiation covering every Orca site',
      'Site identification and feasibility, accelerated',
      'A single point of contact from startup to payment',
    ],
  },
}

export function Register() {
  const audience = useAudience()
  const [siteValues, setSiteValues] = useState<SiteInput>(emptySite)
  const [sponsorValues, setSponsorValues] = useState<SponsorInput>(emptySponsor)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [serverError, setServerError] = useState('')
  const [showOptional, setShowOptional] = useState(false)

  const copy = pitch[audience]
  const values = audience === 'site' ? siteValues : sponsorValues

  function set(key: string) {
    return (e: { target: { value: string } }) => {
      const next = e.target.value
      if (audience === 'site') setSiteValues((v) => ({ ...v, [key]: next }))
      else setSponsorValues((v) => ({ ...v, [key]: next }))
      // Clear the error as soon as the user starts correcting the field.
      setErrors((prev) => (prev[key as keyof FieldErrors] ? { ...prev, [key]: undefined } : prev))
    }
  }

  function switchTo(next: Audience) {
    if (next === audience) return
    setAudience(next)
    setErrors({})
    setStatus('idle')
    setServerError('')
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const found = validateRegistration(values)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0]
      document.getElementById(first)?.focus()
      return
    }

    setStatus('sending')
    setServerError('')

    try {
      // Static-export builds have no /api route — point them at an external
      // form endpoint (Formspree, Zapier, CRM webhook) via this env var.
      const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT || '/api/register'

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        if (data?.errors) setErrors(data.errors)
        throw new Error(data?.message ?? 'Submission failed')
      }

      setStatus('sent')
      if (audience === 'site') setSiteValues(emptySite)
      else setSponsorValues(emptySponsor)
    } catch (err) {
      setStatus('error')
      setServerError(
        err instanceof Error && err.message !== 'Failed to fetch'
          ? err.message
          : 'We could not reach the server. Please email us instead.',
      )
    }
  }

  return (
    <section id="register" className="relative scroll-mt-24 section-pad">
      <SectionGlow className="top-1/4 left-1/2 h-[42rem] w-[46rem] -translate-x-1/2" />

      <div className="container-page relative">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          {/* Pitch */}
          <Reveal direction="left">
            <div className="lg:sticky lg:top-28">
              <span className="section-label">
                <span className="h-px w-8 bg-linear-to-r from-transparent to-aqua-400" />
                {copy.eyebrow}
              </span>

              <AnimatePresence mode="wait">
                <motion.div
                  key={audience}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h2 className="mt-5 font-display text-[clamp(2rem,4.2vw,3.2rem)] leading-[1.05] font-semibold tracking-[-0.035em] text-balance">
                    {copy.title}
                  </h2>
                  <p className="mt-6 text-[1.0625rem] leading-relaxed text-mist text-pretty">
                    {copy.body}
                  </p>

                  <ul className="mt-9 grid gap-3.5">
                    {copy.points.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-[0.9375rem] text-mist">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-aqua-400/12 text-aqua-300">
                          <Icon.check className="h-3 w-3" strokeWidth={2.4} />
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>

              <div className="mt-10 grid gap-3 border-t border-foam/8 pt-8 text-sm">
                <p className="flex items-center gap-2.5 text-mist">
                  <Icon.clock className="h-4 w-4 shrink-0 text-aqua-400" />
                  We reply within two working days.
                </p>
                <p className="flex items-center gap-2.5 text-fog">
                  <Icon.mail className="h-4 w-4 shrink-0 text-aqua-400" />
                  Prefer email?{' '}
                  <a
                    href={'mailto:' + site.email}
                    data-cta="form-email"
                    className="rounded px-0.5 py-1 text-aqua-300 underline-offset-4 hover:underline"
                  >
                    {site.email}
                  </a>
                </p>
                <p className="flex items-center gap-2.5 text-fog">
                  <Icon.phone className="h-4 w-4 shrink-0 text-aqua-400" />
                  Or call{' '}
                  <a
                    href={'tel:' + site.phoneHref}
                    data-cta="form-phone"
                    className="rounded px-0.5 py-1 text-aqua-300 underline-offset-4 hover:underline"
                  >
                    {site.phone}
                  </a>
                </p>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal direction="right" amount={0.1}>
            <div className="glass ring-glow relative overflow-hidden rounded-5xl p-7 md:p-10">
              {/* Audience switch — the single most important control on the page */}
              <div
                role="tablist"
                aria-label="Who are you?"
                className="relative grid grid-cols-2 gap-1 rounded-full border border-foam/9 bg-abyss/50 p-1"
              >
                {(['site', 'sponsor'] as const).map((a) => {
                  const isActive = a === audience
                  return (
                    <button
                      key={a}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      data-cta={'audience-' + a}
                      onClick={() => switchTo(a)}
                      className={
                        'relative rounded-full px-4 py-2.5 text-[0.8125rem] font-semibold transition-colors duration-300 ' +
                        (isActive ? 'text-abyss' : 'text-mist hover:text-foam')
                      }
                    >
                      {isActive && (
                        <motion.span
                          layoutId="audience-pill"
                          aria-hidden
                          className="absolute inset-0 rounded-full bg-linear-to-r from-aqua-400 to-tide-400 shadow-[0_6px_20px_-6px_var(--color-aqua-500)]"
                          transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                        />
                      )}
                      {/* Sits above the pill; a negative z-index would drop it
                          behind the tablist's own background. */}
                      <span className="relative">
                        {a === 'site' ? "I'm a research site" : "I'm a sponsor / CRO"}
                      </span>
                    </button>
                  )
                })}
              </div>

              <AnimatePresence mode="wait">
                {status === 'sent' ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex min-h-[24rem] flex-col items-center justify-center text-center"
                    role="status"
                  >
                    <span className="grid h-16 w-16 place-items-center rounded-full border border-aqua-400/30 bg-aqua-400/10 text-aqua-300">
                      <Icon.check className="h-7 w-7" strokeWidth={2} />
                    </span>
                    <h3 className="mt-7 font-display text-2xl font-semibold tracking-[-0.02em] text-foam">
                      Thank you — we have it
                    </h3>
                    <p className="mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-mist">
                      A member of the Orca team will be in touch within two working days. If it is
                      urgent, call{' '}
                      <a
                        href={'tel:' + site.phoneHref}
                        className="rounded px-0.5 py-1 text-aqua-300 underline-offset-4 hover:underline"
                      >
                        {site.phone}
                      </a>
                      .
                    </p>
                    <Button
                      variant="outline"
                      className="mt-8"
                      onClick={() => setStatus('idle')}
                      type="button"
                    >
                      Send another enquiry
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key={'form-' + audience}
                    onSubmit={onSubmit}
                    noValidate
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 grid gap-4 sm:grid-cols-2"
                  >
                    {audience === 'site' ? (
                      <>
                        <Field
                          label="Site name"
                          name="siteName"
                          required
                          autoComplete="organization"
                          value={siteValues.siteName}
                          onChange={set('siteName')}
                          error={errors.siteName}
                          className="sm:col-span-2"
                        />
                        <Field
                          label="Site coordinator"
                          name="coordinator"
                          required
                          autoComplete="name"
                          value={siteValues.coordinator}
                          onChange={set('coordinator')}
                          error={errors.coordinator}
                        />
                        <Field
                          label="Email"
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          value={siteValues.email}
                          onChange={set('email')}
                          error={errors.email}
                        />
                        <Field
                          label="City"
                          name="city"
                          required
                          autoComplete="address-level2"
                          value={siteValues.city}
                          onChange={set('city')}
                          error={errors.city}
                        />
                        <Field
                          label="State"
                          name="state"
                          required
                          autoComplete="address-level1"
                          value={siteValues.state}
                          onChange={set('state')}
                          error={errors.state}
                        />
                        <Field
                          label="Phone (optional)"
                          name="phone"
                          type="tel"
                          autoComplete="tel"
                          value={siteValues.phone}
                          onChange={set('phone')}
                          className="sm:col-span-2"
                        />

                        {/* Address detail is not worth a required field — we can
                            collect it on the call. Hidden until asked for. */}
                        <div className="sm:col-span-2">
                          <button
                            type="button"
                            onClick={() => setShowOptional((v) => !v)}
                            aria-expanded={showOptional}
                            className="-mx-2 flex min-h-11 items-center gap-2 rounded-lg px-2 text-[0.8125rem] font-medium text-aqua-300 transition-colors hover:text-aqua-200 sm:min-h-9"
                          >
                            <Icon.arrowDown
                              className={
                                'h-3.5 w-3.5 transition-transform duration-300 ' +
                                (showOptional ? 'rotate-180' : '')
                              }
                            />
                            {showOptional ? 'Hide address details' : 'Add address details (optional)'}
                          </button>
                        </div>

                        <AnimatePresence initial={false}>
                          {showOptional && (
                            <motion.div
                              key="optional"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                              className="grid gap-4 overflow-hidden sm:col-span-2 sm:grid-cols-2"
                            >
                              <Field
                                label="Address"
                                name="address"
                                autoComplete="street-address"
                                value={siteValues.address}
                                onChange={set('address')}
                                className="sm:col-span-2"
                              />
                              <Field
                                label="Country"
                                name="country"
                                autoComplete="country-name"
                                value={siteValues.country}
                                onChange={set('country')}
                              />
                              <Field
                                label="Zip code"
                                name="zip"
                                autoComplete="postal-code"
                                value={siteValues.zip}
                                onChange={set('zip')}
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <TextareaField
                          label="Anything we should know? (optional)"
                          name="comments"
                          rows={3}
                          value={siteValues.comments}
                          onChange={set('comments')}
                          error={errors.comments}
                          className="sm:col-span-2"
                        />
                      </>
                    ) : (
                      <>
                        <Field
                          label="Company"
                          name="organization"
                          required
                          autoComplete="organization"
                          value={sponsorValues.organization}
                          onChange={set('organization')}
                          error={errors.organization}
                          className="sm:col-span-2"
                        />
                        <Field
                          label="Your name"
                          name="contactName"
                          required
                          autoComplete="name"
                          value={sponsorValues.contactName}
                          onChange={set('contactName')}
                          error={errors.contactName}
                        />
                        <Field
                          label="Work email"
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          value={sponsorValues.email}
                          onChange={set('email')}
                          error={errors.email}
                        />
                        <Field
                          label="Phone (optional)"
                          name="phone"
                          type="tel"
                          autoComplete="tel"
                          value={sponsorValues.phone}
                          onChange={set('phone')}
                        />
                        <Field
                          label="Therapeutic area (optional)"
                          name="therapeuticArea"
                          value={sponsorValues.therapeuticArea}
                          onChange={set('therapeuticArea')}
                        />
                        <SelectField
                          label="Sites needed"
                          name="siteCount"
                          options={SITE_COUNT_OPTIONS}
                          value={sponsorValues.siteCount}
                          onChange={set('siteCount')}
                        />
                        <SelectField
                          label="Timeline"
                          name="timeline"
                          options={TIMELINE_OPTIONS}
                          value={sponsorValues.timeline}
                          onChange={set('timeline')}
                        />
                        <TextareaField
                          label="Tell us about the study (optional)"
                          name="comments"
                          rows={3}
                          value={sponsorValues.comments}
                          onChange={set('comments')}
                          error={errors.comments}
                          className="sm:col-span-2"
                        />
                      </>
                    )}

                    {/* Honeypot — hidden from humans and assistive tech */}
                    <div aria-hidden className="hidden">
                      <label htmlFor="website">Website</label>
                      <input
                        id="website"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                        value={values.website}
                        onChange={set('website')}
                      />
                    </div>

                    {status === 'error' && serverError && (
                      <p
                        role="alert"
                        className="flex items-start gap-2.5 rounded-2xl border border-red-400/25 bg-red-400/8 px-4 py-3 text-[0.8125rem] text-red-200 sm:col-span-2"
                      >
                        <Icon.alert className="mt-px h-4 w-4 shrink-0" />
                        {serverError}
                      </p>
                    )}

                    <div className="mt-2 flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-[0.75rem] leading-relaxed text-fog">
                        We only use these details to contact you about study opportunities. No
                        obligation, no exclusivity.
                      </p>
                      <Button
                        type="submit"
                        disabled={status === 'sending'}
                        data-cta={'submit-' + audience}
                        className="shrink-0"
                      >
                        {status === 'sending'
                          ? 'Sending…'
                          : audience === 'site'
                            ? 'Register my site'
                            : 'Request site feasibility'}
                        {status !== 'sending' && (
                          <Icon.arrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        )}
                      </Button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
