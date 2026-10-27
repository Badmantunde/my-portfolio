import { contact } from './contact'
import { socialLinks } from './social'

/** Override in production via VITE_SITE_URL (e.g. https://www.abiolababatunde.com) */
export const siteUrl = import.meta.env?.VITE_SITE_URL ?? 'https://www.abiolababatunde.com'

export const site = {
  name: 'Abiola Babatunde',
  title: 'Abiola Babatunde | Product Designer Who Builds | Lagos',
  tagline: 'Product Designer',
  locale: 'en_NG',
  language: 'en',
  location: 'Lagos, Nigeria',
  email: contact.email,
  headshot: '/images/abiola-headshot.png',
  ogImage: '/og-image.jpg',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt:
    'Abiola Babatunde drawn as a blueprint: product designer, Webflow developer and mobile app developer.',
  twitterHandle: '@badmantunde',
  sameAs: socialLinks.map((link) => link.href),
  keywords: [
    'product designer',
    'freelance product designer',
    'product designer who codes',
    'UI/UX designer',
    'Figma to Webflow',
    'Webflow developer',
    'Shopify store design',
    'freelance Shopify developer',
    'Flutter app design',
    'Next.js developer',
    'product designer Lagos',
  ],
} as const

export const defaultDescription =
  'Freelance product designer in Lagos who designs in Figma and builds in Webflow, Shopify, Next.js and Flutter. Case studies: ValGo, Shight Running Club, JWYN and Aṣá Ọ̀rọ̀.'

/** Shared PostalAddress for Person and LocalBusiness JSON-LD */
export const postalAddress = {
  '@type': 'PostalAddress',
  addressLocality: 'Lagos',
  addressRegion: 'Lagos',
  addressCountry: 'NG',
} as const
