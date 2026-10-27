import { useRef, type ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getArticle } from '../data/articles'
import { workProjects, getWorkProject, type ProjectFeature } from '../data/work'
import { BlueprintGrid } from '../blueprint/components/BlueprintGrid'
import { BlueprintPageHeader } from '../blueprint/components/BlueprintPageHeader'
import { BlueprintSectionLabel } from '../blueprint/components/BlueprintSectionLabel'
import { ContactCta } from '../blueprint/components/ContactCta'
import { DimensionLine } from '../blueprint/components/DimensionLine'
import { StageLine } from '../blueprint/components/StageLine'
import { cn, SHEET, useBlueprintMotion } from '../blueprint/lib/motion'
import { NotFoundPage } from './NotFoundPage'
import { ProjectFrame } from '../blueprint/projects/ProjectFrame'
import { projectFacts } from '../blueprint/projects/ProjectShowcase'

/** Specification row: a lettered label in the margin, content in the body. */
function SpecRow({ code, title, children }: { code: string; title: string; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null)
  useBlueprintMotion(ref)
  return (
    <section ref={ref} className="grid gap-6 border-t border-bp-line py-14 md:py-20 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-4">
        <span className="bp-label bp-num text-bp-cyan">{code}</span>
        <h2 data-reveal className="mt-3 text-2xl font-normal tracking-tight text-bp-text md:text-3xl">
          {title}
        </h2>
      </div>
      <div className="lg:col-span-7 lg:col-start-6">{children}</div>
    </section>
  )
}

