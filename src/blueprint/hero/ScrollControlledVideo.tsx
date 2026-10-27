import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import type { FrameRenderer } from './types'

interface ScrollControlledVideoProps {
  src: string
  mobileSrc?: string
  poster: string
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
  function ScrollControlledVideo({ src, mobileSrc, poster, fps, className, onError }, ref) {
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
      video.addEventListener('loadeddata', prime, { once: true })
      video.addEventListener('seeked', schedule)
      video.addEventListener('play', onPlay)
      video.addEventListener('error', fail)

      video.muted = true
      // Chosen on the client so only one rendition is downloaded.
      const useMobile = mobileSrc && window.matchMedia('(max-width: 767px)').matches
      video.src = useMobile ? mobileSrc : src
      video.load()

      return () => {
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
    }, [src, mobileSrc])

    return (
      <video
        ref={videoRef}
        className={className}
        poster={poster}
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
