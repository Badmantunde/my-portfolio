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
