/** Practice content: positioning, metrics, story, framework and capabilities. */

export const positioning = {
  eyebrow: 'Product designer · Lagos, working remotely',
  statement: 'I design digital products and build them.',
  body: 'I take products from research and Figma to live code in Webflow, Shopify, Next.js, and Flutter. You get one person who designs the product and ships it, so nothing gets lost between design and development.',
}

export const metrics = [
  { value: '6+', label: 'Years experience', detail: 'Product, design & engineering' },
  { value: '24', label: 'Products shipped', detail: 'MVPs to production scale' },
  { value: '8', label: 'Industries', detail: 'Fintech, SaaS, AI & more' },
  { value: '40%', label: 'Avg. conversion lift', detail: 'Across redesigned flows' },
  { value: '7×', label: 'Faster delivery', detail: 'With AI-native workflows' },
  { value: '5', label: 'Design systems', detail: 'Built & maintained' },
]

export const aboutStory = {
  image: '/images/abiola-about.png',
  intro:
    'I started with CorelDRAW flyers in Lagos. Today I design digital products in Figma and build them in Webflow, Shopify, Next.js, and Flutter for clients in Nigeria and worldwide.',
  caption: 'Lagos, Nigeria · Product Designer · Lions Club International',
  sections: [
    {
      heading: 'Where it started',
      paragraphs: [
        'Long before product engineering was a title I could put on a business card, I was a graphics designer on the streets of Lagos. CorelDRAW was my first real tool. I designed flyers for churches, posters for small businesses, and anything a client needed to stand out in a crowded market.',
        'Those early projects taught me something that still shapes my work today: design is not decoration. It is communication. Every flyer had to grab attention in seconds, carry a clear message, and move people to act.',
      ],
    },
    {
      heading: 'Curiosity became the career',
      paragraphs: [
        'I did not set out to become a developer or product engineer. I followed curiosity. A question here, a tutorial there, then a side project, then another tool in the stack. Photoshop led to web design. Web design led to code. Code led to full products.',
        'I kept stacking skills because the problems kept getting more interesting. Clients no longer just needed a flyer. They needed a landing page, then a platform, then something that could scale. I learned to meet those problems wherever they showed up.',
        'That learning never stopped. It is still the core of how I work. New frameworks, new AI workflows, new product challenges. I treat every project as a chance to get sharper.',
      ],
    },
    {
      heading: 'What I do today',
      paragraphs: [
        'Today I work as a freelance product designer who also builds. I design in Figma and ship in Webflow, Shopify, Next.js, and Flutter. Recent work includes ValGo, a food delivery app built in Flutter on Supabase, a membership platform for a Lagos running club, a Shopify store for a Lagos retailer, and a Flutter game that teaches Yoruba.',
        'The thread from those Lagos street flyers to the products I ship now is the same: understand the audience, design with intention, and build something that works in the real world.',
      ],
    },
    {
      heading: 'Beyond the screen',
      paragraphs: [
        'Outside of work, I am a member of Lions Club International. Service and community have always mattered to me, whether that meant helping a local church promote an event or contributing to initiatives that improve lives beyond business.',
        'That same mindset carries into how I collaborate with teams: show up, solve problems, and leave things better than you found them.',
      ],
    },
  ],
}

/** The full product engineering framework, first conversation to scale. */
export const frameworkSteps = [
  { title: 'Discovery', body: 'Opportunity mapping & stakeholder alignment' },
  { title: 'Product Strategy', body: 'Vision, positioning & roadmap' },
  { title: 'Research', body: 'User interviews, competitive analysis' },
  { title: 'UX Architecture', body: 'Flows, IA & interaction models' },
  { title: 'Design System', body: 'Tokens, components & patterns' },
  { title: 'Frontend Engineering', body: 'React, Next.js & performance' },
  { title: 'Backend Integration', body: 'APIs, auth & data modeling' },
  { title: 'AI Systems', body: 'Agents, prompts & LLM infrastructure' },
  { title: 'Testing', body: 'Usability, QA & accessibility' },
  { title: 'Launch', body: 'Deployment & go-to-market' },
  { title: 'Iteration', body: 'Analytics-driven improvements' },
  { title: 'Scale', body: 'Growth systems & optimization' },
]

export type CapabilityLevel = 'Expert' | 'Advanced' | 'Proficient'

export const capabilities: {
  area: string
  level: CapabilityLevel
  years: string
  deliverables: string
  tools: string
  outcome: string
}[] = [
  { area: 'Strategy', level: 'Expert', years: '6+', deliverables: 'Roadmaps, positioning, growth plans', tools: 'Notion, Miro, FigJam', outcome: 'Aligned product vision' },
  { area: 'Design', level: 'Expert', years: '6+', deliverables: 'UX flows, UI systems, prototypes', tools: 'Figma', outcome: 'Conversion-ready experiences' },
  { area: 'Frontend', level: 'Expert', years: '5+', deliverables: 'SPAs, design systems, a11y', tools: 'React, Next.js, TypeScript', outcome: 'Production-grade interfaces' },
  { area: 'Backend', level: 'Advanced', years: '4+', deliverables: 'APIs, auth, data models', tools: 'Supabase, REST, SQL', outcome: 'Scalable infrastructure' },
  { area: 'No-Code', level: 'Advanced', years: '4+', deliverables: 'Marketing sites, CMS, SEO', tools: 'Webflow, WordPress, Shopify', outcome: 'Fast go-to-market' },
  { area: 'Mobile', level: 'Proficient', years: '3+', deliverables: 'Cross-platform apps, mobile UX', tools: 'Flutter', outcome: 'Native-quality mobile' },
  { area: 'AI', level: 'Advanced', years: '2+', deliverables: 'AI UX, agents, LLM products', tools: 'Claude, Cursor, ChatGPT', outcome: 'AI-native products' },
]

export const aiWorkflow = {
  body: 'Product thinking, design craft, engineering fundamentals, and modern AI workflows connected into one toolchain that moves ideas to production faster without compromising quality.',
  tags: ['Agentic workflows', 'Rapid MVP', 'AI prototyping', 'Multi-agent dev'],
}

export const audiences = [
  'Startups launching an MVP or first product version',
  'Founders who need one person across design and development',
  'Product teams needing UI/UX design or frontend engineering support',
  'Businesses upgrading a marketing site or moving it to Webflow',
  'Brands that need a Shopify store designed and built, or redesigned',
  'Fintech, SaaS, community, and AgriTech products',
]
