import { ArrowRight } from 'lucide-react'
import { AccentButton } from './AccentButton'
import { contact } from '../data/contact'

interface ProjectContactCTAProps {
  projectTitle: string
  variant?: 'inline' | 'sidebar'
}

export function ProjectContactCTA({
  projectTitle,
  variant = 'inline',
}: ProjectContactCTAProps) {
  if (variant === 'sidebar') {
    return (
      <div className="rounded-xl bg-[#EDF5F0] border border-[#3DDB84]/20 p-5">
        <p className="text-[14px] font-semibold text-gray-900">
          Interested in similar work?
        </p>
        <p className="mt-2 text-[13px] leading-[1.55] text-gray-600">
          I help startups and teams ship products like {projectTitle}. Share your
          goals and I will follow up with scope and next steps.
        </p>
        <AccentButton
          text="Contact me"
          href="/contact"
          className="mt-4 w-full justify-center"
        />
      </div>
    )
  }

  return (
    <div className="relative rounded-2xl bg-gray-900 px-6 sm:px-10 py-10 sm:py-12 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[60%] bg-[#3DDB84]/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(61,219,132,0.08),transparent_60%)]" />
      </div>

      <div className="relative max-w-2xl">
        <p className="text-[12px] font-semibold uppercase tracking-wider text-[#3DDB84]">
          Work together
        </p>
        <h2 className="mt-3 text-[clamp(1.5rem,3vw,2rem)] font-medium leading-[1.15] tracking-[-0.03em] text-white">
          Want to build something like {projectTitle}?
        </h2>
        <p className="mt-4 text-[15px] sm:text-[16px] leading-[1.6] text-gray-400">
          Tell me about your product, timeline, and goals. I will respond with a
          clear recommendation on approach, scope, and how we can move from idea
          to launch.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <AccentButton text="Start a project" href="/contact" />
          <a
            href={contact.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 border border-gray-700 hover:border-[#3DDB84]/50 text-white text-[13px] sm:text-[14px] rounded-full pl-5 sm:pl-6 pr-2 py-2 transition-colors"
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
    </div>
  )
}
