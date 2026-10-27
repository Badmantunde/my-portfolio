import { cn } from '../lib/motion'

interface BlueprintSectionLabelProps {
  index: string
  title: string
  meta?: string
  className?: string
}

/** Sheet identifier, e.g. "02 / Selected Work", followed by a rule to the margin. */
export function BlueprintSectionLabel({ index, title, meta, className }: BlueprintSectionLabelProps) {
  return (
    <div className={cn('flex items-center gap-4', className)}>
      <span className="bp-label bp-num text-bp-cyan">
        {index} / {title}
      </span>
      <span aria-hidden="true" className="h-px flex-1 bg-bp-line" />
      {meta && <span className="bp-label hidden sm:inline">{meta}</span>}
    </div>
  )
}
