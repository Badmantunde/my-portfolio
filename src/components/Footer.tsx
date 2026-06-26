import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { WorldClock } from './WorldClock'
import { projects } from '../data/projects'
import { articles } from '../data/articles'
import { workflowTools } from '../data/tools'
import { socialLinks } from '../data/social'
import { contact } from '../data/contact'

const navLinks = [
  { label: 'Work', to: '/work' },
  { label: 'About', to: '/about' },
  { label: 'Process', to: '/process' },
  { label: 'Writing', to: '/writing' },
  { label: 'Contact', to: '/contact' },
]

export function Footer() {
  return (
    <footer className="bg-gray-950 text-white">
      <div className="h-px bg-gradient-to-r from-transparent via-[#3DDB84]/40 to-transparent" />

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-14 sm:pt-16 lg:pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block group">
              <p className="text-[12px] sm:text-[13px] font-bold tracking-[0.1em] text-white uppercase group-hover:text-[#3DDB84] transition-colors">
                Abiola Babatunde
              </p>
              <p className="mt-1 text-[12px] text-gray-400">Product Engineer</p>
            </Link>

            <p className="mt-5 text-[14px] leading-[1.65] text-gray-400 max-w-xs">
              Product design, UI/UX design, software development, and website
              design for startups. Webflow developer and WordPress developer based
              in Lagos, shipping with Next.js, Supabase, and AI-native workflows.
            </p>

            <div className="mt-5 inline-flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-full px-4 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3DDB84] opacity-40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3DDB84]" />
              </span>
              <span className="text-[12px] font-medium text-[#3DDB84]">
                Available Q2 2026
              </span>
            </div>
          </div>

          {/* Navigate */}
          <div className="lg:col-span-2">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Navigate
            </p>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-[14px] text-gray-300 hover:text-[#3DDB84] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/#stack"
                  className="text-[14px] text-gray-300 hover:text-[#3DDB84] transition-colors duration-300"
                >
                  Stack
                </Link>
              </li>
            </ul>
          </div>

          {/* Selected work */}
          <div className="lg:col-span-2">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Selected work
            </p>
            <ul className="space-y-2.5">
              {projects.slice(0, 5).map((project) => (
                <li key={project.slug}>
                  <Link
                    to={`/work/${project.slug}`}
                    className="group flex items-center justify-between gap-2 text-[14px] text-gray-300 hover:text-white transition-colors"
                  >
                    <span className="truncate">{project.title}</span>
                    <ArrowUpRight
                      size={13}
                      className="shrink-0 text-gray-600 group-hover:text-[#3DDB84] transition-colors"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Writing */}
          <div className="lg:col-span-2">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Writing
            </p>
            <ul className="space-y-2.5">
              {articles.slice(0, 6).map((article) => (
                <li key={article.slug}>
                  <Link
                    to={`/writing/${article.slug}`}
                    className="group flex items-start justify-between gap-2 text-[14px] text-gray-300 hover:text-white transition-colors"
                  >
                    <span className="line-clamp-2">{article.title}</span>
                    <ArrowUpRight
                      size={13}
                      className="shrink-0 mt-0.5 text-gray-600 group-hover:text-[#3DDB84] transition-colors"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="lg:col-span-2">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Connect
            </p>
            <a
              href={`mailto:${contact.email}`}
              className="block text-[14px] text-gray-300 hover:text-[#3DDB84] transition-colors"
            >
              {contact.email}
            </a>
            <a
              href={contact.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-[14px] text-gray-400 hover:text-[#3DDB84] transition-colors mt-2 mb-4"
            >
              {contact.whatsapp.display} · WhatsApp
            </a>

            <WorldClock
              className="mb-5"
              iconSize={13}
              textClassName="text-gray-400"
              iconClassName="text-gray-400"
            />

            <ul className="space-y-2">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[13px] text-gray-400 hover:text-[#3DDB84] transition-colors"
                  >
                    {link.label}
                    <ArrowUpRight size={12} />
                  </a>
                </li>
              ))}
            </ul>

            <Link
              to="/contact"
              className="mt-6 group inline-flex items-center gap-2 bg-[#15803d] hover:bg-[#166534] text-white text-[13px] font-medium rounded-full pl-5 pr-2 py-2 transition-colors"
            >
              <span>Book a discovery call</span>
              <span className="flex items-center justify-center w-6 h-6 bg-white rounded-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45">
                <ArrowRight size={13} className="text-[#15803d]" />
              </span>
            </Link>
          </div>
        </div>

        {/* Tool stack strip */}
        <div className="mt-12 sm:mt-14 pt-8 border-t border-white/10">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {workflowTools.map((tool) => (
              <span
                key={tool.id}
                className="text-[11px] font-medium text-gray-400 border border-white/10 bg-white/5 rounded-full px-3 py-1 hover:border-[#3DDB84]/30 hover:text-gray-300 transition-colors"
              >
                {tool.name}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[12px] text-gray-400">
            © 2026 Abiola Babatunde · Product Engineer
          </p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-[12px] text-gray-400">
            <span>Strategy · Design · Engineering · AI</span>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-1 text-gray-400 hover:text-[#3DDB84] transition-colors"
            >
              Back to top
              <ArrowRight size={12} className="-rotate-90" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
