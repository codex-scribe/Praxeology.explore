import { useState } from 'react'
import { allocate, marginalGain, marginalLoss } from '../../models/valueScale.ts'
import Figure, { Stepper, ToggleGroup } from '../Figure.tsx'
import ValueScaleList from './ValueScaleList.tsx'

// Ten ends a supply of horses could serve, ranked by one hypothetical owner. Rothbard's own
// example (p. 26) puts pleasure riding as the least of the ends six horses serve.
const HORSE_ENDS = [
  'Pulling the plow',
  'Hauling the harvest wagon',
  'Riding to town for supplies',
  'Carrying water from the creek',
  'Hauling firewood',
  'Pleasure riding',
  'Pulling a sleigh to the winter fair',
  'Lending to a neighbor',
  'Giving rides to visiting children',
  'Posing for a portrait',
]

type UnitSize = 'one' | 'pair' | 'whole'

const CELL = 30
const ML = 58
const MT = 12
const MB = 52
const MR = 10

/** Rothbard's value-scale diagram (Figure 3) for one good, with the supply under your control. */
export default function MarginalUtilityDiagram() {
  const n = HORSE_ENDS.length
  const [supply, setSupply] = useState(6)
  const [unitSizeKey, setUnitSizeKey] = useState<UnitSize>('one')

  const unitSize = unitSizeKey === 'one' ? 1 : unitSizeKey === 'pair' ? 2 : Math.max(supply, 1)
  const { satisfied } = allocate(n, supply)
  const lost = marginalLoss(n, supply, unitSize)
  const gained = unitSizeKey === 'whole' ? [] : marginalGain(n, supply, unitSize)

  const width = ML + n * CELL + MR
  const height = MT + n * CELL + MB
  const x = (unit: number) => ML + (unit - 0.5) * CELL
  const y = (rank: number) => MT + (rank - 0.5) * CELL

  const names = (ranks: number[]) => ranks.map((r) => HORSE_ENDS[r - 1].toLowerCase())
  const list = (ranks: number[]) => {
    const ns = names(ranks)
    return ns.length <= 2 ? ns.join(' and ') : `${ns.slice(0, -1).join(', ')}, and ${ns.at(-1)}`
  }
  const rankSpan = (ranks: number[]) =>
    ranks.length === 1 ? `end ${ranks[0]}` : `ends ${ranks[0]}–${ranks.at(-1)}`
  const unitWord =
    unitSizeKey === 'one' ? 'one horse' : unitSizeKey === 'pair' ? 'a pair' : 'the whole stock'

  return (
    <Figure
      title="The value-scale diagram"
      basis="Figure 3, p. 26"
      caption={
        <>
          Each circle is one horse, placed at the rank of the end it serves. The first horse goes to
          the most valued end, the second to the next, and so on down the arrow. The vertical axis
          is a <em>ranking</em>: equal spacing between rows means nothing, and no row is “twice”
          another.
        </>
      }
    >
      <div className="figure-controls">
        <Stepper label="Horses held" value={supply} min={0} max={n} onChange={setSupply} />
        <ToggleGroup
          label="Unit that enters the choice"
          value={unitSizeKey}
          onChange={setUnitSizeKey}
          options={[
            { value: 'one', label: 'One horse' },
            { value: 'pair', label: 'A pair' },
            { value: 'whole', label: 'Whole stock' },
          ]}
        />
      </div>

      <div className="figure-body two-col">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="chart"
          role="img"
          aria-label={`Value-scale diagram: ${supply} horses serve ends 1 to ${supply}.`}
        >
          {Array.from({ length: n + 1 }, (_, i) => (
            <g key={i} className="grid">
              <line x1={ML + i * CELL} x2={ML + i * CELL} y1={MT} y2={MT + n * CELL} />
              <line x1={ML} x2={ML + n * CELL} y1={MT + i * CELL} y2={MT + i * CELL} />
            </g>
          ))}

          {Array.from({ length: n }, (_, i) => (
            <g key={i} className="tick">
              <text x={ML - 8} y={y(i + 1)} textAnchor="end" dominantBaseline="middle">
                {i + 1}
              </text>
              <text x={x(i + 1)} y={MT + n * CELL + 16} textAnchor="middle">
                {i + 1}
              </text>
            </g>
          ))}
          <text
            className="axis-title"
            transform={`translate(16 ${MT + (n * CELL) / 2}) rotate(-90)`}
            textAnchor="middle"
          >
            Ends (ranked; 1 = most valued)
          </text>
          <text className="axis-title" x={ML + (n * CELL) / 2} y={height - 8} textAnchor="middle">
            Quantity of supply (horses)
          </text>

          {lost.length > 1 && (
            <rect
              className="bracket"
              x={x(lost[0]) - CELL / 2 + 2}
              y={y(lost[0]) - CELL / 2 + 2}
              width={lost.length * CELL - 4}
              height={lost.length * CELL - 4}
              rx={8}
            />
          )}

          {supply > 0 && (
            <line
              className="arrow"
              x1={x(supply)}
              x2={x(supply)}
              y1={MT + 2}
              y2={y(supply) - 10}
              markerEnd="url(#mu-arrow)"
            />
          )}
          <defs>
            <marker
              id="mu-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0,0 L10,5 L0,10 z" className="arrow-head" />
            </marker>
          </defs>

          {Array.from({ length: n }, (_, i) => {
            const rank = i + 1
            const cls = lost.includes(rank)
              ? 'dot marginal'
              : satisfied.includes(rank)
                ? 'dot served'
                : gained.includes(rank)
                  ? 'dot next'
                  : 'dot unserved'
            return (
              <g key={rank} className={cls}>
                <circle
                  cx={x(rank)}
                  cy={y(rank)}
                  r={rank <= supply || gained.includes(rank) ? 7 : 4}
                />
                <circle className="hit" cx={x(rank)} cy={y(rank)} r={CELL / 2} />
                <title>
                  {`Horse ${rank} → end ranked ${rank}: ${HORSE_ENDS[i]}` +
                    (rank <= supply ? ' (served)' : ' (not served)')}
                </title>
              </g>
            )
          })}
        </svg>

        <ValueScaleList ends={HORSE_ENDS} supply={supply} lossRanks={lost} gainRanks={gained} />
      </div>

      <div className="readout" aria-live="polite">
        {supply === 0 ? (
          <p>
            With no horses, nothing is given up. A first horse would go to the most valued end:{' '}
            {names([1])[0]}.
          </p>
        ) : (
          <>
            <p>
              <strong>Lose {unitWord}:</strong>{' '}
              {lost.length === 0
                ? `a pair can’t be lost from a stock of one.`
                : `he gives up ${rankSpan(lost)} (${list(lost)}), never a higher end, whichever particular horse goes.`}
            </p>
            {unitSizeKey === 'whole' ? (
              <p>
                <strong>Treated as one unit,</strong> the stock is valued by the most important end
                it serves: end 1. That is the marginal utility of a supply that can only be kept or
                lost as a whole.
              </p>
            ) : (
              <p>
                <strong>Gain {unitWord}:</strong>{' '}
                {gained.length === 0
                  ? 'every end on this scale is already served.'
                  : `it would serve ${rankSpan(gained)} (${list(gained)}).`}
              </p>
            )}
            {unitSizeKey === 'pair' && lost.length === 2 && (
              <p className="aside">
                Losing a pair costs more than losing one horse (two ends rather than one), but it is
                not “twice as bad”. Ranks can’t be added. And in practice a pair may serve ends no
                single horse could, such as a team for a heavy wagon; the owner would then rank a
                separate, shorter scale of ends for pairs (p. 28).
              </p>
            )}
          </>
        )}
      </div>
    </Figure>
  )
}
