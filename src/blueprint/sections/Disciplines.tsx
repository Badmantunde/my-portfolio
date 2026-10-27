import { useRef } from 'react'
import { disciplines, type DisciplineId } from '../../data/blueprint'
import { BlueprintSectionLabel } from '../components/BlueprintSectionLabel'
import { ConstructionLine } from '../components/ConstructionLine'
import { SHEET, useBlueprintMotion } from '../lib/motion'

const stroke = {
  fill: 'none',
  stroke: 'rgba(66,217,255,0.75)',
  strokeWidth: 1,
  pathLength: 1,
  className: 'bp-draw',
  'data-draw': '',
}
const faint = { ...stroke, stroke: 'rgba(66,217,255,0.3)' }

/** Small technical drawing per discipline, drawn line by line on scroll. */
function DisciplineDiagram({ id }: { id: DisciplineId }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 220 140" className="h-auto w-full max-w-[260px]">
      {id === 'product' && (
        <>
          <rect x="10" y="14" width="88" height="112" {...stroke} />
          <path d="M10 32H98M22 48H70M22 58H86M22 68H60" {...faint} />
          <rect x="22" y="82" width="64" height="30" {...faint} />
          <rect x="122" y="14" width="88" height="112" {...stroke} />
          <path d="M122 32H210M134 48H180M134 92H198M134 102H176" {...faint} />
          <circle cx="166" cy="70" r="12" {...faint} />
          <path d="M98 70C108 70 112 52 122 52" {...stroke} />
          <path d="M150 112L156 126L159 119L166 116Z" {...stroke} />
        </>
      )}
      {id === 'web' && (
        <>
          <rect x="10" y="14" width="200" height="112" {...stroke} />
          <path d="M10 32H210" {...stroke} />
          <circle cx="22" cy="23" r="3" {...faint} />
          <circle cx="32" cy="23" r="3" {...faint} />
          <path d="M26 46H110M26 56H90M26 76H194M26 86H194M26 96H150" {...faint} />
          <rect x="132" y="42" width="62" height="24" {...faint} />
          <path d="M84 112L72 104L84 96M136 96L148 104L136 112M116 94L104 114" {...stroke} />
        </>
      )}
      {id === 'mobile' && (
        <>
          <rect x="74" y="6" width="72" height="128" rx="12" {...stroke} />
          <path d="M98 16H122M100 124H120" {...stroke} />
          <rect x="84" y="28" width="52" height="30" {...faint} />
          <path d="M84 68H136M84 78H120M84 92H136M84 102H112" {...faint} />
          <path d="M146 34H184M184 30V38M146 106H184M184 102V110M184 34V106" {...faint} />
          <path d="M36 34H74M36 70H74M36 106H74" {...faint} />
          <circle cx="32" cy="34" r="3" {...stroke} />
          <circle cx="32" cy="70" r="3" {...stroke} />
          <circle cx="32" cy="106" r="3" {...stroke} />
        </>
      )}
    </svg>
  )
}

export function Disciplines({ index = '03' }: { index?: string }) {
  const ref = useRef<HTMLElement>(null)
  useBlueprintMotion(ref, { start: 'top 75%', end: 'center 45%', stagger: 0.03 })

  return (
    <section
      ref={ref}
      aria-labelledby="bp-disciplines-title"
      className="relative border-t border-bp-line bg-bp-deep/25 py-28 md:py-40"
    >
      <div className={SHEET}>
        <BlueprintSectionLabel index={index} title="Disciplines" meta="One practice, three trades" />
        <h2 id="bp-disciplines-title" data-reveal className="bp-heading mt-12 max-w-3xl text-5xl text-bp-text sm:text-6xl md:mt-16 lg:text-[80px]">
          Design meets technology.
        </h2>

        <div className="relative mt-20 md:mt-28">
          {/* The shared beam that ties the three disciplines into one practice */}
          <div className="absolute inset-x-0 top-[7px] hidden md:block">
            <ConstructionLine tone="mid" />
          </div>
          <div className="absolute bottom-0 left-[7px] top-0 md:hidden">
            <ConstructionLine orientation="vertical" tone="mid" />
          </div>

          <ol className="grid gap-16 md:grid-cols-3 md:gap-10">
            {disciplines.map((discipline) => (
              <li key={discipline.id} className="relative pl-10 md:pl-0">
                <span aria-hidden="true" className="absolute left-0 top-0 flex h-[15px] w-[15px] items-center justify-center border border-bp-cyan/70 bg-bp-ink">
                  <span className="h-[5px] w-[5px] bg-bp-cyan" />
                </span>
                <div className="md:pt-12">
                  <span className="bp-label bp-num text-bp-cyan">{discipline.code}</span>
                  <div className="mt-8 border-y border-bp-line py-8">
                    <DisciplineDiagram id={discipline.id} />
                  </div>
                  <h3 data-reveal className="mt-8 text-2xl font-normal tracking-tight text-bp-text">
                    {discipline.title}
                  </h3>
                  <p data-reveal className="mt-4 max-w-sm text-[15px] leading-relaxed text-bp-muted">
                    {discipline.body}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
                    {discipline.tools.map((tool) => (
                      <li key={tool} className="bp-label text-[9.5px] text-bp-text/70">
                        + {tool}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
