import { Link, useParams } from 'react-router'
import { findChapter } from '../content/book.ts'
import NotFound from './NotFound.tsx'

export default function ChapterPage() {
  const { slug = '' } = useParams()
  const found = findChapter(slug)
  if (!found) return <NotFound />
  const { part, chapter } = found

  return (
    <article>
      <p className="breadcrumb">
        <Link to="/">Contents</Link> / {part.title}
      </p>
      <h1>
        Chapter {chapter.number}: {chapter.title}
      </h1>
      <p className="placeholder">Explorations for this chapter are not built yet.</p>
    </article>
  )
}
