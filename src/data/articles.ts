import { seoArticles } from './article-seo'
import type { Article, ArticleImage } from './article-types'
export type { Article, ArticleCta, ArticleCtaLink, ArticleImage, ArticleSection } from './article-types'

const coreArticles: Article[] = [
  {
    slug: 'asa-oro-yoruba-word-game-flutter-case-study',
    category: 'Mobile App Case Study',
    title: "I Built a Yoruba Word Game to Help Save a Language That's Slowly Being Forgotten",
    seoTitle:
      'Aṣá Ọ̀rọ̀: The Flutter-Powered Yoruba Word Game Helping Preserve an Indigenous Language',
    date: 'Jun 2026',
    readTime: '14 min',
    excerpt:
      'Discover how I designed Aṣá Ọ̀rọ̀ in Figma and built it with Flutter to help preserve the Yoruba language through fun, educational word puzzles. Learn the story behind the app.',
    keywords: [
      'Yoruba word game',
      'learn Yoruba app',
      'Yoruba language learning app',
      'Flutter mobile game',
      'educational word game',
      'indigenous language preservation',
      'Figma to Flutter',
      'Yoruba vocabulary game',
      'African language app',
      'mobile app case study',
      'educational Flutter app',
    ],
    ogImage: {
      src: '/images/asa-oro/onboarding-flow.png',
      alt: 'Aṣá Ọ̀rọ̀ Yoruba word game splash, onboarding, and main menu screens',
      width: 1001,
      height: 1024,
    },
    relatedProjectSlug: 'asa-oro',
    sections: [
      {
        paragraphs: [
          'For thousands of years, language has been more than just a way to communicate.',
          'It carries history. It preserves culture. It connects generations.',
          'But today, something heartbreaking is happening.',
          'Across Africa—and especially among younger generations—many people can understand their ancestral language but struggle to speak it confidently. Some cannot read it at all. Others only hear it when visiting grandparents or during traditional ceremonies.',
          'The language slowly disappears... not because people hate it, but because they no longer have opportunities to use it.',
          'That realization inspired me to build Aṣá Ọ̀rọ̀.',
          'A mobile word game designed to make learning Yoruba feel fun again.',
          'Not like a classroom. Not like homework. But like play.',
        ],
      },
      {
        heading: 'Why I Created Aṣá Ọ̀rọ̀',
        paragraphs: [
          'Growing up, I noticed something changing.',
          'Children increasingly spoke English. Schools focused almost entirely on English. Parents often switched to English at home because it felt more practical.',
          'Slowly, conversations that once happened naturally in Yoruba became rare.',
          "The scary part isn't that English is growing. The scary part is that many indigenous languages are shrinking.",
          "When a language disappears, we don't only lose words. We lose stories. We lose traditions. We lose identity.",
          "I wanted to build something that could help preserve Yoruba in a way today's generation actually enjoys. Not another dictionary. Not another textbook. A game.",
        ],
      },
      {
        heading: 'Learning Through Play Works',
        paragraphs: [
          "People don't realize how much we learn through games.",
          'Children memorize Pokémon. Adults solve Wordle every day. Millions spend hours on crossword puzzles and word searches.',
          "Games create repetition without boredom. That's exactly the experience I wanted.",
          "Every level introduces Yoruba letters, words, and vocabulary naturally. Players don't feel like they're studying. They're simply solving puzzles.",
          "And before long, they're recognizing patterns and remembering words. Learning becomes effortless.",
        ],
      },
      {
        heading: 'Designing the Experience in Figma',
        paragraphs: [
          'Before writing a single line of Flutter code, everything started inside Figma.',
          "I spent weeks exploring different ideas. My goal wasn't just to make another mobile game. I wanted every screen to reflect African culture while remaining clean, modern, and playful.",
        ],
        listItems: [
          'Warm African-inspired colors',
          'Friendly typography',
          'Cartoon-inspired illustrations',
          'Large touch targets for younger players',
          'Simple navigation',
          'Reward systems that encourage learning',
        ],
        image: {
          src: '/images/asa-oro/onboarding-flow.png',
          alt: 'Aṣá Ọ̀rọ̀ onboarding screens showing splash, learn-through-play intro, and main menu with Play, Daily Puzzle, and Settings',
          caption: 'Onboarding and main menu screens designed in Figma with African-inspired colors and playful typography.',
        },
      },
      {
        paragraphs: [
          'Even the logo was carefully designed to resemble a traditional carved wooden sign, giving players an immediate connection to African heritage.',
          'The onboarding screens introduce the purpose of the game before players begin solving their first puzzle.',
          'Every design decision asked one question: "Will this encourage someone to keep learning Yoruba?"',
        ],
      },
      {
        heading: 'Bringing the Design to Life with Flutter',
        paragraphs: [
          'After completing the UI in Figma, I rebuilt the entire application using Flutter.',
          'Flutter allowed me to create a smooth experience for both Android and iOS from a single codebase.',
        ],
        listItems: [
          'Interactive word puzzles',
          'Progressive difficulty levels',
          'Daily puzzle mode',
          'Player progression',
          'Score tracking',
          'Hearts and reward system',
          'Responsive animations',
          'Settings customization',
          'Offline gameplay support',
          'Cross-platform performance',
        ],
        image: {
          src: '/images/asa-oro/gameplay-levels.png',
          alt: 'Aṣá Ọ̀rọ̀ gameplay screens showing level selection grid, word puzzle board, and settings panel',
          caption: 'Level progression, interactive word puzzles, and in-game settings built in Flutter.',
        },
      },
      {
        paragraphs: [
          'Using Flutter also means updates can be released quickly while maintaining a consistent experience across devices.',
          'As both the designer and developer, I had complete control over every interaction—from the smallest animation to the overall gameplay flow.',
        ],
      },
      {
        heading: 'More Than a Game',
        paragraphs: [
          "Aṣá Ọ̀rọ̀ isn't trying to replace schools. It isn't trying to replace teachers.",
          "It's creating something many language learners are missing: consistency.",
          'Five minutes of play every day is far more sustainable than trying to memorize long vocabulary lists.',
          'Over time, small moments become lasting knowledge. This approach makes language learning feel natural instead of overwhelming.',
        ],
      },
      {
        heading: 'Why Indigenous Languages Need Technology',
        paragraphs: [
          'Technology has helped spread global languages faster than ever before. Unfortunately, many local languages have not received the same attention.',
        ],
        listItems: [
          'Spanish',
          'French',
          'German',
          'Japanese',
          'Korean',
          'Chinese',
        ],
      },
      {
        paragraphs: [
          'But African languages remain underrepresented. That is a missed opportunity.',
          'There are millions of Yoruba speakers around the world. There are also countless second-generation Africans who want to reconnect with their roots but do not know where to begin.',
          'Mobile technology gives us an opportunity to bridge that gap. Instead of waiting for traditional education to evolve, we can build experiences that people already enjoy using.',
        ],
      },
      {
        heading: 'The Bigger Vision',
        paragraphs: [
          'Although Aṣá Ọ̀rọ̀ begins with Yoruba, the vision extends much further.',
          'Imagine children learning Igbo, Hausa, Swahili, Twi, Zulu, Xhosa, Amharic, and Efik using engaging games instead of intimidating textbooks.',
          "Language preservation doesn't have to feel like preservation. It can simply feel like fun.",
        ],
      },
      {
        heading: 'Building for the Next Generation',
        paragraphs: [
          'One of my biggest motivations was thinking about future generations.',
          'Imagine a child growing up outside Nigeria. Their grandparents speak Yoruba. Their parents understand it. But the child does not.',
          "Without tools designed for today's world, that cultural connection gradually fades.",
          'A simple mobile game cannot solve everything. But it can start conversations. It can spark curiosity. It can encourage practice.',
          "And sometimes, that's enough to begin rebuilding a connection that seemed lost.",
        ],
        image: {
          src: '/images/asa-oro/home-screens.png',
          alt: 'Aṣá Ọ̀rọ̀ home screen with name input, level completed celebration, and settings overlay',
          caption: 'Player onboarding, level completion rewards, and customizable settings.',
        },
      },
      {
        heading: 'Challenges Along the Way',
        paragraphs: [
          "Like every software project, this journey wasn't straightforward.",
          'Transforming static Figma designs into a fully interactive Flutter application meant solving dozens of technical challenges.',
          'I refined layouts, adjusted animations, optimized screen responsiveness, tested gameplay interactions, and continually improved the overall user experience.',
          "The goal wasn't simply to make the app functional. It had to feel polished, intuitive, and enjoyable from the very first tap.",
          'Every iteration brought the experience closer to what I originally imagined.',
        ],
      },
      {
        heading: 'Why I Chose Flutter',
        paragraphs: [
          'Flutter gave me the flexibility to build a high-performance educational game without maintaining separate codebases for Android and iOS.',
        ],
        listItems: [
          'Faster development',
          'Beautiful animations',
          'Native performance',
          'Consistent UI across devices',
          'Easy future scalability',
          'Strong community support',
        ],
      },
      {
        paragraphs: [
          'For independent developers building ambitious ideas, Flutter continues to be one of the best frameworks available.',
        ],
      },
      {
        heading: "What's Next for Aṣá Ọ̀rọ̀",
        paragraphs: ['This is only the beginning.'],
        listItems: [
          'Thousands of Yoruba words',
          'New puzzle mechanics',
          'Audio pronunciation',
          'Daily challenges',
          'Leaderboards',
          'Achievement badges',
          'Multiplayer competitions',
          'Seasonal events',
          'More learning categories',
        ],
      },
      {
        paragraphs: [
          'The long-term goal is simple: make learning Yoruba as enjoyable as playing your favorite mobile game.',
        ],
      },
      {
        heading: 'Final Thoughts',
        paragraphs: [
          'We often think language disappears overnight. It does not.',
          'It fades quietly. One conversation at a time. One generation at a time. One family at a time.',
          'But technology also has the power to reverse that trend.',
          'Aṣá Ọ̀rọ̀ is my contribution to preserving a language that has shaped millions of lives for centuries.',
          "It's where design meets culture. Where Flutter meets education. Where technology helps reconnect people with their identity.",
          'If even one child learns a new Yoruba word, speaks more confidently with a grandparent, or develops pride in their heritage because of this game, then every hour spent designing and building it will have been worthwhile.',
          'The journey started with an idea in Figma. Soon, it will live on the App Store and Google Play, ready to help people around the world rediscover the beauty of the Yoruba language—one puzzle at a time.',
        ],
      },
    ],
  },
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

export const articles: Article[] = [
  coreArticles[0],
  ...seoArticles,
  ...coreArticles.slice(1),
]

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}

export function getArticleOgImage(article: Article): ArticleImage | undefined {
  if (article.ogImage) return article.ogImage
  for (const section of article.sections) {
    if (section.image) return section.image
  }
  return undefined
}
