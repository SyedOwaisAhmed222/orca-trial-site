export type Audience = 'site' | 'sponsor'

export type SiteInput = {
  audience: 'site'
  siteName: string
  coordinator: string
  email: string
  phone?: string
  city: string
  state: string
  address?: string
  zip?: string
  country?: string
  comments?: string
  website?: string
}

export type SponsorInput = {
  audience: 'sponsor'
  organization: string
  contactName: string
  email: string
  phone?: string
  role?: string
  therapeuticArea?: string
  siteCount?: string
  timeline?: string
  comments?: string
  website?: string
}

export type RegistrationInput = SiteInput | SponsorInput
export type AnyField = keyof SiteInput | keyof SponsorInput
export type FieldErrors = Partial<Record<AnyField, string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i

/**
 * Required sets are deliberately short. Every extra required field costs
 * completions; address, zip and phone can all be collected on the follow-up
 * call, so they stay optional.
 */
const REQUIRED: Record<Audience, Array<[AnyField, string]>> = {
  site: [
    ['siteName', 'Site name is required'],
    ['coordinator', 'Site coordinator name is required'],
    ['email', 'Email is required'],
    ['city', 'City is required'],
    ['state', 'State is required'],
  ],
  sponsor: [
    ['organization', 'Company name is required'],
    ['contactName', 'Your name is required'],
    ['email', 'Work email is required'],
  ],
}

/** Shared by the client (instant feedback) and the API route (trust boundary). */
export function validateRegistration(input: Partial<RegistrationInput>): FieldErrors {
  const errors: FieldErrors = {}
  const audience: Audience = input.audience === 'sponsor' ? 'sponsor' : 'site'
  const record = input as Record<string, unknown>

  for (const [key, message] of REQUIRED[audience]) {
    if (!String(record[key] ?? '').trim()) errors[key] = message
  }

  const email = String(record.email ?? '').trim()
  if (email && !EMAIL_RE.test(email)) errors.email = 'Enter a valid email address'

  if (String(record.comments ?? '').length > 4000) {
    errors.comments = 'Please keep this under 4000 characters'
  }

  return errors
}

export const emptySite: SiteInput = {
  audience: 'site',
  siteName: '',
  coordinator: '',
  email: '',
  phone: '',
  city: '',
  state: '',
  address: '',
  zip: '',
  country: 'United States',
  comments: '',
  website: '',
}

export const emptySponsor: SponsorInput = {
  audience: 'sponsor',
  organization: '',
  contactName: '',
  email: '',
  phone: '',
  role: '',
  therapeuticArea: '',
  siteCount: '',
  timeline: '',
  comments: '',
  website: '',
}

export const SITE_COUNT_OPTIONS = [
  'Not sure yet',
  '1 – 5 sites',
  '6 – 15 sites',
  '16 – 40 sites',
  '40+ sites',
] as const

export const TIMELINE_OPTIONS = [
  'Exploring options',
  'Within 1 month',
  '1 – 3 months',
  '3 – 6 months',
] as const
