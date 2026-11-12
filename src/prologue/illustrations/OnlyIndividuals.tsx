import { useRef, useState, type MouseEvent, type PointerEvent } from 'react'
import { CardPlayer, Person, Table, Voter } from './stickFigures.tsx'
import './onlyIndividuals.css'

// "Only individuals act." The reader drags phrases naming actions onto one person or onto a
// crowd. Voting and playing poker are things a person does, so whoever receives them, one person
// or many, each person does them. Electing a president is no one person's act, so nobody can do it:
// the figures only shuffle, puzzled.

type PhraseId = 'vote' | 'poker' | 'elect'
type TargetId = 'one' | 'many'
type Act = 'idle' | 'vote' | 'poker' | 'puzzled'

const PHRASES: { id: PhraseId; text: string }[] = [
  { id: 'vote', text: 'Vote in an election.' },
  { id: 'poker', text: 'Play poker.' },
  { id: 'elect', text: 'Elect a new president.' },
]

const TARGETS: TargetId[] = ['one', 'many']

const outcome = (phrase: PhraseId): Act => (phrase === 'elect' ? 'puzzled' : phrase)

const DESCRIPTIONS: Record<TargetId, Record<Act, string>> = {
  one: {
    idle: '',
    vote: 'The person drops a ballot into the box.',
    poker: 'The person sits down at a table and plays a hand.',
    puzzled: 'The person looks puzzled.',
  },
  many: {
    idle: '',
    vote: 'Each person drops a ballot of their own into a box.',
    poker: 'They sit down at a table together, each playing a hand.',
    puzzled: 'The crowd shuffles about, puzzled; no one knows what to do.',
  },
}

/** The crowd: two staggered rows of six. */
const CROWD = [
  ...Array.from({ length: 6 }, (_, i) => ({ x: 35 + i * 34, y: 92 })),
  ...Array.from({ length: 6 }, (_, i) => ({ x: 52 + i * 34, y: 122 })),
]

const GROUND = 118

function OnePerson({ act }: { act: Act }) {
  switch (act) {
    case 'vote':
      return <Voter x={75} y={GROUND} />
    case 'poker':
      return (
        <>
          <CardPlayer x={75} y={GROUND} />
          <Table x1={30} x2={120} y={GROUND} chips={[104]} />
        </>
      )
    default:
      return <Person x={75} y={GROUND} puzzled={act === 'puzzled'} />
  }
}

function ManyPeople({ act }: { act: Act }) {
  switch (act) {
    case 'vote':
      return (
        <>
          {[40, 120, 200].map((x) => (
            <Voter key={x} x={x} y={GROUND} label="Vote in an election." />
          ))}
        </>
      )
    case 'poker':
      return (
        <>
          {[45, 95, 145, 195].map((x) => (
            <CardPlayer key={x} x={x} y={GROUND} label="Play poker." />
          ))}
          <Table x1={10} x2={230} y={GROUND} chips={[70, 120, 170]} />
        </>
      )
    default:
      return (
        <>
          {CROWD.map((p, i) => (
            <Person
              key={i}
              x={p.x}
              y={p.y}
              scale={0.8}
              puzzled={act === 'puzzled'}
              delay={((i * 7) % 5) * 45}
            />
          ))}
        </>
      )
  }
}

interface Drag {
  id: PhraseId
  x0: number
  y0: number
  dx: number
  dy: number
}

