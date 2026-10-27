import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { articles } from '../data/articles'
import { BlueprintPageHeader } from '../blueprint/components/BlueprintPageHeader'
import { ContactCta } from '../blueprint/components/ContactCta'
import { SHEET, useBlueprintMotion } from '../blueprint/lib/motion'
import { ArticleList } from '../blueprint/writing/ArticleList'

export function WritingPage() {
  const ref = useRef<HTMLElement>(null)
  useBlueprintMotion(ref)

  return (
    <>
      <BlueprintPageHeader
        index="04"
        label="Writing"
        meta={`${articles.length} articles`}
        title="Writing on product design and building."
        intro={
          <p>
            Guides on product design, hiring Webflow, WordPress, and Shopify developers, UI/UX, frontend development, and
            building startups in Nigeria.
          </p>
        }
      />
      <section ref={ref} aria-label="Articles" className={`${SHEET} pb-28 md:pb-40`}>
        <div className="mb-14 grid gap-6 text-[15px] leading-relaxed text-bp-muted md:mb-20 lg:grid-cols-12">
          <p data-reveal className="lg:col-span-5">
            I publish practical guides for founders, marketers, and product teams who need help hiring designers and
            developers, choosing between Webflow and WordPress, shipping Shopify stores, MVPs, and building
            conversion-focused SaaS products. The articles combine hands-on experience from client work with clear
            recommendations you can act on immediately.
          </p>
          <p data-reveal className="lg:col-span-5 lg:col-start-7">
            Topics include product design for startups, UI/UX hiring in Nigeria, Flutter mobile app development,
            Figma-to-Webflow handoffs, freelance Shopify development, frontend engineering, and AI product development.
            For deeper project context, explore the{' '}
            <Link to="/work" className="text-bp-cyan underline-offset-4 hover:underline">
              case studies
            </Link>{' '}
            or{' '}
            <Link to="/process" className="text-bp-cyan underline-offset-4 hover:underline">
              how I work
            </Link>
            .
          </p>
        </div>
        <ArticleList articles={articles} />
      </section>
      <ContactCta />
    </>
  )
}
