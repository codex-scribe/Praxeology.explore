interface ValueScaleListProps {
  /** Ends in rank order: index 0 is ranked first. */
  ends: string[]
  /** How many of the top ends are served. */
  supply: number
  /** Ranks given up if one marginal unit is lost. */
  lossRanks?: number[]
  /** Ranks that one more marginal unit would serve. */
  gainRanks?: number[]
  /** When given, each end below the first gets a button to move it up one place. */
  onRaise?: (index: number) => void
}

/** A value scale drawn as a ranked list, marking which ends a supply serves. */
export default function ValueScaleList({
  ends,
  supply,
  lossRanks = [],
  gainRanks = [],
  onRaise,
}: ValueScaleListProps) {
  return (
    <ol className="value-scale">
      {ends.map((end, i) => {
        const rank = i + 1
        const served = rank <= supply
        const lost = lossRanks.includes(rank)
        const gained = gainRanks.includes(rank)
        const state = lost ? 'marginal' : served ? 'served' : gained ? 'next' : 'unserved'
        return (
          <li key={end} className={`vs-${state}`}>
            <span className="vs-rank">{rank}</span>
            <span className="vs-end">{end}</span>
            <span className="vs-tag">
              {lost
                ? 'marginal: given up first'
                : served
                  ? 'served'
                  : gained
                    ? 'next to be served'
                    : 'unserved'}
            </span>
            {onRaise && (
              <button
                type="button"
                className="vs-raise"
                onClick={() => onRaise(i)}
                disabled={i === 0}
                aria-label={`Rank “${end}” higher`}
                title="Rank higher"
              >
                ▲
              </button>
            )}
          </li>
        )
      })}
    </ol>
  )
}
