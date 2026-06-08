import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { SectionHeader } from './SectionHeader'
import { AnimateIn } from './AnimateIn'
import { SECTION_PY } from '../lib/section'
import { articles } from '../data/articles'

interface WritingSectionProps {
  hideHeader?: boolean
}

export function WritingSection({ hideHeader = false }: WritingSectionProps) {
  return (
    <section className={`bg-[#F5F5F5] ${SECTION_PY}`}>
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {!hideHeader && (
          <SectionHeader
            label="Writing & insights"
            heading="Thinking in public"
            headingClassName="text-[clamp(1.75rem,7vw,4.2rem)] sm:text-[clamp(2.5rem,5vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.03em]"
            borderClassName="border-gray-300"
          />
        )}

        <AnimateIn
          className={`max-w-2xl text-[15px] sm:text-[16px] leading-[1.6] text-gray-600 mb-10 sm:mb-14 ${
            hideHeader ? '' : 'mt-6 sm:mt-8'
          }`}
        >
          Essays on product strategy, engineering craft, design systems, and
          AI-native development.
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {articles.map((article, i) => (
            <AnimateIn key={article.slug} variant="fade-up" delay={i * 100}>
            <Link
              to={`/writing/${article.slug}`}
              className="group block bg-white rounded-2xl p-5 sm:p-6 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-300 hover-lift"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] sm:text-[12px] font-medium text-[#28B866]">
                  {article.category}
                </span>
                <span className="text-[11px] text-gray-400">
                  {article.date} · {article.readTime}
                </span>
              </div>
              <h3 className="text-[15px] sm:text-[17px] font-medium text-gray-900 leading-snug group-hover:text-[#28B876] transition-colors duration-300">
                {article.title}
              </h3>
              <p className="mt-3 text-[13px] sm:text-[14px] text-gray-600 leading-relaxed line-clamp-2">
                {article.excerpt}
              </p>
              <div className="mt-4 flex items-center gap-1.5 text-[12px] sm:text-[13px] font-medium text-gray-500 group-hover:text-gray-900 transition-colors">
                Read article
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </div>
            </Link>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
