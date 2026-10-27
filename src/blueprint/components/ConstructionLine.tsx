import { cn } from '../lib/motion'

interface ConstructionLineProps {
  orientation?: 'horizontal' | 'vertical'
  className?: string
  /** Grow from its origin with useBlueprintMotion. */
  draw?: boolean
  tone?: 'faint' | 'mid' | 'accent'
}

const tones = {
  faint: 'bg-bp-cyan/30',
  mid: 'bg-bp-cyan/45',
  accent: 'bg-bp-cyan',
}

/**
 * Straight 1px drafting line that fills its box. Drawn by scaling from its origin rather than with SVG dashes,
 * which stay crisp at any length (stretched SVG strokes lose pathLength under non-scaling-stroke in Chrome).
 */
export function ConstructionLine({ orientation = 'horizontal', className, draw = true, tone = 'faint' }: ConstructionLineProps) {
  const horizontal = orientation === 'horizontal'
  return (
    <span
      aria-hidden="true"
      data-grow={draw ? (horizontal ? 'x' : 'y') : undefined}
      className={cn('block', horizontal ? 'h-px w-full origin-left' : 'h-full w-px origin-top', tones[tone], className)}
    />
  )
}
