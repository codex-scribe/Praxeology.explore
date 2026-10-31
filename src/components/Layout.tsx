import { Link, Outlet } from 'react-router'

export default function Layout() {
  return (
    <div className="layout">
      <header className="site-header">
        <Link to="/" className="brand">
          Praxeology<span className="brand-dot">.explore</span>
        </Link>
      </header>
      <main className="content">
        <Outlet />
      </main>
      <footer className="site-footer">
        An interactive companion to Murray N. Rothbard's <em>Man, Economy, and State</em> with{' '}
        <em>Power and Market</em>.
      </footer>
    </div>
  )
}
