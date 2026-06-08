import { AccentButton } from './AccentButton'
import { SectionHeader } from './SectionHeader'
import { SECTION_PY } from '../lib/section'

const HEADSHOT = '/images/abiola-headshot.png'
const PORTRAIT = '/images/abiola-portrait.png'

export function AboutSection() {
  return (
    <section className={`bg-white ${SECTION_PY}`}>
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <SectionHeader
          label="Product thinking"
          heading={
            <>
              Strategy, design, and engineering,
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              owned end to end.
            </>
          }
          className="mb-10 sm:mb-14 lg:mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Images */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              <img
                src={HEADSHOT}
                alt="Abiola Babatunde"
                className="col-span-1 aspect-[3/4] rounded-xl sm:rounded-2xl object-cover object-top w-full"
              />
              <img
                src={PORTRAIT}
                alt="Abiola Babatunde"
                className="col-span-1 aspect-[3/4] rounded-xl sm:rounded-2xl object-cover object-top w-full mt-8 sm:mt-12"
              />
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <p className="text-[15px] sm:text-[17px] lg:text-[18px] leading-[1.65] font-medium text-gray-900 max-w-xl">
              I bridge product thinking, UX design, and full-stack engineering to
              ship production-ready products. From discovery and roadmapping to
              design systems, Next.js frontends, and AI-native workflows. I own
              the full lifecycle.
            </p>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <AccentButton text="Explore my process" href="/process" />
              <AccentButton text="See my stack" href="#stack" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
