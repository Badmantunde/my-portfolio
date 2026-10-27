import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { workProjects } from '../../data/work'
import { BlueprintSectionLabel } from '../components/BlueprintSectionLabel'
import { SHEET, useBlueprintMotion } from '../lib/motion'
import { ProjectShowcase } from '../projects/ProjectShowcase'

const HOME_PROJECTS = 3

/** Home-page preview of the work. */
export function SelectedWork() {
  const introRef = useRef<HTMLDivElement>(null)
  useBlueprintMotion(introRef, { start: 'top 95%', end: 'bottom 70%' })

  return (
    <section aria-labelledby="bp-work-title" className="relative border-t border-bp-line pt-28 md:pt-40">
      <div ref={introRef} className={`${SHEET} pb-20 md:pb-28`}>
        <BlueprintSectionLabel index="02" title="Selected Work" meta={`${HOME_PROJECTS} of ${workProjects.length} sheets`} />
        <div className="mt-12 grid gap-8 md:mt-16 lg:grid-cols-12">
          <h2 id="bp-work-title" data-reveal className="bp-heading text-5xl text-bp-text sm:text-6xl lg:col-span-7 lg:text-[88px]">
            From concept to construction.
          </h2>
          <p data-reveal className="max-w-md self-end text-base leading-relaxed text-bp-muted lg:col-span-4 lg:col-start-9">
            I design digital products and build experiences that turn complex ideas into useful, intuitive, and functional
            products.
          </p>
        </div>
      </div>

      <div className={`${SHEET} flex flex-col gap-28 pb-24 md:gap-40 md:pb-32`}>
        {workProjects.slice(0, HOME_PROJECTS).map((project, index) => (
          <ProjectShowcase key={project.slug} project={project} index={index} />
        ))}
      </div>

      <div className={`${SHEET} pb-28 md:pb-40`}>
        <Link
          to={'/work'}
          className="group flex items-center gap-6 border-y border-bp-line py-8 text-bp-text transition-colors hover:text-bp-cyan"
        >
          <span className="bp-heading text-3xl md:text-5xl">View all work</span>
          <span aria-hidden="true" className="h-px flex-1 bg-bp-cyan/25 transition-colors group-hover:bg-bp-cyan/60" />
          <span className="bp-label bp-num text-bp-cyan">{String(workProjects.length).padStart(2, '0')} projects →</span>
        </Link>
      </div>
    </section>
  )
}
