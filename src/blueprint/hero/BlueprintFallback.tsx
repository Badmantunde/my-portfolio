import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { siFigma, siFlutter, siWebflow } from 'simple-icons'
import { getGsap } from '../lib/motion'
import type { FrameRenderer } from './types'

const W = 1264
const H = 720
const CYAN = '#42D9FF'
const GUIDE = 'rgba(66, 217, 255, 0.32)'

// Official single-path marks from simple-icons (24×24), placed and scaled uniformly; geometry is untouched.
const logos = [
  { id: 'figma', path: siFigma.path, x: 168, y: 118, size: 108 },
  { id: 'webflow', path: siWebflow.path, x: 572, y: 112, size: 120 },
  { id: 'flutter', path: siFlutter.path, x: 1000, y: 118, size: 108 },
]

const guides = [
  'M0 342H1264',
  'M0 452H1264',
  'M110 300H1154',
  'M150 0V720',
  'M1114 0V720',
  'M632 40V640',
  'M222 250V342',
  'M632 250V342',
  'M1054 250V342',
]

const connectors = [
  'M290 172C380 172 380 290 470 300',
  'M974 172C884 172 884 290 794 300',
  'M410 112C440 160 450 250 520 300',
  'M854 112C824 160 814 250 744 300',
]

const circles = [
  { cx: 330, cy: 400, r: 96 },
  { cx: 632, cy: 400, r: 96 },
  { cx: 934, cy: 400, r: 96 },
]

const dots = [
  [222, 250],
  [632, 250],
  [1054, 250],
  [150, 342],
  [1114, 342],
  [470, 300],
  [794, 300],
  [632, 92],
  [1068, 98],
]

/**
 * Pure SVG reconstruction of the hero film, used when the video can't load (or on very low-end devices).
 * A paused GSAP timeline is driven by the same scroll progress, so it constructs and deconstructs identically.
 */
export const BlueprintFallback = forwardRef<FrameRenderer, { className?: string }>(function BlueprintFallback(
  { className },
  ref
) {
  const svgRef = useRef<SVGSVGElement>(null)
  const timeline = useRef<gsap.core.Timeline | null>(null)
  const pending = useRef(0)

  useImperativeHandle(ref, () => ({
    setProgress(progress: number) {
      pending.current = progress
      timeline.current?.progress(progress)
    },
  }))

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    const { gsap } = getGsap()
    const q = gsap.utils.selector(svg)
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true, defaults: { ease: 'none' } })
      tl.fromTo(q('[data-part="grid"]'), { opacity: 0 }, { opacity: 1, duration: 0.12 }, 0)
        .fromTo(q('[data-part="guide"]'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.18, stagger: 0.02 }, 0.04)
        .fromTo(q('[data-part="circle"]'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.2, stagger: 0.04 }, 0.16)
        .fromTo(q('[data-part="logo"]'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.22, stagger: 0.05 }, 0.26)
        .fromTo(q('[data-part="connector"]'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.18, stagger: 0.03 }, 0.34)
        .fromTo(q('[data-part="logo"]'), { fillOpacity: 0 }, { fillOpacity: 0.9, duration: 0.12, stagger: 0.04 }, 0.5)
        .fromTo(q('[data-part="name"]'), { strokeDashoffset: 420 }, { strokeDashoffset: 0, duration: 0.24 }, 0.5)
        .fromTo(q('[data-part="name"]'), { fillOpacity: 0 }, { fillOpacity: 1, duration: 0.14 }, 0.7)
        .fromTo(q('[data-part="dimension"]'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.1 }, 0.78)
        .fromTo(q('[data-part="descriptor"]'), { opacity: 0 }, { opacity: 1, duration: 0.1 }, 0.82)
        .fromTo(q('[data-part="dot"]'), { opacity: 0 }, { opacity: 1, duration: 0.08, stagger: 0.008 }, 0.86)
        .to({}, { duration: 0.02 }, 0.98)
      tl.progress(pending.current)
      timeline.current = tl
    }, svg)
    return () => {
      ctx.revert()
      timeline.current = null
    }
  }, [])

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid meet"
      className={className}
      aria-hidden="true"
      fontFamily="Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif"
    >
      <defs>
        <pattern id="bp-fallback-fine" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" fill="none" stroke="rgba(66,217,255,0.06)" strokeWidth="1" />
        </pattern>
        <pattern id="bp-fallback-major" width="120" height="120" patternUnits="userSpaceOnUse">
          <rect width="120" height="120" fill="url(#bp-fallback-fine)" />
          <path d="M120 0H0V120" fill="none" stroke="rgba(66,217,255,0.12)" strokeWidth="1" />
        </pattern>
      </defs>

      <rect data-part="grid" width={W} height={H} fill="url(#bp-fallback-major)" />

      <g fill="none" stroke={GUIDE} strokeWidth="1">
        {guides.map((d) => (
          <path key={d} data-part="guide" d={d} pathLength={1} strokeDasharray="1" />
        ))}
        {circles.map((c) => (
          <circle key={c.cx} data-part="circle" {...c} pathLength={1} strokeDasharray="1" stroke="rgba(66,217,255,0.2)" />
        ))}
        {connectors.map((d) => (
          <path key={d} data-part="connector" d={d} pathLength={1} strokeDasharray="1" stroke="rgba(66,217,255,0.5)" />
        ))}
      </g>

      {logos.map((logo) => (
        <g key={logo.id} transform={`translate(${logo.x} ${logo.y}) scale(${logo.size / 24})`}>
          <path
            data-part="logo"
            d={logo.path}
            fill={CYAN}
            stroke={CYAN}
            strokeWidth={0.22}
            pathLength={1}
            strokeDasharray="1"
          />
        </g>
      ))}

      <text
        data-part="name"
        x={W / 2}
        y={432}
        textAnchor="middle"
        fontSize="98"
        fontWeight="500"
        letterSpacing="2"
        fill="#EAF7FF"
        stroke="#EAF7FF"
        strokeWidth="1.2"
        strokeDasharray="420"
      >
        ABIOLA BABATUNDE
      </text>

      <path
        data-part="dimension"
        d="M150 488H1114M150 480V496M1114 480V496"
        pathLength={1}
        strokeDasharray="1"
        fill="none"
        stroke="rgba(66,217,255,0.55)"
        strokeWidth="1"
      />
      <text
        data-part="descriptor"
        x={W / 2}
        y={522}
        textAnchor="middle"
        fontSize="17"
        letterSpacing="5"
        fill="#C9E6F5"
      >
        PRODUCT DESIGNER  •  WEBFLOW DEVELOPER  •  MOBILE APP DEVELOPER
      </text>

      {dots.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} data-part="dot" cx={cx} cy={cy} r="4.5" fill={CYAN} />
      ))}
    </svg>
  )
})
