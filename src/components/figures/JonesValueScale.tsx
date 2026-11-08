import { useState } from 'react'
import { marginalGain, marginalLoss } from '../../models/valueScale.ts'
import Figure, { Stepper } from '../Figure.tsx'
import ValueScaleList from './ValueScaleList.tsx'

const BASE_ENDS = ['Keep watching the baseball game', 'Go for a drive', 'Play bridge']
const CONCERT = 'Go to a concert'

interface JonesValueScaleProps {
  /** Let the reader reorder the ends and add a new one (§5A). */
  editable?: boolean
}

/**
 * Jones and his hours (pp. 5–6, 17–18): a few ends competing for a scarce means, time. Each hour
 * goes to the most valued end not yet served.
 */
export default function JonesValueScale({ editable = false }: JonesValueScaleProps) {
  const [ends, setEnds] = useState(BASE_ENDS)
  const [hours, setHours] = useState(1)
  const hasConcert = ends.includes(CONCERT)

  const raise = (i: number) => {
    const next = ends.slice()
    ;[next[i - 1], next[i]] = [next[i], next[i - 1]]
    setEnds(next)
  }

  const chosen = ends.slice(0, hours)
  const forgone = ends.slice(hours)

  return (
    <Figure
      title="Jones’s value scale"
      caption={
        editable
          ? 'Reorder the ends or add a new one. The scale is Jones’s own and can change at any time. Only the order carries meaning.'
          : 'Each hour goes to the most valued end not yet served. The more hours, the lower the rank of the ends left unsatisfied.'
      }
    >
      <div className="figure-controls">
        <Stepper
          label="Hours available"
          value={hours}
          min={0}
          max={ends.length}
          onChange={setHours}
        />
        {editable && (
          <>
            <button
              type="button"
              onClick={() =>
                setEnds(hasConcert ? ends.filter((e) => e !== CONCERT) : [...ends, CONCERT])
              }
            >
              {hasConcert ? 'Remove the concert' : 'A concert comes to town'}
            </button>
            <button type="button" className="link-button" onClick={() => setEnds(BASE_ENDS)}>
              Reset
            </button>
          </>
        )}
      </div>
      <ValueScaleList
        ends={ends}
        supply={hours}
        lossRanks={marginalLoss(ends.length, hours)}
        gainRanks={marginalGain(ends.length, hours)}
        onRaise={editable ? raise : undefined}
      />
      <div className="readout" aria-live="polite">
        <p>
          {hours === 0
            ? 'With no time to spare, no end can be pursued.'
            : `Jones spends his ${hours === 1 ? 'hour' : `${hours} hours`} on: ${chosen.join('; ').toLowerCase()}.`}{' '}
          {forgone.length > 0
            ? `Left unsatisfied: ${forgone.join('; ').toLowerCase()}.`
            : 'Every end on his scale is served.'}
        </p>
      </div>
    </Figure>
  )
}
