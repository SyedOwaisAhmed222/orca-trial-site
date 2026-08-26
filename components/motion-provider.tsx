'use client'

import { MotionConfig } from 'motion/react'
import type { ReactNode } from 'react'

/**
 * Reduced-motion handling has to live here rather than in each component.
 *
 * `useReducedMotion()` returns false during SSR and the user's real preference
 * after hydration, so branching on it to pick an `initial` prop makes the
 * server and client render different markup — React bails out with a hydration
 * mismatch. `reducedMotion="user"` lets Motion suppress transform and layout
 * animations internally, after hydration, where the preference belongs.
 * Opacity fades are kept: they are not the kind of motion that causes trouble.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
