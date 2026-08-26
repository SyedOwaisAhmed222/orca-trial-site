/**
 * Fails if any `var(--color-*)` in the codebase has no matching definition in
 * the @theme block of globals.css.
 *
 * This exists because a find-and-replace once rewrote `--color-aqua-500` as
 * `--color-blue-100` plus a stray `0`, leaving five files pointing at
 * `--color-blue-1000`. CSS resolves an undefined custom property to nothing and
 * carries on, so the build stayed green and the colour just quietly went wrong.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, extname } from 'node:path'

const ROOTS = ['app', 'components', 'lib']
const EXT = new Set(['.css', '.ts', '.tsx'])

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry)
    if (statSync(p).isDirectory()) walk(p, out)
    else if (EXT.has(extname(p))) out.push(p)
  }
  return out
}

const css = readFileSync('app/globals.css', 'utf8')
const themeStart = css.indexOf('@theme {')
const themeEnd = css.indexOf('@keyframes')
if (themeStart === -1 || themeEnd === -1) {
  console.error('check-tokens: could not locate the @theme block in app/globals.css')
  process.exit(1)
}
const defined = new Set(
  [...css.slice(themeStart, themeEnd).matchAll(/(--color-[a-z0-9-]+)\s*:/g)].map((m) => m[1]),
)

const problems = []
for (const file of ROOTS.flatMap((r) => walk(r))) {
  const src = readFileSync(file, 'utf8')
  src.split('\n').forEach((line, i) => {
    for (const m of line.matchAll(/var\((--color-[a-z0-9-]+)\)/g)) {
      if (!defined.has(m[1])) problems.push(`${file}:${i + 1}  ${m[1]}`)
    }
  })
}

if (problems.length) {
  console.error('check-tokens: ' + problems.length + ' reference(s) to undefined colour tokens:')
  for (const p of problems) console.error('  ' + p)
  console.error('\nDefined tokens: ' + [...defined].sort().join(', '))
  process.exit(1)
}

console.log(`check-tokens: ok (${defined.size} tokens defined, all references resolve)`)
