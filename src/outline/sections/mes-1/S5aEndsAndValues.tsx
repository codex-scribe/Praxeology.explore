import JonesValueScale from '../../../components/figures/JonesValueScale.tsx'
import ProductionStructure from '../../../components/figures/ProductionStructure.tsx'
import PsychicProfit from '../../../components/figures/PsychicProfit.tsx'

export default function S5aEndsAndValues() {
  return (
    <>
      <p className="lede">
        Choice reveals a ranking of ends. This section makes the ranking explicit: what a value
        scale is, why it can’t be measured, and how value flows from ends back to the goods that
        serve them.
      </p>

      <h2>Value scales</h2>
      <p>
        An actor uses his scarce means for the ends he values most. The less urgent wants are the
        ones left unsatisfied. So we can interpret him as ranking his ends on a{' '}
        <strong>scale of values</strong>, or scale of preferences (p. 17). These scales differ from
        person to person in what they contain and in how they order it. They also change for the
        same person over time: Jones might later rank a drive first, and a new end such as a concert
        can appear and take a place in the order (pp. 17–18).
      </p>

      <JonesValueScale editable />

      <p>
        Economics is not interested in <em>what</em> people’s ends are, only in the fact that they
        are ranked. Whether we call the scale happiness, welfare, utility, or satisfaction makes no
        difference (p. 18). Reaching an end raises the actor’s satisfaction; falling short lowers
        it.
      </p>

      <h2>Ranks, not quantities</h2>
      <p>
        Here is the crux of the whole chapter: there is no way to <strong>measure</strong> a change
        in satisfaction, whether between people or within one person (pp. 18–19). Measurement needs
        a fixed, objective unit, and there is none for valuation. Jones can say he is happier at the
        concert than he would have been at bridge. He cannot say he is “two and a half times”
        happier. Two and a half times what?
      </p>
      <aside className="callout">
        <h3>Ordinal numbers</h3>
        <p>
          The numbers on a value scale are <em>ordinal</em>: first, second, third. They say which
          end ranks above which, and nothing more. They can’t be added, subtracted, or multiplied,
          so a fourth-ranked end is not “half as valuable” as a second (n. 17). Every figure on this
          site draws value scales as rankings for this reason. Only <em>prices</em>, which come
          later in the book, are cardinal.
        </p>
      </aside>

      <h2>Every action is an exchange</h2>
      <p>
        Since the actor always moves toward a state he ranks higher, every action exchanges a less
        satisfactory state of affairs for a more satisfactory one, as he expects it (p. 19). If he
        was right, he gains: a <strong>psychic profit</strong>. If he was wrong and the state he
        gave up ranks higher after all, he suffers a <strong>psychic loss</strong>. He can’t measure
        either, but he always knows which one he got (p. 20).
      </p>

      <PsychicProfit />

      <h2>Imputation: from ends back to means</h2>
      <p>
        Means are valued strictly according to the ends they are expected to serve (p. 20). A
        sandwich is valued for the enjoyment it brings, the bread in the kitchen for its part in the
        sandwich, and so on up the orders of goods. Value is thus <strong>imputed</strong> in the
        direction opposite to production: from ends to consumers’ goods, then to first-order
        producers’ goods, then to second-order, and on back (pp. 20–21). The original source of all
        value is the ranking of ends by acting individuals.
      </p>

      <ProductionStructure initial="valuation" />

      <p>
        Rothbard notes that this answers a question that had long troubled economists: where the
        value of goods comes from (n. 20). Much of the rest of the book works out how this
        imputation happens in a complex market economy.
      </p>
    </>
  )
}
