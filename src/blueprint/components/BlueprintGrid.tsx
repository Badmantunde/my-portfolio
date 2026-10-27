import { cn } from '../lib/motion'

interface BlueprintGridProps {
  className?: string
  /** Fades the grid out toward the edges so it never ends on a hard line. */
  vignette?: boolean
}

/** CSS drafting grid: fine 24px cells inside 120px major cells. */
export function BlueprintGrid({ className, vignette = true }: BlueprintGridProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('bp-grid pointer-events-none absolute inset-0', className)}
      style={
        vignette
          ? {
              maskImage: 'radial-gradient(ellipse 90% 80% at 50% 45%, #000 40%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 50% 45%, #000 40%, transparent 100%)',
            }
          : undefined
      }
    />
  )
}
