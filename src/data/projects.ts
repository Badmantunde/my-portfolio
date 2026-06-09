export type ProjectType = 'case-study' | 'live'

export interface Project {
  slug: string
  title: string
  subtitle: string
  description: string
  type: ProjectType
  tags: string[]
  tools: string[]
  image: string
  video?: string
  liveUrl?: string
  contraUrl?: string
  behanceUrl?: string
  figmaUrl?: string
  year: string
  role: string
  overview: string
  challenge: string
  approach: string[]
  results: string[]
  aspect: 'aspect-[329/246]' | 'aspect-square' | 'aspect-[4/3]'
  bg: string
  featured?: boolean
  galleryImages?: string[]
}

export const projects: Project[] = [
  {
    slug: 'muzora',
    title: 'Muzora',
    subtitle: 'Campus Music Discovery App',
    description:
      'Mobile product design for a campus-first music platform connecting Nigerian university artists with student listeners through discovery, charts, and community.',
    type: 'case-study',
    tags: ['Mobile UI', 'Product Design', 'Music', 'Community'],
    tools: ['Figma'],
    image: '/images/muzora/hero.png',
    galleryImages: [
      '/images/muzora/profile-discovery.png',
      '/images/muzora/screens.png',
    ],
    year: '2025',
    role: 'Product & UI Designer',
    overview:
      'Muzora is a music discovery platform built for university students and emerging campus artists. It addresses a common problem across Nigerian campuses: talented student musicians create great music but struggle to gain visibility beyond their immediate social circles. Muzora creates a dedicated ecosystem where students discover music from their peers, support local talent, and help campus artists build an audience within and across universities.',
    challenge:
      'Across universities, thousands of student artists release music every year on Audiomack, SoundCloud, Spotify, and YouTube, yet they face limited exposure outside friend groups, dependence on social media algorithms, no centralized platform for campus talent, and difficulty building loyal school-community audiences. Students who enjoy discovering new music had no easy way to find artists from their own campuses.',
    approach: [
      'Designed a discovery-first experience so users find campus music quickly without heavy search',
      'Built personalization around genres and schools to reinforce community identity',
      'Structured core flows: onboarding, home discovery, artist profiles, charts, and now playing',
      'Applied familiar music-app patterns while introducing campus-specific features like school charts and playlists',
      'Used a bold dark UI with high-contrast accent color to match youth culture and music energy',
    ],
    results: [
      'Full mobile UI system covering onboarding through playback and library experiences',
      'Campus charts and school playlists designed to increase artist visibility',
      'Artist profile flows that help student musicians build followers within their university',
      'Product vision positioned to become the digital home for campus music across African universities',
    ],
    aspect: 'aspect-[4/3]',
    bg: 'bg-[#0f0f0f]',
    featured: true,
  },
  {
    slug: 'eclat-studio-paris',
    title: 'Éclat Studio Paris',
    subtitle: 'UI/UX Website Design',
    description:
      'Luxury beauty studio website : editorial UI/UX design with photography-led layouts and refined brand storytelling.',
    type: 'case-study',
    tags: ['UI/UX', 'Web Design', 'Photography'],
    tools: ['Figma', 'ChatGPT'],
    image:
      'https://media.contra.com/image/upload/c_fill,w_1200/wc66egss8owjb3zt8x9s.avif',
    contraUrl:
      'https://contra.com/p/OEkmlkQO-eclat-studio-paris-website-or-uiux-design',
    behanceUrl:
      'https://www.behance.net/gallery/242928751/Eclat-Studio-Paris-Website-UIUX-Design',
    year: '2026',
    role: 'UI/UX Designer',
    overview:
      'Éclat Studio Paris is a luxury beauty and aesthetics studio. I designed a full website experience that balances editorial elegance with clear service discovery : helping the brand dominate their category online.',
    challenge:
      'The studio needed a digital presence that matched their in-person premium experience. The site had to showcase services, build trust, and convert high-intent visitors without feeling like a generic salon template.',
    approach: [
      'Conducted visual research into Parisian luxury beauty brands and editorial web patterns',
      'Structured information architecture around services, studio story, and booking flows',
      'Designed high-fidelity screens in Figma with photography-forward layouts',
      'Used AI-assisted copy refinement with ChatGPT for tone and microcopy iteration',
    ],
    results: [
      'Complete UI/UX design system ready for development handoff',
      'Photography-led layouts that elevate brand perception',
      'Clear conversion paths for consultation and service discovery',
    ],
    aspect: 'aspect-[329/246]',
    bg: 'bg-[#1a1d2e]',
  },
  {
    slug: 'dart-agro-systems',
    title: 'Dart Agro Systems',
    subtitle: 'AgriTech Website UI/UX',
    description:
      'Premium AgriTech website : positioning an agricultural innovation leader through immersive storytelling, product showcases, and sustainability messaging.',
    type: 'case-study',
    tags: ['UI/UX', 'AgriTech', 'Web Design', 'Sustainability'],
    tools: ['Figma', 'ChatGPT'],
    image:
      'https://mir-s3-cdn-cf.behance.net/project_modules/hd/8a1a6c250772517.6a27251fbca90.png',
    behanceUrl:
      'https://www.behance.net/gallery/250772517/Dart-Agro-Systems',
    year: '2026',
    role: 'UI/UX Designer',
    overview:
      'Dart Agro Systems is a modern agricultural technology company transforming farming through intelligent machinery, automation, precision agriculture, and sustainable practices. I designed a premium digital experience that communicates their vision while positioning them as a trusted global leader in agricultural innovation.',
    challenge:
      'Many agricultural companies still rely on outdated digital experiences that fail to communicate innovation. Dart Agro needed a site that established credibility, showcased advanced farming technologies, demonstrated environmental responsibility, and generated qualified leads : all while remaining accessible to users with varying technical knowledge.',
    approach: [
      'Structured IA around products, sustainability initiatives, and innovation storytelling',
      'Designed immersive, photography-led layouts with strong visual hierarchy',
      'Balanced technological sophistication with clarity for farmers and enterprise buyers',
      'Built mobile-first flows for lead generation and sales team contact',
    ],
    results: [
      'Premium brand positioning within the AgriTech industry',
      'Clear product and machinery showcase architecture',
      'Sustainability and innovation narratives that build stakeholder trust',
      'Lead-generation paths for farmers, enterprises, and strategic partners',
    ],
    aspect: 'aspect-[4/3]',
    bg: 'bg-[#1a2e1a]',
    featured: true,
  },
  {
    slug: 'rabi-coin',
    title: 'RabiCoin',
    subtitle: 'DeFi Wallet & Staking App',
    description:
      'Web3 mobile UI for a crypto wallet : simplifying staking, lending, and multi-wallet connections into an approachable DeFi experience.',
    type: 'case-study',
    tags: ['Product Design', 'Mobile UI', 'Web3', 'DeFi'],
    tools: ['Figma', 'Jitter'],
    image:
      'https://media.contra.com/image/upload/fl_progressive/q_auto:best,w_1200/pxhq0mi8lfoujj11dgmf.webp',
    video:
      'https://media.contra.com/video/upload/fl_progressive/q_auto:best,w_800/bwqdsaxvuaps8uc1mmnq.mp4',
    contraUrl:
      'https://contra.com/p/YlPoMcsM-rabi-coin-de-fi-wallet-and-staking-app-ui-design',
    figmaUrl:
      'https://www.figma.com/proto/gXsDv31e9GNFMgQI0RCtA3/Web3-Starts-here',
    year: '2024',
    role: 'Product & UI Designer',
    overview:
      'RabiCoin is a DeFi wallet and staking application giving users control over digital assets with intuitive access to lending, borrowing, staking, and transaction management.',
    challenge:
      'DeFi interfaces overwhelm first-time users. The product needed to feel professional yet approachable : building trust for newcomers while providing power for advanced crypto investors.',
    approach: [
      'Wireframed core flows: wallet connection, asset overview, DeFi actions, and staking',
      'Built a token-based design system in Figma for typography, color, and spacing',
      'Used green/red risk cues for APY, fees, and lock-up transparency',
      'Designed scalable card-based layouts for dense financial data',
    ],
    results: [
      'Simplified onboarding with MetaMask, TrustWallet, and WalletConnect support',
      'Clear asset views and transaction histories that build user confidence',
      'Full UI system delivered in three weeks, ready for development handoff',
    ],
    aspect: 'aspect-square',
    bg: 'bg-[#0f1419]',
  },
  {
    slug: 'shight-running-club',
    title: 'Shight Running Club',
    subtitle: 'Community Platform',
    description:
      'Live running community platform for Lagos : membership, events, and community features built with Next.js and Supabase.',
    type: 'live',
    tags: ['Next.js', 'Supabase', 'Product Engineering', 'Community'],
    tools: ['Next.js', 'Supabase', 'Figma'],
    image: '/images/shight-running-club.png',
    liveUrl: 'https://www.shightrunningclub.com/',
    year: '2025',
    role: 'Product Engineer',
    overview:
      'Shight Running Club is one of the fastest-growing running communities in Lagos. I designed and engineered the full platform : from membership tiers and event management to community storytelling.',
    challenge:
      'The club needed a digital home that drives consistency, handles membership sign-ups, showcases events, and reflects the energy of their in-person community : not just another fitness landing page.',
    approach: [
      'Defined product architecture for events, membership, and community content',
      'Designed conversion-focused UX for free and premium membership tiers',
      'Built frontend with Next.js and backend with Supabase for auth and data',
      'Implemented responsive layouts optimized for mobile-first Lagos audiences',
    ],
    results: [
      'Live production platform serving 200+ active runners',
      'Membership system with free and premium tiers',
      'Event pages driving weekly group run sign-ups across Lagos',
    ],
    aspect: 'aspect-[4/3]',
    bg: 'bg-[#1a1a1a]',
    featured: true,
  },
  {
    slug: 'crypto-dispensers',
    title: 'CryptoDispensers',
    subtitle: 'Fintech Website Redesign',
    description:
      'Full website redesign for a Bitcoin access platform : Figma to Webflow build supporting 195+ crypto assets and multiple purchase routes.',
    type: 'live',
    tags: ['Webflow', 'Figma', 'Fintech', 'Conversion'],
    tools: ['Figma', 'Webflow', 'ChatGPT'],
    image:
      'https://media.contra.com/image/upload/c_fill,w_1200/yfxu0tilnclajh4ut6lb.avif',
    video:
      'https://media.contra.com/video/upload/fl_progressive/w_800/zo4fsgm4vobv2ovmrpjy.mp4',
    liveUrl: 'https://cryptodispensers.com/',
    contraUrl:
      'https://contra.com/p/WvENEe3A-crypto-dispensers-website-redesign-or-figma-to-webflow',
    year: '2025',
    role: 'Product Designer & Webflow Developer',
    overview:
      'CryptoDispensers is a FinCEN-registered Bitcoin and crypto access platform. I redesigned and rebuilt the site in Webflow : structuring complex purchase flows, education content, and trust signals for a regulated fintech audience.',
    challenge:
      'The platform offers cash loading, cards, ACH, wire, and crypto swap routes : each with different limits, fees, and compliance requirements. The redesign had to simplify this complexity without losing regulatory accuracy.',
    approach: [
      'Audited existing IA and mapped multi-route purchase journeys',
      'Redesigned high-fidelity screens in Figma with conversion-focused hierarchy',
      'Built responsive Webflow site with CMS for education and support content',
      'Structured trust signals: SOC 2, FinCEN registration, and customer reviews',
    ],
    results: [
      'Live production site at cryptodispensers.com',
      'Clear guided flows for cash, card, ACH, and wire purchase routes',
      'Scalable Webflow CMS for education hub and support content',
    ],
    aspect: 'aspect-[329/246]',
    bg: 'bg-[#0a1628]',
    featured: true,
  },
]

export function getFeaturedProjects(limit = 4): Project[] {
  return projects.filter((p) => p.featured).slice(0, limit)
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
