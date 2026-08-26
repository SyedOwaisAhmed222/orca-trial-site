'use client'

import { useSyncExternalStore } from 'react'

export type Audience = 'site' | 'sponsor'

/**
 * Which side of the network the visitor says they are on. Lives outside React
 * so any CTA anywhere on the page can flip the enquiry form to the right tab
 * before scrolling to it — a sponsor should never land on a form asking for a
 * "Site coordinator".
 */
let audience: Audience = 'site'
const listeners = new Set<() => void>()

function emit() {
  for (const l of listeners) l()
}

export function setAudience(next: Audience) {
  if (audience === next) return
  audience = next
  emit()
}

function subscribe(cb: () => void) {
  listeners.add(cb)
  return () => listeners.delete(cb)
}

export function useAudience(): Audience {
  return useSyncExternalStore(
    subscribe,
    () => audience,
    () => 'site' as const,
  )
}

/** Click handler for any CTA that should open the form on a given tab. */
export function openEnquiry(next: Audience) {
  setAudience(next)
  // Let the tab swap paint before the scroll starts, so the panel does not
  // change height mid-flight.
  requestAnimationFrame(() => {
    document.getElementById('register')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}
