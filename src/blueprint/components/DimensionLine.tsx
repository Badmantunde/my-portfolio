import { cn } from '../lib/motion'

interface DimensionLineProps {
  label: string
  className?: string
}

/** Architectural dimension: slashed end ticks, a hairline, and the measurement centred in a gap. */
export function DimensionLine({ label, className }: DimensionLineProps) {
  const tick = <span aria-hidden="true" className="h-2.5 w-px shrink-0 rotate-45 bg-bp-cyan/70" />
  const rule = <span aria-hidden="true" className="h-px flex-1 bg-bp-cyan/25" />
  return (
    <div className={cn('flex items-center gap-2', className)}>
      {tick}
      {rule}
      <span className="bp-label shrink-0 px-1 text-[9.5px] text-bp-cyan/80">{label}</span>
      {rule}
      {tick}
    </div>
  )
}
