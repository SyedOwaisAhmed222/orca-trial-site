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
| Why choose Orca      | `components/sections/why-orca.tsx`          | `#why`       |
| Business model       | `components/sections/business-model.tsx`    | `#model`     |
| Sponsors / CROs      | `components/sections/sponsors.tsx`          | `#sponsors`  |
| Site network + map   | `components/sections/site-network.tsx`      | `#network`   |
| Therapeutic areas    | `components/sections/therapeutic-areas.tsx` | `#areas`     |
| Register your site   | `components/sections/register.tsx`          | `#register`  |
| Let's connect        | `components/sections/contact.tsx`           | `#contact`   |

## Editing content

Almost everything is data-driven. To change the nav, stats, pillars, therapeutic
areas or contact details, edit `lib/content.ts` — no component changes needed.

Adding a therapeutic area also needs a matching glyph in the `AreaIcon` map in
[`components/ui/icons.tsx`](components/ui/icons.tsx); the `icon` key in the
content file is type-checked against it.

## The registration form

`POST /api/register` validates the submission (shared rules in
`lib/registration.ts`, so client and server never drift), rejects honeypot hits
silently, and rate-limits to 5 submissions per IP per 10 minutes.

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

## Notes

- Fonts (Sora + Inter) are self-hosted at build time by `next/font`, so there is
  no runtime request to Google.
- Scroll reveals render their hidden state during SSR; a `<noscript>` style block
  in `app/layout.tsx` forces everything visible when JS is unavailable.
- All motion respects `prefers-reduced-motion`.
- The US map in `components/ui/network-map.tsx` is an illustrative scatter, not
  real geodata — the caption says so.
