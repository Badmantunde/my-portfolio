import { contact } from './contact'

export interface FAQ {
  question: string
  answer: string
}

export const faqs: FAQ[] = [
  {
    question: 'What kind of product designer are you?',
    answer:
      'A product designer who also builds. I do the research, flows, and UI in Figma, then ship the result in Webflow, Shopify, Next.js, or Flutter. You work with one person from first sketch to live product, so design decisions survive the build.',
  },
  {
    question: 'How does building my own designs change the design work?',
    answer:
      'I design with real constraints in mind: CMS structure, theme sections, data, and screen sizes. When something does not work in code, I change the design myself instead of filing a handoff ticket, which keeps the final product close to what we agreed on.',
  },
  {
    question: 'What have you shipped?',
    answer:
      'Shipped work includes ValGo, a food delivery app built in Flutter on Supabase, the Shight Running Club membership platform (Next.js and Supabase), the JWYN Shopify store for a Lagos retailer, and Aṣá Ọ̀rọ̀, a Yoruba word game built in Flutter. I have also designed mobile apps and websites for fintech, Web3, music, beauty, and AgriTech clients.',
  },
  {
    question: 'What does your process look like from kickoff to launch?',
    answer:
      'Discovery and goals first, then user flows and wireframes, then high-fidelity UI and a design system in Figma. After you sign off, I build in the right platform for the job, test on real devices, and hand over with documentation so your team can update the product.',
  },
  {
    question: 'How do you use AI in your workflow?',
    answer:
      'AI speeds up research, copy iteration, prototyping, and code generation. Product decisions, UX quality, and engineering standards stay human-led. Across projects this has made delivery up to 7× faster.',
  },
  {
    question: 'How do we get started?',
    answer:
      `Send a message through the contact page, email ${contact.email}, or message me on WhatsApp at ${contact.whatsapp.display}. Share your goals, timeline, and any existing designs or code. I will reply with a clear recommendation on scope, approach, and next steps.`,
  },
]
