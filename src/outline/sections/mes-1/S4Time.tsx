import ActionTimeline from '../../../components/figures/ActionTimeline.tsx'

export default function S4Time() {
  return (
    <>
      <p className="lede">
        Time runs through every action as a means that has to be economized. Rothbard picks out
        three spans of time that enter into any plan, and one universal preference about them.
      </p>

      <h2>The period of production</h2>
      <p>
        Every action has a beginning, A, and a point B at which the consumers’ good becomes
        available (Figure 1, p. 13). The span AB is the <strong>period of production</strong>. It
        has two parts: <em>working time</em>, when labor is being spent, and <em>maturing time</em>,
        when nature does the rest. A crop might take six months from tilling to harvest with only
        three weeks of work in it; wine improves with age while no one touches it (p. 14).
      </p>
      <p>
        The actor measures the period of production from <em>now</em>. A farmer about to plant
        doesn’t care how long it took past generations to clear and improve his field. Action uses
        present means for future ends, so only the time ahead counts (pp. 14–15).
      </p>

      <h2>Duration of serviceableness</h2>
      <p>
        Once the good arrives, it serves its end for some span BC: its{' '}
        <strong>duration of serviceableness</strong> (Figure 2, p. 16). A sandwich satisfies for a
        few hours; a house for years. Other things equal, a more durable good is preferred, since it
        renders more service. The usual split into “durable” and “nondurable” goods is arbitrary,
        because durability comes in endless degrees (n. 16).
      </p>

      <ActionTimeline />

      <h2>Time preference</h2>
      <p>
        Since time is scarce, an actor wants any given end reached as soon as possible. “Given the
        specific satisfaction, the sooner it arrives, the better” (p. 15). Rothbard calls this the
        universal fact of <strong>time preference</strong>. It is why, when two goods would render
        the same total service, the actor prefers the less durable one: he gets the whole of its
        service sooner (p. 17).
      </p>
      <p>
        The qualification matters: time preference compares the <em>same</em> satisfaction at
        different dates. Someone who would rather have ice delivered next summer than this winter is
        not a counterexample. Ice in summer and ice in winter provide different satisfactions, so
        they are different goods (n. 15).
      </p>

      <h2>The period of provision</h2>
      <p>
        Beyond particular goods, each person has a time horizon: how far ahead he plans to provide
        for his wants. This <strong>period of provision</strong> spans many goods, each with its own
        period of production and duration. It differs from person to person by choice. Some live day
        to day, while others plan for their children’s lives as well as their own (p. 17).
      </p>
    </>
  )
}
