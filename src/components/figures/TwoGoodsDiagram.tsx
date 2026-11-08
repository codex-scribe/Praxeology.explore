import { useState } from 'react'
import {
  choiceToAdd,
  choiceToGiveUp,
  jointRank,
  marginalUtilityOfGain,
  marginalUtilityOfLoss,
  parseScale,
  raiseEntry,
  unitsOnScale,
  type ScaleEntry,
  type Stock,
} from '../../models/valueScale.ts'
import Figure, { Stepper } from '../Figure.tsx'

// Rothbard's joint ranking of the ends served by horses (X) and cows (Y), p. 32.
const ROTHBARD_SCALE = parseScale('Y1 X1 X2 X3 Y2 Y3 X4 Y4 X5 Y5 X6 X7 Y6 Y7')

const GOODS = [
  { id: 'X', name: 'horse', plural: 'horses' },
  { id: 'Y', name: 'cow', plural: 'cows' },
] as const

const PRESETS: { label: string; stock: Stock }[] = [
  { label: '4 horses, 3 cows', stock: { X: 4, Y: 3 } },
  { label: '3 horses, 2 cows', stock: { X: 3, Y: 2 } },
  { label: '4 horses, 4 cows', stock: { X: 4, Y: 4 } },
  { label: 'None of either', stock: { X: 0, Y: 0 } },
]

const ROW = 22
const COL = 26
const MT = 10
const MB = 44
const AXIS = 46
const PANEL_GAP = 34

const label = (e: ScaleEntry) => `${e.good}-${e.unit}`
const goodName = (id: string, plural = false) => {
  const g = GOODS.find((g) => g.id === id)!
  return plural ? g.plural : g.name
}

