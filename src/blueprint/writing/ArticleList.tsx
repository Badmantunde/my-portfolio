import { Link } from 'react-router-dom'
import type { Article } from '../../data/articles'
import { cn } from '../lib/motion'

interface ArticleListProps {
  articles: Article[]
  headingLevel?: 'h2' | 'h3'
  className?: string
}

/** Articles as rows in a drawing register: category, title, excerpt and reading time. */
export function ArticleList({ articles, headingLevel: Heading = 'h2', className }: ArticleListProps) {
  return (
    <ol className={cn('border-t border-bp-cyan/30', className)}>
      {articles.map((article, i) => (
        <li key={article.slug} data-reveal className="border-b border-bp-line">
          <Link
            to={`/writing/${article.slug}`}
            className="group grid gap-3 py-8 md:grid-cols-12 md:gap-10 md:py-10"
          >
            <span className="bp-label bp-num text-bp-cyan md:col-span-1">W.{String(i + 1).padStart(2, '0')}</span>
            <div className="md:col-span-7">
              <span className="bp-label text-[9.5px]">{article.category}</span>
              <Heading className="mt-2 text-2xl font-normal leading-snug tracking-tight text-bp-text transition-colors group-hover:text-bp-cyan md:text-[28px]">
                {article.title}
              </Heading>
              <p className="mt-3 line-clamp-2 max-w-2xl text-[15px] leading-relaxed text-bp-muted">{article.excerpt}</p>
            </div>
            <div className="flex items-start justify-between gap-4 md:col-span-3 md:col-start-10 md:flex-col md:items-end">
              <span className="bp-label bp-num text-[9.5px]">
                {article.date} · {article.readTime}
              </span>
              <span aria-hidden="true" className="bp-label text-bp-cyan transition-transform group-hover:translate-x-1">
                Read →
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ol>
  )
}
