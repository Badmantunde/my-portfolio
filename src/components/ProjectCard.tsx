import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink } from 'lucide-react'
import type { Project } from '../data/projects'

function LinkIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  )
}

interface ProjectCardProps {
  project: Project
  variant?: 'light' | 'green'
}

export function ProjectCard({ project, variant = 'light' }: ProjectCardProps) {
  const isGreen = variant === 'green'
  const to = `/work/${project.slug}`
  const cta = project.type === 'live' ? 'View project' : 'View case study'
  const pillBg = isGreen ? 'bg-[#15803d] group-hover:bg-[#166534]' : 'bg-white'
  const pillText = isGreen ? 'text-white' : 'text-gray-900'
  const pillWidth = isGreen ? 'group-hover:w-[168px]' : 'group-hover:w-[148px]'

  return (
    <article>
      <Link
        to={to}
        className={`relative block aspect-[4/3] rounded-2xl overflow-hidden ${project.bg} group cursor-pointer`}
      >
        {project.video ? (
          <video
            src={project.video}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        )}

        <div
          className={`absolute bottom-4 left-4 flex items-center h-9 w-9 ${pillWidth} ${pillBg} rounded-full overflow-hidden transition-all duration-300 ease-in-out`}
        >
          <span
            className={`opacity-0 group-hover:opacity-100 delay-100 transition-opacity duration-300 text-[13px] font-medium ${pillText} whitespace-nowrap pl-4`}
          >
            {cta}
          </span>
          <span className="flex items-center justify-center w-9 h-9 shrink-0 transition-transform duration-300 ease-in-out -rotate-45 group-hover:rotate-0">
            {isGreen ? (
              <ArrowRight size={14} className="text-white" />
            ) : (
              <LinkIcon />
            )}
          </span>
        </div>
      </Link>

      <div className="flex items-start justify-between gap-3 mt-4">
        <div>
          <p className="text-[13px] sm:text-[14px] text-gray-600 leading-relaxed">
            {project.description}
          </p>
          <h3 className="text-[14px] sm:text-[15px] font-semibold text-gray-900 mt-1">
            {project.title}
            <span className="font-normal text-gray-500"> · {project.subtitle}</span>
          </h3>
        </div>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 mt-1 text-gray-400 hover:text-[#32C876] transition-colors"
            aria-label={`Visit ${project.title} live site`}
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={16} />
          </a>
        )}
      </div>
    </article>
  )
}
