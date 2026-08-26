export type RegistrationInput = {
  siteName: string
  email: string
  coordinator: string
  address: string
  city: string
  state: string
  country: string
  zip: string
  comments?: string
  /** Honeypot — must stay empty. Bots fill it, humans never see it. */
  website?: string
}

export type FieldErrors = Partial<Record<keyof RegistrationInput, string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i

const REQUIRED: Array<[keyof RegistrationInput, string]> = [
  ['siteName', 'Site name is required'],
  ['email', 'Email is required'],
  ['coordinator', 'Site coordinator name is required'],
  ['address', 'Address is required'],
  ['city', 'City is required'],
  ['state', 'State is required'],
  ['country', 'Country is required'],
  ['zip', 'Zip code is required'],
]

/** Shared by the client (instant feedback) and the API route (trust boundary). */
export function validateRegistration(input: Partial<RegistrationInput>): FieldErrors {
  const errors: FieldErrors = {}

  for (const [key, message] of REQUIRED) {
    if (!String(input[key] ?? '').trim()) errors[key] = message
  }

  const email = String(input.email ?? '').trim()
  if (email && !EMAIL_RE.test(email)) errors.email = 'Enter a valid email address'

  if (String(input.comments ?? '').length > 4000) {
    errors.comments = 'Comments must be under 4000 characters'
  }

  return errors
}

export const emptyRegistration: RegistrationInput = {
  siteName: '',
  email: '',
  coordinator: '',
  address: '',
  city: '',
  state: '',
  country: 'United States',
  zip: '',
  comments: '',
  website: '',
}
