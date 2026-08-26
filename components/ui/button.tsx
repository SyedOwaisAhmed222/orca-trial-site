import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'ghost' | 'outline'

const styles: Record<Variant, string> = {
  primary:
    'bg-linear-to-r from-blue-400 to-blue-300 text-abyss shadow-[0_10px_36px_-10px_var(--color-blue-1000)] hover:shadow-[0_16px_48px_-10px_var(--color-blue-400)] hover:brightness-110',
  outline:
    'glass text-foam hover:bg-foam/10 hover:border-blue-400/45',
  ghost: 'text-mist hover:text-foam hover:bg-foam/6',
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
