'use client'

import { motion } from 'motion/react'

/**
 * One abstract diagram per sponsor pillar — a picture of the sentence Orca
 * already wrote for that pillar. No new claims, nothing to read.
 *
 * Only `opacity` and `pathLength` are animated. Animating `x`/`y` on an SVG
 * element makes Motion write a transform that stacks on top of the element's
 * own x/y attribute, which silently shifts geometry off-canvas.
 */

const draw = (delay: number) => ({
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1 },
  transition: { duration: 0.55, delay, ease: 'easeOut' as const },
})

const fade = (delay: number) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.35, delay },
})

export function PillarVisual({ index }: { index: number }) {
  const cls = 'h-full w-full'

  // 01 — the sponsor is matched to the relevant site
  if (index === 0) {
    const ys = [28, 56, 84, 112]
    const match = 1
    return (
      <svg viewBox="0 0 220 150" className={cls} aria-hidden>
        <circle cx="34" cy="75" r="11" fill="var(--color-blue-400)" />
        <circle cx="34" cy="75" r="19" fill="none" stroke="var(--color-blue-400)" strokeOpacity="0.35" />
        {ys.map((y, i) => (
          <g key={y}>
            <motion.line
              x1="45"
              y1="75"
              x2="158"
              y2={y + 13}
              stroke={i === match ? 'var(--color-blue-600)' : 'var(--color-line)'}
              strokeOpacity={1}
              strokeWidth={i === match ? 2.4 : 1.2}
              {...draw(0.04 + i * 0.05)}
            />
            <motion.rect
              x="158"
              y={y}
              width="30"
              height="26"
              rx="7"
              fill={i === match ? 'var(--color-blue-500)' : 'var(--color-surface-2)'}
              fillOpacity={1}
              stroke={i === match ? 'var(--color-blue-600)' : 'var(--color-line)'}
              strokeOpacity={1}
              strokeWidth="1.4"
              {...fade(0.1 + i * 0.05)}
            />
          </g>
        ))}
      </svg>
    )
  }

  // 02 — several budgets become one
  if (index === 1) {
    const ys = [22, 46, 70, 94, 118]
    return (
      <svg viewBox="0 0 220 150" className={cls} aria-hidden>
        {ys.map((y, i) => (
          <motion.rect
            key={'r' + y}
            x="26"
            y={y}
            width="40"
            height="16"
            rx="5"
            fill="var(--color-ink)"
            fillOpacity="0.12"
            stroke="var(--color-ink)"
            strokeOpacity="0.28"
            strokeWidth="1.2"
            {...fade(i * 0.04)}
          />
        ))}
        {ys.map((y, i) => (
          <motion.path
            key={'p' + y}
            d={`M66 ${y + 8} C 110 ${y + 8}, 118 75, 152 75`}
            fill="none"
            stroke="var(--color-blue-500)"
            strokeOpacity="0.9"
            strokeWidth="1.4"
            {...draw(0.12 + i * 0.035)}
          />
        ))}
        <motion.rect
          x="152"
          y="57"
          width="44"
          height="36"
          rx="10"
          fill="var(--color-blue-500)"
          fillOpacity="1"
          stroke="var(--color-blue-700)"
          strokeWidth="1.6"
          {...fade(0.32)}
        />
      </svg>
    )
  }

  // 03 — one point of contact at the centre
  if (index === 2) {
    const spokes = Array.from({ length: 6 }, (_, i) => {
      const a = (i / 6) * Math.PI * 2 - Math.PI / 2
      return { x: 110 + Math.cos(a) * 72, y: 75 + Math.sin(a) * 50 }
    })
    return (
      <svg viewBox="0 0 220 150" className={cls} aria-hidden>
        {spokes.map((s, i) => (
          <g key={i}>
            <motion.line
              x1="110"
              y1="75"
              x2={s.x}
              y2={s.y}
              stroke="var(--color-blue-500)"
              strokeOpacity="0.9"
              strokeWidth="1.4"
              {...draw(i * 0.04)}
            />
            <motion.circle
              cx={s.x}
              cy={s.y}
              r="8"
              fill="var(--color-blue-200)"
              fillOpacity="1"
              stroke="var(--color-blue-300)"
              strokeOpacity="0.6"
              {...fade(0.08 + i * 0.04)}
            />
          </g>
        ))}
        <motion.circle
          cx="110"
          cy="75"
          r="20"
          fill="var(--color-blue-500)"
          fillOpacity="1"
          stroke="var(--color-blue-700)"
          strokeWidth="1.6"
          {...fade(0.28)}
        />
      </svg>
    )
  }

  // 04 — responses in two working days
  const marks = [30, 110, 190]
  return (
    <svg viewBox="0 0 220 150" className={cls} aria-hidden>
      <line x1="30" y1="70" x2="190" y2="70" stroke="var(--color-ink)" strokeOpacity="0.22" strokeWidth="1.2" />
      <motion.line
        x1="30"
        y1="70"
        x2="190"
        y2="70"
        stroke="var(--color-blue-500)"
        strokeWidth="3"
        {...draw(0.05)}
      />
      {marks.map((x, i) => (
        <g key={x}>
          <motion.circle
            cx={x}
            cy="70"
            r={i === 2 ? 9 : 5}
            fill={i === 2 ? 'var(--color-blue-700)' : 'var(--color-blue-500)'}
            {...fade(0.18 + i * 0.08)}
          />
          <motion.text
            x={x}
            y="98"
            textAnchor="middle"
            fill="var(--color-ink-muted)"
            style={{ fontSize: 10, letterSpacing: '0.16em' }}
            {...fade(0.22 + i * 0.08)}
          >
            {'DAY ' + i}
          </motion.text>
        </g>
      ))}
    </svg>
  )
}
