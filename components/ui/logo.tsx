import Image from 'next/image'

/**
 * The official Orca Trial logotype, used verbatim from
 * https://orcatrial.net/wp-content/uploads/2022/11/logo.png (393 x 99).
 * Do not redraw, recolour or re-letter this mark.
 *
 * It is a dark-on-light mark: the "Orca" glyph is #595959, which is close to
 * unreadable on this site's near-black background. Until Orca supplies a
 * reversed (light) version, it sits on a white plate so it renders exactly as
 * designed rather than being recoloured — recolouring a logo is not our call.
 */
export function Logo({ className = 'h-8 w-auto' }: { className?: string }) {
  return (
    <span className="inline-flex items-center rounded-xl bg-white px-3 py-2">
      <Image
        src="/logo.png"
        alt="Orca Trial"
        width={393}
        height={99}
        priority
        className={className}
      />
    </span>
  )
}
