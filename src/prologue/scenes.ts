// The propositions the opening sequence walks through after "Man acts." Each scene is one
// implication of the action axiom. These are placeholders until each scene's exploration is built.

export interface Scene {
  id: string
  /** The proposition, shown large. */
  statement: string
  /** Shown beneath the statement until the scene is built. */
  placeholder: string
}

export const scenes: Scene[] = [
  {
    id: 'individuals',
    statement: 'Only individuals act.',
    placeholder: 'An exploration of this proposition will go here.',
  },
  {
    id: 'one-at-a-time',
    statement: 'An individual can perform only one action at a time.',
    placeholder: 'An exploration of this proposition will go here.',
  },
]
