import { PageHeader } from '../components/PageHeader'
import { AccentButton } from '../components/AccentButton'
import { AnimateIn } from '../components/AnimateIn'
import { SECTION_PY } from '../lib/section'

const ABOUT_IMAGE = '/images/abiola-about.png'

const storySections = [
  {
    heading: 'Where it started',
    paragraphs: [
      'Long before product engineering was a title I could put on a business card, I was a graphics designer on the streets of Lagos. CorelDRAW was my first real tool. I designed flyers for churches, posters for small businesses, and anything a client needed to stand out in a crowded market.',
      'Those early projects taught me something that still shapes my work today: design is not decoration. It is communication. Every flyer had to grab attention in seconds, carry a clear message, and move people to act.',
    ],
  },
  {
    heading: 'Curiosity became the career',
    paragraphs: [
      'I did not set out to become a developer or product engineer. I followed curiosity. A question here, a tutorial there, then a side project, then another tool in the stack. Photoshop led to web design. Web design led to code. Code led to full products.',
      'I kept stacking skills because the problems kept getting more interesting. Clients no longer just needed a flyer. They needed a landing page, then a platform, then something that could scale. I learned to meet those problems wherever they showed up.',
      'That learning never stopped. It is still the core of how I work. New frameworks, new AI workflows, new product challenges. I treat every project as a chance to get sharper.',
    ],
  },
  {
    heading: 'What I do today',
    paragraphs: [
      'Today I work as a product designer, UI/UX designer, and software developer, bridging strategy, visual design, and engineering to ship real software. I have designed luxury brand experiences, built community platforms, shipped fintech products, and delivered Webflow and WordPress sites for clients who need to move from rough ideas to production.',
      'The thread from those Lagos street flyers to the products I ship now is the same: understand the audience, design with intention, and build something that works in the real world.',
    ],
  },
  {
    heading: 'Beyond the screen',
    paragraphs: [
      'Outside of work, I am a member of Lions Club International. Service and community have always mattered to me, whether that meant helping a local church promote an event or contributing to initiatives that improve lives beyond business.',
      'That same mindset carries into how I collaborate with teams: show up, solve problems, and leave things better than you found them.',
    ],
  },
]

export function AboutPage() {
  return (
    <>
      <PageHeader
        label="About"
        title="A seasoned techie who never stopped learning"
        description="From CorelDRAW flyers in Lagos to product design, UI/UX design, and software development for startups worldwide. Website designer, Webflow developer, and WordPress developer based in Nigeria."
      />

      <section className={`bg-white ${SECTION_PY}`}>
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <AnimateIn variant="slide-left" className="lg:col-span-5 lg:sticky lg:top-28">
              <img
                src={ABOUT_IMAGE}
                alt="Abiola Babatunde"
                className="w-full aspect-[3/4] rounded-2xl object-cover object-top"
              />
              <p className="mt-4 text-[13px] text-gray-500">
                Lagos, Nigeria · Product Engineer · Lions Club International
              </p>
            </AnimateIn>

            <div className="lg:col-span-7 space-y-12">
              {storySections.map((section, i) => (
                <AnimateIn key={section.heading} variant="fade-up" delay={i * 80}>
                  <h2 className="text-[20px] sm:text-[22px] font-medium text-gray-900 tracking-[-0.02em] mb-4">
                    {section.heading}
                  </h2>
                  <div className="space-y-4">
                    {section.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-[15px] sm:text-[16px] leading-[1.75] text-gray-700"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </AnimateIn>
              ))}

              <AnimateIn variant="fade-up" delay={400} className="pt-4 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                <AccentButton text="View my work" href="/work" />
                <AccentButton text="How I work" href="/process" />
              </AnimateIn>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
