import { useEffect, useState, type RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let registered = false

/** GSAP with ScrollTrigger registered. Only call from effects (never during render) so SSR stays clean. */
export function getGsap() {
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger)
    registered = true
  }
  return { gsap, ScrollTrigger }
}

export const MOTION_OK = '(prefers-reduced-motion: no-preference)'
/** Strong ease-out (fast start, long settle): reads as responsive, unlike the default curves. */
export const EASE_OUT = 'expo.out'
export const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

export function clamp01(value: number) {
  return Math.min(1, Math.max(0, value))
}

/** Tracks a media query. Returns `initial` during SSR and the first client render to keep hydration stable. */
export function useMediaQuery(query: string, initial = false) {
  const [matches, setMatches] = useState(initial)

  useEffect(() => {
    const mql = window.matchMedia(query)
    const update = () => setMatches(mql.matches)
    update()
    mql.addEventListener('change', update)
    return () => mql.removeEventListener('change', update)
  }, [query])

  return matches
}

interface DrawOptions {
  start?: string
  end?: string
  /** true or a smoothing duration ties drawing to scroll position; false plays once on enter and reverses on leave-back. */
  scrub?: boolean | number
  stagger?: number
}

/**
 * Within `scope`: grows every `[data-grow]` rule (ConstructionLine), draws every `[data-draw]` SVG stroke
 * (pathLength="1" + .bp-draw), and fades in every `[data-reveal]` element.
 * Reduced motion leaves everything in its finished state.
 */
export function useBlueprintMotion(scope: RefObject<HTMLElement | null>, options: DrawOptions = {}) {
  const { start = 'top 80%', end = 'bottom 60%', scrub = 0.6, stagger = 0.06 } = options

  useEffect(() => {
    const el = scope.current
    if (!el) return
    const { gsap, ScrollTrigger } = getGsap()
    const mm = gsap.matchMedia()

    mm.add(MOTION_OK, () => {
      const scrollTrigger = scrub ? { trigger: el, start, end, scrub } : { trigger: el, start, once: true }
      const timing = scrub ? {} : { duration: 0.8, ease: EASE_OUT }

      const growers = gsap.utils.toArray<HTMLElement>('[data-grow]', el)
      if (growers.length) {
        gsap.fromTo(
          growers,
          {
            scaleX: (_: number, target: HTMLElement) => (target.dataset.grow === 'x' ? 0 : 1),
            scaleY: (_: number, target: HTMLElement) => (target.dataset.grow === 'y' ? 0 : 1),
          },
          { scaleX: 1, scaleY: 1, ease: 'none', stagger, scrollTrigger, ...timing }
        )
      }

      const strokes = el.querySelectorAll('[data-draw]')
      if (strokes.length) {
        gsap.fromTo(
          strokes,
          { strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            ease: 'none',
            stagger,
            scrollTrigger,
            ...timing,
          }
        )
      }

      // Content already on screen when the page loads stays put: hiding prerendered text only to fade it back in
      // delays the first meaningful paint. Everything else fades up once and is never hidden again.
      el.querySelectorAll<HTMLElement>('[data-reveal]').forEach((item) => {
        if (ScrollTrigger.isInViewport(item, 0.12)) return
        gsap.fromTo(
          item,
          { autoAlpha: 0, y: 12 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: EASE_OUT,
            scrollTrigger: { trigger: item, start: 'top 92%', once: true },
          }
        )
      })
    })

    return () => mm.revert()
  }, [scope, start, end, scrub, stagger])
}

/** Shared sheet container: page gutters and max width. */
export const SHEET = 'relative mx-auto w-full max-w-[1320px] px-5 md:px-10'
