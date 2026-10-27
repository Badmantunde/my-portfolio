import { useRef } from 'react'
import { faqs } from '../../data/faqs'
import { BlueprintSectionLabel } from '../components/BlueprintSectionLabel'
import { SHEET, useBlueprintMotion } from '../lib/motion'

/** Questions as native disclosure rows: keyboard and screen-reader friendly with no script. */
export function Faq({ index = '06' }: { index?: string }) {
  const ref = useRef<HTMLElement>(null)
  useBlueprintMotion(ref)

  return (
    <section ref={ref} aria-labelledby="bp-faq-title" className="relative border-t border-bp-line py-28 md:py-40">
      <div className={`${SHEET} grid gap-12 lg:grid-cols-12`}>
        <div className="lg:col-span-4">
          <BlueprintSectionLabel index={index} title="Questions" />
          <h2 id="bp-faq-title" data-reveal className="bp-heading mt-12 text-5xl text-bp-text sm:text-6xl md:mt-16">
            Before we start.
          </h2>
        </div>
        <div className="border-t border-bp-cyan/30 lg:col-span-7 lg:col-start-6">
          {faqs.map((faq, i) => (
            <details key={faq.question} className="group border-b border-bp-line">
              <summary className="flex cursor-pointer list-none items-baseline gap-5 py-6 text-bp-text transition-colors hover:text-bp-cyan [&::-webkit-details-marker]:hidden">
                <span className="bp-label bp-num shrink-0 text-bp-cyan">Q.{String(i + 1).padStart(2, '0')}</span>
                <span className="flex-1 text-lg tracking-tight md:text-xl">{faq.question}</span>
                <span aria-hidden="true" className="relative h-3 w-3 shrink-0 self-center">
                  <span className="absolute inset-x-0 top-1/2 h-px bg-bp-cyan" />
                  <span className="absolute inset-y-0 left-1/2 w-px bg-bp-cyan transition-transform group-open:scale-y-0" />
                </span>
              </summary>
              <p className="pb-7 pl-12 pr-6 text-[15px] leading-relaxed text-bp-muted md:pl-[60px]">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
