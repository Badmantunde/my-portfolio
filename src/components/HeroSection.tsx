import { HeroBackground } from './HeroBackground'
import { AccentButton } from './AccentButton'
import { AvailabilityBadge } from './AvailabilityBadge'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col bg-[#EDF0ED]">
      <HeroBackground />

      <div className="relative z-10 flex-1 flex flex-col">
        <div className="flex-1" />

        <div className="max-w-[1440px] mx-auto w-full px-5 sm:px-8 lg:px-12 pb-14 sm:pb-16 lg:pb-20">
          <p className="text-[13px] sm:text-[14px] text-gray-900 tracking-wide mb-5 sm:mb-8">
            Abiola Babatunde · Product Engineer
          </p>

          <h1 className="text-[clamp(1.75rem,7vw,4.2rem)] sm:text-[clamp(2.5rem,5vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900">
            From product strategy
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            to production-ready
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            software.
          </h1>

          <p className="mt-5 sm:mt-6 max-w-xl text-[15px] sm:text-[16px] leading-[1.6] text-gray-600">
            I help startups transform ideas into scalable products through
            strategy, design, engineering, and AI-powered execution.
          </p>

          <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
            <AccentButton text="View selected work" href="/work" />
            <AvailabilityBadge />
          </div>
        </div>
      </div>
    </section>
  )
}
