import { SectionHeader } from './SectionHeader'
import { AnimateIn } from './AnimateIn'
import { AccentButton } from './AccentButton'
import { SECTION_PY } from '../lib/section'
import { services } from '../data/services'

export function ServicesSection() {
  return (
    <section className={`bg-[#F5F5F5] ${SECTION_PY}`}>
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <SectionHeader
          label="Services"
          heading="What I build for clients"
          borderClassName="border-gray-300"
        />

        <p className="mt-6 sm:mt-8 max-w-2xl text-[15px] sm:text-[16px] leading-[1.65] text-gray-600 mb-10 sm:mb-14">
          I work as a product designer, UI/UX designer, software developer, and
          website designer for startups and product teams in Lagos and worldwide.
          Whether you need a Webflow marketing site, a WordPress build, or a full
          product from idea to launch, I can own the work end to end.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {services.map((service, i) => (
            <AnimateIn
              key={service.title}
              variant="fade-up"
              delay={i * 80}
              className="bg-white rounded-2xl p-5 sm:p-6 hover-lift"
            >
              <h3 className="text-[15px] sm:text-[16px] font-semibold text-gray-900 capitalize">
                {service.title}
              </h3>
              <p className="mt-3 text-[13px] sm:text-[14px] leading-[1.65] text-gray-600">
                {service.description}
              </p>
            </AnimateIn>
          ))}
        </div>

        <div className="mt-10 sm:mt-12">
          <AccentButton text="Discuss your project" href="/contact" />
        </div>
      </div>
    </section>
  )
}
