import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { SHEET, useBlueprintMotion } from '../lib/motion'
import { BlueprintGrid } from './BlueprintGrid'
import { ConstructionLine } from './ConstructionLine'

interface ContactCtaProps {
  title?: string
}

/** Closing invitation on every page except Contact: a final construction line down to the next project. */
export function ContactCta({ title = 'Let’s build something meaningful.' }: ContactCtaProps) {
  const ref = useRef<HTMLElement>(null)
  useBlueprintMotion(ref, { start: 'top 75%', end: 'center 55%' })

  return (
    <section ref={ref} aria-labelledby="bp-cta-title" className="relative overflow-hidden border-t border-bp-line py-28 md:py-36">
      <BlueprintGrid className="opacity-60" />
      <div className={`${SHEET} flex flex-col items-center text-center`}>
        <span className="bp-label text-bp-cyan">Next sheet / Your project</span>
        <h2 id="bp-cta-title" data-reveal className="bp-heading mt-8 max-w-4xl text-4xl text-bp-text sm:text-6xl lg:text-[80px]">
          {title}
        </h2>
        <div className="mt-10 h-16 w-px">
          <ConstructionLine orientation="vertical" tone="accent" />
        </div>
        <Link
          to={'/contact'}
          className="group relative inline-flex items-center gap-4 border border-bp-cyan/60 px-8 py-4 transition-colors hover:border-bp-cyan hover:bg-bp-cyan/10"
        >
          <span aria-hidden="true" className="absolute -left-px -top-px h-2 w-2 border-l border-t border-bp-cyan" />
          <span aria-hidden="true" className="absolute -bottom-px -right-px h-2 w-2 border-b border-r border-bp-cyan" />
          <span className="bp-label text-[11px] text-bp-text">Start a project</span>
          <span aria-hidden="true" className="text-bp-cyan transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </section>
  )
}
