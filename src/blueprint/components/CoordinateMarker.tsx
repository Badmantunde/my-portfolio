import { cn } from '../lib/motion'

interface CoordinateMarkerProps {
  label?: string
  className?: string
}

/** Registration crosshair with an optional coordinate readout. */
export function CoordinateMarker({ label, className }: CoordinateMarkerProps) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <svg aria-hidden="true" width="13" height="13" viewBox="0 0 13 13" className="shrink-0">
        <circle cx="6.5" cy="6.5" r="3" fill="none" stroke="rgba(66,217,255,0.55)" strokeWidth="1" />
        <path d="M6.5 0v13M0 6.5h13" stroke="rgba(66,217,255,0.55)" strokeWidth="1" />
      </svg>
      {label && <span className="bp-label bp-num text-[9.5px]">{label}</span>}
    </span>
  )
}
