import { Link } from 'react-router'

export default function NotFound() {
  return (
    <article>
      <h1>Not found</h1>
      <p>
        <Link to="/">Back to contents</Link>
      </p>
    </article>
  )
}
