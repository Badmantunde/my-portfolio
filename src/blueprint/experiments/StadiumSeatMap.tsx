import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { cn, REDUCED_MOTION, useMediaQuery } from '../lib/motion'
import { formatNaira, pitch, project, stadiumSections, type StadiumSection, type Vec3 } from './stadium'

const START_YAW = -0.55
const START_ELEVATION = 0.72
const MIN_ELEVATION = 0.3
const MAX_ELEVATION = 1.3
const AUTO_SPEED = 0.0016
const FRAME_RATIO = 4 / 3
const PADDING = 8

/**
 * Scene bounds for a given tilt, covering every rotation at that tilt, so spinning never clips
 * or zooms; only tilting resizes the frame.
 */
function frameFor(elevation: number) {
  let minX = 0
  let maxX = 0
  let minY = 0
  let maxY = 0
  for (let yaw = 0; yaw < Math.PI * 2; yaw += Math.PI / 36) {
    for (const section of stadiumSections) {
      for (const v of section.wall ?? section.surface) {
        const p = project(v, yaw, elevation)
        minX = Math.min(minX, p.x)
        maxX = Math.max(maxX, p.x)
        minY = Math.min(minY, p.y)
        maxY = Math.max(maxY, p.y)
      }
    }
  }
  let w = maxX - minX + PADDING * 2
  let h = maxY - minY + PADDING * 2
  if (w / h > FRAME_RATIO) h = w / FRAME_RATIO
  else w = h * FRAME_RATIO
  return { x: (minX + maxX) / 2 - w / 2, y: (minY + maxY) / 2 - h / 2, w, h }
}

const totalLeft = stadiumSections.reduce((sum, section) => sum + section.seatsLeft, 0)
const totalCapacity = stadiumSections.reduce((sum, section) => sum + section.capacity, 0)
const prices = stadiumSections.map((section) => section.price)

function availability(section: StadiumSection) {
  return section.seatsLeft / section.capacity
}

function statusOf(section: StadiumSection) {
  const ratio = availability(section)
  if (section.seatsLeft === 0) return 'Sold out'
  if (ratio < 0.15) return 'Almost gone'
  return 'Available'
}

interface Face {
  key: string
  section: StadiumSection
  kind: 'surface' | 'wall'
  path: string
  depth: number
  center: { x: number; y: number }
}

function points(vertices: Vec3[], yaw: number, elevation: number) {
  return vertices.map((v) => project(v, yaw, elevation))
}

function toPath(projected: { x: number; y: number }[]) {
  return projected.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join('') + 'Z'
}

/**
 * Party Padi experiment: a rotatable stadium where each section shows its price and seats left.
 * Rendered as projected SVG polygons sorted back to front, so every section is a real, focusable element.
 */
