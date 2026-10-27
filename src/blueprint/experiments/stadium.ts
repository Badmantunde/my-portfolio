/**
 * Geometry and sample inventory for the Party Padi stadium seat map experiment.
 * The bowl is a superellipse (a rounded rectangle) around a 105 × 68 m pitch, in two tiers of sections.
 */

export type Vec3 = [number, number, number]

export type Stand = 'North' | 'East' | 'South' | 'West'

export interface StadiumSection {
  id: string
  stand: Stand
  tier: 'Lower' | 'Upper'
  category: 'VIP' | 'Sideline' | 'Behind goal'
  price: number
  capacity: number
  seatsLeft: number
  /** Seating surface, as four corners. */
  surface: Vec3[]
  /** Back wall below the outer edge (upper tier only), for a solid bowl. */
  wall?: Vec3[]
}

const SECTIONS_PER_TIER = 20
const EXPONENT = 4

const tiers = [
  { name: 'Lower' as const, inner: [60, 42, 1], outer: [84, 64, 13] },
  { name: 'Upper' as const, inner: [88, 68, 18], outer: [110, 88, 38] },
]

/** Point on the superellipse with half-axes a (x) and b (z) at angle t. */
function ring(t: number, a: number, b: number, y: number): Vec3 {
  const c = Math.cos(t)
  const s = Math.sin(t)
  const p = 2 / EXPONENT
  return [a * Math.sign(c) * Math.abs(c) ** p, y, b * Math.sign(s) * Math.abs(s) ** p]
}

function standFor(t: number): Stand {
  const deg = ((t * 180) / Math.PI + 360) % 360
  if (deg >= 315 || deg < 45) return 'East'
  if (deg < 135) return 'South'
  if (deg < 225) return 'West'
  return 'North'
}

/** Deterministic pseudo-random availability so server and client render the same inventory. */
function seeded(n: number) {
  const x = Math.sin(n * 9301 + 49297) * 233280
  return x - Math.floor(x)
}

function buildSections(): StadiumSection[] {
  const sections: StadiumSection[] = []
  const counts: Record<string, number> = {}

  tiers.forEach((tier, tierIndex) => {
    for (let i = 0; i < SECTIONS_PER_TIER; i++) {
      const gap = 0.012
      const t1 = (i / SECTIONS_PER_TIER) * Math.PI * 2 + gap
      const t2 = ((i + 1) / SECTIONS_PER_TIER) * Math.PI * 2 - gap
      const mid = (t1 + t2) / 2
      const stand = standFor(mid)
      const sideline = stand === 'North' || stand === 'South'
      // The two lower sections facing the halfway line on the South side are the VIP box.
      const midDeg = (mid * 180) / Math.PI
      const vip = tier.name === 'Lower' && stand === 'South' && Math.abs(midDeg - 90) < 10

      const key = `${stand[0]}${tier.name[0]}`
      counts[key] = (counts[key] ?? 0) + 1

      const category = vip ? 'VIP' : sideline ? 'Sideline' : 'Behind goal'
      const price = vip ? 60000 : tier.name === 'Lower' ? (sideline ? 25000 : 12000) : sideline ? 15000 : 8000
      const capacity = vip ? 300 : tier.name === 'Lower' ? 1200 : 1600

      const r = seeded(tierIndex * 100 + i)
      const seatsLeft = r < 0.14 ? 0 : Math.round(capacity * (r < 0.4 ? r * 0.25 : r * 0.85))

      const [ia, ib, iy] = tier.inner
      const [oa, ob, oy] = tier.outer
      const surface = [ring(t1, ia, ib, iy), ring(t2, ia, ib, iy), ring(t2, oa, ob, oy), ring(t1, oa, ob, oy)]
      const wall = tier.name === 'Upper' ? [ring(t1, oa, ob, oy), ring(t2, oa, ob, oy), ring(t2, oa, ob, 0), ring(t1, oa, ob, 0)] : undefined

      sections.push({
        id: `${key}${counts[key]}`,
        stand,
        tier: tier.name,
        category,
        price,
        capacity,
        seatsLeft,
        surface,
        wall,
      })
    }
  })

  return sections
}

export const stadiumSections = buildSections()

/** Pitch markings on the ground plane (y = 0), as line segments and the centre circle. */
export const pitch = {
  outline: [
    [-52.5, 0, -34],
    [52.5, 0, -34],
    [52.5, 0, 34],
    [-52.5, 0, 34],
  ] as Vec3[],
  lines: [
    [[0, 0, -34], [0, 0, 34]],
    [[-52.5, 0, -20.15], [-36, 0, -20.15]],
    [[-36, 0, -20.15], [-36, 0, 20.15]],
    [[-36, 0, 20.15], [-52.5, 0, 20.15]],
    [[52.5, 0, -20.15], [36, 0, -20.15]],
    [[36, 0, -20.15], [36, 0, 20.15]],
    [[36, 0, 20.15], [52.5, 0, 20.15]],
  ] as [Vec3, Vec3][],
  circle: Array.from({ length: 36 }, (_, i) => {
    const t = (i / 36) * Math.PI * 2
    return [Math.cos(t) * 9.15, 0, Math.sin(t) * 9.15] as Vec3
  }),
}

/** Orthographic view: yaw spins the bowl, elevation tilts the camera above the pitch. */
export function project([x, y, z]: Vec3, yaw: number, elevation: number) {
  const cy = Math.cos(yaw)
  const sy = Math.sin(yaw)
  const rx = x * cy - z * sy
  const rz = x * sy + z * cy
  const ce = Math.cos(elevation)
  const se = Math.sin(elevation)
  return {
    x: rx,
    y: rz * se - y * ce,
    /** Larger is nearer the viewer. */
    depth: rz * ce + y * se,
  }
}

export function formatNaira(value: number) {
  return `₦${value.toLocaleString('en-NG')}`
}
