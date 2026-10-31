import { Link } from 'react-router'
import { book } from '../content/book.ts'

export default function Home() {
  return (
    <>
      <section className="intro">
        <h1>Praxeology.explore</h1>
        <p>
          Economics deduced from the fact that people act. These pages follow Rothbard's{' '}
          <em>Man, Economy, and State</em> chapter by chapter, turning each step of the argument
          into something you can manipulate and watch unfold.
        </p>
      </section>

      {book.map((part) => (
        <section key={part.slug} className="part">
          <h2>{part.title}</h2>
          <ol className="chapter-list">
            {part.chapters.map((c) => (
              <li key={c.slug}>
                <Link to={`/chapter/${c.slug}`}>
                  <span className="chapter-number">{c.number}</span>
                  <span className="chapter-title">{c.title}</span>
                  {c.status !== 'ready' && <span className={`status ${c.status}`}>{c.status}</span>}
                </Link>
              </li>
            ))}
          </ol>
        </section>
      ))}
    </>
  )
}
