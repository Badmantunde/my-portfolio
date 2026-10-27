import { useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { articles, getArticle } from '../data/articles'
import { getWorkProject } from '../data/work'
import { BlueprintGrid } from '../blueprint/components/BlueprintGrid'
import { BlueprintSectionLabel } from '../blueprint/components/BlueprintSectionLabel'
import { ContactCta } from '../blueprint/components/ContactCta'
import { SHEET, useBlueprintMotion } from '../blueprint/lib/motion'
import { ArticleList } from '../blueprint/writing/ArticleList'
import { NotFoundPage } from './NotFoundPage'

const MORE_ARTICLES = 3

export function ArticlePage() {
  const { slug = '' } = useParams()
  const article = getArticle(slug)
  const bodyRef = useRef<HTMLDivElement>(null)
  useBlueprintMotion(bodyRef)

  if (!article) return <NotFoundPage />

  const related = article.relatedProjectSlug ? getWorkProject(article.relatedProjectSlug) : undefined
  const position = articles.indexOf(article)
  const more = [...articles.slice(position + 1), ...articles.slice(0, position)].slice(0, MORE_ARTICLES)
  let headingNumber = 0

  return (
    <>
      <header className="relative overflow-hidden pb-14 pt-32 md:pb-20 md:pt-44">
        <BlueprintGrid className="opacity-70" />
        <div className={SHEET}>
          <BlueprintSectionLabel index={`W.${String(position + 1).padStart(2, '0')}`} title={article.category} meta={`${article.date} · ${article.readTime} read`} />
          <div className="mt-12 max-w-4xl md:mt-16">
            <h1 className="bp-heading text-4xl text-bp-text sm:text-5xl lg:text-[64px]">{article.title}</h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-bp-muted">{article.excerpt}</p>
            <p className="bp-label bp-num mt-6 sm:hidden">
              {article.date} · {article.readTime} read
            </p>
            <Link to="/writing" className="bp-label mt-10 inline-flex items-center gap-2 text-bp-text/80 transition-colors hover:text-bp-cyan">
              <span aria-hidden="true">←</span> All articles
            </Link>
          </div>
        </div>
      </header>

      <article className={`${SHEET} pb-24 md:pb-32`}>
        <div ref={bodyRef} className="grid lg:grid-cols-12">
          <div className="border-t border-bp-cyan/30 pt-12 lg:col-span-8 lg:col-start-3">
            {article.sections.map((section, i) => (
              <section key={section.heading ?? section.paragraphs[0] ?? i} className="relative mb-12">
                {section.heading && (
                  <h2 data-reveal className="mb-5 text-2xl font-normal tracking-tight text-bp-text md:text-[28px]">
                    {/* Headings that carry their own number (e.g. "2. Name") skip the section marker. */}
                    {!/^\d+\./.test(section.heading) && (
                      <span aria-hidden="true" className="bp-label bp-num mr-4 align-middle text-bp-cyan">
                        §{++headingNumber}
                      </span>
                    )}
                    {section.heading}
                  </h2>
                )}
                <div className="space-y-5">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-[17px] leading-[1.8] text-bp-text/80">
                      {paragraph}
                    </p>
                  ))}
                  {section.listItems && (
                    <ul className="border-t border-bp-line">
                      {section.listItems.map((item) => (
                        <li key={item} className="flex gap-4 border-b border-bp-line py-3 text-[16px] leading-relaxed text-bp-text/85">
                          <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-bp-cyan" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.image && (
                    <figure className="pt-3">
                      <div className="border border-bp-line bg-bp-deep p-2">
                        <img
                          src={section.image.src}
                          alt={section.image.alt}
                          width={section.image.width}
                          height={section.image.height}
                          loading="lazy"
                          decoding="async"
                          className="h-auto w-full"
                        />
                      </div>
                      {section.image.caption && (
                        <figcaption className="bp-label mt-3 text-[9.5px]">{section.image.caption}</figcaption>
                      )}
                    </figure>
                  )}
                </div>
              </section>
            ))}

            {article.cta && (
              <aside className="relative mt-16 border border-bp-cyan/40 bg-bp-deep/40 px-6 py-10 md:px-10">
                <span aria-hidden="true" className="absolute -left-px -top-px h-2.5 w-2.5 border-l border-t border-bp-cyan" />
                <span aria-hidden="true" className="absolute -bottom-px -right-px h-2.5 w-2.5 border-b border-r border-bp-cyan" />
                <h2 className="text-2xl font-normal tracking-tight text-bp-text">{article.cta.heading}</h2>
                <div className="mt-5 space-y-4">
                  {article.cta.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-[16px] leading-relaxed text-bp-muted">
                      {paragraph}
                    </p>
                  ))}
                </div>
                {article.cta.listSections?.map((list) => (
                  <div key={list.heading} className="mt-6">
                    <h3 className="bp-label text-bp-cyan">{list.heading}</h3>
                    <ul className="mt-3 space-y-2">
                      {list.items.map((item) => (
                        <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-bp-text/85">
                          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-bp-cyan" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                  {article.cta.links.map((link) => (
                    <Link key={link.text} to={link.href} className="bp-label group inline-flex items-center gap-2 text-bp-cyan">
                      {link.text} <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                  ))}
                </div>
              </aside>
            )}

            {related && (
              <Link
                to={`/work/${related.slug}`}
                className="group mt-10 flex items-center justify-between gap-6 border-y border-bp-line py-6 transition-colors hover:text-bp-cyan"
              >
                <span>
                  <span className="bp-label block text-bp-cyan">Related case study</span>
                  <span className="mt-2 block text-lg text-bp-text transition-colors group-hover:text-bp-cyan">
                    {related.title}: {related.category}
                  </span>
                </span>
                <span aria-hidden="true" className="text-bp-cyan transition-transform group-hover:translate-x-1">→</span>
              </Link>
            )}
          </div>
        </div>
      </article>

      <section aria-labelledby="bp-more-title" className="border-t border-bp-line bg-bp-deep/25 py-24 md:py-32">
        <div className={SHEET}>
          <BlueprintSectionLabel index="W" title="Keep reading" />
          <h2 id="bp-more-title" className="bp-heading mt-10 text-4xl text-bp-text md:text-5xl">
            More from the drawing board.
          </h2>
          <ArticleList articles={more} headingLevel="h3" className="mt-12" />
        </div>
      </section>

      <ContactCta />
    </>
  )
}
