export interface Tool {
  id: string
  name: string
  role: string
}

export const workflowTools: Tool[] = [
  { id: 'figma', name: 'Figma', role: 'Design' },
  { id: 'claude', name: 'Claude', role: 'AI Dev' },
  { id: 'cursor', name: 'Cursor', role: 'AI IDE' },
  { id: 'openai', name: 'ChatGPT', role: 'Strategy' },
  { id: 'gemini', name: 'Gemini', role: 'Research' },
  { id: 'nextjs', name: 'Next.js', role: 'Frontend' },
  { id: 'supabase', name: 'Supabase', role: 'Backend' },
  { id: 'flutter', name: 'Flutter', role: 'Mobile' },
  { id: 'webflow', name: 'Webflow', role: 'No-Code' },
  { id: 'wordpress', name: 'WordPress', role: 'CMS' },
  { id: 'github', name: 'GitHub', role: 'Ship' },
]
