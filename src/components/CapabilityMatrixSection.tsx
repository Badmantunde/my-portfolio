import { SectionHeader } from './SectionHeader'
import { AnimateIn } from './AnimateIn'
import { SECTION_PY } from '../lib/section'

type Level = 'Expert' | 'Advanced' | 'Proficient'

interface Capability {
  area: string
  level: Level
  years: string
  deliverables: string
  tools: string
  outcome: string
}

const capabilities: Capability[] = [
  {
    area: 'Strategy',
    level: 'Expert',
    years: '6+',
    deliverables: 'Roadmaps, positioning, growth plans',
    tools: 'Notion, Miro, FigJam',
    outcome: 'Aligned product vision',
  },
  {
    area: 'Design',
    level: 'Expert',
    years: '6+',
    deliverables: 'UX flows, UI systems, prototypes',
    tools: 'Figma',
    outcome: 'Conversion-ready experiences',
  },
  {
    area: 'Frontend',
    level: 'Expert',
    years: '5+',
    deliverables: 'SPAs, design systems, a11y',
    tools: 'React, Next.js, TypeScript',
    outcome: 'Production-grade interfaces',
  },
  {
    area: 'Backend',
    level: 'Advanced',
    years: '4+',
    deliverables: 'APIs, auth, data models',
    tools: 'Supabase, REST, SQL',
    outcome: 'Scalable infrastructure',
  },
  {
    area: 'No-Code',
    level: 'Advanced',
    years: '4+',
    deliverables: 'Marketing sites, CMS, SEO',
    tools: 'Webflow, WordPress',
    outcome: 'Fast go-to-market',
  },
  {
    area: 'Mobile',
    level: 'Proficient',
    years: '3+',
    deliverables: 'Cross-platform apps, mobile UX',
    tools: 'Flutter',
    outcome: 'Native-quality mobile',
  },
  {
    area: 'AI',
    level: 'Advanced',
    years: '2+',
    deliverables: 'AI UX, agents, LLM products',
    tools: 'Claude, Cursor, ChatGPT',
    outcome: 'AI-native products',
  },
]

const levelStyles: Record<Level, string> = {
  Expert: 'bg-gray-900 text-[#3DDB84]',
  Advanced: 'bg-[#EDF5F0] text-[#28B866]',
  Proficient: 'bg-gray-100 text-gray-700',
}

interface CapabilityMatrixSectionProps {
  hideHeader?: boolean
}

export function CapabilityMatrixSection({ hideHeader = false }: CapabilityMatrixSectionProps) {
  return (
    <section className={`bg-white ${SECTION_PY} overflow-x-auto`}>
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {hideHeader ? (
          <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-medium tracking-[-0.02em] text-gray-900 mb-4">
            Capability matrix
          </h2>
        ) : (
          <SectionHeader
            label="Technical expertise"
            heading="Capability matrix"
          />
        )}

        <AnimateIn
          className={`max-w-2xl text-[15px] sm:text-[16px] leading-[1.6] text-gray-600 mb-10 sm:mb-14 ${
            hideHeader ? '' : 'mt-6 sm:mt-8'
          }`}
        >
          Depth across the full product stack, from discovery to deployment,
          with measurable outcomes at every layer.
        </AnimateIn>

        <AnimateIn variant="fade-up" delay={100} className="min-w-[720px]">
          <div className="grid grid-cols-[100px_repeat(5,1fr)] gap-px bg-gray-200 rounded-2xl overflow-hidden border border-gray-200">
            <div className="bg-gray-50 p-3 sm:p-4" />
            {['Level', 'Years', 'Deliverables', 'Tools', 'Outcome'].map((col) => (
              <div
                key={col}
                className="bg-gray-50 p-3 sm:p-4 text-[10px] sm:text-[11px] font-semibold text-gray-500 uppercase tracking-wider"
              >
                {col}
              </div>
            ))}

            {capabilities.map((cap) => (
              <div key={cap.area} className="contents">
                <div className="bg-white p-3 sm:p-4 flex items-center">
                  <span className="text-[13px] sm:text-[14px] font-semibold text-gray-900">
                    {cap.area}
                  </span>
                </div>
                <div className="bg-white p-3 sm:p-4 flex items-center">
                  <span
                    className={`text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded ${levelStyles[cap.level]}`}
                  >
                    {cap.level}
                  </span>
                </div>
                <div className="bg-white p-3 sm:p-4 flex items-center">
                  <span className="text-[12px] sm:text-[13px] text-gray-700">{cap.years}</span>
                </div>
                <div className="bg-white p-3 sm:p-4 flex items-center">
                  <span className="text-[11px] sm:text-[12px] text-gray-600 leading-snug">
                    {cap.deliverables}
                  </span>
                </div>
                <div className="bg-white p-3 sm:p-4 flex items-center">
                  <span className="text-[11px] sm:text-[12px] text-gray-600 leading-snug">
                    {cap.tools}
                  </span>
                </div>
                <div className="bg-white p-3 sm:p-4 flex items-center">
                  <span className="text-[11px] sm:text-[12px] text-gray-900 font-medium leading-snug">
                    {cap.outcome}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
