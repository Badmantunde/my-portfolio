import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { experiments, type Experiment } from '../data/blueprint'
import { BlueprintPageHeader } from '../blueprint/components/BlueprintPageHeader'
import { ContactCta } from '../blueprint/components/ContactCta'
import { CoordinateMarker } from '../blueprint/components/CoordinateMarker'
import { BlueprintSectionLabel } from '../blueprint/components/BlueprintSectionLabel'
import { PartyTicket } from '../blueprint/experiments/PartyTicket'
import { StadiumSeatMap } from '../blueprint/experiments/StadiumSeatMap'
import { cn, SHEET, useBlueprintMotion } from '../blueprint/lib/motion'

/** The grid always shows this many sheets; slots without an experiment read Coming soon. */
const SHEETS = 3

function ExperimentSheet({ experiment, code }: { experiment?: Experiment; code: string }) {
  const body = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden border border-bp-cyan/25 bg-bp-deep transition-colors duration-300 group-hover:border-bp-cyan/60">
        {experiment?.illustration === 'party-ticket' ? (
          <PartyTicket className="absolute inset-0" />
        ) : experiment?.image ? (
          <img
            src={experiment.image}
            alt={experiment.title}
            loading="lazy"
            decoding="async"
            width={1280}
            height={800}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
        ) : (
          <>
            <div aria-hidden="true" className="bp-grid absolute inset-0 opacity-50" />
            <svg aria-hidden="true" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
              <path d="M0 0L100 100M100 0L0 100" stroke="rgba(66,217,255,0.12)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <CoordinateMarker />
              <span className="bp-label text-[9.5px] text-bp-cyan">Coming soon</span>
            </div>
          </>
        )}
        <span className="bp-label bp-num absolute left-3 top-3 text-[9.5px] text-bp-cyan/80">{code}</span>
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h2 className={cn('text-lg font-normal tracking-tight', experiment ? 'text-bp-text' : 'text-bp-muted/70')}>
          {experiment ? experiment.title : 'Coming soon'}
        </h2>
        {experiment && <span className="bp-label bp-num text-[9.5px]">{experiment.year}</span>}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-bp-muted">{experiment ? experiment.description : 'The next experiment is on the drawing board.'}</p>
      {experiment && experiment.tags.length > 0 && (
        <p className="bp-label mt-3 text-[9.5px] text-bp-text/60">{experiment.tags.join(' · ')}</p>
      )}
    </>
  )

  if (experiment?.anchor) {
    return (
      <a href={`#${experiment.anchor}`} className="group block">
        {body}
        <span className="bp-label mt-4 inline-flex items-center gap-2 text-bp-cyan">
          Try it below <span aria-hidden="true" className="transition-transform group-hover:translate-y-0.5">↓</span>
        </span>
      </a>
    )
  }
  if (experiment?.href?.startsWith('/')) {
    return (
      <Link to={experiment.href} className="group block">
        {body}
        <span className="bp-label mt-4 inline-flex items-center gap-2 text-bp-cyan">
          See it live <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
        </span>
      </Link>
    )
  }
  if (experiment?.href) {
    return (
      <a href={experiment.href} target="_blank" rel="noopener noreferrer" className="group block">
        {body}
      </a>
    )
  }
  return <div className="group block">{body}</div>
}

export function ExperimentsPage() {
  const ref = useRef<HTMLElement>(null)
  useBlueprintMotion(ref)
  const sheets: (Experiment | undefined)[] = [
    ...experiments,
    ...Array(Math.max(0, SHEETS - experiments.length)).fill(undefined),
  ]

  return (
    <>
      <BlueprintPageHeader
        index="05"
        label="Experiments"
        meta="Working sheets"
        title="Ideas beyond the blueprint."
        intro={
          <p>
            A space for creative coding, interaction experiments, prototypes, and visual explorations.
            {!experiments.length && ' The first sheets are still being drafted.'}
          </p>
        }
      />
      <section ref={ref} aria-label="Experiments" className={`${SHEET} pb-28 md:pb-40`}>
        <div data-reveal className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {sheets.map((experiment, i) => (
            <ExperimentSheet key={experiment?.title ?? i} experiment={experiment} code={`05.${i + 1}`} />
          ))}
        </div>
      </section>

      <section
        id="party-padi-stadium"
        aria-labelledby="bp-stadium-title"
        className="scroll-mt-20 border-t border-bp-line bg-bp-deep/25 py-24 md:py-32"
      >
        <div className={SHEET}>
          <BlueprintSectionLabel index="05.1" title="Party Padi" meta="Interactive prototype" />
          <div className="mt-12 grid gap-8 md:mt-16 lg:grid-cols-12">
            <h2 id="bp-stadium-title" className="bp-heading text-4xl text-bp-text sm:text-5xl lg:col-span-7 lg:text-[64px]">
              Choosing seats in 3D.
            </h2>
            <p className="max-w-md self-end text-base leading-relaxed text-bp-muted lg:col-span-4 lg:col-start-9">
              A seat map I am prototyping for Party Padi. Instead of a flat list of ticket types, you see the whole venue:
              price and seats left for every block, at a glance.
              <a
                href="https://partypadi.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bp-label mt-5 flex items-center gap-2 text-bp-cyan transition-colors hover:text-bp-text"
              >
                partypadi.com <span aria-hidden="true">↗</span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </p>
          </div>
          <div className="mt-14 md:mt-20">
            <StadiumSeatMap />
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  )
}