export function StadiumSeatMap() {
  const reducedMotion = useMediaQuery(REDUCED_MOTION)
  const [view, setView] = useState({ yaw: START_YAW, elevation: START_ELEVATION })
  const [activeId, setActiveId] = useState<string | null>(null)
  const [pinnedId, setPinnedId] = useState<string | null>(null)
  const [autoRotate, setAutoRotate] = useState(true)
  const [inView, setInView] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const drag = useRef<{ x: number; y: number; id: number; moved: boolean; mouse: boolean } | null>(null)
  const velocity = useRef(0)

  const focusId = activeId ?? pinnedId
  const focus = stadiumSections.find((section) => section.id === focusId) ?? null
  const spinning = autoRotate && !reducedMotion && inView && !focusId && !drag.current

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.15 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // One loop handles both the idle spin and the glide after a drag is released.
  useEffect(() => {
    if (!inView) return
    let raf = 0
    const tick = () => {
      const glide = velocity.current
      if (Math.abs(glide) > 0.0002 || spinning) {
        velocity.current *= 0.92
        setView((v) => ({ ...v, yaw: v.yaw + glide + (spinning ? AUTO_SPEED : 0) }))
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, spinning])

  const scene = useMemo(() => {
    const { yaw, elevation } = view
    const faces = stadiumSections.flatMap((section) => {
      const surface = points(section.surface, yaw, elevation)
      const items: Face[] = [
        {
          key: section.id,
          section,
          kind: 'surface',
          path: toPath(surface),
          depth: surface.reduce((sum, p) => sum + p.depth, 0) / surface.length,
          center: {
            x: surface.reduce((sum, p) => sum + p.x, 0) / 4,
            y: surface.reduce((sum, p) => sum + p.y, 0) / 4,
          },
        },
      ]
      if (section.wall) {
        const wall = points(section.wall, yaw, elevation)
        items.push({
          key: `${section.id}-wall`,
          section,
          kind: 'wall',
          path: toPath(wall),
          depth: wall.reduce((sum, p) => sum + p.depth, 0) / wall.length - 2,
          center: { x: 0, y: 0 },
        })
      }
      return items
    })
    // Cut-away view: outer walls always sit behind the seating, so no block of seats is ever hidden by a wall.
    faces.sort((a, b) => (a.kind === b.kind ? a.depth - b.depth : a.kind === 'wall' ? -1 : 1))

    return {
      faces,
      pitchOutline: toPath(points(pitch.outline, yaw, elevation)),
      pitchLines: pitch.lines.map(([a, b]) => {
        const [p, q] = points([a, b], yaw, elevation)
        return `M${p.x.toFixed(2)} ${p.y.toFixed(2)}L${q.x.toFixed(2)} ${q.y.toFixed(2)}`
      }),
      centreCircle: toPath(points(pitch.circle, yaw, elevation)),
    }
  }, [view])

  const VB = useMemo(() => frameFor(view.elevation), [view.elevation])
  const focusFace = focus ? scene.faces.find((face) => face.kind === 'surface' && face.section.id === focus.id) : undefined
  // Card sits above the section's leader line, or below the section when that would leave the frame.
  const tooltip = focusFace && (() => {
    const anchorTop = ((focusFace.center.y - 14 - VB.y) / VB.h) * 100
    const below = anchorTop < 30
    return {
      below,
      top: below ? ((focusFace.center.y - VB.y) / VB.h) * 100 : anchorTop,
      left: Math.min(84, Math.max(16, ((focusFace.center.x - VB.x) / VB.w) * 100)),
    }
  })()

  function rotate(delta: number) {
    setView((v) => ({ ...v, yaw: v.yaw + delta }))
  }

  function onPointerDown(event: PointerEvent<SVGSVGElement>) {
    drag.current = { x: event.clientX, y: event.clientY, id: event.pointerId, moved: false, mouse: event.pointerType === 'mouse' }
    velocity.current = 0
  }

  function onPointerMove(event: PointerEvent<SVGSVGElement>) {
    const d = drag.current
    if (!d || d.id !== event.pointerId) return
    const dx = event.clientX - d.x
    const dy = event.clientY - d.y
    if (!d.moved && Math.hypot(dx, dy) > 4) {
      d.moved = true
      event.currentTarget.setPointerCapture(event.pointerId)
    }
    if (!d.moved) return
    d.x = event.clientX
    d.y = event.clientY
    const width = event.currentTarget.getBoundingClientRect().width || 1
    const yawDelta = (dx / width) * Math.PI * 1.4
    velocity.current = yawDelta
    setView((v) => ({
      yaw: v.yaw + yawDelta,
      // Touch keeps vertical drags for page scrolling; tilt with a mouse or the buttons.
      elevation: d.mouse ? Math.min(MAX_ELEVATION, Math.max(MIN_ELEVATION, v.elevation + (dy / width) * 2)) : v.elevation,
    }))
  }

  function onPointerUp(event: PointerEvent<SVGSVGElement>) {
    if (drag.current?.moved) event.currentTarget.releasePointerCapture?.(event.pointerId)
    else velocity.current = 0
    drag.current = null
  }

  function onSectionKey(event: KeyboardEvent<SVGPathElement>, id: string) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setPinnedId((current) => (current === id ? null : id))
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      rotate(-0.2)
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      rotate(0.2)
    }
  }

  return (
    <div ref={wrapRef} className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      <div className="relative lg:col-span-8">
        <div className="relative aspect-[4/3] overflow-hidden border border-bp-cyan/25 bg-[radial-gradient(ellipse_at_center,#0d2d4a_0%,#071a2d_70%)]">
          <div aria-hidden="true" className="bp-grid absolute inset-0 opacity-50" />
          <svg
            viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`}
            className={cn('relative h-full w-full select-none', drag.current?.moved ? 'cursor-grabbing' : 'cursor-grab')}
            style={{ touchAction: 'pan-y' }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onPointerLeave={() => setActiveId(null)}
            role="group"
            aria-label="Stadium seat map. Drag to rotate; each section can be focused to hear its price and seats left."
          >
            <path d={scene.pitchOutline} fill="rgba(66,217,255,0.07)" stroke="rgba(66,217,255,0.55)" strokeWidth="0.5" />
            <g fill="none" stroke="rgba(66,217,255,0.45)" strokeWidth="0.4">
              {scene.pitchLines.map((d) => (
                <path key={d.slice(0, 18)} d={d} />
              ))}
              <path d={scene.centreCircle} />
            </g>

            {scene.faces.map((face) => {
              if (face.kind === 'wall') {
                return <path key={face.key} d={face.path} fill="rgba(7,26,45,0.92)" stroke="rgba(66,217,255,0.14)" strokeWidth="0.3" />
              }
              const section = face.section
              const ratio = availability(section)
              const soldOut = section.seatsLeft === 0
              const isFocus = focusId === section.id
              return (
                <path
                  key={face.key}
                  d={face.path}
                  tabIndex={0}
                  role="button"
                  aria-pressed={pinnedId === section.id}
                  aria-label={`${section.stand} ${section.tier} section ${section.id}, ${section.category}. ${formatNaira(section.price)}. ${
                    soldOut ? 'Sold out' : `${section.seatsLeft} of ${section.capacity} seats left`
                  }.`}
                  fill={
                    isFocus
                      ? '#42D9FF'
                      : soldOut
                        ? 'rgba(147,174,195,0.10)'
                        : section.category === 'VIP'
                          ? `rgba(255,214,120,${0.25 + ratio * 0.55})`
                          : `rgba(66,217,255,${0.14 + ratio * 0.6})`
                  }
                  stroke={isFocus ? '#EAF7FF' : 'rgba(234,247,255,0.28)'}
                  strokeWidth={isFocus ? 0.9 : 0.35}
                  strokeDasharray={soldOut && !isFocus ? '1.2 1' : undefined}
                  className="cursor-pointer outline-none transition-[fill] duration-150"
                  onPointerEnter={() => setActiveId(section.id)}
                  onPointerLeave={() => setActiveId(null)}
                  onFocus={() => setActiveId(section.id)}
                  onBlur={() => setActiveId(null)}
                  onClick={() => {
                    if (!drag.current?.moved) setPinnedId((current) => (current === section.id ? null : section.id))
                  }}
                  onKeyDown={(event) => onSectionKey(event, section.id)}
                />
              )
            })}

            {focusFace && (
              <g pointerEvents="none">
                <circle cx={focusFace.center.x} cy={focusFace.center.y} r="1.6" fill="#071A2D" stroke="#EAF7FF" strokeWidth="0.6" />
                {!tooltip?.below && (
                  <line x1={focusFace.center.x} y1={focusFace.center.y} x2={focusFace.center.x} y2={focusFace.center.y - 14} stroke="#EAF7FF" strokeWidth="0.4" />
                )}
              </g>
            )}
          </svg>

          {focus && focusFace && tooltip && (
            <div
              aria-hidden="true"
              className={cn(
                'pointer-events-none absolute z-10 w-36 -translate-x-1/2 border border-bp-cyan/60 bg-[#071A2D]/95 px-2.5 py-2 shadow-[0_12px_32px_rgba(0,0,0,0.45)] sm:w-44 sm:px-3 sm:py-2.5',
                tooltip.below ? 'translate-y-3' : '-translate-y-full'
              )}
              style={{ left: `${tooltip.left}%`, top: `${tooltip.top}%` }}
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="bp-label bp-num text-[9px] text-bp-cyan">{focus.id}</span>
                <span className="bp-label text-[8.5px]">{focus.category}</span>
              </div>
              <p className="bp-num mt-1 text-base font-light text-bp-text sm:text-lg">{formatNaira(focus.price)}</p>
              <p className="bp-num text-[12px] text-bp-muted">
                {focus.seatsLeft === 0 ? 'Sold out' : `${focus.seatsLeft.toLocaleString('en-NG')} seats left`}
              </p>
            </div>
          )}

          <div className="pointer-events-none absolute left-4 top-4 hidden items-center gap-2 sm:flex">
            <span className="bp-label text-[9px] text-bp-cyan">Party Padi</span>
            <span className="bp-label text-[9px]">· partypadi.com · Seat map</span>
          </div>
          <div className="pointer-events-none absolute bottom-3 left-4 hidden sm:block">
            <span className="bp-label text-[9px]">Drag to rotate · Hover a section</span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {[
            { label: 'Rotate left', text: '↺', onClick: () => rotate(-0.35) },
            { label: 'Rotate right', text: '↻', onClick: () => rotate(0.35) },
            {
              label: 'Tilt up',
              text: '↑',
              onClick: () => setView((v) => ({ ...v, elevation: Math.min(MAX_ELEVATION, v.elevation + 0.15) })),
            },
            {
              label: 'Tilt down',
              text: '↓',
              onClick: () => setView((v) => ({ ...v, elevation: Math.max(MIN_ELEVATION, v.elevation - 0.15) })),
            },
          ].map((control) => (
            <button
              key={control.label}
              type="button"
              aria-label={control.label}
              onClick={control.onClick}
              className="flex h-9 w-9 items-center justify-center border border-bp-cyan/30 text-bp-text transition-colors hover:border-bp-cyan hover:text-bp-cyan"
            >
              <span aria-hidden="true">{control.text}</span>
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              setView({ yaw: START_YAW, elevation: START_ELEVATION })
              setPinnedId(null)
            }}
            className="bp-label h-9 border border-bp-cyan/30 px-3 text-[9.5px] text-bp-text transition-colors hover:border-bp-cyan hover:text-bp-cyan"
          >
            Reset view
          </button>
          {!reducedMotion && (
            <button
              type="button"
              aria-pressed={autoRotate}
              onClick={() => setAutoRotate((value) => !value)}
              className="bp-label h-9 border border-bp-cyan/30 px-3 text-[9.5px] text-bp-text transition-colors hover:border-bp-cyan hover:text-bp-cyan"
            >
              {autoRotate ? 'Pause spin' : 'Auto spin'}
            </button>
          )}
        </div>
      </div>

      <aside className="lg:col-span-4" aria-live="polite">
        <div className="border-t border-bp-cyan/30">
          <div className="grid grid-cols-2 border-b border-bp-line">
            <div className="border-r border-bp-line py-4 pr-4">
              <p className="bp-label text-[9px]">Seats left</p>
              <p className="bp-num mt-1.5 text-2xl font-light text-bp-text">{totalLeft.toLocaleString('en-NG')}</p>
              <p className="bp-num text-[11px] text-bp-muted">of {totalCapacity.toLocaleString('en-NG')}</p>
            </div>
            <div className="py-4 pl-4">
              <p className="bp-label text-[9px]">Prices</p>
              <p className="bp-num mt-1.5 text-2xl font-light text-bp-text">{formatNaira(Math.min(...prices))}</p>
              <p className="bp-num text-[11px] text-bp-muted">to {formatNaira(Math.max(...prices))}</p>
            </div>
          </div>

          <div className="min-h-[188px] border-b border-bp-line py-5">
            {focus ? (
              <>
                <div className="flex items-baseline justify-between">
                  <p className="bp-label text-bp-cyan">
                    Section {focus.id}
                    {pinnedId === focus.id && <span className="text-bp-muted"> · pinned</span>}
                  </p>
                  <p className="bp-label text-[9px]">{statusOf(focus)}</p>
                </div>
                <p className="mt-2 text-xl tracking-tight text-bp-text">
                  {focus.stand} stand · {focus.tier} tier
                </p>
                <p className="bp-label mt-1 text-[9px]">{focus.category}</p>
                <div className="mt-5 flex items-end justify-between gap-4">
                  <p className="bp-num text-3xl font-light text-bp-text">{formatNaira(focus.price)}</p>
                  <p className="bp-num text-right text-sm text-bp-muted">
                    {focus.seatsLeft === 0 ? 'Sold out' : `${focus.seatsLeft.toLocaleString('en-NG')} / ${focus.capacity.toLocaleString('en-NG')}`}
                  </p>
                </div>
                <div className="mt-3 h-1 bg-bp-cyan/15">
                  <div className="h-full bg-bp-cyan transition-[width] duration-300" style={{ width: `${availability(focus) * 100}%` }} />
                </div>
              </>
            ) : (
              <>
                <p className="bp-label text-bp-cyan">Pick a section</p>
                <p className="mt-3 text-[15px] leading-relaxed text-bp-muted">
                  Hover or tap any block of seats to see its price and how many seats are left. Click to pin it.
                </p>
              </>
            )}
          </div>

          <ul className="space-y-2.5 py-5">
            {[
              { swatch: 'bg-bp-cyan', label: 'Plenty of seats' },
              { swatch: 'bg-bp-cyan/25', label: 'Selling fast' },
              { swatch: 'bg-[rgba(255,214,120,0.7)]', label: 'VIP box' },
              { swatch: 'border border-dashed border-bp-muted/60', label: 'Sold out' },
            ].map((item) => (
              <li key={item.label} className="flex items-center gap-3 text-[13px] text-bp-text/85">
                <span aria-hidden="true" className={cn('h-3 w-5', item.swatch)} />
                {item.label}
              </li>
            ))}
          </ul>
          <p className="bp-label border-t border-bp-line pt-4 text-[9px]">Sample prices and availability · Demo data</p>
        </div>
      </aside>
    </div>
  )
}
