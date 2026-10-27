import { forwardRef } from 'react'

/** "Scroll to construct" cue with a drafting line; the hero fades it out as construction begins. */
export const ScrollIndicator = forwardRef<HTMLDivElement>(function ScrollIndicator(_, ref) {
  return (
    <div ref={ref} className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3">
      <span className="bp-label whitespace-nowrap text-bp-text/80">Scroll to construct</span>
      <span aria-hidden="true" className="relative block h-12 w-px overflow-hidden bg-bp-cyan/15">
        <span className="absolute inset-x-0 top-0 h-1/2 animate-[bpDrop_2.4s_cubic-bezier(0.65,0,0.35,1)_infinite] bg-bp-cyan motion-reduce:animate-none" />
      </span>
    </div>
  )
})
