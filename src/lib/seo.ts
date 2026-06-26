import { articles, getArticle, getArticleOgImage } from '../data/articles'
import { getProject, projects } from '../data/projects'
import { defaultDescription, site, siteUrl } from '../data/site'

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
    imageWidth: image?.imageWidth ?? site.ogImageWidth,
    imageHeight: image?.imageHeight ?? site.ogImageHeight,
  }
}

const staticPages: Record<string, PageSeo> = {
  '/': pageSeo(
    'Abiola Babatunde | UI/UX Designer, Software Developer & Webflow Expert',
    defaultDescription,
    '/',
    [
      'product design',
      'software developer',
      'website designer',
      'UI/UX designer',
      'Webflow developer',
      'WordPress developer',
      'product engineer Lagos',
      'hire UI designer Nigeria',
    ]
  ),
  '/work': pageSeo(
    'Product Design Portfolio & Case Studies | Abiola Babatunde',
    'Selected UI/UX design and software development projects: fintech, AgriTech, community platforms, and Webflow websites. Product designer and website designer based in Lagos.',
    '/work',
    [
      'product design portfolio',
      'UI/UX case studies',
      'website design portfolio',
      'Webflow projects',
      'software developer portfolio',
    ]
  ),
  '/about': pageSeo(
    'About Abiola Babatunde | Product Designer & Software Developer',
    'From CorelDRAW flyers in Lagos to product engineering worldwide. Seasoned UI/UX designer, software developer, and Lions Club member building digital products that ship.',
    '/about',
    [
      'about product designer',
      'Lagos software developer',
      'UI/UX designer story',
      'product engineer Nigeria',
    ]
  ),
  '/process': pageSeo(
    'Product Design & Development Process | Abiola Babatunde',
    'How I work: discovery, product strategy, UI/UX design, design systems, Next.js engineering, Webflow builds, and AI-native delivery from idea to launch.',
    '/process',
    [
      'product design process',
      'UI/UX design workflow',
      'software development process',
      'Webflow development process',
    ]
  ),
  '/writing': pageSeo(
    'Product Design & Engineering Insights | Abiola Babatunde',
    'Guides on hiring Webflow and WordPress developers, product design, UI/UX, frontend development, and AI product development for startups in Nigeria and worldwide.',
    '/writing',
    [
      'hire Webflow developer',
      'UI/UX designer vs software developer',
      'WordPress vs Webflow',
      'product design blog',
      'hire WordPress developer',
    ]
  ),
  '/contact': pageSeo(
    'Hire a UI/UX Designer & Webflow Developer | Contact Abiola Babatunde',
    'Book a discovery call or message on WhatsApp. Available for product design, software development, website design, Webflow, and WordPress projects in Lagos and remotely.',
    '/contact',
    [
      'hire UI/UX designer',
      'hire Webflow developer',
      'hire WordPress developer',
      'hire software developer Lagos',
      'freelance website designer',
    ]
  ),
}

export function getSeoForPath(pathname: string): PageSeo {
  if (staticPages[pathname]) return staticPages[pathname]

  const workMatch = pathname.match(/^\/work\/([^/]+)$/)
  if (workMatch) {
    const project = getProject(workMatch[1])
    if (project) {
      return pageSeo(
        `${project.title} Case Study | UI/UX & Product Design by Abiola Babatunde`,
        `${project.description} ${project.role} case study covering ${project.tags.join(', ')}. Product design and website design by Abiola Babatunde.`,
        pathname,
        [
          ...project.tags.map((t) => t.toLowerCase()),
          'product design case study',
          'UI/UX case study',
          'website designer',
        ],
        'website',
        {
          image: project.image,
          imageAlt: `${project.title} case study by Abiola Babatunde`,
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
        imageWidth: cover?.width ?? site.ogImageWidth,
        imageHeight: cover?.height ?? site.ogImageHeight,
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

  return {
    ...pageSeo(site.title, defaultDescription, pathname, baseKeywords),
    noIndex: true,
  }
}

export function absoluteUrl(path: string) {
  return `${siteUrl}${path === '/' ? '' : path}`
}

export function absoluteAsset(path: string) {
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`
}

export function buildJsonLd(seo: PageSeo) {
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: site.name,
      description: defaultDescription,
      inLanguage: site.language,
      publisher: { '@id': `${siteUrl}/#person` },
    },
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: site.name,
      url: siteUrl,
      image: absoluteAsset(site.ogImage),
      email: site.email,
      jobTitle: [
        'Product Engineer',
        'UI/UX Designer',
        'Software Developer',
        'Website Designer',
        'Webflow Developer',
        'WordPress Developer',
      ],
      knowsAbout: [
        'Product Design',
        'UI/UX Design',
        'Software Development',
        'Website Design',
        'Webflow Development',
        'WordPress Development',
        'Figma',
        'Next.js',
        'React',
        'Design Systems',
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Lagos',
        addressCountry: 'NG',
      },
      sameAs: site.sameAs,
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${siteUrl}/#service`,
      name: `${site.name}, Product Design and Development`,
      url: siteUrl,
      image: absoluteAsset(site.ogImage),
      description: defaultDescription,
      areaServed: ['Lagos', 'Nigeria', 'Worldwide'],
      serviceType: [
        'Product Design',
        'UI/UX Design',
        'Software Development',
        'Website Design',
        'Webflow Development',
        'WordPress Development',
        'Mobile App Design',
        'Design Systems',
      ],
      provider: { '@id': `${siteUrl}/#person` },
    },
    {
      '@type': 'WebPage',
      '@id': `${absoluteUrl(seo.path)}#webpage`,
      url: absoluteUrl(seo.path),
      name: seo.title,
      description: seo.description,
      isPartOf: { '@id': `${siteUrl}/#website` },
      about: { '@id': `${siteUrl}/#person` },
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
        datePublished: article.date,
        author: { '@id': `${siteUrl}/#person` },
        publisher: { '@id': `${siteUrl}/#person` },
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
        creator: { '@id': `${siteUrl}/#person` },
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
  const paths = Object.keys(staticPages)
  for (const project of projects) paths.push(`/work/${project.slug}`)
  for (const article of articles) paths.push(`/writing/${article.slug}`)
  return paths
}
