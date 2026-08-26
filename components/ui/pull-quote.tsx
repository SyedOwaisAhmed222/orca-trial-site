'use client'

import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

/**
 * Shows the emphasised clause of an Orca sentence at display size, with the
 * full original sentence one tap away.
 *
 * `lead` is always a verbatim substring of `body` (enforced in lib/content.ts),
 * so the highlight is Orca's own wording — nothing is paraphrased, and nothing
 * is hidden from anyone who wants the whole thing.
 */
export function PullQuote({
  lead,
  body,
  size = 'md',
  className = '',
}: {
  lead: string
  body: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const id = useId()

  const scale = {
    sm: 'text-[1.0625rem] leading-snug',
    md: 'text-[1.25rem] leading-snug md:text-[1.4rem]',
    lg: 'text-[1.5rem] leading-[1.15] md:text-[1.9rem]',
  }[size]

  // Split the body around the lead so the rest can be revealed in context.
  const at = body.indexOf(lead)
  const before = at >= 0 ? body.slice(0, at) : ''
  const after = at >= 0 ? body.slice(at + lead.length) : body

  return (
    <div className={className}>
      <p
        className={`font-display font-semibold tracking-[-0.02em] text-ink text-balance ${scale}`}
      >
        {lead}
      </p>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="full"
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pt-4 text-[0.9375rem] leading-relaxed text-ink-muted text-pretty">
              {before}
              <span className="text-ink">{lead}</span>
              {after}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={id}
        className="group/more -mx-2 mt-4 inline-flex min-h-11 items-center gap-2 rounded-lg px-2 text-[0.8125rem] font-medium text-blue-600 transition-colors hover:text-blue-700 sm:min-h-9"
      >
        <span
          aria-hidden
          className="grid h-5 w-5 place-items-center rounded-full border border-blue-300 text-[0.75rem] leading-none transition-transform duration-300 group-hover/more:border-blue-400/60"
        >
          {open ? '−' : '+'}
        </span>
        {open ? 'Show less' : 'Read the full statement'}
      </button>
    </div>
  )
}
