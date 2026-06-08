import { SectionHeader } from './SectionHeader'
import { ToolLogo } from './ToolLogo'
import { workflowTools } from '../data/tools'
import { SECTION_PY } from '../lib/section'

interface AIWorkflowSectionProps {
  hideHeader?: boolean
}

export function AIWorkflowSection({ hideHeader = false }: AIWorkflowSectionProps) {
  return (
    <section
      id="stack"
      className={`bg-[#F5F5F5] ${SECTION_PY} scroll-mt-24`}
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {hideHeader ? (
          <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-medium tracking-[-0.02em] text-gray-900 mb-4">
            The stack I ship with
          </h2>
        ) : (
          <SectionHeader
            label="Tools & workflow"
            heading="The stack I ship with"
            borderClassName="border-gray-300"
          />
        )}

        <p
          className={`max-w-2xl text-[15px] sm:text-[16px] leading-[1.65] text-gray-600 mb-12 sm:mb-16 ${
            hideHeader ? '' : 'mt-6 sm:mt-8'
          }`}
        >
          Product thinking, design craft, engineering fundamentals, and modern
          AI workflows connected into one toolchain that moves ideas to
          production faster without compromising quality.
        </p>

        <div className="relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-14 border border-gray-100 shadow-[0_2px_24px_rgba(0,0,0,0.04)]">
          <div className="absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-[#3DDB84]/5 rounded-full blur-3xl" />
          </div>

          <div className="relative flex flex-col items-center mb-10 sm:mb-12">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-900 flex items-center justify-center ring-4 ring-[#3DDB84]/20">
              <span className="text-white text-[14px] sm:text-[16px] font-bold">AB</span>
            </div>
            <p className="mt-4 text-[12px] sm:text-[13px] font-medium text-gray-500 uppercase tracking-wider">
              Human + AI engineering
            </p>
          </div>

          <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {workflowTools.map((tool) => (
              <div
                key={tool.id}
                className="group flex flex-col items-center justify-center bg-[#F5F5F5] hover:bg-[#EDF5F0] rounded-xl p-4 sm:p-5 transition-colors duration-300"
              >
                <div className="mb-3 p-2 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-shadow">
                  <ToolLogo id={tool.id} className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                <p className="text-[13px] sm:text-[14px] font-semibold text-gray-900 text-center">
                  {tool.name}
                </p>
                <p className="text-[10px] sm:text-[11px] text-gray-500 mt-0.5">
                  {tool.role}
                </p>
              </div>
            ))}
          </div>

          <div className="relative mt-8 sm:mt-10 flex flex-wrap justify-center gap-2 sm:gap-3">
            {['Agentic workflows', 'Rapid MVP', 'AI prototyping', 'Multi-agent dev'].map(
              (tag) => (
                <span
                  key={tag}
                  className="text-[11px] sm:text-[12px] font-medium text-gray-600 border border-gray-200 rounded-full px-3 py-1"
                >
                  {tag}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
