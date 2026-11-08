import DeductionMap, { type Proposition } from '../../../components/figures/DeductionMap.tsx'
import JonesValueScale from '../../../components/figures/JonesValueScale.tsx'

const PROPOSITIONS: Proposition[] = [
  {
    id: 'axiom',
    title: 'Human beings act: they behave purposefully, toward ends.',
    from: [],
    ref: 'pp. 1–2',
    body: <p>The starting point (§1). Everything below is a logical consequence of it.</p>,
  },
  {
    id: 'individuals',
    title: 'Only individuals act.',
    from: ['axiom'],
    ref: 'pp. 2–3',
    body: (
      <p>
        Only individuals have ends and act to reach them. To say “the government acts” is a metaphor
        for certain individuals acting in a relationship that they and others regard as
        governmental. This doesn’t make people isolated atoms: they influence one another’s desires
        and choices (n. 6).
      </p>
    ),
  },
  {
    id: 'ideas',
    title: 'Action requires technological ideas.',
    from: ['axiom'],
    ref: 'p. 3',
    body: (
      <p>
        Wanting something is not enough. A man who wants sunshine but knows he can do nothing to
        bring it about does not act. To act, he must believe that some course of behavior will get
        him to his end: he needs an idea, or plan, of how.
      </p>
    ),
  },
  {
    id: 'means',
    title: 'The environment divides into means and general conditions.',
    from: ['ideas'],
    ref: 'pp. 3–4',
    body: (
      <p>
        Some elements of his surroundings the actor believes he can rearrange toward his end; these
        are his <strong>means</strong>. Others he must take as given; these are the{' '}
        <strong>general conditions</strong> of action. Only means can be the objects of action.
      </p>
    ),
  },
  {
    id: 'time',
    title: 'Action takes place through time, aiming at the future.',
    from: ['axiom'],
    ref: 'p. 4',
    body: (
      <p>
        If every end could be had instantly, all would already be had and there would be nothing to
        do. So the end of any action lies in the future, and every action has a before, a during,
        and an after. All action aims to make some future state better for the actor than it would
        otherwise have been.
      </p>
    ),
  },
  {
    id: 'scarce-time',
    title: 'Time is a scarce means, present in every action.',
    from: ['time', 'means'],
    ref: 'p. 5',
    body: (
      <p>
        A life is finite and a day has only 24 hours. Since every action uses up time, time is a
        means, and a scarce one: spending an hour on one end means that hour can’t serve others.
      </p>
    ),
  },
  {
    id: 'choice',
    title: 'Action is choice, and choice ranks ends.',
    from: ['scarce-time'],
    ref: 'pp. 5–6',
    body: (
      <p>
        When the means can’t serve every end, the actor must choose which to serve. Choosing one end
        over others shows he ranks it above them. That ranking is his{' '}
        <strong>scale of values</strong>. Try it with Jones below.
      </p>
    ),
  },
  {
    id: 'scarce-means',
    title: 'All means are scarce.',
    from: ['means', 'choice'],
    ref: 'p. 5',
    body: (
      <p>
        Whatever is so abundant that it serves every end it could serve is never the object of a
        choice. Air, in most situations, is like this: indispensable, but not a means. It is a
        general condition of human welfare (p. 5).
      </p>
    ),
  },
  {
    id: 'economizing',
    title: 'Means are economized: they go to the most valued ends.',
    from: ['choice', 'scarce-means'],
    ref: 'pp. 5–6',
    body: (
      <p>
        The actor directs scarce means to his most valued ends and leaves the least valued
        unsatisfied. The larger his supply of means, the more ends he can serve, and the lower the
        rank of those left out. This is the seed of the law of marginal utility (§5B).
      </p>
    ),
  },
  {
    id: 'not-busy',
    title: 'Action needn’t be “active” or deliberate.',
    from: ['choice'],
    ref: 'pp. 6–7',
    body: (
      <p>
        Choosing to carry on as before, when one could change course, is as much an action as
        changing. And an action can be decided in a flash or after long thought, coolly or in
        passion. Praxeology does not assume that people are calculating machines (n. 9).
      </p>
    ),
  },
  {
    id: 'uncertainty',
    title: 'The future is uncertain, so action can err.',
    from: ['axiom', 'time'],
    ref: 'p. 7',
    body: (
      <p>
        If a man knew the future completely, no act of his could change it, and he would never act.
        So the fact of action implies uncertainty, which comes from two sources: our limited
        knowledge of nature, and the impossibility of knowing future human choices. Every action is
        a speculation, and the chosen means may turn out to have been the wrong ones.
      </p>
    ),
  },
]

export default function S2FirstImplications() {
  return (
    <>
      <p className="lede">
        From the bare fact of purposeful behavior, a surprising amount follows. This section draws
        out the first links in the chain: who acts, what action requires, and why it always involves
        time, scarcity, choice, and risk.
      </p>

      <DeductionMap title="What follows from the action axiom" propositions={PROPOSITIONS} />

      <h2>Jones chooses</h2>
      <p>
        Rothbard illustrates choice with Jones, who is watching a baseball game on television and
        has an hour he could spend on any of three ends (pp. 5–6). He can’t have all three, because
        time is scarce. Whichever he picks, he reveals that he ranks it above the others. Give him a
        second hour and he serves his second-ranked end too. Only the lowest goes unsatisfied.
      </p>

      <JonesValueScale />

      <p>
        Rothbard sums up (pp. 7–8): to act is to aim at a future that leaves fewer wants unsatisfied
        than would otherwise remain, using elements of one’s environment as means, directing them to
        the most valued ends, by methods one’s reason judges best, and without any guarantee they
        will work.
      </p>
    </>
  )
}
