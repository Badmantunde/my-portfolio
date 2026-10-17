import { articles, getArticle, getArticleOgImage } from '../data/articles'
import { getProject, projects } from '../data/projects'
import { defaultDescription, postalAddress, site, siteUrl } from '../data/site'

export interface PageSeo {
  title: string
  description: string
  path: string
  keywords?: string[]
  type?: 'website' | 'article'
  noIndex?: boolean
  image?: string
  imageAlt?: string
  imageWidth?: number
  imageHeight?: number
}

const baseKeywords = [...site.keywords]

function pageSeo(
  title: string,
  description: string,
  path: string,
  keywords: string[] = baseKeywords,
  type: 'website' | 'article' = 'website',
  image?: Pick<PageSeo, 'image' | 'imageAlt' | 'imageWidth' | 'imageHeight'>
): PageSeo {
  return {
    title,
    description,
    path,
    keywords,
    type,
    image: image?.image ?? site.ogImage,
    imageAlt: image?.imageAlt ?? site.ogImageAlt,
    // A custom image without known dimensions must not inherit the default OG image's size.
    imageWidth: image?.image ? image.imageWidth : site.ogImageWidth,
    imageHeight: image?.image ? image.imageHeight : site.ogImageHeight,
  }
}

const staticPages: Record<string, PageSeo> = {
  '/': pageSeo(site.title, defaultDescription, '/', [
    'Abiola Babatunde',
    'product designer',
    'freelance product designer',
    'product designer who codes',
    'Figma to Webflow',
    'freelance Shopify developer',
    'product designer Lagos',
  ]),
  '/work': pageSeo(
    'Product Design Case Studies | Abiola Babatunde',
    'Product design case studies with live builds: a Next.js membership platform, a Figma to Webflow fintech site, a Shopify store, and a Yoruba word game in Flutter.',
    '/work',
    [
      'product design case studies',
      'Figma to Webflow case study',
      'Shopify store case study',
      'Flutter app case study',
    ]
  ),
  '/about': pageSeo(
    'About Abiola Babatunde | Product Designer in Lagos',
    'From CorelDRAW flyers in Lagos to designing and building digital products. My background, how I work, and the kind of projects I take on.',
    '/about',
    ['Abiola Babatunde', 'product designer Lagos', 'product designer who codes']
  ),
  '/process': pageSeo(
    'How I Design and Build Products | Abiola Babatunde',
    'My product design process from discovery and Figma to shipped code in Webflow, Shopify, Next.js and Flutter.',
    '/process',
    ['product design process', 'design to development workflow']
  ),
  '/writing': pageSeo(
    'Writing on Product Design and Building | Abiola Babatunde',
    'Notes on product design decisions, design-to-code trade-offs, and hiring Webflow and Shopify developers, drawn from client work.',
    '/writing',
    ['product design blog', 'hire Webflow developer', 'hire Shopify developer']
  ),
  '/contact': pageSeo(
    'Start a Project | Contact Abiola Babatunde, Product Designer',
    'Need a product designer who can also build it? Tell me about your product, website or Shopify store. Email, WhatsApp, or the project form.',
    '/contact',
    ['hire product designer', 'freelance product designer', 'hire Webflow developer', 'hire Shopify developer']
  ),
  '/404': {
    ...pageSeo('Page not found | Abiola Babatunde', defaultDescription, '/404', baseKeywords),
    noIndex: true,
  },
}

export function getSeoForPath(pathname: string): PageSeo {
  if (staticPages[pathname]) return staticPages[pathname]

  const workMatch = pathname.match(/^\/work\/([^/]+)$/)
  if (workMatch) {
    const project = getProject(workMatch[1])
    if (project) {
      return pageSeo(
        project.seoTitle ?? `${project.title}: ${project.subtitle} | Abiola Babatunde`,
        project.seoIntro,
        pathname,
        [...project.tags.map((t) => t.toLowerCase()), 'product design case study'],
        'website',
        {
          image: project.ogImage ?? project.image,
          imageAlt: `${project.title}: ${project.subtitle}, a case study by Abiola Babatunde`,
          imageWidth: project.imageWidth,
          imageHeight: project.imageHeight,
        }
      )
    }

    return {
      ...pageSeo(
        'Case study not found | Abiola Babatunde',
        defaultDescription,
        pathname,
        baseKeywords
      ),
      noIndex: true,
    }
  }

  const articleMatch = pathname.match(/^\/writing\/([^/]+)$/)
  if (articleMatch) {
    const article = getArticle(articleMatch[1])
    if (article) {
      const cover = getArticleOgImage(article)
      return {
        title: article.seoTitle ?? `${article.title} | Abiola Babatunde`,
        description: article.excerpt,
        path: pathname,
        keywords: article.keywords ?? [
          article.category.toLowerCase(),
          'product design',
          'software development',
        ],
        type: 'article',
        image: cover?.src ?? site.ogImage,
        imageAlt: cover?.alt ?? site.ogImageAlt,
        imageWidth: cover ? cover.width : site.ogImageWidth,
        imageHeight: cover ? cover.height : site.ogImageHeight,
      }
    }

    return {
      ...pageSeo(
        'Article not found | Abiola Babatunde',
        defaultDescription,
        pathname,
        baseKeywords
      ),
      noIndex: true,
    }
  }

  return { ...staticPages['/404'], path: pathname }
}

