# Orca Trial — website

Replacement marketing site for [orcatrial.net](https://orcatrial.net) (currently
WordPress + Astra + Elementor). Single-page, dark "deep ocean" design system,
built to be edited without touching layout code.

- **Stack** — Next.js 15 (App Router) · React 19 · Tailwind CSS v4 · Motion
- **Copy** — every string lives in [`lib/content.ts`](lib/content.ts)
- **Design tokens** — colors, fonts, radii, keyframes and custom utilities live
  in the `@theme` block at the top of [`app/globals.css`](app/globals.css)

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

## Scripts

| Script           | What it does                                                     |
| ---------------- | ---------------------------------------------------------------- |
| `npm run dev`    | Dev server with hot reload                                        |
| `npm run build`  | Production build (keeps the `/api/register` route)                |
| `npm start`      | Serve the production build on Node                                |
| `npm run export` | Fully static `out/` folder for FTP / S3 / any static host         |

## Page structure

`app/page.tsx` composes the sections in order:

| Section              | File                                        | Anchor       |
| -------------------- | ------------------------------------------- | ------------ |
| Hero + stat rail     | `components/sections/hero.tsx`              | `#top`       |
| Therapeutic ticker   | `components/sections/marquee.tsx`           | —            |
| Guarantee strip      | `components/sections/trust-bar.tsx`         | —            |
| Why choose Orca      | `components/sections/why-orca.tsx`          | `#why`       |
| Business model       | `components/sections/business-model.tsx`    | `#model`     |
| Sponsors / CROs      | `components/sections/sponsors.tsx`          | `#sponsors`  |
| Site network + map   | `components/sections/site-network.tsx`      | `#network`   |
| Therapeutic areas    | `components/sections/therapeutic-areas.tsx` | `#areas`     |
| Enquiry form (both)  | `components/sections/register.tsx`          | `#register`  |
| Let's connect        | `components/sections/contact.tsx`           | `#contact`   |

## Editing content

Almost everything is data-driven. To change the nav, stats, pillars, therapeutic
areas or contact details, edit `lib/content.ts` — no component changes needed.

Adding a therapeutic area also needs a matching glyph in the `AreaIcon` map in
[`components/ui/icons.tsx`](components/ui/icons.tsx); the `icon` key in the
content file is type-checked against it.

## The enquiry form

The form serves **both audiences** from one section. A tab switch flips it
between a research-site registration and a sponsor/CRO feasibility request, and
every CTA on the page pre-selects the right tab before scrolling to it (see
`lib/audience-store.ts`). A sponsor should never be shown a field labelled
"Site coordinator".

Required fields are kept deliberately short — everything else can be collected
on the follow-up call:

| Audience     | Required                                          |
| ------------ | ------------------------------------------------- |
| Research site | Site name, coordinator, email, city, state        |
| Sponsor / CRO | Company, contact name, work email                 |

`POST /api/register` validates the submission (shared rules in
`lib/registration.ts`, so client and server never drift), rejects honeypot hits
silently, and rate-limits to 5 submissions per IP per 10 minutes. The payload
carries an `audience` field of `"site"` or `"sponsor"`; only the fields for that
audience are forwarded.

Delivery is configured with environment variables — copy `.env.example` to
`.env.local`:

| Variable                    | Effect                                                        |
| --------------------------- | ------------------------------------------------------------- |
| `REGISTRATION_WEBHOOK_URL`  | Submissions are POSTed here (Zapier, Make, a CRM endpoint)     |
| `REGISTRATION_NOTIFY_EMAIL` | Passed along in the webhook payload as the notification target |

With no webhook configured, submissions are written to the server log rather
than dropped — fine for local development, **not** for production.

> The in-memory rate limiter is per-process. If the site is ever run on more
> than one instance, move it to a shared store (Redis/Upstash).

## Deploying

**Node / Vercel (recommended)** — `npm run build` then `npm start`, or push to
Vercel. The API route works as-is.

**Static host (the current WordPress server, S3, Netlify drop)** —
route handlers cannot be statically exported, so point the form at an external
endpoint and export:

```bash
NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/xxxxxxx npm run export
# upload the resulting out/ folder
```

`scripts/export-static.mjs` temporarily hides `app/api` for the duration of that
build and always restores it afterwards.

## Conversion notes

Choices here exist to protect the lead, not just to look tidy:

- **Two audiences, one form.** Sponsors and sites want different things and are
  asked for different fields. Every CTA routes to the right tab.
- **Short required sets.** Address, zip and phone are optional and collapsed
  behind a disclosure.
- **The phone number is always reachable** — nav on desktop, a sticky bar on
  phones (`components/mobile-cta-bar.tsx`) that hides itself when the form is on
  screen so it never covers what it points at.
- **Objections answered early.** `trust-bar.tsx` puts the four deal-breakers
  (fees, exclusivity, when Orca gets paid, response time) directly under the hero.
- **A stated response time** ("within two working days") appears beside the form
  and again on the success screen, alongside the phone number.
- **Analytics hooks.** Every CTA carries a `data-cta="…"` attribute, so GTM or
  Plausible can be wired up without touching components.

## Notes

- Fonts (Sora + Inter) are self-hosted at build time by `next/font`, so there is
  no runtime request to Google.
- Scroll reveals render their hidden state during SSR; a `<noscript>` style block
  in `app/layout.tsx` forces everything visible when JS is unavailable.
- All motion respects `prefers-reduced-motion`.
- The US map in `components/ui/network-map.tsx` is an illustrative scatter, not
  real geodata — the caption says so.
