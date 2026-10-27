import type { ReactNode } from 'react'
import { cn } from '../lib/motion'

interface BlueprintAnnotationProps {
  children: ReactNode
  className?: string
  /** Short leader line drawn before or after the note. */
  leader?: 'before' | 'after'
  accent?: boolean
}

/** Small uppercase technical note, optionally with a drafting leader line. */
export function BlueprintAnnotation({ children, className, leader, accent }: BlueprintAnnotationProps) {
  const line = <span aria-hidden="true" className="h-px w-6 shrink-0 bg-bp-cyan/40" />
  return (
    <span className={cn('bp-label inline-flex items-center gap-2.5', accent && 'text-bp-cyan', className)}>
      {leader === 'before' && line}
      <span>{children}</span>
      {leader === 'after' && line}
    </span>
  )
}