export function absoluteUrl(path: string) {
  if (path === '/') return `${siteUrl}/`
  return `${siteUrl}${path}`
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function buildSeoHeadHtml(seo: PageSeo) {
  const url = absoluteUrl(seo.path)
  const image = absoluteAsset(seo.image ?? site.ogImage)
  const imageAlt = seo.imageAlt ?? site.ogImageAlt
  const keywords = (seo.keywords ?? site.keywords).join(', ')
  const robots = seo.noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'
  const ogType = seo.type === 'article' ? 'article' : 'website'
  const jsonLd = JSON.stringify(buildJsonLd(seo)).replace(/</g, '\\u003c')

  return `    <title>${escapeHtml(seo.title)}</title>
    <meta name="description" content="${escapeHtml(seo.description)}" />
    <meta name="keywords" content="${escapeHtml(keywords)}" />
    <meta name="author" content="${escapeHtml(site.name)}" />
    <meta name="robots" content="${robots}" />
    <meta name="googlebot" content="${robots}" />
    <meta name="geo.region" content="NG-LA" />
    <meta name="geo.placename" content="Lagos" />

    <link rel="canonical" href="${url}" />
    <link rel="alternate" type="text/markdown" href="${absoluteUrl('/llms.txt')}" title="LLM site summary" />

    <meta property="og:type" content="${ogType}" />
    <meta property="og:site_name" content="${escapeHtml(site.name)}" />
    <meta property="og:locale" content="${site.locale}" />
    <meta property="og:title" content="${escapeHtml(seo.title)}" />
    <meta property="og:description" content="${escapeHtml(seo.description)}" />
    <meta property="og:url" content="${url}" />
    ${
      seo.type === 'article'
        ? `<meta property="og:article:author" content="${escapeHtml(site.name)}" />\n    `
        : ''
    }<meta property="og:image" content="${image}" />
    <meta property="og:image:secure_url" content="${image}" />
    ${seo.imageWidth ? `<meta property="og:image:width" content="${seo.imageWidth}" />\n    ` : ''}${
      seo.imageHeight ? `<meta property="og:image:height" content="${seo.imageHeight}" />\n    ` : ''
    }    <meta property="og:image:alt" content="${escapeHtml(imageAlt)}" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:creator" content="${site.twitterHandle}" />
    <meta name="twitter:title" content="${escapeHtml(seo.title)}" />
    <meta name="twitter:description" content="${escapeHtml(seo.description)}" />
    <meta name="twitter:image" content="${image}" />
    <meta name="twitter:image:alt" content="${escapeHtml(imageAlt)}" />

    <script type="application/ld+json">${jsonLd}</script>`
}

export function absoluteAsset(path: string) {
  if (/^https?:\/\//.test(path)) return path
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`
}

/** "Jun 2026" -> "2026-06" (ISO 8601 month precision, valid for schema.org dates) */
export function isoMonth(value: string): string | undefined {
  return parseContentDate(value)?.slice(0, 7)
}

export function buildJsonLd(seo: PageSeo) {
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'WebSite',
      '@id': `${absoluteUrl('/')}#website`,
      url: absoluteUrl('/'),
      name: site.name,
      description: defaultDescription,
      inLanguage: site.language,
      publisher: { '@id': `${absoluteUrl('/')}#person` },
    },
    {
      '@type': 'Person',
      '@id': `${absoluteUrl('/')}#person`,
      name: site.name,
      url: absoluteUrl('/'),
      image: absoluteAsset(site.headshot),
      email: site.email,
      jobTitle: 'Product Designer',
      description: defaultDescription,
      knowsAbout: [
        'Product Design',
        'UI/UX Design',
        'Figma',
        'Webflow',
        'Shopify',
        'Next.js',
        'Flutter',
        'Design Systems',
      ],
      address: { ...postalAddress },
      sameAs: site.sameAs,
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${absoluteUrl('/')}#service`,
      name: `${site.name}, Product Design and Build`,
      url: absoluteUrl('/'),
      image: absoluteAsset(site.ogImage),
      description: defaultDescription,
      address: { ...postalAddress },
      areaServed: ['Lagos', 'Nigeria', 'Worldwide'],
      founder: { '@id': `${absoluteUrl('/')}#person` },
    },
    {
      '@type': 'WebPage',
      '@id': `${absoluteUrl(seo.path)}#webpage`,
      url: absoluteUrl(seo.path),
      name: seo.title,
      description: seo.description,
      isPartOf: { '@id': `${absoluteUrl('/')}#website` },
      about: { '@id': `${absoluteUrl('/')}#person` },
      inLanguage: site.language,
      ...(seo.image && {
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: absoluteAsset(seo.image),
          ...(seo.imageWidth && { width: seo.imageWidth }),
          ...(seo.imageHeight && { height: seo.imageHeight }),
        },
      }),
    },
  ]

  if (seo.type === 'article') {
    const slug = seo.path.replace('/writing/', '')
    const article = getArticle(slug)
    if (article) {
      const cover = getArticleOgImage(article)
      graph.push({
        '@type': 'Article',
        headline: article.title,
        description: article.excerpt,
        datePublished: isoMonth(article.date),
        author: { '@id': `${absoluteUrl('/')}#person` },
        publisher: { '@id': `${absoluteUrl('/')}#person` },
        mainEntityOfPage: { '@id': `${absoluteUrl(seo.path)}#webpage` },
        articleSection: article.category,
        inLanguage: site.language,
        ...(cover && {
          image: {
            '@type': 'ImageObject',
            url: absoluteAsset(cover.src),
            ...(cover.width && { width: cover.width }),
            ...(cover.height && { height: cover.height }),
          },
        }),
      })
    }
  }

  const workSlug = seo.path.match(/^\/work\/([^/]+)$/)?.[1]
  if (workSlug) {
    const project = getProject(workSlug)
    if (project) {
      graph.push({
        '@type': 'CreativeWork',
        name: project.title,
        description: project.description,
        creator: { '@id': `${absoluteUrl('/')}#person` },
        dateCreated: project.year,
        genre: project.tags,
        image: project.image.startsWith('http') ? project.image : absoluteAsset(project.image),
      })
    }
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  }
}