/** Figure 4: the value scales of two goods, drawn on one shared ranking of ends. */
export default function TwoGoodsDiagram() {
  const [scale, setScale] = useState<ScaleEntry[]>(ROTHBARD_SCALE)
  const [stock, setStock] = useState<Stock>({ X: 4, Y: 3 })

  const rows = scale.length
  const cols = Math.max(...GOODS.map((g) => unitsOnScale(scale, g.id)))
  const panelW = AXIS + cols * COL + 8
  const width = panelW * 2 + PANEL_GAP
  const height = MT + rows * ROW + MB
  const y = (rank: number) => MT + (rank - 0.5) * ROW

  const giveUp = choiceToGiveUp(scale, stock)
  const add = choiceToAdd(scale, stock)
  const isDefault = scale.every((e, i) => label(e) === label(ROTHBARD_SCALE[i]))

  const describe = (good: string, rank: number | undefined, unit: number) =>
    rank === undefined ? 'nothing on the scale' : `${good}-${unit}, ranked ${rank}`

  return (
    <Figure
      title="Two goods on one value scale"
      basis="Figure 4, p. 30"
      caption={
        <>
          X is horses, Y is cows. Each panel is a Figure 3 diagram for one good, but the rows are
          the owner’s single ranking of <em>all</em> fourteen ends, so a horizontal line runs
          through each end in both panels. Filled circles are units held. The ringed circle is each
          good’s marginal unit; the dashed one is the next unit that could be added.
        </>
      }
    >
      <div className="figure-controls">
        {GOODS.map((g) => (
          <Stepper
            key={g.id}
            label={`${g.plural[0].toUpperCase()}${g.plural.slice(1)} (${g.id})`}
            value={stock[g.id]}
            min={0}
            max={unitsOnScale(scale, g.id)}
            onChange={(v) => setStock({ ...stock, [g.id]: v })}
          />
        ))}
        <span className="preset-row">
          <span className="stepper-label">Rothbard’s cases</span>
          {PRESETS.map((p) => (
            <button key={p.label} type="button" onClick={() => setStock(p.stock)}>
              {p.label}
            </button>
          ))}
        </span>
      </div>

      <div className="figure-body stacked">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="chart"
          role="img"
          aria-label={`Value scales for horses and cows; stock ${stock.X} horses and ${stock.Y} cows.`}
        >
          {GOODS.map((g, gi) => {
            const ox = gi * (panelW + PANEL_GAP)
            const held = stock[g.id]
            const x = (unit: number) => ox + AXIS + (unit - 0.5) * COL
            const units = unitsOnScale(scale, g.id)
            return (
              <g key={g.id} className={`good-${g.id}`}>
                {scale.map((_, i) => (
                  <line
                    key={i}
                    className="grid"
                    x1={ox + AXIS}
                    x2={ox + AXIS + cols * COL}
                    y1={y(i + 1)}
                    y2={y(i + 1)}
                  />
                ))}
                {Array.from({ length: cols + 1 }, (_, i) => (
                  <line
                    key={i}
                    className="grid faint"
                    x1={ox + AXIS + i * COL}
                    x2={ox + AXIS + i * COL}
                    y1={MT}
                    y2={MT + rows * ROW}
                  />
                ))}
                {Array.from({ length: units }, (_, k) => {
                  const unit = k + 1
                  const rank = jointRank(scale, g.id, unit)!
                  const cls =
                    unit === held
                      ? 'dot marginal'
                      : unit < held
                        ? 'dot held'
                        : unit === held + 1
                          ? 'dot next'
                          : 'dot unserved'
                  return (
                    <g key={unit}>
                      <text
                        className="tick"
                        x={ox + AXIS - 6}
                        y={y(rank)}
                        textAnchor="end"
                        dominantBaseline="middle"
                      >
                        {g.id}-{unit}
                      </text>
                      <g className={cls}>
                        <circle cx={x(unit)} cy={y(rank)} r={unit <= held + 1 ? 6.5 : 4} />
                        <circle className="hit" cx={x(unit)} cy={y(rank)} r={COL / 2} />
                        <title>{`${g.name} ${unit} (${g.id}-${unit}) serves the end ranked ${rank} overall${unit <= held ? ' (held)' : ''}`}</title>
                      </g>
                    </g>
                  )
                })}
                {Array.from({ length: cols }, (_, i) => (
                  <text
                    key={i}
                    className="tick"
                    x={x(i + 1)}
                    y={MT + rows * ROW + 15}
                    textAnchor="middle"
                  >
                    {i + 1}
                  </text>
                ))}
                <text
                  className="axis-title"
                  x={ox + AXIS + (cols * COL) / 2}
                  y={height - 8}
                  textAnchor="middle"
                >
                  Units of {g.id} ({g.plural})
                </text>
              </g>
            )
          })}
        </svg>

        <div>
          <p className="list-title">The single scale (1 = most valued)</p>
          <ol className="joint-scale">
            {scale.map((e, i) => {
              const held = e.unit <= stock[e.good]
              const isMarginal = e.unit === stock[e.good]
              const canRaise = i > 0 && scale[i - 1].good !== e.good
              return (
                <li key={label(e)} className={`good-${e.good} ${held ? 'held' : ''}`}>
                  <span className="vs-rank">{i + 1}</span>
                  <span className="swatch" aria-hidden />
                  <span className="vs-end">
                    {label(e)}
                    <span className="muted">
                      {' '}
                      {goodName(e.good)} {e.unit}
                    </span>
                    {isMarginal && <span className="muted"> · marginal</span>}
                  </span>
                  <button
                    type="button"
                    className="vs-raise"
                    disabled={!canRaise}
                    onClick={() => setScale(raiseEntry(scale, i))}
                    aria-label={`Rank ${label(e)} above ${i > 0 ? label(scale[i - 1]) : 'nothing'}`}
                    title={
                      canRaise
                        ? `Rank above ${label(scale[i - 1])}`
                        : i === 0
                          ? 'Already ranked first'
                          : `Can’t outrank ${label(scale[i - 1])}: an earlier unit of the same good always serves a higher end`
                    }
                  >
                    ▲
                  </button>
                </li>
              )
            })}
          </ol>
          {!isDefault && (
            <button type="button" className="link-button" onClick={() => setScale(ROTHBARD_SCALE)}>
              Restore Rothbard’s ranking
            </button>
          )}
        </div>
      </div>

      <div className="readout" aria-live="polite">
        <p>
          <strong>Marginal utilities.</strong> Losing a horse would cost{' '}
          {describe('X', marginalUtilityOfLoss(scale, stock, 'X'), stock.X)}; losing a cow would
          cost {describe('Y', marginalUtilityOfLoss(scale, stock, 'Y'), stock.Y)}.
        </p>
        <p>
          <strong>Must give one up:</strong>{' '}
          {giveUp
            ? `he gives up a ${goodName(giveUp)}, the unit serving the lower-ranked end.`
            : 'he has nothing to give up.'}
        </p>
        <p>
          <strong>Offered one more:</strong> a horse would serve{' '}
          {describe('X', marginalUtilityOfGain(scale, stock, 'X'), stock.X + 1)}, a cow{' '}
          {describe('Y', marginalUtilityOfGain(scale, stock, 'Y'), stock.Y + 1)}.{' '}
          {add
            ? `He takes the ${goodName(add)}, which serves the higher-ranked end.`
            : 'Every end on the scale is already served.'}
        </p>
      </div>
    </Figure>
  )
}
