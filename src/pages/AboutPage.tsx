import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { about } from '../data/blueprint'
import { aboutStory } from '../data/practice'
import { BlueprintPageHeader } from '../blueprint/components/BlueprintPageHeader'
import { ContactCta } from '../blueprint/components/ContactCta'
import { CoordinateMarker } from '../blueprint/components/CoordinateMarker'
import { DimensionLine } from '../blueprint/components/DimensionLine'
import { SHEET, useBlueprintMotion } from '../blueprint/lib/motion'
import { Disciplines } from '../blueprint/sections/Disciplines'

export function AboutPage() {
  const storyRef = useRef<HTMLElement>(null)
  useBlueprintMotion(storyRef)

  const record = [
    { label: 'Based', value: about.location },
    { label: 'Practice', value: 'Design & development' },
    { label: 'Community', value: 'Lions Club International' },
  ]

  return (
    <>
      <BlueprintPageHeader
        index="03"
        label="About"
        meta="Elevation · portrait"
        title="From Lagos print design to product design and code."
        intro={<p>{aboutStory.intro}</p>}
      />

      <section ref={storyRef} aria-label="My story" className={`${SHEET} pb-28 md:pb-40`}>
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <DimensionLine label="Portrait · 3:4" className="mb-4" />
              <figure>
                <div className="relative aspect-[3/4] overflow-hidden border border-bp-cyan/25 bg-bp-deep">
                  <img
                    src={aboutStory.image}
                    alt="Portrait of Abiola Babatunde, product designer in Lagos"
                    decoding="async"
                    width={768}
                    height={1024}
                    className="absolute inset-0 h-full w-full object-cover object-top grayscale-[0.85] contrast-[1.05]"
                  />
                  <div aria-hidden="true" className="absolute inset-0 bg-bp-cyan/15 mix-blend-soft-light" />
                  <div aria-hidden="true" className="bp-grid absolute inset-0 opacity-40 mix-blend-screen" />
                </div>
                <figcaption className="mt-4 space-y-2">
                  <CoordinateMarker label={`${about.location} · ${about.coordinates}`} />
                  <p className="bp-label text-[9.5px]">{aboutStory.caption}</p>
                </figcaption>
              </figure>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            {aboutStory.sections.map((section, i) => (
              <div key={section.heading} className="border-t border-bp-line py-10 first:pt-0 first:border-t-0">
                <span className="bp-label bp-num text-bp-cyan">{String.fromCharCode(65 + i)}</span>
                <h2 data-reveal className="mt-3 text-3xl font-light tracking-tight text-bp-text md:text-4xl">
                  {section.heading}
                </h2>
                <div className="mt-6 space-y-5">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} data-reveal className="text-[17px] leading-relaxed text-bp-muted">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            <dl data-reveal className="mt-4 grid border-t border-bp-line sm:grid-cols-3">
              {record.map((item) => (
                <div key={item.label} className="border-b border-bp-line py-4 sm:border-b-0 sm:border-r sm:px-4 sm:first:pl-0 sm:last:border-r-0">
                  <dt className="bp-label text-[9.5px]">{item.label}</dt>
                  <dd className="mt-2 text-sm text-bp-text/90">{item.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
              <Link to="/work" className="bp-label group inline-flex items-center gap-2 text-bp-cyan">
                View my work <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link to="/process" className="bp-label group inline-flex items-center gap-2 text-bp-text transition-colors hover:text-bp-cyan">
                How I work <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Disciplines index="03.1" />
      <ContactCta />
    </>
  )
}
