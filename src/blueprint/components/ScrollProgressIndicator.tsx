import { useEffect, useRef } from 'react'
import { getGsap } from '../lib/motion'

/** Fixed vertical scale on the right margin that tracks page progress. Desktop only. */
export function ScrollProgressIndicator() {
  const fillRef = useRef<HTMLSpanElement>(null)
  const valueRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const { ScrollTrigger } = getGsap()
    const trigger = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        if (fillRef.current) fillRef.current.style.transform = `scaleY(${self.progress})`
        if (valueRef.current) valueRef.current.textContent = String(Math.round(self.progress * 100)).padStart(3, '0')
      },
    })
    return () => trigger.kill()
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex"
    >
      <span ref={valueRef} className="bp-label bp-num text-[9.5px] text-bp-cyan">
        000
      </span>
      <span className="relative h-40 w-px bg-bp-cyan/15">
        {Array.from({ length: 11 }, (_, i) => (
          <span
            key={i}
            className={`absolute left-1/2 h-px -translate-x-1/2 bg-bp-cyan/30 ${i % 5 === 0 ? 'w-3' : 'w-1.5'}`}
            style={{ top: `${i * 10}%` }}
          />
        ))}
        <span ref={fillRef} className="absolute inset-0 origin-top bg-bp-cyan" style={{ transform: 'scaleY(0)' }} />
      </span>
      <span className="bp-label text-[9.5px] [writing-mode:vertical-rl]">Sheet progress</span>
    </div>
  )
}
