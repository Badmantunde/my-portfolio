import { ArrowRight } from 'lucide-react'
import { AccentButton } from './AccentButton'
import { SECTION_PY } from '../lib/section'
import { contact } from '../data/contact'

export function FinalCTASection() {
  return (
    <section className={`relative bg-gray-900 ${SECTION_PY} overflow-hidden`}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[50%] bg-[#3DDB84]/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(61,219,132,0.08),transparent_60%)]" />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 text-center">
        <div className="inline-flex items-center gap-2 mb-6 sm:mb-8">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3DDB84] opacity-40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3DDB84]" />
          </span>
          <span className="text-[12px] sm:text-[13px] font-medium text-[#3DDB84]">
            Available for Q2 2026
          </span>
        </div>

        <h2 className="text-[clamp(1.75rem,5vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.03em] text-white max-w-3xl mx-auto">
          Need a product engineer who can take an idea from concept to launch?
        </h2>

        <p className="mt-5 sm:mt-6 max-w-xl mx-auto text-[15px] sm:text-[16px] leading-[1.6] text-gray-400">
          I help startups and ambitious teams transform opportunities into
          production-ready products through strategy, design, engineering, and
          AI-powered development.
        </p>

        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
          <AccentButton text="Start a project" href={`mailto:${contact.email}`} />
          <a
            href={contact.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 border border-gray-700 hover:border-[#3DDB84]/50 text-white text-[13px] sm:text-[14px] rounded-full pl-5 sm:pl-6 pr-2 py-2 transition-colors"
          >
            <span className="overflow-hidden h-[20px] flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1/2">
              <span>Message on WhatsApp</span>
              <span>Message on WhatsApp</span>
            </span>
            <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 bg-[#3DDB84] rounded-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45">
              <ArrowRight size={16} className="text-gray-900" />
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
