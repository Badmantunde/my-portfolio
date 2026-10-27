import { cn } from '../lib/motion'

const CYAN = '#42D9FF'
const GOLD = '#FFD678'
const DEEP = '#0D2D4A'
const TEXT = '#EAF7FF'
const MUTED = '#93AEC3'
const FONT = "'Inter Variable', Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif"

// Barcode bar heights for the stub: a fixed pattern, laid out top to bottom with a 2.2px gap.
const BARS = [3, 1, 2, 1, 1, 3, 2, 1, 3, 1, 2, 2, 1, 3, 1, 1, 2, 3, 1, 2, 1, 3, 2, 1, 1, 2].reduce<{ y: number; h: number }[]>(
  (bars, h) => [...bars, { y: bars.length ? bars[bars.length - 1].y + bars[bars.length - 1].h + 2.2 : 34, h }],
  []
)

const CONFETTI = [
  { x: 74, y: 70, r: 4, c: CYAN },
  { x: 560, y: 64, r: 3, c: GOLD },
  { x: 596, y: 300, r: 5, c: CYAN },
  { x: 58, y: 318, r: 3, c: GOLD },
  { x: 120, y: 352, r: 2.5, c: CYAN },
  { x: 520, y: 352, r: 2.5, c: TEXT },
  { x: 610, y: 168, r: 2, c: TEXT },
  { x: 30, y: 190, r: 2, c: CYAN },
]

/** Card art for the Party Padi experiment: a drafted event ticket that straightens on hover. */
export function PartyTicket({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 400" className={cn('h-full w-full', className)} role="img" aria-label="Party Padi ticket, partypadi.com" fontFamily={FONT}>
      <defs>
        <pattern id="pp-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke="rgba(66,217,255,0.07)" strokeWidth="1" />
        </pattern>
        {/* Ticket outline with semicircle notches where the stub tears off */}
        <clipPath id="pp-ticket">
          <path d="M8 0H382A14 14 0 0 0 410 0H452Q460 0 460 8V192Q460 200 452 200H410A14 14 0 0 0 382 200H8Q0 200 0 192V8Q0 0 8 0Z" />
        </clipPath>
      </defs>

      <rect width="640" height="400" fill="url(#pp-grid)" />

      {/* Drafting annotation */}
      <g stroke="rgba(66,217,255,0.5)" strokeWidth="1" fill="none">
        <path d="M90 58H550M90 52V64M550 52V64" />
      </g>
      <text x="320" y="46" textAnchor="middle" fontSize="10" letterSpacing="3" fill={MUTED}>
        TICKET · 1 : 1
      </text>

      {CONFETTI.map((dot) => (
        <circle key={`${dot.x}-${dot.y}`} cx={dot.x} cy={dot.y} r={dot.r} fill={dot.c} opacity="0.85" />
      ))}
      <path d="M96 118l10 -6M548 270l12 4M84 250l-8 10M572 112l6 -10" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" />

      <g
        className="transition-transform duration-300 ease-out group-hover:[transform:translate(90px,100px)_rotate(0deg)]"
        style={{ transform: 'translate(90px, 104px) rotate(-5deg)', transformOrigin: '230px 100px', transformBox: 'view-box' }}
      >
        {/* Shadow */}
        <path
          d="M8 0H382A14 14 0 0 0 410 0H452Q460 0 460 8V192Q460 200 452 200H410A14 14 0 0 0 382 200H8Q0 200 0 192V8Q0 0 8 0Z"
          transform="translate(6 10)"
          fill="rgba(0,0,0,0.35)"
        />
        <g clipPath="url(#pp-ticket)">
          <rect width="460" height="200" fill={DEEP} />
          <rect width="460" height="200" fill="url(#pp-grid)" />
          {/* Stub tint */}
          <rect x="396" width="64" height="200" fill="rgba(66,217,255,0.08)" />
          {/* Accent band */}
          <rect width="10" height="200" fill={CYAN} />
        </g>
        <path
          d="M8 0H382A14 14 0 0 0 410 0H452Q460 0 460 8V192Q460 200 452 200H410A14 14 0 0 0 382 200H8Q0 200 0 192V8Q0 0 8 0Z"
          fill="none"
          stroke={CYAN}
          strokeWidth="1.5"
        />
        {/* Perforation */}
        <path d="M396 18V182" stroke={CYAN} strokeWidth="1.5" strokeDasharray="4 6" opacity="0.7" />

        {/* Main ticket */}
        <text x="34" y="44" fontSize="11" letterSpacing="4" fill={CYAN}>
          ADMIT ONE
        </text>
        <text x="34" y="90" fontSize="40" fontWeight="500" letterSpacing="-1" fill={TEXT}>
          Party Padi
        </text>
        <path d="M352 36l5 10 11 1.6-8 7.8 1.9 11L352 61l-9.8 5.4 1.9-11-8-7.8 11-1.6Z" fill={GOLD} />

        <g fontSize="9" letterSpacing="2.5" fill={MUTED}>
          <text x="34" y="128">SECTION</text>
          <text x="124" y="128">ROW</text>
          <text x="194" y="128">SEAT</text>
          <text x="264" y="128">PRICE</text>
        </g>
        <g fontSize="20" fill={TEXT}>
          <text x="34" y="152">NU4</text>
          <text x="124" y="152">12</text>
          <text x="194" y="152">08</text>
          <text x="264" y="152">₦15,000</text>
        </g>
        <path d="M34 168H372" stroke="rgba(66,217,255,0.3)" strokeWidth="1" />
        <text x="34" y="186" fontSize="12" letterSpacing="1.5" fill={CYAN}>
          partypadi.com
        </text>

        {/* Stub barcode */}
        <g fill={TEXT} opacity="0.85">
          {BARS.map((bar) => (
            <rect key={bar.y} x="414" y={bar.y} width="32" height={bar.h} />
          ))}
        </g>
        <text x="428" y="172" fontSize="8" letterSpacing="1.5" fill={MUTED} textAnchor="middle">
          NU4·12·08
        </text>
      </g>

    </svg>
  )
}
