'use client'

import { useEffect, useState } from 'react'

/**
 * False during SSR and on the first client render, true afterwards.
 *
 * Scroll-linked Motion values write inline styles that the server and the
 * client serialise slightly differently — floating-point transforms round
 * differently, and numeric opacity comes back as a string — which React
 * reports as a hydration mismatch. Gating those elements on this hook keeps
 * the first client render byte-identical to the server's, then swaps in the
 * animated version once hydration is done.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted
}
