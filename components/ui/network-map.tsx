'use client'

import { motion } from 'motion/react'

/**
 * Stylised map of the US site footprint. Coordinates are hand-placed inside a
 * 100 x 58 viewBox so the scatter reads as the continental United States
 * without shipping a geo dataset. Purely illustrative.
 */
const NODES: Array<[number, number, number]> = [
  // [x, y, weight] — weight 2 marks a hub that gets a sonar ring
  [7, 13, 2], [11, 20, 1], [8, 27, 1], [6, 34, 2], [10, 40, 1], [13, 46, 1],
  [18, 15, 1], [21, 24, 1], [17, 32, 1], [22, 38, 2], [19, 45, 1],
  [28, 12, 1], [30, 21, 1], [26, 29, 1], [31, 36, 1], [27, 43, 1],
  [37, 16, 1], [40, 25, 2], [35, 32, 1], [41, 39, 1], [38, 47, 1],
  [46, 13, 1], [49, 22, 1], [45, 30, 1], [50, 37, 1], [47, 46, 2],
  [55, 17, 1], [58, 26, 1], [54, 33, 2], [59, 40, 1], [56, 48, 1],
  [64, 14, 1], [67, 23, 1], [63, 31, 1], [68, 38, 1], [65, 45, 1],
  [73, 18, 2], [76, 27, 1], [72, 34, 1], [77, 41, 1],
  [82, 15, 1], [85, 24, 2], [81, 32, 1], [86, 38, 1],
  [90, 19, 1], [93, 27, 1], [89, 34, 1],
  [83, 47, 1], [85, 52, 2],
]

// Short-range links only, so the mesh reads as a network rather than noise.
const LINKS: Array<[number, number]> = (() => {
  const out: Array<[number, number]> = []
  for (let i = 0; i < NODES.length; i++) {
    for (let j = i + 1; j < NODES.length; j++) {
      const dx = NODES[i][0] - NODES[j][0]
      const dy = NODES[i][1] - NODES[j][1]
      if (Math.hypot(dx, dy) < 11) out.push([i, j])
    }
  }
  return out
})()

export function NetworkMap({
  className = '',
  decorative = false,
}: {
  className?: string
  /** Backdrop mode: no label, no sonar pulses, thinner marks. */
  decorative?: boolean
}) {
  // Two instances of this map can be on the page at once, so the gradient ids
  // have to differ or the second one would redefine the first.
  const glow = decorative ? 'node-glow-bg' : 'node-glow'
  const link = decorative ? 'link-grad-bg' : 'link-grad'

  return (
    <div className={'relative ' + className}>
      <svg
        viewBox="0 0 100 58"
        className="h-auto w-full overflow-visible"
        role={decorative ? undefined : 'img'}
        aria-hidden={decorative || undefined}
        aria-label={
          decorative
            ? undefined
            : 'Illustrative map of Orca research sites across the United States'
        }
      >
        <defs>
          <radialGradient id={glow}>
            <stop offset="0%" stopColor="var(--color-aqua-300)" stopOpacity="0.85" />
            <stop offset="100%" stopColor="var(--color-aqua-500)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={link} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-aqua-400)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--color-tide-500)" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        <g stroke={'url(#' + link + ')'} strokeWidth="0.16">
          {LINKS.map(([a, b], i) => (
            <motion.line
              key={'l' + i}
              x1={NODES[a][0]}
              y1={NODES[a][1]}
              x2={NODES[b][0]}
              y2={NODES[b][1]}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.2 + (i % 24) * 0.03, ease: 'easeOut' }}
            />
          ))}
        </g>

        <g>
          {NODES.map(([x, y, w], i) => (
            <g key={'n' + i}>
              {w === 2 && (
                <circle
                  cx={x}
                  cy={y}
                  r="2.6"
                  fill={'url(#' + glow + ')'}
                  className="animate-node-pulse"
                  style={{ animationDelay: (i * 0.28).toFixed(2) + 's' }}
                />
              )}
              <motion.circle
                cx={x}
                cy={y}
                r={w === 2 ? 0.85 : 0.5}
                fill={w === 2 ? 'var(--color-aqua-200)' : 'var(--color-aqua-400)'}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.1 + i * 0.022,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ transformOrigin: x + 'px ' + y + 'px' }}
              />
            </g>
          ))}
        </g>
      </svg>
    </div>
  )
}
