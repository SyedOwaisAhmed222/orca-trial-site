import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

/** Shared stroke geometry keeps every icon optically consistent at 24px. */
const base: IconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export const Icon = {
  network: (p: IconProps) => (
    <svg {...base} {...p}>
      <circle cx="12" cy="5" r="2.2" />
      <circle cx="5" cy="18" r="2.2" />
      <circle cx="19" cy="18" r="2.2" />
      <path d="M10.4 6.8 6.2 15.9M13.6 6.8l4.2 9.1M7.2 18h9.6" />
    </svg>
  ),
  layers: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="m12 3 8.5 4.5L12 12 3.5 7.5 12 3Z" />
      <path d="m4 12 8 4.3 8-4.3M4 16.4l8 4.3 8-4.3" />
    </svg>
  ),
  shield: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M12 3 5 6v5.6c0 4 2.9 7.6 7 9.4 4.1-1.8 7-5.4 7-9.4V6l-7-3Z" />
      <path d="m9.2 12.1 2 2 3.6-3.9" />
    </svg>
  ),
  compass: (p: IconProps) => (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="m14.8 9.2-1.5 4.1-4.1 1.5 1.5-4.1 4.1-1.5Z" />
    </svg>
  ),
  globe: (p: IconProps) => (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.4 2.5 3.6 5.5 3.6 9s-1.2 6.5-3.6 9c-2.4-2.5-3.6-5.5-3.6-9S9.6 5.5 12 3Z" />
    </svg>
  ),
  badge: (p: IconProps) => (
    <svg {...base} {...p}>
      <circle cx="12" cy="9.5" r="5.5" />
      <path d="m8.4 14.2-1 6.3 4.6-2.5 4.6 2.5-1-6.3" />
      <path d="m10.1 9.4 1.4 1.5 2.5-2.7" />
    </svg>
  ),
  spark: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3 9 9M15 15l2.7 2.7M17.7 6.3 15 9M9 15l-2.7 2.7" />
    </svg>
  ),
  arrowRight: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M4 12h15M13.5 6.5 20 12l-6.5 5.5" />
    </svg>
  ),
  arrowDown: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M12 4v15M6.5 13.5 12 20l5.5-6.5" />
    </svg>
  ),
  check: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  ),
  mail: (p: IconProps) => (
    <svg {...base} {...p}>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="m3.8 7.5 7.1 5.1a2 2 0 0 0 2.2 0l7.1-5.1" />
    </svg>
  ),
  phone: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M7.5 3.5h-2A2.5 2.5 0 0 0 3 6.2C3 14 10 21 17.8 21a2.5 2.5 0 0 0 2.7-2.5v-2l-4.2-1.6-1.9 2.1a13.7 13.7 0 0 1-5.4-5.4l2.1-1.9L9.5 5.6Z" />
    </svg>
  ),
  pin: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  ),
  clock: (p: IconProps) => (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.2l3.2 2" />
    </svg>
  ),
  menu: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  ),
  close: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  ),
  alert: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M12 4.5 2.8 20h18.4L12 4.5Z" />
      <path d="M12 10v4M12 17h.01" />
    </svg>
  ),
} satisfies Record<string, (p: IconProps) => React.ReactElement>

/* ── Therapeutic-area glyphs ─────────────────────────────────────
   Deliberately simple and single-weight so twelve of them read as
   one family in the grid. */
