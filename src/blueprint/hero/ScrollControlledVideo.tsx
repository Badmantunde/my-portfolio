import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import type { FrameRenderer } from './types'

interface ScrollControlledVideoProps {
  src: string
  /** 9:16 cut for portrait screens. */
  portraitSrc?: string
  fps: number
  className?: string
  onError: () => void
}

/**
 * Native <video> whose currentTime follows scroll progress. It never plays on its own: seeks are coalesced
 * to one per animation frame, and a new seek is only issued once the previous one has landed (`seeked`),
 * so fast scrolling never builds a backlog; the next seek simply jumps to the latest target.
 */
export const ScrollControlledVideo = forwardRef<FrameRenderer, ScrollControlledVideoProps>(
  function ScrollControlledVideo({ src, portraitSrc, fps, className, onError }, ref) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const state = useRef({ target: 0, raf: 0, ready: false })
    const onErrorRef = useRef(onError)
    onErrorRef.current = onError

    const applyRef = useRef<() => void>(() => {})
    const schedule = () => {
      if (!state.current.raf) state.current.raf = requestAnimationFrame(() => applyRef.current())
    }

    applyRef.current = () => {
      const s = state.current
      s.raf = 0
      const video = videoRef.current
      if (!video || !s.ready || video.seeking) return
      // Stay a hair inside the end so the last frame is shown rather than an ended/blank state.
      const time = s.target * Math.max(0, video.duration - 0.5 / fps)
      if (Math.abs(video.currentTime - time) < 0.5 / fps) return
      video.currentTime = time
    }

    useImperativeHandle(ref, () => ({
      setProgress(progress: number) {
        state.current.target = progress
        schedule()
      },
    }))

    useEffect(() => {
      const video = videoRef.current
      if (!video) return
      const s = state.current

      const onMetadata = () => {
        if (!Number.isFinite(video.duration) || video.duration <= 0) return
        s.ready = true
        video.addEventListener('loadeddata', prime, { once: true })
        schedule()
      }
      // iOS Safari won't decode frames for seeking until playback has been started once.
      const prime = () => {
        const attempt = video.play()
        if (attempt) attempt.then(() => video.pause()).catch(() => {})
        else video.pause()
      }
      const onPlay = () => {
        video.pause()
        schedule()
      }
      const fail = () => onErrorRef.current()

      video.addEventListener('loadedmetadata', onMetadata)
      video.addEventListener('seeked', schedule)
      video.addEventListener('play', onPlay)
      video.addEventListener('error', fail)

      video.muted = true
      // Chosen on the client so only one cut is downloaded; rotating the device swaps it and keeps the frame.
      const portrait = window.matchMedia('(orientation: portrait)')
      const load = () => {
        s.ready = false
        video.src = portraitSrc && portrait.matches ? portraitSrc : src
        video.load()
      }
      load()
      if (portraitSrc) portrait.addEventListener('change', load)

      return () => {
        portrait.removeEventListener('change', load)
        cancelAnimationFrame(s.raf)
        s.raf = 0
        s.ready = false
        video.removeEventListener('loadedmetadata', onMetadata)
        video.removeEventListener('loadeddata', prime)
        video.removeEventListener('seeked', schedule)
        video.removeEventListener('play', onPlay)
        video.removeEventListener('error', fail)
        video.removeAttribute('src')
        video.load()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [src, portraitSrc])

    return (
      <video
        ref={videoRef}
        className={className}
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        tabIndex={-1}
        aria-hidden="true"
      />
    )
  }
)
