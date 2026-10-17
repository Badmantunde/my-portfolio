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
        title="Product design case studies"
        description="Client work I designed, and often built: live products in Next.js, Webflow, Shopify, and Flutter, plus mobile and web design projects."
      />
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-10 sm:py-12">
          <div className="max-w-3xl space-y-4 text-[15px] sm:text-[16px] leading-[1.75] text-gray-600">
            <p>
              Each case study covers the problem, my role, the design decisions, and what shipped.
              The first four are live builds: a membership platform for a Lagos running club
              (Next.js and Supabase), a Figma to Webflow redesign for a regulated crypto platform,
              a Shopify store for a Lagos retailer, and a Yoruba word game built in Flutter.
            </p>
            <p>
              The rest are design projects: a campus music discovery app, a DeFi wallet, and
              websites for a luxury beauty studio and an AgriTech company. Explore the case studies
              below or{' '}
              <Link to="/contact" className="text-[#28B866] font-medium hover:underline">
                get in touch
              </Link>{' '}
              if you need a product designer who can also build your next launch.
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
