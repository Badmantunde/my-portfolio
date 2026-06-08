import { SectionHeader } from './SectionHeader'
import { SECTION_PY } from '../lib/section'
import { ProjectCard } from './ProjectCard'
import { projects, getFeaturedProjects } from '../data/projects'
import { AccentButton } from './AccentButton'

interface CaseStudiesSectionProps {
  limit?: number
  featured?: boolean
  showViewAll?: boolean
}

export function CaseStudiesSection({
  limit,
  featured = false,
  showViewAll = false,
}: CaseStudiesSectionProps) {
  const displayed = featured
    ? getFeaturedProjects(limit ?? 4)
    : limit
      ? projects.slice(0, limit)
      : projects

  return (
    <section className={`bg-[#F5F5F5] ${SECTION_PY}`}>
      <div className="max-w-[1440px] mx-auto">
        <div className="px-5 sm:px-8 lg:px-12">
          <SectionHeader
            label="Selected work"
            heading="Featured projects"
            headingClassName="text-[clamp(1.75rem,7vw,4.2rem)] sm:text-[clamp(2.5rem,5vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.03em]"
            borderClassName="border-gray-300"
            className="mb-10 sm:mb-14 lg:mb-16"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-7 px-5 sm:px-8 lg:px-12">
          {displayed.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              variant={i % 2 === 1 ? 'green' : 'light'}
            />
          ))}
        </div>

        {showViewAll && (
          <div className="px-5 sm:px-8 lg:px-12 mt-10 sm:mt-12">
            <AccentButton text="View all projects" href="/work" />
          </div>
        )}
      </div>
    </section>
  )
}
