import {
  Shader,
  Swirl,
  ChromaFlow,
  FlutedGlass,
  FilmGrain,
} from 'shaders/react'
import { neon } from '../lib/colors'

export function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Shader
        className="w-full h-full pointer-events-none"
        style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
      >
        <Swirl colorA="#ffffff" colorB="#f0f4f1" detail={1.7} />
        <ChromaFlow
          baseColor="#ffffff"
          downColor={neon.shader}
          leftColor={neon.shader}
          rightColor={neon.shader}
          upColor={neon.shader}
          momentum={13}
          radius={3.5}
        />
        <FlutedGlass
          aberration={0.61}
          angle={31}
          frequency={8}
          highlight={0.12}
          highlightSoftness={0}
          lightAngle={-90}
          refraction={4}
          shape="rounded"
          softness={1}
          speed={0.15}
        />
        <FilmGrain strength={0.05} />
      </Shader>
    </div>
  )
}
