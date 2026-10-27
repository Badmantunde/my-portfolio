import { workProjects } from '../data/work'
import { BlueprintPageHeader } from '../blueprint/components/BlueprintPageHeader'
import { ContactCta } from '../blueprint/components/ContactCta'
import { SHEET } from '../blueprint/lib/motion'
import { ProjectShowcase } from '../blueprint/projects/ProjectShowcase'

export function WorkPage() {
  return (
    <>
      <BlueprintPageHeader
        index="02"
        label="Work"
        meta={`${workProjects.length} sheets`}
        title="From concept to construction."
        intro={
          <p>
            Mobile apps, platforms and stores I have designed and built, each drawn from the first sketch to
            the shipped build.
          </p>
        }
      />
      <section aria-label="Projects" className={`${SHEET} flex flex-col gap-28 pb-28 pt-8 md:gap-40 md:pb-40`}>
        {workProjects.map((project, index) => (
          <ProjectShowcase key={project.slug} project={project} index={index} headingLevel="h2" />
        ))}
      </section>
      <ContactCta title="Have a product that needs drawing up?" />
    </>
  )
}
