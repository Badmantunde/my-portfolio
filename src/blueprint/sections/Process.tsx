import { useRef } from 'react'
import { processStages } from '../../data/blueprint'
import { BlueprintSectionLabel } from '../components/BlueprintSectionLabel'
import { StageLine } from '../components/StageLine'
import { SHEET, useBlueprintMotion } from '../lib/motion'

/** Five stages on one datum line that draws itself with the section's scroll position. */
export function Process({ index = '04' }: { index?: string }) {
  const ref = useRef<HTMLElement>(null)
  useBlueprintMotion(ref)

  return (
    <section ref={ref} aria-labelledby="bp-process-title" className="relative border-t border-bp-line py-28 md:py-40">
      <div className={SHEET}>
        <BlueprintSectionLabel index={index} title="Process" meta="Sequence 01 to 05" />
        <h2 id="bp-process-title" data-reveal className="bp-heading mt-12 max-w-4xl text-5xl text-bp-text sm:text-6xl md:mt-16 lg:text-[80px]">
          Every product starts with a structure.
        </h2>
        <StageLine stages={processStages} className="mt-20 md:mt-28" />
      </div>
    </section>
  )
}
