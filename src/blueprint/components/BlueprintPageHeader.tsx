import type { ReactNode } from 'react'
import { useRef } from 'react'
import { SHEET, useBlueprintMotion } from '../lib/motion'
import { BlueprintGrid } from './BlueprintGrid'
import { BlueprintSectionLabel } from './BlueprintSectionLabel'

interface BlueprintPageHeaderProps {
  index: string
  label: string
  meta?: string
  title: string
  intro?: ReactNode
  children?: ReactNode
}

/** Opening block of an inner page: sheet label, title and intro over a fading drafting grid. */
export function BlueprintPageHeader({ index, label, meta, title, intro, children }: BlueprintPageHeaderProps) {
  const ref = useRef<HTMLElement>(null)
  useBlueprintMotion(ref, { scrub: false })

  return (
    <header ref={ref} className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-44">
      <BlueprintGrid className="opacity-70" />
      <div className={SHEET}>
        <BlueprintSectionLabel index={index} title={label} meta={meta} />
        <div className="mt-12 grid gap-8 md:mt-16 lg:grid-cols-12">
          <h1 data-reveal className="bp-heading text-5xl text-bp-text sm:text-6xl lg:col-span-8 lg:text-[96px]">
            {title}
          </h1>
          {intro && (
            <div data-reveal className="max-w-md self-end text-base leading-relaxed text-bp-muted lg:col-span-4">
              {intro}
            </div>
          )}
        </div>
        {children}
      </div>
    </header>
  )
}
