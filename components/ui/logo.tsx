import Image from 'next/image'

/**
 * The official Orca Trial logotype, used verbatim from
 * https://orcatrial.net/wp-content/uploads/2022/11/logo.png (393 x 99).
 * Do not redraw, recolour or re-letter this mark.
 *
 * It is a dark-on-light mark, which is exactly what this page is — so it sits
 * directly on the background. The white plate it needed under the dark theme
 * is gone.
 */
export function Logo({ className = 'h-9 w-auto' }: { className?: string }) {
  return (
    <Image
      src="/logo.png"
      alt="Orca Trial"
      width={393}
      height={99}
      priority
      className={className}
    />
  )
}
