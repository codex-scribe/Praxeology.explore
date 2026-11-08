import { Fragment, useState } from 'react'
import Figure, { ToggleGroup } from '../Figure.tsx'

type Kind = 'labor' | 'land' | 'capital' | 'time' | 'consumer' | 'end'

interface Item {
  name: string
  kind: Kind
  /** Marks the item that the stage to its left produces. */
  produced?: boolean
}

interface Stage {
  title: string
  items: Item[]
}

// Rothbard's ham sandwich (pp. 8–10), traced back along the bread. The third-order stage goes one
// step past where his text stops.
const STAGES: Stage[] = [
  {
    title: 'Third order',
    items: [
      { name: 'Flour', kind: 'capital' },
      { name: 'Baker’s labor', kind: 'labor' },
      { name: 'Oven', kind: 'capital' },
      { name: 'Bakery site', kind: 'land' },
      { name: 'Time', kind: 'time' },
    ],
  },
  {
    title: 'Second order',
    items: [
      { name: 'Bread in the retail shop', kind: 'capital', produced: true },
      { name: 'Labor of carrying it home', kind: 'labor' },
      { name: 'Standing room', kind: 'land' },
      { name: 'Time', kind: 'time' },
    ],
  },
  {
    title: 'First order',
    items: [
      { name: 'Bread in the kitchen', kind: 'capital', produced: true },
      { name: 'Ham in the kitchen', kind: 'capital' },
      { name: 'Knife', kind: 'capital' },
      { name: 'Housewife’s labor', kind: 'labor' },
      { name: 'Room to work', kind: 'land' },
      { name: 'Time', kind: 'time' },
    ],
  },
  {
    title: 'Consumers’ good',
    items: [{ name: 'Ham sandwich in Jones’s armchair', kind: 'consumer', produced: true }],
  },
]

const END_STAGE: Stage = {
  title: 'End',
  items: [{ name: 'Jones’s hunger satisfied', kind: 'end', produced: true }],
}

const KIND_LABEL: Record<Kind, string> = {
  labor: 'Labor',
  land: 'Land',
  capital: 'Capital good',
  time: 'Time',
  consumer: 'Consumers’ good',
  end: 'End',
}

type Direction = 'production' | 'valuation'

/**
 * The orders of goods behind one consumers' good. In production mode the arrows run from higher
 * orders toward the consumers' good; in valuation mode they run back, as value is imputed from the
 * end to the goods that serve it.
 */
export default function ProductionStructure({ initial = 'production' }: { initial?: Direction }) {
  const [dir, setDir] = useState<Direction>(initial)
  const stages = dir === 'valuation' ? [...STAGES, END_STAGE] : STAGES
  const arrow = dir === 'production' ? '→' : '←'

  return (
    <Figure
      title="Orders of goods: a ham sandwich"
      caption={
        dir === 'production' ? (
          <>
            Production runs left to right. Each stage’s highlighted good is made from the column to
            its left. Trace far enough back and every capital good resolves into labor and land,
            with time needed at every step. A recipe (the know-how) is needed at each stage too, but
            once learned it is unlimited: a general condition, not a scarce means.
          </>
        ) : (
          <>
            Value runs the other way. Jones values the sandwich because of the end it serves; the
            bread in the kitchen, because it helps make the sandwich; and so back up the orders. No
            good is valued for what went into it, only for what it can do toward an end (pp. 20–21).
          </>
        )
      }
    >
      <div className="figure-controls">
        <ToggleGroup
          label="Show"
          value={dir}
          onChange={setDir}
          options={[
            { value: 'production', label: 'Direction of production' },
            { value: 'valuation', label: 'Direction of valuation' },
          ]}
        />
      </div>
      <div className={`stages ${dir}`}>
        {stages.map((stage, i) => (
          <Fragment key={stage.title}>
            {i > 0 && (
              <div className="stage-arrow" aria-hidden>
                {arrow}
              </div>
            )}
            <section className="stage" aria-label={stage.title}>
              <h4>{stage.title}</h4>
              <ul>
                {stage.items.map((item) => (
                  <li
                    key={item.name}
                    className={`kind-${item.kind} ${item.produced ? 'produced' : ''}`}
                  >
                    <span className="kind-badge">{KIND_LABEL[item.kind]}</span>
                    {item.name}
                  </li>
                ))}
              </ul>
            </section>
          </Fragment>
        ))}
      </div>
    </Figure>
  )
}
