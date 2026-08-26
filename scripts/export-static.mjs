/**
 * Builds a fully static `out/` folder for hosts that only serve files
 * (FTP, S3, Netlify drop, the client's existing WordPress host).
 *
 * `app/api/register` is a route handler and cannot be statically exported, so
 * it is renamed to `app/_api` for the duration of the build — folders prefixed
 * with `_` are private to the Next app router and never become routes. The
 * original name is always restored, even if the build fails.
 *
 * The registration form then needs an external endpoint:
 *   NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/xxxx npm run export
 */
import { existsSync, renameSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const live = join(root, 'app', 'api')
const parked = join(root, 'app', '_api')

if (!process.env.NEXT_PUBLIC_FORM_ENDPOINT) {
  console.warn(
    '\n[export] NEXT_PUBLIC_FORM_ENDPOINT is not set — the exported site will POST to\n' +
      '         /api/register, which does not exist in a static build. Set it to a\n' +
      '         Formspree / Zapier / CRM endpoint before shipping the export.\n',
  )
}

let moved = false
try {
  if (existsSync(live)) {
    renameSync(live, parked)
    moved = true
  }

  const result = spawnSync('npx', ['next', 'build'], {
    stdio: 'inherit',
    shell: process.platform === 'win32',
    env: { ...process.env, STATIC_EXPORT: '1' },
  })

  process.exitCode = result.status ?? 1
} finally {
  if (moved && existsSync(parked)) renameSync(parked, live)
}
