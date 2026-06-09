export interface ArticleSection {
  heading?: string
  paragraphs: string[]
}

export interface Article {
  slug: string
  category: string
  title: string
  date: string
  readTime: string
  excerpt: string
  sections: ArticleSection[]
}
