import { useState } from 'react'
import Figure from '../Figure.tsx'

interface Case {
  behavior: string
  action: boolean
  why: string
}

// Pairs of physically similar movements, one purposeful and one not, plus a few clear cases.
const CASES: Case[] = [
  {
    behavior: 'Your leg kicks when the doctor taps your knee.',
    action: false,
    why: 'A reflex: an involuntary response to a stimulus, with no end in view.',
  },
  {
    behavior: 'You kick a ball toward the goal.',
    action: true,
    why: 'The same muscles, but aimed at an end: scoring.',
  },
  {
    behavior: 'You cough because dust caught in your throat.',
    action: false,
    why: 'Involuntary. Nothing was chosen.',
  },
  {
    behavior: 'You cough to warn a friend that the boss is behind him.',
    action: true,
    why: 'A cough used as a means to an end. What makes it action is the purpose, not the movement.',
  },
  {
    behavior: 'You keep watching the game when you could go for a drive.',
    action: true,
    why: 'Continuing what you were doing, when you could change, is still a choice (p. 6).',
  },
  {
    behavior: 'You decide in a split second to swerve around a pothole.',
    action: true,
    why: 'Action needn’t be slow, calm, or deliberate. It only needs a purpose (pp. 6–7).',
  },
  {
    behavior: 'A boulder rolls down a hillside.',
    action: false,
    why: 'Inorganic matter moves; it doesn’t act. There is no purpose to interpret.',
  },
  {
    behavior: 'A farmer plants seed he won’t harvest for months.',
    action: true,
    why: 'Means employed now, aimed at an end in the future.',
  },
]

/** A sorting exercise: which of these behaviors are action in Rothbard's sense? */
export default function ActionOrReflex() {
  const [answers, setAnswers] = useState<Record<number, boolean>>({})
  const answered = Object.keys(answers).length
  const correct = Object.entries(answers).filter(([i, a]) => CASES[Number(i)].action === a).length

  return (
    <Figure
      title="Action or not?"
      caption="Action is purposeful behavior. The test is never the physical movement, only whether an end is being pursued."
    >
      <ul className="cases">
        {CASES.map((c, i) => {
          const a = answers[i]
          const done = a !== undefined
          return (
            <li key={c.behavior} className={done ? (a === c.action ? 'right' : 'wrong') : ''}>
              <p className="case-behavior">{c.behavior}</p>
              {done ? (
                <p className="case-why">
                  <strong>{c.action ? 'Action.' : 'Not action.'}</strong> {c.why}
                </p>
              ) : (
                <div className="case-buttons">
                  <button type="button" onClick={() => setAnswers({ ...answers, [i]: true })}>
                    Action
                  </button>
                  <button type="button" onClick={() => setAnswers({ ...answers, [i]: false })}>
                    Not action
                  </button>
                </div>
              )}
            </li>
          )
        })}
      </ul>
      {answered > 0 && (
        <div className="readout">
          <p>
            {correct} of {answered} sorted as Rothbard would.{' '}
            <button type="button" className="link-button" onClick={() => setAnswers({})}>
              Start over
            </button>
          </p>
        </div>
      )}
    </Figure>
  )
}
