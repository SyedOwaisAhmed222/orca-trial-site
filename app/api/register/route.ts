import { NextResponse } from 'next/server'
import { validateRegistration, type RegistrationInput } from '@/lib/registration'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Naive in-memory throttle: 5 submissions per IP per 10 minutes.
 * Good enough for a single-instance marketing site; swap for a shared
 * store (Redis/Upstash) if the site is ever scaled horizontally.
 */
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)

  // Keep the map from growing without bound.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key)
    }
  }

  return recent.length > MAX_PER_WINDOW
}

function clientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0].trim()
  return req.headers.get('x-real-ip') ?? 'unknown'
}

export async function POST(req: Request) {
  let body: Partial<RegistrationInput>

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ message: 'Invalid request body.' }, { status: 400 })
  }

  // Honeypot: pretend everything went fine so bots do not learn anything.
  if (String(body.website ?? '').trim()) {
    return NextResponse.json({ ok: true })
  }

  if (rateLimited(clientIp(req))) {
    return NextResponse.json(
      { message: 'Too many submissions. Please try again later.' },
      { status: 429 },
    )
  }

  const errors = validateRegistration(body)
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { message: 'Please correct the highlighted fields.', errors },
      { status: 422 },
    )
  }

  const submission = {
    siteName: String(body.siteName).trim(),
    email: String(body.email).trim(),
    coordinator: String(body.coordinator).trim(),
    address: String(body.address).trim(),
    city: String(body.city).trim(),
    state: String(body.state).trim(),
    country: String(body.country).trim(),
    zip: String(body.zip).trim(),
    comments: String(body.comments ?? '').trim(),
    receivedAt: new Date().toISOString(),
  }

  const webhook = process.env.REGISTRATION_WEBHOOK_URL
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          notify: process.env.REGISTRATION_NOTIFY_EMAIL,
          ...submission,
        }),
      })
      if (!res.ok) throw new Error('Webhook responded ' + res.status)
    } catch (err) {
      console.error('[register] webhook delivery failed', err)
      return NextResponse.json(
        { message: 'We could not record your submission. Please email us instead.' },
        { status: 502 },
      )
    }
  } else {
    // No delivery target configured — log it so nothing is silently dropped.
    console.info('[register] new site registration', submission)
  }

  return NextResponse.json({ ok: true })
}
