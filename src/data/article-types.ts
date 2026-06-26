export interface ArticleImage {
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
}

export interface ArticleSection {
  heading?: string
  paragraphs: string[]
  listItems?: string[]
  image?: ArticleImage
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
  seoTitle?: string
  keywords?: string[]
  ogImage?: ArticleImage
  relatedProjectSlug?: string
  sections: ArticleSection[]
  cta?: ArticleCta
}
