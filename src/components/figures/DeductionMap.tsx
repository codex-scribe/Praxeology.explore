import { useState, type ReactNode } from 'react'
import Figure from '../Figure.tsx'

export interface Proposition {
  id: string
  title: string
  body: ReactNode
  /** Ids of the propositions this one is deduced from. */
  from: string[]
  /** Page reference in the book, e.g. 'p. 3'. */
  ref?: string
}

interface DeductionMapProps {
  title: string
  propositions: Proposition[]
}

/**
 * The chain of deductions from the action axiom. Selecting a proposition highlights what it rests
 * on and what rests on it.
 */
export default function DeductionMap({ title, propositions }: DeductionMapProps) {
  const [selected, setSelected] = useState<string>(propositions[0].id)
  const byId = new Map(propositions.map((p) => [p.id, p]))
  const sel = byId.get(selected)!
  const premises = new Set(sel.from)
  const consequences = new Set(
    propositions.filter((p) => p.from.includes(selected)).map((p) => p.id),
  )
  const index = (id: string) => propositions.findIndex((p) => p.id === id)

  return (
    <Figure
      title={title}
      caption="Select a proposition to see what it is deduced from (above it) and what is deduced from it (below it)."
    >
      <div className="figure-body two-col deduction">
        <ol className="props">
          {propositions.map((p, i) => {
            const role =
              p.id === selected
                ? 'selected'
                : premises.has(p.id)
                  ? 'premise'
                  : consequences.has(p.id)
                    ? 'consequence'
                    : ''
            return (
              <li key={p.id} className={role}>
                <button
                  type="button"
                  onClick={() => setSelected(p.id)}
                  aria-pressed={p.id === selected}
                >
                  <span className="prop-num">{i === 0 ? 'A' : i}</span>
                  <span>{p.title}</span>
                  {role === 'premise' && <span className="prop-role">rests on</span>}
                  {role === 'consequence' && <span className="prop-role">implies</span>}
                </button>
              </li>
            )
          })}
        </ol>
        <div className="prop-detail" aria-live="polite">
          <h4>
            {index(sel.id) === 0 ? 'The axiom' : `Proposition ${index(sel.id)}`}
            {sel.ref && <span className="muted"> · {sel.ref}</span>}
          </h4>
          <p className="prop-title">{sel.title}</p>
          <div>{sel.body}</div>
          {sel.from.length > 0 && (
            <p className="muted">
              Deduced from:{' '}
              {sel.from.map((id, k) => (
                <span key={id}>
                  {k > 0 && ', '}
                  <button type="button" className="link-button" onClick={() => setSelected(id)}>
                    {index(id) === 0 ? 'the axiom' : `(${index(id)}) ${byId.get(id)!.title}`}
                  </button>
                </span>
              ))}
            </p>
          )}
        </div>
      </div>
    </Figure>
  )
}
