'use client'

import { motion } from 'motion/react'

import { NODES, LINKS } from './network-data'

/**
 * Static rendering of the shared network dataset, used in the site-network
 * section. The interactive version lives in network-canvas.tsx.
 */
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
            <stop offset="0%" stopColor="var(--color-blue-300)" stopOpacity="0.85" />
            <stop offset="100%" stopColor="var(--color-blue-1000)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={link} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-blue-400)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--color-blue-600)" stopOpacity="0.15" />
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
                fill={w === 2 ? 'var(--color-blue-200)' : 'var(--color-blue-400)'}
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
