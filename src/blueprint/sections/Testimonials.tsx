import { useRef } from 'react'
import { testimonials } from '../../data/testimonials'
import { BlueprintSectionLabel } from '../components/BlueprintSectionLabel'
import { SHEET, useBlueprintMotion } from '../lib/motion'

/** Client words, kept anonymous until each client agrees to be named. */
export function Testimonials({ index = '04' }: { index?: string }) {
  const ref = useRef<HTMLElement>(null)
  useBlueprintMotion(ref)

  return (
    <section ref={ref} aria-labelledby="bp-testimonials-title" className="relative border-t border-bp-line py-28 md:py-40">
      <div className={SHEET}>
        <BlueprintSectionLabel index={index} title="Client notes" meta={`${testimonials.length} reviews`} />
        <h2 id="bp-testimonials-title" data-reveal className="bp-heading mt-12 max-w-3xl text-5xl text-bp-text sm:text-6xl md:mt-16 lg:text-[80px]">
          What clients say.
        </h2>
        <ul className="mt-16 grid gap-x-10 md:mt-20 md:grid-cols-2">
          {testimonials.map((testimonial, i) => (
            <li key={testimonial.quote} data-reveal className="border-t border-bp-line py-10">
              <figure>
                <span className="bp-label bp-num text-bp-cyan">N.{String(i + 1).padStart(2, '0')}</span>
                <blockquote className="mt-5 text-lg font-light leading-relaxed text-bp-text md:text-xl">
                  “{testimonial.quote}”
                </blockquote>
                <figcaption className="bp-label mt-6 text-[9.5px]">
                  {testimonial.name ? [testimonial.name, testimonial.role].filter(Boolean).join(' · ') : 'Client review'}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
