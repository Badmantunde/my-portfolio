import { contact } from './contact'
import { socialLinks } from './social'

/** Override in production via VITE_SITE_URL (e.g. https://www.abiolababatunde.com) */
export const siteUrl = import.meta.env?.VITE_SITE_URL ?? 'https://www.abiolababatunde.com'

export const site = {
  name: 'Abiola Babatunde',
  title: 'Abiola Babatunde | UI/UX Designer & Webflow Developer',
  tagline: 'Product Engineer',
  locale: 'en_NG',
  language: 'en',
  location: 'Lagos, Nigeria',
  email: contact.email,
  ogImage: '/og-image.png',
  ogImageWidth: 1024,
  ogImageHeight: 584,
  ogImageAlt:
    'Abiola Babatunde portfolio: Product Engineer offering UI/UX design, software development, Webflow and WordPress website design in Lagos.',
  twitterHandle: '@badmantunde',
  sameAs: socialLinks.map((link) => link.href),
  keywords: [
    'product design',
    'product designer',
    'software developer',
    'website designer',
    'UI/UX designer',
    'UX designer',
    'Webflow developer',
    'WordPress developer',
    'product engineer',
    'Lagos web designer',
    'Nigeria UI designer',
    'Figma designer',
    'Next.js developer',
    'freelance product designer',
    'hire Webflow developer',
    'hire WordPress developer',
  ],
} as const

export const defaultDescription =
  'Hire Abiola Babatunde for product design, UI/UX design, software development, and website design. Expert Webflow & WordPress developer in Lagos, Nigeria. Available for freelance and full-time roles.'

/** Shared PostalAddress for Person and LocalBusiness JSON-LD */
export const postalAddress = {
  '@type': 'PostalAddress',
  addressLocality: 'Lagos',
  addressRegion: 'Lagos',
  addressCountry: 'NG',
} as const
