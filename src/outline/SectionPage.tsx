import { createElement, useEffect } from 'react'
import { Link, useParams } from 'react-router'
import { findSection } from '../content/book.ts'
import { sectionContent } from './sections/registry.ts'
import NotFound from '../NotFound.tsx'

export default function SectionPage() {
  const { slug = '', section: sectionSlug = '' } = useParams()
  const found = findSection(slug, sectionSlug)

  // Braces matter: scrollTo can return a Promise, and React would treat it as a cleanup function.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug, sectionSlug])

  if (!found) return <NotFound />
  const { part, chapter, section, prev, next } = found
  // Looked up from a static module-level table, so the component identity is stable across renders.
  const Content = sectionContent(chapter.slug, section.slug)
  const href = (s: { slug: string }) => `/outline/chapter/${chapter.slug}/${s.slug}`

  return (
    <article className="section-page">
      <p className="breadcrumb">
        <Link to="/outline">Outline</Link> / {part.title} /{' '}
        <Link to={`/outline/chapter/${chapter.slug}`}>
          Ch. {chapter.number}: {chapter.title}
        </Link>
        {section.group && <> / {section.group}</>}
      </p>
      <h1>
        <span className="section-label">§{section.label}</span> {section.title}
      </h1>
      <p className="source">
        <em>Man, Economy, and State</em>, ch. {chapter.number}, §{section.label}, pp.{' '}
        {section.pages} (Scholar’s Edition)
      </p>

      {Content ? (
        createElement(Content)
      ) : (
        <p className="placeholder">This section is not written yet.</p>
      )}

      <nav className="pager" aria-label="Sections">
        {prev ? (
          <Link to={href(prev)} rel="prev">
            ← §{prev.label} {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link to={href(next)} rel="next">
            §{next.label} {next.title} →
          </Link>
        )}
      </nav>
    </article>
  )
}
