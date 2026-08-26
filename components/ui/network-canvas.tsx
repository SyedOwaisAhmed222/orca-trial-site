'use client'

import { useCallback, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { NODES, LINKS } from './network-data'

/**
 * The site network, rendered as something you can push around rather than a
 * picture you scroll past. The whole field tilts toward the pointer, hubs
 * pulse, and hovering a node lights its immediate connections — which is the
 * point Orca's own sentence makes: the sites are connected, not a list.
 *
 * Coordinates are the same illustrative scatter used elsewhere; no real site
 * addresses are implied and the caption says so.
 */
export function NetworkCanvas({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [hover, setHover] = useState<number | null>(null)

  // Pointer position, normalised to -0.5…0.5, smoothed.
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 90, damping: 20, mass: 0.4 })
  const sy = useSpring(py, { stiffness: 90, damping: 20, mass: 0.4 })

  const rotateY = useTransform(sx, [-0.5, 0.5], [9, -9])
  const rotateX = useTransform(sy, [-0.5, 0.5], [-7, 7])
  const shiftX = useTransform(sx, [-0.5, 0.5], [14, -14])
  const shiftY = useTransform(sy, [-0.5, 0.5], [10, -10])

  const onMove = useCallback(
    (e: React.PointerEvent) => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      px.set((e.clientX - r.left) / r.width - 0.5)
      py.set((e.clientY - r.top) / r.height - 0.5)
    },
    [px, py],
  )

  const reset = useCallback(() => {
    px.set(0)
    py.set(0)
    setHover(null)
  }, [px, py])

  // Which links touch the hovered node.
  const litLinks = new Set<number>()
  if (hover !== null) {
    LINKS.forEach(([a, b], i) => {
      if (a === hover || b === hover) litLinks.add(i)
    })
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={'relative [perspective:1200px] ' + className}
    >
      <motion.svg
        viewBox="0 0 100 58"
        style={{ rotateX, rotateY, x: shiftX, y: shiftY, transformStyle: 'preserve-3d' }}
        className="h-auto w-full overflow-visible"
        role="img"
        aria-label="Illustrative map of Orca research sites across the United States"
      >
        <defs>
          <radialGradient id="canvas-glow">
            <stop offset="0%" stopColor="var(--color-blue-200)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--color-blue-500)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="canvas-link" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-blue-400)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--color-blue-600)" stopOpacity="0.18" />
          </linearGradient>
        </defs>

        <g>
          {LINKS.map(([a, b], i) => {
            const lit = litLinks.has(i)
            return (
              <motion.line
                key={'l' + i}
                x1={NODES[a][0]}
                y1={NODES[a][1]}
                x2={NODES[b][0]}
                y2={NODES[b][1]}
                stroke={lit ? 'var(--color-blue-200)' : 'url(#canvas-link)'}
                strokeWidth={lit ? 0.3 : 0.16}
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: 0.15 + (i % 26) * 0.028, ease: 'easeOut' }}
                style={{ transition: 'stroke 0.25s, stroke-width 0.25s' }}
              />
            )
          })}
        </g>

        <g>
          {NODES.map(([x, y, w], i) => {
            const isHub = w === 2
            const active = hover === i
            return (
              <g key={'n' + i}>
                {isHub && (
                  <circle
                    cx={x}
                    cy={y}
                    r="2.6"
                    fill="url(#canvas-glow)"
                    className="animate-node-pulse"
                    style={{ animationDelay: (i * 0.28).toFixed(2) + 's' }}
                  />
                )}
                {/* Generous invisible hit area — the visible dots are tiny. */}
                <circle
                  cx={x}
                  cy={y}
                  r="2.4"
                  fill="transparent"
                  className="cursor-pointer"
                  onPointerEnter={() => setHover(i)}
                />
                <motion.circle
                  cx={x}
                  cy={y}
                  r={active ? 1.5 : isHub ? 0.85 : 0.5}
                  fill={
                    active || isHub ? 'var(--color-blue-200)' : 'var(--color-blue-400)'
                  }
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.02, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    transformOrigin: x + 'px ' + y + 'px',
                    transition: 'r 0.25s, fill 0.25s',
                  }}
                />
              </g>
            )
          })}
        </g>
      </motion.svg>
    </div>
  )
}
