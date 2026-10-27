import { useRef } from 'react'
import { aiWorkflow, capabilities, frameworkSteps, type CapabilityLevel } from '../data/practice'
import { workflowTools } from '../data/tools'
import { BlueprintPageHeader } from '../blueprint/components/BlueprintPageHeader'
import { BlueprintSectionLabel } from '../blueprint/components/BlueprintSectionLabel'
import { ContactCta } from '../blueprint/components/ContactCta'
import { cn, SHEET, useBlueprintMotion } from '../blueprint/lib/motion'
import { Process } from '../blueprint/sections/Process'

const levelStyles: Record<CapabilityLevel, string> = {
  Expert: 'border-bp-cyan bg-bp-cyan/15 text-bp-cyan',
  Advanced: 'border-bp-cyan/50 text-bp-text',
  Proficient: 'border-bp-line text-bp-muted',
}

export function ProcessPage() {
  const frameworkRef = useRef<HTMLElement>(null)
  const toolsRef = useRef<HTMLElement>(null)
  const matrixRef = useRef<HTMLElement>(null)
  useBlueprintMotion(frameworkRef)
  useBlueprintMotion(toolsRef)
  useBlueprintMotion(matrixRef)

  return (
    <>
      <BlueprintPageHeader
        index="03.2"
        label="Process"
        meta="How I work"
        title="How I design and build products."
        intro={
          <p>
            How I take a product from first conversation to live code: research and UX first, then design systems and UI,
            then the build in Webflow, Shopify, Next.js, or Flutter.
          </p>
        }
      />

      <Process index="A" />

      <section ref={frameworkRef} aria-labelledby="bp-framework-title" className="border-t border-bp-line bg-bp-deep/25 py-28 md:py-36">
        <div className={SHEET}>
          <BlueprintSectionLabel index="B" title="Framework" meta={`${frameworkSteps.length} stages`} />
          <h2 id="bp-framework-title" data-reveal className="bp-heading mt-12 max-w-3xl text-4xl text-bp-text sm:text-5xl lg:text-[64px]">
            The product engineering framework.
          </h2>
          <ol className="mt-14 grid grid-cols-1 border-l border-t border-bp-line sm:grid-cols-2 lg:grid-cols-4">
            {frameworkSteps.map((step, i) => (
              <li key={step.title} data-reveal className="border-b border-r border-bp-line px-5 py-6">
                <span className="bp-label bp-num text-bp-cyan">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-3 text-lg tracking-tight text-bp-text">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-bp-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section ref={toolsRef} aria-labelledby="bp-tools-title" className="border-t border-bp-line py-28 md:py-36">
        <div className={SHEET}>
          <BlueprintSectionLabel index="C" title="Toolkit" meta={`${workflowTools.length} instruments`} />
          <div className="mt-12 grid gap-8 lg:grid-cols-12">
            <h2 id="bp-tools-title" data-reveal className="bp-heading text-4xl text-bp-text sm:text-5xl lg:col-span-7 lg:text-[64px]">
              The stack I ship with.
            </h2>
            <p data-reveal className="max-w-md self-end text-base leading-relaxed text-bp-muted lg:col-span-4 lg:col-start-9">
              {aiWorkflow.body}
            </p>
          </div>
          <ul className="mt-14 grid grid-cols-2 border-l border-t border-bp-line sm:grid-cols-3 lg:grid-cols-6">
            {workflowTools.map((tool) => (
              <li key={tool.id} data-reveal className="border-b border-r border-bp-line px-4 py-5">
                <span className="block text-[15px] text-bp-text">{tool.name}</span>
                <span className="bp-label mt-1.5 block text-[9px]">{tool.role}</span>
              </li>
            ))}
          </ul>
          <ul className="mt-8 flex flex-wrap gap-3">
            {aiWorkflow.tags.map((tag) => (
              <li key={tag} className="bp-label border border-bp-cyan/30 px-3 py-1.5 text-[9.5px] text-bp-text/80">
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section ref={matrixRef} aria-labelledby="bp-matrix-title" className="border-t border-bp-line bg-bp-deep/25 py-28 md:py-36">
        <div className={SHEET}>
          <BlueprintSectionLabel index="D" title="Capabilities" meta="Schedule of competence" />
          <h2 id="bp-matrix-title" data-reveal className="bp-heading mt-12 max-w-3xl text-4xl text-bp-text sm:text-5xl lg:text-[64px]">
            Capability matrix.
          </h2>
          <div className="mt-14 overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead>
                <tr className="border-y border-bp-cyan/30">
                  {['Area', 'Level', 'Years', 'Deliverables', 'Tools', 'Outcome'].map((column) => (
                    <th key={column} scope="col" className="bp-label px-4 py-3 text-[9.5px] font-normal">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {capabilities.map((row) => (
                  <tr key={row.area} className="border-b border-bp-line">
                    <th scope="row" className="px-4 py-4 text-[15px] font-normal text-bp-text">
                      {row.area}
                    </th>
                    <td className="px-4 py-4">
                      <span className={cn('bp-label inline-block border px-2 py-1 text-[9px]', levelStyles[row.level])}>{row.level}</span>
                    </td>
                    <td className="bp-num px-4 py-4 text-sm text-bp-text/90">{row.years}</td>
                    <td className="px-4 py-4 text-sm text-bp-muted">{row.deliverables}</td>
                    <td className="px-4 py-4 text-sm text-bp-muted">{row.tools}</td>
                    <td className="px-4 py-4 text-sm text-bp-text/90">{row.outcome}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  )
}