export const AreaIcon = {
  gastro: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M9.5 3.5v2.9c-2.8.9-4.6 3.4-4.6 6.6 0 3.6 2.7 6.5 6.3 6.5 2.7 0 4.6-1.5 5.2-3.6.3-1 1-1.5 2-1.5" />
      <path d="M9.5 6.4c1.9-.7 4-.4 5.5.9" />
    </svg>
  ),
  neuro: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M14.8 19.6c2.4 0 4.4-1.9 4.4-4.3 0-1-.3-1.9-.8-2.6.5-.7.8-1.6.8-2.6 0-2.4-2-4.3-4.4-4.3-.5 0-1 .1-1.5.2A4 4 0 0 0 9.8 4C7.7 4 6 5.7 6 7.8v.7A3.5 3.5 0 0 0 4.2 11.6c0 1.4.8 2.6 2.1 3.2v.3c0 2.1 1.7 3.8 3.8 3.8 1 0 1.9-.4 2.6-1 .6.9 1.4 1.7 2.1 1.7Z" />
      <path d="M12 7.4v10.5M12 10.8h2.4M12 14.2H9.6" />
    </svg>
  ),
  cardio: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M12 20s-7.5-4.6-7.5-9.6A4.4 4.4 0 0 1 12 7.6a4.4 4.4 0 0 1 7.5 2.8C19.5 15.4 12 20 12 20Z" />
    </svg>
  ),
  rheuma: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="m8.5 15.5 7-7" />
      <circle cx="6.7" cy="14.1" r="2.1" />
      <circle cx="9.9" cy="17.3" r="2.1" />
      <circle cx="14.1" cy="6.7" r="2.1" />
      <circle cx="17.3" cy="9.9" r="2.1" />
    </svg>
  ),
  gyn: (p: IconProps) => (
    <svg {...base} {...p}>
      <circle cx="12" cy="9" r="5" />
      <path d="M12 14v6M9.5 17.5h5" />
    </svg>
  ),
  nephro: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M14.4 4.4c-3.6 0-6.5 3.4-6.5 7.6s2.9 7.6 6.5 7.6c2 0 3.6-1.6 3.6-3.7 0-1.4-.7-2.5-.7-3.9s.7-2.5.7-3.9c0-2.1-1.6-3.7-3.6-3.7Z" />
      <path d="M14.2 12h3.2" />
    </svg>
  ),
  diabetes: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M12 3.5S6.5 9.4 6.5 13.2a5.5 5.5 0 0 0 11 0C17.5 9.4 12 3.5 12 3.5Z" />
      <path d="M9.8 13.6a2.4 2.4 0 0 0 2.4 2.4" />
    </svg>
  ),
  internal: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M4 12h3.5l1.8-4.5 3 9 2.2-6 1.5 3.5H20" />
    </svg>
  ),
  endo: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M12 8.6c-1.3-1.7-3.1-2.6-4.8-2.6-1.4 0-2.5.9-2.5 2.7 0 3.5 2.7 6.6 5.2 6.6 1.3 0 2.1-.9 2.1-2.4V8.6Z" />
      <path d="M12 8.6c1.3-1.7 3.1-2.6 4.8-2.6 1.4 0 2.5.9 2.5 2.7 0 3.5-2.7 6.6-5.2 6.6-1.3 0-2.1-.9-2.1-2.4V8.6Z" />
      <path d="M12 8.6v4.3" />
    </svg>
  ),
  peds: (p: IconProps) => (
    <svg {...base} {...p}>
      <circle cx="12" cy="9" r="4.5" />
      <path d="M10.5 8.6h.01M13.5 8.6h.01M10.6 11a2 2 0 0 0 2.8 0" />
      <path d="M5.5 20c1.2-2.8 3.7-4.3 6.5-4.3s5.3 1.5 6.5 4.3" />
    </svg>
  ),
  onco: (p: IconProps) => (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6 7.8 7.8M16.2 16.2l2.2 2.2M18.4 5.6l-2.2 2.2M7.8 16.2l-2.2 2.2" />
    </svg>
  ),
  uro: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M7 8.5V6a5 5 0 0 1 10 0v2.5" />
      <path d="M7 8.5c-1.4 1.4-2 3.2-2 5A5.5 5.5 0 0 0 12 19a5.5 5.5 0 0 0 7-5.5c0-1.8-.6-3.6-2-5" />
    </svg>
  ),
} satisfies Record<string, (p: IconProps) => React.ReactElement>

export type IconName = keyof typeof Icon
export type AreaIconName = keyof typeof AreaIcon
