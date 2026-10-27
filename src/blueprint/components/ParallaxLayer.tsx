import { useEffect, useRef, type ReactNode } from 'react'
import { cn, withGsap } from '../lib/motion'

interface ParallaxLayerProps {
  children: ReactNode
  /** Distance in px the layer drifts across its scroll range; negative drifts up. */
  distance?: number
  className?: string
}

/** Subtle scroll-linked drift. Desktop with motion allowed only; elsewhere it is a plain wrapper. */
export function ParallaxLayer({ children, distance = -40, className }: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    return withGsap(({ gsap }) => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          el,
          { y: -distance / 2 },
          { y: distance / 2, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } }
        )
      })
      return () => mm.revert()
    })
  }, [distance])

  return (
    <div ref={ref} className={cn('will-change-transform', className)}>
      {children}
    </div>
  )
}
