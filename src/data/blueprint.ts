import { contact } from './contact'
import { socialLinks } from './social'

/**
 * Content and media config for the blueprint design: hero film, disciplines, process, about, experiments
 * and contact. Projects live in work.ts.
 */

export type HeroSource =
  | { type: 'video'; src: string; portraitSrc?: string; fps: number }
  | { type: 'sequence'; frameCount: number; frameUrl: (index: number) => string }

export const heroMedia = {
  /** Switch to { type: 'sequence', ... } (see scripts/build-blueprint-frames.sh) if video seeking proves unreliable. */
  source: {
    type: 'video',
    /** 16:9, 1920 × 1080. Encoded with a keyframe every 6 frames so scrubbing lands quickly in both directions. */
    src: '/video/hero-landscape.mp4',
    /** 9:16, 720 × 1280, for portrait screens. */
    portraitSrc: '/video/hero-portrait.mp4',
    fps: 24,
  } as HeroSource,
  /** Last frame (completed blueprint), shown instead of the film under reduced motion. */
  finalPoster: '/video/hero-landscape-final.jpg',
  portraitFinalPoster: '/video/hero-portrait-final.jpg',
  /** Canvas colour sampled from the film's edges, so letterboxing has no visible edge. */
  canvasColor: '#02182d',
}

export const disciplines = [
  {
    id: 'product',
    code: 'D.01',
    title: 'Product Design',
    body: 'I transform ideas and complex requirements into clear, useful digital experiences through product thinking, interaction design, and carefully considered interfaces.',
    tools: ['Figma', 'Prototyping', 'Design systems'],
  },
  {
    id: 'web',
    code: 'D.02',
    title: 'Web Development',
    body: 'I build responsive web experiences that translate design intent into fast, functional, and polished digital products.',
    tools: ['Webflow', 'Shopify', 'Next.js'],
  },
  {
    id: 'mobile',
    code: 'D.03',
    title: 'Mobile App Development',
    body: 'I develop mobile experiences that connect thoughtful interfaces with functional product experiences.',
    tools: ['Flutter', 'iOS', 'Android'],
  },
] as const

export type DisciplineId = (typeof disciplines)[number]['id']

export const processStages = [
  { title: 'Discover', body: 'Understand the problem, users, and constraints.' },
  { title: 'Define', body: 'Establish product direction and information architecture.' },
  { title: 'Design', body: 'Develop the experience, visual language, and interactions.' },
  { title: 'Build', body: 'Translate the design into a working digital product.' },
  { title: 'Refine', body: 'Test, learn, and improve.' },
]

export const about = {
  location: 'Lagos, Nigeria',
  coordinates: '6.5244° N  3.3792° E',
}

export interface Experiment {
  title: string
  description: string
  /** Optional media; the sheet renders as a drawing frame without it. */
  image?: string
  /** Built-in SVG artwork, used instead of an image. */
  illustration?: 'party-ticket'
  /** Internal page or external URL. */
  href?: string
  /** Id of a demo further down the Experiments page; the card scrolls to it. */
  anchor?: string
  tags: string[]
  year: string
}

/** Creative-coding pieces, prototypes and explorations. Empty slots on the page show as Coming soon. */
export const experiments: Experiment[] = [
  {
    title: 'Party Padi: choosing seats in 3D',
    description:
      'A stadium seat map for Party Padi (partypadi.com), a project I am experimenting on. Spin the bowl, hover any block of seats to see its price and how many are left, and click to pin it. Pure SVG, no 3D library.',
    illustration: 'party-ticket',
    anchor: 'party-padi-stadium',
    tags: ['React', 'SVG', '3D projection'],
    year: '2026',
  },
]

const linkedin = socialLinks.find((link) => link.label === 'LinkedIn')
const github = socialLinks.find((link) => link.label === 'GitHub')

export const blueprintContact = {
  email: contact.email,
  links: [
    { label: 'Email', href: `mailto:${contact.email}` },
    ...(linkedin ? [linkedin] : []),
    ...(github ? [github] : []),
    { label: 'WhatsApp', href: contact.whatsapp.href },
  ],
}

export const primaryNav = [
  { label: 'Work', to: '/work', index: '02' },
  { label: 'About', to: '/about', index: '03' },
  { label: 'Writing', to: '/writing', index: '04' },
  { label: 'Experiments', to: '/experiments', index: '05' },
  { label: 'Contact', to: '/contact', index: '06' },
]
