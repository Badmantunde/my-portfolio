import { SECTION_PY } from '../lib/section'
import { AnimateIn } from './AnimateIn'

const metrics = [
  { value: '6+', label: 'Years experience', detail: 'Product, design & engineering' },
  { value: '24', label: 'Products shipped', detail: 'MVPs to production scale' },
  { value: '8', label: 'Industries', detail: 'Fintech, SaaS, AI & more' },
  { value: '40%', label: 'Avg. conversion lift', detail: 'Across redesigned flows' },
  { value: '7×', label: 'Faster delivery', detail: 'With AI-native workflows' },
  { value: '5', label: 'Design systems', detail: 'Built & maintained' },
]

export function CredibilitySection() {
  return (
    <section className={`bg-white border-y border-gray-100 ${SECTION_PY}`}>
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
          {metrics.map((metric, i) => (
            <AnimateIn key={metric.label} variant="scale-up" delay={i * 80} className="group">
              <p className="text-[clamp(1.75rem,4vw,2.5rem)] font-medium tracking-[-0.03em] text-gray-900 leading-none">
                {metric.value}
              </p>
              <div className="mt-2 h-0.5 w-8 bg-[#3DDB84]/40 group-hover:w-12 group-hover:bg-[#3DDB84] transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]" />
              <p className="mt-2 text-[13px] sm:text-[14px] font-medium text-gray-900">
                {metric.label}
              </p>
              <p className="mt-0.5 text-[11px] sm:text-[12px] text-gray-500 leading-snug">
                {metric.detail}
              </p>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
