import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { getProject } from '../data/projects'
import { AccentButton } from '../components/AccentButton'
import { SECTION_PY } from '../lib/section'

export function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProject(slug) : undefined

  if (!project) {
    return (
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-32 text-center">
        <h1 className="text-2xl font-medium text-gray-900">Project not found</h1>
        <Link to="/work" className="mt-4 inline-block text-[#32C876] text-sm font-medium">
          ← Back to work
        </Link>
      </div>
    )
  }

  return (
    <>
      <div className="bg-[#EDF0ED] pt-28 sm:pt-32 pb-8 sm:pb-10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-[13px] text-gray-600 hover:text-[#32C876] transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            All projects
          </Link>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-medium text-[#28B866] bg-white border border-gray-200 rounded-full px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900">
            {project.title}
          </h1>
          <p className="mt-2 text-[16px] sm:text-[18px] text-gray-600">{project.subtitle}</p>

          <p className="mt-4 max-w-2xl text-[15px] sm:text-[16px] leading-[1.65] text-gray-600">
            {project.seoIntro}
          </p>

          <div className="mt-6 flex flex-wrap gap-4 text-[13px] text-gray-500">
            <span>{project.role}</span>
            <span>·</span>
            <span>{project.year}</span>
            <span>·</span>
            <span>{project.tools.join(', ')}</span>
          </div>
        </div>
      </div>

      <div className={`${project.bg}`}>
        <div className="max-w-[1440px] mx-auto">
          {project.video ? (
            <video
              src={project.video}
              autoPlay
              muted
              loop
              playsInline
              className="w-full max-h-[70vh] object-cover"
            />
          ) : (
            <img
              src={project.image}
              alt={project.title}
              className="w-full max-h-[70vh] object-cover"
            />
          )}
        </div>
      </div>

      <section className={`bg-white ${SECTION_PY}`}>
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 lg:gap-20">
            <div className="space-y-12">
              <div>
                <h2 className="text-[13px] font-semibold text-[#32C876] uppercase tracking-wider mb-4">
                  Overview
                </h2>
                <p className="text-[16px] sm:text-[18px] leading-[1.65] text-gray-700">
                  {project.overview}
                </p>
              </div>

              <div>
                <h2 className="text-[13px] font-semibold text-[#32C876] uppercase tracking-wider mb-4">
                  Challenge
                </h2>
                <p className="text-[15px] sm:text-[16px] leading-[1.65] text-gray-600">
                  {project.challenge}
                </p>
              </div>

              <div>
                <h2 className="text-[13px] font-semibold text-[#32C876] uppercase tracking-wider mb-4">
                  Approach
                </h2>
                <ul className="space-y-3">
                  {project.approach.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-[15px] sm:text-[16px] leading-[1.6] text-gray-600"
                    >
                      <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#3DDB84] mt-2.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-[13px] font-semibold text-[#32C876] uppercase tracking-wider mb-4">
                  Results
                </h2>
                <ul className="space-y-3">
                  {project.results.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-[15px] sm:text-[16px] leading-[1.6] text-gray-900 font-medium"
                    >
                      <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#3DDB84] mt-2.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {project.galleryImages && project.galleryImages.length > 0 && (
                <div className="space-y-5">
                  <h2 className="text-[13px] font-semibold text-[#32C876] uppercase tracking-wider">
                    More screens
                  </h2>
                  <div className="space-y-5">
                    {project.galleryImages.map((src) => (
                      <img
                        key={src}
                        src={src}
                        alt={`${project.title} UI design`}
                        className="w-full rounded-2xl border border-gray-100"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start space-y-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-[#EDF5F0] hover:bg-[#dff5ea] rounded-xl px-5 py-4 transition-colors group"
                >
                  <span className="text-[14px] font-semibold text-gray-900">
                    View live site
                  </span>
                  <ExternalLink
                    size={16}
                    className="text-[#32C876] group-hover:translate-x-0.5 transition-transform"
                  />
                </a>
              )}
              {project.contraUrl && (
                <a
                  href={project.contraUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 rounded-xl px-5 py-4 transition-colors group"
                >
                  <span className="text-[14px] font-semibold text-gray-900">
                    View on Contra
                  </span>
                  <ExternalLink size={16} className="text-gray-400" />
                </a>
              )}
              {project.behanceUrl && (
                <a
                  href={project.behanceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 rounded-xl px-5 py-4 transition-colors"
                >
                  <span className="text-[14px] font-semibold text-gray-900">
                    View on Behance
                  </span>
                  <ExternalLink size={16} className="text-gray-400" />
                </a>
              )}
              {project.figmaUrl && (
                <a
                  href={project.figmaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 rounded-xl px-5 py-4 transition-colors"
                >
                  <span className="text-[14px] font-semibold text-gray-900">
                    Figma prototype
                  </span>
                  <ExternalLink size={16} className="text-gray-400" />
                </a>
              )}
            </aside>
          </div>

          <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <Link
              to="/work"
              className="inline-flex items-center gap-2 text-[14px] font-medium text-gray-600 hover:text-[#32C876] transition-colors"
            >
              <ArrowLeft size={16} />
              All projects
            </Link>
            <AccentButton text="Start a project" href="/contact" />
          </div>
        </div>
      </section>
    </>
  )
}
