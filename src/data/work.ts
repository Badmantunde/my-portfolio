import { getProject, type Project } from './projects'

/**
 * Every project on the site (/work and /work/:slug), in display order. ValGo is defined here; the rest
 * adapt their case-study content from projects.ts.
 */

export interface ProjectFeature {
  title: string
  body: string
  /** Short annotations drawn beside the screen, like callouts on a drawing. */
  callouts: string[]
  image: string
  imageAlt: string
}

export interface WorkProject {
  slug: string
  title: string
  category: string
  role: string
  /** Omitted when not confirmed; the fact is then left out rather than guessed. */
  year?: string
  stack: string[]
  /** Additional title-block facts, e.g. scope or platform. */
  extraFacts?: { label: string; value: string }[]
  summary: string
  /** Wide project image for the drawing frame. */
  image?: string
  /** Phone screens shown side by side instead of a wide image. */
  screens?: { src: string; alt: string }[]
  /** CSS object-position for `image` in the 16:10 frame. */
  focus?: string
  liveUrl?: string
  overview: string
  challenge: string
  approach: string[]
  /** What exists at the end of the project. Only facts supplied by the owner. */
  outcomes: string[]
  outcomesLabel?: string
  features?: ProjectFeature[]
  /** The core user journey, drawn as a connected line. */
  journey?: { title: string; body: string }[]
  gallery?: string[]
  /** Topics for structured data and keywords. */
  tags: string[]
  seoTitle?: string
  /** Meta description; falls back to `summary`. */
  seoDescription?: string
  /** Social preview image when `image` is missing or a format previews can't show. */
  ogImage?: { src: string; width?: number; height?: number }
  /** External references: Contra, Behance, Figma prototype. */
  links: { label: string; href: string }[]
  relatedArticleSlug?: string
}

const valgo: WorkProject = {
  slug: 'valgo',
  title: 'ValGo',
  category: 'Food & Essentials Delivery App',
  role: 'Product design & mobile development',
  stack: ['Figma', 'Flutter', 'Supabase', 'Firebase'],
  extraFacts: [{ label: 'Scope', value: 'Mobile customer app · 5 vendor categories' }],
  tags: ['Flutter', 'Supabase', 'Firebase', 'Mobile app', 'Food delivery', 'Product Design'],
  seoTitle: 'ValGo: Designing and Building a Food Delivery App in Flutter',
  seoDescription:
    'Case study: ValGo, a food and essentials delivery app designed in Figma and built in Flutter with Supabase and Firebase: portion-based ordering, live tracking and verified delivery.',
  ogImage: { src: '/images/valgo/home.webp', width: 923, height: 2000 },
  links: [],
  summary:
    'A delivery app for local restaurants, pharmacies, supermarkets, bakeries and open markets, built so ordering a plate from a neighbourhood kitchen feels as precise as ordering from a chain.',
  screens: [
    { src: '/images/valgo/home.webp', alt: 'ValGo home screen with delivery categories and nearby restaurants' },
    { src: '/images/valgo/meal-builder.webp', alt: "ValGo menu for Mama T's Kitchen with portion steppers and a live cart total" },
    { src: '/images/valgo/order-tracking.webp', alt: 'ValGo order details with rider, delivery code and status timeline' },
  ],
  overview:
    'ValGo is a delivery system I built end to end on the customer side: finding food and essentials nearby, building an order, paying, tracking the rider, and confirming the hand-off. It brings five kinds of vendors into one app: restaurants, pharmacies, supermarkets, bakeries and Ago Market for open-market shopping. Wallet, rewards and a rider sign-up path are built into the core navigation.',
  challenge:
    'Local food is not sold like fast food. At a neighbourhood kitchen a plate is put together portion by portion (a scoop of jollof, a portion of beans, one moimoi, some dodo), and each part has its own price. Most delivery apps flatten that into fixed combo meals, so customers either over-order or can’t get what they actually want. On top of that, people need confidence that an order will arrive, and that it reaches the right person, before they pay for it.',
  approach: [
    'Modelled menus the way local kitchens sell: per-portion and per-piece pricing, with quantity steppers on every item instead of fixed combos',
    'Kept the running cart total pinned to the bottom of the menu so the price is always visible while a plate is being built',
    'Grouped restaurants, pharmacies, supermarkets, bakeries and markets under one home screen, each with its own entry point',
    'Surfaced the decision-making facts on every vendor card: delivery window, area, rating and whether the kitchen is open right now',
    'Designed a four-digit delivery code the customer shares only after checking the order, so hand-offs are verified',
    'Turned order status into a timestamped timeline with direct call and chat to the assigned rider',
    'Designed every flow in Figma, then built the app in Flutter on a Supabase backend, with Firebase sending push notifications',
  ],
  outcomesLabel: 'What the app delivers',
  outcomes: [
    'A complete customer journey: discovery, menu, cart, order tracking, delivery confirmation and rating',
    'Five vendor categories in one home screen, with curated lists for new, favourite and popular spots',
    'A portion-based meal builder with a live cart total',
    'Rider details, call and chat, an order ID and a verified delivery code on every order',
    'Wallet, Rewards, Orders and Profile in the main navigation, plus a sign-up path for new riders',
  ],
  features: [
    {
      title: 'One home for every errand',
      body: 'The home screen opens on the delivery address, a search bar and five categories, so a customer can go from “what do I need?” to a vendor in one tap. Below that, curated lists (New in town, Favourite, Hot Spots) and vendor cards carry everything needed to choose: delivery window, area, rating and an Open badge.',
      callouts: ['Address switcher', 'Five delivery categories', 'Curated vendor lists', 'Open status on every card', 'Rider sign-up banner'],
      image: '/images/valgo/home.webp',
      imageAlt: 'ValGo home screen',
    },
    {
      title: 'Restaurants worth choosing between',
      body: 'The restaurant directory pairs searchable listings with live state: open or closed, delivery time, location and rating. Time-boxed offers sit on the card itself, so a deal is visible at the moment of choosing rather than buried in a promotions tab.',
      callouts: ['Restaurant search', 'Open / Closed state', 'Time-boxed discounts on the card'],
      image: '/images/valgo/restaurants.webp',
      imageAlt: 'ValGo restaurant directory',
    },
    {
      title: 'Create your meal in minutes',
      body: 'Menus are built the way local kitchens actually sell. Each item shows its unit, per portion or per piece, and has its own stepper, so a plate of jollof, Ewa Agoyin, moimoi and dodo is assembled exactly as ordered. Items with options, like chicken or turkey, expand in place, and the cart total updates with every tap.',
      callouts: ['Per-portion and per-piece pricing', 'Steppers on every item', 'Expandable options', 'Live cart total with Proceed'],
      image: '/images/valgo/meal-builder.webp',
      imageAlt: 'ValGo meal builder',
    },
    {
      title: 'Tracking you can trust',
      body: 'After checkout the order page shows who is delivering, how to reach them, and the expected time. Every stage is timestamped: placed, confirmed, preparing, on the way and delivered. A four-digit delivery code is shared with the rider only once the customer has checked the order, closing the loop on wrong or missing deliveries.',
      callouts: ['Rider call and chat', 'Expected delivery time', 'Verified delivery code', 'Timestamped status timeline', 'Rate the delivery'],
      image: '/images/valgo/order-tracking.webp',
      imageAlt: 'ValGo order tracking',
    },
  ],
  journey: [
    { title: 'Discover', body: 'Choose a category and a vendor that is open and close by.' },
    { title: 'Build', body: 'Assemble the plate portion by portion with a live total.' },
    { title: 'Checkout', body: 'Proceed from the pinned cart to payment.' },
    { title: 'Track', body: 'Follow each timestamped stage and reach the rider directly.' },
    { title: 'Confirm', body: 'Share the delivery code once the order checks out.' },
    { title: 'Rate', body: 'Rate the delivery to close the order.' },
  ],
}

