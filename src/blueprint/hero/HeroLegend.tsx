import { forwardRef, useImperativeHandle, useRef } from 'react'
import { siFigma, siFlutter, siWebflow } from 'simple-icons'
import { clamp01, cn } from '../lib/motion'
import type { FrameRenderer } from './types'

/** Progress at which each mark is drawn in the film, so the legend lights up in step with it. */
const rows = [
  { code: 'D.01', role: 'Product Designer', icon: siFigma.path, at: 0.17 },
  { code: 'D.02', role: 'Webflow Developer', icon: siWebflow.path, at: 0.29 },
  { code: 'D.03', role: 'Mobile App Developer', icon: siFlutter.path, at: 0.4 },
]

const DIM = 0.28

/**
 * Drawing legend shown under the film on portrait screens, where the 16:9 film alone leaves the stage mostly empty.
 * Each discipline lights up as its mark is constructed; the readout mirrors construction progress.
 */
export const HeroLegend = forwardRef<FrameRenderer, { complete?: boolean; className?: string }>(function HeroLegend(
  { complete, className },
  ref
) {
  const rowRefs = useRef<(HTMLLIElement | null)[]>([])
  const readoutRef = useRef<HTMLSpanElement>(null)

  useImperativeHandle(ref, () => ({
    setProgress(progress: number) {
      rows.forEach((row, i) => {
        const el = rowRefs.current[i]
        if (el) el.style.opacity = String(DIM + (1 - DIM) * clamp01((progress - row.at) / 0.08))
      })
      if (readoutRef.current) readoutRef.current.textContent = String(Math.round(progress * 100)).padStart(3, '0')
    },
  }))

  return (
    <div aria-hidden="true" className={cn('w-full max-w-md px-5', className)}>
      <div className="flex items-center justify-between border-b border-bp-cyan/25 pb-2.5">
        <span className="bp-label text-[9.5px] text-bp-cyan">Legend</span>
        <span className="bp-label text-[9.5px]">
          Construction{' '}
          <span ref={readoutRef} className="bp-num text-bp-cyan">
            {complete ? '100' : '000'}
          </span>{' '}
          %
        </span>
      </div>
      <ul>
        {rows.map((row, i) => (
          <li
            key={row.code}
            ref={(el) => {
              rowRefs.current[i] = el
            }}
            className="flex items-center gap-3.5 border-b border-bp-line py-3"
            style={{ opacity: complete ? 1 : DIM }}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="#42D9FF">
              <path d={row.icon} />
            </svg>
            <span className="text-[14px] tracking-tight text-bp-text">{row.role}</span>
            <span className="bp-label bp-num ml-auto text-[9.5px]">{row.code}</span>
          </li>
        ))}
      </ul>
    </div>
  )
})
