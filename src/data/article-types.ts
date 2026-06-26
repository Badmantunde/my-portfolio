export interface ArticleSection {
  heading?: string
  paragraphs: string[]
  listItems?: string[]
}

export interface ArticleCtaLink {
  text: string
  href: string
}

export interface ArticleCta {
  heading: string
  paragraphs: string[]
  listSections?: { heading: string; items: string[] }[]
  links: ArticleCtaLink[]
}

export interface Article {
  slug: string
  category: string
  title: string
  date: string
  readTime: string
  excerpt: string
  sections: ArticleSection[]
  cta?: ArticleCta
}
