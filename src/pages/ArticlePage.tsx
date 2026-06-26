import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { getArticle } from '../data/articles'
import { AccentButton } from '../components/AccentButton'
import { AnimateIn } from '../components/AnimateIn'
import { SECTION_PY } from '../lib/section'

export function ArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const article = slug ? getArticle(slug) : undefined

  if (!article) {
    return (
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-32 text-center">
        <h1 className="text-2xl font-medium text-gray-900">Article not found</h1>
        <Link to="/writing" className="mt-4 inline-block text-[#32C876] text-sm font-medium">
          Back to writing
        </Link>
      </div>
    )
  }

  return (
    <>
      <div className="bg-[#EDF0ED] pt-28 sm:pt-32 pb-8 sm:pb-10">
        <div className="max-w-[800px] mx-auto px-5 sm:px-8 lg:px-12">
          <AnimateIn immediate variant="fade-in" delay={60}>
            <Link
              to="/writing"
              className="inline-flex items-center gap-2 text-[13px] text-gray-600 hover:text-[#32C876] transition-colors mb-8"
            >
              <ArrowLeft size={14} />
              All articles
            </Link>
          </AnimateIn>

          <AnimateIn immediate variant="fade-up" delay={140}>
            <span className="inline-block text-[11px] font-medium text-[#28B866] bg-white border border-gray-200 rounded-full px-3 py-1 mb-4">
              {article.category}
            </span>

            <h1 className="text-[clamp(2rem,5vw,3rem)] font-medium leading-[1.1] tracking-[-0.03em] text-gray-900">
              {article.title}
            </h1>

            <p className="mt-4 text-[16px] sm:text-[17px] leading-[1.6] text-gray-600">
              {article.excerpt}
            </p>

            <p className="mt-5 text-[13px] text-gray-500">
              {article.date} · {article.readTime} read
            </p>
          </AnimateIn>
        </div>
      </div>

      <article className={`bg-white ${SECTION_PY}`}>
        <div className="max-w-[800px] mx-auto px-5 sm:px-8 lg:px-12 space-y-10">
          {article.sections.map((section, i) => (
            <AnimateIn key={section.heading ?? section.paragraphs[0]} variant="fade-up" delay={i * 60} as="section">
              {section.heading && (
                <h2 className="text-[20px] sm:text-[22px] font-medium text-gray-900 mb-4 tracking-[-0.02em]">
                  {section.heading}
                </h2>
              )}
              <div className="space-y-4">
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-[15px] sm:text-[16px] leading-[1.75] text-gray-700"
                  >
                    {paragraph}
                  </p>
                ))}
                {section.listItems && (
                  <ul className="space-y-2 pl-1">
                    {section.listItems.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-[15px] sm:text-[16px] leading-[1.75] text-gray-700"
                      >
                        <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#3DDB84] mt-2.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {section.image && (
                  <figure className="pt-2">
                    <img
                      src={section.image.src}
                      alt={section.image.alt}
                      className="w-full rounded-2xl border border-gray-200"
                      loading="lazy"
                    />
                    {section.image.caption && (
                      <figcaption className="mt-3 text-[13px] text-gray-500 text-center">
                        {section.image.caption}
                      </figcaption>
                    )}
                  </figure>
                )}
              </div>
            </AnimateIn>
          ))}

          {article.cta && (
            <AnimateIn variant="fade-up" as="section" className="pt-6">
              <div className="rounded-2xl bg-[#EDF0ED] border border-gray-200 px-6 sm:px-8 py-8 sm:py-10">
                <h2 className="text-[20px] sm:text-[22px] font-medium text-gray-900 mb-4 tracking-[-0.02em]">
                  {article.cta.heading}
                </h2>
                <div className="space-y-4">
                  {article.cta.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-[15px] sm:text-[16px] leading-[1.75] text-gray-700"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
                {article.cta.listSections?.map((listSection) => (
                  <div key={listSection.heading} className="mt-6">
                    <h3 className="text-[15px] font-semibold text-gray-900 mb-3">
                      {listSection.heading}
                    </h3>
                    <ul className="space-y-2">
                      {listSection.items.map((item) => (
                        <li
                          key={item}
                          className="flex gap-3 text-[15px] leading-[1.65] text-gray-700"
                        >
                          <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#3DDB84] mt-2" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <p className="mt-6 text-[15px] font-medium text-gray-900">
                  Ready to discuss your project?
                </p>
                <div className="mt-4 flex flex-col sm:flex-row flex-wrap gap-3">
                  {article.cta.links.map((link) => (
                    <AccentButton key={link.text} text={link.text} href={link.href} />
                  ))}
                </div>
              </div>
            </AnimateIn>
          )}
        </div>
      </article>
    </>
  )
}
