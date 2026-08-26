export function Logo({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} role="img" aria-label="Orca Trial">
      <defs>
        <linearGradient id="orca-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-aqua-300)" />
          <stop offset="55%" stopColor="var(--color-aqua-500)" />
          <stop offset="100%" stopColor="var(--color-tide-500)" />
        </linearGradient>
      </defs>

      <rect x="1.5" y="1.5" width="45" height="45" rx="13" fill="url(#orca-g)" opacity="0.12" />
      <rect
        x="1.5"
        y="1.5"
        width="45"
        height="45"
        rx="13"
        fill="none"
        stroke="url(#orca-g)"
        strokeWidth="1.6"
      />

      {/* Dorsal fin breaking the surface */}
      <path
        d="M15 31.5c1.4-11 5.4-17.8 12-21.5-2.6 7-2.1 14.2 1.5 21.5Z"
        fill="url(#orca-g)"
      />
      {/* Waterline */}
      <path
        d="M9 35.5c2.5-2 5-2 7.5 0s5 2 7.5 0 5-2 7.5 0 5 2 7.5 0"
        fill="none"
        stroke="url(#orca-g)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function Wordmark() {
  return (
    <span className="font-display text-[1.0625rem] font-semibold tracking-[-0.02em] text-foam">
      Orca<span className="text-aqua-400">Trial</span>
    </span>
  )
}
