import { SectionHeader } from './SectionHeader'
import { SECTION_PY } from '../lib/section'

const testimonials = [
  {
    quote:
      'Abiola doesn\'t just design screens. He architects products. He took our fintech MVP from wireframes to production in six weeks, with a design system we still build on today.',
    name: 'Sarah Chen',
    role: 'CEO, Series A Fintech',
  },
  {
    quote:
      'Rare to find someone who can run discovery, ship Next.js code, and integrate AI workflows in the same sprint. He became our de facto Head of Product.',
    name: 'James Okonkwo',
    role: 'Founder, AI Startup',
  },
  {
    quote:
      'Our conversion rate jumped 38% after Abiola rebuilt the onboarding flow. He thinks in systems, not pages, exactly what we needed at scale.',
    name: 'Emily Hartwell',
    role: 'VP Product, B2B SaaS',
  },
]

export function TestimonialsSection() {
  return (
    <section className={`bg-white ${SECTION_PY}`}>
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <SectionHeader
          label="Testimonials"
          heading="Trusted by founders and product leaders"
        />

        <div className="mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
          {testimonials.map((t) => (
            <blockquote
              key={t.name}
              className="flex flex-col justify-between bg-[#F5F5F5] rounded-2xl p-6 sm:p-8"
            >
              <p className="text-[15px] sm:text-[16px] leading-[1.65] text-gray-700 font-medium">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-[14px] font-semibold text-gray-900">{t.name}</p>
                <p className="text-[12px] sm:text-[13px] text-gray-500 mt-0.5">
                  {t.role}
                </p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
