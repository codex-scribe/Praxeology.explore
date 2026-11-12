import type { ReactNode } from 'react'

// Simple stick figures and props, drawn in SVG user units. Each figure is drawn in its own
// coordinates with its feet at (0, 0), so a figure stands about 59 units tall.

type Pt = readonly [number, number]

/** The shape of both arms, each as [elbow, hand]. The shoulders are at (0, -38). */
interface Arms {
  left: readonly [Pt, Pt]
  right: readonly [Pt, Pt]
}

const SHOULDER: Pt = [0, -38]

const ARMS_RELAXED: Arms = {
  left: [
    [-7, -29],
    [-11, -20],
  ],
  right: [
    [7, -29],
    [11, -20],
  ],
}

/** Both hands together in front of the chest, holding cards. */
const ARMS_HOLDING_CARDS: Arms = {
  left: [
    [-8, -29],
    [-3, -29],
  ],
  right: [
    [8, -29],
    [3, -29],
  ],
}

/** The right hand reaching out to a ballot box beside the figure. */
const ARMS_VOTING: Arms = {
  left: ARMS_RELAXED.left,
  right: [
    [13, -33],
    [25, -39],
  ],
}

interface PersonProps {
  x: number
  /** Where the feet rest. */
  y: number
  scale?: number
  arms?: Arms
  /** Leave the legs off, for a figure seated behind a table. */
  seated?: boolean
  /** Shake briefly, with a question mark overhead. */
  puzzled?: boolean
  /** Staggers the shake among a crowd, in milliseconds. */
  delay?: number
  /** A few words shown over the head. */
  label?: string
  /** Things the figure holds, in the figure's own coordinates. */
  children?: ReactNode
}

export function Person({
  x,
  y,
  scale = 1,
  arms = ARMS_RELAXED,
  seated = false,
  puzzled = false,
  delay = 0,
  label,
  children,
}: PersonProps) {
  const arm = ([elbow, hand]: readonly [Pt, Pt]) => (
    <polyline points={[SHOULDER, elbow, hand].map((p) => p.join(',')).join(' ')} />
  )
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <g
        className={puzzled ? 'oi-jiggle' : undefined}
        style={puzzled ? { animationDelay: `${delay}ms` } : undefined}
      >
        {!seated && <polyline points="-8,0 0,-20 8,0" />}
        <line x1={0} y1={-45} x2={0} y2={-20} />
        {arm(arms.left)}
        {arm(arms.right)}
        <circle className="paper" cx={0} cy={-52} r={7} />
        {children}
        {puzzled && (
          <text className="oi-puzzled" x={0} y={-64} textAnchor="middle">
            ?
          </text>
        )}
      </g>
      {label && (
        <text className="oi-label" x={0} y={-66} textAnchor="middle">
          {label}
        </text>
      )}
    </g>
  )
}

/** A fan of three cards, held at the chest. */
function Cards() {
  return (
    <g>
      {[-22, 0, 22].map((angle) => (
        <rect
          key={angle}
          className="paper"
          x={-3}
          y={-38}
          width={6}
          height={8}
          transform={`rotate(${angle} 0 -30)`}
        />
      ))}
    </g>
  )
}

/** A table seen from the front, from x1 to x2, standing on the ground at y. */
export function Table({
  x1,
  x2,
  y,
  chips = [],
}: {
  x1: number
  x2: number
  y: number
  chips?: number[]
}) {
  const top = y - 22
  return (
    <g>
      <polygon
        className="paper"
        points={`${x1 + 8},${top} ${x2 - 8},${top} ${x2},${top + 7} ${x1},${top + 7}`}
      />
      <line x1={x1 + 4} y1={top + 7} x2={x1 + 4} y2={y} />
      <line x1={x2 - 4} y1={top + 7} x2={x2 - 4} y2={y} />
      {chips.map((cx) => (
        <g key={cx}>
          {[0, 1, 2].map((i) => (
            <ellipse key={i} className="paper" cx={cx} cy={top + 4 - i * 1.6} rx={3} ry={1.2} />
          ))}
        </g>
      ))}
    </g>
  )
}

/** A person dropping a ballot into a box beside them; x is the middle of the pair. */
export function Voter({ x, y, label }: { x: number; y: number; label?: string }) {
  const fx = x - 13
  const bx = x + 15
  return (
    <g>
      <rect className="paper" x={bx - 3} y={y - 41} width={6} height={12} />
      <Person x={fx} y={y} arms={ARMS_VOTING} />
      <rect className="paper" x={bx - 11} y={y - 28} width={22} height={28} />
      <line className="oi-slot" x1={bx - 4} y1={y - 28} x2={bx + 4} y2={y - 28} />
      {label && (
        <text className="oi-label" x={x} y={y - 66} textAnchor="middle">
          {label}
        </text>
      )}
    </g>
  )
}

/** A person seated (behind a table drawn after them) holding a hand of cards. */
export function CardPlayer({ x, y, label }: { x: number; y: number; label?: string }) {
  return (
    <Person x={x} y={y - 2} seated arms={ARMS_HOLDING_CARDS} label={label}>
      <Cards />
    </Person>
  )
}
