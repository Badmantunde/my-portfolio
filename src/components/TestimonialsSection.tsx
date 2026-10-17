import { SectionHeader } from './SectionHeader'
import { AnimateIn } from './AnimateIn'
import { SECTION_PY } from '../lib/section'
import { testimonials } from '../data/testimonials'
import { getProject } from '../data/projects'

export function TestimonialsSection() {
  return (
    <section className={`bg-white ${SECTION_PY}`}>
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <SectionHeader
          label="Testimonials"
          heading="What clients say"
        />

        <div className="mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
          {testimonials.map((t, i) => (
            <AnimateIn key={t.quote} variant="fade-up" delay={i * 120} as="blockquote" className="flex flex-col justify-between bg-[#F5F5F5] rounded-2xl p-6 sm:p-8 hover-lift">
              <p className="text-[15px] sm:text-[16px] leading-[1.65] text-gray-700 font-medium">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-[14px] font-semibold text-gray-900">
                  {t.name ?? 'Freelance client'}
                </p>
                {(t.role || t.projectSlug) && (
                  <p className="text-[12px] sm:text-[13px] text-gray-500 mt-0.5">
                    {[t.role, t.projectSlug && getProject(t.projectSlug)?.title]
                      .filter(Boolean)
                      .join(' · ')}
                  </p>
                )}
              </footer>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
