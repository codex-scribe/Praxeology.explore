import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react'
import { Link } from 'react-router'
import { scenes } from './scenes.ts'
import './prologue.css'

/** How long a screen takes to fade out before the next one appears; matches prologue.css. */
const FADE_MS = 900
/** Idle time before the faint "click to continue" hint appears. */
const HINT_DELAY_MS = 7000

// Steps: 0 shows "Man acts."; 1 adds the definition; then one step per scene; then the end.
const FIRST_SCENE = 2
const END = FIRST_SCENE + scenes.length

type Screen = 'title' | 'end' | number

function screenOf(step: number): Screen {
  if (step < FIRST_SCENE) return 'title'
  if (step < END) return step - FIRST_SCENE
  return 'end'
}

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII']

/**
 * The landing experience: a white page on which "Man acts." fades in, followed on each click by
 * the definition of action and then, one screen at a time, the propositions that follow from it.
 */
export default function Prologue() {
  const [step, setStep] = useState(0)
  const [fading, setFading] = useState(false)
  const [hint, setHint] = useState(false)
  const [finePrintOpen, setFinePrintOpen] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  const goTo = useCallback(
    (next: number) => {
      if (fading || next < 0 || next > END || next === step) return
      setHint(false)
      setFinePrintOpen(false)
      if (screenOf(next) === screenOf(step)) {
        setStep(next)
        return
      }
      // A new screen: fade the current one out, then swap in the next, which fades itself in.
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      setFading(true)
      timer.current = window.setTimeout(
        () => {
          setStep(next)
          setFading(false)
        },
        reduced ? 0 : FADE_MS,
      )
    },
    [step, fading],
  )

  useEffect(() => () => window.clearTimeout(timer.current), [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setFinePrintOpen(false)
        return
      }
      // Leave keys alone when a link or button has focus, so Enter still follows links.
      if (e.target instanceof Element && e.target.closest('a, button')) return
      if ([' ', 'Enter', 'ArrowRight', 'ArrowDown', 'PageDown'].includes(e.key)) {
        e.preventDefault()
        goTo(step + 1)
      } else if (['ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace'].includes(e.key)) {
        e.preventDefault()
        goTo(step - 1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goTo, step])

  // If the reader waits a while without clicking, gently suggest it.
  useEffect(() => {
    if (step === END) return
    const t = window.setTimeout(() => setHint(true), HINT_DELAY_MS)
    return () => window.clearTimeout(t)
  }, [step])

  const onClick = (e: MouseEvent) => {
    // Clicks on links, buttons, and illustrations are theirs, not a request to move on.
    if (e.target instanceof Element && e.target.closest('a, button, [data-interactive]')) return
    // With the fine print open, a click elsewhere just closes it.
    if (finePrintOpen) {
      setFinePrintOpen(false)
      return
    }
    goTo(step + 1)
  }

  const screen = screenOf(step)
  const scene = typeof screen === 'number' ? scenes[screen] : undefined
  const Illustration = scene?.illustration

  return (
    <main className={`prologue${fading ? ' is-fading' : ''}`} onClick={onClick}>
      <p className="sr-only">
        Click, or press the space bar, to continue. Press the left arrow key to go back.
      </p>

      <div
        className={`prologue-screen${screen === 'title' ? ' is-title' : ''}${Illustration ? ' is-wide' : ''}`}
        key={String(screen)}
        aria-live="polite"
      >
        {screen === 'title' && (
          <div className="title-screen">
            <h1 className="pro-fade">Man acts.</h1>
            {step >= 1 && (
              <p className="pro-fade definition">Action is purposeful, chosen behavior.</p>
            )}
          </div>
        )}

        {scene && typeof screen === 'number' && (
          <section className="scene" aria-label={`Proposition ${screen + 1}`}>
            <p className="pro-fade scene-number">{ROMAN[screen] ?? screen + 1}</p>
            <h2 className="pro-fade">{scene.statement}</h2>
            {Illustration ? (
              <Illustration />
            ) : (
              <p className="pro-fade scene-placeholder">{scene.placeholder}</p>
            )}
          </section>
        )}

        {screen === 'end' && (
          <section className="scene end">
            <h2 className="pro-fade">More to follow.</h2>
            <p className="pro-fade scene-links">
              <Link to="/outline">Read the working outline</Link>
              <span aria-hidden> · </span>
              <button type="button" onClick={() => goTo(0)}>
                Begin again
              </button>
            </p>
          </section>
        )}
      </div>

      {step >= FIRST_SCENE && (
        <nav className="prologue-nav" aria-label="Site">
          <Link to="/outline">Outline</Link>
        </nav>
      )}

      {scene?.finePrint ? (
        // Screens with fine print offer it at the foot in place of the "click to continue" hint.
        <div
          className={`fine-print${fading ? ' is-fading' : ''}`}
          key={`fine-print-${String(screen)}`}
          data-interactive
        >
          {finePrintOpen && (
            <div className="fine-print-panel" id="fine-print-panel">
              <ul>
                {scene.finePrint.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          )}
          <button
            type="button"
            className="pro-fade fine-print-toggle"
            aria-expanded={finePrintOpen}
            aria-controls="fine-print-panel"
            onClick={() => setFinePrintOpen(!finePrintOpen)}
          >
            {finePrintOpen ? '(close)' : '(fine print)'}
          </button>
        </div>
      ) : (
        <p className={`prologue-hint${hint && !fading ? ' shown' : ''}`} aria-hidden>
          click to continue
        </p>
      )}
    </main>
  )
}
