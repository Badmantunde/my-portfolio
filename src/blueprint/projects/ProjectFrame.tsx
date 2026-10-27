import { useEffect, useRef } from 'react'
import type { WorkProject } from '../../data/work'
import { ConstructionLine } from '../components/ConstructionLine'
import { DimensionLine } from '../components/DimensionLine'
import { cn, EASE_OUT, MOTION_OK, withGsap } from '../lib/motion'

/** Drawing frame offset 12px outside the image. */
const FRAME = [
  { position: '-left-3 -right-3 -top-3', orientation: 'horizontal' },
  { position: '-bottom-3 -right-3 -top-3', orientation: 'vertical' },
  { position: '-bottom-3 -left-3 -right-3', orientation: 'horizontal' },
  { position: '-bottom-3 -left-3 -top-3', orientation: 'vertical' },
] as const

const CORNERS = [
  '-left-3 -top-3 -translate-x-1/2 -translate-y-1/2',
  '-right-3 -top-3 translate-x-1/2 -translate-y-1/2',
  '-bottom-3 -left-3 -translate-x-1/2 translate-y-1/2',
  '-bottom-3 -right-3 translate-x-1/2 translate-y-1/2',
]

interface ProjectFrameProps {
  project: WorkProject
  label: string
  /** Unmask direction on entry. */
  from?: 'left' | 'right'
  /** Above-the-fold frames load eagerly. */
  eager?: boolean
}

/**
 * A project's key visual inside a drafting frame: a wide image, or phone screens laid out side by side.
 * The frame's rules grow with the parent's useBlueprintMotion; the visual unmasks once on entry.
 */
export function ProjectFrame({ project, label, from = 'left', eager }: ProjectFrameProps) {
  const visualRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const visual = visualRef.current
    if (!visual) return
    return withGsap(({ gsap, ScrollTrigger }) => {
      // A visual already on screen at load (a case study's cover) is the page's largest paint: never mask it.
      if (ScrollTrigger.isInViewport(visual, 0.12)) return
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          visual,
          { clipPath: from === 'right' ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0%)',
            duration: 0.9,
            ease: EASE_OUT,
            scrollTrigger: { trigger: visual, start: 'top 85%', once: true },
          }
        )
      })
      return () => mm.revert()
    })
  }, [from])

  const loading = eager ? 'eager' : 'lazy'

  return (
    <div>
      <DimensionLine label={label} className="mb-4" />
      <div className="relative">
        {FRAME.map(({ position, orientation }) => (
          <div key={position} className={cn('pointer-events-none absolute', position)}>
            <ConstructionLine orientation={orientation} />
          </div>
        ))}
        {CORNERS.map((pos) => (
          <span key={pos} aria-hidden="true" className={cn('absolute h-1.5 w-1.5 bg-bp-cyan', pos)} />
        ))}
        <div ref={visualRef} className="relative aspect-[16/10] overflow-hidden bg-bp-deep">
          {project.screens ? (
            <>
              <div aria-hidden="true" className="bp-grid absolute inset-0 opacity-70" />
              <div className="absolute inset-0 flex items-center justify-center gap-[3%] px-[6%]">
                {project.screens.map((screen, i) => (
                  <img
                    key={screen.src}
                    src={screen.src}
                    alt={screen.alt}
                    loading={loading}
                    decoding="async"
                    width={923}
                    height={2000}
                    className={cn(
                      'h-[86%] w-auto object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,0.45)]',
                      i === 1 && '-translate-y-[3%]'
                    )}
                  />
                ))}
              </div>
            </>
          ) : (
            project.image && (
              <img
                src={project.image}
                alt={`${project.title}: ${project.category}`}
                loading={loading}
                decoding="async"
                width={1200}
                height={750}
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: project.focus }}
              />
            )
          )}
        </div>
      </div>
    </div>
  )
}
