/**
 * Illustrative scatter standing in for Orca's US footprint. Hand-placed inside
 * a 100 x 58 viewBox so the shape reads as the continental United States
 * without shipping a geo dataset — no real site addresses are implied, and the
 * caption on every rendering says so.
 *
 * Shared by the hero canvas and the site-network map so the two agree.
 */

/** [x, y, weight] — weight 2 marks a hub, which gets a pulsing glow. */
export const NODES: Array<[number, number, number]> = [
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

/** Short-range links only, so the mesh reads as a network rather than noise. */
export const LINKS: Array<[number, number]> = (() => {
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
