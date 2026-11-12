import type { ComponentType } from 'react'
import OnlyIndividuals from './illustrations/OnlyIndividuals.tsx'

// The propositions the opening sequence walks through after "Man acts." Each scene is one
// implication of the action axiom, shown with an illustration or, until one is built, a placeholder.

export interface Scene {
  id: string
  /** The proposition, shown large. */
  statement: string
  /** The interactive illustration shown beneath the statement. */
  illustration?: ComponentType
  /** Shown beneath the statement until the scene's illustration is built. */
  placeholder?: string
}

export const scenes: Scene[] = [
  {
    id: 'individuals',
    statement: 'Only individuals act.',
    illustration: OnlyIndividuals,
  },
  {
    id: 'one-at-a-time',
    statement: 'An individual can perform only one action at a time.',
    placeholder: 'An exploration of this proposition will go here.',
  },
]
