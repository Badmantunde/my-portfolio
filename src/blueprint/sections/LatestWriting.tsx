import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { articles } from '../../data/articles'
import { BlueprintSectionLabel } from '../components/BlueprintSectionLabel'
import { SHEET, useBlueprintMotion } from '../lib/motion'
import { ArticleList } from '../writing/ArticleList'

const HOME_ARTICLES = 4

export function LatestWriting({ index = '05' }: { index?: string }) {
  const ref = useRef<HTMLElement>(null)
  useBlueprintMotion(ref)

  return (
    <section ref={ref} aria-labelledby="bp-writing-title" className="relative border-t border-bp-line bg-bp-deep/25 py-28 md:py-40">
      <div className={SHEET}>
        <BlueprintSectionLabel index={index} title="Writing" meta={`${articles.length} articles`} />
        <div className="mt-12 flex flex-col gap-6 md:mt-16 md:flex-row md:items-end md:justify-between">
          <h2 id="bp-writing-title" data-reveal className="bp-heading text-5xl text-bp-text sm:text-6xl lg:text-[80px]">
            Notes from the drawing board.
          </h2>
          <Link to="/writing" className="bp-label group inline-flex shrink-0 items-center gap-2 text-bp-text transition-colors hover:text-bp-cyan">
            All articles <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
        <ArticleList articles={articles.slice(0, HOME_ARTICLES)} headingLevel="h3" className="mt-14 md:mt-20" />
      </div>
    </section>
  )
}