/** A key screen with its callouts drawn as leader lines, like annotations on a drawing. */
function FeatureSheet({ feature, index }: { feature: ProjectFeature; index: number }) {
  const ref = useRef<HTMLElement>(null)
  useBlueprintMotion(ref, { start: 'top 80%', end: 'center 50%' })
  const flipped = index % 2 === 1
  const code = `F.${String(index + 1).padStart(2, '0')}`

  return (
    <article ref={ref} className="grid items-center gap-10 py-14 md:py-20 lg:grid-cols-12 lg:gap-16">
      <figure className={cn('relative lg:col-span-5', flipped && 'lg:order-2 lg:col-start-8')}>
        <DimensionLine label={`${code} · Screen`} className="mb-5" />
        <div className="relative overflow-hidden bg-bp-deep/50 px-[14%] py-10">
          <BlueprintGrid vignette={false} className="opacity-60" />
          <img
            src={feature.image}
            alt={feature.imageAlt}
            loading="lazy"
            decoding="async"
            width={923}
            height={2000}
            className="relative mx-auto h-auto w-full max-w-[300px] drop-shadow-[0_28px_48px_rgba(0,0,0,0.5)]"
          />
        </div>
      </figure>

      <div className={cn('lg:col-span-6', flipped ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-7')}>
        <span className="bp-label bp-num text-bp-cyan">{code}</span>
        <h3 data-reveal className="bp-heading mt-4 text-4xl text-bp-text md:text-5xl">
          {feature.title}
        </h3>
        <p data-reveal className="mt-6 max-w-xl text-[17px] leading-relaxed text-bp-muted">
          {feature.body}
        </p>
        <ul className="mt-10 border-t border-bp-line">
          {feature.callouts.map((callout, i) => (
            <li key={callout} data-reveal className="flex items-center gap-4 border-b border-bp-line py-3.5">
              <span className="bp-label bp-num w-8 shrink-0 text-[9.5px] text-bp-cyan/80">{String(i + 1).padStart(2, '0')}</span>
              <span aria-hidden="true" className="h-px w-8 shrink-0 bg-bp-cyan/40" />
              <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-bp-cyan" />
              <span className="text-[15px] text-bp-text/90">{callout}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export function ProjectPage() {
  const { slug = '' } = useParams()
  const project = getWorkProject(slug)

  if (!project) return <NotFoundPage />

  const position = workProjects.indexOf(project)
  const next = workProjects[(position + 1) % workProjects.length]
  const sheet = `02.${position + 1}`
  const facts = projectFacts(project)
  const article = project.relatedArticleSlug ? getArticle(project.relatedArticleSlug) : undefined
  let section = 0
  const code = () => String.fromCharCode(65 + section++)

  return (
    <>
      <BlueprintPageHeader
        index={sheet}
        label="Case study"
        meta={project.category}
        title={project.title}
        intro={<p className="text-[17px]">{project.summary}</p>}
      >
        <Link
          to={'/work'}
          className="bp-label mt-10 inline-flex items-center gap-2 text-bp-text/80 transition-colors hover:text-bp-cyan"
        >
          <span aria-hidden="true">←</span> All work
        </Link>
      </BlueprintPageHeader>

      <div className={SHEET}>
        <dl className="grid grid-cols-2 border-t border-bp-cyan/30 md:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.label} className="border-b border-r border-bp-line px-4 py-4 [&:nth-child(2n)]:border-r-0 md:[&:nth-child(2n)]:border-r md:last:border-r-0">
              <dt className="bp-label text-[9px]">{fact.label}</dt>
              <dd className="mt-1.5 text-[14px] text-bp-text/90">{fact.value}</dd>
            </div>
          ))}
        </dl>
        {(project.liveUrl || project.links.length > 0) && (
          <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            {[...(project.liveUrl ? [{ label: 'Visit live site', href: project.liveUrl }] : []), ...project.links].map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bp-label inline-flex items-center gap-2 text-bp-cyan transition-colors hover:text-bp-text"
                >
                  {link.label} <span aria-hidden="true">↗</span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-16 md:mt-24">
          <ProjectFrame project={project} label={`Fig. ${sheet} · ${project.title}`} eager />
        </div>

        <div className="mt-20 md:mt-28">
          <SpecRow code={code()} title="Overview">
            <p className="text-[17px] leading-relaxed text-bp-muted md:text-lg">{project.overview}</p>
          </SpecRow>
          <SpecRow code={code()} title="The problem">
            <p className="text-[17px] leading-relaxed text-bp-muted md:text-lg">{project.challenge}</p>
          </SpecRow>
          <SpecRow code={code()} title="Approach">
            <ol className="border-t border-bp-line">
              {project.approach.map((step, i) => (
                <li key={step} data-reveal className="grid grid-cols-[40px_1fr] gap-4 border-b border-bp-line py-4">
                  <span className="bp-label bp-num pt-1 text-bp-cyan">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-[15px] leading-relaxed text-bp-text/90">{step}</span>
                </li>
              ))}
            </ol>
          </SpecRow>
        </div>
      </div>

      {project.features && (
        <section aria-labelledby="bp-features-title" className="border-t border-bp-line bg-bp-deep/25 py-24 md:py-32">
          <div className={SHEET}>
            <BlueprintSectionLabel index={code()} title="Key screens" meta={`${project.features.length} details`} />
            <h2 id="bp-features-title" className="bp-heading mt-10 max-w-3xl text-4xl text-bp-text sm:text-5xl lg:text-[64px]">
              How it works, screen by screen.
            </h2>
            <div className="mt-8 divide-y divide-bp-line">
              {project.features.map((feature, i) => (
                <FeatureSheet key={feature.title} feature={feature} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {project.journey && (
        <section aria-labelledby="bp-journey-title" className="border-t border-bp-line py-24 md:py-32">
          <div className={SHEET}>
            <BlueprintSectionLabel index={code()} title="Order journey" meta={`${project.journey.length} stages`} />
            <h2 id="bp-journey-title" className="bp-heading mt-10 max-w-3xl text-4xl text-bp-text sm:text-5xl lg:text-[64px]">
              From craving to doorstep.
            </h2>
            <StageLine stages={project.journey} className="mt-16 md:mt-24" />
          </div>
        </section>
      )}

      <div className={SHEET}>
        <SpecRow code={code()} title={project.outcomesLabel ?? 'Results'}>
          <ul className="border-t border-bp-line">
            {project.outcomes.map((outcome) => (
              <li key={outcome} data-reveal className="flex gap-4 border-b border-bp-line py-4">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-bp-cyan" />
                <span className="text-[15px] leading-relaxed text-bp-text/90">{outcome}</span>
              </li>
            ))}
          </ul>
        </SpecRow>

        {project.gallery && project.gallery.length > 0 && (
          <SpecRow code={code()} title="Gallery">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {project.gallery.map((src) => (
                <div key={src} className="relative aspect-[9/16] overflow-hidden border border-bp-line bg-bp-deep">
                  <img src={src} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-contain" />
                </div>
              ))}
            </div>
          </SpecRow>
        )}

        {article && (
          <Link
            to={`/writing/${article.slug}`}
            className="group mt-8 flex items-center justify-between gap-6 border-t border-bp-line py-8 transition-colors"
          >
            <span>
              <span className="bp-label block text-bp-cyan">Read the full story</span>
              <span className="mt-2 block text-xl text-bp-text transition-colors group-hover:text-bp-cyan md:text-2xl">{article.title}</span>
            </span>
            <span aria-hidden="true" className="text-bp-cyan transition-transform group-hover:translate-x-1">→</span>
          </Link>
        )}

        <Link
          to={`/work/${next.slug}`}
          className="group mb-4 mt-8 flex flex-col gap-4 border-y border-bp-line py-10 transition-colors hover:text-bp-cyan sm:flex-row sm:items-center sm:gap-8"
        >
          <span className="bp-label">Next sheet</span>
          <span className="bp-heading text-4xl text-bp-text transition-colors group-hover:text-bp-cyan md:text-6xl">{next.title}</span>
          <span aria-hidden="true" className="hidden h-px flex-1 bg-bp-cyan/25 sm:block" />
          <span className="bp-label text-bp-cyan">{next.category} →</span>
        </Link>
      </div>

      <ContactCta />
    </>
  )
}
