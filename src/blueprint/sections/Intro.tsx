import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { heroMedia } from '../../data/blueprint'
import { metrics, positioning } from '../../data/practice'
import { BlueprintSectionLabel } from '../components/BlueprintSectionLabel'
import { ConstructionLine } from '../components/ConstructionLine'
import { SHEET, useBlueprintMotion } from '../lib/motion'

/** Positioning and key figures, continuing straight on from the hero drawing. */
export function Intro() {
  const ref = useRef<HTMLElement>(null)
  useBlueprintMotion(ref, { start: 'top 95%', end: 'bottom 70%' })

  return (
    <section ref={ref} aria-labelledby="bp-intro-title" className="relative pb-24 md:pb-36">
      {/* Hand-off from the hero canvas: its colour bleeds into the page while a datum line drops into the sheet. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-48"
        style={{ background: `linear-gradient(${heroMedia.canvasColor}, transparent)` }}
      />
      <div className={SHEET}>
        <div className="mx-auto h-24 w-px md:h-36">
          <ConstructionLine orientation="vertical" tone="accent" />
        </div>
        <BlueprintSectionLabel index="01" title="Brief" meta={positioning.eyebrow} className="mt-6" />
        <div className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-12">
          <h2 id="bp-intro-title" data-reveal className="bp-heading text-5xl text-bp-text sm:text-6xl lg:col-span-8 lg:text-[88px]">
            {positioning.statement}
          </h2>
          <div className="self-end lg:col-span-4">
            <p data-reveal className="text-base leading-relaxed text-bp-muted">
              {positioning.body}
            </p>
            <div data-reveal className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              <Link to="/contact" className="bp-label group inline-flex items-center gap-2 text-bp-cyan">
                Start a project <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link to="/work" className="bp-label group inline-flex items-center gap-2 text-bp-text transition-colors hover:text-bp-cyan">
                See case studies <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>

        <dl className="mt-20 grid grid-cols-2 border-l border-t border-bp-line md:mt-28 md:grid-cols-3 lg:grid-cols-6">
          {metrics.map((metric) => (
            <div key={metric.label} data-reveal className="border-b border-r border-bp-line px-4 py-6 md:px-5">
              <dt className="sr-only">{metric.label}</dt>
              <dd>
                <span className="bp-num block text-4xl font-light tracking-tight text-bp-text md:text-5xl">{metric.value}</span>
                <span aria-hidden="true" className="mt-3 block h-px w-8 bg-bp-cyan" />
                <span className="mt-3 block text-[13px] text-bp-text/90">{metric.label}</span>
                <span className="bp-label mt-1 block text-[9px]">{metric.detail}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
