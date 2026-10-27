import { useEffect, useRef, useState } from 'react'
import { heroMedia } from '../../data/blueprint'
import { BlueprintGrid } from '../components/BlueprintGrid'
import { CoordinateMarker } from '../components/CoordinateMarker'
import { clamp01, getGsap, REDUCED_MOTION, useMediaQuery } from '../lib/motion'
import { BlueprintFallback } from './BlueprintFallback'
import { ImageSequenceCanvas } from './ImageSequenceCanvas'
import { ScrollControlledVideo } from './ScrollControlledVideo'
import { HeroLegend } from './HeroLegend'
import { ScrollIndicator } from './ScrollIndicator'
import type { FrameRenderer } from './types'

/** Share of the pinned scroll spent constructing; the rest holds the finished blueprint before release. */
const CONSTRUCT_SHARE = 0.88
/** The film opens on a faint ghost of the finished drawing; a canvas-coloured veil lifts over this much progress so the first view is blank. */
const VEIL_SHARE = 0.1

type Mode = 'media' | 'fallback'

function prefersLightweight() {
  const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number }
  return Boolean(nav.connection?.saveData) || (nav.deviceMemory !== undefined && nav.deviceMemory <= 2)
}

/**
 * Pinned hero whose film is driven by scroll position: down constructs the identity, up deconstructs it.
 * The section is tall (scroll distance) and its stage is CSS-sticky, so native scrolling is never hijacked;
 * ScrollTrigger only reads progress and hands it to whichever renderer is active.
 */
export function BlueprintHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const rendererRef = useRef<FrameRenderer>(null)
  const progressRef = useRef(0)
  const indicatorRef = useRef<HTMLDivElement>(null)
  const readoutRef = useRef<HTMLSpanElement>(null)
  const completeRef = useRef<HTMLDivElement>(null)
  const veilRef = useRef<HTMLDivElement>(null)
  const legendRef = useRef<FrameRenderer>(null)
  const reducedMotion = useMediaQuery(REDUCED_MOTION)
  const [mode, setMode] = useState<Mode>('media')

  useEffect(() => {
    if (prefersLightweight()) setMode('fallback')
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section || reducedMotion) return
    const { gsap, ScrollTrigger } = getGsap()

    const render = (scrollProgress: number) => {
      const progress = clamp01(scrollProgress / CONSTRUCT_SHARE)
      progressRef.current = progress
      rendererRef.current?.setProgress(progress)
      legendRef.current?.setProgress(progress)
      if (veilRef.current) veilRef.current.style.opacity = String(1 - clamp01(progress / VEIL_SHARE))
      if (indicatorRef.current) indicatorRef.current.style.opacity = String(1 - clamp01(scrollProgress * 14))
      if (readoutRef.current) readoutRef.current.textContent = String(Math.round(progress * 100)).padStart(3, '0')
      if (completeRef.current) completeRef.current.style.opacity = String(clamp01((progress - 0.97) / 0.03))
    }

    // A proxy tween gives a short scrub lag (smooths wheel steps) without a second timeline fighting the film.
    const proxy = { progress: 0 }
    const tween = gsap.to(proxy, {
      progress: 1,
      ease: 'none',
      onUpdate: () => render(proxy.progress),
      scrollTrigger: { trigger: section, start: 'top top', end: 'bottom bottom', scrub: 0.35 },
    })
    render(tween.scrollTrigger?.progress ?? 0)
    ScrollTrigger.refresh()

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [reducedMotion])

  // A renderer that mounts later (after a fallback switch) picks up the current frame.
  useEffect(() => {
    rendererRef.current?.setProgress(reducedMotion ? 1 : progressRef.current)
  }, [mode, reducedMotion])

  const fill = 'absolute inset-0 h-full w-full object-contain'
  const source = heroMedia.source
  let stageMedia
  if (reducedMotion && mode === 'media') {
    stageMedia = (
      <img src={heroMedia.finalPoster} alt="" className={fill} width={1264} height={720} decoding="async" />
    )
  } else if (mode === 'fallback') {
    stageMedia = <BlueprintFallback ref={rendererRef} className={fill} />
  } else if (source.type === 'sequence') {
    stageMedia = (
      <ImageSequenceCanvas
        ref={rendererRef}
        frameCount={source.frameCount}
        frameUrl={source.frameUrl}
        className={fill}
        onError={() => setMode('fallback')}
      />
    )
  } else {
    stageMedia = (
      <ScrollControlledVideo
        ref={rendererRef}
        src={source.src}
        mobileSrc={source.mobileSrc}
        poster={heroMedia.startPoster}
        fps={source.fps}
        className={fill}
        onError={() => setMode('fallback')}
      />
    )
  }

  return (
    <section
      id="top"
      ref={sectionRef}
      aria-labelledby="bp-hero-title"
      className={reducedMotion ? 'relative h-[100svh]' : 'relative h-[280svh] md:h-[420vh]'}
      style={{ backgroundColor: heroMedia.canvasColor }}
    >
      <h1 id="bp-hero-title" className="sr-only">
        Abiola Babatunde, product designer in Lagos who designs in Figma and builds in Webflow, Shopify, Next.js and
        Flutter
      </h1>

      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <BlueprintGrid className="opacity-40" />

        {/*
          Landscape: the film is contained in the viewport. Portrait: it is enlarged so only its empty side margins
          fall outside the screen, and a legend fills the space below it.
        */}
        <div className="absolute inset-0 flex flex-col items-center justify-center portrait:pb-16 portrait:pt-24">
          <div className="bp-video-feather relative aspect-video w-full max-w-[calc(100svh*16/9)] shrink-0 portrait:w-[118vw] portrait:max-w-none">
            {stageMedia}
            {!reducedMotion && mode === 'media' && (
              <div
                ref={veilRef}
                aria-hidden="true"
                className="absolute inset-0"
                style={{ backgroundColor: heroMedia.canvasColor, opacity: 1 }}
              />
            )}
          </div>
          <HeroLegend ref={legendRef} complete={reducedMotion} className="mt-2 hidden portrait:block sm:mt-6" />
        </div>

        {/* Sheet furniture */}
        <div className="pointer-events-none absolute inset-0 px-5 md:px-10">
          <div className="absolute left-5 right-5 top-20 flex items-center justify-between md:left-10 md:right-10 md:top-24 [@media(max-height:520px)]:hidden">
            <CoordinateMarker label="Sheet 01 · Identity" className="max-[359px]:invisible" />
            <span className="bp-label">
              Portfolio <span className="text-bp-cyan/60">/</span> 2026
            </span>
          </div>

          <div className="absolute bottom-6 left-5 hidden items-center gap-3 md:left-10 landscape:flex">
            <span className="bp-label">Construction</span>
            <span ref={readoutRef} className="bp-label bp-num text-bp-cyan">
              {reducedMotion ? '100' : '000'}
            </span>
            <span className="bp-label">%</span>
          </div>
          <div ref={completeRef} className="absolute bottom-6 right-5 md:right-10" style={{ opacity: reducedMotion ? 1 : 0 }}>
            <span className="bp-label text-bp-cyan">Drawing complete ↓</span>
          </div>

          {!reducedMotion && <ScrollIndicator ref={indicatorRef} />}
        </div>
      </div>
    </section>
  )
}
