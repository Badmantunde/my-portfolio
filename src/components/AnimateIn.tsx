import { useEffect, useState, type ElementType, type ReactNode } from 'react'
import { useInView } from '../hooks/useInView'

export type MotionVariant = 'fade-up' | 'fade-in' | 'scale-up' | 'slide-left' | 'slide-right'

interface AnimateInProps {
  children: ReactNode
  className?: string
  variant?: MotionVariant
  delay?: number
  immediate?: boolean
  as?: ElementType
}

export function AnimateIn({
  children,
  className = '',
  variant = 'fade-up',
  delay = 0,
  immediate = false,
  as: Component = 'div',
}: AnimateInProps) {
  const { ref, inView } = useInView<HTMLElement>()
  const [immediateVisible, setImmediateVisible] = useState(immediate)

  useEffect(() => {
    if (!immediate) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setImmediateVisible(true)
      return
    }

    const timer = window.setTimeout(() => setImmediateVisible(true), 50)
    return () => window.clearTimeout(timer)
  }, [immediate])

  const visible = immediate ? immediateVisible : inView

  return (
    <Component
      ref={ref}
      className={`motion-reveal motion-${variant}${visible ? ' motion-visible' : ''}${className ? ` ${className}` : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Component>
  )
}
