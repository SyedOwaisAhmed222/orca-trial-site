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

export type IconName = keyof typeof Icon
