import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'ghost' | 'outline'

const styles: Record<Variant, string> = {
  // Solid brand blue with white text: 6.1:1 against white, and it reads as a
  // button from across the room. A gradient would only muddy that.
  primary:
    'bg-blue-500 text-white shadow-[0_8px_20px_-8px_rgba(68,114,196,0.65)] hover:bg-blue-600 hover:shadow-[0_12px_28px_-8px_rgba(68,114,196,0.75)]',
  outline:
    'border border-line bg-canvas text-ink shadow-card hover:border-blue-400 hover:text-blue-700 hover:shadow-card-hover',
  ghost: 'text-ink-muted hover:text-blue-700 hover:bg-blue-50',
}

const shared =
  'group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-tight transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-55 disabled:active:scale-100'

export function ButtonLink({
  variant = 'primary',
  className = '',
  children,
  ...props
}: { variant?: Variant; children: ReactNode } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={`${shared} ${styles[variant]} ${className}`} {...props}>
      {children}
    </a>
  )
}

export function Button({
  variant = 'primary',
  className = '',
  children,
  ...props
}: { variant?: Variant; children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${shared} ${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
