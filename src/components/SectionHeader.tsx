import type { ReactNode } from 'react'

interface SectionHeaderProps {
  label: string
  heading: ReactNode
  headingClassName?: string
  borderClassName?: string
  className?: string
}

export function SectionHeader({
  label,
  heading,
  headingClassName = 'text-[clamp(1.5rem,4vw,3.2rem)] font-medium leading-[1.12] tracking-[-0.02em]',
  borderClassName = 'border-gray-200',
  className = '',
}: SectionHeaderProps) {
  return (
    <div className={className}>
      <div className="flex items-center gap-3 mb-6 sm:mb-8">
        <span
          className={`text-[12px] sm:text-[13px] font-medium border ${borderClassName} rounded-full px-3 sm:px-4 py-1 sm:py-1.5`}
        >
          {label}
        </span>
      </div>
      <h2 className={`text-gray-900 ${headingClassName}`}>{heading}</h2>
    </div>
  )
}
