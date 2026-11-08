import { Link } from 'react-router'
import { book } from '../content/book.ts'

export default function OutlineHome() {
  return (
    <>
      <section className="intro">
        <h1>Outline</h1>
        <p>
          A section-by-section working outline of Rothbard's <em>Man, Economy, and State</em>, with
          draft explanations and interactive figures. Material here is reworked into the main
          exploration as it is built.
        </p>
      </section>

      {book.map((part) => (
        <section key={part.slug} className="part">
          <h2>{part.title}</h2>
          <ol className="chapter-list">
            {part.chapters.map((c) => (
              <li key={c.slug}>
                <Link to={`/outline/chapter/${c.slug}`}>
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
