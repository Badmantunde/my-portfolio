import { ContactCta } from '../blueprint/components/ContactCta'
import { BlueprintHero } from '../blueprint/hero/BlueprintHero'
import { Faq } from '../blueprint/sections/Faq'
import { Intro } from '../blueprint/sections/Intro'
import { LatestWriting } from '../blueprint/sections/LatestWriting'
import { SelectedWork } from '../blueprint/sections/SelectedWork'
import { Services } from '../blueprint/sections/Services'
import { Testimonials } from '../blueprint/sections/Testimonials'

export function HomePage() {
  return (
    <>
      <BlueprintHero />
      <Intro />
      <SelectedWork />
      <Services />
      <Testimonials />
      <LatestWriting />
      <Faq />
      <ContactCta />
    </>
  )
}