function fromProject(slug: string, focus = '50% 50%'): WorkProject | undefined {
  const project: Project | undefined = getProject(slug)
  if (!project) return undefined
  const links = [
    project.contraUrl && { label: 'Contra', href: project.contraUrl },
    project.behanceUrl && { label: 'Behance', href: project.behanceUrl },
    project.figmaUrl && { label: 'Figma prototype', href: project.figmaUrl },
  ].filter((link): link is { label: string; href: string } => Boolean(link))

  return {
    slug: project.slug,
    title: project.title,
    category: project.subtitle,
    role: project.role,
    year: project.year,
    stack: project.tools,
    summary: project.description,
    image: project.image,
    focus,
    liveUrl: project.liveUrl,
    overview: project.overview,
    challenge: project.challenge,
    approach: project.approach,
    outcomes: project.results,
    gallery: project.galleryImages,
    tags: project.tags,
    seoTitle: project.seoTitle ?? `${project.title}: ${project.subtitle} | Abiola Babatunde`,
    seoDescription: project.seoIntro,
    ogImage: {
      src: project.ogImage ?? project.image,
      width: project.imageWidth,
      height: project.imageHeight,
    },
    links,
    relatedArticleSlug: project.relatedArticleSlug,
  }
}

export const workProjects: WorkProject[] = [
  valgo,
  ...[
    fromProject('shight-running-club', '0% 0%'),
    fromProject('asa-oro'),
    fromProject('just-what-you-need'),
    fromProject('muzora', '50% 75%'),
    fromProject('rabi-coin', '50% 0%'),
    fromProject('eclat-studio-paris', '50% 60%'),
    fromProject('dart-agro-systems'),
  ].filter((project): project is WorkProject => Boolean(project)),
]

export function getWorkProject(slug: string) {
  return workProjects.find((project) => project.slug === slug)
}
