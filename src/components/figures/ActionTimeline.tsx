import { useState } from 'react'
import Figure, { ToggleGroup } from '../Figure.tsx'

interface Preset {
  label: string
  unit: string
  working: number
  maturing: number
  serving: number
  note: string
}

// Durations are illustrative, in each preset's own unit. The wheat figures follow Rothbard's
// example (p. 14): six months from tilling to harvest, about three weeks of it labor.
const PRESETS: Record<string, Preset> = {
  sandwich: {
    label: 'Ham sandwich',
    unit: 'minutes',
    working: 10,
    maturing: 0,
    serving: 240,
    note: 'Ten minutes of making; it serves its end for about four hours, after which the actor is hungry again (p. 16).',
  },
  wheat: {
    label: 'Wheat crop',
    unit: 'weeks',
    working: 3,
    maturing: 23,
    serving: 52,
    note: 'Three weeks of labor, then over five months in which nature does the work (p. 14). The grain feeds the household until the next harvest.',
  },
  wine: {
    label: 'Aged wine',
    unit: 'months',
    working: 1,
    maturing: 36,
    serving: 1,
    note: 'A short working time and a long maturing time (p. 14), consumed in an evening or two.',
  },
  house: {
    label: 'House',
    unit: 'months',
    working: 6,
    maturing: 0,
    serving: 120,
    note: 'Months of building; the builder expects it to serve him for ten years (p. 16).',
  },
}

type PresetKey = keyof typeof PRESETS

const W = 640
const X0 = 70
const X1 = 600
const LINE_Y = 92
const MIN_SEG = 26

/**
 * Figures 1 and 2: the times of an action. A to B is the period of production (working time plus
 * maturing time); B to C is the duration of serviceableness of the consumers' good.
 */
export default function ActionTimeline() {
  const [key, setKey] = useState<PresetKey>('wheat')
  const [delayed, setDelayed] = useState(false)
  const p = PRESETS[key]

  // Lay segments out proportionally, but never so thin they vanish.
  const span = X1 - X0 - 40
  const raw = [p.working, p.maturing, p.serving]
  const total = raw.reduce((a, b) => a + b, 0)
  const widths = raw.map((v) => (v === 0 ? 0 : Math.max(MIN_SEG, (v / total) * span)))
  const scale = span / widths.reduce((a, b) => a + b, 0)
  const [ww, mw, sw] = widths.map((w) => w * scale)
  const A = X0 + 30
  const B = A + ww + mw
  const C = B + sw
  const delay = Math.min(90, (X1 - C) * 0.9)

  return (
    <Figure
      title="The times of an action"
      basis="Figures 1–2, pp. 13–16"
      caption={
        <>
          Proportions are roughly to scale, except that very short spans are widened so they stay
          visible. Turn on the delayed version to compare the same good arriving later.
        </>
      }
    >
      <div className="figure-controls">
        <ToggleGroup
          label="Good"
          value={key}
          onChange={setKey}
          options={Object.entries(PRESETS).map(([value, pr]) => ({
            value: value as PresetKey,
            label: pr.label,
          }))}
        />
        <label className="check">
          <input type="checkbox" checked={delayed} onChange={(e) => setDelayed(e.target.checked)} />
          Same good, arriving later
        </label>
      </div>

      <svg
        viewBox={`0 0 ${W} ${delayed ? 200 : 140}`}
        className="chart timeline"
        role="img"
        aria-label={`Timeline for ${p.label}: period of production ${p.working + p.maturing} ${p.unit}, duration of serviceableness ${p.serving} ${p.unit}.`}
      >
        <defs>
          <marker
            id="tl-arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="8"
            markerHeight="8"
            orient="auto"
          >
            <path d="M0,0 L10,5 L0,10 z" className="arrow-head" />
          </marker>
          <pattern
            id="tl-hatch"
            width="6"
            height="6"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line x1="0" y1="0" x2="0" y2="6" className="hatch" />
          </pattern>
        </defs>

        <text className="axis-title" x={X0 - 10} y={LINE_Y + 4} textAnchor="end">
          Time
        </text>
        <line
          className="axis"
          x1={X0}
          x2={X1 + 20}
          y1={LINE_Y}
          y2={LINE_Y}
          markerEnd="url(#tl-arrow)"
        />

        {ww > 0 && (
          <rect className="seg working" x={A} y={LINE_Y - 14} width={ww} height={14} rx={3} />
        )}
        {mw > 0 && (
          <rect
            className="seg maturing"
            x={A + ww}
            y={LINE_Y - 14}
            width={mw}
            height={14}
            rx={3}
            fill="url(#tl-hatch)"
          />
        )}
        <rect className="seg serving" x={B} y={LINE_Y - 14} width={sw} height={14} rx={3} />

        {[
          ['A', A],
          ['B', B],
          ['C', C],
        ].map(([name, x]) => (
          <g key={name as string}>
            <line className="tick-mark" x1={x} x2={x} y1={LINE_Y - 20} y2={LINE_Y + 6} />
            <text className="point-label" x={x} y={LINE_Y + 22} textAnchor="middle">
              {name}
            </text>
          </g>
        ))}

        <text className="seg-label" x={(A + B) / 2} y={LINE_Y - 44} textAnchor="middle">
          Period of production (AB): {p.working + p.maturing} {p.unit}
        </text>
        <text className="seg-sublabel" x={(A + B) / 2} y={LINE_Y - 26} textAnchor="middle">
          {p.maturing > 0 ? `${p.working} working + ${p.maturing} maturing` : `all working time`}
        </text>
        <text className="seg-label" x={(B + C) / 2} y={LINE_Y - 26} textAnchor="middle">
          Serviceable (BC): {p.serving} {p.unit}
        </text>

        {delayed && (
          <g className="delayed">
            <line className="axis faint" x1={X0} x2={X1 + 20} y1={LINE_Y + 70} y2={LINE_Y + 70} />
            <rect
              className="seg working faded"
              x={A}
              y={LINE_Y + 56}
              width={ww + mw + delay}
              height={14}
              rx={3}
            />
            <rect
              className="seg serving faded"
              x={B + delay}
              y={LINE_Y + 56}
              width={sw}
              height={14}
              rx={3}
            />
            <line
              className="tick-mark"
              x1={B + delay}
              x2={B + delay}
              y1={LINE_Y + 50}
              y2={LINE_Y + 76}
            />
            <text className="point-label" x={B + delay} y={LINE_Y + 92} textAnchor="middle">
              B′
            </text>
            <text className="seg-sublabel" x={A} y={LINE_Y + 48}>
              The same satisfaction, available only at B′
            </text>
          </g>
        )}
      </svg>

      <div className="readout" aria-live="polite">
        <p>{p.note}</p>
        {delayed && (
          <p>
            <strong>Time preference:</strong> the two lines offer the <em>same</em> satisfaction,
            and the only difference is the wait. So the actor ranks the good at B above the good at
            B′. Given the end, the sooner the better (p. 15).
          </p>
        )}
      </div>
    </Figure>
  )
}
