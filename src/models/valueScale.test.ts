import { describe, expect, it } from 'vitest'
import {
  allocate,
  choiceToAdd,
  choiceToGiveUp,
  isConsistent,
  jointRank,
  marginalGain,
  marginalLoss,
  marginalUtilityOfGain,
  marginalUtilityOfLoss,
  parseScale,
  raiseEntry,
} from './valueScale.ts'

describe('single good (Figure 3)', () => {
  it('serves the top ends first', () => {
    expect(allocate(10, 6)).toEqual({ satisfied: [1, 2, 3, 4, 5, 6], unsatisfied: [7, 8, 9, 10] })
    expect(allocate(3, 0).satisfied).toEqual([])
    expect(allocate(3, 9).unsatisfied).toEqual([])
  })

  it('gives up the lowest end served when one unit is lost', () => {
    expect(marginalLoss(10, 6)).toEqual([6])
    expect(marginalLoss(10, 4)).toEqual([4])
    expect(marginalLoss(10, 1)).toEqual([1])
    expect(marginalLoss(10, 0)).toEqual([])
  })

  it('values the unit added from 5 to 6 the same as the unit lost from 6 to 5', () => {
    expect(marginalGain(10, 5)).toEqual(marginalLoss(10, 6))
  })

  it('handles larger units, up to the whole stock', () => {
    expect(marginalLoss(10, 6, 2)).toEqual([5, 6])
    expect(marginalLoss(10, 6, 6)).toEqual([1, 2, 3, 4, 5, 6])
    expect(marginalLoss(10, 1, 2)).toEqual([])
    expect(marginalGain(10, 6, 2)).toEqual([7, 8])
    expect(marginalGain(10, 9, 2)).toEqual([])
  })
})

describe('two goods on one scale (Figure 4)', () => {
  // Rothbard's ranking, MES p. 32: X is horses, Y is cows.
  const scale = parseScale('Y1 X1 X2 X3 Y2 Y3 X4 Y4 X5 Y5 X6 X7 Y6 Y7')

  it('is consistent, and an out-of-order scale is not', () => {
    expect(isConsistent(scale)).toBe(true)
    expect(isConsistent(parseScale('X2 X1'))).toBe(false)
  })

  it('ranks each end on the joint scale', () => {
    expect(jointRank(scale, 'Y', 1)).toBe(1)
    expect(jointRank(scale, 'X', 4)).toBe(7)
    expect(jointRank(scale, 'X', 8)).toBeUndefined()
  })

  it('gives up a horse at (4X, 3Y): X-4 ranks below Y-3', () => {
    const stock = { X: 4, Y: 3 }
    expect(marginalUtilityOfLoss(scale, stock, 'X')).toBe(7)
    expect(marginalUtilityOfLoss(scale, stock, 'Y')).toBe(6)
    expect(choiceToGiveUp(scale, stock)).toBe('X')
  })

  it('gives up a cow at (3X, 2Y): Y-2 ranks below X-3', () => {
    expect(choiceToGiveUp(scale, { X: 3, Y: 2 })).toBe('Y')
  })

  it('adds a horse at (4X, 4Y): X-5 ranks above Y-5', () => {
    const stock = { X: 4, Y: 4 }
    expect(marginalUtilityOfGain(scale, stock, 'X')).toBe(9)
    expect(marginalUtilityOfGain(scale, stock, 'Y')).toBe(10)
    expect(choiceToAdd(scale, stock)).toBe('X')
  })

  it('adds a horse at (3X, 3Y), and a cow when holding nothing', () => {
    expect(choiceToAdd(scale, { X: 3, Y: 3 })).toBe('X')
    expect(choiceToAdd(scale, { X: 0, Y: 0 })).toBe('Y')
  })

  it('has nothing to give up from an empty stock', () => {
    expect(choiceToGiveUp(scale, { X: 0, Y: 0 })).toBeUndefined()
  })

  it('only lets entries of different goods trade places', () => {
    expect(raiseEntry(scale, 1)).toEqual(parseScale('X1 Y1 X2 X3 Y2 Y3 X4 Y4 X5 Y5 X6 X7 Y6 Y7'))
    expect(raiseEntry(scale, 2)).toBe(scale) // X2 cannot pass X1
    expect(raiseEntry(scale, 0)).toBe(scale)
  })
})
