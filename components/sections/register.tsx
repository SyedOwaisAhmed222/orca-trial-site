'use client'

import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { site } from '@/lib/content'
import {
  emptyRegistration,
  validateRegistration,
  type FieldErrors,
  type RegistrationInput,
} from '@/lib/registration'
import { Button } from '../ui/button'
import { Field, TextareaField } from '../ui/field'
import { Icon } from '../ui/icons'
import { Reveal } from '../ui/reveal'
import { SectionGlow } from '../ui/atmosphere'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export function Register() {
  const [values, setValues] = useState<RegistrationInput>(emptyRegistration)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [serverError, setServerError] = useState('')

  function set(key: keyof RegistrationInput) {
    return (e: { target: { value: string } }) => {
      setValues((v) => ({ ...v, [key]: e.target.value }))
      // Clear the error as soon as the user starts correcting the field.
      setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev))
    }
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
      setValues(emptyRegistration)
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
    <section id="register" className="relative scroll-mt-24 py-28 md:py-36">
      <SectionGlow className="top-1/4 left-1/2 h-[42rem] w-[46rem] -translate-x-1/2" />

      <div className="container-page relative">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          {/* Pitch */}
          <Reveal direction="left">
            <div className="lg:sticky lg:top-28">
              <span className="section-label">
                <span className="h-px w-8 bg-linear-to-r from-transparent to-aqua-400" />
                Register with us
              </span>
              <h2 className="mt-5 font-display text-[clamp(2rem,4.2vw,3.2rem)] leading-[1.05] font-semibold tracking-[-0.035em] text-balance">
                Put your site on the <span className="text-gradient">Orca network</span>.
              </h2>
              <p className="mt-6 text-[1.0625rem] leading-relaxed text-mist text-pretty">
                Study availability through the year, no additional fee from the site, and
                hassle-free business development. Tell us about your site and we will be in touch.
              </p>

              <ul className="mt-9 grid gap-3.5">
                {[
                  'No long-term or exclusive agreements',
                  'Compensation only on successful enrollment',
                  'Payments disbursed the moment sponsors pay',
                ].map((p) => (
                  <li key={p} className="flex items-start gap-3 text-[0.9375rem] text-mist">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-aqua-400/12 text-aqua-300">
                      <Icon.check className="h-3 w-3" strokeWidth={2.4} />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>

              <div className="mt-10 border-t border-foam/8 pt-8 text-sm text-fog">
                Prefer email?{' '}
                <a
                  href={'mailto:' + site.email}
                  className="text-aqua-300 underline-offset-4 hover:underline"
                >
                  {site.email}
                </a>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal direction="right" amount={0.1}>
            <div className="glass ring-glow relative overflow-hidden rounded-5xl p-7 md:p-10">
              <AnimatePresence mode="wait">
                {status === 'sent' ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex min-h-[26rem] flex-col items-center justify-center text-center"
                  >
                    <span className="grid h-16 w-16 place-items-center rounded-full border border-aqua-400/30 bg-aqua-400/10 text-aqua-300">
                      <Icon.check className="h-7 w-7" strokeWidth={2} />
                    </span>
                    <h3 className="mt-7 font-display text-2xl font-semibold tracking-[-0.02em] text-foam">
                      Registration received
                    </h3>
                    <p className="mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-mist">
                      Thank you — we&apos;re looking forward to speaking with you. A member of the
                      Orca team will follow up shortly.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-8"
                      onClick={() => setStatus('idle')}
                      type="button"
                    >
                      Register another site
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={onSubmit}
                    noValidate
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid gap-4 sm:grid-cols-2"
                  >
                    <Field
                      label="Site name"
                      name="siteName"
                      required
                      autoComplete="organization"
                      value={values.siteName}
                      onChange={set('siteName')}
                      error={errors.siteName}
                      className="sm:col-span-2"
                    />
                    <Field
                      label="Email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={values.email}
                      onChange={set('email')}
                      error={errors.email}
                    />
                    <Field
                      label="Site coordinator"
                      name="coordinator"
                      required
                      autoComplete="name"
                      value={values.coordinator}
                      onChange={set('coordinator')}
                      error={errors.coordinator}
                    />
                    <Field
                      label="Address"
                      name="address"
                      required
                      autoComplete="street-address"
                      value={values.address}
                      onChange={set('address')}
                      error={errors.address}
                      className="sm:col-span-2"
                    />
                    <Field
                      label="City"
                      name="city"
                      required
                      autoComplete="address-level2"
                      value={values.city}
                      onChange={set('city')}
                      error={errors.city}
                    />
                    <Field
                      label="State"
                      name="state"
                      required
                      autoComplete="address-level1"
                      value={values.state}
                      onChange={set('state')}
                      error={errors.state}
                    />
                    <Field
                      label="Country"
                      name="country"
                      required
                      autoComplete="country-name"
                      value={values.country}
                      onChange={set('country')}
                      error={errors.country}
                    />
                    <Field
                      label="Zip code"
                      name="zip"
                      required
                      autoComplete="postal-code"
                      value={values.zip}
                      onChange={set('zip')}
                      error={errors.zip}
                    />
                    <TextareaField
                      label="Comments"
                      name="comments"
                      value={values.comments}
                      onChange={set('comments')}
                      error={errors.comments}
                      className="sm:col-span-2"
                    />

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
                        We only use these details to contact you about study opportunities.
                      </p>
                      <Button type="submit" disabled={status === 'sending'} className="shrink-0">
                        {status === 'sending' ? 'Sending…' : 'Register now'}
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
