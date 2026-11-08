import type { ReactNode } from 'react'

interface FigureProps {
  title: string
  /** Which of Rothbard's figures this one is based on, if any, e.g. 'Figure 3, p. 26'. */
  basis?: string
  caption?: ReactNode
  children: ReactNode
}

/** Frame for an interactive figure: title, the figure itself, and an optional caption. */
export default function Figure({ title, basis, caption, children }: FigureProps) {
  return (
    <figure className="figure">
      <div className="figure-head">
        <span className="figure-title">{title}</span>
        {basis && <span className="figure-basis">After Rothbard, {basis}</span>}
      </div>
      {children}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

interface StepperProps {
  label: string
  value: number
  min: number
  max: number
  onChange: (n: number) => void
}

/** A labelled −/+ control for a small whole number. */
export function Stepper({ label, value, min, max, onChange }: StepperProps) {
  return (
    <span className="stepper">
      <span className="stepper-label">{label}</span>
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label={`${label}: one fewer`}
      >
        −
      </button>
      <output aria-live="polite">{value}</output>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label={`${label}: one more`}
      >
        +
      </button>
    </span>
  )
}

interface ToggleGroupProps<T extends string> {
  label: string
  value: T
  options: { value: T; label: string }[]
  onChange: (v: T) => void
}

/** A row of mutually exclusive buttons. */
export function ToggleGroup<T extends string>({
  label,
  value,
  options,
  onChange,
}: ToggleGroupProps<T>) {
  return (
    <span className="toggle-group" role="group" aria-label={label}>
      <span className="stepper-label">{label}</span>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={o.value === value}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </span>
  )
}
