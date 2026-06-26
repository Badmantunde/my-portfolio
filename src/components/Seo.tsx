import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { absoluteAsset, absoluteUrl, buildJsonLd, getSeoForPath } from '../lib/seo'
import { site } from '../data/site'

const JSON_LD_ID = 'portfolio-json-ld'

function upsertMeta(
  key: string,
  content: string,
  attribute: 'name' | 'property' = 'name'
) {
  let el = document.querySelector(`meta[${attribute}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attribute, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export function Seo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const seo = getSeoForPath(pathname)
    const url = absoluteUrl(seo.path)
    const image = absoluteAsset(seo.image ?? site.ogImage)
    const imageAlt = seo.imageAlt ?? site.ogImageAlt
    const imageWidth = seo.imageWidth ?? site.ogImageWidth
    const imageHeight = seo.imageHeight ?? site.ogImageHeight
    const robots = seo.noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'

    document.title = seo.title
    document.documentElement.lang = site.language

    upsertMeta('description', seo.description)
    upsertMeta('keywords', (seo.keywords ?? site.keywords).join(', '))
    upsertMeta('author', site.name)
    upsertMeta('robots', robots)
    upsertMeta('googlebot', robots)
    upsertMeta('theme-color', '#EDF0ED')
    upsertMeta('geo.region', 'NG-LA')
    upsertMeta('geo.placename', 'Lagos')

    upsertLink('canonical', url)

    upsertMeta('og:type', seo.type === 'article' ? 'article' : 'website', 'property')
    upsertMeta('og:site_name', site.name, 'property')
    upsertMeta('og:locale', site.locale, 'property')
    upsertMeta('og:title', seo.title, 'property')
    upsertMeta('og:description', seo.description, 'property')
    upsertMeta('og:url', url, 'property')
    if (seo.type === 'article') {
      upsertMeta('og:article:author', site.name, 'property')
    }
    upsertMeta('og:image', image, 'property')
    upsertMeta('og:image:secure_url', image, 'property')
    upsertMeta('og:image:width', String(imageWidth), 'property')
    upsertMeta('og:image:height', String(imageHeight), 'property')
    upsertMeta('og:image:alt', imageAlt, 'property')

    upsertMeta('twitter:card', 'summary_large_image', 'name')
    upsertMeta('twitter:title', seo.title, 'name')
    upsertMeta('twitter:description', seo.description, 'name')
    upsertMeta('twitter:image', image, 'name')
    upsertMeta('twitter:image:alt', imageAlt, 'name')
    upsertMeta('twitter:creator', site.twitterHandle, 'name')

    let jsonLd = document.getElementById(JSON_LD_ID) as HTMLScriptElement | null
    if (!jsonLd) {
      jsonLd = document.createElement('script')
      jsonLd.id = JSON_LD_ID
      jsonLd.type = 'application/ld+json'
      document.head.appendChild(jsonLd)
    }
    jsonLd.textContent = JSON.stringify(buildJsonLd(seo))
  }, [pathname])

  return null
}
