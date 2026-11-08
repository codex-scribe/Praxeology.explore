import MarginalUtilityDiagram from '../../../components/figures/MarginalUtilityDiagram.tsx'
import TwoGoodsDiagram from '../../../components/figures/TwoGoodsDiagram.tsx'

export default function S5bMarginalUtility() {
  return (
    <>
      <p className="lede">
        The first true law of economics in the book, deduced in a few steps from the ranking of
        ends: the larger the supply of a good, the less each unit of it is worth to the person who
        has it.
      </p>

      <h2>Units, not classes</h2>
      <p>
        People never choose between “cows” and “horses” in general. They choose between specific
        quantities, such as two cows versus three horses, as those enter a concrete decision (p.
        21). A man with two cows and three horses, forced to give up one animal, might keep the
        horse. Yet if his stable and cowshed caught fire and he could save only one building, he
        might save the cows. The same person can prefer X to Y unit by unit and Y to X stock by
        stock (pp. 21–22).
      </p>
      <p>
        This dissolves the old “paradox of value”: how can bread, so useful, be worth less than
        platinum? No one weighs bread-in-general against platinum-in-general. The question is
        whether, given what he already has, this loaf is worth more to him than this ounce (p. 22).
      </p>

      <h2>What is a supply?</h2>
      <p>
        The law concerns a <strong>supply</strong>: a stock of units that the actor regards as
        perfectly interchangeable, each able to render the same service (p. 23). The test is the
        actor’s valuation, not physical sameness. If he prizes one horse above the others, he holds
        two goods, a “grade A horse” and two “grade B horses”, not one supply of three.
      </p>

      <h2>Deducing the law</h2>
      <p>
        Suppose a man acquires identical horses one at a time (p. 24). The first goes to the most
        urgent want a horse can serve: action always directs scarce means to the most valued unmet
        end. The second goes to the most urgent want <em>remaining</em>, which must rank lower. And
        so on. Each additional unit serves a lower-ranked end than the one before.
      </p>
      <p>
        Run it backward. A man with six horses who must give one up keeps serving his five most
        important ends and drops the sixth. It doesn’t matter <em>which</em> horse goes. If the
        departing horse was hauling the wagon, he simply moves the pleasure-riding horse to the
        wagon (pp. 26–27). The unit he must consider giving up is the <strong>marginal unit</strong>
        , and the least important end it served is its <strong>marginal utility</strong>.
      </p>

      <MarginalUtilityDiagram />

      <blockquote>
        The greater the supply of a good, the lower the marginal utility; the smaller the supply,
        the higher the marginal utility.
        <cite>p. 27</cite>
      </blockquote>
      <p>
        Adding and losing are the same margin seen from either side. The horse that takes the stock
        from five to six serves end 6, and the horse lost when the stock falls from six to five
        costs end 6 (pp. 28–29).
      </p>

      <h2>Three cautions</h2>
      <p>
        <strong>Utility is a rank, not an amount.</strong> Six horses are worth more to their owner
        than five, but not by any measurable amount. “Marginal utility” names a place on a value
        scale, expressible only as higher or lower (pp. 27–28).
      </p>
      <p>
        <strong>The size of the unit is whatever enters the choice.</strong> If the decision is
        about pairs of horses, the owner ranks the ends that pairs can serve and the law applies to
        pairs. If a good can only be kept or lost whole, the whole stock is a single unit, and its
        marginal utility is the most important end it serves (p. 28). Switch the unit in the figure
        above to see both.
      </p>
      <p>
        <strong>It is logic, not psychology.</strong> Older textbooks rested the law on the
        “satiation of wants”: the fourth scoop of ice cream pleases less than the first. Rothbard
        rejects this (Appendix A, pp. 73–74). The law holds because each unit goes to the most
        urgent end not yet served, and that is a matter of logic, not of how appetites behave. The
        familiar objection that the fourth egg completes a cake, so is worth more than the third,
        misses that the eggs were never interchangeable units of one supply. For cake-making, the
        unit is a set of four.
      </p>

      <h2>More than one good</h2>
      <p>
        Choosing between giving up a horse or a cow, the owner compares the marginal utility of each
        and gives up whichever serves the lower-ranked end. Choosing which to add, he takes
        whichever would serve the higher-ranked end (pp. 29–31). To compare them at all, he must
        have placed the ends served by both goods on a <strong>single value scale</strong> (pp.
        31–32). Figure 4 draws that scale for horses (X) and cows (Y). Set the stock to Rothbard’s
        cases, or reorder the scale to make the owner someone else.
      </p>

      <TwoGoodsDiagram />

      <p>
        The same reasoning extends to any number of goods (p. 32). One more caution: these scales
        aren’t mental tables people carry around, covering every stock they might hold. They exist
        only in the concrete choices actually made. No one can predict those choices, except that
        they will follow the law of marginal utility (p. 33).
      </p>
      <p>
        With that, the value paradox is fully solved. A man who prefers an ounce of platinum to five
        loaves is comparing marginal units, given what he holds. At his present supplies, the
        marginal utility of the platinum is higher (p. 33).
      </p>
    </>
  )
}
