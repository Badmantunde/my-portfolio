import { HeroSection } from '../components/HeroSection'
import { CredibilitySection } from '../components/CredibilitySection'
import { ServicesSection } from '../components/ServicesSection'
import { AboutSection } from '../components/AboutSection'
import { AIWorkflowSection } from '../components/AIWorkflowSection'
import { CaseStudiesSection } from '../components/CaseStudiesSection'
import { FAQSection } from '../components/FAQSection'
import { TestimonialsSection } from '../components/TestimonialsSection'

export function HomePage() {
  return (
    <>
      <HeroSection />
      <CredibilitySection />
      <ServicesSection />
      <AboutSection />
      <AIWorkflowSection />
      <CaseStudiesSection featured limit={4} showViewAll />
      <FAQSection />
      <TestimonialsSection />
    </>
  )
}
