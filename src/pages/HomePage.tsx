import { lazy, Suspense } from 'react'
import { HeroSection } from '../components/HeroSection'
import { CredibilitySection } from '../components/CredibilitySection'
import { ServicesSection } from '../components/ServicesSection'
import { AboutSection } from '../components/AboutSection'

const AIWorkflowSection = lazy(() =>
  import('../components/AIWorkflowSection').then((module) => ({
    default: module.AIWorkflowSection,
  }))
)
const CaseStudiesSection = lazy(() =>
  import('../components/CaseStudiesSection').then((module) => ({
    default: module.CaseStudiesSection,
  }))
)
const FAQSection = lazy(() =>
  import('../components/FAQSection').then((module) => ({ default: module.FAQSection }))
)
const TestimonialsSection = lazy(() =>
  import('../components/TestimonialsSection').then((module) => ({
    default: module.TestimonialsSection,
  }))
)

export function HomePage() {
  return (
    <>
      <HeroSection />
      <CredibilitySection />
      <ServicesSection />
      <AboutSection />
      <Suspense fallback={null}>
        <AIWorkflowSection />
        <CaseStudiesSection featured limit={4} showViewAll />
        <FAQSection />
        <TestimonialsSection />
      </Suspense>
    </>
  )
}