export default function OnlyIndividuals() {
  const [acts, setActs] = useState<Record<TargetId, Act>>({ one: 'idle', many: 'idle' })
  // Bumped on every drop so a repeated drop replays the shake.
  const [runs, setRuns] = useState<Record<TargetId, number>>({ one: 0, many: 0 })
  const [selected, setSelected] = useState<PhraseId | null>(null)
  const [drag, setDrag] = useState<Drag | null>(null)
  const [over, setOver] = useState<TargetId | null>(null)
  const targets = useRef<Partial<Record<TargetId, HTMLButtonElement | null>>>({})
  const ignoreClickUntil = useRef(0)

  const targetAt = (x: number, y: number) =>
    TARGETS.find((id) => {
      const r = targets.current[id]?.getBoundingClientRect()
      return r && x >= r.left && x <= r.right && y >= r.top && y <= r.bottom
    }) ?? null

  const apply = (phrase: PhraseId, target: TargetId) => {
    setActs((a) => ({ ...a, [target]: outcome(phrase) }))
    setRuns((r) => ({ ...r, [target]: r[target] + 1 }))
    setSelected(null)
  }

  const onPointerDown = (id: PhraseId) => (e: PointerEvent<HTMLButtonElement>) => {
    if (e.button !== 0) return
    e.currentTarget.setPointerCapture(e.pointerId)
    setDrag({ id, x0: e.clientX, y0: e.clientY, dx: 0, dy: 0 })
  }

  const onPointerMove = (e: PointerEvent<HTMLButtonElement>) => {
    if (!drag) return
    setDrag({ ...drag, dx: e.clientX - drag.x0, dy: e.clientY - drag.y0 })
    setOver(targetAt(e.clientX, e.clientY))
  }

  const onPointerUp = (e: PointerEvent<HTMLButtonElement>) => {
    if (!drag) return
    if (Math.hypot(e.clientX - drag.x0, e.clientY - drag.y0) > 5) {
      // A real drag, not a tap: drop it, and ignore the click that follows.
      ignoreClickUntil.current = e.timeStamp + 300
      const target = targetAt(e.clientX, e.clientY)
      if (target) apply(drag.id, target)
    }
    setDrag(null)
    setOver(null)
  }

  const onPointerCancel = () => {
    setDrag(null)
    setOver(null)
  }

  // Tapping a phrase (or pressing Enter on it) selects it; tapping a figure then applies it.
  const onPhraseClick = (id: PhraseId, e: MouseEvent) => {
    if (e.timeStamp < ignoreClickUntil.current) return
    setSelected(selected === id ? null : id)
  }

  const changed = acts.one !== 'idle' || acts.many !== 'idle'
  const description = TARGETS.map((t) => DESCRIPTIONS[t][acts[t]])
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={`only-individuals pro-fade${selected ? ' has-selection' : ''}`}
      data-interactive
      role="group"
      aria-label="Drag an action onto one person or onto a crowd"
    >
      <div className="oi-phrases">
        {PHRASES.map((p) => {
          const dragging = drag?.id === p.id
          return (
            <button
              key={p.id}
              type="button"
              className={`oi-phrase${dragging ? ' is-dragging' : ''}${selected === p.id ? ' is-selected' : ''}`}
              style={dragging ? { transform: `translate(${drag.dx}px, ${drag.dy}px)` } : undefined}
              aria-pressed={selected === p.id}
              onPointerDown={onPointerDown(p.id)}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerCancel}
              onClick={(e) => onPhraseClick(p.id, e)}
            >
              {p.text}
            </button>
          )
        })}
      </div>

      <div className="oi-stages">
        {TARGETS.map((t) => (
          <button
            key={t}
            type="button"
            ref={(el) => {
              targets.current[t] = el
            }}
            className={`oi-stage oi-stage-${t}${over === t ? ' is-over' : ''}`}
            aria-label={t === 'one' ? 'One person' : 'A crowd of people'}
            onClick={() => selected && apply(selected, t)}
          >
            <svg
              viewBox={t === 'one' ? '0 28 150 102' : '0 28 240 102'}
              className="oi-art"
              aria-hidden
            >
              <g key={runs[t]}>
                {t === 'one' ? <OnePerson act={acts.one} /> : <ManyPeople act={acts.many} />}
              </g>
            </svg>
          </button>
        ))}
      </div>

      <p className="oi-foot">
        {changed ? (
          <button
            type="button"
            onClick={() => {
              setActs({ one: 'idle', many: 'idle' })
              setSelected(null)
            }}
          >
            start over
          </button>
        ) : (
          'drag a phrase onto the figures'
        )}
      </p>
      <p className="sr-only" aria-live="polite">
        {description}
      </p>
    </div>
  )
}
