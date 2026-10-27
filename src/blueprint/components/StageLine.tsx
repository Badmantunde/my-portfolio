import { useEffect, useRef } from 'react'
import { cn, MOTION_OK, REDUCED_MOTION, withGsap } from '../lib/motion'

interface StageLineProps {
  stages: { title: string; body: string }[]
  className?: string
}

const columns: Record<number, string> = {
  4: 'md:grid-cols-4',
  5: 'md:grid-cols-5',
  6: 'md:grid-cols-3 lg:grid-cols-6',
}

/**
 * Numbered stages on one datum line that draws itself with scroll; each node lights up as the line reaches it.
 * Vertical on mobile, horizontal from md.
 */
export function StageLine({ stages, className }: StageLineProps) {
  const trackRef = useRef<HTMLOListElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    return withGsap(({ gsap, ScrollTrigger }) => {
      const items = Array.from(track.querySelectorAll<HTMLElement>('[data-stage]'))
      const apply = (progress: number) => {
        track.style.setProperty('--p', String(progress))
        items.forEach((item, i) => {
          item.dataset.active = String(progress >= i / Math.max(1, items.length - 1) - 0.001)
        })
      }

      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        apply(0)
        const trigger = ScrollTrigger.create({
          trigger: track,
          start: 'top 75%',
          end: 'bottom 45%',
          scrub: true,
          onUpdate: (self) => apply(self.progress),
        })
        return () => trigger.kill()
      })
      mm.add(REDUCED_MOTION, () => apply(1))
      return () => mm.revert()
    })
  }, [stages.length])

  // The horizontal track only makes sense when every stage sits on one row.
  const oneRow = stages.length <= 5

  return (
    <ol ref={trackRef} className={cn('relative grid gap-12 [--p:1] md:gap-6', columns[stages.length] ?? 'md:grid-cols-4', className)}>
      <span
        aria-hidden="true"
        className={cn(
          'absolute bottom-2 left-[7px] top-2 w-px bg-bp-cyan/15',
          oneRow ? 'md:bottom-auto md:left-0 md:right-0 md:top-[7px] md:h-px md:w-auto' : 'lg:bottom-auto lg:left-0 lg:right-0 lg:top-[7px] lg:h-px lg:w-auto md:hidden lg:block'
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          'absolute bottom-2 left-[7px] top-2 w-px origin-top bg-bp-cyan [transform:scaleY(var(--p))]',
          oneRow
            ? 'md:bottom-auto md:left-0 md:right-0 md:top-[7px] md:h-px md:w-auto md:origin-left md:[transform:scaleX(var(--p))]'
            : 'md:hidden lg:bottom-auto lg:left-0 lg:right-0 lg:top-[7px] lg:block lg:h-px lg:w-auto lg:origin-left lg:[transform:scaleX(var(--p))]'
        )}
      />
      {stages.map((stage, i) => (
        <li key={stage.title} data-stage data-active="true" className="group relative pl-10 md:pl-0 md:pr-4">
          <span
            aria-hidden="true"
            className="absolute left-0 top-0 block h-[15px] w-[15px] border border-bp-cyan/40 bg-bp-ink transition-colors duration-300 group-data-[active=true]:border-bp-cyan group-data-[active=true]:bg-bp-cyan"
          />
          <div className="transition-opacity duration-300 group-data-[active=false]:opacity-35 md:pt-12">
            <span className="bp-label bp-num text-bp-cyan">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="mt-3 text-xl font-normal uppercase tracking-[0.14em] text-bp-text">{stage.title}</h3>
            <p className="mt-3 max-w-[240px] text-[15px] leading-relaxed text-bp-muted">{stage.body}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
