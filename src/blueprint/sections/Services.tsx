import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { services } from '../../data/services'
import { BlueprintSectionLabel } from '../components/BlueprintSectionLabel'
import { SHEET, useBlueprintMotion } from '../lib/motion'

/** What I build, as a numbered specification schedule. */
export function Services({ index = '03' }: { index?: string }) {
  const ref = useRef<HTMLElement>(null)
  useBlueprintMotion(ref)

  return (
    <section ref={ref} aria-labelledby="bp-services-title" className="relative border-t border-bp-line bg-bp-deep/25 py-28 md:py-40">
      <div className={SHEET}>
        <BlueprintSectionLabel index={index} title="Services" meta={`${services.length} specifications`} />
        <div className="mt-12 grid gap-8 md:mt-16 lg:grid-cols-12">
          <h2 id="bp-services-title" data-reveal className="bp-heading text-5xl text-bp-text sm:text-6xl lg:col-span-7 lg:text-[80px]">
            What I design and build.
          </h2>
          <p data-reveal className="max-w-md self-end text-base leading-relaxed text-bp-muted lg:col-span-4 lg:col-start-9">
            One person from first sketch to live product, so design decisions survive the build.
          </p>
        </div>
        <ol className="mt-16 border-t border-bp-cyan/30 md:mt-20">
          {services.map((service, i) => (
            <li key={service.title} data-reveal className="grid gap-3 border-b border-bp-line py-7 md:grid-cols-12 md:gap-10 md:py-9">
              <span className="bp-label bp-num pt-1.5 text-bp-cyan md:col-span-1">S.{String(i + 1).padStart(2, '0')}</span>
              <h3 className="text-2xl font-normal tracking-tight text-bp-text md:col-span-4 md:text-[28px]">{service.title}</h3>
              <p className="max-w-xl text-[15px] leading-relaxed text-bp-muted md:col-span-6 md:col-start-7">{service.description}</p>
            </li>
          ))}
        </ol>
        <Link to="/process" className="bp-label group mt-10 inline-flex items-center gap-2 text-bp-text transition-colors hover:text-bp-cyan">
          How I work <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </section>
  )
}
