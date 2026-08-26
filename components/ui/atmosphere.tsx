/**
 * Page background. On light, restraint matters more than effect: a couple of
 * very soft brand-blue washes and a blueprint grid, no grain and no vignette.
 * Anything heavier competes with the content instead of seating it.
 */
export function Atmosphere() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-canvas" />

      {/* Soft washes, kept faint enough that text contrast never moves */}
      <div className="absolute -top-[26rem] left-1/2 h-[48rem] w-[48rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,var(--color-blue-200)_0%,transparent_65%)] opacity-45 blur-[110px] animate-drift" />
      <div className="absolute top-1/3 -right-64 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,var(--color-blue-100)_0%,transparent_68%)] opacity-60 blur-[120px] animate-drift-slow" />

      <div className="absolute inset-0 grid-veil opacity-70" />
    </div>
  )
}

/** A soft brand wash placed behind an individual section. */
export function SectionGlow({
  className = '',
  color = 'var(--color-blue-200)',
}: {
  className?: string
  color?: string
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-full blur-[110px] opacity-40 ${className}`}
      style={{ background: `radial-gradient(circle, ${color} 0%, transparent 68%)` }}
    />
  )
}
