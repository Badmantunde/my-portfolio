import { lazy, Suspense, useEffect, useState } from 'react'
import { AccentButton } from './AccentButton'
import { AvailabilityBadge } from './AvailabilityBadge'
import { AnimateIn } from './AnimateIn'

const HeroBackground = lazy(() =>
  import('./HeroBackground').then((module) => ({ default: module.HeroBackground }))
)

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function HeroSection() {
  const [showShader, setShowShader] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion()) return

    const enableShader = () => setShowShader(true)

    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(enableShader, { timeout: 2500 })
      return () => window.cancelIdleCallback(id)
    }

    const timer = setTimeout(enableShader, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col bg-[#EDF0ED]">
      <div
        className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-br from-[#EDF0ED] via-[#f2f5f2] to-[#dff5ea]"
        aria-hidden="true"
      />

      {showShader && (
        <Suspense fallback={null}>
          <HeroBackground />
        </Suspense>
      )}

      <div className="relative z-10 flex-1 flex flex-col">
        <div className="flex-1" />

        <div className="max-w-[1440px] mx-auto w-full px-5 sm:px-8 lg:px-12 pb-14 sm:pb-16 lg:pb-20">
          <AnimateIn immediate variant="fade-in" delay={100}>
            <p className="text-[13px] sm:text-[14px] text-gray-900 tracking-wide mb-5 sm:mb-8">
              Abiola Babatunde · Product Engineer
            </p>
          </AnimateIn>

          <h1 className="text-[clamp(1.75rem,7vw,4.2rem)] sm:text-[clamp(2.5rem,5vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900">
            From product strategy
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            to production-ready
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            software.
          </h1>

          <AnimateIn immediate variant="fade-up" delay={350}>
            <p className="mt-5 sm:mt-6 max-w-xl text-[15px] sm:text-[16px] leading-[1.6] text-gray-600">
              Product designer, UI/UX designer, and software developer helping
              startups transform ideas into scalable products through strategy,
              website design, engineering, and AI-powered execution.
            </p>
          </AnimateIn>

          <AnimateIn immediate variant="fade-up" delay={500}>
            <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
              <AccentButton text="View selected work" href="/work" />
              <AvailabilityBadge />
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}
