import { Link } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { SECTION_PY } from '../lib/section'
import { ProjectCard } from '../components/ProjectCard'
import { projects } from '../data/projects'

export function WorkPage() {
  return (
    <>
      <PageHeader
        label="Selected work"
        title="Featured projects"
        description="Product design, UI/UX design, software development, and website design case studies. Live products built with Next.js, Supabase, Webflow, and WordPress."
      />
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-10 sm:py-12">
          <div className="max-w-3xl space-y-4 text-[15px] sm:text-[16px] leading-[1.75] text-gray-600">
            <p>
              This portfolio brings together product design, mobile UI, Webflow and WordPress
              website design, and software development work for startups, fintech teams,
              AgriTech brands, and community platforms. Each case study documents the problem,
              design decisions, and shipped outcomes so you can see how strategy, UI/UX, and
              engineering connect in real projects.
            </p>
            <p>
              Recent work includes a campus music discovery app, a Yoruba language learning game
              built with Flutter, luxury and AgriTech marketing sites, DeFi mobile UI, and live
              products such as a Lagos running community platform and a regulated crypto access
              website. Explore the case studies below or{' '}
              <Link to="/contact" className="text-[#28B866] font-medium hover:underline">
                get in touch
              </Link>{' '}
              if you need a product designer, website designer, or developer for your next launch.
            </p>
          </div>
        </div>
      </section>
      <section className={`bg-[#F5F5F5] ${SECTION_PY}`}>
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-7">
            {projects.map((project, i) => (
              <ProjectCard
                key={project.slug}
                project={project}
                variant={i % 2 === 1 ? 'green' : 'light'}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
