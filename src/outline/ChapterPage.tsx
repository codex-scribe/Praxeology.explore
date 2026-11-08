import { Link, useParams } from 'react-router'
import { findChapter } from '../content/book.ts'
import NotFound from '../NotFound.tsx'

export default function ChapterPage() {
  const { slug = '' } = useParams()
  const found = findChapter(slug)
  if (!found) return <NotFound />
  const { part, chapter } = found

  return (
    <article>
      <p className="breadcrumb">
        <Link to="/outline">Outline</Link> / {part.title}
      </p>
      <h1>
        Chapter {chapter.number}: {chapter.title}
      </h1>
      {chapter.sections.length === 0 ? (
        <p className="placeholder">Explorations for this chapter are not built yet.</p>
      ) : (
        <ol className="chapter-list section-list">
          {chapter.sections.map((s, i) => {
            const groupHeading =
              s.group && s.group !== chapter.sections[i - 1]?.group ? s.group : undefined
            return (
              <li key={s.slug}>
                {groupHeading && <p className="section-group">{groupHeading}</p>}
                <Link
                  to={`/outline/chapter/${chapter.slug}/${s.slug}`}
                  className={s.group ? 'subsection' : undefined}
                >
                  <span className="chapter-number">{s.label}</span>
                  <span className="chapter-title">{s.title}</span>
                  <span className="pages">pp. {s.pages}</span>
                  {s.status !== 'ready' && <span className={`status ${s.status}`}>{s.status}</span>}
                </Link>
              </li>
            )
          })}
        </ol>
      )}
    </article>
  )
}