export function allSitemapPaths(): string[] {
  const paths = Object.keys(staticPages).filter((path) => !staticPages[path].noIndex)
  for (const project of projects) paths.push(`/work/${project.slug}`)
  for (const article of articles) paths.push(`/writing/${article.slug}`)
  return paths
}

function parseContentDate(value: string): string | undefined {
  const isoMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (isoMatch) return isoMatch[0]

  const monthYearMatch = value.match(/^([A-Za-z]{3})\s+(\d{4})$/)
  if (monthYearMatch) {
    const months: Record<string, string> = {
      Jan: '01',
      Feb: '02',
      Mar: '03',
      Apr: '04',
      May: '05',
      Jun: '06',
      Jul: '07',
      Aug: '08',
      Sep: '09',
      Oct: '10',
      Nov: '11',
      Dec: '12',
    }
    const month = months[monthYearMatch[1]]
    if (month) return `${monthYearMatch[2]}-${month}-01`
  }

  const yearMatch = value.match(/^(\d{4})$/)
  if (yearMatch) return `${yearMatch[1]}-01-01`

  return undefined
}

export function lastmodForPath(path: string): string | undefined {
  const articleMatch = path.match(/^\/writing\/([^/]+)$/)
  if (articleMatch) {
    const article = getArticle(articleMatch[1])
    if (article) return parseContentDate(article.date)
  }

  // Other pages have no recorded modification date; omit lastmod rather than invent one.
  return undefined
}

function sitemapMeta(path: string): { changefreq: string; priority: string } {
  if (path === '/') return { changefreq: 'weekly', priority: '1.0' }
  if (path === '/work' || path === '/contact') return { changefreq: 'weekly', priority: '0.9' }
  if (
    path === '/about' ||
    path === '/process' ||
    path === '/writing' ||
    path === '/work/asa-oro' ||
    path === '/writing/asa-oro-yoruba-word-game-flutter-case-study' ||
    path === '/writing/hire-webflow-developer'
  ) {
    return { changefreq: 'monthly', priority: '0.8' }
  }
  if (path.startsWith('/work/')) return { changefreq: 'monthly', priority: '0.7' }
  if (
    path.includes('hire-') ||
    path.includes('product-designer') ||
    path.includes('ui-ux') ||
    path.includes('wordpress') ||
    path.includes('website-designer') ||
    path.includes('mvp-product')
  ) {
    return { changefreq: 'monthly', priority: '0.7' }
  }
  return { changefreq: 'monthly', priority: '0.6' }
}

export function generateSitemapXml(): string {
  const urls = allSitemapPaths()
    .map((path) => {
      const { changefreq, priority } = sitemapMeta(path)
      const loc = absoluteUrl(path)
      const lastmod = lastmodForPath(path)
      const lastmodTag = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''
      return `  <url>\n    <loc>${loc}</loc>${lastmodTag}\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}
