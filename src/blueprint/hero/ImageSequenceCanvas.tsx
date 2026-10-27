import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import type { FrameRenderer } from './types'

interface ImageSequenceCanvasProps {
  frameCount: number
  frameUrl: (index: number) => string
  className?: string
  onError: () => void
}

/**
 * Frame-accurate alternative to video scrubbing: progress maps to a frame index drawn on a canvas.
 * Loads the first frame, then a coarse pass (every 8th frame), then fills in the rest, so scrubbing
 * works early and sharpens as frames arrive. Draws the nearest loaded frame in the meantime.
 */
export const ImageSequenceCanvas = forwardRef<FrameRenderer, ImageSequenceCanvasProps>(
  function ImageSequenceCanvas({ frameCount, frameUrl, className, onError }, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const frames = useRef<(HTMLImageElement | null)[]>([])
    const state = useRef({ target: 0, drawn: -1, raf: 0 })
    const drawRef = useRef<() => void>(() => {})

    const schedule = () => {
      if (!state.current.raf) state.current.raf = requestAnimationFrame(() => drawRef.current())
    }

    drawRef.current = () => {
      const s = state.current
      s.raf = 0
      const canvas = canvasRef.current
      const ctx = canvas?.getContext('2d')
      if (!canvas || !ctx) return
      const wanted = Math.round(s.target * (frameCount - 1))
      let index = -1
      for (let offset = 0; offset < frameCount && index === -1; offset++) {
        if (frames.current[wanted - offset]) index = wanted - offset
        else if (frames.current[wanted + offset]) index = wanted + offset
      }
      if (index === -1 || index === s.drawn) return
      const image = frames.current[index]!
      // object-fit: contain
      const scale = Math.min(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight)
      const w = image.naturalWidth * scale
      const h = image.naturalHeight * scale
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(image, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h)
      s.drawn = index
    }

    useImperativeHandle(ref, () => ({
      setProgress(progress: number) {
        state.current.target = progress
        schedule()
      },
    }))

    useEffect(() => {
      const canvas = canvasRef.current
      if (!canvas) return
      let cancelled = false
      const s = state.current

      const resize = () => {
        const ratio = Math.min(window.devicePixelRatio || 1, 2)
        canvas.width = Math.round(canvas.clientWidth * ratio)
        canvas.height = Math.round(canvas.clientHeight * ratio)
        s.drawn = -1
        schedule()
      }
      const observer = new ResizeObserver(resize)
      observer.observe(canvas)

      const order: number[] = [0]
      for (let i = 8; i < frameCount; i += 8) order.push(i)
      for (let i = 1; i < frameCount; i++) if (i % 8 !== 0) order.push(i)

      let failures = 0
      let cursor = 0
      const loadNext = () => {
        if (cancelled || cursor >= order.length) return
        const index = order[cursor++]
        const image = new Image()
        image.decoding = 'async'
        image.onload = () => {
          if (cancelled) return
          frames.current[index] = image
          schedule()
          loadNext()
        }
        image.onerror = () => {
          if (cancelled) return
          if (index === 0 || ++failures > frameCount / 4) onError()
          else loadNext()
        }
        image.src = frameUrl(index)
      }
      // A few parallel requests; each one chains to the next frame in priority order.
      for (let i = 0; i < 4; i++) loadNext()

      return () => {
        cancelled = true
        observer.disconnect()
        cancelAnimationFrame(s.raf)
        s.raf = 0
        frames.current = []
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [frameCount, frameUrl])

    return <canvas ref={canvasRef} className={className} aria-hidden="true" />
  }
)
