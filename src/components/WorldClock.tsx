import { Clock } from 'lucide-react'
import { useWorldClock } from '../hooks/useWorldClock'

interface WorldClockProps {
  className?: string
  showIcon?: boolean
  iconSize?: number
  textClassName?: string
  iconClassName?: string
}

export function WorldClock({
  className = '',
  showIcon = true,
  iconSize = 14,
  textClassName = 'text-gray-600',
  iconClassName = 'text-gray-600',
}: WorldClockProps) {
  const { time, city } = useWorldClock()

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      {showIcon && <Clock size={iconSize} className={`shrink-0 ${iconClassName}`} />}
      <span className="relative inline-block overflow-hidden h-[18px] min-w-[148px] sm:min-w-[168px]">
        <span
          key={city}
          className={`absolute left-0 top-0 whitespace-nowrap text-[13px] ${textClassName} animate-[slideUp_0.5s_cubic-bezier(0.25,0.1,0.25,1)_forwards]`}
        >
          {time} in {city}
        </span>
      </span>
    </div>
  )
}
