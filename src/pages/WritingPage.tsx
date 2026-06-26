import { Link } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { WritingSection } from '../components/WritingSection'
import { SECTION_PY } from '../lib/section'

export function WritingPage() {
  return (
    <>
      <PageHeader
        label="Writing & insights"
        title="Thinking in public"
        description="Guides on product design, hiring Webflow and WordPress developers, UI/UX, frontend development, and building startups in Nigeria."
      />
      <section className={`bg-white border-b border-gray-100 ${SECTION_PY}`}>
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl space-y-4 text-[15px] sm:text-[16px] leading-[1.75] text-gray-600">
            <p>
              I publish practical guides for founders, marketers, and product teams who need help
              hiring designers and developers, choosing between Webflow and WordPress, shipping
              MVPs, and building conversion-focused SaaS products. The articles below combine
              hands-on experience from client work with clear recommendations you can act on
              immediately.
            </p>
            <p>
              Topics include product design for startups, UI/UX hiring in Nigeria, Flutter mobile
              app development, Figma-to-Webflow handoffs, frontend engineering, and AI product
              development. For deeper project context, explore the{' '}
              <Link to="/work" className="text-[#28B866] font-medium hover:underline">
                case study portfolio
              </Link>{' '}
              or{' '}
              <Link to="/process" className="text-[#28B866] font-medium hover:underline">
                how I work
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
      <WritingSection hideHeader />
    </>
  )
}
