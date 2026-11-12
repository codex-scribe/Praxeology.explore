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
  /** Qualifications, opened from a "(fine print)" link at the foot of the screen. */
  finePrint?: string[]
}

export const scenes: Scene[] = [
  {
    id: 'individuals',
    statement: 'Only individuals act.',
    illustration: OnlyIndividuals,
    finePrint: [
      'People can coordinate their actions, as when friends sit down to a game of poker or millions vote in an election. Even then, what happens is individuals each acting, together: each person chooses to take part and does their own share.',
      'Turns of phrase like a country “fighting back against inflation” or the workers “expressing their consciousness” are not examples of action in this sense. They are metaphors for what particular people do: officials who change a policy, workers who strike or march.',
    ],
  },
  {
    id: 'one-at-a-time',
    statement: 'An individual can perform only one action at a time.',
    placeholder: 'An exploration of this proposition will go here.',
  },
]
