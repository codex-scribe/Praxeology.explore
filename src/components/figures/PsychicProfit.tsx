import { useState } from 'react'
import Figure, { ToggleGroup } from '../Figure.tsx'

type Outcome = 'before' | 'good' | 'bad'

/**
 * Action as an exchange of one state of affairs for another (pp. 19–20, n. 18): Jones gives up an
 * evening of bridge for a concert, expecting to be better off. Afterwards he knows whether he was.
 */
export default function PsychicProfit() {
  const [outcome, setOutcome] = useState<Outcome>('before')

  const concertAbove = outcome !== 'bad'
  const ranking = concertAbove
    ? ['Evening at the concert (chosen)', 'Evening of bridge (given up)']
    : ['Evening of bridge (given up)', 'Evening at the concert (chosen)']

  return (
    <Figure
      title="Action as exchange: psychic profit and loss"
      caption="Neither gain nor loss can be measured; Jones can say only which state ranks higher. Before acting he always expects a gain. Afterwards he may find he was wrong."
    >
      <div className="figure-controls">
        <ToggleGroup
          label="Moment"
          value={outcome}
          onChange={setOutcome}
          options={[
            { value: 'before', label: 'Before the concert' },
            { value: 'good', label: 'After: it was wonderful' },
            { value: 'bad', label: 'After: it was dreary' },
          ]}
        />
      </div>
      <div className="figure-body two-col">
        <ol className="value-scale">
          {ranking.map((r, i) => (
            <li key={r} className={r.includes('chosen') ? 'vs-served' : 'vs-unserved'}>
              <span className="vs-rank">{i + 1}</span>
              <span className="vs-end">{r}</span>
            </li>
          ))}
        </ol>
        <div className="readout" aria-live="polite">
          {outcome === 'before' && (
            <p>
              <strong>Expected:</strong> Jones exchanges the state “bridge” (X) for “concert” (Y)
              because he ranks Y above X. Every action is undertaken expecting a gain.
            </p>
          )}
          {outcome === 'good' && (
            <p>
              <strong>Psychic profit.</strong> As he expected, Y ranks above the X he gave up. He
              can’t say by how much, but he knows he is better off.
            </p>
          )}
          {outcome === 'bad' && (
            <p>
              <strong>Psychic loss.</strong> In hindsight, X ranks above Y: he would have been
              happier playing bridge (n. 18). Action under uncertainty always carries this risk.
            </p>
          )}
        </div>
      </div>
    </Figure>
  )
}
