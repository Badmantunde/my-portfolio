import { AccentButton } from './AccentButton'
import { SectionHeader } from './SectionHeader'
import { AnimateIn } from './AnimateIn'
import { SECTION_PY } from '../lib/section'

const HEADSHOT = '/images/abiola-headshot.png'
const ABOUT_PORTRAIT = '/images/abiola-about.png'

export function AboutSection() {
  return (
    <section className={`bg-white ${SECTION_PY}`}>
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <SectionHeader
          label="About"
          heading={
            <>
              From Lagos print design
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              to product design and code.
            </>
          }
          className="mb-10 sm:mb-14 lg:mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Images */}
          <AnimateIn variant="slide-left" className="lg:col-span-5 order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              <img
                src={HEADSHOT}
                alt="Abiola Babatunde, product designer, Lagos"
                className="col-span-1 aspect-[3/4] rounded-xl sm:rounded-2xl object-cover object-top w-full"
              />
              <img
                src={ABOUT_PORTRAIT}
                alt="Portrait of Abiola Babatunde"
                className="col-span-1 aspect-[3/4] rounded-xl sm:rounded-2xl object-cover object-top w-full mt-8 sm:mt-12"
              />
            </div>
          </AnimateIn>

          {/* Content */}
          <AnimateIn variant="slide-right" delay={120} className="lg:col-span-7 order-1 lg:order-2">
            <p className="text-[15px] sm:text-[17px] lg:text-[18px] leading-[1.65] font-medium text-gray-900 max-w-xl">
              I started as a print designer in Lagos, making flyers in CorelDRAW
              for churches and small businesses. That taught me that design is
              about communication. Today I design products and build them: a
              membership platform for a Lagos running club, a Webflow rebuild for
              a regulated crypto platform, a Shopify store, and a Flutter game
              that teaches Yoruba.
            </p>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <AccentButton text="Read my story" href="/about" />
              <AccentButton text="Explore my process" href="/process" />
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}
