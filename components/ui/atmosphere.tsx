/**
 * Page-wide background: two slow-drifting aqua auroras, a blueprint grid
 * and a film-grain overlay. Purely decorative, fixed, and pointer-inert.
 */
export function Atmosphere() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-abyss" />

      {/* Auroras */}
      <div className="absolute -top-[28rem] left-1/2 h-[52rem] w-[52rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,var(--color-aqua-500)_0%,transparent_62%)] opacity-30 blur-[110px] animate-drift" />
      <div className="absolute top-1/3 -right-72 h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,var(--color-tide-500)_0%,transparent_65%)] opacity-22 blur-[120px] animate-drift-slow" />
      <div className="absolute bottom-0 -left-64 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,var(--color-kelp-400)_0%,transparent_66%)] opacity-14 blur-[130px] animate-drift" />

      {/* Blueprint grid */}
      <div className="absolute inset-0 grid-veil opacity-60" />

      {/* Grain */}
      <div className="absolute inset-0 opacity-[0.16] mix-blend-overlay [background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22140%22 height=%22140%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/></filter><rect width=%22140%22 height=%22140%22 filter=%22url(%23n)%22 opacity=%220.55%22/></svg>')]" />

      {/* Vignette so content always sits on a settled base */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,transparent_35%,var(--color-abyss)_92%)]" />
    </div>
  )
}

/** A soft radial wash placed behind an individual section. */
export function SectionGlow({
  className = '',
  color = 'var(--color-aqua-500)',
}: {
  className?: string
  color?: string
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-full blur-[110px] opacity-22 ${className}`}
      style={{ background: `radial-gradient(circle, ${color} 0%, transparent 68%)` }}
    />
  )
}
