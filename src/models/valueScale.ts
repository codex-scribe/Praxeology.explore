// Value scales and the law of marginal utility (MES ch. 1, §§5A–5B).
//
// Every rank here is ordinal: 1 is the most highly valued end, 2 the next, and so on. The numbers
// only order ends. They are never added, subtracted, or compared by size of difference.

/** Ranks (1-based) of the ends served by a supply, and of those left unserved. */
export interface Allocation {
  satisfied: number[]
  unsatisfied: number[]
}

const range = (from: number, to: number): number[] =>
  to < from ? [] : Array.from({ length: to - from + 1 }, (_, i) => from + i)

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n))

/**
 * Allocate a supply of interchangeable units, one unit per end, to ends ranked 1..endCount.
 * Each unit goes to the most valued end not yet served, so a supply of s units serves ends 1..s.
 */
export function allocate(endCount: number, supply: number): Allocation {
  const s = clamp(supply, 0, endCount)
  return { satisfied: range(1, s), unsatisfied: range(s + 1, endCount) }
}

/**
 * The ends given up if the actor loses one marginal unit of `unitSize` single units: the
 * lowest-ranked ends the present supply serves. Empty if the supply holds less than one full unit.
 */
export function marginalLoss(endCount: number, supply: number, unitSize = 1): number[] {
  const s = clamp(supply, 0, endCount)
  if (unitSize < 1 || s < unitSize) return []
  return range(s - unitSize + 1, s)
}

/**
 * The ends served if the actor gains one marginal unit of `unitSize` single units: the
 * highest-ranked ends not yet served. Empty if the scale has no room for a full unit.
 */
export function marginalGain(endCount: number, supply: number, unitSize = 1): number[] {
  const s = clamp(supply, 0, endCount)
  if (unitSize < 1 || s + unitSize > endCount) return []
  return range(s + 1, s + unitSize)
}

// ---- Several goods on one value scale (MES ch. 1, §5B, Figure 4) ----

/** One end on a joint value scale: the end served by the `unit`-th unit (1-based) of `good`. */
export interface ScaleEntry {
  good: string
  unit: number
}

/** Units of each good held, keyed by good. */
export type Stock = Record<string, number>

/** Rank (1-based) of the end served by the `unit`-th unit of `good`, if it is on the scale. */
export function jointRank(scale: ScaleEntry[], good: string, unit: number): number | undefined {
  const i = scale.findIndex((e) => e.good === good && e.unit === unit)
  return i === -1 ? undefined : i + 1
}

/**
 * Whether the joint scale respects the law of marginal utility for each good taken alone: every
 * good's units appear as 1, 2, 3, ... from the top down, so a later unit never outranks an earlier.
 */
export function isConsistent(scale: ScaleEntry[]): boolean {
  const seen: Record<string, number> = {}
  return scale.every((e) => {
    const expected = (seen[e.good] ?? 0) + 1
    seen[e.good] = e.unit
    return e.unit === expected
  })
}

/** Rank of the end lost by giving up one unit of `good`: the end its marginal unit serves. */
export function marginalUtilityOfLoss(
  scale: ScaleEntry[],
  stock: Stock,
  good: string,
): number | undefined {
  const held = stock[good] ?? 0
  return held > 0 ? jointRank(scale, good, held) : undefined
}

/** Rank of the end gained by adding one unit of `good`: the highest end it does not yet serve. */
export function marginalUtilityOfGain(
  scale: ScaleEntry[],
  stock: Stock,
  good: string,
): number | undefined {
  return jointRank(scale, good, (stock[good] ?? 0) + 1)
}

/**
 * Forced to give up one unit of some good, the actor gives up the good whose marginal unit
 * serves the lowest-ranked end (the largest rank number).
 */
export function choiceToGiveUp(scale: ScaleEntry[], stock: Stock): string | undefined {
  let best: { good: string; rank: number } | undefined
  for (const good of goodsOf(scale)) {
    const rank = marginalUtilityOfLoss(scale, stock, good)
    if (rank !== undefined && (best === undefined || rank > best.rank)) best = { good, rank }
  }
  return best?.good
}

/**
 * Offered one more unit of any one good, the actor takes the good whose next unit would serve
 * the highest-ranked end not yet served (the smallest rank number).
 */
export function choiceToAdd(scale: ScaleEntry[], stock: Stock): string | undefined {
  let best: { good: string; rank: number } | undefined
  for (const good of goodsOf(scale)) {
    const rank = marginalUtilityOfGain(scale, stock, good)
    if (rank !== undefined && (best === undefined || rank < best.rank)) best = { good, rank }
  }
  return best?.good
}

/** The distinct goods on a scale, in order of first appearance. */
export function goodsOf(scale: ScaleEntry[]): string[] {
  return [...new Set(scale.map((e) => e.good))]
}

/** Number of units of `good` that appear on the scale. */
export function unitsOnScale(scale: ScaleEntry[], good: string): number {
  return scale.filter((e) => e.good === good).length
}

/**
 * Swap the entry at `index` with the one above it, if that keeps the scale consistent (two units
 * of the same good can't trade places). Returns the original scale when the move isn't allowed.
 */
export function raiseEntry(scale: ScaleEntry[], index: number): ScaleEntry[] {
  if (index < 1 || index >= scale.length) return scale
  if (scale[index].good === scale[index - 1].good) return scale
  const next = scale.slice()
  ;[next[index - 1], next[index]] = [next[index], next[index - 1]]
  return next
}

/** Parse a compact scale like "Y1 X1 X2" into entries. */
export function parseScale(compact: string): ScaleEntry[] {
  return compact
    .trim()
    .split(/\s+/)
    .map((token) => {
      const m = /^([A-Za-z]+)(\d+)$/.exec(token)
      if (!m) throw new Error(`Bad scale entry: ${token}`)
      return { good: m[1], unit: Number(m[2]) }
    })
}
