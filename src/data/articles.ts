import { seoArticles } from './article-seo'
import type { Article } from './article-types'
export type { Article, ArticleCta, ArticleCtaLink, ArticleSection } from './article-types'

const coreArticles: Article[] = [
  {
    slug: 'designing-agentic-workflows-users-trust',
    category: 'AI Product Development',
    title: 'Designing agentic workflows that users actually trust',
    date: 'May 2026',
    readTime: '8 min',
    excerpt:
      'AI agents fail when they feel unpredictable. Here is how to design agentic products with transparency, control, and confidence built in from day one.',
    sections: [
      {
        paragraphs: [
          'The biggest mistake in AI product design is treating intelligence like magic. Users do not want a black box that suddenly acts on their behalf. They want a system that feels competent, explainable, and reversible.',
          'Agentic workflows are powerful because they compress multi-step tasks into a single intent. But power without trust creates anxiety. The product job is not just to automate. It is to make automation feel safe.',
        ],
      },
      {
        heading: 'Start with user mental models, not model capabilities',
        paragraphs: [
          'Most teams begin with what the LLM can do. Better teams begin with what the user expects to happen next. Map the task as the user understands it: inputs, decisions, outputs, and failure points.',
          'If a user cannot predict what the agent will do before they click, adoption drops. Design explicit preflight states: what will be analyzed, what actions may be suggested, and what requires approval.',
        ],
      },
      {
        heading: 'Design for visibility and rollback',
        paragraphs: [
          'Trust grows when users can see the reasoning trail. Show intermediate steps, source references, and confidence boundaries. Avoid presenting a final answer without context.',
          'Every autonomous action needs an undo path. If your agent drafts an email, schedules a meeting, or updates a record, the user must be able to review, edit, and reject without friction.',
        ],
      },
      {
        heading: 'Calibrate autonomy by risk level',
        paragraphs: [
          'Not every task deserves the same level of automation. Low-risk tasks can run with minimal confirmation. High-risk tasks should require explicit user consent at each critical step.',
          'Use progressive autonomy: start in assist mode, earn full automation as users repeat successful outcomes. This mirrors how people build trust with human assistants over time.',
        ],
      },
      {
        heading: 'Practical UX patterns that work',
        paragraphs: [
          'Use action previews instead of immediate execution. Use plain-language status updates instead of technical logs. Use scoped permissions so users know exactly what data the agent can access.',
          'When errors happen, explain what failed and what the user can do next. Generic "something went wrong" messages destroy confidence fast.',
        ],
      },
      {
        heading: 'What this means for product teams',
        paragraphs: [
          'Agentic products win when design and engineering align on trust primitives: transparency, control, reversibility, and calibrated autonomy.',
          'If you are building with AI agents today, optimize for confidence per action, not just speed per task. That is how you move from novelty to daily reliance.',
        ],
      },
    ],
  },
  {
    slug: 'product-engineers-vs-teams-of-ten',
    category: 'Product Engineering',
    title: 'Why the best MVPs are built by product engineers, not teams of ten',
    date: 'Apr 2026',
    readTime: '6 min',
    excerpt:
      'Early-stage products do not fail because teams are too small. They fail because ownership is too fragmented. A product engineer can collapse strategy, design, and build into one execution loop.',
    sections: [
      {
        paragraphs: [
          'Startup advice often says "hire a team and move fast." In practice, early products move slowly when every decision crosses five functions. Strategy waits on design. Design waits on engineering. Engineering waits on clarity no one owns.',
          'A product engineer is not a shortcut for cheap labor. It is a structural advantage: one person who can translate business intent into shipped software with minimal translation loss.',
        ],
      },
      {
        heading: 'Fragmentation is the hidden MVP tax',
        paragraphs: [
          'Handoffs create delay and ambiguity. A roadmap item that sounds simple can take weeks once it passes through discovery docs, design critiques, implementation tickets, and QA cycles.',
          'At MVP stage, speed matters because learning matters. You are not optimizing for perfect process. You are optimizing for validated learning per week.',
        ],
      },
      {
        heading: 'One owner, one context stack',
        paragraphs: [
          'When the same person defines the user flow, designs the interface, and implements the frontend, decisions happen in real time. Tradeoffs are resolved immediately: scope, UX quality, technical feasibility, and timeline.',
          'This does not mean skipping collaboration. It means reducing coordination overhead until the product has enough signal to justify specialized roles.',
        ],
      },
      {
        heading: 'Where product engineers create outsized value',
        paragraphs: [
          'MVPs with heavy UX risk: onboarding, dashboards, multi-step workflows, and conversion funnels.',
          'Products that need fast iteration loops: landing pages, feature experiments, pricing pages, and activation flows.',
          'Teams without full-time design and engineering leadership but with urgent market timing.',
        ],
      },
      {
        heading: 'When to expand the team',
        paragraphs: [
          'Once core workflows are validated and usage grows, specialization becomes an advantage. Add dedicated backend, mobile, or design system support when repeatability and scale demand it.',
          'The goal is sequence, not permanence: product engineer first for speed and clarity, then team scale for durability.',
        ],
      },
      {
        heading: 'Bottom line',
        paragraphs: [
          'If your MVP needs to ship in weeks, not quarters, optimize for ownership density. A strong product engineer can often deliver what a ten-person early team promises but delays.',
          'The best early teams are not the biggest. They are the most coherent.',
        ],
      },
    ],
  },
  {
    slug: 'token-first-design-systems',
    category: 'Design Systems',
    title: 'Token-first design systems for startups that need to move fast',
    date: 'Mar 2026',
    readTime: '10 min',
    excerpt:
      'Startups do not need massive component libraries on day one. They need token discipline that keeps design and engineering aligned as the product evolves.',
    sections: [
      {
        paragraphs: [
          'Many startups either overbuild design systems too early or skip systems entirely and accumulate UI debt. Token-first design gives you a middle path: shared foundations without heavy process.',
          'Tokens are the contract between design and code. Color, typography, spacing, radius, and elevation tokens create consistency before you build dozens of components.',
        ],
      },
      {
        heading: 'Why tokens before components',
        paragraphs: [
          'Components change frequently in early products. Tokens change slowly. If your foundations are stable, component iteration becomes cheaper and safer.',
          'A token-first approach lets one designer and one engineer ship fast while still looking cohesive. You are not locked into a giant library. You are building a scalable grammar.',
        ],
      },
      {
        heading: 'Minimum viable token set',
        paragraphs: [
          'Start with semantic tokens, not raw values. Use names like text-primary, surface-elevated, border-subtle, and action-primary instead of gray-700 everywhere.',
          'Define spacing scale, type scale, radius scale, and a compact color system for brand, neutral, success, warning, and error states. That alone solves most inconsistency issues.',
        ],
      },
      {
        heading: 'Figma to code alignment',
        paragraphs: [
          'In Figma, map variables to the same token names used in code. In frontend, expose tokens through CSS variables or a theme object in Tailwind configuration.',
          'When names match, handoff friction drops dramatically. Designers and engineers are no longer translating values manually.',
        ],
      },
      {
        heading: 'Component strategy for early stage',
        paragraphs: [
          'Build only high-frequency components first: buttons, inputs, cards, modal shells, tabs, and empty states. Delay niche components until patterns repeat across screens.',
          'Document usage rules in short, practical notes. A design system fails when people cannot decide quickly which component to use.',
        ],
      },
      {
        heading: 'Operational benefits',
        paragraphs: [
          'Token-first systems reduce redesign cost, improve accessibility consistency, and make AI-assisted UI generation more reliable because the model has structured constraints.',
          'For startups, that means faster launches, cleaner iterations, and a product that feels intentional even while moving quickly.',
        ],
      },
    ],
  },
  {
    slug: 'nextjs-conversion-focused-saas',
    category: 'Next.js',
    title: 'Frontend architecture patterns for conversion-focused SaaS',
    date: 'Feb 2026',
    readTime: '7 min',
    excerpt:
      'Conversion is not a copy problem alone. It is an architecture problem. Here are Next.js patterns that improve performance, clarity, and signup flow reliability.',
    sections: [
      {
        paragraphs: [
          'SaaS conversion drops when pages are slow, confusing, or technically fragile. Most teams optimize copy while ignoring frontend architecture, even though architecture directly affects trust and completion rates.',
          'Next.js gives you a strong base for performance and SEO, but the implementation details still determine whether users complete signup and activation.',
        ],
      },
      {
        heading: 'Prioritize route clarity',
        paragraphs: [
          'Use a simple route structure: marketing pages, product pages, auth routes, and app routes should be clearly separated. Users should always know if they are in marketing context or product context.',
          'Avoid mixing heavy app logic into landing routes. Keep top-of-funnel pages lightweight and fast.',
        ],
      },
      {
        heading: 'Performance as a conversion feature',
        paragraphs: [
          'Optimize LCP and INP on pricing, signup, and onboarding pages first. These are your revenue-critical surfaces.',
          'Use static rendering where possible, defer non-critical scripts, and avoid large client bundles on first interaction pages. Speed signals competence.',
        ],
      },
      {
        heading: 'Form and auth flow reliability',
        paragraphs: [
          'Treat signup and login as product features, not utilities. Add explicit loading, success, and error states. Preserve user input on failure. Log friction points with analytics events.',
          'If OAuth or email auth is part of onboarding, design fallback paths and clear recovery messages. Auth confusion is a silent conversion killer.',
        ],
      },
      {
        heading: 'Content + app integration',
        paragraphs: [
          'For SaaS sites with docs, blogs, and product pages, keep shared layout primitives and tokenized components consistent. Visual inconsistency between marketing and app reduces trust.',
          'Use CMS or MDX for content velocity, but enforce a strict component layer so pages stay maintainable.',
        ],
      },
      {
        heading: 'Measure and iterate',
        paragraphs: [
          'Track step-level funnel events: CTA click, form start, form submit, verification, first key action. Frontend architecture should make these events easy to instrument.',
          'Conversion-focused frontend is iterative. Ship clean foundations, measure drop-off, and refine flows based on real user behavior.',
        ],
      },
    ],
  },
]

export const articles: Article[] = [...seoArticles, ...coreArticles]

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}
