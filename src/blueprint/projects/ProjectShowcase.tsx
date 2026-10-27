import { useRef } from 'react'
import { Link } from 'react-router-dom'
import type { WorkProject } from '../../data/work'
import { cn, useBlueprintMotion } from '../lib/motion'
import { ProjectFrame } from './ProjectFrame'

interface ProjectShowcaseProps {
  project: WorkProject
  index: number
  /** Heading level inside the page outline. */
  headingLevel?: 'h2' | 'h3'
}

export function projectFacts(project: WorkProject) {
  return [
    { label: 'Category', value: project.category },
    { label: 'Role', value: project.role },
    ...(project.year ? [{ label: 'Year', value: project.year }] : []),
    ...(project.stack.length ? [{ label: 'Stack', value: project.stack.join(' · ') }] : []),
    ...(project.extraFacts ?? []),
  ]
}

/** One project drawn as a sheet: framed visual, title, summary and a title block of facts. */
export function ProjectShowcase({ project, index, headingLevel: Heading = 'h3' }: ProjectShowcaseProps) {
  const ref = useRef<HTMLElement>(null)
  const flipped = index % 2 === 1
  const figure = `02.${index + 1}`
  const href = `/work/${project.slug}`

  useBlueprintMotion(ref, { start: 'top 85%', end: 'top 30%' })

  return (
    <article ref={ref} className="grid grid-cols-1 gap-x-10 gap-y-8 lg:grid-cols-12">
      <Link
        to={href}
        tabIndex={-1}
        aria-hidden="true"
        className={cn('block lg:col-span-8', flipped && 'lg:order-2 lg:col-start-5')}
      >
        <ProjectFrame project={project} label={`Fig. ${figure} · ${project.title}`} from={flipped ? 'right' : 'left'} />
      </Link>

      <div className={cn('flex flex-col lg:col-span-4 lg:pt-10', flipped && 'lg:order-1 lg:col-start-1 lg:row-start-1')}>
        <span data-reveal className="bp-label bp-num text-bp-cyan">
          {figure}
        </span>
        <Heading data-reveal className="bp-heading mt-4 text-4xl text-bp-text md:text-5xl">
          <Link to={href} className="transition-colors hover:text-bp-cyan">
            {project.title}
          </Link>
        </Heading>
        <p data-reveal className="mt-5 max-w-md text-[15px] leading-relaxed text-bp-muted">
          {project.summary}
        </p>

        <dl data-reveal className="mt-8 border-t border-bp-line">
          {projectFacts(project).map((fact) => (
            <div key={fact.label} className="grid grid-cols-[88px_1fr] gap-4 border-b border-bp-line py-3">
              <dt className="bp-label text-[9.5px]">{fact.label}</dt>
              <dd className="bp-num text-[13px] text-bp-text/90">{fact.value}</dd>
            </div>
          ))}
        </dl>

        <div data-reveal className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
          <Link to={href} className="bp-label group inline-flex items-center gap-2 text-bp-text transition-colors hover:text-bp-cyan">
            View project<span className="sr-only">: {project.title}</span>
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bp-label group inline-flex items-center gap-2 text-bp-text transition-colors hover:text-bp-cyan"
            >
              Live site
              <span aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
