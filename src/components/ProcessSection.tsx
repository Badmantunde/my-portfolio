import { SectionHeader } from './SectionHeader'
import { SECTION_PY } from '../lib/section'

const steps = [
  { num: '01', title: 'Discovery', desc: 'Opportunity mapping & stakeholder alignment' },
  { num: '02', title: 'Product Strategy', desc: 'Vision, positioning & roadmap' },
  { num: '03', title: 'Research', desc: 'User interviews, competitive analysis' },
  { num: '04', title: 'UX Architecture', desc: 'Flows, IA & interaction models' },
  { num: '05', title: 'Design System', desc: 'Tokens, components & patterns' },
  { num: '06', title: 'Frontend Engineering', desc: 'React, Next.js & performance' },
  { num: '07', title: 'Backend Integration', desc: 'APIs, auth & data modeling' },
  { num: '08', title: 'AI Systems', desc: 'Agents, prompts & LLM infrastructure' },
  { num: '09', title: 'Testing', desc: 'Usability, QA & accessibility' },
  { num: '10', title: 'Launch', desc: 'Deployment & go-to-market' },
  { num: '11', title: 'Iteration', desc: 'Analytics-driven improvements' },
  { num: '12', title: 'Scale', desc: 'Growth systems & optimization' },
]

interface ProcessSectionProps {
  hideHeader?: boolean
}

export function ProcessSection({ hideHeader = false }: ProcessSectionProps) {
  return (
    <section className={`bg-white ${SECTION_PY} overflow-hidden`}>
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {hideHeader ? (
          <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-medium tracking-[-0.02em] text-gray-900 mb-4">
            Product engineering framework
          </h2>
        ) : (
          <SectionHeader
            label="How I work"
            heading="Product engineering framework"
            headingClassName="text-[clamp(1.75rem,7vw,4.2rem)] sm:text-[clamp(2.5rem,5vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.03em] mb-4 sm:mb-6"
          />
        )}

        <p
          className={`max-w-2xl text-[15px] sm:text-[16px] leading-[1.6] text-gray-600 mb-12 sm:mb-16 lg:mb-20 ${
            hideHeader ? '' : ''
          }`}
        >
          A systematic approach from idea to scale, bridging strategy, design,
          engineering, and AI at every stage.
        </p>

        <div className="relative">
          <div className="hidden lg:block absolute top-[28px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3DDB84]/30 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className="group relative bg-[#F5F5F5] hover:bg-[#EDF5F0] rounded-2xl p-5 sm:p-6 transition-colors duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[11px] font-semibold text-[#3DDB84] tracking-wider">
                    {step.num}
                  </span>
                  {i < steps.length - 1 && (
                    <span className="hidden lg:block flex-1 h-px bg-gray-200 group-hover:bg-[#3DDB84]/30 transition-colors" />
                  )}
                </div>
                <h3 className="text-[15px] sm:text-[16px] font-semibold text-gray-900 mb-1.5">
                  {step.title}
                </h3>
                <p className="text-[12px] sm:text-[13px] text-gray-500 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
